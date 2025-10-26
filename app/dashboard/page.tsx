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
    // 模拟加载数据
    const loadDashboardData = async () => {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟数据
      setStats({
        totalCampaigns: 12,
        totalContacts: 2847,
        totalEmailsSent: 15680,
        averageOpenRate: 24.5,
        averageClickRate: 8.2,
        recentCampaigns: [
          {
            id: '1',
            subject: '🚀 Introducing [Product Name] - The Future is Here',
            status: 'sent',
            recipients: 1250,
            openRate: 24.5,
            clickRate: 8.2,
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            subject: '📧 Welcome to NovaMail - Let\'s Get Started!',
            status: 'sent',
            recipients: 892,
            openRate: 31.2,
            clickRate: 12.1,
            createdAt: '2024-01-14T14:20:00Z'
          },
          {
            id: '3',
            subject: '💡 Monthly Newsletter - December 2024',
            status: 'scheduled',
            recipients: 2847,
            createdAt: '2024-01-13T09:15:00Z'
          }
        ]
      })
      setIsLoading(false)
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-900">Dashboard</h1>
                <p className="text-xs text-gray-500">AI Email Marketing Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/templates"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Browse Templates
              </Link>
              <Link
                href="/dashboard/campaigns/new"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <RocketLaunchIcon className="h-5 w-5 mr-2" />
                Start Creating
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Here's what's happening with your email campaigns today.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Campaigns */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : stats.totalCampaigns}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <RocketLaunchIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Contacts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : formatNumber(stats.totalContacts)}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Emails Sent */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : formatNumber(stats.totalEmailsSent)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <EnvelopeIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Average Open Rate */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : `${stats.averageOpenRate}%`}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Campaigns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
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
              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats.recentCampaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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

          {/* Quick Actions & Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                  href="/dashboard/templates"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <DocumentTextIcon className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">Browse Templates</span>
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

            {/* Feature Highlights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
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