'use client'

import { useState, useEffect } from 'react'
import { getUserLimits, getUserSubscription, fetchUserSubscription } from '@/lib/permissions'

interface UsageStatsProps {
  currentContacts?: number
  currentEmails?: number
  currentCampaigns?: number
}

export default function UsageStats({ 
  currentContacts = 0, 
  currentEmails = 0, 
  currentCampaigns = 0 
}: UsageStatsProps) {
  const [mounted, setMounted] = useState(false)
  const [limits, setLimits] = useState({
    maxContacts: 500,
    maxEmailsPerMonth: 1000,
    maxCampaignsPerMonth: 10
  })
  const [subscription, setSubscription] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    const loadSubscriptionData = async () => {
      const userEmail = localStorage.getItem('user-email')
      if (userEmail) {
        // 先从API获取最新订阅状态
        const apiSubscription = await fetchUserSubscription(userEmail)
        if (apiSubscription) {
          setSubscription(apiSubscription)
          const userLimits = getUserLimits()
          setLimits(userLimits)
        } else {
          // 如果API失败，使用localStorage中的缓存
          const userLimits = getUserLimits()
          const userSubscription = getUserSubscription()
          setLimits(userLimits)
          setSubscription(userSubscription)
        }
      } else {
        // 没有用户邮箱，使用默认值
        const userLimits = getUserLimits()
        const userSubscription = getUserSubscription()
        setLimits(userLimits)
        setSubscription(userSubscription)
      }
    }
    
    loadSubscriptionData()
    
    // 定期刷新订阅状态
    const interval = setInterval(loadSubscriptionData, 30000) // 每30秒刷新一次
    
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const getUsagePercentage = (current: number, limit: number) => {
    if (limit === -1) return 0 // 无限制
    return Math.min((current / limit) * 100, 100)
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const formatLimit = (limit: number) => {
    if (limit === -1) return 'Unlimited'
    return limit.toLocaleString()
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Usage Statistics</h3>
        <div className="text-sm text-gray-500">
          Plan: <span className="font-medium text-blue-600">
            {subscription?.plan === 'pro' ? 'Pro' : 
             subscription?.plan === 'enterprise' ? 'Enterprise' : 'Free'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Contacts Usage */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Contacts</span>
            <span className="text-sm text-gray-500">
              {currentContacts.toLocaleString()} / {formatLimit(limits.maxContacts)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(getUsagePercentage(currentContacts, limits.maxContacts))}`}
              style={{ width: `${getUsagePercentage(currentContacts, limits.maxContacts)}%` }}
            />
          </div>
        </div>

        {/* Emails Usage */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Emails This Month</span>
            <span className="text-sm text-gray-500">
              {currentEmails.toLocaleString()} / {formatLimit(limits.maxEmailsPerMonth)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(getUsagePercentage(currentEmails, limits.maxEmailsPerMonth))}`}
              style={{ width: `${getUsagePercentage(currentEmails, limits.maxEmailsPerMonth)}%` }}
            />
          </div>
        </div>

        {/* Campaigns Usage */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Campaigns This Month</span>
            <span className="text-sm text-gray-500">
              {currentCampaigns.toLocaleString()} / {formatLimit(limits.maxCampaignsPerMonth)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(getUsagePercentage(currentCampaigns, limits.maxCampaignsPerMonth))}`}
              style={{ width: `${getUsagePercentage(currentCampaigns, limits.maxCampaignsPerMonth)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Upgrade Prompt for Free Users */}
      {subscription?.plan === 'free' && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">Upgrade to Pro</p>
              <p className="text-xs text-blue-700">Get unlimited contacts, emails, and campaigns</p>
            </div>
            <button 
              onClick={() => window.open('/pricing', '_blank')}
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
