"use server"

import { neon } from "@neondatabase/serverless"
import { requireAuth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import crypto from "crypto"

const sql = neon(process.env.DATABASE_URL!)

// Generate a secure API token
function generateApiToken(): { token: string; hash: string; prefix: string } {
  const token = crypto.randomBytes(32).toString("hex")
  const hash = crypto.createHash("sha256").update(token).digest("hex")
  const prefix = token.substring(0, 8)
  return { token: `ptr_${token}`, hash, prefix: `ptr_${prefix}` }
}

// Get user's API tokens
export async function getUserTokens() {
  const user = await requireAuth()

  const tokens = await sql`
    SELECT id, name, token_prefix, last_used_at, created_at, expires_at, is_active
    FROM api_tokens 
    WHERE user_id = ${user.id} AND is_active = true
    ORDER BY created_at DESC
  `

  return tokens
}

// Create a new API token
export async function createApiToken(formData: FormData) {
  const user = await requireAuth()
  const name = (formData.get("name") as string) || "Default API token"

  const { token, hash, prefix } = generateApiToken()

  await sql`
    INSERT INTO api_tokens (user_id, name, token_hash, token_prefix)
    VALUES (${user.id}, ${name}, ${hash}, ${prefix})
  `

  revalidatePath("/dashboard/apis")
  return { success: true, token, message: "API token created successfully" }
}

// Regenerate an existing token
export async function regenerateToken(tokenId: number) {
  const user = await requireAuth()

  // Verify token belongs to user
  const existingToken = await sql`
    SELECT id FROM api_tokens 
    WHERE id = ${tokenId} AND user_id = ${user.id} AND is_active = true
  `

  if (existingToken.length === 0) {
    throw new Error("Token not found")
  }

  const { token, hash, prefix } = generateApiToken()

  await sql`
    UPDATE api_tokens 
    SET token_hash = ${hash}, token_prefix = ${prefix}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${tokenId} AND user_id = ${user.id}
  `

  revalidatePath("/dashboard/apis")
  return { success: true, token, message: "Token regenerated successfully" }
}

// Delete an API token
export async function deleteToken(tokenId: number) {
  const user = await requireAuth()

  await sql`
    UPDATE api_tokens 
    SET is_active = false, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${tokenId} AND user_id = ${user.id}
  `

  revalidatePath("/dashboard/apis")
  return { success: true, message: "Token deleted successfully" }
}

// Get user integrations
export async function getUserIntegrations() {
  const user = await requireAuth()

  const integrations = await sql`
    SELECT id, integration_type, integration_name, external_account_id, is_active, created_at
    FROM user_integrations 
    WHERE user_id = ${user.id} AND is_active = true
    ORDER BY created_at DESC
  `

  return integrations
}

// Verify API token (for API usage)
export async function verifyApiToken(token: string) {
  if (!token.startsWith("ptr_")) {
    return null
  }

  const hash = crypto.createHash("sha256").update(token.substring(4)).digest("hex")

  const result = await sql`
    SELECT t.id, t.user_id, t.name, u.email, u.name as user_name
    FROM api_tokens t
    JOIN users u ON t.user_id = u.id
    WHERE t.token_hash = ${hash} AND t.is_active = true
  `

  if (result.length === 0) {
    return null
  }

  // Update last used timestamp
  await sql`
    UPDATE api_tokens 
    SET last_used_at = CURRENT_TIMESTAMP 
    WHERE id = ${result[0].id}
  `

  return result[0]
}
