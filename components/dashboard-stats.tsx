import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, Zap } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "API Calls",
      value: "12,345",
      change: "+12%",
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8%",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Performance",
      value: "99.9%",
      change: "+0.1%",
      icon: Zap,
      color: "text-red-400",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={stat.title} className="glass-effect border-white/10 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
