'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface UserSettings {
  name: string
  email: string
  company: string
}

interface CreditsData {
  remainingCredits: number
  totalCredits: number
  subscriptionType: 'free' | 'premium'
  aiAccess: boolean
  emailsSent: number
  lastResetDate: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('usage')
  const [settings, setSettings] = useState<UserSettings>({
    name: '',
    email: '',
    company: ''
  })
  const [credits, setCredits] = useState<CreditsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
    fetchCreditsData()
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

  const fetchCreditsData = async () => {
    try {
      const response = await fetch('/api/credits?userId=default_user')
      if (response.ok) {
        const data = await response.json()
        setCredits({
          remainingCredits: data.remainingCredits,
          totalCredits: data.totalCredits,
          subscriptionType: data.subscriptionType,
          aiAccess: data.aiAccess,
          emailsSent: Math.floor((data.totalCredits - data.remainingCredits) / 5),
          lastResetDate: new Date().toISOString()
        })
      } else {
        setCredits({
          remainingCredits: 50,
          totalCredits: 50,
          subscriptionType: 'free',
          aiAccess: false,
          emailsSent: 0,
          lastResetDate: new Date().toISOString()
        })
      }
    } catch (error) {
      console.error('Failed to fetch credits data:', error)
      setCredits({
        remainingCredits: 50,
        totalCredits: 50,
        subscriptionType: 'free',
        aiAccess: false,
        emailsSent: 0,
        lastResetDate: new Date().toISOString()
      })
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

  const tabs = [
    { id: 'usage', name: 'Usage' },
    { id: 'billing', name: 'Billing' },
    { id: 'smtp', name: 'SMTP' },
    { id: 'integrations', name: 'Integrations' },
    { id: 'unsubscribe', name: 'Unsubscribe Page' },
    { id: 'documents', name: 'Documents' }
  ]

  const getUsagePercentage = (used: number, total: number) => {
    if (total === 0) return 0
    return Math.round((used / total) * 100)
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-500'
    if (percentage >= 70) return 'text-yellow-500'
    return 'text-green-500'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          </div>
          
          {/* Navigation Tabs */}
          <div className="border-t border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'usage' && (
          <div className="space-y-8">
            {/* Transactional Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Transactional</h3>
                  <p className="text-sm text-gray-600">Integrate email into your app using the Resend API or SMTP interface.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">Free</span>
                  <button 
                    onClick={() => router.push('/pricing')}
                    className="px-3 py-1 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Monthly Limit</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {credits?.emailsSent || 0} / {credits?.subscriptionType === 'premium' ? '∞' : '10'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Daily Limit</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {Math.min(credits?.emailsSent || 0, 2)} / {credits?.subscriptionType === 'premium' ? '∞' : '2'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Marketing</h3>
                  <p className="text-sm text-gray-600">Design and send marketing emails using Broadcasts and Audiences.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">Free</span>
                  <button 
                    onClick={() => router.push('/pricing')}
                    className="px-3 py-1 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Contacts Limit</p>
                    <p className="text-lg font-semibold text-gray-900">0 / 100</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Audiences Limit</p>
                    <p className="text-lg font-semibold text-gray-900">1 / 1</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Broadcasts Limit</p>
                    <p className="text-lg font-semibold text-gray-900">unlimited</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Team</h3>
                  <p className="text-sm text-gray-600">Understand the quotas and limits for your team.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">Free</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Domains</p>
                    <p className="text-lg font-semibold text-gray-900">1 / 1</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Rate Limit</p>
                    <p className="text-lg font-semibold text-gray-900">2 req/s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
                  <p className="text-gray-600">Your active subscription and credit details</p>
                </div>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  credits?.subscriptionType === 'premium' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {credits?.subscriptionType.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">Plan</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {credits?.subscriptionType === 'premium' ? 'Premium' : 'Free'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {credits?.subscriptionType === 'premium' ? '$19/month' : 'Free plan'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Credits Remaining</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {credits?.subscriptionType === 'premium' ? '∞' : credits?.remainingCredits}
                  </p>
                  <p className="text-sm text-gray-500">
                    {credits?.subscriptionType === 'premium' ? 'Unlimited' : `${credits?.remainingCredits} credits left`}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                  <p className="text-2xl font-bold text-gray-900">{credits?.emailsSent}</p>
                  <p className="text-sm text-gray-500">5 credits per email</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Assistant</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {credits?.aiAccess ? '✓' : '✗'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {credits?.aiAccess ? 'Available' : 'Premium only'}
                  </p>
                </div>
              </div>

              {credits?.subscriptionType === 'free' && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Credits Usage</span>
                    <span>{getUsagePercentage((credits?.totalCredits || 0) - (credits?.remainingCredits || 0), credits?.totalCredits || 0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getUsageColor(getUsagePercentage((credits?.totalCredits || 0) - (credits?.remainingCredits || 0), credits?.totalCredits || 0))}`}
                      style={{ width: `${Math.min(getUsagePercentage((credits?.totalCredits || 0) - (credits?.remainingCredits || 0), credits?.totalCredits || 0), 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Plan Comparison */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Available Plans</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`border rounded-lg p-6 ${credits?.subscriptionType === 'free' ? 'border-2 border-blue-500 relative' : 'border-gray-200'}`}>
                  {credits?.subscriptionType === 'free' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-full">Current</span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Plan</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">$0<span className="text-lg text-gray-500">/month</span></p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 50 credits per month (10 emails)</li>
                    <li>• Professional email templates</li>
                    <li>• 100 contacts</li>
                    <li>• 10 campaigns per month</li>
                    <li>• Standard support</li>
                  </ul>
                  <button className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
                    credits?.subscriptionType === 'free' 
                      ? 'bg-blue-600 text-white cursor-default' 
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}>
                    {credits?.subscriptionType === 'free' ? 'Current Plan' : 'Downgrade'}
                  </button>
                </div>

                <div className={`border rounded-lg p-6 ${credits?.subscriptionType === 'premium' ? 'border-2 border-blue-500 relative' : 'border-gray-200'}`}>
                  {credits?.subscriptionType === 'premium' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-full">Current</span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Plan</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">$19<span className="text-lg text-gray-500">/month</span></p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Unlimited credits (unlimited emails)</li>
                    <li>• AI email assistant & content generation</li>
                    <li>• Professional email templates</li>
                    <li>• Unlimited contacts</li>
                    <li>• Unlimited campaigns</li>
                    <li>• Priority support</li>
                  </ul>
                  <button 
                    onClick={() => router.push('/pricing')}
                    className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
                      credits?.subscriptionType === 'premium' 
                        ? 'bg-blue-600 text-white cursor-default' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {credits?.subscriptionType === 'premium' ? 'Current Plan' : 'Upgrade to Premium'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'smtp' && (
          <div className="space-y-6">
            {/* SMTP Status */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">SMTP Configuration</h2>
                  <p className="text-gray-600">Configure your SMTP settings for reliable email delivery</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-800">Available</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Provider</p>
                    <p className="text-lg font-semibold text-gray-900">Gmail, Outlook, Custom</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Security</p>
                    <p className="text-lg font-semibold text-gray-900">TLS/SSL Encrypted</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">SMTP Configuration Benefits</h3>
                    <ul className="mt-2 text-sm text-blue-800 space-y-1">
                      <li>• Send emails from your own domain</li>
                      <li>• Higher deliverability rates</li>
                      <li>• Professional sender reputation</li>
                      <li>• Custom email addresses</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => router.push('/dashboard/settings/email')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Configure SMTP
                </button>
                <button 
                  onClick={() => router.push('/dashboard/settings/email')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Test Connection
                </button>
              </div>
            </div>

            {/* Quick Setup Guide */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Setup Guide</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Choose Your Email Provider</h4>
                    <p className="text-sm text-gray-600">Gmail, Outlook, Yahoo, or your custom SMTP server</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Get App Password</h4>
                    <p className="text-sm text-gray-600">Generate an app-specific password for secure authentication</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Configure Settings</h4>
                    <p className="text-sm text-gray-600">Enter your SMTP server details and test the connection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Integrations</h2>
              <p className="text-gray-600">Connect NovaMail with your favorite tools and services.</p>
              <button 
                onClick={() => router.push('/integrations')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Integrations
              </button>
            </div>
          </div>
        )}

        {activeTab === 'unsubscribe' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Unsubscribe Page</h2>
              <p className="text-gray-600">Customize your unsubscribe page and manage subscriber preferences.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Configure Unsubscribe Page
              </button>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Documents</h2>
              <p className="text-gray-600">Access your account documents, invoices, and legal agreements.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Documents
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}