"use client"

import { motion } from "framer-motion"

export function GlobalClients() {
  // Placeholder company logos - in production, these would be real client logos
  const clients = [
    { name: "TechCorp", logo: "🏢" },
    { name: "StartupAI", logo: "🚀" },
    { name: "DataFlow", logo: "📊" },
    { name: "CloudTech", logo: "☁️" },
    { name: "InnovateLab", logo: "🔬" },
    { name: "FutureApp", logo: "📱" },
    { name: "DevTools", logo: "🛠️" },
    { name: "ScaleUp", logo: "📈" },
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
            Trusted by <span className="gradient-text text-glow">Global Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From innovative startups to Fortune 500 enterprises, developers worldwide choose Outsoor for their AI
            infrastructure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {clients.map((client, index) => (
            <div
              key={client.name}
              className="glass-effect rounded-xl p-8 text-center hover:border-green-500/30 transition-all duration-300 hover:glow-green"
            >
              <div className="text-4xl mb-4">{client.logo}</div>
              <div className="text-lg font-semibold text-muted-foreground">{client.name}</div>
            </div>
          ))}
        </motion.div>

        {/* Case Study Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="glass-effect rounded-2xl p-12 max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold font-space mb-6">
              "Outsoor reduced our AI infrastructure costs by 60% while improving response times by 3x."
            </h3>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-2xl">
                🚀
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Sarah Chen</div>
                <div className="text-muted-foreground">CTO, StartupAI</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
