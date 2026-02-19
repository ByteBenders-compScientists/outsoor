import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Outsoor Blog',
  description: 'Updates, product announcements, and best practices from the Outsoor team.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F] text-white">
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-green-500 hover:text-green-400 transition-colors">
            ← Back to Outsoor
          </Link>
          <span className="text-sm text-muted-foreground">Company · Blog</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <header>
          <h1 className="text-4xl font-bold mb-4">Outsoor Blog</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Product updates, infrastructure deep-dives, and examples of how teams are
            using Outsoor in production.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Latest posts</h2>
          <div className="space-y-4">
            <article className="border border-border rounded-lg p-6 bg-muted/10">
              <p className="text-xs uppercase tracking-wide text-green-400 mb-1">Product · Infrastructure</p>
              <h3 className="text-xl font-semibold mb-1">Launching Outsoor: AI infrastructure you can trust in production</h3>
              <p className="text-xs text-muted-foreground mb-3">Published May 2025</p>
              <p className="text-sm text-muted-foreground mb-3">
                We built Outsoor after spending years maintaining brittle, home-grown
                AI stacks. In this post we share what "enterprise-grade" means to us
                and how we think about reliability, latency and cost.
              </p>
            </article>

            <article className="border border-border rounded-lg p-6 bg-muted/10">
              <p className="text-xs uppercase tracking-wide text-green-400 mb-1">Guides · Developers</p>
              <h3 className="text-xl font-semibold mb-1">Designing a fault-tolerant AI feature in under an hour</h3>
              <p className="text-xs text-muted-foreground mb-3">Published April 2025</p>
              <p className="text-sm text-muted-foreground mb-3">
                A step‑by‑step walkthrough of how to go from idea to production for
                a simple AI-powered feature, using Outsoor APIs, observability and
                built-in safeguards.
              </p>
            </article>

            <article className="border border-border rounded-lg p-6 bg-muted/10">
              <p className="text-xs uppercase tracking-wide text-green-400 mb-1">Customers · Stories</p>
              <h3 className="text-xl font-semibold mb-1">How teams reduce incident load with Outsoor</h3>
              <p className="text-xs text-muted-foreground mb-3">Published March 2025</p>
              <p className="text-sm text-muted-foreground mb-3">
                Teams are replacing ad‑hoc scripts and one-off model calls with a
                managed platform. We share patterns we see across customers and
                what works well in production.
              </p>
            </article>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Stay updated</h2>
          <p className="text-muted-foreground text-sm max-w-2xl">
            We publish new posts when we launch major features, improve reliability
            or learn something useful about operating AI in production. Follow us on
            social or subscribe to updates from your dashboard to stay in the loop.
          </p>
        </section>
      </div>
    </div>
  )
}
