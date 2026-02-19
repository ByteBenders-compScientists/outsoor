"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface LegalBreadcrumbProps {
  currentPage: string
  currentPageHref: string
}

export function LegalBreadcrumb({ currentPage, currentPageHref }: LegalBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
      <Link 
        href="/" 
        className="hover:text-green-500 transition-colors"
      >
        Home
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link 
        href="/legal" 
        className="hover:text-green-500 transition-colors"
      >
        Legal
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-foreground">{currentPage}</span>
    </nav>
  )
}
