import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, CreditCard, Clock } from "lucide-react"

interface BillingOverviewProps {
  billingData: {
    credits?: {
      balance: number
      total_spent: number
      total_topped_up: number
    }
  } | null
}

export function BillingOverview({ billingData }: BillingOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Provide default values if billingData or credits is undefined
  const credits = billingData?.credits || { balance: 0, total_spent: 0, total_topped_up: 0 }

  // Ensure all values are numbers and have fallbacks
  const safeCredits = {
    balance: typeof credits.balance === 'number' ? credits.balance : 0,
    total_spent: typeof credits.total_spent === 'number' ? credits.total_spent : 0,
    total_topped_up: typeof credits.total_topped_up === 'number' ? credits.total_topped_up : 0,
  }

  const overviewCards = [
    {
      title: "Current Balance",
      value: formatCurrency(safeCredits.balance),
      description: "Available credits",
      icon: DollarSign,
      color: "text-[#00ff88]",
      bgColor: "bg-[#00ff88]/10",
      borderColor: "border-[#00ff88]/20",
    },
    {
      title: "Total Spent",
      value: formatCurrency(safeCredits.total_spent),
      description: "All-time usage",
      icon: TrendingUp,
      color: "text-[#ff0040]",
      bgColor: "bg-[#ff0040]/10",
      borderColor: "border-[#ff0040]/20",
    },
    {
      title: "Total Topped Up",
      value: formatCurrency(safeCredits.total_topped_up),
      description: "All-time deposits",
      icon: CreditCard,
      color: "text-[#0080ff]",
      bgColor: "bg-[#0080ff]/10",
      borderColor: "border-[#0080ff]/20",
    },
    {
      title: "Estimated Runtime",
      value: `${Math.floor(safeCredits.balance / 0.01)} calls`,
      description: "At avg $0.01/call",
      icon: Clock,
      color: "text-gray-300",
      bgColor: "bg-gray-800/50",
      borderColor: "border-gray-700",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewCards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className={`bg-gray-900/50 ${card.borderColor} ${card.bgColor}/5`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{card.title}</CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
              <p className="text-xs text-gray-500 mt-1">{card.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
