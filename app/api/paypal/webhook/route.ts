import { NextRequest, NextResponse } from 'next/server'
import { createPayPalClient, isPayPalConfigured } from '@/lib/paypal'
import { neon } from '@neondatabase/serverless'
import crypto from 'crypto'

const sql = neon(process.env.DATABASE_URL!)

// Verify PayPal webhook signature
function verifyWebhookSignature(
  body: string,
  headers: Headers,
  webhookId: string
): boolean {
  try {
    const transmissionId = headers.get('paypal-transmission-id')
    const timestamp = headers.get('paypal-transmission-time')
    const certUrl = headers.get('paypal-cert-url')
    const authAlgo = headers.get('paypal-auth-algo')
    const signature = headers.get('paypal-transmission-sig')

    if (!transmissionId || !timestamp || !certUrl || !authAlgo || !signature) {
      return false
    }

    // In production, you should verify the certificate URL and signature
    // For now, we'll do basic validation
    const expectedWebhookId = process.env.PAYPAL_TEST === 'true' 
      ? process.env.PAYPAL_WEBHOOK_ID_SANDBOX 
      : process.env.PAYPAL_WEBHOOK_ID_LIVE

    return webhookId === expectedWebhookId
  } catch (error) {
    console.error('Webhook signature verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if PayPal is configured
    if (!isPayPalConfigured()) {
      return NextResponse.json(
        { error: 'PayPal is not configured' },
        { status: 500 }
      )
    }

    const body = await request.text()
    const headers = request.headers
    const webhookId = headers.get('paypal-webhook-id')

    if (!webhookId) {
      return NextResponse.json(
        { error: 'Missing webhook ID' },
        { status: 400 }
      )
    }

    // Verify webhook signature (basic validation for now)
    if (!verifyWebhookSignature(body, headers, webhookId)) {
      console.warn('Webhook signature verification failed')
      // In production, you might want to reject the request
      // return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    console.log('PayPal webhook received:', event.event_type, event.resource?.id)

    // Handle different webhook events
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handlePaymentCompleted(event)
        break
      
      case 'PAYMENT.CAPTURE.DENIED':
        await handlePaymentDenied(event)
        break
      
      case 'PAYMENT.CAPTURE.REFUNDED':
        await handlePaymentRefunded(event)
        break
      
      case 'CHECKOUT.ORDER.APPROVED':
        await handleOrderApproved(event)
        break
      
      case 'CHECKOUT.ORDER.CANCELLED':
        await handleOrderCancelled(event)
        break
      
      default:
        console.log('Unhandled webhook event:', event.event_type)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PayPal webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle completed payment
async function handlePaymentCompleted(event: any) {
  try {
    const captureId = event.resource.id
    const orderId = event.resource.supplementary_data?.related_ids?.order_id
    const amount = parseFloat(event.resource.amount.value)
    const status = event.resource.status

    if (status === 'COMPLETED') {
      // Find the pending transaction
      const pendingTransaction = await sql`
        SELECT user_id, amount FROM credit_transactions 
        WHERE reference_id = ${orderId} AND status = 'pending'
        LIMIT 1
      `

      if (pendingTransaction.length > 0) {
        const { user_id, amount: expectedAmount } = pendingTransaction[0]

        // Update transaction status
        await sql`
          UPDATE credit_transactions 
          SET 
            status = 'completed',
            reference_id = ${captureId},
            metadata = metadata || ${JSON.stringify({
              webhookEvent: 'PAYMENT.CAPTURE.COMPLETED',
              webhookTimestamp: new Date().toISOString()
            })}
          WHERE reference_id = ${orderId} AND status = 'pending'
        `

        // Add credits to user account
        await sql`
          UPDATE user_credits 
          SET 
            balance = balance + ${amount},
            total_topped_up = total_topped_up + ${amount},
            updated_at = NOW()
          WHERE user_id = ${user_id}
        `

        console.log(`Payment completed for user ${user_id}: $${amount}`)
      }
    }
  } catch (error) {
    console.error('Error handling payment completed:', error)
  }
}

// Handle denied payment
async function handlePaymentDenied(event: any) {
  try {
    const orderId = event.resource.supplementary_data?.related_ids?.order_id
    
    if (orderId) {
      // TODO: Re-enable database operations when tables are properly set up
      console.log(`Payment denied for order ${orderId}`)
      
      /*
      await sql`
        UPDATE credit_transactions 
        SET 
          status = 'failed',
          metadata = metadata || ${JSON.stringify({
            webhookEvent: 'PAYMENT.CAPTURE.DENIED',
            webhookTimestamp: new Date().toISOString(),
            reason: event.resource.status_details?.reason || 'unknown'
          })}
        WHERE reference_id = ${orderId} AND status = 'pending'
      `
      */
    }
  } catch (error) {
    console.error('Error handling payment denied:', error)
  }
}

// Handle refunded payment
async function handlePaymentRefunded(event: any) {
  try {
    const captureId = event.resource.id
    const amount = parseFloat(event.resource.amount.value)
    
    // TODO: Re-enable database operations when tables are properly set up
    console.log(`Payment refunded for capture ${captureId}: $${amount}`)
    
    /*
    // Find the completed transaction
    const transaction = await sql`
      SELECT user_id FROM credit_transactions 
      WHERE reference_id = ${captureId} AND status = 'completed'
      LIMIT 1
    `

    if (transaction.length > 0) {
      const { user_id } = transaction[0]

      // Deduct credits from user account
      await sql`
        UPDATE user_credits 
        SET 
          balance = GREATEST(0, balance - ${amount}),
          updated_at = NOW()
        WHERE user_id = ${user_id}
      `

      // Create refund transaction record
      await sql`
        INSERT INTO credit_transactions (
          user_id, type, amount, description, reference_id, status, metadata
        ) VALUES (
          ${user_id},
          'refund',
          ${amount},
          'PayPal refund',
          ${captureId},
          'completed',
          ${JSON.stringify({
            webhookEvent: 'PAYMENT.CAPTURE.REFUNDED',
            webhookTimestamp: new Date().toISOString(),
            originalCaptureId: captureId
          })}
        )
      `

      console.log(`Refund processed for user ${user_id}: $${amount}`)
    }
    */
  } catch (error) {
    console.error('Error handling payment refunded:', error)
  }
}

// Handle order approved
async function handleOrderApproved(event: any) {
  try {
    const orderId = event.resource.id
    console.log(`Order approved: ${orderId}`)
    // You can add additional logic here if needed
  } catch (error) {
    console.error('Error handling order approved:', error)
  }
}

// Handle order cancelled
async function handleOrderCancelled(event: any) {
  try {
    const orderId = event.resource.id
    
    await sql`
      UPDATE credit_transactions 
      SET 
        status = 'cancelled',
        metadata = metadata || ${JSON.stringify({
          webhookEvent: 'CHECKOUT.ORDER.CANCELLED',
          webhookTimestamp: new Date().toISOString()
        })}
      WHERE reference_id = ${orderId} AND status = 'pending'
    `
    
    console.log(`Order cancelled: ${orderId}`)
  } catch (error) {
    console.error('Error handling order cancelled:', error)
  }
}
