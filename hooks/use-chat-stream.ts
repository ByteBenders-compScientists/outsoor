"use client"

import { useState, useCallback } from "react"
import type { ChatMessage } from "@/lib/chat-api"

export function useChatStream() {
  const [isStreaming, setIsStreaming] = useState(false)

  const streamMessage = useCallback(
    async (
      messages: ChatMessage[],
      model: string,
      onChunk: (chunk: string) => void,
      onComplete: (fullMessage: string) => void,
      onError: (error: string) => void,
    ) => {
      setIsStreaming(true)
      let fullMessage = ""

      try {
        const response = await fetch("/api/chat/stream", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages, model }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) {
          throw new Error("No response body")
        }

        while (true) {
          const { done, value } = await reader.read()

          if (done) {
            break
          }

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim()

              if (data) {
                try {
                  const parsed = JSON.parse(data)
                  if (parsed.content) {
                    fullMessage += parsed.content
                    onChunk(parsed.content)
                  }
                } catch (parseError) {
                  // Skip invalid JSON
                  continue
                }
              }
            }
          }
        }

        onComplete(fullMessage)
      } catch (error) {
        console.error("Streaming error:", error)
        onError(error instanceof Error ? error.message : "Unknown error occurred")
      } finally {
        setIsStreaming(false)
      }
    },
    [],
  )

  return { streamMessage, isStreaming }
}
