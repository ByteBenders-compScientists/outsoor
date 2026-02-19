import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Outsoor',
  description: 'Get in touch with the Outsoor team for sales, support, and partnerships.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F] text-white">
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-green-500 hover:text-green-400 transition-colors">
            ← Back to Outsoor
          </Link>
          <span className="text-sm text-muted-foreground">Company · Contact</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Reach the right team at Outsoor for questions about the product,
            sales, support or partnerships.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6 bg-muted/10">
            <h2 className="text-xl font-semibold mb-3">Sales &amp; product</h2>
            <p className="text-muted-foreground text-sm mb-2">
              For demos, pricing questions and enterprise evaluations:
            </p>
            <p className="text-muted-foreground text-sm">
              Email: <a href="mailto:sales@outsoor.com" className="text-green-400 hover:text-green-300">sales@outsoor.com</a>
            </p>
          </div>
          <div className="border border-border rounded-lg p-6 bg-muted/10">
            <h2 className="text-xl font-semibold mb-3">Support</h2>
            <p className="text-muted-foreground text-sm mb-2">
              For technical issues or questions about your account:
            </p>
            <p className="text-muted-foreground text-sm">
              Email: <a href="mailto:support@outsoor.com" className="text-green-400 hover:text-green-300">support@outsoor.com</a>
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6 bg-muted/10">
            <h2 className="text-xl font-semibold mb-3">Security</h2>
            <p className="text-muted-foreground text-sm mb-2">
              To report a vulnerability or security concern:
            </p>
            <p className="text-muted-foreground text-sm">
              Email: <a href="mailto:security@outsoor.com" className="text-green-400 hover:text-green-300">security@outsoor.com</a>
            </p>
          </div>
          <div className="border border-border rounded-lg p-6 bg-muted/10">
            <h2 className="text-xl font-semibold mb-3">Partnerships</h2>
            <p className="text-muted-foreground text-sm mb-2">
              For integrations, co-marketing or other partnerships:
            </p>
            <p className="text-muted-foreground text-sm">
              Email: <a href="mailto:partners@outsoor.com" className="text-green-400 hover:text-green-300">partners@outsoor.com</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
