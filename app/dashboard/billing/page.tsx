'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CreditsData {
  remainingCredits: number
  totalCredits: number
  subscriptionType: 'free' | 'premium'
  aiAccess: boolean
  emailsSent: number
  lastResetDate: string
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  description: string
}

export default function BillingPage() {
  const router = useRouter()
  const [credits, setCredits] = useState<CreditsData | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  useEffect(() => {
    fetchCreditsData()
  }, [])

  const fetchCreditsData = async () => {
    try {
      setLoading(true)
      
      // 获取用户信用数据
      const response = await fetch('/api/credits?userId=default_user')
      
      if (response.ok) {
        const data = await response.json()
        setCredits({
          remainingCredits: data.remainingCredits,
          totalCredits: data.totalCredits,
          subscriptionType: data.subscriptionType,
          aiAccess: data.aiAccess,
          emailsSent: Math.floor((data.totalCredits - data.remainingCredits) / 5),
          lastResetDate: new Date().toISOString()
        })
      } else {
        // 默认免费用户数据
        setCredits({
          remainingCredits: 50,
          totalCredits: 50,
          subscriptionType: 'free',
          aiAccess: false,
          emailsSent: 0,
          lastResetDate: new Date().toISOString()
        })
      }
    } catch (error) {
      console.error('Failed to fetch credits data:', error)
      // 错误时显示免费用户数据
      setCredits({
        remainingCredits: 50,
        totalCredits: 50,
        subscriptionType: 'free',
        aiAccess: false,
        emailsSent: 0,
        lastResetDate: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  const getCreditsUsagePercentage = () => {
    if (!credits) return 0
    if (credits.subscriptionType === 'premium') return 0 // 无限信用
    return Math.round(((credits.totalCredits - credits.remainingCredits) / credits.totalCredits) * 100)
  }

  const getPlanColor = (planType: string) => {
    switch (planType) {
      case 'premium': return 'bg-blue-100 text-blue-800'
      case 'free': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!credits) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No credits data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Credits & Usage</h1>
          <p className="text-gray-600">Manage your credits and view email usage</p>
        </div>
        {credits.subscriptionType === 'free' && (
          <button 
            onClick={() => router.push('/pricing')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Upgrade to Premium
          </button>
        )}
      </div>

      {/* Current Plan */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
            <p className="text-gray-600">Your active subscription and credit details</p>
          </div>
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPlanColor(credits.subscriptionType)}`}>
            {credits.subscriptionType.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-600">Plan</p>
            <p className="text-2xl font-bold text-gray-900">
              {credits.subscriptionType === 'premium' ? 'Premium' : 'Free'}
            </p>
            <p className="text-sm text-gray-500">
              {credits.subscriptionType === 'premium' ? '$19/month' : 'Free plan'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Credits Remaining</p>
            <p className="text-2xl font-bold text-gray-900">
              {credits.subscriptionType === 'premium' ? '∞' : credits.remainingCredits}
            </p>
            <p className="text-sm text-gray-500">
              {credits.subscriptionType === 'premium' ? 'Unlimited' : `${credits.remainingCredits} credits left`}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Emails Sent</p>
            <p className="text-2xl font-bold text-gray-900">{credits.emailsSent}</p>
            <p className="text-sm text-gray-500">5 credits per email</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">AI Assistant</p>
            <p className="text-2xl font-bold text-gray-900">
              {credits.aiAccess ? '✓' : '✗'}
            </p>
            <p className="text-sm text-gray-500">
              {credits.aiAccess ? 'Available' : 'Premium only'}
            </p>
          </div>
        </div>

        {/* Credits Usage Bar */}
        {credits.subscriptionType === 'free' && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Credits Usage</span>
              <span>{getCreditsUsagePercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getCreditsUsagePercentage() > 80 ? 'bg-red-500' : getCreditsUsagePercentage() > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(getCreditsUsagePercentage(), 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Billing History */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Billing History</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                      <div className="text-sm text-gray-500">{invoice.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getInvoiceStatusColor(invoice.status)}`}>
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
            <p className="text-gray-600">Manage your payment information</p>
          </div>
          {credits?.subscriptionType === 'free' ? (
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Payment Method
            </button>
          ) : (
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Update Payment Method
            </button>
          )}
        </div>

        {credits?.subscriptionType === 'free' ? (
          <div className="text-center py-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Method</h3>
              <p className="text-gray-600 mb-4">You're currently on the free plan. Add a payment method to upgrade to a paid plan.</p>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-500">Expires 12/25</p>
            </div>
          </div>
        )}
      </div>

      {/* Plan Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Available Plans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`border rounded-lg p-6 ${credits.subscriptionType === 'free' ? 'border-2 border-primary-500 relative' : 'border-gray-200'}`}>
            {credits.subscriptionType === 'free' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-3 py-1 text-sm font-semibold rounded-full">Current</span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Plan</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">$0<span className="text-lg text-gray-500">/month</span></p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 50 credits per month (10 emails)</li>
              <li>• Professional email templates</li>
              <li>• 100 contacts</li>
              <li>• 10 campaigns per month</li>
              <li>• Standard support</li>
              <li>• Contact import (CSV)</li>
              <li>• Basic analytics</li>
              <li>• Email preview & testing</li>
            </ul>
            <button className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
              credits.subscriptionType === 'free' 
                ? 'bg-primary-600 text-white cursor-default' 
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              {credits.subscriptionType === 'free' ? 'Current Plan' : 'Downgrade'}
            </button>
          </div>

          <div className={`border rounded-lg p-6 ${credits.subscriptionType === 'premium' ? 'border-2 border-primary-500 relative' : 'border-gray-200'}`}>
            {credits.subscriptionType === 'premium' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-3 py-1 text-sm font-semibold rounded-full">Current</span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Plan</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">$19<span className="text-lg text-gray-500">/month</span></p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 50,000 credits (10,000 emails per month)</li>
              <li>• AI email assistant & content generation</li>
              <li>• Professional email templates</li>
              <li>• Unlimited contacts</li>
              <li>• Unlimited campaigns</li>
              <li>• Priority support</li>
              <li>• Advanced analytics & reporting</li>
              <li>• Email scheduling</li>
              <li>• A/B testing</li>
              <li>• Contact segmentation</li>
              <li>• Custom branding</li>
              <li>• Bulk recipient management</li>
            </ul>
            <button 
              onClick={() => router.push('/pricing')}
              className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
                credits.subscriptionType === 'premium' 
                  ? 'bg-primary-600 text-white cursor-default' 
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {credits.subscriptionType === 'premium' ? 'Current Plan' : 'Upgrade to Premium'}
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upgrade to Premium</h3>
            <p className="text-gray-600 mb-6">
              Get unlimited credits, AI assistant, and advanced features for just $19/month.
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowUpgradeModal(false)
                  router.push('/pricing')
                }}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
