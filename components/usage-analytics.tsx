"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Zap, Clock } from "lucide-react"

interface UsageAnalyticsProps {
  monthlyUsage?: Array<{
    service_type: string
    request_count: number
    total_tokens: number
    total_cost: number
  }>
  analyticsData?: {
    dailyUsage: Array<{
      date: string
      service_type: string
      requests: number
      tokens: number
      cost: number
    }>
    topModels: Array<{
      model_used: string
      usage_count: number
      total_cost: number
      avg_cost: number
    }>
  }
}

export function UsageAnalytics({ monthlyUsage = [], analyticsData }: UsageAnalyticsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  // Safe calculations with fallback to empty array
  const safeMonthlyUsage = monthlyUsage || []
  const totalRequests = safeMonthlyUsage.reduce((sum, item) => sum + item.request_count, 0)
  const totalTokens = safeMonthlyUsage.reduce((sum, item) => sum + (item.total_tokens || 0), 0)
  const totalCost = safeMonthlyUsage.reduce((sum, item) => sum + item.total_cost, 0)

  const getServiceColor = (serviceType: string) => {
    const colors = {
      chat: "#00ff88",
      api_call: "#0080ff",
      image_generation: "#ff0040",
      default: "#6b7280",
    }
    return colors[serviceType as keyof typeof colors] || colors.default
  }

  return (
    <div className="space-y-6">
      {/* Monthly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Requests</CardTitle>
            <BarChart3 className="h-4 w-4 text-[#00ff88]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#00ff88]">{formatNumber(totalRequests)}</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Tokens Used</CardTitle>
            <Zap className="h-4 w-4 text-[#0080ff]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0080ff]">{formatNumber(totalTokens)}</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Cost</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#ff0040]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#ff0040]">{formatCurrency(totalCost)}</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Service Breakdown */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Usage by Service</CardTitle>
          <CardDescription>Breakdown of your API usage by service type</CardDescription>
        </CardHeader>
        <CardContent>
          {safeMonthlyUsage.length > 0 ? (
            <div className="space-y-4">
              {safeMonthlyUsage.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getServiceColor(service.service_type) }}
                    />
                    <div>
                      <p className="font-medium text-white capitalize">{service.service_type.replace("_", " ")}</p>
                      <p className="text-sm text-gray-400">
                        {formatNumber(service.request_count)} requests
                        {service.total_tokens > 0 && ` • ${formatNumber(service.total_tokens)} tokens`}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-gray-700 text-white">
                    {formatCurrency(service.total_cost)}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No usage data available for this month</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Models */}
      {analyticsData?.topModels && analyticsData.topModels.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Most Used Models</CardTitle>
            <CardDescription>Your top AI models by usage count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topModels.slice(0, 5).map((model, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#00ff88]/10 rounded-lg">
                      <span className="text-sm font-medium text-[#00ff88]">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{model.model_used}</p>
                      <p className="text-sm text-gray-400">
                        {formatNumber(model.usage_count)} uses • Avg {formatCurrency(model.avg_cost)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {formatCurrency(model.total_cost)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
