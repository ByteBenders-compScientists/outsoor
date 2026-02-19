import crypto from 'crypto'

const COINBASE_API_URL = 'https://api.commerce.coinbase.com'

export const getCoinbaseConfig = () => {
  const apiKey = process.env.COINBASE_COMMERCE_API_KEY
  const webhookSecret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET

  if (!apiKey || !webhookSecret) {
    console.warn('Coinbase Commerce environment variables are missing')
  }

  return {
    apiKey,
    webhookSecret,
  }
}

interface CreateChargeParams {
  name: string
  description: string
  pricing_type: 'fixed_price' | 'no_price'
  local_price: {
    amount: string
    currency: string
  }
  metadata?: Record<string, any>
  redirect_url?: string
  cancel_url?: string
}

export async function createCoinbaseCharge(params: CreateChargeParams) {
  const { apiKey } = getCoinbaseConfig()

  if (!apiKey) {
    throw new Error('Coinbase Commerce API key is not configured')
  }

  const response = await fetch(`${COINBASE_API_URL}/charges`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CC-Api-Key': apiKey,
      'X-CC-Version': '2018-03-22',
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Coinbase API error: ${response.statusText} - ${errorBody}`)
  }

  const data = await response.json()
  return data.data
}

export function verifyCoinbaseWebhook(
  rawBody: string,
  signature: string,
  sharedSecret: string
): boolean {
  const hmac = crypto.createHmac('sha256', sharedSecret)
  hmac.update(rawBody)
  const computedSignature = hmac.digest('hex')
  
  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  )
}
