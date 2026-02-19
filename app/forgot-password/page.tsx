import { ForgotPasswordForm } from "@/components/forgot-password-form"
import Link from "next/link"

// Force dynamic rendering to prevent prerendering issues with Client Components
export const dynamic = 'force-dynamic'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background hero-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-effect-strong rounded-2xl p-8 border border-white/20 backdrop-blur-xl">
          <ForgotPasswordForm />

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
