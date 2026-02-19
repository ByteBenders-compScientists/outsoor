"use server"

import { requireAdmin } from "@/lib/auth"
import { sql } from "@/lib/db"

export interface AdminStats {
  totalUsers: number
  totalRevenue: number
  totalUsageCost: number
}

export interface AdminTransaction {
  id: string
  user_id: string
  user_name: string | null
  user_email: string
  type: 'topup' | 'usage' | 'refund'
  amount: number
  description: string | null
  reference_id: string | null
  status: 'completed' | 'pending' | 'failed' | 'cancelled'
  payment_method: string | null
  metadata: any | null
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string | null
  role: string
  created_at: string
  balance: number
}

interface AdminTopUpResult {
  success: boolean
  message?: string
  error?: string
}

export async function getAdminStats(): Promise<AdminStats> {
  await requireAdmin()

  const [usersCount] = await sql`SELECT COUNT(*) as count FROM users`
  const [revenue] = await sql`
    SELECT COALESCE(SUM(amount), 0) as total 
    FROM credit_transactions 
    WHERE type = 'topup' AND status = 'completed'
  `
  const [usage] = await sql`SELECT COALESCE(SUM(cost), 0) as total FROM usage_logs`

  return {
    totalUsers: Number(usersCount.count),
    totalRevenue: Number(revenue.total),
    totalUsageCost: Number(usage.total),
  }
}

export async function getUsers(): Promise<AdminUser[]> {
  await requireAdmin()

  const users = await sql`
    SELECT 
      u.id, u.email, u.name, u.role, u.created_at,
      COALESCE(uc.balance, 0) as balance
    FROM users u
    LEFT JOIN user_credits uc ON u.id = uc.user_id
    ORDER BY u.created_at DESC
  `

  return users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'user',
    created_at: user.created_at,
    balance: Number(user.balance),
  }))
}

// Admin manual top-up for a specific user
export async function adminTopUpUserAction(formData: FormData): Promise<AdminTopUpResult> {
  await requireAdmin()

  const userId = formData.get("userId") as string | null
  const amountStr = formData.get("amount") as string | null
  const description = (formData.get("description") as string | null) || "Admin manual top-up"

  if (!userId) {
    return { success: false, error: "Missing user ID" }
  }

  const amount = amountStr ? Number.parseFloat(amountStr) : NaN

  if (!Number.isFinite(amount) || amount <= 0) {
    return { success: false, error: "Amount must be greater than 0" }
  }

  try {
    // Ensure user exists
    const userCheck = await sql`SELECT id, email FROM users WHERE id = ${userId}`
    if (userCheck.length === 0) {
      return { success: false, error: "User not found" }
    }

    // Ensure user_credits row exists
    const creditsCheck = await sql`SELECT id FROM user_credits WHERE user_id = ${userId}`
    if (creditsCheck.length === 0) {
      await sql`
        INSERT INTO user_credits (user_id, balance, total_spent, total_topped_up)
        VALUES (${userId}, 0.00, 0.00, 0.00)
      `
    }

    // Insert topup transaction; trigger will update balance
    await sql`
      INSERT INTO credit_transactions (
        user_id, type, amount, description, reference_id, status, metadata
      ) VALUES (
        ${userId},
        'topup',
        ${amount},
        ${description},
        ${`admin_manual_${Date.now()}`},
        'completed',
        ${JSON.stringify({ source: 'admin_panel', note: description })}
      )
    `

    return { success: true, message: `Successfully added $${amount.toFixed(2)} to user account` }
  } catch (error) {
    console.error("Admin top-up error:", error)
    return { success: false, error: "Failed to process admin top-up" }
  }
}

