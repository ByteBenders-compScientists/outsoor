"use client"

import { motion } from "framer-motion"

export function VisionSection() {
  return (
    <section className="py-24 px-6 relative bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-space leading-tight text-white">
            Making AI <span className="bg-gradient-to-r from-[#8C5CF7] via-[#C85CFA] to-[#5567F7] bg-clip-text text-transparent">Accessible</span> to Everyone, Everywhere
          </h2>
          <p className="text-xl md:text-2xl text-[#A0A0A8] leading-relaxed">
            We believe artificial intelligence should be a force multiplier for every developer, startup, and
            enterprise. Outsoor breaks down barriers with unified APIs, transparent pricing, and infrastructure that
            scales from your first API call to billions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8C5CF7] to-[#4ADE80] mx-auto rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
