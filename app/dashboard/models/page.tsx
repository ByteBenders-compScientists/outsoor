import { requireAuth } from "@/lib/auth"
import { DashboardPageClient } from "../dashboard-page-client"

// Force dynamic rendering to prevent prerendering issues with Client Components
export const dynamic = 'force-dynamic'

export default async function ModelsPage() {
  const user = await requireAuth()
  return <DashboardPageClient user={user} />
}
