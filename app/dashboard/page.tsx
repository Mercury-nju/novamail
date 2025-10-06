'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChartBarIcon,
  EnvelopeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  // 模拟数据
  const stats = {
    totalEmails: 1247,
    openRate: 68.5,
    clickRate: 12.3,
    revenue: 15420,
    activeCampaigns: 8,
    totalContacts: 3421,
    conversionRate: 3.2,
    bounceRate: 2.1
  }

  const recentCampaigns = [
    {
      id: 1,
      name: 'Welcome Series',
      status: 'active',
      sent: 1250,
      opens: 856,
      clicks: 154,
      revenue: 2340
    },
    {
      id: 2,
      name: 'Product Launch',
      status: 'completed',
      sent: 2100,
      opens: 1423,
      clicks: 287,
      revenue: 5670
    },
    {
      id: 3,
      name: 'Holiday Sale',
      status: 'draft',
      sent: 0,
      opens: 0,
      clicks: 0,
      revenue: 0
    }
  ]

  const recentActivity = [
    { id: 1, type: 'campaign', message: 'Welcome Series campaign sent to 1,250 contacts', time: '2 hours ago' },
    { id: 2, type: 'contact', message: 'New contact added: john.doe@example.com', time: '4 hours ago' },
    { id: 3, type: 'revenue', message: 'Revenue generated: $234.50 from Product Launch', time: '6 hours ago' },
    { id: 4, type: 'campaign', message: 'Holiday Sale campaign created', time: '1 day ago' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your campaigns.</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <Link
                href="/dashboard/campaigns/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Create Campaign
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Emails Sent</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalEmails.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Open Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.openRate}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ArrowTrendingUpIcon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Click Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.clickRate}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">${stats.revenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Campaigns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Campaigns</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentCampaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-sm font-medium text-gray-900">{campaign.name}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                              campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {campaign.status}
                            </span>
                          </div>
                          <div className="mt-2 grid grid-cols-4 gap-4 text-sm text-gray-500">
                            <div>Sent: {campaign.sent.toLocaleString()}</div>
                            <div>Opens: {campaign.opens.toLocaleString()}</div>
                            <div>Clicks: {campaign.clicks.toLocaleString()}</div>
                            <div>Revenue: ${campaign.revenue.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/dashboard/campaigns"
                      className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                    >
                      View all campaigns →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {activity.type === 'campaign' && <EnvelopeIcon className="h-5 w-5 text-blue-600" />}
                          {activity.type === 'contact' && <UserGroupIcon className="h-5 w-5 text-green-600" />}
                          {activity.type === 'revenue' && <CurrencyDollarIcon className="h-5 w-5 text-yellow-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <Link
                      href="/dashboard/campaigns/new"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      Create New Campaign
                    </Link>
                    <Link
                      href="/dashboard/contacts"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      Manage Contacts
                    </Link>
                    <Link
                      href="/dashboard/analytics"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      View Analytics
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      Account Settings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}