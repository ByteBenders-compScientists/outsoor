"use server"

import { sql } from "@/lib/db"
import { createSession, setSessionCookie, hashPassword } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function adminLogin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Hardcoded Admin Credentials
  const ADMIN_EMAIL = "admin@outsoor.com"
  const ADMIN_PASSWORD = "admin"

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { error: "Invalid admin credentials" }
  }

  try {
    // Check if admin user exists in DB
    const existingUsers = await sql`SELECT * FROM users WHERE email = ${ADMIN_EMAIL}`
    
    let userId: string

    if (existingUsers.length === 0) {
      // Create admin user if doesn't exist
      const hashedPassword = await hashPassword(ADMIN_PASSWORD)
      const newUser = await sql`
        INSERT INTO users (email, password_hash, name, role)
        VALUES (${ADMIN_EMAIL}, ${hashedPassword}, 'Super Admin', 'admin')
        RETURNING id
      `
      userId = newUser[0].id
    } else {
      userId = existingUsers[0].id
      // Ensure role is admin
      if (existingUsers[0].role !== 'admin') {
        await sql`UPDATE users SET role = 'admin' WHERE id = ${userId}`
      }
    }

    // Create Session
    const token = await createSession(userId)
    await setSessionCookie(token)

  } catch (error) {
    console.error("Admin login error:", error)
    return { error: "An unexpected error occurred" }
  }

  redirect("/admin")
}
