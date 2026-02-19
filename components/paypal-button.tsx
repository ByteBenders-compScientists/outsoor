"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface PayPalButtonProps {
  amount: number
  onSuccess: (amount: number) => void
  onError: (error: string) => void
  onCancel: () => void
}

// PayPal hosted checkout component
function PayPalHostedCheckout({ amount, onSuccess, onError, onCancel }: PayPalButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')

  const handlePayPalCheckout = async () => {
    try {
      setIsProcessing(true)
      setStatus('processing')

      // Create PayPal order
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      const data = await response.json()

      if (data.success && data.links) {
        // Find the approval URL from PayPal response
        const approvalLink = data.links.find((link: any) => link.rel === 'approve')
        
        if (approvalLink) {
          // Redirect to PayPal hosted checkout
          window.location.href = approvalLink.href
        } else {
          throw new Error('PayPal approval link not found')
        }
      } else {
        throw new Error(data.error || 'Failed to create PayPal order')
      }
    } catch (error) {
      console.error('Error creating PayPal order:', error)
      setStatus('error')
      onError(error instanceof Error ? error.message : 'Failed to create order')
      setIsProcessing(false)
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 p-3 bg-[#4ADE80]/10 border border-[#4ADE80]/20 rounded-lg">
        <CheckCircle className="h-4 w-4 text-[#4ADE80]" />
        <span className="text-sm text-[#4ADE80]">Payment successful!</span>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <Button
        onClick={() => setStatus('idle')}
        variant="outline"
        className="w-full border-[#EF4444]/30 text-[#EF4444] hover:border-[#EF4444]/50"
      >
        Try Again
      </Button>
    )
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handlePayPalCheckout}
        disabled={isProcessing}
        className="w-full bg-[#0070BA] hover:bg-[#005EA6] text-white font-medium py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Redirecting to PayPal...
          </>
        ) : (
          <>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 7.946a.641.641 0 0 1 .633-.543h3.39c3.19 0 5.7 1.657 6.5 4.2.8 2.543.4 4.8-.8 6.4-1.2 1.6-3.1 2.4-5.2 2.4h-1.5l-.8 1.334zm0-13.334H6.2c-.4 0-.7.2-.8.6L4.2 19.4h1.5c.4 0 .7-.2.8-.6l1.2-6.4c.1-.4-.2-.8-.6-.8h-1.5z"/>
            </svg>
            <span>Pay with PayPal</span>
            <span className="font-semibold">${amount.toFixed(2)}</span>
          </>
        )}
      </Button>
      
      {isProcessing && (
        <div className="text-xs text-[#5A5A64] text-center p-2 bg-[#0070BA]/10 border border-[#0070BA]/20 rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-3 w-3 animate-spin text-[#0070BA]" />
            Redirecting you to PayPal's secure checkout page...
          </div>
        </div>
      )}
    </div>
  )
}

// Main PayPal component with provider
export function PayPalButton(props: PayPalButtonProps) {
  const [clientId, setClientId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  // Get PayPal client ID from environment
  const fetchClientId = async () => {
    try {
      const response = await fetch('/api/paypal/client-id')
      const data = await response.json()
      
      if (data.success) {
        setClientId(data.clientId)
        setError(null)
        // Debug logging in development
        if (process.env.NODE_ENV === 'development') {
          console.log('PayPal client ID loaded:', data.clientId)
          console.log('PayPal environment:', data.environment)
        }
      } else {
        throw new Error(data.error || 'Failed to get PayPal configuration')
      }
    } catch (error) {
      console.error('Error fetching PayPal client ID:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-retry function
  const retryWithBackoff = async () => {
    if (retryCount >= 5) {
      setError('PayPal is temporarily unavailable. Please try again later.')
      return
    }

    setIsRetrying(true)
    setError(null)
    
    try {
      await fetchClientId()
    } catch (error) {
      setRetryCount(prev => prev + 1)
      setError(null)
      
      // Exponential backoff: wait 1s, 2s, 4s, 8s, 16s
      const delay = Math.min(1000 * Math.pow(2, retryCount), 16000)
      
      setTimeout(() => {
        if (retryCount < 5) {
          retryWithBackoff()
        }
      }, delay)
    } finally {
      setIsRetrying(false)
    }
  }

  useEffect(() => {
    retryWithBackoff()
  }, [])

  if (isLoading || isRetrying) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-[#8C5CF7]" />
          <span className="ml-2 text-[#A0A0A8]">
            {isRetrying ? 'Please wait...' : 'Loading payment options...'}
          </span>
        </div>
        <div className="p-3 bg-[#8C5CF7]/10 border border-[#8C5CF7]/20 rounded-lg">
          <p className="text-sm text-[#8C5CF7] text-center">
            {isRetrying ? 'Please wait...' : 'Initializing PayPal payment system...'}
          </p>
        </div>
      </div>
    )
  }

  if (error || !clientId) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg">
          <AlertCircle className="h-4 w-4 text-[#EF4444]" />
          <span className="text-sm text-[#EF4444]">
            {error || 'PayPal is not configured'}
          </span>
        </div>
        <div className="text-xs text-[#5A5A64] text-center">
          {retryCount >= 5 
            ? 'We\'re experiencing some technical difficulties. Please try again in a few minutes.'
            : 'Hang tight! We\'re working on getting you connected...'
          }
        </div>
        <div className="flex gap-2">
          <Button
            onClick={retryWithBackoff}
            variant="outline"
            className="flex-1 border-[#EF4444]/30 text-[#EF4444] hover:border-[#EF4444]/50"
            disabled={isRetrying}
          >
            {isRetrying ? 'Retrying...' : 'Retry Now'}
          </Button>
          <Button
            onClick={() => props.onError('PayPal unavailable - please try again later')}
            variant="outline"
            className="flex-1 border-[#8C5CF7]/30 text-[#8C5CF7] hover:border-[#8C5CF7]/50"
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <PayPalHostedCheckout {...props} />
  )
}
