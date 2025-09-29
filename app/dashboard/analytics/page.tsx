'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import {
  ChartBarIcon,
  EyeIcon,
  CursorArrowRaysIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  FunnelIcon,
  EnvelopeIcon,
  ClockIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon
} from '@heroicons/react/24/outline'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedCampaign, setSelectedCampaign] = useState('all')
  const [loading, setLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState({
    emailStats: [
      { name: 'Total Sent', value: '0', change: '0%', changeType: 'neutral' },
      { name: 'Delivered', value: '0', change: '0%', changeType: 'neutral' },
      { name: 'Replied', value: '0', change: '0%', changeType: 'neutral' },
      { name: 'Unsubscribed', value: '0', change: '0%', changeType: 'neutral' },
      { name: 'Bounced', value: '0', change: '0%', changeType: 'neutral' }
    ],
    engagementStats: [
      { name: 'Open Rate', value: '0%', change: '0%', changeType: 'neutral' },
      { name: 'Click Rate', value: '0%', change: '0%', changeType: 'neutral' },
      { name: 'Conversion Rate', value: '0%', change: '0%', changeType: 'neutral' },
      { name: 'Unsubscribe Rate', value: '0%', change: '0%', changeType: 'neutral' }
    ],
    timeStats: [
      { name: 'Best Send Time', value: 'N/A', change: 'No data', changeType: 'neutral' },
      { name: 'Avg Response Time', value: 'N/A', change: 'No data', changeType: 'neutral' },
      { name: 'Peak Engagement', value: 'N/A', change: 'No data', changeType: 'neutral' }
    ],
    hasData: false
  })

  useEffect(() => {
    if (session?.user?.email) {
      fetchAnalyticsData()
    }
  }, [session, timeRange, selectedCampaign])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics/stats?timeRange=${timeRange}&campaign=${selectedCampaign}`)
      const data = await response.json()
      
      if (data.success) {
        setAnalyticsData(data.analytics)
      }
    } catch (error) {
      console.error('Failed to fetch analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const emptyData = {
    deliveryRateData: [] as any[],
    replyRateData: [] as any[],
    campaignPerformance: [] as any[],
    deviceData: [] as any[],
    locationData: [] as any[],
    hourlyData: [] as any[],
    segmentPerformance: [] as any[]
  }

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ]

  const campaigns = [
    { value: 'all', label: 'All Campaigns' },
    { value: 'black-friday', label: 'Black Friday Sale' },
    { value: 'newsletter', label: 'Weekly Newsletter' },
    { value: 'product-launch', label: 'Product Launch' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track your email campaign performance and engagement
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-auto"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="input-field w-auto"
          >
            {campaigns.map((campaign) => (
              <option key={campaign.value} value={campaign.value}>
                {campaign.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Email Performance</h2>
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : !analyticsData.hasData ? (
            <div className="card text-center py-12">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Analytics Data</h3>
              <p className="text-gray-600 mb-4">Start sending campaigns to see your performance analytics.</p>
              <a href="/dashboard/campaigns/new" className="btn-primary">Create Your First Campaign</a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {analyticsData.emailStats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {stat.name === 'Total Sent' && <EnvelopeIcon className="h-8 w-8 text-primary-600" />}
                      {stat.name === 'Delivered' && <UserGroupIcon className="h-8 w-8 text-green-600" />}
                      {stat.name === 'Replied' && <CursorArrowRaysIcon className="h-8 w-8 text-purple-600" />}
                      {stat.name === 'Unsubscribed' && <ArrowDownIcon className="h-8 w-8 text-red-600" />}
                      {stat.name === 'Bounced' && <ArrowUpIcon className="h-8 w-8 text-orange-600" />}
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
          )}
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Engagement Metrics</h2>
          {!analyticsData.hasData ? (
            <div className="card text-center py-8">
              <p className="text-gray-600">No engagement data available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {analyticsData.engagementStats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index + 5) * 0.1 }}
                  className="card"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {stat.name === 'Open Rate' && <EyeIcon className="h-8 w-8 text-blue-600" />}
                      {stat.name === 'Click Rate' && <CursorArrowRaysIcon className="h-8 w-8 text-green-600" />}
                      {stat.name === 'Conversion Rate' && <ChartBarIcon className="h-8 w-8 text-purple-600" />}
                      {stat.name === 'Unsubscribe Rate' && <ArrowDownIcon className="h-8 w-8 text-red-600" />}
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
          )}
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Timing Insights</h2>
          {!analyticsData.hasData ? (
            <div className="card text-center py-8">
              <p className="text-gray-600">No timing data available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {analyticsData.timeStats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index + 9) * 0.1 }}
                  className="card"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {stat.name === 'Best Send Time' && <ClockIcon className="h-8 w-8 text-blue-600" />}
                      {stat.name === 'Avg Response Time' && <ClockIcon className="h-8 w-8 text-green-600" />}
                      {stat.name === 'Peak Engagement' && <CalendarIcon className="h-8 w-8 text-purple-600" />}
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
                          <div className="ml-2 text-sm text-gray-500">
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!analyticsData.hasData ? (
        <div className="card text-center py-12">
          <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Chart Data</h3>
          <p className="text-gray-600">Charts will appear here once you start sending campaigns.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Delivery Rate Trend</h2>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {timeRanges.find(r => r.value === timeRange)?.label}
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={emptyData.deliveryRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [`${value}%`, 'Delivery Rate']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Reply Rate Trend</h2>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {timeRanges.find(r => r.value === timeRange)?.label}
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emptyData.replyRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [`${value}%`, 'Reply Rate']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Hourly Engagement Pattern</h2>
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="h-4 w-4 mr-1" />
              Best time: 10:00 AM
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emptyData.hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="hour" 
                  tickFormatter={(value) => value}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'opens' ? 'Opens' : 'Replies']}
                />
                <Area 
                  type="monotone" 
                  dataKey="opens" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="replies" 
                  stackId="2"
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Campaign Performance</h2>
              <button className="btn-secondary text-sm flex items-center">
                <FunnelIcon className="h-4 w-4 mr-1" />
                Filter
              </button>
            </div>
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
                      Delivery Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reply Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {emptyData.campaignPerformance.map((campaign, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.sent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 mr-2">
                            {campaign.deliveryRate}%
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${Math.min(campaign.deliveryRate, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 mr-2">
                            {campaign.replyRate}%
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${Math.min(campaign.replyRate * 10, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">User Segment Performance</h2>
              <button className="btn-secondary text-sm flex items-center">
                <FunnelIcon className="h-4 w-4 mr-1" />
                Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Segment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reply Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {emptyData.segmentPerformance.map((segment, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {segment.segment}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {segment.sent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 mr-2">
                            {segment.replyRate}%
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${Math.min(segment.replyRate * 10, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Device Breakdown</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emptyData.deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {emptyData.deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {emptyData.deviceData.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: device.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{device.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{device.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Geographic Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emptyData.locationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {emptyData.locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Users']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {emptyData.locationData.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: location.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{location.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{location.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Top Performing Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { subject: '🔥 50% Off Everything - Black Friday Special!', deliveryRate: 98.5, replyRate: 7.1, openRate: 24.8, clickRate: 3.2 },
              { subject: 'Introducing Our New Product Line', deliveryRate: 98.0, replyRate: 8.4, openRate: 22.1, clickRate: 2.8 },
              { subject: 'Weekly Updates & Industry Insights', deliveryRate: 98.0, replyRate: 6.0, openRate: 19.5, clickRate: 2.1 },
              { subject: 'Welcome to Our Platform!', deliveryRate: 97.8, replyRate: 5.2, openRate: 18.3, clickRate: 1.9 },
              { subject: 'Your Account Summary', deliveryRate: 98.2, replyRate: 4.8, openRate: 17.6, clickRate: 1.7 },
              { subject: 'Special Offer Just for You', deliveryRate: 97.9, replyRate: 6.3, openRate: 20.2, clickRate: 2.4 }
            ].map((content, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 mb-3 text-sm">{content.subject}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Delivery: {content.deliveryRate}%</span>
                    <span>Open: {content.openRate}%</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Reply: {content.replyRate}%</span>
                    <span>Click: {content.clickRate}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ArrowUpIcon className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Reply Rate Improvement</h3>
                  <p className="text-sm text-gray-600">Your reply rates have increased by 5.3% this month, indicating better engagement with your content.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <ClockIcon className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Optimal Send Time</h3>
                  <p className="text-sm text-gray-600">Emails sent at 10:00 AM on weekdays show 23% higher open rates than other times.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <UserGroupIcon className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Segment Performance</h3>
                  <p className="text-sm text-gray-600">Paid users show the highest engagement with 6.4% reply rate, followed by active users at 6.1%.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <DevicePhoneMobileIcon className="h-4 w-4 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Mobile Optimization</h3>
                  <p className="text-sm text-gray-600">35% of your audience reads emails on mobile devices. Consider optimizing for mobile viewing.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-sm font-medium text-gray-900">Improve Subject Lines</h3>
                <p className="text-sm text-gray-600">Use more personalized subject lines to increase open rates. Consider A/B testing different approaches.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-sm font-medium text-gray-900">Segment Targeting</h3>
                <p className="text-sm text-gray-600">Focus more campaigns on your highest-performing segments (Paid and Active users) for better ROI.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-sm font-medium text-gray-900">Timing Optimization</h3>
                <p className="text-sm text-gray-600">Schedule more campaigns for Tuesday and Thursday mornings to maximize engagement.</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-sm font-medium text-gray-900">Content Strategy</h3>
                <p className="text-sm text-gray-600">Promotional content performs best. Consider increasing the frequency of special offers and product announcements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
