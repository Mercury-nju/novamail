'use client'

import { useState } from 'react'

export default function DirectGoogleTestPage() {
  const [testResult, setTestResult] = useState('')

  const testDirectGoogleOAuth = () => {
    // 完全独立的Google OAuth测试
    const clientId = '3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com'
    const redirectUri = 'https://novamail.pages.dev/google-callback'
    const state = Math.random().toString(36).substring(2, 15)
    
    // 使用 prompt=consent 强制显示同意页面
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email%20profile&response_type=code&state=${state}&prompt=consent&access_type=offline`
    
    setTestResult(`即将跳转到: ${authUrl}`)
    
    // 立即跳转
    window.location.href = authUrl
  }

  const testWithDifferentRedirect = () => {
    // 使用不同的redirect_uri测试
    const clientId = '3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com'
    const redirectUri = 'https://novamail.pages.dev/api/auth/callback/google'
    const state = Math.random().toString(36).substring(2, 15)
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email%20profile&response_type=code&state=${state}&prompt=consent&access_type=offline`
    
    setTestResult(`使用NextAuth redirect: ${authUrl}`)
    
    window.location.href = authUrl
  }

  const copyUrlToClipboard = () => {
    const clientId = '3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com'
    const redirectUri = 'https://novamail.pages.dev/google-callback'
    const state = Math.random().toString(36).substring(2, 15)
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email%20profile&response_type=code&state=${state}&prompt=consent&access_type=offline`
    
    navigator.clipboard.writeText(authUrl).then(() => {
      setTestResult('URL已复制到剪贴板！请粘贴到新标签页测试。')
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            直接Google OAuth测试
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            绕过应用直接测试Google OAuth
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="space-y-4">
            <button
              onClick={testDirectGoogleOAuth}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
            >
              测试1: 直接跳转Google OAuth
            </button>
            
            <button
              onClick={testWithDifferentRedirect}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700"
            >
              测试2: 使用NextAuth redirect URI
            </button>
            
            <button
              onClick={copyUrlToClipboard}
              className="w-full bg-yellow-600 text-white py-3 px-4 rounded-md hover:bg-yellow-700"
            >
              测试3: 复制URL到剪贴板
            </button>
          </div>
          
          {testResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="font-bold text-gray-800 mb-2">测试结果:</h3>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">{testResult}</pre>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-red-50 rounded-md">
            <h3 className="font-bold text-red-800 mb-2">如果所有测试都失败:</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Google Cloud Console配置有问题</li>
              <li>• OAuth同意屏幕状态有问题</li>
              <li>• 需要重新创建OAuth应用</li>
              <li>• 或者使用其他OAuth提供商</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
