'use client'

export default function TestSimplePage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Simple Test Page</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current Language: English</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language: English (Default)
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Content Test</h3>
            <div className="space-y-2">
              <p><strong>Hero Title:</strong> Your AI Copilot for Email Marketing</p>
              <p><strong>Hero Subtitle:</strong> Writes, designs, and sends stunning campaigns — all in minutes. Track results instantly and grow your audience effortlessly.</p>
              <p><strong>Nav Login:</strong> Sign in to your account</p>
              <p><strong>Nav Register:</strong> Create your account</p>
              <p><strong>Features Title:</strong> Why Choose NovaMail</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">English Only Mode</h3>
            <p className="text-gray-600">
              This application now uses English only. All internationalization features have been removed for simplicity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}