'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import {
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon
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

  const handleInputChange = (field: keyof SMTPConfig, value: string | number | boolean) => {
    setSmtpConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleTestConnection = async () => {
    if (!smtpConfig.host || !smtpConfig.user || !smtpConfig.pass) {
      toast.error('请填写完整的SMTP配置信息')
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
          message: '邮箱配置测试成功！'
        })
        toast.success('邮箱配置测试成功！')
      } else {
        setTestResult({
          success: false,
          message: result.error || '邮箱配置测试失败'
        })
        toast.error(result.error || '邮箱配置测试失败')
      }
    } catch (error) {
      console.error('Test connection error:', error)
      setTestResult({
        success: false,
        message: '网络错误，请稍后重试'
      })
      toast.error('网络错误，请稍后重试')
    } finally {
      setIsTesting(false)
    }
  }

  const handleSaveConfig = async () => {
    if (!smtpConfig.host || !smtpConfig.user || !smtpConfig.pass) {
      toast.error('请填写完整的SMTP配置信息')
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
        toast.success('邮箱配置保存成功！')
      } else {
        toast.error(result.error || '保存失败')
      }
    } catch (error) {
      console.error('Save config error:', error)
      toast.error('保存失败，请稍后重试')
    } finally {
      setIsSaving(false)
    }
  }

  const getProviderConfig = (provider: string) => {
    const configs = {
      gmail: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false
      },
      outlook: {
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false
      },
      yahoo: {
        host: 'smtp.mail.yahoo.com',
        port: 587,
        secure: false
      },
      custom: {
        host: '',
        port: 587,
        secure: false
      }
    }
    return configs[provider as keyof typeof configs] || configs.custom
  }

  const handleProviderSelect = (provider: string) => {
    const config = getProviderConfig(provider)
    setSmtpConfig(prev => ({
      ...prev,
      ...config
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">邮箱设置</h1>
        <p className="mt-1 text-sm text-gray-600">
          配置您的邮箱账户，用于发送邮件活动
        </p>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-600" />
          当前状态
        </h3>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span className="text-sm text-gray-600">未配置邮箱账户</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          配置邮箱后，您发送的邮件将显示为来自您的邮箱地址
        </p>
      </div>

      {/* Email Provider Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">选择邮箱服务商</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'gmail', name: 'Gmail', icon: '📧' },
            { id: 'outlook', name: 'Outlook', icon: '📮' },
            { id: 'yahoo', name: 'Yahoo', icon: '📬' },
            { id: 'custom', name: '自定义', icon: '⚙️' }
          ].map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleProviderSelect(provider.id)}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors text-center"
            >
              <div className="text-2xl mb-2">{provider.icon}</div>
              <div className="text-sm font-medium text-gray-900">{provider.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* SMTP Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SMTP 配置</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP 服务器
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
                端口
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
              邮箱地址
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
              应用密码
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={smtpConfig.pass}
                onChange={(e) => handleInputChange('pass', e.target.value)}
                placeholder="输入应用密码或邮箱密码"
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
              Gmail 用户请使用应用专用密码，不是您的登录密码
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
              使用 SSL/TLS 加密连接
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
              <span>测试中...</span>
            </>
          ) : (
            <span>测试连接</span>
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
              <span>保存中...</span>
            </>
          ) : (
            <span>保存配置</span>
          )}
        </button>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <h4 className="text-sm font-medium text-blue-900 mb-3">配置帮助</h4>
        <div className="space-y-3 text-sm text-blue-800">
          <div>
            <strong>Gmail:</strong>
            <ul className="list-disc list-inside mt-1 ml-2">
              <li>启用两步验证</li>
              <li>生成应用专用密码</li>
              <li>使用应用密码而不是登录密码</li>
            </ul>
          </div>
          <div>
            <strong>Outlook:</strong>
            <ul className="list-disc list-inside mt-1 ml-2">
              <li>使用您的邮箱地址和密码</li>
              <li>确保启用了SMTP访问</li>
            </ul>
          </div>
          <div>
            <strong>自定义SMTP:</strong>
            <ul className="list-disc list-inside mt-1 ml-2">
              <li>联系您的邮件服务提供商获取SMTP设置</li>
              <li>确保端口和加密设置正确</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

