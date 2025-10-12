'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface UserSettings {
  name: string
  email: string
  company: string
}

interface EmailConfig {
  provider: string
  email: string
  smtpHost: string
  smtpPort: string
  isSecure: boolean
  isConfigured: boolean
}

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<UserSettings>({
    name: '',
    email: '',
    company: ''
  })
  const [emailConfig, setEmailConfig] = useState<EmailConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
    
    // 监听邮件配置变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith('email_config_')) {
        fetchSettings()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      // 从localStorage获取用户信息
      const userData = localStorage.getItem('user-data')
      if (userData) {
        const user = JSON.parse(userData)
        setSettings({
          name: user.name || '',
          email: user.email || '',
          company: user.company || ''
        })
      }

      // 从localStorage获取邮件配置
      const userEmail = localStorage.getItem('user-email')
      if (userEmail) {
        const savedConfig = localStorage.getItem(`email_config_${userEmail}`)
        if (savedConfig) {
          const config = JSON.parse(savedConfig)
          setEmailConfig({
            provider: config.provider || 'gmail',
            email: config.email || '',
            smtpHost: config.smtpHost || '',
            smtpPort: config.smtpPort || '',
            isSecure: config.isSecure || false,
            isConfigured: config.isConfigured || false
          })
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      // 验证必填字段
      if (!settings.name.trim() || !settings.email.trim()) {
        toast.error('Name and email are required')
        return
      }

      // 验证邮箱格式
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegex.test(settings.email)) {
        toast.error('Please enter a valid email address')
        return
      }

      // 更新localStorage中的用户数据
      const userData = localStorage.getItem('user-data')
      if (userData) {
        const user = JSON.parse(userData)
        const updatedUser = {
          ...user,
          name: settings.name.trim(),
          email: settings.email.toLowerCase().trim(),
          company: settings.company.trim()
        }
        localStorage.setItem('user-data', JSON.stringify(updatedUser))
      }

      toast.success('Settings saved successfully!')
    } catch (error) {
      console.error('Failed to save settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account information</p>
      </div>
              <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
              </button>
        </div>

          {/* Profile Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
              value={settings.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
                    />
                  </div>
          
                  <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
              value={settings.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
                    />
                  </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
              value={settings.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Enter your company name (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

      {/* Email Configuration */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
                    <div>
            <h2 className="text-lg font-semibold text-gray-900">Email Configuration</h2>
            <p className="text-gray-600">Configure your email sending settings</p>
                    </div>
                    <button
            onClick={() => router.push('/dashboard/settings/email')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {emailConfig?.isConfigured ? 'Update Configuration' : 'Configure Email'}
                  </button>
                </div>
        
        {emailConfig?.isConfigured ? (
                <div className="space-y-4">
            {/* 配置状态 */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">Email Configuration Active</span>
              </div>

            {/* 配置详情 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                  <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Provider</label>
                  <p className="text-sm text-gray-900 capitalize">{emailConfig.provider}</p>
                </div>
                    <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Email Address</label>
                  <p className="text-sm text-gray-900">{emailConfig.email}</p>
                </div>
              </div>
              <div className="space-y-3">
                    <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">SMTP Server</label>
                  <p className="text-sm text-gray-900">{emailConfig.smtpHost}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Port</label>
                  <p className="text-sm text-gray-900">{emailConfig.smtpPort} ({emailConfig.isSecure ? 'TLS/SSL' : 'Unencrypted'})</p>
                </div>
                </div>
              </div>

            {/* 操作说明 */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Ready to send emails!</strong> Your SMTP configuration is active and ready to use for sending marketing emails.
                    </p>
                  </div>
                </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Set up your SMTP configuration to send emails from your own domain and email address.
            </p>
              </div>
          )}
      </div>
    </div>
  )
}
