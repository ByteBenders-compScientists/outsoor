"use client"

import { cn } from "@/lib/utils"

interface OutsoorLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "sidebar" | "header"
}

export function OutsoorLogo({ className, size = "md", variant = "default" }: OutsoorLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  }

  const variantClasses = {
    default: "font-bold",
    sidebar: "font-semibold",
    header: "font-bold"
  }

  return (
    <div className={cn(
      "flex items-center gap-2",
      className
    )}>
      {/* Logo Icon */}
      <div className={cn(
        "flex items-center justify-center rounded-lg bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6]",
        size === "sm" ? "w-6 h-6" : 
        size === "md" ? "w-8 h-8" : 
        size === "lg" ? "w-10 h-10" : "w-12 h-12"
      )}>
        <span className={cn(
          "text-white font-bold",
          size === "sm" ? "text-xs" : 
          size === "md" ? "text-sm" : 
          size === "lg" ? "text-base" : "text-lg"
        )}>
          O
        </span>
      </div>

      {/* Logo Text */}
      <div className={cn(
        "font-mono tracking-wide",
        sizeClasses[size],
        variantClasses[variant]
      )}>
        <span className="text-white drop-shadow-sm">OUT</span>
        <span className="text-[#8C5CF7] drop-shadow-sm">SOOR</span>
      </div>
    </div>
  )
}

// Compact version for collapsed sidebar
export function OutsoorLogoCompact({ className }: { className?: string }) {
  return (
    <div className={cn(
      "flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6]",
      className
    )}>
      <span className="text-white font-bold text-sm">O</span>
    </div>
  )
}
