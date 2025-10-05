'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  EnvelopeIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState([
    {
      name: 'Total Contacts',
      value: '0',
      change: '0%',
      changeType: 'neutral',
      icon: UserGroupIcon,
    },
    {
      name: 'Emails Sent',
      value: '0',
      change: '0%',
      changeType: 'neutral',
      icon: EnvelopeIcon,
    },
    {
      name: 'Delivery Rate',
      value: '0%',
      change: '0%',
      changeType: 'neutral',
      icon: ChartBarIcon,
    },
    {
      name: 'Reply Rate',
      value: '0%',
      change: '0%',
      changeType: 'neutral',
      icon: ChartBarIcon,
    },
  ])
  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'loading') {
      return
    }
    
    if (status === 'unauthenticated') {
      // User not logged in, redirect to login page
      router.push('/login')
      return
    }
    
    if (session?.user?.email) {
      fetchDashboardData()
    }
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()
      
      if (data.success) {
        setStats([
          {
            name: 'Total Contacts',
            value: data.stats.totalContacts.toLocaleString(),
            change: '0%',
            changeType: 'neutral',
            icon: UserGroupIcon,
          },
          {
            name: 'Emails Sent',
            value: data.stats.totalEmailsSent.toLocaleString(),
            change: '0%',
            changeType: 'neutral',
            icon: EnvelopeIcon,
          },
          {
            name: 'Delivery Rate',
            value: data.stats.deliveryRate > 0 ? `${data.stats.deliveryRate}%` : '0%',
            change: '0%',
            changeType: 'neutral',
            icon: ChartBarIcon,
          },
          {
            name: 'Reply Rate',
            value: data.stats.replyRate > 0 ? `${data.stats.replyRate}%` : '0%',
            change: '0%',
            changeType: 'neutral',
            icon: ChartBarIcon,
          },
        ])
        setRecentCampaigns(data.recentCampaigns || [])
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

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    {stat.changeType !== 'neutral' && (
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center" />
                        )}
                        <span className="sr-only">
                          {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                        </span>
                        {stat.change}
                      </div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </motion.div>
        ))}
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
                    Delivery Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reply Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : recentCampaigns.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
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
                        {campaign.recipients.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.deliveryRate > 0 ? `${campaign.deliveryRate}%` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.replyRate > 0 ? `${campaign.replyRate}%` : '-'}
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
