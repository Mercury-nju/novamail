'use client'

export default function PureHtmlTestPage() {
  // 生成随机state参数
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  
  // 完整的Google OAuth URL
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com&redirect_uri=https://novamail.pages.dev/google-callback&scope=email%20profile&response_type=code&state=${state}&prompt=consent&access_type=offline`

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            纯HTML Google OAuth测试
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            使用纯HTML链接，不依赖JavaScript
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              点击下面的链接测试Google OAuth
            </h3>
            
            {/* 纯HTML链接，不依赖JavaScript */}
            <a
              href={googleAuthUrl}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              使用Google登录 (纯HTML链接)
            </a>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="font-bold text-gray-800 mb-2">当前使用的URL:</h3>
            <pre className="text-xs text-gray-700 whitespace-pre-wrap break-all">{googleAuthUrl}</pre>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <h3 className="font-bold text-blue-800 mb-2">测试说明:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 这是一个纯HTML链接，不依赖JavaScript</li>
              <li>• 如果这个链接能正常工作，说明问题在JavaScript代码</li>
              <li>• 如果这个链接也不能工作，说明问题在Google Cloud Console配置</li>
              <li>• 点击后应该跳转到Google的账户选择页面</li>
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 rounded-md">
            <h3 className="font-bold text-yellow-800 mb-2">如果还是不行:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 复制上面的URL到新标签页测试</li>
              <li>• 检查浏览器控制台是否有错误</li>
              <li>• 尝试使用无痕模式</li>
              <li>• 清除浏览器缓存和cookies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
