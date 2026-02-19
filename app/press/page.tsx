import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Press & Media - Outsoor',
  description: 'Press resources, brand assets, and contact information for Outsoor.',
}

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F] text-white">
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-green-500 hover:text-green-400 transition-colors">
            ← Back to Outsoor
          </Link>
          <span className="text-sm text-muted-foreground">Company · Press</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">Press &amp; Media</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            This page collects basic information for journalists, partners and
            anyone writing about Outsoor.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Fast facts</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li>Product: AI infrastructure and APIs for language, vision and retrieval</li>
            <li>Customers: SaaS companies, marketplaces and internal tools teams</li>
            <li>Focus: Low latency, reliability, and clear pricing</li>
          </ul>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6 bg-muted/10">
            <h2 className="text-xl font-semibold mb-2">Press contact</h2>
            <p className="text-muted-foreground text-sm mb-2">
              For press inquiries, interviews or quotes, reach out to our team:
            </p>
            <p className="text-muted-foreground text-sm">
              Email: <a href="mailto:press@outsoor.com" className="text-green-400 hover:text-green-300">press@outsoor.com</a>
            </p>
          </div>
          <div className="border border-border rounded-lg p-6 bg-muted/10">
            <h2 className="text-xl font-semibold mb-2">Brand assets</h2>
            <p className="text-muted-foreground text-sm mb-2">
              We provide logo files and basic brand guidelines on request.
            </p>
            <p className="text-muted-foreground text-sm">
              Email <a href="mailto:brand@outsoor.com" className="text-green-400 hover:text-green-300">brand@outsoor.com</a>{' '}
              with your organization and intended use.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
