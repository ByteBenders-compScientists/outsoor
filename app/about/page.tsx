import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Outsoor',
  description: 'Learn more about Outsoor, our mission, and the team behind the platform.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F] text-white">
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-green-500 hover:text-green-400 transition-colors">
            ← Back to Outsoor
          </Link>
          <span className="text-sm text-muted-foreground">Company · About</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">About Outsoor</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Outsoor is an AI infrastructure platform that gives product teams
            low-latency, production-ready APIs for language, vision and
            retrieval. We handle scaling, reliability and billing so you can
            focus on shipping features.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What we do</h2>
          <p className="text-muted-foreground">
            Modern products rely on AI for search, support, automation and
            personalization, but wiring all of this together reliably is hard.
            Outsoor provides a single, consistent API surface on top of
            best-in-class AI models, with:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>&lt;200ms median latency from edge locations</li>
            <li>99.99% uptime backed by strict SLOs</li>
            <li>Usage-based pricing with clear, predictable invoices</li>
            <li>Enterprise features like audit logs and SSO</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How teams use Outsoor</h2>
          <p className="text-muted-foreground">
            Customers use Outsoor to power AI assistants inside their apps,
            automate internal workflows, summarize large volumes of data and
            build custom retrieval pipelines. Our APIs are designed to drop
            into existing stacks without forcing a full rewrite.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our principles</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li><span className="font-semibold text-foreground">Developer-first.</span> Clear docs, simple APIs and honest errors.</li>
            <li><span className="font-semibold text-foreground">Reliability by default.</span> We treat every request as production-critical.</li>
            <li><span className="font-semibold text-foreground">Transparency.</span> No surprise rate limits or hidden quotas.</li>
            <li><span className="font-semibold text-foreground">Security.</span> Data protection and compliance are built in from day one.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
