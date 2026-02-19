import React from "react"
import { OutsoorLogo } from "@/components/outsoor-logo"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-8">
        <OutsoorLogo size="xl" variant="header" />
      </div>

      {/* Loading Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-muted rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-green-500 rounded-full animate-spin"></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">Loading...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your experience</p>
      </div>

      {/* Loading Dots */}
      <div className="flex space-x-2 mt-8">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )
}
