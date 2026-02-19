"use server"

import { sql } from "@/lib/db"
import {
  hashPassword,
  verifyPassword,
  createSession,
  setSessionCookie,
  clearSessionCookie,
  deleteSession,
} from "@/lib/auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { z } from "zod"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

const passwordResetRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
})

const passwordResetSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

function generateResetToken(): string {
  return crypto.randomUUID() + crypto.randomUUID().replace(/-/g, "")
}

export async function signup(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const validation = signupSchema.safeParse(rawData)
  if (!validation.success) {
    return {
      error: validation.error.errors[0].message,
    }
  }

  const { name, email, password } = validation.data

  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return {
        error: "User with this email already exists",
      }
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password)
    const result = await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${name}, ${email}, ${passwordHash})
      RETURNING id
    `

    const userId = result[0].id

    // Create session
    const sessionToken = await createSession(userId)
    await setSessionCookie(sessionToken)

    return { success: true }
  } catch (error) {
    console.error("Signup error:", error)
    return {
      error: "Failed to create account. Please try again.",
    }
  }
}

export async function login(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const validation = loginSchema.safeParse(rawData)
  if (!validation.success) {
    return {
      error: validation.error.errors[0].message,
    }
  }

  const { email, password } = validation.data

  try {
    // Find user by email
    const result = await sql`
      SELECT id, password_hash FROM users WHERE email = ${email}
    `

    if (result.length === 0) {
      return {
        error: "Invalid email or password",
      }
    }

    const user = result[0]

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      return {
        error: "Invalid email or password",
      }
    }

    // Create session
    const sessionToken = await createSession(user.id)
    await setSessionCookie(sessionToken)

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: "Failed to sign in. Please try again.",
    }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session")?.value

  if (sessionToken) {
    await deleteSession(sessionToken)
  }

  await clearSessionCookie()
  redirect("/")
}

export async function requestPasswordReset(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
  }

  const validation = passwordResetRequestSchema.safeParse(rawData)
  if (!validation.success) {
    return {
      error: validation.error.errors[0].message,
    }
  }

  const { email } = validation.data

  try {
    // Check if user exists
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (userResult.length === 0) {
      // Don't reveal if email exists or not for security
      return {
        success: true,
        message: "If an account with that email exists, we've sent a password reset link.",
      }
    }

    const userId = userResult[0].id

    // Generate reset token
    const token = generateResetToken()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Store reset token
    await sql`
      INSERT INTO password_reset_tokens (user_id, token, expires_at)
      VALUES (${userId}, ${token}, ${expiresAt})
    `

    // In a real app, you would send an email here
    // For now, we'll return the token for testing purposes
    console.log(`Password reset token for ${email}: ${token}`)

    return {
      success: true,
      message: "If an account with that email exists, we've sent a password reset link.",
      // Remove this in production - only for testing
      resetToken: token,
    }
  } catch (error) {
    console.error("Password reset request error:", error)
    return {
      error: "Failed to process password reset request. Please try again.",
    }
  }
}

export async function resetPassword(formData: FormData) {
  const rawData = {
    token: formData.get("token") as string,
    password: formData.get("password") as string,
  }

  const validation = passwordResetSchema.safeParse(rawData)
  if (!validation.success) {
    return {
      error: validation.error.errors[0].message,
    }
  }

  const { token, password } = validation.data

  try {
    // Find valid reset token
    const tokenResult = await sql`
      SELECT user_id, expires_at, used_at 
      FROM password_reset_tokens 
      WHERE token = ${token}
    `

    if (tokenResult.length === 0) {
      return {
        error: "Invalid or expired reset token.",
      }
    }

    const resetToken = tokenResult[0]

    // Check if token is expired
    if (new Date() > new Date(resetToken.expires_at)) {
      return {
        error: "Reset token has expired. Please request a new one.",
      }
    }

    // Check if token has already been used
    if (resetToken.used_at) {
      return {
        error: "Reset token has already been used. Please request a new one.",
      }
    }

    // Hash new password
    const passwordHash = await hashPassword(password)

    // Update user password
    await sql`
      UPDATE users 
      SET password_hash = ${passwordHash}, updated_at = NOW()
      WHERE id = ${resetToken.user_id}
    `

    // Mark token as used
    await sql`
      UPDATE password_reset_tokens 
      SET used_at = NOW()
      WHERE token = ${token}
    `

    // Invalidate all existing sessions for this user
    await sql`
      DELETE FROM sessions WHERE user_id = ${resetToken.user_id}
    `

    return {
      success: true,
      message: "Password has been reset successfully. Please log in with your new password.",
    }
  } catch (error) {
    console.error("Password reset error:", error)
    return {
      error: "Failed to reset password. Please try again.",
    }
  }
}

export async function validateResetToken(token: string) {
  try {
    const result = await sql`
      SELECT user_id, expires_at, used_at 
      FROM password_reset_tokens 
      WHERE token = ${token}
    `

    if (result.length === 0) {
      return { valid: false, error: "Invalid reset token." }
    }

    const resetToken = result[0]

    if (new Date() > new Date(resetToken.expires_at)) {
      return { valid: false, error: "Reset token has expired." }
    }

    if (resetToken.used_at) {
      return { valid: false, error: "Reset token has already been used." }
    }

    return { valid: true }
  } catch (error) {
    console.error("Token validation error:", error)
    return { valid: false, error: "Failed to validate token." }
  }
}
