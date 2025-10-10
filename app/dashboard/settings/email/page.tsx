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
  EyeSlashIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  ArrowTopRightOnSquareIcon,
  ClipboardDocumentIcon,
  PlayIcon,
  XMarkIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ShieldCheckIcon,
  KeyIcon
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
  const [showTutorial, setShowTutorial] = useState(false)
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)

  const emailProviders = [
    {
      id: 'gmail',
      name: 'Gmail',
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      secure: true,
      instructions: 'Use Gmail App Password to send emails',
      description: 'Recommended Gmail with simple and stable configuration',
      tutorial: {
        title: 'Gmail App Password Setup',
        steps: [
          {
            title: 'Enable 2-Step Verification',
            description: 'First, you need to enable 2-step verification on your Google account',
            details: [
              'Go to your Google Account settings',
              'Navigate to Security → 2-Step Verification',
              'Follow the setup process to enable 2-step verification',
              'This is required before you can generate app passwords'
            ],
            icon: ShieldCheckIcon
          },
          {
            title: 'Generate App Password',
            description: 'Create a dedicated app password for NovaMail',
            details: [
              'Go to Google Account → Security → App passwords',
              'Select "Mail" as the app type',
              'Select "Other" as the device and enter "NovaMail"',
              'Click "Generate" and copy the 16-character password',
              'Use this password (not your regular Gmail password) in NovaMail'
            ],
            icon: KeyIcon
          },
          {
            title: 'Configure SMTP Settings',
            description: 'Enter your Gmail details in NovaMail',
            details: [
              'Email: Your Gmail address (e.g., yourname@gmail.com)',
              'Password: The 16-character app password (not your login password)',
              'SMTP Server: smtp.gmail.com',
              'Port: 587 (TLS) or 465 (SSL)',
              'Security: Enable TLS/SSL encryption'
            ],
            icon: ComputerDesktopIcon
          }
        ]
      }
    },
    {
      id: 'outlook',
      name: 'Outlook/Hotmail',
      smtpHost: 'smtp-mail.outlook.com',
      smtpPort: '587',
      secure: true,
      instructions: 'Use your Outlook App Password',
      description: 'Microsoft email service with enterprise support',
      tutorial: {
        title: 'Outlook App Password Setup',
        steps: [
          {
            title: 'Enable 2-Step Verification',
            description: 'Enable two-step verification on your Microsoft account',
            details: [
              'Go to account.microsoft.com',
              'Navigate to Security → Advanced security options',
              'Turn on two-step verification',
              'Complete the verification process'
            ],
            icon: ShieldCheckIcon
          },
          {
            title: 'Create App Password',
            description: 'Generate an app password for NovaMail',
            details: [
              'Go to Security → Advanced security options',
              'Click "Create a new app password"',
              'Enter "NovaMail" as the app name',
              'Copy the generated password',
              'Use this password in NovaMail configuration'
            ],
            icon: KeyIcon
          },
          {
            title: 'Configure SMTP Settings',
            description: 'Set up Outlook SMTP in NovaMail',
            details: [
              'Email: Your Outlook/Hotmail address',
              'Password: The generated app password',
              'SMTP Server: smtp-mail.outlook.com',
              'Port: 587',
              'Security: Enable TLS encryption'
            ],
            icon: ComputerDesktopIcon
          }
        ]
      }
    },
    {
      id: 'yahoo',
      name: 'Yahoo Mail',
      smtpHost: 'smtp.mail.yahoo.com',
      smtpPort: '465',
      secure: true,
      instructions: 'Use Yahoo App Password',
      description: 'Yahoo email service with app password support',
      tutorial: {
        title: 'Yahoo App Password Setup',
        steps: [
          {
            title: 'Enable 2-Step Verification',
            description: 'Set up two-step verification on Yahoo',
            details: [
              'Go to Yahoo Account Security',
              'Navigate to Two-step verification',
              'Enable two-step verification',
              'Verify your phone number or email'
            ],
            icon: ShieldCheckIcon
          },
          {
            title: 'Generate App Password',
            description: 'Create an app password for NovaMail',
            details: [
              'Go to Account Security → App passwords',
              'Click "Generate app password"',
              'Enter "NovaMail" as the app name',
              'Copy the generated password',
              'Use this password in NovaMail'
            ],
            icon: KeyIcon
          },
          {
            title: 'Configure SMTP Settings',
            description: 'Configure Yahoo SMTP in NovaMail',
            details: [
              'Email: Your Yahoo email address',
              'Password: The generated app password',
              'SMTP Server: smtp.mail.yahoo.com',
              'Port: 465 (SSL) or 587 (TLS)',
              'Security: Enable SSL/TLS encryption'
            ],
            icon: ComputerDesktopIcon
          }
        ]
      }
    },
    {
      id: 'custom',
      name: 'Custom SMTP',
      smtpHost: '',
      smtpPort: '25',
      secure: false,
      instructions: 'Custom SMTP Server Configuration',
      description: 'Other email providers or enterprise email servers',
      tutorial: {
        title: 'Custom SMTP Configuration',
        steps: [
          {
            title: 'Get SMTP Details',
            description: 'Obtain SMTP settings from your email provider',
            details: [
              'Contact your email provider or IT department',
              'Ask for SMTP server details:',
              '• SMTP server address',
              '• Port number (usually 25, 587, or 465)',
              '• Security settings (TLS/SSL)',
              '• Authentication requirements'
            ],
            icon: InformationCircleIcon
          },
          {
            title: 'Check App Password Requirements',
            description: 'Determine if app passwords are needed',
            details: [
              'Many providers require app passwords for SMTP',
              'Check your provider\'s documentation',
              'Enable 2FA if required',
              'Generate app password if needed',
              'Use app password instead of login password'
            ],
            icon: KeyIcon
          },
          {
            title: 'Configure in NovaMail',
            description: 'Enter your custom SMTP settings',
            details: [
              'Email: Your email address',
              'Password: App password or SMTP password',
              'SMTP Server: Your provider\'s SMTP server',
              'Port: Your provider\'s SMTP port',
              'Security: Enable if your provider supports TLS/SSL'
            ],
            icon: ComputerDesktopIcon
          }
        ]
      }
    }
  ]

  const selectedProvider = emailProviders.find(p => p.id === emailConfig.provider)

  useEffect(() => {
    // Load saved email configuration
    loadEmailConfig()
  }, [])

  const loadEmailConfig = async () => {
    try {
      // 首先尝试从 localStorage 加载配置
      const userEmail = localStorage.getItem('user-email')
      if (userEmail) {
        const savedConfig = localStorage.getItem(`email_config_${userEmail}`)
        if (savedConfig) {
          const config = JSON.parse(savedConfig)
          setEmailConfig(config)
          setIsConfigured(config.isConfigured || false)
          return
        }
      }

      // 如果 localStorage 中没有，尝试从 API 加载
      const response = await fetch('/api/user/email-config')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.config) {
          setEmailConfig(data.config)
          setIsConfigured(data.config.isConfigured || false)
          // 同时保存到 localStorage
          if (userEmail) {
            localStorage.setItem(`email_config_${userEmail}`, JSON.stringify(data.config))
          }
        }
      }
    } catch (error) {
      console.error('Failed to load email config:', error)
      // 网络错误时不显示错误提示，使用默认配置
    }
  }

  const handleProviderChange = (providerId: string) => {
    const provider = emailProviders.find(p => p.id === providerId)
    if (provider) {
      setEmailConfig(prev => ({
        ...prev,
        provider: providerId,
        smtpHost: provider.smtpHost,
        smtpPort: provider.smtpPort,
        isSecure: provider.secure
      }))
    }
  }

  const handleTestConnection = async () => {
    if (!emailConfig.email || !emailConfig.password) {
      toast.error('Please enter your email address and password')
      return
    }

    setIsTesting(true)
    setTestResult(null)

    try {
      // 使用 Workers 后端进行 SMTP 连接测试
      const response = await fetch('/api/user/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: emailConfig.provider,
          email: emailConfig.email,
          password: emailConfig.password,
          smtpHost: emailConfig.smtpHost,
          smtpPort: emailConfig.smtpPort,
          isSecure: emailConfig.isSecure
        }),
      })

      const result = await response.json()
      setTestResult(result)

      if (result.success) {
        toast.success('SMTP connection test successful!')
      } else {
        toast.error(result.error || 'SMTP connection test failed')
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Network error, please try again'
      })
      toast.error('Network error, please try again')
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

    if (!emailConfig.password) {
      toast.error('Please enter your email password or app password')
      return
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
        // 保存到 localStorage
        const userEmail = localStorage.getItem('user-email')
        if (userEmail) {
          const configToSave = {
            ...emailConfig,
            isConfigured: true
          }
          localStorage.setItem(`email_config_${userEmail}`, JSON.stringify(configToSave))
          
          // 触发 storage 事件，通知其他页面更新
          window.dispatchEvent(new StorageEvent('storage', {
            key: `email_config_${userEmail}`,
            newValue: JSON.stringify(configToSave),
            storageArea: localStorage
          }))
        }
        
        toast.success('SMTP configuration saved successfully')
        setIsConfigured(true)
        // 延迟跳转，让用户看到成功状态
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        toast.error(result.error || 'Save failed')
      }
    } catch (error) {
      toast.error('Save failed, please try again')
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
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">Email Configuration</h1>
              {isConfigured && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>Configured</span>
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {isConfigured 
                ? 'Your email is configured and ready to send marketing emails'
                : 'Configure your email account to send marketing emails'
              }
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowTutorial(!showTutorial)}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <QuestionMarkCircleIcon className="h-4 w-4" />
          <span>{showTutorial ? 'Hide Tutorial' : 'View Tutorial'}</span>
        </button>
      </div>

      {/* Status Section */}
      {isConfigured ? (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Email Configuration Complete
              </h3>
              <div className="text-sm text-green-800 space-y-2">
                <p>
                  Your email is successfully configured and ready to send marketing emails. You can now:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Create and send email campaigns</li>
                  <li>Import and manage contacts</li>
                  <li>Track email performance</li>
                  <li>Use AI-powered email generation</li>
                </ul>
                <p className="mt-3 font-medium">
                  Your SMTP settings are secure and ready to use. You can always come back here to update your configuration.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Why configure email?
              </h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p>
                  NovaMail needs your email account to send marketing emails. After configuring your email, you can:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Send AI-generated marketing emails</li>
                  <li>Manage email campaigns</li>
                  <li>Track email sending performance</li>
                  <li>Ensure email deliverability</li>
                </ul>
                <p className="mt-3 font-medium">
                  We support mainstream email providers like Gmail, Outlook, Yahoo, and recommend using Gmail SMTP configuration for the best experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* App Password Explanation Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <QuestionMarkCircleIcon className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              What is an App Password? Why is it needed?
            </h3>
            <div className="text-sm text-green-800 space-y-3">
              <div>
                <h4 className="font-medium mb-1">🔐 Purpose of App Password:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Specifically for third-party applications (like NovaMail) to access your email</li>
                  <li>More secure than login password, can be revoked separately</li>
                  <li>Will not affect your normal email login</li>
                  <li>Valid permanently, unless you actively delete it</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">⚠️ Why login password cannot be used:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Modern email providers (Gmail, Outlook, Yahoo) for security reasons</li>
                  <li>Prevent third-party applications from obtaining your full account permissions</li>
                  <li>Even if app password is leaked, it will not affect your email security</li>
                  <li>Complies with industry security standards and best practices</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">📱 How to generate App Password:</h4>
                <p>The operation for each email provider is slightly different, please refer to the detailed tutorial above. The basic steps are: Enable two-step verification → Generate app password → Copy and use the password.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tutorial Section */}
      {showTutorial && selectedProvider && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white border border-gray-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <PlayIcon className="h-5 w-5 mr-2 text-blue-600" />
              {selectedProvider.tutorial.title}
            </h3>
            <button
              onClick={() => setShowTutorial(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            {selectedProvider.tutorial.steps.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <button
                  onClick={() => setExpandedProvider(expandedProvider === `${selectedProvider.id}-${index}` ? null : `${selectedProvider.id}-${index}`)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  {expandedProvider === `${selectedProvider.id}-${index}` ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                
                {expandedProvider === `${selectedProvider.id}-${index}` && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pl-11"
                  >
                    <div className="flex items-start space-x-3">
                      <step.icon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

           {(selectedProvider.id === 'gmail' || selectedProvider.id === 'outlook' || selectedProvider.id === 'yahoo') && (
             <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
               <div className="flex items-start space-x-3">
                 <ExclamationTriangleIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                 <div>
                   <h4 className="text-sm font-medium text-red-800 mb-1">⚠️ Important: Cannot use login password</h4>
                   <div className="text-sm text-red-700 space-y-2">
                     <p><strong>{selectedProvider.name} must use app password, not login password!</strong></p>
                     {selectedProvider.id === 'gmail' && (
                       <>
                         <p>1. Visit <a href="https://myaccount.google.com" target="_blank" className="underline">Google Account Settings</a></p>
                         <p>2. Enable two-step verification</p>
                         <p>3. Generate app password (select "Mail")</p>
                         <p>4. Use the generated 16-character app password</p>
                         <p className="text-xs text-red-600">App password format: abcd efgh ijkl mnop</p>
                       </>
                     )}
                     {selectedProvider.id === 'outlook' && (
                       <>
                         <p>1. Visit <a href="https://account.microsoft.com" target="_blank" className="underline">Microsoft Account Settings</a></p>
                         <p>2. Enable two-step verification</p>
                         <p>3. Generate app password (select "Mail")</p>
                         <p>4. Use the generated 16-character app password</p>
                         <p className="text-xs text-red-600">App password format: abcd efgh ijkl mnop</p>
                       </>
                     )}
                     {selectedProvider.id === 'yahoo' && (
                       <>
                         <p>1. Visit <a href="https://mail.yahoo.com" target="_blank" className="underline">Yahoo Account Settings</a></p>
                         <p>2. Enable two-step verification</p>
                         <p>3. Generate app password (select "Other app")</p>
                         <p>4. Use the generated 16-character app password</p>
                         <p className="text-xs text-red-600">App password format: abcd efgh ijkl mnop</p>
                       </>
                     )}
                   </div>
                 </div>
               </div>
             </div>
           )}
        </motion.div>
      )}

      {/* Email Provider Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-600" />
          Email Providers
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
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-gray-900">{provider.name}</div>
                {provider.id === 'gmail' && (
                  <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                    Recommended
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600 mb-1">{provider.instructions}</div>
              <div className="text-xs text-gray-500">{provider.description}</div>
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


          {/* SMTP Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Server
              </label>
              <input
                type="text"
                value={emailConfig.smtpHost}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpHost: e.target.value }))}
                placeholder="smtp.gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Port
              </label>
              <input
                type="text"
                value={emailConfig.smtpPort}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpPort: e.target.value }))}
                placeholder="587 (TLS), 465 (SSL), 25 (无加密)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password / App Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={emailConfig.password}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, password: e.target.value }))}
                placeholder={
                  emailConfig.provider === 'gmail' 
                    ? 'Enter Gmail app password (not login password)' 
                    : emailConfig.provider === 'outlook'
                    ? 'Enter Outlook app password (not login password)'
                    : emailConfig.provider === 'yahoo'
                    ? 'Enter Yahoo app password (not login password)'
                    : emailConfig.provider === 'custom'
                    ? 'Enter app password (if 2FA is enabled)'
                    : 'Enter your email password or app password'
                }
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

        </div>

        {/* Test Connection */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Test Connection</h4>
              <p className="text-sm text-gray-600">Test your SMTP connection in real-time</p>
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

          {/* Notice */}
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <InformationCircleIcon className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-700">
                <p className="font-medium mb-1">Note:</p>
                <p>This test will connect to your SMTP server in real-time and send a test email. Actual email sending will use your configured SMTP server.</p>
              </div>
            </div>
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
                  {testResult.success ? '连接成功' : '连接失败'}
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
          className={`px-6 py-3 text-white rounded-lg disabled:cursor-not-allowed transition-colors flex items-center space-x-2 ${
            isConfigured 
              ? 'bg-green-600 hover:bg-green-700 disabled:bg-gray-400' 
              : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              {isConfigured ? (
                <>
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>Update Configuration</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
