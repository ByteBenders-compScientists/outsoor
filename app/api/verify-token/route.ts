import { NextRequest, NextResponse } from 'next/server'
import { verifyApiToken } from '@/app/actions/api-tokens'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { 
          error: 'API token is required',
          code: 'MISSING_TOKEN',
          message: 'Please provide an API token in the request body'
        },
        { status: 400 }
      )
    }

    if (typeof token !== 'string') {
      return NextResponse.json(
        { 
          error: 'Invalid token format',
          code: 'INVALID_TOKEN_TYPE',
          message: 'Token must be a string'
        },
        { status: 400 }
      )
    }

    if (!token.startsWith('ptr_')) {
      return NextResponse.json(
        { 
          error: 'Invalid API token format',
          code: 'INVALID_TOKEN_FORMAT',
          message: 'Token must start with "ptr_"'
        },
        { status: 400 }
      )
    }

    if (token.length < 20) {
      return NextResponse.json(
        { 
          error: 'Token too short',
          code: 'TOKEN_TOO_SHORT',
          message: 'API token appears to be incomplete'
        },
        { status: 400 }
      )
    }

    const tokenInfo = await verifyApiToken(token)

    if (!tokenInfo) {
      return NextResponse.json(
        { 
          error: 'Invalid or expired API token',
          code: 'INVALID_TOKEN',
          message: 'The provided API token is not valid or has expired'
        },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'API token is valid',
      code: 'TOKEN_VALID',
      token_info: {
        id: tokenInfo.id,
        name: tokenInfo.name,
        user_id: tokenInfo.user_id,
        user_email: tokenInfo.email,
        user_name: tokenInfo.user_name,
        last_used_at: tokenInfo.last_used_at
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred while verifying the token'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to verify your API token',
    endpoint: '/api/verify-token',
    method: 'POST',
    body: {
      token: 'ptr_your_api_token_here'
    },
    example: {
      curl: 'curl -X POST /api/verify-token -H "Content-Type: application/json" -d \'{"token": "ptr_your_token"}\'',
      javascript: 'fetch("/api/verify-token", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({token: "ptr_your_token"}) })'
    }
  })
}
