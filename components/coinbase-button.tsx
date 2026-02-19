"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Bitcoin } from "lucide-react"

interface CoinbaseButtonProps {
  amount: number
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function CoinbaseButton({ amount, onSuccess, onError }: CoinbaseButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/coinbase/create-charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      })

      if (!response.ok) {
        throw new Error("Failed to create charge")
      }

      const data = await response.json()
      
      if (data.charge && data.charge.hosted_url) {
        // Open Coinbase Commerce hosted page in new tab
        window.open(data.charge.hosted_url, "_blank")
        
        // In a real implementation, we might want to poll for status
        // or wait for the webhook to update the UI via a socket or SWR
        // For now, we'll just inform the parent that the flow started
        if (onSuccess) {
           // We can't immediately confirm success, but we can close the modal 
           // or show a "Payment Pending" state.
           // However, the TopUpDialog expects immediate success to show the success message.
           // Since crypto is async, we might want to show a toast or a different message.
           // For this task, I'll trigger onSuccess after a delay to simulate 
           // (or strictly speaking, I should probably not call onSuccess until confirmed).
           // But since I can't poll easily without more infrastructure, 
           // I will just leave the window open and let the user handle it.
        }
      } else {
        throw new Error("Invalid response from server")
      }
    } catch (error) {
      console.error("Coinbase payment error:", error)
      if (onError) {
        onError(error instanceof Error ? error.message : "Payment failed")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="w-full h-12 bg-[#0052FF] hover:bg-[#0052FF]/90 text-white font-medium text-lg rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(0,82,255,0.15)] hover:shadow-[0_0_30px_rgba(0,82,255,0.25)] relative overflow-hidden group"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Processing...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Bitcoin className="h-5 w-5" />
          <span>Pay with Crypto</span>
        </div>
      )}
    </Button>
  )
}
