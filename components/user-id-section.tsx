"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { copyToClipboard } from "@/lib/api-utils"

interface UserIdSectionProps {
  userId: string
}

export function UserIdSection({ userId }: UserIdSectionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await copyToClipboard(userId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <Card className="bg-[#1A1B1F] border-[#202126] shadow-lg">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
          User ID
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <span className="text-[#E0E0E0] font-mono text-sm bg-[#202126] px-3 py-2 rounded-lg border border-[#2D2D32]">
            {userId}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy} 
            className="text-[#A0A0A8] hover:text-white hover:bg-[#202126]"
          >
            {copied ? <Check className="w-4 h-4 text-[#00ff88]" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
