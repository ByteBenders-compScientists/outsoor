"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Terminal } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { LogoutButton } from "@/components/logout-button"
import { OutsoorLogo } from "@/components/outsoor-logo"

interface AuthUser {
  id: string
  email: string
  name: string | null
}

export function Header() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data?.user || null)
        setLoading(false)
      })
      .catch(() => {
        setUser(null)
        setLoading(false)
      })
  }, [])

  const navItems = [
    { name: "APIs", href: "#apis" },
    { name: "Pricing", href: "#pricing" },
    { name: "Docs", href: "#docs" },
    { name: "Enterprise", href: "#enterprise" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="w-full py-6 px-6 relative z-50 border-b border-border/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <OutsoorLogo size="lg" variant="header" />
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-muted-foreground hover:text-green-500 px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="w-24 h-10 bg-white/10 rounded animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-muted-foreground hover:text-green-500">
                  <Terminal className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-green-500">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-bold text-foreground">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-muted-foreground hover:text-green-500 text-lg py-2"
                  >
                    {item.name}
                  </Link>
                ))}

                {user ? (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link href="/dashboard" className="w-full">
                      <Button variant="ghost" className="w-full justify-start">
                        <Terminal className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <LogoutButton />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link href="/login" className="w-full">
                      <Button variant="ghost" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup" className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                        Sign Up Free
                      </Button>
                    </Link>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
