'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  CreditCardIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

interface Subscription {
  plan: string
  status: string
  endsAt?: string
  isActive: boolean
  canCancel: boolean
}

interface UsageStats {
  emailsSent: number
  contactsCount: number
  campaignsCount: number
  emailsLimit: number
  contactsLimit: number
  campaignsLimit: number
}

export default function BillingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [usage, setUsage] = useState<UsageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [canceling, setCanceling] = useState(false)
  const [reactivating, setReactivating] = useState(false)

  useEffect(() => {
    if (session) {
      fetchSubscriptionData()
    }
  }, [session])

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch('/api/user/subscription')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setSubscription(data.subscription)
      setUsage(data.usage)
    } catch (error) {
      console.error('Failed to fetch subscription data:', error)
      toast.error('Failed to load subscription data')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will retain access until the end of your billing period.')) {
      return
    }

    setCanceling(true)
    
    try {
      const response = await fetch('/api/paddle/cancel-subscription', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success) {
        toast.success('Subscription will be canceled at the end of the billing period')
        fetchSubscriptionData()
      } else {
        throw new Error(data.error || 'Failed to cancel subscription')
      }
    } catch (error) {
      console.error('Cancel subscription error:', error)
      toast.error('Failed to cancel subscription')
    } finally {
      setCanceling(false)
    }
  }

  const handleReactivateSubscription = async () => {
    setReactivating(true)
    
    try {
      const response = await fetch('/api/paddle/reactivate-subscription', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success) {
        toast.success('Subscription reactivated successfully')
        fetchSubscriptionData()
      } else {
        throw new Error(data.error || 'Failed to reactivate subscription')
      }
    } catch (error) {
      console.error('Reactivate subscription error:', error)
      toast.error('Failed to reactivate subscription')
    } finally {
      setReactivating(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'canceled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      case 'past_due':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
      default:
        return <XCircleIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'canceled':
        return 'text-red-600 bg-red-100'
      case 'past_due':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="mt-2 text-gray-600">Manage your subscription and billing information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscription Status */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
                {getStatusIcon(subscription?.status || 'free')}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {subscription?.plan || 'Free'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription?.status || 'free')}`}>
                    {subscription?.status || 'Free'}
                  </span>
                </div>

                {subscription?.endsAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ends at</span>
                    <span className="font-medium text-gray-900">
                      {new Date(subscription.endsAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {subscription?.plan !== 'free' && (
                  <div className="pt-4 border-t">
                    {subscription?.status === 'active' && subscription?.canCancel && (
                      <button
                        onClick={handleCancelSubscription}
                        disabled={canceling}
                        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {canceling ? (
                          <>
                            <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                            Canceling...
                          </>
                        ) : (
                          'Cancel Subscription'
                        )}
                      </button>
                    )}

                    {subscription?.status === 'canceled' && (
                      <button
                        onClick={handleReactivateSubscription}
                        disabled={reactivating}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {reactivating ? (
                          <>
                            <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                            Reactivating...
                          </>
                        ) : (
                          'Reactivate Subscription'
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Usage Statistics */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Usage This Month</h2>

              {usage && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Emails Sent</span>
                      <span>{usage.emailsSent} / {usage.emailsLimit === -1 ? '∞' : usage.emailsLimit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ 
                          width: `${usage.emailsLimit === -1 ? 0 : Math.min((usage.emailsSent / usage.emailsLimit) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Contacts</span>
                      <span>{usage.contactsCount} / {usage.contactsLimit === -1 ? '∞' : usage.contactsLimit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ 
                          width: `${usage.contactsLimit === -1 ? 0 : Math.min((usage.contactsCount / usage.contactsLimit) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Campaigns</span>
                      <span>{usage.campaignsCount} / {usage.campaignsLimit === -1 ? '∞' : usage.campaignsLimit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ 
                          width: `${usage.campaignsLimit === -1 ? 0 : Math.min((usage.campaignsCount / usage.campaignsLimit) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Upgrade CTA */}
            {subscription?.plan === 'free' && (
              <div className="mt-6 bg-primary-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Ready to upgrade?
                </h3>
                <p className="text-primary-700 mb-4">
                  Unlock more features and higher limits with our Pro plan.
                </p>
                <button
                  onClick={() => router.push('/pricing')}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  View Plans
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
