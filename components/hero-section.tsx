"use client"
import { Button } from "@/components/ui/button"

import { Header } from "./header"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  AnimatedRocket,
  AnimatedCode,
  AnimatedArrowRight,
  AnimatedSparkles,
  AnimatedActivity,
  AnimatedTerminal,
  AnimatedGlobe,
  AnimatedStatusIndicator,
} from "./animated-icons"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Dashboard-style Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F]"></div>

      <Header />

      <div className="flex-1 flex items-center justify-center px-6 relative z-10 text-white">
        <div className="max-w-8xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-16"
          >
            {/* Clean Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-[#1A1B1F]/80 backdrop-blur-sm border border-[#2D2D32]"
            >
              <AnimatedStatusIndicator />
              <span className="text-sm font-semibold text-[#A0A0A8]">All systems operational</span>
              <div className="w-px h-6 bg-[#2D2D32]" />
              <div className="flex items-center gap-2">
                <AnimatedSparkles className="w-4 h-4 text-[#4ADE80]" />
                <span className="text-sm text-[#4ADE80] font-mono font-bold">99.99% uptime</span>
              </div>
              <div className="w-px h-6 bg-[#2D2D32]" />
              <span className="text-xs text-[#A0A0A8]">
                <span className="text-[#8C5CF7] font-mono font-bold">1.2B+</span> requests served
              </span>
            </motion.div>

            {/* Clean Headline */}
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-display font-black leading-none tracking-tighter"
              >
                Enterprise AI APIs
                <br />
                <span className="bg-gradient-to-r from-[#8C5CF7] via-[#C85CFA] to-[#5567F7] bg-clip-text text-transparent">Built for Scale</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <p className="text-2xl md:text-3xl text-[#A0A0A8] max-w-5xl mx-auto leading-relaxed font-light">
                  Production-ready AI infrastructure with{" "}
                  <span className="text-[#4ADE80] font-mono font-bold bg-[#4ADE80]/10 px-3 py-1 rounded-lg">
                    &lt;200ms
                  </span>{" "}
                  latency,{" "}
                  <span className="text-[#EF4444] font-mono font-bold bg-[#EF4444]/10 px-3 py-1 rounded-lg">99.99%</span>{" "}
                  uptime, and transparent pricing.
                </p>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Built by developers, for developers. Ship AI features in minutes, not months.
                </p>
              </motion.div>
            </div>

            {/* Clean CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12"
            >
              <Link href="/signup">
                <Button
                  size="lg"
                  className="px-12 py-8 h-auto rounded-2xl font-bold bg-[#8C5CF7] hover:bg-[#7C4CF7] text-white transition-colors duration-200"
                >
                  <AnimatedRocket className="w-6 h-6 mr-4" />
                  Start Building Free
                  <AnimatedArrowRight className="w-6 h-6 ml-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-xl px-12 py-8 h-auto rounded-2xl font-semibold group bg-transparent border border-[#2D2D32] hover:border-[#8C5CF7] hover:text-[#8C5CF7] transition-colors duration-200"
                >
                  <AnimatedCode className="w-6 h-6 mr-4" />
                  View Documentation
                  <AnimatedSparkles className="w-4 h-4 ml-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Clean Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-24 max-w-6xl mx-auto"
            >
              {[
                {
                  icon: AnimatedActivity,
                  value: "10K+",
                  label: "Active Developers",
                  sublabel: "Building the future",
                  color: "text-[#4ADE80]",
                  bgColor: "bg-[#4ADE80]/20",
                },
                {
                  icon: AnimatedTerminal,
                  value: "1.2B+",
                  label: "API Calls/Month",
                  sublabel: "And growing exponentially",
                  color: "text-[#EF4444]",
                  bgColor: "bg-[#EF4444]/20",
                },
                {
                  icon: AnimatedGlobe,
                  value: "50+",
                  label: "AI Models",
                  sublabel: "Latest & greatest",
                  color: "text-[#8C5CF7]",
                  bgColor: "bg-[#8C5CF7]/20",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="group"
                >
                  <div className="bg-[#1A1B1F] border border-[#2D2D32] rounded-3xl p-10 hover:border-[#3D3D42] transition-all duration-200">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center`}>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-center space-y-3">
                      <div className={`text-5xl font-black ${stat.color} transition-transform duration-300`}>
                        {stat.value}
                      </div>
                      <div className="text-xl font-bold text-white group-hover:text-[#4ADE80] transition-colors">
                        {stat.label}
                      </div>
                      <div className="text-sm text-[#A0A0A8]">{stat.sublabel}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Clean Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-12 pt-16 text-sm text-[#A0A0A8]"
            >
              {[
                { icon: "🚀", text: "No credit card required", color: "hover:border-[#4ADE80]" },
                { icon: "⚡", text: "10,000 free API calls", color: "hover:border-[#EF4444]" },
                { icon: "🔥", text: "Setup in 30 seconds", color: "hover:border-[#8C5CF7]" },
                { icon: "🛡️", text: "Enterprise security", color: "hover:border-[#4ADE80]" },
                { icon: "🌍", text: "Global infrastructure", color: "hover:border-[#EF4444]" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className={`flex items-center gap-3 bg-[#1A1B1F]/80 backdrop-blur-sm border border-[#2D2D32] px-6 py-3 rounded-full hover:border-[#3D3D42] transition-colors ${item.color}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
