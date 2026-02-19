import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers at Outsoor',
  description: 'Join the Outsoor team and help build the future of AI infrastructure.',
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F] text-white">
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-green-500 hover:text-green-400 transition-colors">
            ← Back to Outsoor
          </Link>
          <span className="text-sm text-muted-foreground">Company · Careers</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">Careers at Outsoor</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            We&apos;re building the AI infrastructure layer for modern software
            companies. If you care deeply about reliability, developer experience
            and thoughtful AI, you&apos;ll probably enjoy working with us.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">How we work</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Remote‑friendly with a few hubs where people can meet in person</li>
            <li>Small, senior teams with a lot of ownership and autonomy</li>
            <li>Bias for shipping, observability and learning from real usage</li>
            <li>Direct access to customers and real production workloads</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Open roles</h2>
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-6 bg-muted/10">
              <h3 className="text-xl font-semibold mb-1">Founding Engineer, Full‑Stack</h3>
              <p className="text-sm text-muted-foreground mb-2">Engineering · Remote</p>
              <p className="text-sm text-muted-foreground">
                Help design and build the core dashboard and developer experience for
                Outsoor customers, from onboarding flows to usage analytics.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6 bg-muted/10">
              <h3 className="text-xl font-semibold mb-1">Senior Infrastructure Engineer</h3>
              <p className="text-sm text-muted-foreground mb-2">Engineering · Remote</p>
              <p className="text-sm text-muted-foreground">
                Own core pieces of the API platform: routing, rate limiting,
                observability and on‑call reliability.
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Don&apos;t see a role that fits? Reach out at careers@outsoor.com — we read
            every message.
          </p>
        </section>
      </div>
    </div>
  )
}
