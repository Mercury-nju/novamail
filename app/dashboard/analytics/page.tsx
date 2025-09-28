'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedCampaign, setSelectedCampaign] = useState('all')

  // Mock data
  const emailStats = [
    { name: 'Total Sent', value: '12,847', change: '+8.2%', changeType: 'positive' },
    { name: 'Delivered', value: '12,523', change: '+7.9%', changeType: 'positive' },
    { name: 'Replied', value: '892', change: '+5.3%', changeType: 'positive' },
    { name: 'Unsubscribed', value: '23', change: '-2.1%', changeType: 'negative' },
    { name: 'Bounced', value: '324', change: '+1.2%', changeType: 'negative' }
  ]

  const engagementStats = [
    { name: 'Open Rate', value: '24.8%', change: '+2.1%', changeType: 'positive' },
    { name: 'Click Rate', value: '3.2%', change: '+0.8%', changeType: 'positive' },
    { name: 'Conversion Rate', value: '1.8%', change: '+0.3%', changeType: 'positive' },
    { name: 'Unsubscribe Rate', value: '0.2%', change: '-0.1%', changeType: 'positive' }
  ]

  const timeStats = [
    { name: 'Best Send Time', value: '10:00 AM', change: 'Tue, Thu', changeType: 'neutral' },
    { name: 'Avg Response Time', value: '2.4 hrs', change: '-0.3 hrs', changeType: 'positive' },
    { name: 'Peak Engagement', value: 'Weekdays', change: 'Mon-Fri', changeType: 'neutral' }
  ]

  const deliveryRateData = [
    { date: '2024-11-01', rate: 98.5 },
    { date: '2024-11-02', rate: 98.2 },
    { date: '2024-11-03', rate: 97.8 },
    { date: '2024-11-04', rate: 98.1 },
    { date: '2024-11-05', rate: 98.7 },
    { date: '2024-11-06', rate: 98.4 },
    { date: '2024-11-07', rate: 98.6 },
    { date: '2024-11-08', rate: 98.3 },
    { date: '2024-11-09', rate: 98.8 },
    { date: '2024-11-10', rate: 98.5 },
    { date: '2024-11-11', rate: 99.1 },
    { date: '2024-11-12', rate: 98.7 },
    { date: '2024-11-13', rate: 98.4 },
    { date: '2024-11-14', rate: 98.9 },
    { date: '2024-11-15', rate: 98.6 }
  ]

  const replyRateData = [
    { date: '2024-11-01', rate: 5.2 },
    { date: '2024-11-02', rate: 5.5 },
    { date: '2024-11-03', rate: 4.9 },
    { date: '2024-11-04', rate: 5.1 },
    { date: '2024-11-05', rate: 5.8 },
    { date: '2024-11-06', rate: 5.3 },
    { date: '2024-11-07', rate: 5.6 },
    { date: '2024-11-08', rate: 5.4 },
    { date: '2024-11-09', rate: 6.1 },
    { date: '2024-11-10', rate: 5.7 },
    { date: '2024-11-11', rate: 6.3 },
    { date: '2024-11-12', rate: 5.9 },
    { date: '2024-11-13', rate: 5.5 },
    { date: '2024-11-14', rate: 6.0 },
    { date: '2024-11-15', rate: 5.6 }
  ]

  const campaignPerformance = [
    { name: 'Black Friday Sale', sent: 1250, delivered: 1231, replied: 89, deliveryRate: 98.5, replyRate: 7.2 },
    { name: 'Weekly Newsletter', sent: 2100, delivered: 2058, replied: 126, deliveryRate: 98.0, replyRate: 6.1 },
    { name: 'Product Launch', sent: 800, delivered: 784, replied: 67, deliveryRate: 98.0, replyRate: 8.5 },
    { name: 'Holiday Greetings', sent: 1800, delivered: 1764, replied: 45, deliveryRate: 98.0, replyRate: 2.5 },
    { name: 'Feedback Request', sent: 500, delivered: 490, replied: 31, deliveryRate: 98.0, replyRate: 6.3 }
  ]

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#3B82F6' },
    { name: 'Mobile', value: 35, color: '#10B981' },
    { name: 'Tablet', value: 20, color: '#F59E0B' }
  ]

  const locationData = [
    { name: 'United States', value: 35, color: '#3B82F6' },
    { name: 'United Kingdom', value: 18, color: '#10B981' },
    { name: 'Canada', value: 12, color: '#F59E0B' },
    { name: 'Australia', value: 8, color: '#EF4444' },
    { name: 'Germany', value: 7, color: '#8B5CF6' },
    { name: 'Others', value: 20, color: '#6B7280' }
  ]

  const hourlyData = [
    { hour: '00:00', opens: 12, replies: 2 },
    { hour: '01:00', opens: 8, replies: 1 },
    { hour: '02:00', opens: 5, replies: 0 },
    { hour: '03:00', opens: 3, replies: 0 },
    { hour: '04:00', opens: 4, replies: 0 },
    { hour: '05:00', opens: 6, replies: 1 },
    { hour: '06:00', opens: 15, replies: 3 },
    { hour: '07:00', opens: 28, replies: 5 },
    { hour: '08:00', opens: 45, replies: 8 },
    { hour: '09:00', opens: 62, replies: 12 },
    { hour: '10:00', opens: 78, replies: 15 },
    { hour: '11:00', opens: 65, replies: 11 },
    { hour: '12:00', opens: 52, replies: 9 },
    { hour: '13:00', opens: 48, replies: 8 },
    { hour: '14:00', opens: 55, replies: 10 },
    { hour: '15:00', opens: 68, replies: 13 },
    { hour: '16:00', opens: 72, replies: 14 },
    { hour: '17:00', opens: 58, replies: 11 },
    { hour: '18:00', opens: 42, replies: 7 },
    { hour: '19:00', opens: 35, replies: 6 },
    { hour: '20:00', opens: 28, replies: 4 },
    { hour: '21:00', opens: 22, replies: 3 },
    { hour: '22:00', opens: 18, replies: 2 },
    { hour: '23:00', opens: 14, replies: 2 }
  ]

  const segmentPerformance = [
    { segment: 'New Users', sent: 3200, delivered: 3136, replied: 189, deliveryRate: 98.0, replyRate: 6.0 },
    { segment: 'Active Users', sent: 2800, delivered: 2744, replied: 168, deliveryRate: 98.0, replyRate: 6.1 },
    { segment: 'Paid Users', sent: 1500, delivered: 1470, replied: 94, deliveryRate: 98.0, replyRate: 6.4 },
    { segment: 'Silent Users', sent: 1200, delivered: 1176, replied: 35, deliveryRate: 98.0, replyRate: 3.0 },
    { segment: 'Churned Users', sent: 800, delivered: 784, replied: 24, deliveryRate: 98.0, replyRate: 3.1 }
  ]

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
      {/* Header */}
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

      {/* Key Metrics */}
      <div className="space-y-6">
        {/* Email Stats */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Email Performance</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {emailStats.map((stat, index) => (
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
                      </dd>
                    </dl>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engagement Stats */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Engagement Metrics</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {engagementStats.map((stat, index) => (
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
                      </dd>
                    </dl>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Time Stats */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Timing Insights</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {timeStats.map((stat, index) => (
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
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Rate Trend */}
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
              <AreaChart data={deliveryRateData}>
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

        {/* Reply Rate Trend */}
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
              <LineChart data={replyRateData}>
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

      {/* Advanced Analytics */}
      <div className="space-y-6">
        {/* Hourly Engagement */}
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
              <AreaChart data={hourlyData}>
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

        {/* Campaign Performance & Segment Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Performance */}
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
                  {campaignPerformance.map((campaign, index) => (
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

          {/* Segment Performance */}
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
                  {segmentPerformance.map((segment, index) => (
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

        {/* Device & Location Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Breakdown */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Device Breakdown</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {deviceData.map((device, index) => (
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

          {/* Location Breakdown */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Geographic Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Users']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {locationData.map((location, index) => (
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

      {/* Content Performance & Insights */}
      <div className="space-y-6">
        {/* Top Performing Content */}
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

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Insights */}
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

          {/* Recommendations */}
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
