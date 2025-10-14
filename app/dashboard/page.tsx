'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  EnvelopeIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import UsageStats from '@/components/UsageStats'

export default function DashboardPage() {
  const [stats, setStats] = useState([
    {
      name: 'Total Contacts',
      value: '0',
      icon: UserGroupIcon,
    },
    {
      name: 'Emails Sent',
      value: '0',
      icon: EnvelopeIcon,
    },
  ])
  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showSmtpAlert, setShowSmtpAlert] = useState(false)
  const [smtpConfigured, setSmtpConfigured] = useState(false)

  useEffect(() => {
    // 静态导出模式：使用模拟数据
    fetchDashboardData()
    checkSmtpConfiguration()

    // 监听localStorage变化，当SMTP配置更新时重新检查
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('email_config_')) {
        checkSmtpConfiguration()
      }
      // 当联系人数据变化时，重新获取Dashboard数据
      if (e.key && e.key.startsWith('contact_')) {
        fetchDashboardData()
      }
    }

    // 监听联系人更新事件
    const handleContactUpdate = () => {
      fetchDashboardData()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('contactUpdated', handleContactUpdate)
    
    // 定期检查SMTP配置状态和刷新Dashboard数据
    const interval = setInterval(() => {
      checkSmtpConfiguration()
      fetchDashboardData() // 定期刷新Dashboard数据
    }, 30000) // 每30秒刷新一次

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('contactUpdated', handleContactUpdate)
      clearInterval(interval)
    }
  }, [])

  const checkSmtpConfiguration = () => {
    try {
      const userEmail = localStorage.getItem('user-email')
      if (userEmail) {
        // 检查用户是否已配置SMTP
        const emailConfig = localStorage.getItem(`email_config_${userEmail}`)
        if (emailConfig) {
          const config = JSON.parse(emailConfig)
          if (config.isConfigured && config.email && config.password) {
            setSmtpConfigured(true)
            setShowSmtpAlert(false)
            return
          }
        }
        // 如果没有配置，显示提醒
        setSmtpConfigured(false)
        setShowSmtpAlert(true)
      }
    } catch (error) {
      console.error('Failed to check SMTP configuration:', error)
      setShowSmtpAlert(true)
    }
  }

  const handleDismissAlert = () => {
    setShowSmtpAlert(false)
  }

  const fetchDashboardData = async () => {
    try {
      // 从真实API获取数据
      const userEmail = localStorage.getItem('user-email') || 'anonymous@example.com';
      const response = await fetch('https://novamail.world/api/dashboard/stats', {
        headers: {
          'x-user-email': userEmail
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }
      
      const data = await response.json()
      
      if (data.success) {
        setStats([
          {
            name: 'Total Contacts',
            value: data.stats.totalContacts.toLocaleString(),
            icon: UserGroupIcon,
          },
          {
            name: 'Emails Sent',
            value: data.stats.totalEmailsSent.toLocaleString(),
            icon: EnvelopeIcon,
          },
        ])
        setRecentCampaigns(data.recentCampaigns || [])
      } else {
        throw new Error(data.error || 'Failed to fetch data')
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      name: 'Create Campaign',
      description: 'Start a new email campaign',
      href: '/dashboard/campaigns/new',
      icon: PlusIcon,
      color: 'bg-primary-500',
    },
    {
      name: 'Import Contacts',
      description: 'Upload CSV file with contacts',
      href: '/dashboard/contacts',
      icon: UserGroupIcon,
      color: 'bg-green-500',
    },
    {
      name: 'View Analytics',
      description: 'Check campaign performance',
      href: '/dashboard/analytics',
      icon: ChartBarIcon,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="space-y-6">
      {/* SMTP Configuration Alert */}
      {showSmtpAlert && !smtpConfigured && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-amber-800">
                SMTP Configuration Required
              </h3>
              <div className="mt-1 text-sm text-amber-700">
                <p>
                  You need to configure SMTP settings before sending emails. This is a necessary step to use NovaMail.
                </p>
              </div>
              <div className="mt-3 flex space-x-3">
                <Link
                  href="/dashboard/settings/email"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-amber-800 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors"
                >
                  <Cog6ToothIcon className="h-4 w-4 mr-2" />
                  Configure Now
                </Link>
                <button
                  onClick={handleDismissAlert}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors"
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Remind Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back! Here's what's happening with your email campaigns.
        </p>
      </div>

      {/* Primary CTA - Create Campaign */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                Ready to create your next email campaign?
              </h2>
              <p className="text-primary-100 mb-6 max-w-2xl">
                Create engaging email campaigns that convert. Use our intuitive campaign builder to craft professional emails for your audience.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  id="quick-action-create-campaign"
                  href="/dashboard/campaigns/new"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-primary-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Create New Campaign
                </Link>
                <Link
                  href="/dashboard/campaigns"
                  className="inline-flex items-center px-6 py-3 border border-white border-opacity-30 text-base font-medium rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                >
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  View All Campaigns
                </Link>
              </div>
            </div>
            <div className="hidden lg:block ml-8">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <EnvelopeIcon className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats and Usage */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Basic Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              className="card"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Usage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <UsageStats 
            currentContacts={parseInt(stats[0]?.value || '0')}
            currentEmails={parseInt(stats[1]?.value || '0')}
            currentCampaigns={recentCampaigns.length}
          />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 5) * 0.1 }}
            >
              <Link
                href={action.href}
                id={`quick-action-${action.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="card hover:shadow-md transition-shadow duration-200 block"
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${action.color} p-3 rounded-lg`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {action.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Campaigns */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Campaigns</h2>
          <Link
            href="/dashboard/campaigns"
            className="text-sm text-primary-600 hover:text-primary-500 font-medium"
          >
            View all
          </Link>
        </div>
        <div className="card">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : recentCampaigns.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No campaigns yet. <Link href="/dashboard/campaigns/new" className="text-primary-600 hover:text-primary-500">Create your first campaign</Link>
                    </td>
                  </tr>
                ) : (
                  recentCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {campaign.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {campaign.sentDate ? `Sent ${campaign.sentDate}` : 'Draft'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          campaign.status === 'sent'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.recipients ? campaign.recipients.toLocaleString() : '0'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.createdAt ? new Date(campaign.createdAt).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}