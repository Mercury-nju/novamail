'use client'

export default function SimpleTestPage() {
  const testWithPublicClientId = () => {
    // 使用Google的公开测试client_id
    const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com&redirect_uri=https://novamail.pages.dev/google-callback&scope=email&response_type=code'
    console.log('Testing with public client_id:', url)
    window.location.href = url
  }

  const testWithYourClientId = () => {
    // 使用您的client_id
    const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com&redirect_uri=https://novamail.pages.dev/google-callback&scope=email&response_type=code'
    console.log('Testing with your client_id:', url)
    window.location.href = url
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Simple Google OAuth Test
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Test with different client IDs
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={testWithPublicClientId}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Test with Public Client ID
          </button>
          
          <button
            onClick={testWithYourClientId}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Test with Your Client ID
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            If public client ID works but yours doesn't,<br/>
            the problem is in your Google Cloud Console configuration.
          </p>
        </div>
      </div>
    </div>
  )
}
