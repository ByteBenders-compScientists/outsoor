"use client"

import { motion } from "framer-motion"
import { Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  const plans = [
    {
      name: "Pay-as-you-scale",
      icon: Zap,
      price: "$0.001",
      priceUnit: "/1K tokens",
      description: "Simple, transparent pricing that grows with you",
      features: [
        "No monthly fees or commitments",
        "Access to all 50+ AI models",
        "Real-time analytics dashboard",
        "24/7 community support",
        "Global edge infrastructure",
        "Enterprise-grade security",
      ],
      cta: "Start Building Free",
      popular: true,
    },
  ]

  return (
    <section id="pricing" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No hidden fees, no surprises. Pay only for what you use with pricing that scales with your success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative ${plan.popular ? "scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-black px-4 py-2 rounded-full text-sm font-bold">Most Popular</div>
                </div>
              )}

              <div
                className={`glass-effect rounded-xl p-8 h-full ${plan.popular ? "border-green-500/50" : ""} hover-border-green transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <plan.icon className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.priceUnit && <span className="text-muted-foreground">{plan.priceUnit}</span>}
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground transition-colors font-semibold"
                      : "border border-border hover:border-primary text-foreground hover:text-primary transition-colors bg-transparent font-semibold"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
