"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPassword } from "@/app/actions/auth"
import { Loader2, Lock, Eye, EyeOff, CheckCircle, Shield } from "lucide-react"

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Add token to form data
    formData.append("token", token)

    const result = await resetPassword(formData)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      setSuccess(result.message || "Password reset successfully!")
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Password Reset</h1>
          <p className="text-muted-foreground mb-6">{success}</p>
          <p className="text-sm text-muted-foreground">Redirecting you to sign in...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Set New Password</h1>
        <p className="text-muted-foreground">Enter your new password below to complete the reset process</p>
      </div>

      <form action={handleSubmit} className="space-y-6">
        {error && (
          <div className="glass-effect-red rounded-xl p-4 border border-red-500/30 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <p className="text-sm text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Label htmlFor="password" className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            New Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="glass-effect-strong border-white/20 focus:border-primary/60 focus:ring-primary/30 h-12 pl-4 pr-12 rounded-xl backdrop-blur-xl transition-all duration-300 hover-border-green"
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">Minimum 8 characters required</p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              className="glass-effect-strong border-white/20 focus:border-primary/60 focus:ring-primary/30 h-12 pl-4 pr-12 rounded-xl backdrop-blur-xl transition-all duration-300 hover-border-green"
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary h-12 text-base font-semibold rounded-xl glass-effect-strong hover-lift transition-all duration-300 border border-primary/30"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Resetting password...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Reset Password
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
