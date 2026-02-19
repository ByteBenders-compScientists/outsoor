import { NextResponse } from 'next/server'
import { getPayPalClientId, isPayPalConfigured } from '@/lib/paypal'

export async function GET() {
  try {
    // Check if PayPal is configured
    if (!isPayPalConfigured()) {
      return NextResponse.json(
        { error: 'PayPal is not configured' },
        { status: 500 }
      )
    }

    const clientId = getPayPalClientId()

    if (!clientId) {
      return NextResponse.json(
        { error: 'PayPal client ID not found' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      clientId,
      environment: process.env.PAYPAL_TEST === 'true' ? 'sandbox' : 'live'
    })
  } catch (error) {
    console.error('Error getting PayPal client ID:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
