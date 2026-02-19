import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Database, Shield } from "lucide-react"

export function DashboardContent() {
  const features = [
    {
      title: "API Integration",
      description: "Connect your applications with our powerful API endpoints",
      icon: Code,
      color: "text-primary",
    },
    {
      title: "Data Analytics",
      description: "Get insights from your data with advanced analytics tools",
      icon: Database,
      color: "text-blue-400",
    },
    {
      title: "Security",
      description: "Enterprise-grade security for all your applications",
      icon: Shield,
      color: "text-red-400",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Card key={feature.title} className="glass-effect border-white/10 hover-lift">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-white/5 ${feature.color}`}>
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </div>
            <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between hover:bg-white/10">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
