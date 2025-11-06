'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  CreditCardIcon, 
  ArrowUpIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import config from '@/lib/config'

interface UserStatus {
  name: string
  email: string
  isPremium: boolean
  credits: number
  plan: 'free' | 'premium'
  creditsUsed: number
  creditsLimit: number
}

export default function UserStatusCard() {
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUserStatus = async () => {
      try {
        const userEmail = localStorage.getItem('user-email')
        const userName = localStorage.getItem('user-name')
        
        if (!userEmail) {
          setIsLoading(false)
          return
        }

        // 尝试从API获取用户积分和订阅状态
        try {
          const response = await fetch(config.getApiUrl(`/api/user/status?email=${encodeURIComponent(userEmail)}`))
          if (response.ok) {
            const data = await response.json()
            setUserStatus({
              name: userName || userEmail,
              email: userEmail,
              isPremium: data.isPremium || false,
              credits: data.credits || config.credits.freeMonthly,
              plan: data.isPremium ? 'premium' : 'free',
              creditsUsed: data.creditsUsed || 0,
              creditsLimit: data.isPremium ? config.credits.premiumMonthly : config.credits.freeMonthly
            })
          } else {
            // Fallback到默认值
            setUserStatus({
              name: userName || userEmail,
              email: userEmail,
              isPremium: false,
              credits: config.credits.freeMonthly,
              plan: 'free',
              creditsUsed: 0,
              creditsLimit: config.credits.freeMonthly
            })
          }
        } catch (apiError) {
          // API调用失败，使用默认值
          setUserStatus({
            name: userName || userEmail,
            email: userEmail,
            isPremium: false,
            credits: config.credits.freeMonthly,
            plan: 'free',
            creditsUsed: 0,
            creditsLimit: config.credits.freeMonthly
          })
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load user status:', error)
        setIsLoading(false)
      }
    }

    loadUserStatus()
    
    // 每30秒刷新一次
    const interval = setInterval(loadUserStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading || !userStatus) {
    return null
  }

  const creditsPercentage = (userStatus.credits / userStatus.creditsLimit) * 100
  const isLowCredits = userStatus.credits < 3 // 少于1次生成的积分
  const hasNoCredits = userStatus.credits === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* User Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{userStatus.name}</h3>
          <p className="text-sm text-gray-500">{userStatus.email}</p>
        </div>
        
        {/* Plan Badge */}
        <div className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
          userStatus.isPremium 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
            : 'bg-gray-100 text-gray-700'
        }`}>
          {userStatus.isPremium ? (
            <>
              <SparklesIcon className="w-3.5 h-3.5 mr-1" />
              Premium
            </>
          ) : (
            <>
              Free Plan
            </>
          )}
        </div>
      </div>

      {/* Credits Display */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <BoltIcon className="w-4 h-4 mr-1.5 text-yellow-500" />
            <span>AI Credits</span>
          </div>
          <span className={`text-sm font-bold ${
            hasNoCredits ? 'text-red-600' : 
            isLowCredits ? 'text-orange-600' : 
            'text-gray-900'
          }`}>
            {userStatus.credits} / {userStatus.creditsLimit}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${creditsPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`h-full rounded-full ${
              hasNoCredits ? 'bg-red-500' :
              isLowCredits ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
              'bg-gradient-to-r from-yellow-400 to-yellow-500'
            }`}
          />
        </div>
        
        {/* Credits Info */}
        <p className="text-xs text-gray-500 mt-2">
          {userStatus.isPremium ? (
            `${userStatus.creditsLimit} credits per month`
          ) : (
            `3 credits = 1 AI email generation`
          )}
        </p>
      </div>

      {/* Status Messages */}
      {hasNoCredits && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-start">
            <ExclamationCircleIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-900">Out of Credits</p>
              <p className="text-xs text-red-700 mt-1">
                Upgrade to Premium to continue using AI email generation.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {isLowCredits && !hasNoCredits && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg"
        >
          <div className="flex items-start">
            <ExclamationCircleIcon className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-orange-900">Low Credits</p>
              <p className="text-xs text-orange-700 mt-1">
                You have {Math.floor(userStatus.credits / 3)} AI generation{Math.floor(userStatus.credits / 3) !== 1 ? 's' : ''} remaining.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {!userStatus.isPremium && !hasNoCredits && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <div className="flex items-start">
            <CheckCircleIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900">Free Plan Active</p>
              <p className="text-xs text-blue-700 mt-1">
                All templates are free. AI generation uses credits.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        {!userStatus.isPremium && (
          <Link href="/pricing">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center transition-all shadow-md"
            >
              <ArrowUpIcon className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </motion.button>
          </Link>
        )}
        
        <Link href="/dashboard/billing">
          <button className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center transition-all">
            <CreditCardIcon className="w-4 h-4 mr-2" />
            {userStatus.isPremium ? 'Manage Subscription' : 'View Billing'}
          </button>
        </Link>
      </div>
    </motion.div>
  )
}

