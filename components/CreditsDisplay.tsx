'use client'

import { useState, useEffect } from 'react'
import { CreditCardIcon, BoltIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface CreditsData {
  userId: string
  totalCredits: number
  usedCredits: number
  remainingCredits: number
  subscriptionType: 'free' | 'premium' | 'enterprise'
  aiAccess: boolean
  lastResetDate: string
  nextResetDate: string
}

export default function CreditsDisplay() {
  const [credits, setCredits] = useState<CreditsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCredits()
  }, [])

  const fetchCredits = async () => {
    try {
      const response = await fetch('/api/credits?userId=default_user')
      const data = await response.json()
      
      if (data.success) {
        setCredits(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch credits:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!credits) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p className="text-gray-500">Failed to load credits</p>
      </div>
    )
  }

  const isLowCredits = credits.remainingCredits < 10
  const isPremium = credits.subscriptionType === 'premium' || credits.subscriptionType === 'enterprise'
  const isEnterprise = credits.subscriptionType === 'enterprise'

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BoltIcon className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-medium text-gray-700">Credits</h3>
        </div>
        
        {isEnterprise ? (
          <div className="flex items-center gap-1">
            <SparklesIcon className="w-4 h-4 text-gold-500" />
            <span className="text-xs font-medium text-gold-600 bg-gold-50 px-2 py-1 rounded-full">
              Enterprise
            </span>
          </div>
        ) : isPremium ? (
          <div className="flex items-center gap-1">
            <SparklesIcon className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              Premium
            </span>
          </div>
        ) : (
          <span className="text-xs text-gray-500">Free Plan</span>
        )}
      </div>

      <div className="space-y-3">
        {/* 积分显示 */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {isEnterprise ? '∞' : credits.remainingCredits}
          </span>
          <div className="text-right">
            <p className="text-xs text-gray-500">
              {isEnterprise ? 'Unlimited' : `${credits.remainingCredits}/${credits.totalCredits}`}
            </p>
            {!isEnterprise && (
              <p className="text-xs text-gray-400">
                Resets {new Date(credits.nextResetDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* 积分进度条 */}
        {!isEnterprise && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isLowCredits ? 'bg-red-500' : isPremium ? 'bg-purple-500' : 'bg-blue-500'
              }`}
              style={{ width: `${(credits.remainingCredits / credits.totalCredits) * 100}%` }}
            ></div>
          </div>
        )}

        {/* 低积分警告 */}
        {isLowCredits && !isPremium && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-sm text-red-700">
                Low credits! Only {credits.remainingCredits} remaining.
              </p>
            </div>
            <p className="text-xs text-red-600 mt-1">
              Each email costs 5 credits. Upgrade to Premium for 500 credits/month!
            </p>
          </div>
        )}

        {/* AI助手状态 */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <SparklesIcon className={`w-4 h-4 ${credits.aiAccess ? 'text-purple-500' : 'text-gray-400'}`} />
            <span className="text-sm text-gray-600">AI Assistant</span>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            credits.aiAccess 
              ? 'text-purple-600 bg-purple-50' 
              : 'text-gray-500 bg-gray-50'
          }`}>
            {credits.aiAccess ? 'Available' : 'Premium Only'}
          </span>
        </div>

        {/* 升级按钮 */}
        {!isPremium && (
          <button className="w-full mt-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2">
            <CreditCardIcon className="w-4 h-4" />
            Upgrade to Premium
          </button>
        )}
      </div>
    </div>
  )
}
