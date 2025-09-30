'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import {
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface SMTPConfig {
  host: string
  port: number
  user: string
  pass: string
  secure: boolean
}

export default function EmailSettingsPage() {
  const { data: session } = useSession()
  const [smtpConfig, setSmtpConfig] = useState<SMTPConfig>({
    host: '',
    port: 587,
    user: '',
    pass: '',
    secure: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [testResult, setTestResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const [showGuides, setShowGuides] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<string>('')

  const handleInputChange = (field: keyof SMTPConfig, value: string | number | boolean) => {
    setSmtpConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleTestConnection = async () => {
    if (!smtpConfig.host || !smtpConfig.user || !smtpConfig.pass) {
      toast.error('Please fill in complete SMTP configuration information')
      return
    }

    setIsTesting(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/settings/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smtpConfig),
      })

      const result = await response.json()

      if (result.success) {
        setTestResult({
          success: true,
          message: 'Email configuration test successful!'
        })
        toast.success('Email configuration test successful!')
      } else {
        setTestResult({
          success: false,
          message: result.error || 'Email configuration test failed'
        })
        toast.error(result.error || 'Email configuration test failed')
      }
    } catch (error) {
      console.error('Test connection error:', error)
      setTestResult({
        success: false,
        message: 'Network error, please try again later'
      })
      toast.error('Network error, please try again later')
    } finally {
      setIsTesting(false)
    }
  }

  const handleSaveConfig = async () => {
    if (!smtpConfig.host || !smtpConfig.user || !smtpConfig.pass) {
      toast.error('Please fill in complete SMTP configuration information')
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch('/api/settings/save-email-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smtpConfig),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Email configuration saved successfully!')
      } else {
        toast.error(result.error || 'Save failed')
      }
    } catch (error) {
      console.error('Save config error:', error)
      toast.error('Save failed, please try again later')
    } finally {
      setIsSaving(false)
    }
  }

  const emailProviders = {
    gmail: {
      name: 'Gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      guide: {
        title: 'Gmail SMTP Configuration',
        steps: [
          'Enable 2-Factor Authentication on your Gmail account',
          'Go to Google Account settings > Security',
          'Generate an App Password for "Mail"',
          'Use your Gmail address as username',
          'Use the generated App Password (not your regular password)'
        ],
        note: 'Gmail requires App Passwords for SMTP authentication when 2FA is enabled.'
      }
    },
    outlook: {
      name: 'Outlook/Hotmail',
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      guide: {
        title: 'Outlook SMTP Configuration',
        steps: [
          'Use your full Outlook email address as username',
          'Use your regular Outlook password',
          'Enable "Less secure app access" if needed',
          'Or use App Passwords if 2FA is enabled'
        ],
        note: 'Outlook may require enabling "Less secure app access" in account settings.'
      }
    },
    yahoo: {
      name: 'Yahoo Mail',
      host: 'smtp.mail.yahoo.com',
      port: 587,
      secure: false,
      guide: {
        title: 'Yahoo Mail SMTP Configuration',
        steps: [
          'Enable 2-Factor Authentication',
          'Generate an App Password in Yahoo Account Security',
          'Use your Yahoo email address as username',
          'Use the generated App Password'
        ],
        note: 'Yahoo requires App Passwords for SMTP when 2FA is enabled.'
      }
    },
    custom: {
      name: 'Custom SMTP',
      host: '',
      port: 587,
      secure: false,
      guide: {
        title: 'Custom SMTP Configuration',
        steps: [
          'Contact your email provider for SMTP settings',
          'Common ports: 587 (TLS), 465 (SSL), 25 (unencrypted)',
          'Use your full email address as username',
          'Use your email password or App Password'
        ],
        note: 'Check with your email provider for specific SMTP requirements.'
      }
    }
  }

  const getProviderConfig = (provider: string) => {
    const config = emailProviders[provider as keyof typeof emailProviders]
    return {
      host: config.host,
      port: config.port,
      secure: config.secure
    }
  }

  const handleProviderSelect = (provider: string) => {
    const config = getProviderConfig(provider)
    setSmtpConfig(prev => ({
      ...prev,
      ...config
    }))
    setSelectedProvider(provider)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Configure your email account for sending email campaigns
        </p>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-600" />
          Current Status
        </h3>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span className="text-sm text-gray-600">Email account not configured</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          After configuring your email, your sent emails will appear to come from your email address
        </p>
      </div>

      {/* Email Provider Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Email Provider</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(emailProviders).map(([key, provider]) => (
            <button
              key={key}
              onClick={() => handleProviderSelect(key)}
              className={`p-4 border-2 rounded-lg transition-colors text-center ${
                selectedProvider === key 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-500'
              }`}
            >
              <div className="text-2xl mb-2">📧</div>
              <div className="text-sm font-medium text-gray-900">{provider.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* SMTP Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SMTP Configuration</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Server
              </label>
              <input
                type="text"
                value={smtpConfig.host}
                onChange={(e) => handleInputChange('host', e.target.value)}
                placeholder="smtp.gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Port
              </label>
              <input
                type="number"
                value={smtpConfig.port}
                onChange={(e) => handleInputChange('port', parseInt(e.target.value))}
                placeholder="587"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={smtpConfig.user}
              onChange={(e) => handleInputChange('user', e.target.value)}
              placeholder="your-email@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              App Password / Email Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={smtpConfig.pass}
                onChange={(e) => handleInputChange('pass', e.target.value)}
                placeholder="Enter app password or email password"
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
            <p className="text-xs text-gray-500 mt-2">
              Gmail users should use App Passwords, not your regular login password
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="secure"
              checked={smtpConfig.secure}
              onChange={(e) => handleInputChange('secure', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="secure" className="ml-2 text-sm text-gray-700">
              Use SSL/TLS encrypted connection
            </label>
          </div>
        </div>
      </div>

      {/* Test Result */}
      {testResult && (
        <div className={`rounded-xl border p-4 ${
          testResult.success 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center space-x-3">
            {testResult.success ? (
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            ) : (
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            )}
            <span className={`text-sm font-medium ${
              testResult.success ? 'text-green-800' : 'text-red-800'
            }`}>
              {testResult.message}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleTestConnection}
          disabled={isTesting || !smtpConfig.host || !smtpConfig.user || !smtpConfig.pass}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
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

        <button
          onClick={handleSaveConfig}
          disabled={isSaving || !smtpConfig.host || !smtpConfig.user || !smtpConfig.pass}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Saving...</span>
            </>
          ) : (
            <span>Save Configuration</span>
          )}
        </button>
      </div>

      {/* Provider Guides */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <button
          onClick={() => setShowGuides(!showGuides)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <InformationCircleIcon className="h-5 w-5 mr-2 text-blue-600" />
            Email Provider Setup Guides
          </h3>
          {showGuides ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
        
        {showGuides && (
          <div className="mt-6 space-y-6">
            {Object.entries(emailProviders).map(([key, provider]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">{provider.guide.title}</h4>
                <div className="space-y-2">
                  <div>
                    <strong className="text-sm text-gray-700">Steps:</strong>
                    <ol className="list-decimal list-inside mt-1 space-y-1 text-sm text-gray-600">
                      {provider.guide.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> {provider.guide.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

