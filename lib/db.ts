import { neon } from "@neondatabase/serverless"

// Use unpooled connection to avoid connection pooling issues with table creation
const DATABASE_URL = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL or DATABASE_URL_UNPOOLED is not set")
}

export const sql = neon(DATABASE_URL)
