import { sql } from "./db"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface User {
  id: string
  email: string
  name: string | null
  role: string
  created_at: string
}

export interface Session {
  id: string
  user_id: string
  token: string
  expires_at: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateSessionToken(): string {
  return crypto.randomUUID() + crypto.randomUUID().replace(/-/g, "")
}

export async function createSession(userId: string): Promise<string> {
  const token = generateSessionToken()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  await sql`
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES (${userId}, ${token}, ${expiresAt})
  `

  return token
}

export async function getSession(token: string): Promise<(Session & { user: User }) | null> {
  const result = await sql`
    SELECT 
      s.id, s.user_id, s.token, s.expires_at,
      u.id as user_id, u.email, u.name, u.role, u.created_at as user_created_at
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ${token} AND s.expires_at > NOW()
  `

  if (result.length === 0) return null

  const row = result[0]
  return {
    id: row.id,
    user_id: row.user_id,
    token: row.token,
    expires_at: row.expires_at,
    user: {
      id: row.user_id,
      email: row.email,
      name: row.name,
      role: row.role || 'user',
      created_at: row.user_created_at,
    },
  }
}

export async function deleteSession(token: string): Promise<void> {
  await sql`DELETE FROM sessions WHERE token = ${token}`
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session")?.value

  if (!sessionToken) return null

  const session = await getSession(sessionToken)
  return session?.user || null
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  return user
}

export async function requireAdmin(): Promise<User> {
  const user = await getCurrentUser()
  if (!user || user.role !== 'admin') {
    redirect("/dashboard")
  }
  return user
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}
