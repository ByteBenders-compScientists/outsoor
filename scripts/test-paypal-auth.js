#!/usr/bin/env node

/**
 * PayPal Authentication Test Script
 * 
 * This script tests the PayPal client authentication and basic API functionality.
 * Run with: node scripts/test-paypal-auth.js
 */

const path = require('path')
const fs = require('fs')

// Load environment variables
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env')
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found')
    return false
  }

  const envContent = fs.readFileSync(envPath, 'utf8')
  const envVars = {}

  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      let value = valueParts.join('=').replace(/"/g, '').trim()
      if (value.includes('#')) {
        value = value.split('#')[0].trim()
      }
      if (value) {
        envVars[key.trim()] = value
      }
    }
  })

  return envVars
}

// Test PayPal authentication
async function testPayPalAuth() {
  console.log('🔐 Testing PayPal Authentication...\n')
  
  try {
    // Load environment variables
    const envVars = loadEnvFile()
    if (!envVars) {
      console.log('❌ Cannot load environment variables')
      return false
    }

    // Set environment variables
    Object.keys(envVars).forEach(key => {
      process.env[key] = envVars[key]
    })

    // Import PayPal SDK
    const paypal = require('@paypal/paypal-server-sdk')
    
    console.log('📋 Environment Configuration:')
    console.log(`  PAYPAL_TEST: ${process.env.PAYPAL_TEST}`)
    console.log(`  Environment: ${process.env.PAYPAL_TEST === 'true' ? 'Sandbox' : 'Live'}`)
    
    // Create PayPal client
    console.log('\n🔧 Creating PayPal client...')
    const environment = process.env.PAYPAL_TEST === 'true' 
      ? paypal.Environment.Sandbox
      : paypal.Environment.Production
    
    const clientId = process.env.PAYPAL_TEST === 'true' 
      ? process.env.PAYPAL_CLIENT_ID_SANDBOX 
      : process.env.PAYPAL_CLIENT_ID_LIVE
    
    const clientSecret = process.env.PAYPAL_TEST === 'true' 
      ? process.env.PAYPAL_CLIENT_SECRET_SANDBOX 
      : process.env.PAYPAL_CLIENT_SECRET_LIVE
    
    console.log(`  Client ID: ${clientId ? '✅ Configured' : '❌ Missing'}`)
    console.log(`  Client Secret: ${clientSecret ? '✅ Configured' : '❌ Missing'}`)
    
    if (!clientId || !clientSecret) {
      console.log('❌ Missing required credentials')
      return false
    }

    const paypalClient = new paypal.Client({
      environment: environment,
      clientId: clientId,
      clientSecret: clientSecret
    })
    
    console.log('✅ PayPal client created successfully')
    
    // Test basic API call
    console.log('\n🧪 Testing basic API call...')
    
    // Try to get access token (this will test authentication)
    try {
      // Create a simple test request
      const testRequest = {
        intent: 'CAPTURE',
        purchaseUnits: [{
          amount: {
            currencyCode: 'USD',
            value: '50.00'
          },
          description: 'Test order'
        }]
      }
      
      console.log('  Test request body:', JSON.stringify(testRequest, null, 2))
      
      // This should trigger authentication
      const OrdersController = paypal.OrdersController
      const ordersController = new OrdersController(paypalClient)
      
      console.log('  Making test API call...')
      const result = await ordersController.createOrder({ body: testRequest })
      
      console.log('✅ API call successful!')
      console.log('  Order ID:', result.result.id)
      console.log('  Status:', result.result.status)
      
      // Clean up - cancel the test order
      console.log('\n🧹 Cleaning up test order...')
      try {
        await ordersController.cancelOrder(result.result.id)
        console.log('✅ Test order cancelled successfully')
      } catch (cancelError) {
        console.log('⚠️  Could not cancel test order (this is normal)')
      }
      
      return true
      
    } catch (apiError) {
      console.log('❌ API call failed:')
      console.log('  Error:', apiError.message)
      
      if (apiError.message.includes('authentication')) {
        console.log('\n🔍 Authentication Issue Detected:')
        console.log('  This suggests the PayPal credentials may be:')
        console.log('  - Invalid or expired')
        console.log('  - Associated with a disabled account')
        console.log('  - Not authorized for the current environment')
        console.log('\n💡 Solutions:')
        console.log('  1. Verify your PayPal Developer account is active')
        console.log('  2. Check if your app is approved for the environment')
        console.log('  3. Regenerate your client credentials')
        console.log('  4. Ensure you\'re using the correct environment (sandbox vs live)')
      }
      
      return false
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message)
    return false
  }
}

// Main test function
async function runTest() {
  console.log('🚀 PayPal Authentication Test\n')
  console.log('=' .repeat(50))
  
  const success = await testPayPalAuth()
  
  console.log('\n' + '=' .repeat(50))
  
  if (success) {
    console.log('\n✅ PayPal authentication test passed!')
    console.log('Your PayPal integration should work correctly.')
  } else {
    console.log('\n❌ PayPal authentication test failed!')
    console.log('Please check the error details above and fix the configuration.')
  }
  
  console.log('\n📚 For help, see PAYPAL_IMPLEMENTATION.md')
}

// Run test if this script is executed directly
if (require.main === module) {
  runTest().catch(console.error)
}

module.exports = { testPayPalAuth }
