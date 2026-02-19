"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  AnimatedMessageSquare,
  AnimatedImageIcon,
  AnimatedMic,
  AnimatedVolume2,
  AnimatedBrain,
  AnimatedLayers,
  AnimatedZap,
  AnimatedClock,
  AnimatedTrendingUp,
  AnimatedShield,
} from "./animated-icons"

export function ApiShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const apis = [
    {
      icon: AnimatedMessageSquare,
      title: "Text Generation",
      description: "GPT-4, Claude, Llama, and more premium models with consistent APIs and intelligent routing",
      metrics: "< 200ms",
      requests: "2.1M/day",
      uptime: "99.99%",
      status: "online",
      category: "Language",
      trend: "+23%",
      models: ["GPT-4", "Claude-3", "Llama-2", "PaLM-2"],
      colorScheme: "green",
    },
    {
      icon: AnimatedImageIcon,
      title: "Text-to-Image",
      description: "DALL-E, Midjourney, Stable Diffusion with unified interface and advanced prompt optimization",
      metrics: "< 3s",
      requests: "450K/day",
      uptime: "99.95%",
      status: "online",
      category: "Vision",
      trend: "+45%",
      models: ["DALL-E 3", "Midjourney", "SD-XL", "Firefly"],
      colorScheme: "red",
    },
    {
      icon: AnimatedMic,
      title: "Speech-to-Text",
      description: "Whisper, real-time transcription, 100+ languages with speaker diarization and noise reduction",
      metrics: "< 500ms",
      requests: "1.8M/day",
      uptime: "99.98%",
      status: "online",
      category: "Audio",
      trend: "+67%",
      models: ["Whisper-v3", "AssemblyAI", "Deepgram", "Rev.ai"],
      colorScheme: "blue",
    },
    {
      icon: AnimatedVolume2,
      title: "AI Voice",
      description: "Natural voice synthesis, voice cloning, emotional control with real-time streaming capabilities",
      metrics: "< 1s",
      requests: "320K/day",
      uptime: "99.97%",
      status: "online",
      category: "Audio",
      trend: "+89%",
      models: ["ElevenLabs", "Murf", "Resemble", "Speechify"],
      colorScheme: "green",
    },
    {
      icon: AnimatedBrain,
      title: "Embeddings",
      description: "Vector embeddings for RAG, search, similarity matching with advanced semantic understanding",
      metrics: "< 100ms",
      requests: "5.2M/day",
      uptime: "99.99%",
      status: "online",
      category: "ML",
      trend: "+156%",
      models: ["OpenAI", "Cohere", "Sentence-T", "E5"],
      colorScheme: "red",
    },
    {
      icon: AnimatedLayers,
      title: "Multimodal",
      description: "Vision, audio, text combined in one powerful API with cross-modal understanding and reasoning",
      metrics: "< 800ms",
      requests: "180K/day",
      uptime: "99.96%",
      status: "online",
      category: "Hybrid",
      trend: "+234%",
      models: ["GPT-4V", "Gemini-Pro", "Claude-3", "LLaVA"],
      colorScheme: "blue",
    },
  ]

  const getColorClasses = (colorScheme: string) => {
    switch (colorScheme) {
      case "red":
        return {
          iconBg:
            "from-[#EF4444]/20 to-[#EF4444]/30 group-hover:from-[#EF4444]/30 group-hover:to-[#EF4444]/40 border-[#EF4444]/20",
          iconColor: "text-[#EF4444]",
          categoryBg: "bg-[#EF4444]/10",
          categoryText: "text-[#EF4444]",
          trendBg: "bg-[#EF4444]/10",
          trendText: "text-[#EF4444]",
          hoverBorder: "hover:border-[#EF4444]",
        }
      case "blue":
        return {
          iconBg:
            "from-[#8C5CF7]/20 to-[#8C5CF7]/30 group-hover:from-[#8C5CF7]/30 group-hover:to-[#8C5CF7]/40 border-[#8C5CF7]/20",
          iconColor: "text-[#8C5CF7]",
          categoryBg: "bg-[#8C5CF7]/10",
          categoryText: "text-[#8C5CF7]",
          trendBg: "bg-[#8C5CF7]/10",
          trendText: "text-[#8C5CF7]",
          hoverBorder: "hover:border-[#8C5CF7]",
        }
      default:
        return {
          iconBg:
            "from-[#4ADE80]/20 to-[#4ADE80]/30 group-hover:from-[#4ADE80]/30 group-hover:to-[#4ADE80]/40 border-[#4ADE80]/20",
          iconColor: "text-[#4ADE80]",
          categoryBg: "bg-[#4ADE80]/10",
          categoryText: "text-[#4ADE80]",
          trendBg: "bg-[#4ADE80]/10",
          trendText: "text-[#4ADE80]",
          hoverBorder: "hover:border-[#4ADE80]",
        }
    }
  }

  return (
    <section id="apis" className="py-40 px-6 relative bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1A1B1F]/80 backdrop-blur-sm border border-[#2D2D32] mb-12">
            <AnimatedZap className="w-5 h-5 text-[#4ADE80]" />
            <span className="text-sm font-bold text-[#A0A0A8]">50+ Models Available</span>
            <div className="w-px h-5 bg-[#2D2D32]" />
            <AnimatedTrendingUp className="w-4 h-4 text-[#EF4444]" />
            <span className="text-sm font-mono text-[#EF4444]">+127% growth</span>
          </div>

          <h2 className="text-hero font-black mb-12 leading-none tracking-tighter text-white">
            One Platform, <span className="bg-gradient-to-r from-[#8C5CF7] via-[#C85CFA] to-[#5567F7] bg-clip-text text-transparent">Every AI Model</span>
          </h2>

          <div className="space-y-8 max-w-5xl mx-auto">
            <p className="text-2xl md:text-3xl text-[#A0A0A8] leading-relaxed font-light">
              Production-ready APIs with consistent interfaces, transparent pricing, and enterprise-grade reliability.
            </p>
            <p className="text-xl text-white/90 leading-relaxed">
              Switch between models without changing your code. Intelligent routing ensures optimal performance and
              cost.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {apis.map((api, index) => {
            const colorClasses = getColorClasses(api.colorScheme)
            return (
              <motion.div
                key={api.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.25, 0, 1] }}
                className="group"
              >
                <div
                  className={`bg-[#1A1B1F] border border-[#2D2D32] rounded-3xl p-8 h-full hover:border-[#3D3D42] transition-all duration-200 relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${colorClasses.iconBg.split(" ")[0]} via-transparent to-transparent`}
                    />
                  </div>

                  {/* Header */}
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${colorClasses.iconBg} rounded-2xl flex items-center justify-center transition-all duration-500 backdrop-blur-xl border`}
                      >
                        <api.icon className={`w-8 h-8 ${colorClasses.iconColor}`} />
                      </div>
                      <div>
                        <div
                          className={`text-xs font-mono font-bold mb-2 ${colorClasses.categoryBg} ${colorClasses.categoryText} px-3 py-1 rounded-full`}
                        >
                          {api.category}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="status-online" />
                          <span className={`text-sm font-mono font-bold ${colorClasses.iconColor}`}>{api.metrics}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-xs font-mono font-bold ${colorClasses.trendBg} ${colorClasses.trendText} px-3 py-1 rounded-full mb-2`}
                      >
                        {api.trend}
                      </div>
                      <div className="text-xs text-[#A0A0A8]">{api.uptime} uptime</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6 relative z-10">
                    <h3
                      className={`text-2xl font-bold text-white group-hover:${colorClasses.iconColor} transition-colors duration-300`}
                    >
                      {api.title}
                    </h3>
                    <p className="text-[#A0A0A8] leading-relaxed text-base">{api.description}</p>

                    {/* Models */}
                    <div className="space-y-3">
                      <div className="text-xs text-[#A0A0A8] font-semibold uppercase tracking-wider">
                        Available Models
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {api.models.map((model) => (
                          <span
                            key={model}
                            className="text-xs bg-[#2D2D32]/50 border border-[#3D3D42]/50 px-3 py-1 rounded-full font-mono text-white/80"
                          >
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-8 mt-8 border-t border-[#2D2D32] relative z-10">
                    <div className="flex items-center gap-3 text-sm text-[#A0A0A8]">
                      <AnimatedClock className="w-4 h-4" />
                      <span className="font-mono">{api.requests}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AnimatedShield className={`w-4 h-4 ${colorClasses.iconColor}`} />
                      <span className={`text-xs font-mono font-bold ${colorClasses.iconColor}`}>LIVE</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA with Red Accent */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-[#1A1B1F] border border-[#2D2D32] rounded-3xl p-12 max-w-4xl mx-auto hover:border-[#EF4444] transition-colors">
            <h3 className="text-3xl font-bold mb-6 text-white">
              Ready to integrate <span className="bg-gradient-to-r from-[#8C5CF7] via-[#C85CFA] to-[#5567F7] bg-clip-text text-transparent">any AI model</span>?
            </h3>
            <p className="text-xl text-[#A0A0A8] mb-8">
              Start with 10,000 free API calls. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-10 py-4 rounded-2xl text-lg font-bold bg-[#8C5CF7] hover:bg-[#7C4CF7] text-white transition-colors duration-200">
                Get Started Free
              </button>
              <button className="px-10 py-4 rounded-2xl text-lg font-semibold bg-transparent border border-[#2D2D32] text-white hover:border-[#8C5CF7] hover:text-[#8C5CF7] transition-colors duration-200">
                View API Docs
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
