'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function EmailSettingsPage() {
  const router = useRouter()
  const [emailConfig, setEmailConfig] = useState({
    provider: 'gmail',
    email: '',
    password: '',
    accessToken: '',
    refreshToken: '',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    isSecure: true,
    isConfigured: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const emailProviders = [
    {
      id: 'gmail',
      name: 'Gmail',
      host: 'smtp.gmail.com',
      port: '587',
      secure: true,
      instructions: 'Use Gmail API access token for sending emails'
    },
    {
      id: 'outlook',
      name: 'Outlook/Hotmail',
      host: 'smtp-mail.outlook.com',
      port: '587',
      secure: true,
      instructions: 'Use your Outlook password'
    },
    {
      id: 'yahoo',
      name: 'Yahoo Mail',
      host: 'smtp.mail.yahoo.com',
      port: '587',
      secure: true,
      instructions: 'Use your Yahoo app password'
    },
    {
      id: 'custom',
      name: 'Custom SMTP',
      host: '',
      port: '587',
      secure: true,
      instructions: 'Enter your custom SMTP settings'
    }
  ]

  const selectedProvider = emailProviders.find(p => p.id === emailConfig.provider)

  useEffect(() => {
    // Load saved email configuration
    loadEmailConfig()
  }, [])

  const loadEmailConfig = async () => {
    try {
      const response = await fetch('/api/user/email-config')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.config) {
          setEmailConfig(data.config)
        }
      }
    } catch (error) {
      console.error('Failed to load email config:', error)
    }
  }

  const handleProviderChange = (providerId: string) => {
    const provider = emailProviders.find(p => p.id === providerId)
    if (provider) {
      setEmailConfig(prev => ({
        ...prev,
        provider: providerId,
        smtpHost: provider.host,
        smtpPort: provider.port,
        isSecure: provider.secure
      }))
    }
  }

  const handleTestConnection = async () => {
    if (!emailConfig.email || !emailConfig.password) {
      toast.error('Please enter your email and password')
      return
    }

    setIsTesting(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/user/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailConfig),
      })

      const result = await response.json()
      setTestResult(result)

      if (result.success) {
        toast.success('Email connection successful!')
      } else {
        toast.error(result.error || 'Email connection failed')
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to test email connection'
      })
      toast.error('Failed to test email connection')
    } finally {
      setIsTesting(false)
    }
  }

  const handleSaveConfig = async () => {
    // 验证必填字段
    if (!emailConfig.email) {
      toast.error('Please enter your email address')
      return
    }

    if (emailConfig.provider === 'gmail') {
      if (!emailConfig.accessToken) {
        toast.error('Please enter your Gmail API access token')
        return
      }
    } else {
      if (!emailConfig.password) {
        toast.error('Please enter your email password')
        return
      }
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/user/email-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...emailConfig,
          isConfigured: true
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Email configuration saved successfully!')
        router.push('/dashboard')
      } else {
        toast.error(result.error || 'Failed to save email configuration')
      }
    } catch (error) {
      toast.error('Failed to save email configuration')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Email Settings</h1>
            <p className="mt-1 text-sm text-gray-600">
              Configure your email account for sending marketing emails
            </p>
          </div>
        </div>
      </div>

      {/* Email Provider Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-600" />
          Email Provider
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {emailProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleProviderChange(provider.id)}
              className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                emailConfig.provider === provider.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">{provider.name}</div>
              <div className="text-sm text-gray-600">{provider.instructions}</div>
            </button>
          ))}
        </div>

        {/* Email Configuration Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={emailConfig.email}
              onChange={(e) => setEmailConfig(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your-email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Gmail API Token Fields */}
          {emailConfig.provider === 'gmail' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gmail API Access Token
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={emailConfig.accessToken}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, accessToken: e.target.value }))}
                    placeholder="ya29.a0AfH6SMC..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Get your access token from Google OAuth 2.0 Playground
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gmail API Refresh Token (Optional)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={emailConfig.refreshToken}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, refreshToken: e.target.value }))}
                    placeholder="1//04..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  For automatic token refresh (recommended)
                </p>
              </div>
            </>
          )}

          {/* Other providers password field */}
          {emailConfig.provider !== 'gmail' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password / App Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={emailConfig.password}
                  onChange={(e) => setEmailConfig(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your email password or app password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {selectedProvider?.instructions}
              </p>
            </div>
          )}

          {/* SMTP Settings (for custom provider) */}
          {emailConfig.provider === 'custom' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={emailConfig.smtpHost}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpHost: e.target.value }))}
                    placeholder="smtp.example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    value={emailConfig.smtpPort}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpPort: e.target.value }))}
                    placeholder="587"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Test Connection */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Test Connection</h4>
              <p className="text-sm text-gray-600">Verify your email settings work correctly</p>
            </div>
            <button
              onClick={handleTestConnection}
              disabled={isTesting || !emailConfig.email || !emailConfig.password}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isTesting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Testing...</span>
                </>
              ) : (
                <span>Test Connection</span>
              )}
            </button>
          </div>

          {/* Test Result */}
          {testResult && (
            <div className={`mt-4 p-4 rounded-lg flex items-center space-x-3 ${
              testResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {testResult.success ? (
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              ) : (
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
              )}
              <div>
                <div className={`text-sm font-medium ${
                  testResult.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {testResult.success ? 'Connection Successful' : 'Connection Failed'}
                </div>
                <div className={`text-sm ${
                  testResult.success ? 'text-green-600' : 'text-red-600'
                }`}>
                  {testResult.message}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveConfig}
          disabled={isLoading || !emailConfig.email || !emailConfig.password}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Saving...</span>
            </>
          ) : (
            <span>Save Configuration</span>
          )}
        </button>
      </div>
    </div>
  )
}
