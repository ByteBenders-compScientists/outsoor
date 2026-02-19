"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react'

interface PayPalStatusCheckerProps {
  orderId: string
  onStatusChange: (status: string) => void
}

type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'

interface PaymentStatusData {
  status: PaymentStatus
  amount?: number
  captureId?: string
  timestamp: string
  details?: string
}

export function PayPalStatusChecker({ orderId, onStatusChange }: PayPalStatusCheckerProps) {
  const [statusData, setStatusData] = useState<PaymentStatusData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!orderId) return

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/paypal/order-status?orderId=${orderId}`)
        const data = await response.json()

        if (data.success) {
          setStatusData(data.statusData)
          onStatusChange(data.statusData.status)
        } else {
          setError(data.error || 'Failed to check status')
        }
      } catch (error) {
        console.error('Error checking payment status:', error)
        setError('Failed to check payment status')
      } finally {
        setIsLoading(false)
      }
    }

    // Check immediately
    checkStatus()

    // Set up polling every 5 seconds
    const interval = setInterval(checkStatus, 5000)

    return () => clearInterval(interval)
  }, [orderId, onStatusChange])

  if (isLoading) {
    return (
      <Card className="bg-[#1A1B1F] border-[#202126]">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-[#8C5CF7]" />
            <span className="text-[#A0A0A8]">Checking payment status...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-[#1A1B1F] border-[#EF4444]/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-[#EF4444]" />
            <span className="text-[#EF4444]">{error}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!statusData) {
    return null
  }

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
      case 'failed':
        return <XCircle className="h-5 w-5 text-[#EF4444]" />
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-[#F59E0B]" />
      case 'processing':
        return <Loader2 className="h-5 w-5 animate-spin text-[#8C5CF7]" />
      default:
        return <Clock className="h-5 w-5 text-[#F59E0B]" />
    }
  }

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20'
      case 'failed':
        return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20'
      case 'cancelled':
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
      case 'processing':
        return 'bg-[#8C5CF7]/10 text-[#8C5CF7] border-[#8C5CF7]/20'
      default:
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
    }
  }

  const getStatusText = (status: PaymentStatus) => {
    switch (status) {
      case 'completed':
        return 'Payment Completed'
      case 'failed':
        return 'Payment Failed'
      case 'cancelled':
        return 'Payment Cancelled'
      case 'processing':
        return 'Processing Payment'
      default:
        return 'Payment Pending'
    }
  }

  return (
    <Card className="bg-[#1A1B1F] border-[#202126]">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(statusData.status)}
              <div>
                <h4 className="font-medium text-[#FFFFFF]">Payment Status</h4>
                <p className="text-sm text-[#A0A0A8]">
                  {statusData.details || getStatusText(statusData.status)}
                </p>
              </div>
            </div>
            <Badge className={getStatusColor(statusData.status)}>
              {getStatusText(statusData.status)}
            </Badge>
          </div>

          {statusData.amount && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#A0A0A8]">Amount:</span>
              <span className="font-medium text-[#FFFFFF]">${statusData.amount.toFixed(2)}</span>
            </div>
          )}

          {statusData.captureId && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#A0A0A8]">Transaction ID:</span>
              <span className="font-mono text-xs text-[#8C5CF7]">
                {statusData.captureId.slice(0, 8)}...
              </span>
            </div>
          )}

          <div className="flex justify-between items-center text-sm">
            <span className="text-[#A0A0A8]">Last Updated:</span>
            <span className="text-[#A0A0A8]">
              {new Date(statusData.timestamp).toLocaleTimeString()}
            </span>
          </div>

          {statusData.status === 'pending' && (
            <div className="p-3 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg">
              <p className="text-sm text-[#F59E0B]">
                Your payment is being processed. This may take a few moments.
              </p>
            </div>
          )}

          {statusData.status === 'processing' && (
            <div className="p-3 bg-[#8C5CF7]/10 border border-[#8C5CF7]/20 rounded-lg">
              <p className="text-sm text-[#8C5CF7]">
                Payment is being captured. Please wait...
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
