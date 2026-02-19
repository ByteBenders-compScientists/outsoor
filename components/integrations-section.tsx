import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Integration {
  id: number
  integration_type: string
  integration_name: string
  external_account_id: string | null
  is_active: boolean
  created_at: string
}

interface IntegrationsSectionProps {
  integrations: Integration[]
}

export function IntegrationsSection({ integrations }: IntegrationsSectionProps) {
  if (integrations.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-white mb-2">No integrations</h3>
        <p className="text-[#A0A0A8] mb-4">No integrations connected.</p>
        <Button variant="link" className="text-[#8C5CF7] hover:text-[#7C4CF7]">
          Learn more <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {integrations.map((integration) => (
        <div
          key={integration.id}
          className="flex items-center justify-between p-4 bg-[#202126] border border-[#2D2D32] rounded-lg hover:border-[#8C5CF7]/30 transition-all duration-200"
        >
          <div>
            <h4 className="text-white font-medium">{integration.integration_name}</h4>
            <p className="text-sm text-[#A0A0A8]">{integration.integration_type}</p>
            {integration.external_account_id && (
              <p className="text-xs text-[#5A5A64]">Account: {integration.external_account_id}</p>
            )}
          </div>
          <Button variant="outline" size="sm" className="border-[#2D2D32] text-[#A0A0A8] hover:text-white hover:bg-[#2D2D32]">
            Manage
          </Button>
        </div>
      ))}
    </div>
  )
}
