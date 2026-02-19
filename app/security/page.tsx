import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security',
  description: 'Learn about Outsoor\'s comprehensive security measures and practices.',
}

export default function Security() {
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
          <h1 className="text-4xl font-bold mb-4">Security</h1>
          <p className="text-muted-foreground text-lg">
            Your data security is our top priority. Learn about the comprehensive measures we take to protect your information.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Infrastructure Security</h2>
            <h3 className="text-xl font-medium mb-3">1.1 Cloud Security</h3>
            <p className="text-muted-foreground mb-4">
              We leverage industry-leading cloud providers with enterprise-grade security certifications including SOC 2 Type II, ISO 27001, and PCI DSS compliance.
            </p>

            <h3 className="text-xl font-medium mb-3">1.2 Network Security</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>DDoS protection and mitigation</li>
              <li>Web Application Firewall (WAF)</li>
              <li>Intrusion Detection and Prevention Systems</li>
              <li>Regular security audits and penetration testing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Data Protection</h2>
            <h3 className="text-xl font-medium mb-3">2.1 Encryption</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Data encrypted in transit using TLS 1.3</li>
              <li>Data encrypted at rest using AES-256</li>
              <li>API keys and secrets encrypted with industry-standard algorithms</li>
              <li>End-to-end encryption for sensitive communications</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">2.2 Data Handling</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Strict data retention policies</li>
              <li>Automatic data deletion for inactive accounts</li>
              <li>Data anonymization for analytics and improvement</li>
              <li>Compliance with GDPR, CCPA, and other privacy regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Access Control</h2>
            <h3 className="text-xl font-medium mb-3">3.1 Authentication</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Multi-factor authentication (MFA) support</li>
              <li>Strong password requirements and policies</li>
              <li>OAuth 2.0 and SAML integration</li>
              <li>Session management and timeout controls</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">3.2 Authorization</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Role-based access control (RBAC)</li>
              <li>Principle of least privilege</li>
              <li>Regular access reviews and audits</li>
              <li>API key rotation and management</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. API Security</h2>
            <h3 className="text-xl font-medium mb-3">4.1 API Protection</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Rate limiting and abuse prevention</li>
              <li>Input validation and sanitization</li>
              <li>SQL injection and XSS protection</li>
              <li>API versioning and deprecation policies</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">4.2 Monitoring and Logging</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Real-time security monitoring</li>
              <li>Comprehensive audit logging</li>
              <li>Anomaly detection and alerting</li>
              <li>24/7 security operations center</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Compliance and Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">SOC 2 Type II</h4>
                <p className="text-sm text-muted-foreground">
                  Annual audit of our security controls and practices
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">ISO 27001</h4>
                <p className="text-sm text-muted-foreground">
                  International standard for information security management
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">GDPR Compliance</h4>
                <p className="text-sm text-muted-foreground">
                  European data protection regulation compliance
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">CCPA Compliance</h4>
                <p className="text-sm text-muted-foreground">
                  California consumer privacy regulation compliance
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Incident Response</h2>
            <h3 className="text-xl font-medium mb-3">6.1 Response Plan</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>24/7 incident response team</li>
              <li>Automated threat detection and response</li>
              <li>Customer notification within 24 hours</li>
              <li>Post-incident analysis and improvement</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">6.2 Business Continuity</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>99.99% uptime SLA commitment</li>
              <li>Automated failover and disaster recovery</li>
              <li>Regular backup testing and validation</li>
              <li>Geographic redundancy and distribution</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Security Best Practices</h2>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">For Our Customers</h3>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Keep your API keys secure and rotate them regularly</li>
                <li>Use HTTPS for all API communications</li>
                <li>Implement proper error handling in your applications</li>
                <li>Monitor your API usage for unusual patterns</li>
                <li>Keep your integration libraries updated</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Security Contact</h2>
            <p className="text-muted-foreground mb-4">
              For security-related inquiries, vulnerability reports, or security questions, please contact our security team:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-muted-foreground">
                Security Email: security@outsoor.com<br />
                PGP Key: [Your PGP Key Fingerprint]<br />
                Bug Bounty: [Your Bug Bounty Program URL]<br />
                Security Response: Within 24 hours
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Security Updates</h2>
            <p className="text-muted-foreground mb-4">
              We regularly update our security measures and practices. Subscribe to our security newsletter to stay informed about the latest security updates and best practices.
            </p>
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
              <p className="text-green-400 text-sm">
                <strong>Security First:</strong> We invest heavily in security infrastructure and regularly conduct third-party security audits to ensure the highest level of protection for your data.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
