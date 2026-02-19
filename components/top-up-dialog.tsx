"use client"

import type React from "react"

import { useState } from "react"
import { createTopUp } from "@/app/actions/billing"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Loader2, CheckCircle, AlertCircle, Bitcoin } from "lucide-react"
import { PayPalButton } from "@/components/paypal-button"
import { CoinbaseButton } from "@/components/coinbase-button"

interface TopUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

const PRESET_AMOUNTS = [50, 100, 250, 500, 1000]

const PAYMENT_METHODS = [
  { 
    id: "paypal", 
    name: "PayPal", 
    icon: Wallet, 
    description: "Pay with your PayPal account or credit/debit card",
    note: "PayPal accepts all major credit cards including Visa, Mastercard, American Express, and Discover"
  },
  {
    id: "coinbase",
    name: "Coinbase",
    icon: Bitcoin,
    description: "Pay with Bitcoin, Ethereum, USDC, and more",
    note: "Secure crypto payments via Coinbase Commerce"
  }
]

export function TopUpDialog({ open, onOpenChange, onSuccess }: TopUpDialogProps) {
  const [amount, setAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("paypal")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Payment buttons handle the flow
    return
  }

  const handlePaymentSuccess = () => {
    setSuccess(true)
    setTimeout(() => {
      onSuccess()
      setSuccess(false)
      setAmount(50)
      setCustomAmount("")
      setSelectedMethod("paypal")
    }, 2000)
  }

  const handlePaymentError = (error: string) => {
    setError(error)
  }

  const handlePaymentCancel = () => {
    setError("Payment was cancelled")
  }

  const finalAmount = customAmount ? Number.parseFloat(customAmount) || 0 : amount

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-[#1A1B1F] border-[#202126]">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 p-3 bg-[#4ADE80]/10 rounded-full border border-[#4ADE80]/20">
              <CheckCircle className="h-8 w-8 text-[#4ADE80]" />
            </div>
            <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">Payment Successful!</h3>
            <p className="text-[#A0A0A8]">${finalAmount} has been added to your account</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-[#1A1B1F] border-[#202126]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#FFFFFF]">Add Credits</DialogTitle>
          <DialogDescription className="text-[#A0A0A8]">
            Top up your account with credits. Minimum amount is $50.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Selection */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-[#E0E0E0]">Select Amount</Label>
            <div className="grid grid-cols-3 gap-3">
              {PRESET_AMOUNTS.map((presetAmount) => (
                <Button
                  key={presetAmount}
                  type="button"
                  variant={amount === presetAmount && !customAmount ? "default" : "outline"}
                  className={`h-12 ${
                    amount === presetAmount && !customAmount
                      ? "bg-gradient-to-r from-[#8C5CF7] to-[#3B1F82] text-white hover:from-[#7C4CF7] hover:to-[#2B0F72] border-[#8C5CF7]/30"
                      : "border-[#202126] hover:border-[#8C5CF7]/50 text-[#A0A0A8] hover:text-[#E0E0E0] bg-[#1A1B1F]"
                  }`}
                  onClick={() => {
                    setAmount(presetAmount)
                    setCustomAmount("")
                  }}
                >
                  ${presetAmount}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-amount" className="text-sm text-[#A0A0A8]">
                Or enter custom amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5A64]">$</span>
                <Input
                  id="custom-amount"
                  type="number"
                  min="50"
                  max="10000"
                  step="0.01"
                  placeholder="50.00"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="pl-8 bg-[#1A1B1F] border-[#202126] text-[#FFFFFF] placeholder:text-[#5A5A64] focus:border-[#8C5CF7]/60 focus:ring-[#8C5CF7]/30"
                />
              </div>
              {/* Custom Amount Validation Error */}
              {customAmount && Number.parseFloat(customAmount) < 50 && (
                <div className="flex items-center gap-2 p-2 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-[#EF4444]" />
                  <p className="text-xs text-[#EF4444]">Minimum top-up amount is $50 USD</p>
                </div>
              )}
              {/* Custom Amount Validation Error */}
              {customAmount && Number.parseFloat(customAmount) < 50 && (
                <div className="flex items-center gap-2 p-2 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-[#EF4444]" />
                  <p className="text-xs text-[#EF4444]">Minimum top-up amount is $50 USD</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-[#E0E0E0]">Payment Method</Label>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon
                const isSelected = selectedMethod === method.id
                return (
                  <div 
                    key={method.id} 
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <Card className={`p-4 flex-1 transition-all duration-200 ${
                      isSelected 
                        ? "border-[#8C5CF7] bg-[#8C5CF7]/10 ring-1 ring-[#8C5CF7]" 
                        : "border-[#202126] bg-[#1A1B1F] hover:border-[#8C5CF7]/50"
                    }`}>
                      <CardContent className="p-0 flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? "bg-[#8C5CF7]/20" : "bg-[#202126]"}`}>
                          <Icon className={`h-5 w-5 ${isSelected ? "text-[#8C5CF7]" : "text-[#A0A0A8]"}`} />
                        </div>
                        <div>
                          <p className={`font-medium ${isSelected ? "text-[#FFFFFF]" : "text-[#A0A0A8]"}`}>{method.name}</p>
                          <p className="text-sm text-[#5A5A64]">{method.description}</p>
                          {method.note && isSelected && (
                            <p className="text-xs text-[#8C5CF7]/80 mt-1">{method.note}</p>
                          )}
                        </div>
                        {isSelected && (
                          <div className="ml-auto">
                            <CheckCircle className="h-5 w-5 text-[#8C5CF7]" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-[#EF4444]" />
              <p className="text-sm text-[#EF4444]">{error}</p>
            </div>
          )}

          {/* Summary and Submit */}
          <div className="space-y-4 pt-4 border-t border-[#202126]">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#A0A0A8]">Amount to add:</span>
              <span className="font-medium text-[#FFFFFF]">${finalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#A0A0A8]">Processing fee:</span>
              <span className="font-medium text-[#FFFFFF]">$0.00</span>
            </div>
            <div className="flex justify-between items-center font-medium border-t border-[#202126] pt-2">
              <span className="text-[#FFFFFF]">Total:</span>
              <span className="text-[#8C5CF7]">${finalAmount.toFixed(2)}</span>
            </div>

            <div className="space-y-3">
              {selectedMethod === "paypal" ? (
                <PayPalButton
                  amount={finalAmount}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  onCancel={handlePaymentCancel}
                />
              ) : (
                <CoinbaseButton
                  amount={finalAmount}
                  onError={handlePaymentError}
                  // For Coinbase, we don't auto-close on "success" because it's async
                  // The user has to pay in the new tab. 
                  // But we can trigger a pending state or just let them close it.
                />
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full border-[#202126] hover:border-[#8C5CF7]/30 text-[#A0A0A8] hover:text-[#E0E0E0] bg-[#1A1B1F]"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
