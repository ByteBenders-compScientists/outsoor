import { requireAuth } from "@/lib/auth"
import { ModelsDocsIndex } from "@/components/models-docs-index"

// Force dynamic rendering to prevent prerendering issues with Client Components
export const dynamic = 'force-dynamic'

export default async function ModelsDocsIndexPage() {
  const user = await requireAuth()
  return <ModelsDocsIndex user={user} />
}
