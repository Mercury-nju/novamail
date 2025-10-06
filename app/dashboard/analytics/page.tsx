'use client'

import { useState, useEffect } from 'react'

interface AnalyticsData {
  totalEmails: number
  totalOpens: number
  totalClicks: number
  openRate: number
  clickRate: number
  unsubscribeRate: number
  bounceRate: number
  deliveryRate: number
  spamRate: number
}

interface ChartData {
  date: string
  emails: number
  opens: number
  clicks: number
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      
      const response = await fetch(`https://novamail-api.lihongyangnju.workers.dev/api/analytics?timeRange=${timeRange}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      if (data.success) {
        setAnalytics(data.data.analytics)
        setChartData(data.data.chartData)
      } else {
        throw new Error(data.error || 'Failed to fetch analytics')
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      // 如果API失败，设置为空数据而不是模拟数据
      setAnalytics({
        totalEmails: 0,
        totalOpens: 0,
        totalClicks: 0,
        openRate: 0,
        clickRate: 0,
        unsubscribeRate: 0,
        bounceRate: 0,
        deliveryRate: 0,
        spamRate: 0
      })
      setChartData([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No analytics data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your email marketing performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-600">Total Emails</p>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Total number of emails sent through all campaigns">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalEmails.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-600">Open Rate</p>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Percentage of recipients who opened your emails">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900">{analytics.openRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-600">Click Rate</p>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Percentage of recipients who clicked links in your emails">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900">{analytics.clickRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-600">Delivery Rate</p>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Percentage of emails successfully delivered to recipients' inboxes">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900">{analytics.deliveryRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Email Performance</h2>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Emails Sent</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Opens</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Clicks</span>
            </div>
          </div>
        </div>
        
        {/* Simple Chart Representation */}
        <div className="h-64 flex items-end justify-between space-x-2">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center space-y-1">
                <div 
                  className="w-full bg-blue-200 rounded-t"
                  style={{ height: `${(data.emails / 1500) * 200}px` }}
                ></div>
                <div 
                  className="w-full bg-green-200 rounded-t"
                  style={{ height: `${(data.opens / 1500) * 200}px` }}
                ></div>
                <div 
                  className="w-full bg-purple-200 rounded-t"
                  style={{ height: `${(data.clicks / 1500) * 200}px` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-2">
                {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Total Opens</span>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Total number of email opens across all campaigns">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <span className="font-semibold">{analytics.totalOpens.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Total Clicks</span>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Total number of link clicks across all campaigns">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <span className="font-semibold">{analytics.totalClicks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Unsubscribe Rate</span>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Percentage of recipients who unsubscribed from your emails">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <span className="font-semibold">{analytics.unsubscribeRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Bounce Rate</span>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Percentage of emails that bounced (could not be delivered)">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <span className="font-semibold">{analytics.bounceRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Delivery Rate</span>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Percentage of emails successfully delivered to recipients' inboxes">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <span className="font-semibold">{analytics.deliveryRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Spam Rate</span>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Percentage of emails marked as spam by recipients">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <span className="font-semibold">{analytics.spamRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Avg Open Rate</span>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Average open rate across all campaigns">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <span className="font-semibold">{analytics.openRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Avg Click Rate</span>
                <button className="ml-1 text-gray-400 hover:text-gray-600" title="Average click rate across all campaigns">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <span className="font-semibold">{analytics.clickRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Campaigns */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Campaigns</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Click Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Black Friday Sale
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,480</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">40.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">95.2%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Welcome Series - Part 1
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,245</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">98.1%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Product Launch Announcement
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">38.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6.5%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">97.8%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
