"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles, Loader2, Paperclip, AtSign } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  variant?: "default" | "welcome"
}

export function MessageInput({ onSendMessage, disabled = false, placeholder = "Type a message...", className = "", variant = "default" }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  if (variant === "welcome") {
    return (
      <form onSubmit={handleSubmit} className={`w-full ${className}`}>
        <div className="relative">
          <div className="flex items-end gap-3 bg-[#202126] border border-[#202126] rounded-2xl p-4 focus-within:border-[#8C5CF7] focus-within:ring-2 focus-within:ring-[#8C5CF7]/20 transition-all duration-200 shadow-lg">
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className="min-h-[44px] max-h-[120px] resize-none bg-transparent border-none text-white placeholder-[#8C8C96] focus:ring-0 focus:outline-none text-base font-medium"
                rows={1}
              />
            </div>

            <Button
              type="submit"
              disabled={!message.trim() || disabled}
              className="bg-gradient-to-r from-[#8C5CF7] to-[#3B1F82] hover:from-[#7C4CF7] hover:to-[#2B0F72] text-white h-11 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {disabled ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Send
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="relative">
        {/* Always Floating Chat Input Container */}
        <div className="flex items-center gap-2 sm:gap-3 bg-[#0D0D0F]/95 backdrop-blur-sm border border-[#202126] rounded-3xl p-3 sm:p-4 focus-within:border-[#8C5CF7] focus-within:ring-2 focus-within:ring-[#8C5CF7]/20 transition-all duration-200 shadow-2xl hover:shadow-3xl mx-2 sm:mx-4 mb-4 min-h-[56px] sm:min-h-[60px] max-h-[56px] sm:max-h-[60px]">
          {/* Attachment Icon */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-[#A0A0A8] hover:text-white hover:bg-[#202126] p-1.5 sm:p-2 rounded-xl transition-all duration-200 flex-shrink-0"
          >
            <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>

          {/* Mention Icon */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-[#A0A0A8] hover:text-white hover:bg-[#202126] p-1.5 sm:p-2 rounded-xl transition-all duration-200 flex-shrink-0"
          >
            <AtSign className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>

          {/* Text Input Field */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a message here..."
              className="w-full bg-transparent border-none text-white placeholder-[#8C8C96] text-sm sm:text-base font-medium focus:outline-none focus:ring-0 h-7 sm:h-8 leading-7 sm:leading-8"
              disabled={disabled}
            />
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            disabled={!message.trim() || disabled}
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white h-9 w-9 sm:h-10 sm:w-10 p-0 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
          >
            {disabled ? (
              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
