'use client'

import { useState } from 'react'
import {
  ChartBarIcon,
  EnvelopeIcon,
  EyeIcon,
  CursorArrowRaysIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  const metrics = {
    totalEmails: 15420,
    openRate: 68.5,
    clickRate: 12.3,
    conversionRate: 3.2,
    revenue: 45670,
    unsubscribeRate: 1.2,
    bounceRate: 2.1
  }

  const chartData = [
    { date: '2024-01-01', emails: 1200, opens: 820, clicks: 150, revenue: 2300 },
    { date: '2024-01-02', emails: 1350, opens: 925, clicks: 168, revenue: 2600 },
    { date: '2024-01-03', emails: 1100, opens: 750, clicks: 135, revenue: 2100 },
    { date: '2024-01-04', emails: 1450, opens: 990, clicks: 180, revenue: 2800 },
    { date: '2024-01-05', emails: 1600, opens: 1080, clicks: 195, revenue: 3100 },
    { date: '2024-01-06', emails: 1300, opens: 890, clicks: 162, revenue: 2500 },
    { date: '2024-01-07', emails: 1400, opens: 950, clicks: 175, revenue: 2700 }
  ]

  const topCampaigns = [
    { name: 'Welcome Series', emails: 2500, opens: 1750, clicks: 350, revenue: 5200 },
    { name: 'Product Launch', emails: 2100, opens: 1423, clicks: 287, revenue: 5670 },
    { name: 'Holiday Sale', emails: 1800, opens: 1206, clicks: 234, revenue: 4200 },
    { name: 'Newsletter #45', emails: 1500, opens: 1020, clicks: 195, revenue: 3100 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">Track your email marketing performance and insights.</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Emails Sent</p>
                  <p className="text-2xl font-semibold text-gray-900">{metrics.totalEmails.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">+12.5%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <EyeIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Open Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{metrics.openRate}%</p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">+2.3%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CursorArrowRaysIcon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Click Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{metrics.clickRate}%</p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">+1.8%</span>
                  </div>
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
                  <p className="text-2xl font-semibold text-gray-900">${metrics.revenue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">+15.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Performance Overview</h2>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center space-y-1">
                      <div 
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(data.emails / 1600) * 200}px` }}
                      ></div>
                      <div 
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${(data.opens / 1600) * 200}px` }}
                      ></div>
                      <div 
                        className="w-full bg-purple-500 rounded-t"
                        style={{ height: `${(data.clicks / 1600) * 200}px` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Emails Sent</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Opens</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Clicks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Conversion Metrics */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Conversion Metrics</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{metrics.conversionRate}%</div>
                      <div className="text-sm text-gray-500">Conversion Rate</div>
                      <div className="flex items-center justify-center mt-1">
                        <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600 ml-1">+0.5%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{metrics.unsubscribeRate}%</div>
                      <div className="text-sm text-gray-500">Unsubscribe Rate</div>
                      <div className="flex items-center justify-center mt-1">
                        <ArrowTrendingDownIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600 ml-1">-0.2%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{metrics.bounceRate}%</div>
                      <div className="text-sm text-gray-500">Bounce Rate</div>
                      <div className="flex items-center justify-center mt-1">
                        <ArrowTrendingDownIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600 ml-1">-0.1%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Campaigns */}
            <div>
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Top Campaigns</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topCampaigns.map((campaign, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-xs text-gray-500">
                            {campaign.emails.toLocaleString()} sent • {campaign.opens.toLocaleString()} opens
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">${campaign.revenue.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">{campaign.clicks} clicks</div>
                        </div>
                      </div>
                    ))}
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
