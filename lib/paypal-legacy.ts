import * as paypal from '@paypal/checkout-server-sdk'

// PayPal configuration based on environment
const isTestMode = process.env.PAYPAL_TEST === 'true'

// Get PayPal credentials based on environment
export function getPayPalCredentials() {
  if (isTestMode) {
    return {
      clientId: process.env.PAYPAL_CLIENT_ID_SANDBOX!,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET_SANDBOX!,
      environment: 'sandbox' as const,
      baseURL: 'https://api-m.sandbox.paypal.com'
    }
  } else {
    return {
      clientId: process.env.PAYPAL_CLIENT_ID_LIVE!,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET_LIVE!,
      environment: 'live' as const,
      baseURL: 'https://api-m.paypal.com'
    }
  }
}

// Create PayPal client using legacy SDK
export function createPayPalClient() {
  const credentials = getPayPalCredentials()
  
  if (!credentials.clientId || !credentials.clientSecret) {
    throw new Error(`PayPal ${credentials.environment} credentials not configured`)
  }

  try {
    const environment = isTestMode 
      ? new paypal.core.SandboxEnvironment(credentials.clientId, credentials.clientSecret)
      : new paypal.core.LiveEnvironment(credentials.clientId, credentials.clientSecret)

    return new paypal.core.PayPalHttpClient(environment)
  } catch (error) {
    console.error('Error creating PayPal client:', error)
    throw new Error(`Failed to create PayPal client: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Get PayPal client ID for frontend
export function getPayPalClientId() {
  const credentials = getPayPalCredentials()
  return credentials.clientId
}

// Check if PayPal is properly configured
export function isPayPalConfigured() {
  const credentials = getPayPalCredentials()
  return !!(credentials.clientId && credentials.clientSecret)
}

// Get environment info for debugging
export function getPayPalEnvironmentInfo() {
  const credentials = getPayPalCredentials()
  return {
    environment: credentials.environment,
    isConfigured: isPayPalConfigured(),
    baseURL: credentials.baseURL
  }
}

// Helper function to create order request
export function createOrderRequest(orderData: {
  intent: string
  purchaseUnits: Array<{
    amount: { currencyCode: string; value: string }
    description?: string
    customId?: string
    invoiceId?: string
  }>
  applicationContext?: {
    returnUrl: string
    cancelUrl: string
    brandName?: string
    landingPage?: string
    userAction?: string
    shippingPreference?: string
  }
}) {
  const request = new paypal.orders.OrdersCreateRequest()
  request.prefer("return=representation")
  
  // Convert the order data to the format expected by legacy SDK
  const requestBody: any = {
    intent: orderData.intent,
    purchase_units: orderData.purchaseUnits.map(unit => ({
      amount: {
        currency_code: unit.amount.currencyCode,
        value: unit.amount.value
      },
      description: unit.description,
      custom_id: unit.customId,
      invoice_id: unit.invoiceId
    }))
  }
  
  if (orderData.applicationContext) {
    requestBody.application_context = {
      return_url: orderData.applicationContext.returnUrl,
      cancel_url: orderData.applicationContext.cancelUrl,
      brand_name: orderData.applicationContext.brandName,
      landing_page: orderData.applicationContext.landingPage,
      user_action: orderData.applicationContext.userAction,
      shipping_preference: orderData.applicationContext.shippingPreference
    }
  }
  
  request.requestBody(requestBody)
  return request
}

// Helper function to capture order
export function createCaptureRequest(orderId: string) {
  const request = new paypal.orders.OrdersCaptureRequest(orderId)
  request.prefer("return=representation")
  return request
}

// Helper function to get order details
export function createGetOrderRequest(orderId: string) {
  const request = new paypal.orders.OrdersGetRequest(orderId)
  return request
}
