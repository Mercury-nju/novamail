'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function GoogleCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('Processing...')

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const code = searchParams.get('code')
        const error = searchParams.get('error')
        
        if (error) {
          setStatus('Login failed: ' + error)
          setTimeout(() => {
            router.push('/login')
          }, 3000)
          return
        }
        
        if (code) {
          setStatus('Processing Google authentication...')
          
          try {
            // 1. 调用后端API处理Google OAuth
            const tokenResponse = await fetch('https://novamail.world/api/auth/google-callback', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code: code,
                redirect_uri: 'https://novamail.world/google-callback'
              })
            })

            if (!tokenResponse.ok) {
              throw new Error('Failed to exchange authorization code')
            }

            const userResult = await tokenResponse.json()

            if (userResult.success) {
              // 4. 存储用户信息到本地存储
              localStorage.setItem('user-email', userResult.user.email)
              localStorage.setItem('user-name', userResult.user.name)
              localStorage.setItem('user-token', userResult.user.token)
              localStorage.setItem('user-id', userResult.user.id)
              localStorage.setItem('user-picture', userResult.user.picture || '')
              localStorage.setItem('auth-provider', 'google')

              setStatus('Login successful! Redirecting...')
              
              setTimeout(() => {
                router.push('/dashboard')
              }, 1500)
            } else {
              throw new Error(userResult.error || 'Failed to create user account')
            }

          } catch (error) {
            console.error('Google authentication error:', error)
            setStatus('Authentication failed. Redirecting to login...')
            setTimeout(() => {
              router.push('/login')
            }, 3000)
          }
        } else {
          setStatus('No authorization code received')
          setTimeout(() => {
            router.push('/login')
          }, 3000)
        }
      } catch (error) {
        console.error('Google callback error:', error)
        setStatus('Error processing login')
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      }
    }

    handleGoogleCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Google Login Processing
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {status}
          </p>
        </div>
        
        <div className="mt-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">加载中...</p>
        </div>
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  )
}
