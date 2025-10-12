'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const error = searchParams.get('error')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // 调用邮箱登录API
      const response = await fetch('https://novamail.world/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      const result = await response.json()
      
      if (result.success) {
        // 存储用户信息到本地存储
        localStorage.setItem('user-email', email)
        localStorage.setItem('user-name', result.user.name || email)
        localStorage.setItem('user-token', result.user.token)
        localStorage.setItem('user-id', result.user.id)
        
        // 重定向到仪表板
        router.push(callbackUrl)
      } else {
        alert(result.error || 'Login failed')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      alert('Login failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const isGoogleOAuthEnabled = () => {
    // Google OAuth is now enabled with real credentials
    return true
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/30 via-transparent to-blue-50/20 relative overflow-hidden backdrop-blur-sm">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main floating blobs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/60 to-primary-300/40 rounded-full mix-blend-multiply filter blur-2xl opacity-80 backdrop-blur-sm" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/60 to-purple-300/40 rounded-full mix-blend-multiply filter blur-2xl opacity-80 backdrop-blur-sm" />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-primary-300 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mx-auto h-12 w-auto text-blue-600 flex items-center justify-center mb-8">
            <div className="h-12 w-12 bg-gradient-to-b from-blue-600 to-purple-600 rounded-2xl border-2 border-white flex items-center justify-center shadow-xl">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* Speed lines */}
                <line x1="6" y1="10" x2="9" y2="10" stroke="white" strokeWidth="1.5" opacity="0.9"/>
                <line x1="5" y1="12" x2="8" y2="12" stroke="white" strokeWidth="1.5" opacity="0.7"/>
                <line x1="4" y1="14" x2="7" y2="14" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                {/* Paper airplane pointing up-right */}
                <path d="M12 7 L16 5 L14 13 L12 7 Z" fill="white"/>
                <path d="M14 13 L16 5 L18 15 L14 13 Z" fill="white"/>
                {/* Four-pointed star/sparkle */}
                <path d="M19 6 L20 7 L19 8 L18 7 Z" fill="white"/>
                <path d="M19 7 L21 7 L19 7 L17 7 Z" fill="white"/>
              </svg>
            </div>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-3">
            Sign in to your account
          </h2>
          <p className="text-center text-sm text-gray-600 mb-8">
            Welcome back to NovaMail
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/20 backdrop-blur-md py-10 px-6 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/30">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                Email address
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 sm:text-sm transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                Password
              </label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 sm:text-sm transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/40 rounded bg-white/30 backdrop-blur-sm"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-800">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="mt-4">
              <a
                href="https://accounts.google.com/o/oauth2/v2/auth?client_id=3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com&redirect_uri=https://novamail.pages.dev/google-callback&scope=email%20profile&response_type=code&state=test123&prompt=consent&access_type=offline"
                className="w-full flex items-center justify-center py-3 px-4 bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl text-sm font-medium text-gray-800 hover:bg-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </a>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100/80 backdrop-blur-sm border border-red-400/50 text-red-700 rounded-xl">
              <p className="font-bold">Login Error:</p>
              <p>{error === 'OAuthSignin' ? 'Login failed. Please try again.' : error}</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-700">
              Or{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300">
                Don't have an account? Sign up
              </Link>
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}