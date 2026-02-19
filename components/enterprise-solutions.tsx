"use client"

import { motion } from "framer-motion"
import { Shield, Cloud, Settings, Award, Lock, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EnterpriseSolutions() {
  const features = [
    {
      icon: Cloud,
      title: "Custom Deployments",
      description: "Private cloud, on-premises, or hybrid solutions tailored to your infrastructure needs.",
    },
    {
      icon: Settings,
      title: "White-Label Solutions",
      description: "Rebrand our APIs as your own. Complete customization and control over the user experience.",
    },
    {
      icon: Shield,
      title: "Enterprise SLAs",
      description: "99.99% uptime guarantees, dedicated support, and priority access to new models.",
    },
    {
      icon: Award,
      title: "Compliance Certifications",
      description: "SOC 2 Type II, ISO 27001, GDPR, HIPAA, and more. Enterprise-grade security and compliance.",
    },
    {
      icon: Lock,
      title: "Advanced Security",
      description: "End-to-end encryption, VPC peering, SSO integration, and audit logs.",
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "24/7 technical support, dedicated account managers, and custom integration assistance.",
    },
  ]

  return (
    <section id="enterprise" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-space mb-6">
            <span className="gradient-text text-glow">Enterprise</span> Ready
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scale with confidence. Our enterprise solutions provide the security, compliance, and support that large
            organizations demand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300 hover:glow-green"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold font-space mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <div className="glass-effect rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold font-space mb-6">Ready to Scale Your AI Infrastructure?</h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join Fortune 500 companies who trust Outsoor for their mission-critical AI applications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-semibold text-lg px-8 py-4 h-auto"
              >
                Request Enterprise Access
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-200 text-lg px-8 py-4 h-auto bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
