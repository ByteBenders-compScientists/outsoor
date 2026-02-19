"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Outsoor's API latency is incredible. We switched from OpenAI and saw immediate improvements in user experience. The unified interface for multiple models is a game-changer.",
      author: "Alex Rodriguez",
      role: "Lead Developer",
      company: "TechFlow",
      avatar: "👨‍💻",
      rating: 5,
    },
    {
      quote:
        "The enterprise support is outstanding. When we needed custom deployment for compliance, their team worked with us every step of the way. True partnership.",
      author: "Maria Johnson",
      role: "VP Engineering",
      company: "DataSecure",
      avatar: "👩‍💼",
      rating: 5,
    },
    {
      quote:
        "We're processing millions of API calls daily with Outsoor. The reliability and performance at scale is exactly what we needed for our production workloads.",
      author: "David Kim",
      role: "CTO",
      company: "ScaleAI",
      avatar: "👨‍🚀",
      rating: 5,
    },
    {
      quote:
        "The developer experience is phenomenal. From documentation to SDKs to support - everything just works. Our team was productive from day one.",
      author: "Emily Zhang",
      role: "Senior Engineer",
      company: "BuildFast",
      avatar: "👩‍💻",
      rating: 5,
    },
    {
      quote:
        "Pricing transparency and no hidden fees. Finally, an AI API provider that doesn't surprise you with the bill. Outsoor delivers on their promises.",
      author: "Michael Brown",
      role: "Product Manager",
      company: "StartupLab",
      avatar: "👨‍💼",
      rating: 5,
    },
    {
      quote:
        "The multimodal capabilities are impressive. We're building next-gen applications that combine text, image, and audio - all through one clean API.",
      author: "Lisa Wang",
      role: "AI Researcher",
      company: "InnovateAI",
      avatar: "👩‍🔬",
      rating: 5,
    },
  ]

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-space mb-6">
            What Developers <span className="gradient-text text-glow">Are Saying</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of developers who have transformed their applications with Outsoor's AI APIs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300 hover:glow-green"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed mb-6">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
