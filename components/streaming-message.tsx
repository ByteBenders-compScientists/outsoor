"use client"

import { Card } from "@/components/ui/card"
import { Bot } from "lucide-react"

interface StreamingMessageProps {
  content: string
}

export function StreamingMessage({ content }: StreamingMessageProps) {
  return (
    <div className="flex gap-4 justify-start">
      <div className="w-10 h-10 bg-gradient-to-br from-[#8C5CF7] to-[#3B1F82] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
        <Bot className="w-5 h-5 text-white" />
      </div>

      <div className="max-w-[80%]">
        <Card className="p-3 bg-transparent border-[#2D2D32] shadow-sm">
          <div className="text-xs font-semibold text-[#A0A0A8] mb-2">AI Assistant</div>
          <div className="text-white whitespace-pre-wrap leading-relaxed text-sm">
            {content}
            <span className="inline-block w-0.5 h-4 bg-gradient-to-b from-[#8C5CF7] to-[#C85CFA] ml-1 animate-pulse rounded-full"></span>
          </div>
        </Card>
      </div>
    </div>
  )
}
