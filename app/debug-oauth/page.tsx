'use client'

import { useState } from 'react'

export default function DebugOAuthPage() {
  const [debugInfo, setDebugInfo] = useState('')

  const testGoogleOAuth = () => {
    const clientId = '3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com'
    const redirectUri = 'https://novamail.pages.dev/google-callback'
    const state = Math.random().toString(36).substring(2, 15)
    
    // 完整的Google OAuth URL
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email%20profile&response_type=code&state=${state}&prompt=consent&access_type=offline`
    
    setDebugInfo(`即将跳转到: ${authUrl}`)
    
    // 延迟跳转，让用户看到URL
    setTimeout(() => {
      window.location.href = authUrl
    }, 2000)
  }

  const testWithForceConsent = () => {
    const clientId = '3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com'
    const redirectUri = 'https://novamail.pages.dev/google-callback'
    const state = Math.random().toString(36).substring(2, 15)
    
    // 使用 prompt=consent 强制显示同意页面
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email%20profile&response_type=code&state=${state}&prompt=consent&access_type=offline`
    
    setDebugInfo(`强制同意页面: ${authUrl}`)
    
    setTimeout(() => {
      window.location.href = authUrl
    }, 2000)
  }

  const clearBrowserData = () => {
    setDebugInfo('请手动清除浏览器数据：\n1. 按F12打开开发者工具\n2. 右键点击刷新按钮\n3. 选择"清空缓存并硬性重新加载"\n4. 或者在设置中清除所有Google相关cookies')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Google OAuth 调试页面
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            逐步调试Google登录问题
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="space-y-4">
            <button
              onClick={testGoogleOAuth}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
            >
              测试1: 正常Google OAuth流程
            </button>
            
            <button
              onClick={testWithForceConsent}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700"
            >
              测试2: 强制显示同意页面 (prompt=consent)
            </button>
            
            <button
              onClick={clearBrowserData}
              className="w-full bg-yellow-600 text-white py-3 px-4 rounded-md hover:bg-yellow-700"
            >
              测试3: 清除浏览器缓存说明
            </button>
          </div>
          
          {debugInfo && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="font-bold text-gray-800 mb-2">调试信息:</h3>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="font-bold text-blue-800 mb-2">当前配置:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Client ID: 3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com</li>
              <li>• Redirect URI: https://novamail.pages.dev/google-callback</li>
              <li>• Scope: email profile</li>
              <li>• Response Type: code</li>
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <h3 className="font-bold text-red-800 mb-2">可能的问题:</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• 浏览器已记住Google登录状态</li>
              <li>• Google Cloud Console配置不匹配</li>
              <li>• OAuth同意屏幕状态有问题</li>
              <li>• 需要清除浏览器缓存</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
