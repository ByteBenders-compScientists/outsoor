"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Check, Bot, User } from "lucide-react"
import type { ChatMessage as ChatMessageType } from "@/lib/chat-api"

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessageComponent({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === "user"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"} group`}>
      {!isUser && (
        <div className="w-10 h-10 bg-gradient-to-br from-[#8C5CF7] to-[#3B1F82] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? "order-first" : ""}`}>
        <Card
          className={`p-3 shadow-sm hover:shadow-md transition-all duration-200 bg-transparent border-[#2D2D32] hover:border-[#3D3D42]`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className={`text-xs font-semibold mb-2 ${
                isUser
                  ? "text-[#8C5CF7]"
                  : "text-[#A0A0A8]"
              }`}>
                {isUser ? "You" : "AI Assistant"}
              </div>
              <div className="text-white whitespace-pre-wrap leading-relaxed text-sm">
                {message.content}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-[#8C8C96] hover:text-[#A0A0A8] hover:bg-[#2D2D32]"
            >
              {copied ? (
                <Check className="w-3 h-3 text-[#4ADE80]" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
          </div>
        </Card>
      </div>

      {isUser && (
        <div className="w-10 h-10 bg-gradient-to-br from-[#4ADE80] to-[#22C55E] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  )
}

export { ChatMessageComponent as ChatMessage }
