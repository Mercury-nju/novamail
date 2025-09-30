// Note: This page is a Client Component due to global providers, so metadata export is not allowed

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            
            <h2>1. Introduction</h2>
            <p>
              NovaMail (hereinafter referred to as "we," "our," or "service") is committed to protecting your privacy. This privacy policy explains how we collect, use, store, and protect your personal information.
            </p>

            <h2>2. Information Collection</h2>
            <h3>2.1 Information You Provide</h3>
            <p>We may collect the following information:</p>
            <ul>
              <li>Account information (name, email address, password)</li>
              <li>Contact information (phone number, address)</li>
              <li>Payment information (credit card information, billing address)</li>
              <li>Marketing campaign content</li>
              <li>Customer contact lists</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>We may automatically collect:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (page visits, clicks, timestamps)</li>
              <li>Cookies and similar technologies</li>
              <li>Log files</li>
            </ul>

            <h2>3. Information Use</h2>
            <p>We use the collected information for:</p>
            <ul>
              <li>Providing and improving our services</li>
              <li>Processing transactions and sending notifications</li>
              <li>Customer support and communication</li>
              <li>Security monitoring and fraud prevention</li>
              <li>Legal compliance</li>
              <li>Marketing and promotion (with your consent)</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <h3>4.1 Third-Party Service Providers</h3>
            <p>
              We may share information with trusted third-party service providers to help us operate our services, including:
            </p>
            <ul>
              <li>Payment processors</li>
              <li>Cloud storage services</li>
              <li>Analytics services</li>
              <li>Customer support tools</li>
            </ul>

            <h3>4.2 Legal Requirements</h3>
            <p>
              We may disclose your information when required by law or to protect our rights.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul>
              <li>Data encryption (in transit and at rest)</li>
              <li>Access controls and authentication</li>
              <li>Regular security audits</li>
              <li>Employee training and confidentiality agreements</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary or as required by law. When no longer needed, we securely delete or anonymize it.
            </p>

            <h2>7. Your Rights</h2>
            <p>Under applicable laws, you may have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Restrict processing</li>
              <li>Data portability</li>
              <li>Object to processing</li>
            </ul>

            <h2>8. Cookie Policy</h2>
            <h3>8.1 Types of Cookies We Use</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences</li>
              <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
              <li><strong>Marketing Cookies:</strong> Used for personalized advertising</li>
            </ul>

            <h3>8.2 Cookie Management</h3>
            <p>
              You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect website functionality.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place.
            </p>

            <h2>10. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal information from children.
            </p>

            <h2>11. Third-Party Links</h2>
            <p>
              Our services may contain links to third-party websites. We are not responsible for the privacy practices of these sites.
            </p>

            <h2>12. Marketing Communications</h2>
            <p>
              We may send you marketing communications. You can opt out at any time by:
            </p>
            <ul>
              <li>Clicking the unsubscribe link in emails</li>
              <li>Updating preferences in account settings</li>
              <li>Contacting us directly</li>
            </ul>

            <h2>13. Privacy Policy Updates</h2>
            <p>
              We may update this privacy policy from time to time. Significant changes will be notified via email or website.
            </p>

            <h2>14. Data Protection Officer</h2>
            <p>
              If you have any questions about data processing, please contact our Data Protection Officer:
            </p>
            <ul>
              <li>Email: contact@novamail.com (actual recipient: lihongyangnju@gmail.com)</li>
            </ul>

            <h2>15. Regulatory Authority</h2>
            <p>
              If you believe we have violated data protection laws, you have the right to complain to the relevant regulatory authority.
            </p>

            <div className="mt-12 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                This privacy policy is effective from January 2025. By using NovaMail services, you confirm that you have read, understood, and agree to this privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}