import { requireAuth } from "@/lib/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { SidebarProvider } from "@/contexts/sidebar-context"

// Force dynamic rendering to prevent prerendering issues with Client Components
export const dynamic = 'force-dynamic'

export default async function MessagingPage() {
  const user = await requireAuth()

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar user={user} />
        <div className="flex-1 flex flex-col">
          <ChatInterface user={user} />
        </div>
      </div>
    </SidebarProvider>
  )
}
