'use client'

export default function TestGooglePage() {
  const testGoogleOAuth = () => {
    console.log('Testing Google OAuth URL...')
    const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com&redirect_uri=https://novamail.pages.dev/google-callback&scope=email&response_type=code'
    console.log('URL:', url)
    window.location.href = url
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Test Google OAuth
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Click the button below to test Google OAuth directly
          </p>
        </div>
        
        <div>
          <button
            onClick={testGoogleOAuth}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Test Google OAuth
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            This will redirect to: https://accounts.google.com/o/oauth2/v2/auth?client_id=3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com&redirect_uri=https://novamail.pages.dev/google-callback&scope=email&response_type=code
          </p>
        </div>
      </div>
    </div>
  )
}
