// Note: This page is a Client Component due to global providers, so metadata export is not allowed

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">GDPR Compliance</h1>
          <p className="text-gray-600 mt-2">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            
            <h2>1. GDPR Overview</h2>
            <p>
              The General Data Protection Regulation (GDPR) is a comprehensive data protection law that applies to all organizations processing personal data of EU residents. NovaMail is committed to full compliance with GDPR requirements.
            </p>

            <h2>2. Our Commitment to GDPR</h2>
            <p>NovaMail implements the following GDPR principles:</p>
            <ul>
              <li><strong>Lawfulness, fairness, and transparency:</strong> We process data lawfully and transparently</li>
              <li><strong>Purpose limitation:</strong> We collect data for specific, legitimate purposes</li>
              <li><strong>Data minimization:</strong> We only collect data that is necessary</li>
              <li><strong>Accuracy:</strong> We keep personal data accurate and up-to-date</li>
              <li><strong>Storage limitation:</strong> We retain data only as long as necessary</li>
              <li><strong>Integrity and confidentiality:</strong> We protect data with appropriate security measures</li>
              <li><strong>Accountability:</strong> We demonstrate compliance with GDPR requirements</li>
            </ul>

            <h2>3. Legal Basis for Processing</h2>
            <p>We process personal data under the following legal bases:</p>
            
            <h3>3.1 Consent (Article 6(1)(a))</h3>
            <p>We process data when you have given clear consent for specific purposes:</p>
            <ul>
              <li>Marketing communications</li>
              <li>Newsletter subscriptions</li>
              <li>Optional analytics tracking</li>
              <li>Third-party integrations</li>
            </ul>

            <h3>3.2 Contract Performance (Article 6(1)(b))</h3>
            <p>We process data to fulfill our contractual obligations:</p>
            <ul>
              <li>Account creation and management</li>
              <li>Service delivery and support</li>
              <li>Payment processing</li>
              <li>Feature access and functionality</li>
            </ul>

            <h3>3.3 Legitimate Interests (Article 6(1)(f))</h3>
            <p>We process data for legitimate business interests:</p>
            <ul>
              <li>Service improvement and development</li>
              <li>Security and fraud prevention</li>
              <li>Analytics and performance monitoring</li>
              <li>Customer support and communication</li>
            </ul>

            <h2>4. Your Rights Under GDPR</h2>
            <p>As a data subject, you have the following rights:</p>

            <h3>4.1 Right of Access (Article 15)</h3>
            <p>You have the right to obtain confirmation of whether we process your personal data and access to that data.</p>

            <h3>4.2 Right to Rectification (Article 16)</h3>
            <p>You have the right to have inaccurate personal data corrected and incomplete data completed.</p>

            <h3>4.3 Right to Erasure (Article 17)</h3>
            <p>You have the right to request deletion of your personal data in certain circumstances.</p>

            <h3>4.4 Right to Restrict Processing (Article 18)</h3>
            <p>You have the right to restrict the processing of your personal data in certain situations.</p>

            <h3>4.5 Right to Data Portability (Article 20)</h3>
            <p>You have the right to receive your personal data in a structured, commonly used format.</p>

            <h3>4.6 Right to Object (Article 21)</h3>
            <p>You have the right to object to processing based on legitimate interests or for marketing purposes.</p>

            <h3>4.7 Rights Related to Automated Decision-Making (Article 22)</h3>
            <p>You have the right not to be subject to automated decision-making, including profiling.</p>

            <h2>5. Data Protection Measures</h2>
            
            <h3>5.1 Technical Safeguards</h3>
            <ul>
              <li>End-to-end encryption for data transmission</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Secure socket layer (SSL) certificates</li>
              <li>Regular security audits and penetration testing</li>
              <li>Multi-factor authentication for admin access</li>
            </ul>

            <h3>5.2 Organizational Safeguards</h3>
            <ul>
              <li>Data protection training for all employees</li>
              <li>Strict access controls and role-based permissions</li>
              <li>Regular data protection impact assessments</li>
              <li>Incident response procedures</li>
              <li>Vendor security assessments</li>
            </ul>

            <h2>6. Data Processing Records</h2>
            <p>We maintain detailed records of our data processing activities, including:</p>
            <ul>
              <li>Purposes of processing</li>
              <li>Categories of personal data</li>
              <li>Categories of data subjects</li>
              <li>Recipients of personal data</li>
              <li>Data retention periods</li>
              <li>Security measures implemented</li>
            </ul>

            <h2>7. Data Breach Procedures</h2>
            <p>In the event of a data breach, we will:</p>
            <ul>
              <li>Notify the supervisory authority within 72 hours</li>
              <li>Inform affected individuals without undue delay</li>
              <li>Document the breach and our response</li>
              <li>Take immediate steps to contain and remediate</li>
              <li>Conduct a post-incident review</li>
            </ul>

            <h2>8. International Data Transfers</h2>
            <p>When transferring data outside the EEA, we ensure adequate protection through:</p>
            <ul>
              <li>Adequacy decisions by the European Commission</li>
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Binding Corporate Rules (BCRs)</li>
              <li>Certification schemes and codes of conduct</li>
            </ul>

            <h2>9. Data Protection Officer (DPO)</h2>
            <p>
              We have appointed a Data Protection Officer to oversee our GDPR compliance:
            </p>
            <ul>
              <li>Email: contact@novamail.com (actual recipient: lihongyangnju@gmail.com)</li>
              <li>Role: Data Protection Officer</li>
              <li>Responsibilities: Monitor compliance, provide advice, act as contact point</li>
            </ul>

            <h2>10. Supervisory Authority</h2>
            <p>
              You have the right to lodge a complaint with your local supervisory authority if you believe we have violated GDPR. You can find your local authority at:
            </p>
            <ul>
              <li><a href="https://edpb.europa.eu/about-edpb/board/members_en" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">European Data Protection Board</a></li>
            </ul>

            <h2>11. Exercising Your Rights</h2>
            <p>To exercise your GDPR rights, please contact us:</p>
            <ul>
              <li>Email: contact@novamail.com</li>
              <li>Subject: GDPR Rights Request</li>
              <li>Include: Your request type and verification information</li>
            </ul>
            <p>We will respond to your request within one month of receipt.</p>

            <h2>12. Updates to This Policy</h2>
            <p>
              We may update this GDPR Compliance statement to reflect changes in our practices or legal requirements. We will notify you of any significant changes.
            </p>

            <div className="mt-12 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                This GDPR Compliance statement is effective from January 2025. For questions about our data protection practices, please contact our Data Protection Officer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}