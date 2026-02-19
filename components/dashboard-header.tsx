import type { User } from "@/lib/auth"
import { LogoutButton } from "@/components/logout-button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface DashboardHeaderProps {
  user: User
}

interface UserCredits {
  balance: number
  total_spent: number
  total_topped_up: number
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [credits, setCredits] = useState<UserCredits | null>(null)
  
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email[0].toUpperCase()

  // Fetch user credits
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const creditsRes = await fetch("/api/user/credits")
        if (creditsRes.ok) {
          const creditsData = await creditsRes.json()
          if (creditsData.success) {
            setCredits(creditsData.credits)
          }
        }
      } catch (error) {
        console.error("Failed to fetch user credits:", error)
      }
    }

    fetchCredits()
  }, [])

  const refreshCredits = async () => {
    try {
      const creditsRes = await fetch("/api/user/credits")
      if (creditsRes.ok) {
        const creditsData = await creditsRes.json()
        if (creditsData.success) {
          setCredits(creditsData.credits)
        }
      }
    } catch (error) {
      console.error("Failed to refresh user credits:", error)
    }
  }

  return (
    <header className="border-b border-white/10 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold gradient-text">
              Pointer AI
            </Link>
            <div className="hidden md:block w-px h-6 bg-white/20" />
            <span className="hidden md:block text-sm text-muted-foreground">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Credits Display */}
            {credits && (
              <div 
                className="hidden md:flex items-center gap-2 px-3 py-2 bg-[#1A1B1F] border border-[#2D2D32] rounded-lg cursor-pointer hover:bg-[#2D2D32] transition-colors duration-200"
                onClick={refreshCredits}
                title="Click to refresh"
              >
                <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
                <span className="text-sm text-[#A0A0A8]">
                  ${credits.balance.toFixed(2)} available
                </span>
              </div>
            )}
            
            {/* Add Credit Button */}
            <Link href="/dashboard/billing">
              <Button variant="outline" size="sm" className="border-[#8C5CF7]/30 text-[#8C5CF7] hover:bg-[#8C5CF7]/10 hover:border-[#8C5CF7]/50">
                <Plus className="w-4 h-4 mr-2" />
                Add Credit
              </Button>
            </Link>
            
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border border-white/20">
                <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{user.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}
