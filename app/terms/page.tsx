import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using Outsoor AI API services.',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F] text-white">
      {/* Navigation Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <a href="/" className="text-green-500 hover:text-green-400 transition-colors">
            ← Back to Outsoor
          </a>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using Outsoor's AI API services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
            <p className="text-muted-foreground mb-4">
              Outsoor provides enterprise-grade AI APIs for developers and businesses. Our services include machine learning models, natural language processing, computer vision, and other AI capabilities accessible through REST APIs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts and Registration</h2>
            <h3 className="text-xl font-medium mb-3">3.1 Account Creation</h3>
            <p className="text-muted-foreground mb-4">
              You must register for an account to access our services. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
            </p>

            <h3 className="text-xl font-medium mb-3">3.2 Account Responsibilities</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Provide accurate and complete information</li>
              <li>Keep your account secure</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>You must be at least 18 years old</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <h3 className="text-xl font-medium mb-3">4.1 Permitted Uses</h3>
            <p className="text-muted-foreground mb-4">
              You may use our services for lawful purposes in accordance with these terms and applicable laws.
            </p>

            <h3 className="text-xl font-medium mb-3">4.2 Prohibited Uses</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing on intellectual property rights</li>
              <li>Transmitting harmful, offensive, or illegal content</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Reverse engineering or attempting to extract our models</li>
              <li>Using our services for spam or harassment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. API Usage and Limits</h2>
            <h3 className="text-xl font-medium mb-3">5.1 Rate Limits</h3>
            <p className="text-muted-foreground mb-4">
              We may impose rate limits on API usage to ensure fair access and system stability. These limits may vary based on your subscription plan.
            </p>

            <h3 className="text-xl font-medium mb-3">5.2 Fair Use</h3>
            <p className="text-muted-foreground mb-4">
              You agree to use our services reasonably and not to abuse or overload our systems. We reserve the right to throttle or suspend access for excessive usage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Payment and Billing</h2>
            <h3 className="text-xl font-medium mb-3">6.1 Pricing</h3>
            <p className="text-muted-foreground mb-4">
              Our pricing is available on our website and may change with notice. You are responsible for all charges incurred under your account.
            </p>

            <h3 className="text-xl font-medium mb-3">6.2 Payment Terms</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Payment is due upon receipt of invoice</li>
              <li>Late payments may result in service suspension</li>
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>Taxes may apply based on your location</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              Our services, including AI models, APIs, and software, are protected by intellectual property laws. You retain ownership of your content, but we may use anonymized data to improve our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Privacy and Data</h2>
            <p className="text-muted-foreground mb-4">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Disclaimers and Limitations</h2>
            <h3 className="text-xl font-medium mb-3">9.1 Service Availability</h3>
            <p className="text-muted-foreground mb-4">
              We strive to provide reliable services but cannot guarantee 100% uptime. Our services are provided "as is" without warranties.
            </p>

            <h3 className="text-xl font-medium mb-3">9.2 Limitation of Liability</h3>
            <p className="text-muted-foreground mb-4">
              Our liability is limited to the amount you paid for services in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
            <p className="text-muted-foreground mb-4">
              Either party may terminate this agreement with written notice. Upon termination, your access to services will cease, and you remain liable for any outstanding charges.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved in the courts of [Your Jurisdiction].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-muted-foreground">
                Email: legal@outsoor.com<br />
                Address: [Your Company Address]<br />
                Phone: [Your Phone Number]
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
