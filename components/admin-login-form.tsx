"use client"

import { useActionState } from "react"
import { adminLogin } from "@/app/actions/admin-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(adminLogin, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111113] p-4">
      <Card className="w-full max-w-md bg-[#1a1b1f] border-[#2d2d32] text-white">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-[#8C5CF7]/10">
              <Lock className="w-6 h-6 text-[#8C5CF7]" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@outsoor.com"
                required
                className="bg-[#2d2d32] border-none text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-[#2d2d32] border-none text-white"
              />
            </div>
            
            {state?.error && (
              <div className="text-sm text-red-500 font-medium text-center">
                {state.error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-[#8C5CF7] hover:bg-[#7a4ee3] text-white"
              disabled={isPending}
            >
              {isPending ? "Authenticating..." : "Access Admin Panel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
