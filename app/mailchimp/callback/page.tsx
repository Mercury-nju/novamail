'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

function MailchimpCallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const error = searchParams.get('error')
      
      if (error) {
        setStatus('error')
        setMessage(`Authorization failed: ${error}`)
        return
      }
      
      if (!code) {
        setStatus('error')
        setMessage('No authorization code received')
        return
      }

      try {
        // 获取用户邮箱（从localStorage或sessionStorage）
        const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
        
        if (!userEmail) {
          setStatus('error')
          setMessage('User email not found. Please log in again.')
          return
        }

        // 发送回调到后端
        const response = await fetch('/api/mailchimp/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
            userEmail: userEmail
          })
        })

        const result = await response.json()

        if (result.success) {
          setStatus('success')
          setMessage('Mailchimp account connected successfully!')
          
          // 3秒后自动关闭窗口
          setTimeout(() => {
            window.close()
          }, 3000)
        } else {
          setStatus('error')
          setMessage(`Connection failed: ${result.error}`)
        }
      } catch (error) {
        console.error('Callback error:', error)
        setStatus('error')
        setMessage('Failed to process authorization. Please try again.')
      }
    }

    handleCallback()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Processing Authorization...
            </h2>
            <p className="text-gray-600">
              Please wait while we connect your Mailchimp account.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Success!
            </h2>
            <p className="text-gray-600 mb-4">
              {message}
            </p>
            <p className="text-sm text-gray-500">
              This window will close automatically in a few seconds.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Error
            </h2>
            <p className="text-gray-600 mb-4">
              {message}
            </p>
            <button
              onClick={() => window.close()}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close Window
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function MailchimpCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading...
          </h2>
        </div>
      </div>
    }>
      <MailchimpCallbackContent />
    </Suspense>
  )
}
