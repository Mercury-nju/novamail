'use client'

export default function DirectTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Direct Google OAuth Test
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Copy and paste this URL directly into your browser address bar:
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google OAuth URL:
            </label>
            <textarea
              readOnly
              value="https://accounts.google.com/o/oauth2/v2/auth?client_id=3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com&redirect_uri=https://novamail.pages.dev/google-callback&scope=email&response_type=code"
              className="w-full h-32 p-3 border border-gray-300 rounded-md text-sm font-mono bg-gray-50"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => {
                const url = "https://accounts.google.com/o/oauth2/v2/auth?client_id=3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com&redirect_uri=https://novamail.pages.dev/google-callback&scope=email&response_type=code"
                navigator.clipboard.writeText(url)
                alert('URL copied to clipboard!')
              }}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Copy URL
            </button>
            
            <button
              onClick={() => {
                const url = "https://accounts.google.com/o/oauth2/v2/auth?client_id=3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com&redirect_uri=https://novamail.pages.dev/google-callback&scope=email&response_type=code"
                window.open(url, '_blank')
              }}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Open in New Tab
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            If this URL works, the problem is in our JavaScript code.<br/>
            If this URL doesn't work, the problem is in Google Cloud Console configuration.
          </p>
        </div>
      </div>
    </div>
  )
}
