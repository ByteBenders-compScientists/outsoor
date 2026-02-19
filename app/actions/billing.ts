"use server"

import { neon } from "@neondatabase/serverless"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

// Validation schemas
const topUpSchema = z.object({
  amount: z.number().min(0.01).max(10000),
  paymentMethod: z.string().min(1)
})

const usageSchema = z.object({
  serviceType: z.string(),
  cost: z.number().min(0),
  tokensUsed: z.number().optional(),
  modelUsed: z.string().optional(),
  requestId: z.string().optional()
})

// Initialize user credits in database
export async function initializeUserCredits(userId: string) {
  try {
    // Check if user already has credits record
    const existingCredits = await sql`
      SELECT id FROM user_credits WHERE user_id = ${userId}
    `
    
    if (existingCredits.length === 0) {
      // Create initial credits record
      await sql`
        INSERT INTO user_credits (user_id, balance, total_spent, total_topped_up)
        VALUES (${userId}, 0.00, 0.00, 0.00)
      `
      console.log(`Initialized credits for user ${userId}`)
    }
  } catch (error) {
    console.error("Error initializing user credits:", error)
  }
}

// Get user billing information from database
export async function getBillingInfo() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      redirect("/login")
    }

    // At this point, user is guaranteed to be non-null
    const userId = user.id

    // Initialize credits if needed
    await initializeUserCredits(userId)
    
    // Get user credits from database
    const creditsResult = await sql`
      SELECT * FROM user_credits WHERE user_id = ${userId}
    `
    
    if (creditsResult.length === 0) {
      return { success: false, error: "Failed to load billing information" }
    }
    
    const credits = creditsResult[0]
    
    // Get recent transactions
    const transactionsResult = await sql`
      SELECT * FROM credit_transactions 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC 
      LIMIT 10
    `
    
    // Get monthly usage
    const monthlyUsageResult = await sql`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        SUM(cost) as total_cost,
        COUNT(*) as usage_count
      FROM usage_logs 
      WHERE user_id = ${userId} 
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month DESC 
      LIMIT 12
    `

    return {
      success: true,
      data: {
        credits: {
          balance: parseFloat(credits.balance),
          total_spent: parseFloat(credits.total_spent),
          total_topped_up: parseFloat(credits.total_topped_up),
          created_at: credits.created_at,
          updated_at: credits.updated_at
        },
        transactions: transactionsResult,
        monthlyUsage: monthlyUsageResult,
        user: { id: userId, email: user.email, name: user.name },
      },
    }
  } catch (error) {
    console.error("Error getting billing info:", error)
    return { success: false, error: "Failed to load billing information" }
  }
}

// Get detailed usage analytics from database
export async function getUsageAnalytics(days: number = 30) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      redirect("/login")
    }

    // At this point, user is guaranteed to be non-null
    const userId = user.id

    // Get usage data for the specified period
    const usageResult = await sql`
      SELECT 
        service_type,
        SUM(cost) as total_cost,
        COUNT(*) as usage_count,
        SUM(tokens_used) as total_tokens,
        AVG(cost) as avg_cost_per_request
      FROM usage_logs 
      WHERE user_id = ${userId} 
        AND created_at >= NOW() - INTERVAL '${days} days'
      GROUP BY service_type
      ORDER BY total_cost DESC
    `

    // Get daily usage for chart
    const dailyUsageResult = await sql`
      SELECT 
        DATE(created_at) as date,
        SUM(cost) as daily_cost,
        COUNT(*) as daily_requests
      FROM usage_logs 
      WHERE user_id = ${userId} 
        AND created_at >= NOW() - INTERVAL '${days} days'
      GROUP BY DATE(created_at)
      ORDER BY date
    `

    return {
      success: true,
      data: {
        serviceBreakdown: usageResult,
        dailyUsage: dailyUsageResult,
        period: days
      }
    }
  } catch (error) {
    console.error("Error getting usage analytics:", error)
    return { success: false, error: "Failed to load usage analytics" }
  }
}

