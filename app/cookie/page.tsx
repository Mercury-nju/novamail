// Note: This page is a Client Component due to global providers, so metadata export is not allowed

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
          <p className="text-gray-600 mt-2">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>NovaMail uses cookies for the following purposes:</p>
            
            <h3>2.1 Essential Cookies</h3>
            <p>These cookies are necessary for the website to function properly. They include:</p>
            <ul>
              <li>Authentication cookies to keep you logged in</li>
              <li>Security cookies to protect against fraud</li>
              <li>Session cookies to maintain your session state</li>
              <li>Load balancing cookies to distribute traffic</li>
            </ul>

            <h3>2.2 Functional Cookies</h3>
            <p>These cookies enhance your experience by remembering your preferences:</p>
            <ul>
              <li>Language and region preferences</li>
              <li>Theme and display settings</li>
              <li>Dashboard layout preferences</li>
              <li>Form data to prevent data loss</li>
            </ul>

            <h3>2.3 Analytics Cookies</h3>
            <p>These cookies help us understand how you use our website:</p>
            <ul>
              <li>Page views and navigation patterns</li>
              <li>Time spent on pages</li>
              <li>Feature usage statistics</li>
              <li>Error tracking and performance monitoring</li>
            </ul>

            <h3>2.4 Marketing Cookies</h3>
            <p>These cookies are used for advertising and marketing purposes:</p>
            <ul>
              <li>Personalized content recommendations</li>
              <li>Retargeting advertisements</li>
              <li>Campaign performance tracking</li>
              <li>Social media integration</li>
            </ul>

            <h2>3. Third-Party Cookies</h2>
            <p>We may use third-party services that set their own cookies:</p>
            
            <h3>3.1 Analytics Services</h3>
            <ul>
              <li><strong>Google Analytics:</strong> Website traffic and user behavior analysis</li>
              <li><strong>Mixpanel:</strong> User interaction and feature usage tracking</li>
            </ul>

            <h3>3.2 Payment Processing</h3>
            <ul>
              <li><strong>Stripe:</strong> Secure payment processing and fraud prevention</li>
              <li><strong>PayPal:</strong> Alternative payment method processing</li>
            </ul>

            <h3>3.3 Customer Support</h3>
            <ul>
              <li><strong>Intercom:</strong> Live chat and customer support</li>
              <li><strong>Zendesk:</strong> Help desk and ticket management</li>
            </ul>

            <h2>4. Cookie Duration</h2>
            <p>Cookies have different lifespans:</p>
            <ul>
              <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain for a set period (30 days to 2 years)</li>
              <li><strong>First-Party Cookies:</strong> Set by NovaMail directly</li>
              <li><strong>Third-Party Cookies:</strong> Set by external services</li>
            </ul>

            <h2>5. Managing Your Cookie Preferences</h2>
            
            <h3>5.1 Browser Settings</h3>
            <p>You can control cookies through your browser settings:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
              <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions</li>
            </ul>

            <h3>5.2 Cookie Consent</h3>
            <p>
              When you first visit our website, you'll see a cookie consent banner. You can:
            </p>
            <ul>
              <li>Accept all cookies</li>
              <li>Reject non-essential cookies</li>
              <li>Customize your preferences</li>
              <li>Change your settings at any time</li>
            </ul>

            <h3>5.3 Opt-Out Links</h3>
            <p>You can opt out of specific tracking services:</p>
            <ul>
              <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
              <li><strong>Facebook:</strong> <a href="https://www.facebook.com/settings?tab=ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Facebook Ad Preferences</a></li>
              <li><strong>Twitter:</strong> <a href="https://twitter.com/settings/account/personalization" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Twitter Personalization</a></li>
            </ul>

            <h2>6. Impact of Disabling Cookies</h2>
            <p>If you disable cookies, some features may not work properly:</p>
            <ul>
              <li>You may need to log in repeatedly</li>
              <li>Your preferences won't be saved</li>
              <li>Some features may be unavailable</li>
              <li>Website performance may be affected</li>
            </ul>

            <h2>7. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any significant changes by:
            </p>
            <ul>
              <li>Posting the updated policy on our website</li>
              <li>Sending an email notification</li>
              <li>Showing a notice on our website</li>
            </ul>

            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us:
            </p>
            <ul>
              <li>Email: contact@novamail.com (actual recipient: lihongyangnju@gmail.com)</li>
              <li>Subject: Cookie Policy Inquiry</li>
            </ul>

            <div className="mt-12 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                This Cookie Policy is effective from January 2025. By continuing to use our website, you acknowledge that you have read and understood this Cookie Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}