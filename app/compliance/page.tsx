import type { Metadata } from 'next'

// Force dynamic rendering to prevent prerendering issues with Client Components
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Compliance',
  description: 'Learn about Outsoor\'s compliance with industry standards and regulations.',
}

export default function Compliance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0F] via-[#121214] to-[#1A1B1F] text-white">
      {/* Navigation Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <a href="/" className="text-green-foreground hover:text-green-400 transition-colors">
            ← Back to Outsoor
          </a>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Compliance</h1>
          <p className="text-muted-foreground text-lg">
            Outsoor maintains the highest standards of compliance to ensure your data is protected and our services meet regulatory requirements.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Data Protection Regulations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-muted p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">GDPR Compliance</h3>
                <p className="text-muted-foreground mb-3">
                  Full compliance with the European Union's General Data Protection Regulation.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Data subject rights implementation</li>
                  <li>• Lawful basis for processing</li>
                  <li>• Data protection impact assessments</li>
                  <li>• Breach notification procedures</li>
                </ul>
              </div>

              <div className="bg-muted p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold mb-3 text-green-400">CCPA Compliance</h3>
                <p className="text-muted-foreground mb-3">
                  Compliance with the California Consumer Privacy Act.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Consumer rights protection</li>
                  <li>• Data disclosure requirements</li>
                  <li>• Opt-out mechanisms</li>
                  <li>• Non-discrimination practices</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-muted p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">LGPD Compliance</h3>
                <p className="text-muted-foreground mb-3">
                  Brazilian General Data Protection Law compliance.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Legal basis for processing</li>
                  <li>• Data subject rights</li>
                  <li>• Data protection officer</li>
                  <li>• Incident reporting</li>
                </ul>
              </div>

              <div className="bg-muted p-6 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold mb-3 text-yellow-400">PIPEDA Compliance</h3>
                <p className="text-muted-foreground mb-3">
                  Canadian Personal Information Protection and Electronic Documents Act.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Consent requirements</li>
                  <li>• Limited collection and use</li>
                  <li>• Safeguards and retention</li>
                  <li>• Individual access rights</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Industry Standards & Certifications</h2>
            
            <div className="space-y-6">
              <div className="bg-muted p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">SOC 2 Type II</h3>
                    <p className="text-muted-foreground mb-3">
                      Annual audit of our security, availability, processing integrity, confidentiality, and privacy controls.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <strong>Last Audit:</strong> [Date]<br />
                      <strong>Next Audit:</strong> [Date]<br />
                      <strong>Report Available:</strong> Under NDA
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">ISO 27001</h3>
                    <p className="text-muted-foreground mb-3">
                      International standard for information security management systems.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <strong>Certification:</strong> [Certification Number]<br />
                      <strong>Valid Until:</strong> [Date]<br />
                      <strong>Scope:</strong> AI API Services and Infrastructure
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">PCI DSS</h3>
                    <p className="text-muted-foreground mb-3">
                      Payment Card Industry Data Security Standard compliance for payment processing.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <strong>Level:</strong> Level 1<br />
                      <strong>Valid Until:</strong> [Date]<br />
                      <strong>QSA:</strong> [QSA Company Name]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Healthcare & Financial Compliance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-muted p-6 rounded-lg border border-blue-500/20">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">HIPAA Compliance</h3>
                <p className="text-muted-foreground mb-3">
                  Health Insurance Portability and Accountability Act compliance for healthcare data.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Business Associate Agreement (BAA)</li>
                  <li>• Administrative safeguards</li>
                  <li>• Physical safeguards</li>
                  <li>• Technical safeguards</li>
                </ul>
                <div className="mt-3 text-xs text-blue-400">
                  BAA available upon request
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg border border-green-500/20">
                <h3 className="text-xl font-semibold mb-3 text-green-400">SOX Compliance</h3>
                <p className="text-muted-foreground mb-3">
                  Sarbanes-Oxley Act compliance for financial reporting controls.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Financial controls</li>
                  <li>• Audit trails</li>
                  <li>• Data integrity</li>
                  <li>• Access controls</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Regional & Industry-Specific Compliance</h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">FedRAMP (In Progress)</h3>
                <p className="text-muted-foreground text-sm">
                  Federal Risk and Authorization Management Program for U.S. government cloud services.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">NIST Cybersecurity Framework</h3>
                <p className="text-muted-foreground text-sm">
                  Alignment with National Institute of Standards and Technology cybersecurity framework.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">CSA STAR</h3>
                <p className="text-muted-foreground text-sm">
                  Cloud Security Alliance Security, Trust & Assurance Registry participation.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Compliance Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Compliance Team</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Chief Compliance Officer</li>
                  <li>• Data Protection Officer</li>
                  <li>• Legal & Regulatory Specialists</li>
                  <li>• Security & Privacy Engineers</li>
                </ul>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Compliance Processes</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Regular compliance assessments</li>
                  <li>• Third-party audits</li>
                  <li>• Continuous monitoring</li>
                  <li>• Policy updates and training</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Compliance Documentation</h2>
            
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
                We provide comprehensive compliance documentation to support your regulatory requirements:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Available Documents</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Compliance certificates</li>
                    <li>• Security questionnaires</li>
                    <li>• Data processing agreements</li>
                    <li>• Privacy impact assessments</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Request Process</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Email: compliance@outsoor.com</li>
                    <li>• Response time: 2-3 business days</li>
                    <li>• NDA required for sensitive documents</li>
                    <li>• Custom questionnaires supported</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact & Support</h2>
            
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Compliance Support</h3>
              <p className="text-muted-foreground mb-4">
                Our compliance team is here to help you meet your regulatory requirements and answer any compliance-related questions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Primary Contacts</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Compliance:</strong> compliance@outsoor.com</p>
                    <p><strong>Legal:</strong> legal@outsoor.com</p>
                    <p><strong>Security:</strong> security@outsoor.com</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response Times</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>General inquiries:</strong> 24 hours</p>
                    <p><strong>Document requests:</strong> 2-3 business days</p>
                    <p><strong>Urgent matters:</strong> Same day</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
