import { SignupForm } from "@/components/signup-form"
import Link from "next/link"
import { Brain, Zap, Shield, Globe, Code, Sparkles } from "lucide-react"
import type { Metadata } from 'next'

// Force dynamic rendering to prevent prerendering issues with Client Components
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your Outsoor account and start building with enterprise AI APIs. Get started with free tier access.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SignupPage() {
  const apiModels = [
    {
      name: "GPT-4 Turbo",
      description: "Latest OpenAI model with enhanced reasoning",
      icon: Brain,
      color: "text-[#5567F7]"
    },
    {
      name: "Claude 3.5 Sonnet",
      description: "Anthropic's most capable model",
      icon: Sparkles,
      color: "text-[#C85CFA]"
    },
    {
      name: "Gemini Pro",
      description: "Google's advanced AI model",
      icon: Zap,
      color: "text-[#FACC15]"
    },
    {
      name: "Llama 3",
      description: "Meta's open-source powerhouse",
      icon: Code,
      color: "text-[#4ADE80]"
    }
  ]

  const features = [
    {
      title: "50+ AI Models",
      description: "Access to the latest AI models from leading providers",
      icon: Brain,
      color: "text-[#8C5CF7]"
    },
    {
      title: "Enterprise Security",
      description: "SOC 2 compliant with enterprise-grade security",
      icon: Shield,
      color: "text-[#4ADE80]"
    },
    {
      title: "Global Infrastructure",
      description: "99.99% uptime with <200ms latency worldwide",
      icon: Globe,
      color: "text-[#5567F7]"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F] relative overflow-hidden">
      {/* Background effects with theme colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F]"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8C5CF7]/10 via-[#C85CFA]/5 to-[#5567F7]/10"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto">
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - API Models & Features (Hidden on mobile) */}
            <div className="hidden lg:block space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-[#8C5CF7] via-[#C85CFA] to-[#5567F7] bg-clip-text text-transparent">
                    Build the Future with AI
                  </span>
                </h1>
                <p className="text-xl text-[#E0E0E0] leading-relaxed">
                  Join thousands of developers using the most advanced AI models through our unified API platform.
                </p>
              </div>

              {/* API Models Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#FFFFFF]">Popular AI Models</h3>
                <div className="grid grid-cols-2 gap-3">
                  {apiModels.map((model, index) => (
                    <div key={index} className="bg-[#1A1B1F] border border-[#202126] rounded-xl p-4 hover:border-[#8C5CF7]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#8C5CF7]/10">
                      <div className="flex items-center gap-3">
                        <model.icon className={`w-5 h-5 ${model.color}`} />
                        <div>
                          <h4 className="font-semibold text-[#FFFFFF] text-sm">{model.name}</h4>
                          <p className="text-xs text-[#A0A0A8]">{model.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#FFFFFF]">Why Choose Outsoor?</h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-[#1A1B1F] border border-[#202126]`}>
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#FFFFFF] text-sm">{feature.title}</h4>
                        <p className="text-xs text-[#A0A0A8]">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8C5CF7]">50+</div>
                  <div className="text-xs text-[#A0A0A8]">AI Models</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4ADE80]">&lt;200ms</div>
                  <div className="text-xs text-[#A0A0A8]">Latency</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#22C55E]">99.99%</div>
                  <div className="text-xs text-[#A0A0A8]">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Column - Signup Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-[#1A1B1F] border border-[#202126] rounded-2xl p-8 shadow-xl shadow-black/20">
                {/* Mobile Header (shown only on mobile) */}
                <div className="lg:hidden text-center mb-6">
                  <h1 className="text-3xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-[#8C5CF7] via-[#C85CFA] to-[#5567F7] bg-clip-text text-transparent">
                      Create Account
                    </span>
                  </h1>
                  <p className="text-[#A0A0A8]">Join thousands of developers</p>
                </div>

                <SignupForm />

                <div className="mt-8 text-center">
                  <p className="text-sm text-[#A0A0A8]">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-[#8C5CF7] hover:text-[#C85CFA] font-medium transition-colors underline-offset-4 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    href="/"
                    className="text-xs text-[#5A5A64] hover:text-[#A0A0A8] transition-colors underline-offset-4 hover:underline"
                  >
                    ← Back to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
