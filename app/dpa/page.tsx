import type { Metadata } from 'next'

// Force dynamic rendering to prevent prerendering issues with Client Components
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Data Processing Agreement',
  description: 'Read Outsoor\'s Data Processing Agreement for AI API services.',
}

export default function DataProcessingAgreement() {
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
          <h1 className="text-4xl font-bold mb-4">Data Processing Agreement (DPA)</h1>
          <p className="text-muted-foreground text-lg">
            This Data Processing Agreement governs the processing of personal data by Outsoor on behalf of our customers.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Definitions</h2>
            <div className="bg-muted p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">"Controller"</h3>
                  <p className="text-sm text-muted-foreground">
                    The entity that determines the purposes and means of processing personal data.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">"Processor"</h3>
                  <p className="text-sm text-muted-foreground">
                    Outsoor, the entity that processes personal data on behalf of the controller.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">"Personal Data"</h3>
                  <p className="text-sm text-muted-foreground">
                    Any information relating to an identified or identifiable natural person.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">"Processing"</h3>
                  <p className="text-sm text-muted-foreground">
                    Any operation performed on personal data, such as collection, storage, or analysis.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Scope and Application</h2>
            <p className="text-muted-foreground mb-4">
              This DPA applies to all personal data processing activities carried out by Outsoor when providing AI API services to customers. It forms an integral part of our Terms of Service and is automatically incorporated by reference.
            </p>
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Covered Services</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI model inference and processing</li>
                <li>• Data storage and caching</li>
                <li>• Analytics and usage monitoring</li>
                <li>• Customer support and communication</li>
                <li>• Service improvement and optimization</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Processing Details</h2>
            
            <div className="space-y-6">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">3.1 Nature and Purpose of Processing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Primary Purposes</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Providing AI API services</li>
                      <li>• Processing customer requests</li>
                      <li>• Billing and account management</li>
                      <li>• Service improvement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Categories</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Account information</li>
                      <li>• API usage data</li>
                      <li>• Technical logs</li>
                      <li>• Communication records</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">3.2 Duration of Processing</h3>
                <p className="text-muted-foreground mb-3">
                  Personal data will be processed for the duration of the service agreement and as necessary to fulfill legal obligations or legitimate business purposes.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Retention Periods:</strong><br />
                  • Active account data: Duration of service<br />
                  • Usage logs: 12 months<br />
                  • Billing records: 7 years<br />
                  • Deleted account data: 30 days
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Controller Obligations</h2>
            
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
              As the data controller, you are responsible for:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Legal Basis</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Ensuring lawful basis for processing</li>
                    <li>• Obtaining necessary consents</li>
                    <li>• Providing privacy notices</li>
                    <li>• Handling data subject requests</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Quality</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Providing accurate data</li>
                    <li>• Updating outdated information</li>
                    <li>• Minimizing data collection</li>
                    <li>• Ensuring data relevance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Processor Obligations</h2>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">5.1 Processing Instructions</h3>
                <p className="text-muted-foreground text-sm">
                  We will process personal data only on documented instructions from you, including regarding international transfers.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">5.2 Confidentiality</h3>
                <p className="text-muted-foreground text-sm">
                  All personnel processing personal data are bound by confidentiality obligations.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">5.3 Security Measures</h3>
                <p className="text-muted-foreground text-sm">
                  We implement appropriate technical and organizational security measures to protect personal data.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">5.4 Sub-processors</h3>
                <p className="text-muted-foreground text-sm">
                  We may engage sub-processors with your prior written consent and ensure they meet the same obligations.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Subject Rights</h2>
            
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
                We will assist you in fulfilling data subject rights requests:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Access & Portability</h4>
                  <p className="text-sm text-muted-foreground">
                    Provide access to personal data and support data portability requests.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Rectification & Erasure</h4>
                  <p className="text-sm text-muted-foreground">
                    Correct inaccurate data and delete personal data upon request.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Restriction & Objection</h4>
                  <p className="text-sm text-muted-foreground">
                    Restrict processing and honor objection requests as appropriate.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                <p className="text-blue-400 text-sm">
                  <strong>Response Time:</strong> We will respond to data subject requests within 30 days, with the possibility of extension for complex requests.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Breach Notification</h2>
            
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">7.1 Breach Detection</h3>
              <p className="text-muted-foreground mb-4">
                We have implemented systems to detect and respond to personal data breaches promptly.
              </p>
              
              <h3 className="text-xl font-semibold mb-3">7.2 Notification Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Immediate Actions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Contain the breach</li>
                    <li>• Assess the scope</li>
                    <li>• Document the incident</li>
                    <li>• Notify you within 72 hours</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Follow-up Actions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Investigate root cause</li>
                    <li>• Implement remediation</li>
                    <li>• Provide detailed report</li>
                    <li>• Update security measures</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
            
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">8.1 Transfer Mechanisms</h3>
              <p className="text-muted-foreground mb-4">
                When transferring personal data outside the EEA, we rely on appropriate safeguards:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Standard Contractual Clauses</h4>
                  <p className="text-sm text-muted-foreground">
                    We use EU-approved Standard Contractual Clauses for international transfers.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Adequacy Decisions</h4>
                  <p className="text-sm text-muted-foreground">
                    We transfer data to countries with adequacy decisions where applicable.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="text-yellow-400 text-sm">
                  <strong>Current Transfer Locations:</strong> United States, European Union, United Kingdom, Canada, Australia
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Audit Rights</h2>
            
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">9.1 Audit Cooperation</h3>
              <p className="text-muted-foreground mb-4">
                We will cooperate with reasonable audit requests from you or your designated auditor.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Audit Scope</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data processing activities</li>
                    <li>• Security measures</li>
                    <li>• Compliance documentation</li>
                    <li>• Sub-processor arrangements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Audit Process</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 30 days advance notice</li>
                    <li>• During business hours</li>
                    <li>• Confidentiality maintained</li>
                    <li>• Reasonable frequency limits</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Termination and Data Return</h2>
            
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">10.1 Post-Termination Obligations</h3>
              <p className="text-muted-foreground mb-4">
                Upon termination of services, we will:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Data Return</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Return all personal data</li>
                    <li>• Provide data in structured format</li>
                    <li>• Complete within 30 days</li>
                    <li>• Confirm deletion of copies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Ongoing Obligations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Maintain confidentiality</li>
                    <li>• Comply with legal requirements</li>
                    <li>• Support legal proceedings</li>
                    <li>• Provide compliance certificates</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-400">DPA Inquiries</h3>
              <p className="text-muted-foreground mb-4">
                For questions about this Data Processing Agreement or to request a signed copy, please contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Primary Contacts</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Legal Team:</strong> legal@outsoor.com</p>
                    <p><strong>Data Protection Officer:</strong> dpo@outsoor.com</p>
                    <p><strong>Compliance:</strong> compliance@outsoor.com</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response Times</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>General inquiries:</strong> 2 business days</p>
                    <p><strong>Signed DPA requests:</strong> 5 business days</p>
                    <p><strong>Urgent matters:</strong> Same day</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-muted rounded">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This DPA is automatically incorporated into our Terms of Service. For enterprise customers requiring a signed DPA, please contact our legal team.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
