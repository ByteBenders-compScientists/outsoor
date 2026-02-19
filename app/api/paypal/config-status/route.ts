import { NextResponse } from 'next/server'
import { 
  getPayPalCredentials, 
  isPayPalConfigured, 
  getPayPalEnvironmentInfo 
} from '@/lib/paypal'

export async function GET() {
  try {
    const environmentInfo = getPayPalEnvironmentInfo()
    const credentials = getPayPalCredentials()
    
    const configStatus = {
      isConfigured: isPayPalConfigured(),
      environment: environmentInfo.environment,
      clientId: credentials.clientId,
      webhookConfigured: !!(process.env.PAYPAL_WEBHOOK_ID_SANDBOX || process.env.PAYPAL_WEBHOOK_ID_LIVE),
      lastChecked: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      configStatus
    })
  } catch (error) {
    console.error('Error checking PayPal configuration:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
