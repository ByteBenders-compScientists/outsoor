import { ResetPasswordForm } from "@/components/reset-password-form"
import { validateResetToken } from "@/app/actions/auth"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

// Force dynamic rendering to prevent prerendering issues with Client Components
export const dynamic = 'force-dynamic'

interface ResetPasswordPageProps {
  searchParams: { token?: string }
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const token = searchParams.token

  if (!token) {
    return (
      <div className="min-h-screen bg-background hero-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="glass-effect-strong rounded-2xl p-8 border border-white/20 backdrop-blur-xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Invalid Link</h1>
              <p className="text-muted-foreground mb-6">This password reset link is missing required information.</p>
              <Link href="/forgot-password">
                <button className="w-full btn-primary h-12 text-base font-semibold rounded-xl glass-effect-strong hover-lift transition-all duration-300 border border-primary/30">
                  Request New Reset Link
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Validate the token
  const validation = await validateResetToken(token)

  if (!validation.valid) {
    return (
      <div className="min-h-screen bg-background hero-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="glass-effect-strong rounded-2xl p-8 border border-white/20 backdrop-blur-xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Link Expired</h1>
              <p className="text-muted-foreground mb-6">
                {validation.error || "This password reset link has expired or is invalid."}
              </p>
              <Link href="/forgot-password">
                <button className="w-full btn-primary h-12 text-base font-semibold rounded-xl glass-effect-strong hover-lift transition-all duration-300 border border-primary/30">
                  Request New Reset Link
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background hero-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-effect-strong rounded-2xl p-8 border border-white/20 backdrop-blur-xl">
          <ResetPasswordForm token={token} />

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
