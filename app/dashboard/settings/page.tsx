'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface UserSettings {
  name: string
  email: string
  company: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    name: '',
    email: '',
    company: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      // 从localStorage获取用户信息
      const userName = localStorage.getItem('user-name')
      const userEmail = localStorage.getItem('user-email')
      const userCompany = localStorage.getItem('user-company')
      
      setSettings({
        name: userName || '',
        email: userEmail || '',
        company: userCompany || ''
      })
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
      localStorage.setItem('user-name', settings.name.trim())
      localStorage.setItem('user-email', settings.email.toLowerCase().trim())
      localStorage.setItem('user-company', settings.company.trim())

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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Email Generation</h3>
              <p className="text-sm text-gray-600">AI-powered email content generation</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">Active</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Professional Templates</h3>
              <p className="text-sm text-gray-600">Rich HTML email templates</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">Available</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Email History</h3>
              <p className="text-sm text-gray-600">Track your generated emails</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">Enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Membership Status</h2>
        
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div>
            <h3 className="text-sm font-medium text-blue-900">Current Plan</h3>
            <p className="text-sm text-blue-700">Access to all email generation features</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-800">Active</span>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            You have access to all email generation features including professional templates, 
            AI-powered content generation, and email history tracking.
          </p>
        </div>
      </div>
    </div>
  )
}