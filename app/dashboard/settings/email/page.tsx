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
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
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
          '端口：587（TLS）或 465（SSL）'
        ]
      }
    },
    {
      id: 'outlook',
      name: 'Outlook/Hotmail',
      smtpHost: 'smtp-mail.outlook.com',
      smtpPort: '587',
      secure: true,
      instructions: '使用您的 Outlook 应用密码',
      description: '需要生成 Microsoft 应用密码',
      tutorial: {
        title: 'Outlook 配置教程',
        steps: [
          '确保您的 Microsoft 账户已启用两步验证',
          '访问 Microsoft 账户安全设置',
          '生成应用密码',
          '使用应用密码而非账户密码',
          'SMTP 服务器：smtp-mail.outlook.com',
          '端口：587（TLS）'
        ]
      }
    },
    {
      id: 'yahoo',
      name: 'Yahoo Mail',
      smtpHost: 'smtp.mail.yahoo.com',
      smtpPort: '465',
      secure: true,
      instructions: '使用您的 Yahoo 应用密码',
      description: '需要生成 Yahoo 应用密码',
      tutorial: {
        title: 'Yahoo 配置教程',
        steps: [
          '1. 访问：https://mail.yahoo.com',
          '2. 登录您的 Yahoo 账户',
          '3. 点击右上角头像，选择"账户信息"',
          '4. 进入"账户安全"',
          '5. 启用两步验证（如果尚未启用）',
          '6. 点击"生成应用密码"',
          '7. 选择"其他应用"并输入名称（如 NovaMail）',
          '8. 复制生成的 16 位应用密码',
          '9. 在此处输入您的 Yahoo 邮箱地址和应用密码',
          'SMTP 服务器：smtp.mail.yahoo.com',
          '端口：465（SSL）或 587（TLS）'
        ]
      }
    },
    {
      id: 'custom',
      name: 'Custom SMTP',
      smtpHost: '',
      smtpPort: '25',
      secure: false,
      instructions: '使用您的邮箱应用密码',
      description: '适用于企业邮箱或其他邮件服务商，通常需要应用密码',
      tutorial: {
        title: '自定义 SMTP 配置教程',
        steps: [
          '1. 联系您的邮件服务商获取 SMTP 设置',
          '2. 确认 SMTP 服务器地址和端口',
          '3. 确认是否需要 SSL/TLS 加密',
          '4. 检查是否启用了两步验证',
          '5. 如果启用了两步验证，需要生成应用密码',
          '6. 获取邮箱用户名和应用密码（非登录密码）',
          '7. 在此处输入完整的 SMTP 配置信息',
          '8. 测试连接确保设置正确',
          '常见端口：25（无加密）、587（TLS）、465（SSL）'
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
        smtpHost: provider.smtpHost,
        smtpPort: provider.smtpPort,
        isSecure: provider.secure
      }))
    }
  }

  const handleTestConnection = async () => {
    if (!emailConfig.email || !emailConfig.password) {
      toast.error('请输入邮箱地址和密码')
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
        toast.success('SMTP 连接测试成功！')
      } else {
        toast.error(result.error || 'SMTP 连接测试失败')
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: '网络错误，请重试'
      })
      toast.error('网络错误，请重试')
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

      {/* App Password Explanation Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <QuestionMarkCircleIcon className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              什么是应用密码？为什么需要它？
            </h3>
            <div className="text-sm text-green-800 space-y-3">
              <div>
                <h4 className="font-medium mb-1">🔐 应用密码的作用：</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>专门用于第三方应用（如 NovaMail）访问您的邮箱</li>
                  <li>比登录密码更安全，可以单独撤销</li>
                  <li>不会影响您的正常邮箱登录</li>
                  <li>有效期为永久，除非您主动删除</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">⚠️ 为什么不能使用登录密码：</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>现代邮箱服务商（Gmail、Outlook、Yahoo）出于安全考虑</li>
                  <li>防止第三方应用获取您的完整账户权限</li>
                  <li>即使应用密码泄露，也不会影响您的邮箱安全</li>
                  <li>符合行业安全标准和最佳实践</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">📱 如何生成应用密码：</h4>
                <p>每个邮箱服务商的操作略有不同，请参考上方的详细教程。基本步骤都是：启用两步验证 → 生成应用密码 → 复制密码使用。</p>
              </div>
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

           {(selectedProvider.id === 'gmail' || selectedProvider.id === 'outlook' || selectedProvider.id === 'yahoo') && (
             <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
               <div className="flex items-start space-x-3">
                 <ExclamationTriangleIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                 <div>
                   <h4 className="text-sm font-medium text-red-800 mb-1">⚠️ 重要：不能使用登录密码</h4>
                   <div className="text-sm text-red-700 space-y-2">
                     <p><strong>{selectedProvider.name} 必须使用应用密码，不能使用登录密码！</strong></p>
                     {selectedProvider.id === 'gmail' && (
                       <>
                         <p>1. 访问 <a href="https://myaccount.google.com" target="_blank" className="underline">Google 账户设置</a></p>
                         <p>2. 启用两步验证</p>
                         <p>3. 生成应用密码（选择"邮件"）</p>
                         <p>4. 使用生成的 16 位应用密码</p>
                         <p className="text-xs text-red-600">应用密码格式：abcd efgh ijkl mnop</p>
                       </>
                     )}
                     {selectedProvider.id === 'outlook' && (
                       <>
                         <p>1. 访问 <a href="https://account.microsoft.com" target="_blank" className="underline">Microsoft 账户设置</a></p>
                         <p>2. 启用两步验证</p>
                         <p>3. 生成应用密码（选择"邮件"）</p>
                         <p>4. 使用生成的 16 位应用密码</p>
                         <p className="text-xs text-red-600">应用密码格式：abcd efgh ijkl mnop</p>
                       </>
                     )}
                     {selectedProvider.id === 'yahoo' && (
                       <>
                         <p>1. 访问 <a href="https://mail.yahoo.com" target="_blank" className="underline">Yahoo 账户设置</a></p>
                         <p>2. 启用两步验证</p>
                         <p>3. 生成应用密码（选择"其他应用"）</p>
                         <p>4. 使用生成的 16 位应用密码</p>
                         <p className="text-xs text-red-600">应用密码格式：abcd efgh ijkl mnop</p>
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
                value={emailConfig.smtpHost}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpHost: e.target.value }))}
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
              密码 / 应用密码
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={emailConfig.password}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, password: e.target.value }))}
                placeholder={
                  emailConfig.provider === 'gmail' 
                    ? '输入 Gmail 应用密码（不是登录密码）' 
                    : emailConfig.provider === 'outlook'
                    ? '输入 Outlook 应用密码（不是登录密码）'
                    : emailConfig.provider === 'yahoo'
                    ? '输入 Yahoo 应用密码（不是登录密码）'
                    : emailConfig.provider === 'custom'
                    ? '输入应用密码（如果启用了两步验证）'
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
              <p className="text-sm text-gray-600">真实测试您的 SMTP 连接</p>
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

          {/* Notice */}
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <InformationCircleIcon className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-700">
                <p className="font-medium mb-1">注意：</p>
                <p>此测试会真实连接到您的 SMTP 服务器并发送测试邮件。实际发送邮件时会使用您配置的 SMTP 服务器。</p>
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
