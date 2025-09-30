// Note: This page is a Client Component due to global providers, so metadata export is not allowed

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            
            <h2>1. Service Overview</h2>
            <p>
              NovaMail (hereinafter referred to as "we" or "service") is a professional email marketing platform that provides users with services to create, send and track email marketing campaigns.
            </p>

            <h2>2. Acceptance of Terms</h2>
            <p>
              By accessing or using NovaMail services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>3. User Account</h2>
            <h3>3.1 Account Registration</h3>
            <p>
              You need to create an account to use our services. You are responsible for providing accurate, complete and up-to-date information.
            </p>
            
            <h3>3.2 Account Security</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account.
            </p>

            <h2>4. Service Usage</h2>
            <h3>4.1 Permitted Use</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to use our services for lawful business and personal purposes.
            </p>

            <h3>4.2 Prohibited Activities</h3>
            <p>You may not:</p>
            <ul>
              <li>Send spam or unsolicited emails</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on others' intellectual property rights</li>
              <li>Distribute malware or harmful content</li>
              <li>Attempt unauthorized access to our systems</li>
              <li>Interfere with or disrupt the normal operation of services</li>
            </ul>

            <h2>5. Content Responsibility</h2>
            <p>
              You are responsible for all content created, sent, or shared through our services. We are not responsible for user-generated content.
            </p>

            <h2>6. Privacy and Data Protection</h2>
            <p>
              We value your privacy. Please refer to our Privacy Policy for information on how we collect, use, and protect your information.
            </p>

            <h2>7. Service Availability</h2>
            <p>
              We strive to maintain high service availability, but do not guarantee that services will not be interrupted. We may perform regular maintenance and updates.
            </p>

            <h2>8. Fees and Payment</h2>
            <h3>8.1 Pricing</h3>
            <p>
              Our services offer free and paid plans. Prices for paid plans are published on our website.
            </p>

            <h3>8.2 Payment Terms</h3>
            <p>
              Paid services are charged on a subscription basis. All fees must be paid in advance and are non-refundable, unless otherwise required by law.
            </p>

            <h2>9. Intellectual Property</h2>
            <p>
              NovaMail and all related trademarks, copyrights, and other intellectual property rights are owned by us. You may not copy, modify, or distribute our intellectual property.
            </p>

            <h2>10. Service Termination</h2>
            <h3>10.1 User Termination</h3>
            <p>
              You may terminate your account at any time through account settings.
            </p>

            <h3>10.2 Our Termination</h3>
            <p>
              We may suspend or terminate your account if we find that you have violated these terms.
            </p>

            <h2>11. Disclaimer</h2>
            <p>
              Our services are provided "as is" without any express or implied warranties. We do not guarantee that the services will meet your needs or will not be interrupted.
            </p>

            <h2>12. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages.
            </p>

            <h2>13. Dispute Resolution</h2>
            <p>
              Any disputes arising from the use of our services should be resolved through friendly negotiation. If negotiation fails, the dispute should be submitted to a court with jurisdiction.
            </p>

            <h2>14. Terms Modification</h2>
            <p>
              We reserve the right to modify these terms at any time. Significant changes will be notified to you via email or website.
            </p>

            <h2>15. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us through the following:
            </p>
            <ul>
              <li>Email: contact@novamail.com (actual recipient: lihongyangnju@gmail.com)</li>
            </ul>

            <div className="mt-12 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                These Terms of Service are effective from January 2025. By using NovaMail services, you confirm that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}