// Admin manual deduction (tokens = USD credit balance)
export async function adminDeductUserCreditsAction(formData: FormData): Promise<AdminTopUpResult> {
  await requireAdmin()

  const userId = formData.get("userId") as string | null
  const amountStr = formData.get("amount") as string | null
  const description =
    (formData.get("description") as string | null) || "Admin manual deduction"

  if (!userId) {
    return { success: false, error: "Missing user ID" }
  }

  const amount = amountStr ? Number.parseFloat(amountStr) : NaN

  if (!Number.isFinite(amount) || amount <= 0) {
    return { success: false, error: "Amount must be greater than 0" }
  }

  try {
    // Ensure user exists
    const userCheck = await sql`SELECT id, email FROM users WHERE id = ${userId}`
    if (userCheck.length === 0) {
      return { success: false, error: "User not found" }
    }

    // Ensure user_credits row exists
    const creditsCheck = await sql`SELECT id FROM user_credits WHERE user_id = ${userId}`
    if (creditsCheck.length === 0) {
      await sql`
        INSERT INTO user_credits (user_id, balance, total_spent, total_topped_up)
        VALUES (${userId}, 0.00, 0.00, 0.00)
      `
    }

    // Check current balance to prevent going negative
    const balanceRows = await sql`SELECT balance FROM user_credits WHERE user_id = ${userId}`
    if (balanceRows.length === 0) {
      return { success: false, error: "User credits account not found" }
    }

    const currentBalance = Number(balanceRows[0].balance)

    if (!Number.isFinite(currentBalance)) {
      return { success: false, error: "Invalid current balance value" }
    }

    if (amount > currentBalance) {
      return {
        success: false,
        error: `Insufficient balance. Current balance is $${currentBalance.toFixed(2)}`,
      }
    }

    // Insert usage transaction; trigger will subtract balance
    await sql`
      INSERT INTO credit_transactions (
        user_id, type, amount, description, reference_id, status, metadata
      ) VALUES (
        ${userId},
        'usage',
        ${amount},
        ${description},
        ${`admin_deduct_${Date.now()}`},
        'completed',
        ${JSON.stringify({ source: "admin_panel", note: description })}
      )
    `

    return {
      success: true,
      message: `Successfully deducted $${amount.toFixed(2)} from user account`,
    }
  } catch (error) {
    console.error("Admin deduction error:", error)
    return { success: false, error: "Failed to process admin deduction" }
  }
}

export async function getTransactions(): Promise<AdminTransaction[]> {
  await requireAdmin()

  const transactions = await sql`
    SELECT
      ct.id,
      ct.user_id,
      u.name as user_name,
      u.email as user_email,
      ct.type,
      ct.amount,
      ct.description,
      ct.reference_id,
      ct.status,
      ct.metadata,
      ct.created_at,
      ct.created_at as updated_at,
      NULL::text as payment_method
    FROM credit_transactions ct
    JOIN users u ON ct.user_id = u.id
    ORDER BY ct.created_at DESC
  `

  return transactions.map(transaction => ({
    id: transaction.id,
    user_id: transaction.user_id,
    user_name: transaction.user_name,
    user_email: transaction.user_email,
    type: transaction.type,
    amount: Number(transaction.amount),
    description: transaction.description,
    reference_id: transaction.reference_id,
    status: transaction.status,
    payment_method: transaction.payment_method,
    metadata: transaction.metadata,
    created_at: transaction.created_at,
    updated_at: transaction.updated_at,
  }))
}

export async function getTransactionById(id: string): Promise<AdminTransaction | null> {
  await requireAdmin()

  const [transaction] = await sql`
    SELECT
      ct.id,
      ct.user_id,
      u.name as user_name,
      u.email as user_email,
      ct.type,
      ct.amount,
      ct.description,
      ct.reference_id,
      ct.status,
      ct.metadata,
      ct.created_at,
      ct.created_at as updated_at,
      NULL::text as payment_method
    FROM credit_transactions ct
    JOIN users u ON ct.user_id = u.id
    WHERE ct.id = ${id}
  `

  if (!transaction) {
    return null
  }

  return {
    id: transaction.id,
    user_id: transaction.user_id,
    user_name: transaction.user_name,
    user_email: transaction.user_email,
    type: transaction.type,
    amount: Number(transaction.amount),
    description: transaction.description,
    reference_id: transaction.reference_id,
    status: transaction.status,
    payment_method: transaction.payment_method,
    metadata: transaction.metadata,
    created_at: transaction.created_at,
    updated_at: transaction.updated_at,
  }
}
