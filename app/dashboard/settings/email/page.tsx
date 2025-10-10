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
  ClipboardDocumentIcon
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

  const emailProviders = [
    {
      id: 'gmail',
      name: 'Gmail',
      host: 'smtp.gmail.com',
      port: '587',
      secure: true,
      instructions: '使用 Gmail 应用密码发送邮件',
      description: '推荐使用 Gmail，配置简单且稳定',
      tutorial: {
        title: 'Gmail SMTP 配置教程',
        steps: [
          '登录您的 Gmail 账户',
          '进入 Google 账户设置 (https://myaccount.google.com)',
          '点击"安全性"选项卡',
          '启用两步验证（如果尚未启用）',
          '在"应用密码"部分生成新密码',
          '选择"邮件"作为应用类型',
          '复制生成的应用密码',
          '在此处输入您的 Gmail 地址和应用密码',
          'SMTP 服务器：smtp.gmail.com',
          '端口：587（TLS）'
        ]
      }
    },
    {
      id: 'outlook',
      name: 'Outlook/Hotmail',
      host: 'smtp-mail.outlook.com',
      port: '587',
      secure: true,
      instructions: '使用您的 Outlook 密码',
      description: '使用您的 Microsoft 账户密码',
      tutorial: {
        title: 'Outlook 配置教程',
        steps: [
          '确保您的 Microsoft 账户已启用两步验证',
          '访问 Microsoft 账户安全设置',
          '生成应用密码',
          '使用应用密码而非账户密码'
        ]
      }
    },
    {
      id: 'yahoo',
      name: 'Yahoo Mail',
      host: 'smtp.mail.yahoo.com',
      port: '587',
      secure: true,
      instructions: '使用您的 Yahoo 应用密码',
      description: '需要生成 Yahoo 应用密码',
      tutorial: {
        title: 'Yahoo 配置教程',
        steps: [
          '登录 Yahoo 账户',
          '进入账户安全设置',
          '启用两步验证',
          '生成应用密码',
          '使用应用密码而非账户密码'
        ]
      }
    },
    {
      id: 'custom',
      name: 'Custom SMTP',
      host: '',
      port: '587',
      secure: true,
      instructions: '输入您的自定义 SMTP 设置',
      description: '适用于企业邮箱或其他邮件服务商',
      tutorial: {
        title: '自定义 SMTP 配置教程',
        steps: [
          '联系您的邮件服务商获取 SMTP 设置',
          '确认 SMTP 服务器地址和端口',
          '确认是否需要 SSL/TLS 加密',
          '获取邮箱用户名和密码',
          '测试连接确保设置正确'
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
      toast.error('请输入邮箱地址')
      return
    }

    if (!emailConfig.password) {
      toast.error('请输入邮箱密码或应用密码')
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
        toast.success('SMTP 配置已保存')
        router.push('/dashboard')
      } else {
        toast.error(result.error || '保存失败')
      }
    } catch (error) {
      toast.error('保存失败，请重试')
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
            <h1 className="text-2xl font-bold text-gray-900">邮箱配置</h1>
            <p className="mt-1 text-sm text-gray-600">
              配置您的邮箱账户以发送营销邮件
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowTutorial(!showTutorial)}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <QuestionMarkCircleIcon className="h-4 w-4" />
          <span>{showTutorial ? '隐藏教程' : '查看教程'}</span>
        </button>
      </div>

      {/* Why Configure Email Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <InformationCircleIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              为什么需要配置邮箱？
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                NovaMail 需要您的邮箱账户来发送营销邮件。配置邮箱后，您可以：
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>发送 AI 生成的营销邮件</li>
                <li>管理邮件活动</li>
                <li>跟踪邮件发送效果</li>
                <li>确保邮件送达率</li>
              </ul>
              <p className="mt-3 font-medium">
                我们支持 Gmail、Outlook、Yahoo 等主流邮箱服务商，推荐使用 Gmail SMTP 配置获得最佳体验。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Section */}
      {showTutorial && selectedProvider && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white border border-gray-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <QuestionMarkCircleIcon className="h-5 w-5 mr-2 text-blue-600" />
              {selectedProvider.tutorial.title}
            </h3>
            <button
              onClick={() => setShowTutorial(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            {selectedProvider.tutorial.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700">{step}</p>
              </div>
            ))}
          </div>

           {selectedProvider.id === 'gmail' && (
             <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
               <div className="flex items-start space-x-3">
                 <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                 <div>
                   <h4 className="text-sm font-medium text-yellow-800 mb-1">重要提示</h4>
                   <p className="text-sm text-yellow-700">
                     使用 Gmail SMTP 配置比 API 更简单，无需复杂的 OAuth 配置。
                     SMTP 服务器：smtp.gmail.com，端口：587（TLS）。
                     应用密码有效期为永久，除非您主动撤销。
                   </p>
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
          邮箱服务商
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
                    推荐
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
              电子邮件地址
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
                SMTP 服务器
              </label>
              <input
                type="text"
                value={emailConfig.host}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, host: e.target.value }))}
                placeholder="smtp.gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                端口
              </label>
              <input
                type="text"
                value={emailConfig.port}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, port: e.target.value }))}
                placeholder="587"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              密码 / 应用密码
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={emailConfig.password}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, password: e.target.value }))}
                placeholder={
                  emailConfig.provider === 'gmail' 
                    ? '输入您的 Gmail 应用密码' 
                    : '输入您的邮箱密码或应用密码'
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
              <h4 className="text-sm font-medium text-gray-900">测试连接</h4>
              <p className="text-sm text-gray-600">验证您的邮件设置是否正常工作</p>
            </div>
            <button
              onClick={handleTestConnection}
              disabled={isTesting || !emailConfig.email || !emailConfig.password}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isTesting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>测试中...</span>
                </>
              ) : (
                <span>测试连接</span>
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
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>保存中...</span>
            </>
          ) : (
            <span>保存配置</span>
          )}
        </button>
      </div>
    </div>
  )
}
