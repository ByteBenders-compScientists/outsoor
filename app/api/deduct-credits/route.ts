import { NextRequest, NextResponse } from 'next/server'
import { verifyApiToken } from '@/app/actions/api-tokens'
import { sql } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate using API Key
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid Authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const tokenInfo = await verifyApiToken(token)

    if (!tokenInfo) {
      return NextResponse.json(
        { error: 'Invalid API token' },
        { status: 401 }
      )
    }

    // 2. Define deduction amount (Fixed at 1 USD as requested)
    const DEDUCTION_AMOUNT = 1.00
    const userId = tokenInfo.user_id

    // 3. Check balance and Deduct
    // We use a transaction to ensure atomicity
    // Since neon serverless doesn't support BEGIN/COMMIT blocks in the same way as a persistent connection in some drivers,
    // we'll do checks and updates. The trigger handles the balance update, so we just need to insert into credit_transactions.
    
    // First, check balance
    const balanceResult = await sql`
        SELECT balance FROM user_credits WHERE user_id = ${userId}
    `

    if (balanceResult.length === 0) {
        // Initialize credits if not exists (though usually should exist if user created)
        // But let's fail safe
        return NextResponse.json(
            { error: 'User credits account not found' },
            { status: 400 }
        )
    }

    const currentBalance = parseFloat(balanceResult[0].balance)

    if (currentBalance < DEDUCTION_AMOUNT) {
        return NextResponse.json(
            { 
                error: 'Insufficient credits',
                current_balance: currentBalance,
                required: DEDUCTION_AMOUNT
            },
            { status: 402 } // Payment Required
        )
    }

    // 4. Record Transaction (Trigger will update balance)
    // We also parse optional body for description/metadata
    let body = {}
    try {
        body = await request.json()
    } catch (e) {
        // Body is optional
    }

    const description = (body as any).description || 'API Call Deduction'
    const serviceType = (body as any).serviceType || 'api_call'
    
    // Insert into credit_transactions
    const transactionResult = await sql`
        INSERT INTO credit_transactions (
            user_id, 
            type, 
            amount, 
            description, 
            status, 
            metadata
        ) VALUES (
            ${userId},
            'usage',
            ${DEDUCTION_AMOUNT},
            ${description},
            'completed',
            ${JSON.stringify({
                serviceType,
                token_id: tokenInfo.id,
                timestamp: new Date().toISOString()
            })}
        )
        RETURNING id, created_at
    `

    // 5. Log Usage (for analytics)
    await sql`
        INSERT INTO usage_logs (
            user_id, 
            service_type, 
            tokens_used, 
            cost, 
            model_used, 
            request_id
        ) VALUES (
            ${userId},
            ${serviceType},
            1, 
            ${DEDUCTION_AMOUNT},
            'api-deduction',
            ${(body as any).requestId || null}
        )
    `

    // 6. Return Success
    return NextResponse.json({
        success: true,
        message: 'Credits deducted successfully',
        deducted: DEDUCTION_AMOUNT,
        remaining_balance: currentBalance - DEDUCTION_AMOUNT, // Approximate, purely for response
        transaction_id: transactionResult[0].id
    })

  } catch (error) {
    console.error('Deduct credits error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
