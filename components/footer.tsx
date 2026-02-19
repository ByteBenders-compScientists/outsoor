"use client"

import { Twitter, Github, Linkedin, Mail, Terminal } from "lucide-react"
import { OutsoorLogo } from "@/components/outsoor-logo"

export function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "APIs", href: "#apis" },
        { name: "Pricing", href: "#pricing" },
        { name: "Documentation", href: "/docs" },
        { name: "Status", href: "/status" },
        { name: "Changelog", href: "/changelog" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Community", href: "/community" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "API Reference", href: "/reference" },
        { name: "SDKs", href: "/sdks" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Legal Hub", href: "/legal" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Security", href: "/security" },
        { name: "Compliance", href: "/compliance" },
        { name: "DPA", href: "/dpa" },
      ],
    },
  ]

  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <OutsoorLogo />
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Enterprise-grade AI APIs built for production. Reliable, fast, and developer-friendly.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-green-500 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-sm">© 2024 Outsoor. All rights reserved.</div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
