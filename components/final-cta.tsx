"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Terminal } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 mb-8">
            <Terminal className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-muted-foreground">Ready to ship</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Build Production AI
            <br />
            <span className="gradient-text">In Minutes, Not Months</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of developers building the next generation of AI applications with enterprise-grade
            infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl px-12 py-6 h-auto transition-colors duration-200"
            >
              Start Building Free
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-border hover:border-primary text-foreground hover:text-primary text-xl px-12 py-6 h-auto transition-colors duration-200 bg-transparent"
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              Talk to Sales
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>10,000 free API calls</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Setup in 30 seconds</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
