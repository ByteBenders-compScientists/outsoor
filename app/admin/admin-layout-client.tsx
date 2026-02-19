"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"

export function AdminLayoutClient({ 
  children, 
  user 
}: { 
  children: React.ReactNode
  user: any 
}) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div className="flex min-h-screen bg-[#111113]">
      <AdminSidebar user={user} onSidebarToggle={setIsCollapsed} />
      <div 
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "pl-[70px]" : "pl-[250px]"
        }`}
      >
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
