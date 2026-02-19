"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  return (
    <div className={cn("relative", className)}>
      {language && (
        <div className="absolute top-0 right-0 z-10 px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded-bl-md">
          {language}
        </div>
      )}
      <pre className="relative overflow-x-auto rounded-lg bg-muted p-4 text-sm">
        <code className="font-mono text-foreground whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  )
}