// Simulate payment processing (placeholder for future payment integration)
async function simulatePayment(amount: number, paymentMethod: string) {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate 95% success rate
  if (Math.random() > 0.05) {
    return { success: true, transactionId: `txn_${Date.now()}` }
  } else {
    throw new Error("Payment processing failed. Please try again.")
  }
}

// Create top-up transaction in database
export async function createTopUp(formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      redirect("/login")
    }

    // At this point, user is guaranteed to be non-null
    const userId = user.id

    const amount = Number(formData.get("amount"))
    const paymentMethod = formData.get("paymentMethod") as string
    const paypalOrderId = formData.get("paypalOrderId") as string
    const paypalCaptureId = formData.get("paypalCaptureId") as string

    // Validate input
    const validation = topUpSchema.safeParse({ amount, paymentMethod })
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.errors[0]?.message || "Invalid input",
      }
    }

    // Initialize credits if needed
    await initializeUserCredits(userId)

    // Create transaction record
    const transactionResult = await sql`
      INSERT INTO credit_transactions (
        user_id, type, amount, description, reference_id, status, metadata
      ) VALUES (
        ${userId},
        'topup',
        ${amount},
        ${`Top-up via ${paymentMethod}`},
        ${paypalOrderId || paypalCaptureId || `manual_${Date.now()}`},
        'completed',
        ${JSON.stringify({
          paymentMethod,
          paypalOrderId,
          paypalCaptureId,
          timestamp: new Date().toISOString()
        })}
      ) RETURNING id
    `

    if (transactionResult.length === 0) {
      return { success: false, error: "Failed to create transaction record" }
    }

    console.log(`Top-up created: $${amount} via ${paymentMethod} for user ${user.id}`)

    return {
      success: true,
      message: `Successfully added $${amount} to your account`,
      data: {
        id: transactionResult[0].id,
        amount,
        created_at: new Date().toISOString()
      },
    }
  } catch (error) {
    console.error("Error creating top-up:", error)
    return { success: false, error: "Failed to process top-up" }
  }
}

// Record usage and deduct credits in database
export async function recordUsage(usage: z.infer<typeof usageSchema>) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: "User not authenticated" }
    }

    // At this point, user is guaranteed to be non-null
    const userId = user.id

    // Validate input
    const validation = usageSchema.safeParse(usage)
    if (!validation.success) {
      return { success: false, error: "Invalid usage data" }
    }

    // Initialize credits if needed
    await initializeUserCredits(userId)

    // Check if user has sufficient credits
    const creditsResult = await sql`
      SELECT balance FROM user_credits WHERE user_id = ${userId}
    `
    
    if (creditsResult.length === 0) {
      return { success: false, error: "User credits not found" }
    }
    
    const currentBalance = parseFloat(creditsResult[0].balance)
    if (currentBalance < usage.cost) {
      return { success: false, error: "Insufficient credits" }
    }

    // Record usage
    await sql`
      INSERT INTO usage_logs (
        user_id, service_type, tokens_used, cost, model_used, request_id
      ) VALUES (
        ${userId},
        ${usage.serviceType},
        ${usage.tokensUsed || null},
        ${usage.cost},
        ${usage.modelUsed || null},
        ${usage.requestId || null}
      )
    `

    // Create usage transaction
    await sql`
      INSERT INTO credit_transactions (
        user_id, type, amount, description, status, metadata
      ) VALUES (
        ${userId},
        'usage',
        ${usage.cost},
        ${`Usage: ${usage.serviceType}`},
        'completed',
        ${JSON.stringify({
          serviceType: usage.serviceType,
          tokensUsed: usage.tokensUsed,
          modelUsed: usage.modelUsed,
          requestId: usage.requestId,
          timestamp: new Date().toISOString()
        })}
      )
    `

    console.log(`Usage recorded: ${usage.serviceType}, Cost: $${usage.cost}, User: ${user.id}`)

    return { success: true }
  } catch (error) {
    console.error("Error recording usage:", error)
    return { success: false, error: "Failed to record usage" }
  }
}

// Get payment methods (placeholder for future integration)
export async function getPaymentMethods() {
  return {
    success: true,
    data: [
      { id: 'paypal', name: 'PayPal', type: 'digital_wallet' }
    ]
  }
}