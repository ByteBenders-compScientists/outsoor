import { requireAuth } from "@/lib/auth"
import { DashboardPageClient } from "../dashboard-page-client"

export const dynamic = 'force-dynamic'

export default async function TeamPage() {
  const user = await requireAuth()
  return <DashboardPageClient user={user} />
}