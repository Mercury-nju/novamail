'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  SparklesIcon, 
  ArrowRightIcon,
  RocketLaunchIcon,
  StarIcon,
  EnvelopeIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface DashboardStats {
  totalCampaigns: number
  totalContacts: number
  totalEmailsSent: number
  averageOpenRate: number
  averageClickRate: number
  recentCampaigns: Array<{
    id: string
    subject: string
    status: 'sent' | 'scheduled' | 'draft'
    recipients: number
    openRate?: number
    clickRate?: number
    createdAt: string
  }>
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCampaigns: 0,
    totalContacts: 0,
    totalEmailsSent: 0,
    averageOpenRate: 0,
    averageClickRate: 0,
    recentCampaigns: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 加载真实的用户数据
    const loadDashboardData = async () => {
      try {
        // 获取当前用户邮箱（从localStorage或session）
        const userEmail = localStorage.getItem('user-email') || sessionStorage.getItem('user-email') || localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
        
        if (!userEmail) {
          console.log('No user email found, showing empty state')
          setStats({
            totalCampaigns: 0,
            totalContacts: 0,
            totalEmailsSent: 0,
            averageOpenRate: 0,
            averageClickRate: 0,
            recentCampaigns: []
          })
          setIsLoading(false)
          return
        }

        // 调用真实的API
        const response = await fetch(`/api/dashboard/stats?email=${encodeURIComponent(userEmail)}`)
        
        if (!response.ok) {
          throw new Error(`API call failed: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.stats) {
          setStats(data.stats)
        } else {
          // 如果API返回错误，显示空状态
          setStats({
            totalCampaigns: 0,
            totalContacts: 0,
            totalEmailsSent: 0,
            averageOpenRate: 0,
            averageClickRate: 0,
            recentCampaigns: []
          })
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
        // 出错时显示空状态
        setStats({
          totalCampaigns: 0,
          totalContacts: 0,
          totalEmailsSent: 0,
          averageOpenRate: 0,
          averageClickRate: 0,
          recentCampaigns: []
        })
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircleIcon className="w-4 h-4" />
      case 'scheduled': return <ClockIcon className="w-4 h-4" />
      case 'draft': return <DocumentTextIcon className="w-4 h-4" />
      default: return <DocumentTextIcon className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-900">Dashboard</h1>
                <p className="text-xs text-gray-500">AI Email Marketing Platform</p>
              </div>
            </div>
            <div className="flex items-center">
              <Link
                href="/dashboard/campaigns/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RocketLaunchIcon className="h-4 w-4 mr-2" />
                Start Creating
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900">Welcome back!</h2>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening with your email campaigns today.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {/* Total Campaigns */}
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : stats.totalCampaigns}</p>
                {!isLoading && stats.totalCampaigns === 0 && (
                  <p className="text-xs text-gray-500 mt-1">No campaigns created yet</p>
                )}
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <RocketLaunchIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Contacts */}
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : formatNumber(stats.totalContacts)}</p>
                {!isLoading && stats.totalContacts === 0 && (
                  <p className="text-xs text-gray-500 mt-1">No contacts imported yet</p>
                )}
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Emails Sent */}
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : formatNumber(stats.totalEmailsSent)}</p>
                {!isLoading && stats.totalEmailsSent === 0 && (
                  <p className="text-xs text-gray-500 mt-1">No emails sent yet</p>
                )}
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <EnvelopeIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Average Open Rate */}
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : `${stats.averageOpenRate}%`}</p>
                {!isLoading && stats.averageOpenRate === 0 && (
                  <p className="text-xs text-gray-500 mt-1">No data available</p>
                )}
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid - 统一的3列布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Campaigns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-50 rounded-xl h-full">
              <div className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
                  <Link
                    href="/dashboard/campaigns"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-5">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : stats.recentCampaigns.length === 0 ? (
                  <div className="text-center py-8">
                    <RocketLaunchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns yet</h3>
                    <p className="text-gray-600 mb-4">Create your first email campaign to get started</p>
              <Link
                href="/dashboard/campaigns/new"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <RocketLaunchIcon className="h-4 w-4 mr-2" />
                      Create Campaign
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {stats.recentCampaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                              {getStatusIcon(campaign.status)}
                              <span className="ml-1 capitalize">{campaign.status}</span>
                            </span>
                            <span className="text-sm text-gray-500">{campaign.recipients} recipients</span>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">{campaign.subject}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {campaign.openRate && (
                              <span className="flex items-center">
                                <EyeIcon className="w-4 h-4 mr-1" />
                                {campaign.openRate}% open
                              </span>
                            )}
                            {campaign.clickRate && (
                              <span className="flex items-center">
                                <CursorArrowRaysIcon className="w-4 h-4 mr-1" />
                                {campaign.clickRate}% click
                              </span>
                            )}
                          </div>
                        </div>
                        <Link
                          href={`/dashboard/campaigns/edit?id=${campaign.id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View
              </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            </motion.div>

          {/* Right Column - Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard/campaigns/new"
                  className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-colors"
                >
                  <RocketLaunchIcon className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium text-gray-900">Create Campaign</span>
                </Link>
                <Link
                  href="/dashboard/contacts"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <UserGroupIcon className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">Manage Contacts</span>
                </Link>
              </div>
            </div>

            {/* Platform Features */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Features</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <StarIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Professional Templates</h4>
                    <p className="text-sm text-gray-600">Expertly designed templates for every business need</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI-Powered Content</h4>
                    <p className="text-sm text-gray-600">Generate personalized content with AI assistance</p>
                  </div>
                          </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ChartBarIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Advanced Analytics</h4>
                    <p className="text-sm text-gray-600">Track performance with detailed insights</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-sm text-gray-600 mb-4">
                New to NovaMail? Start with our professional templates and create your first campaign.
              </p>
              <Link
                href="/dashboard/campaigns/new"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Create your first campaign
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}