"use client"

import { motion } from "framer-motion"
import {
  AnimatedKey,
  AnimatedCode,
  AnimatedTerminal,
  AnimatedPlay,
  AnimatedBarChart3,
  AnimatedPuzzle,
  AnimatedSparkles,
} from "./animated-icons"

export function DeveloperExperience() {
  const features = [
    {
      icon: AnimatedKey,
      title: "Instant API Keys",
      description: "Generate and manage API keys instantly. No waiting, no approval process.",
      highlight: "0s setup",
    },
    {
      icon: AnimatedCode,
      title: "SDKs & Libraries",
      description: "Python, Node.js, Go, PHP, and more. Get started in minutes, not hours.",
      highlight: "8 languages",
    },
    {
      icon: AnimatedTerminal,
      title: "CLI Tools",
      description: "Powerful command-line interface for deployment, testing, and monitoring.",
      highlight: "Full control",
    },
    {
      icon: AnimatedPlay,
      title: "API Playground",
      description: "Test and experiment with models directly in your browser.",
      highlight: "Live testing",
    },
    {
      icon: AnimatedBarChart3,
      title: "Real-time Analytics",
      description: "Monitor usage, latency, and costs with detailed dashboards.",
      highlight: "Live metrics",
    },
    {
      icon: AnimatedPuzzle,
      title: "Drop-in Replacement",
      description: "Compatible with existing OpenAI clients. Migrate in minutes.",
      highlight: "Zero refactor",
    },
  ]

  return (
    <section id="docs" className="py-32 px-6 relative section-glow">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8">
            <AnimatedSparkles className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-muted-foreground">Developer First</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            Built for <span className="gradient-text">Developers</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            Everything you need to integrate AI into your applications. From your first API call to production scale.
            <br />
            <span className="text-foreground/80">Ship faster with tools that just work.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect-strong rounded-2xl p-8 hover-lift hover-border-green group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-xs text-green-400 font-mono font-semibold bg-green-500/10 px-3 py-1 rounded-full">
                  {feature.highlight}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-green-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Enhanced code example with animated elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="terminal max-w-5xl mx-auto"
        >
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500" />
            <div className="terminal-dot bg-yellow-500" />
            <div className="terminal-dot bg-green-500" />
            <span className="text-sm text-gray-400 ml-6 font-medium">~/outsoor-demo</span>
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-xs text-green-400 font-mono">Connected</span>
              </div>
            </div>
          </div>
          <div className="p-8 space-y-6">
            <div className="code-comment"># Install the SDK</div>
            <motion.div
              className="text-green-400 font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              $ pip install outsoor
            </motion.div>

            <div className="code-comment mt-8"># Make your first API call</div>
            <motion.div
              className="text-foreground space-y-2 text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, staggerChildren: 0.1 }}
            >
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="code-keyword">import</span> outsoor
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}></motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                client = outsoor.Client(<span className="code-string">"your-api-key"</span>)
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}></motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                response = client.text.generate(
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="pl-4">
                model=<span className="code-string">"gpt-4"</span>,
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="pl-4">
                prompt=<span className="code-string">"Hello, world!"</span>,
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="pl-4">
                max_tokens=<span className="code-number">100</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                )
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}></motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="code-function">print</span>(response.text)
              </motion.div>
            </motion.div>

            <div className="code-comment mt-6"># Output</div>
            <motion.div
              className="text-green-400 bg-green-500/5 p-4 rounded-lg border border-green-500/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
            >
              Hello! How can I help you today?
            </motion.div>

            <motion.div
              className="flex items-center gap-4 pt-4 border-t border-gray-700/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
            >
              <div className="text-xs text-gray-500">
                Response time: <span className="text-green-400 font-mono">187ms</span>
              </div>
              <div className="text-xs text-gray-500">
                Tokens: <span className="text-blue-400 font-mono">12</span>
              </div>
              <div className="text-xs text-gray-500">
                Cost: <span className="text-yellow-400 font-mono">$0.0002</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
