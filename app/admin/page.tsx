import { getAdminStats } from "@/app/actions/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Activity } from "lucide-react"

export default async function AdminPage() {
  const stats = await getAdminStats()

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Admin Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-[#1a1b1f] border-[#2d2d32] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-[#8C5CF7]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1b1f] border-[#2d2d32] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-[#8C5CF7]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1b1f] border-[#2d2d32] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage Cost</CardTitle>
            <Activity className="h-4 w-4 text-[#8C5CF7]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalUsageCost.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
