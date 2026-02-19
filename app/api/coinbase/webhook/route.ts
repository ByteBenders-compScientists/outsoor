import { NextResponse } from "next/server"
import { verifyCoinbaseWebhook } from "@/lib/coinbase"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(req: Request) {
  const rawBody = await req.text()
  const signature = req.headers.get("X-CC-Webhook-Signature")
  const webhookSecret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 })
  }

  try {
    const isValid = verifyCoinbaseWebhook(rawBody, signature, webhookSecret)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event = JSON.parse(rawBody)
    const { type, data } = event

    if (type === "charge:confirmed" || type === "charge:resolved") {
      const { metadata, payments } = data
      const userId = metadata?.userId
      const amount = parseFloat(data.pricing.local.amount)
      
      // Ensure we have a valid payment
      const payment = payments && payments.length > 0 ? payments[0] : null
      const transactionId = payment ? payment.transaction_id : data.code

      if (userId && amount > 0) {
        // Initialize user credits if they don't exist
        const existingCredits = await sql`
          SELECT id FROM user_credits WHERE user_id = ${userId}
        `
        
        if (existingCredits.length === 0) {
          await sql`
            INSERT INTO user_credits (user_id, balance, total_spent, total_topped_up)
            VALUES (${userId}, 0.00, 0.00, 0.00)
          `
        }

        // Check if this transaction has already been processed to avoid duplicates
        // We use the charge code or transaction ID as reference
        const existingTx = await sql`
          SELECT id FROM credit_transactions 
          WHERE reference_id = ${data.code} AND type = 'topup'
        `

        if (existingTx.length === 0) {
          // Update user balance
          await sql`
            UPDATE user_credits 
            SET balance = balance + ${amount},
                total_topped_up = total_topped_up + ${amount},
                updated_at = NOW()
            WHERE user_id = ${userId}
          `

          // Record transaction
          await sql`
            INSERT INTO credit_transactions (
              user_id, type, amount, description, reference_id, status, metadata
            ) VALUES (
              ${userId},
              'topup',
              ${amount},
              'Top-up via Coinbase',
              ${data.code},
              'completed',
              ${JSON.stringify({
                coinbaseCode: data.code,
                paymentMethod: 'coinbase',
                transactionId: transactionId,
                timestamp: new Date().toISOString()
              })}
            )
          `
          
          console.log(`Processed Coinbase payment: ${data.code} for user ${userId} amount $${amount}`)
        } else {
          console.log(`Transaction ${data.code} already processed`)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing Coinbase webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
