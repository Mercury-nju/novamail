'use client'

import { useState, useEffect } from 'react'

interface BillingData {
  currentPlan: string
  monthlyEmails: number
  emailsUsed: number
  nextBillingDate: string
  amount: number
  status: 'active' | 'past_due' | 'canceled'
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  description: string
}

export default function BillingPage() {
  const [billing, setBilling] = useState<BillingData | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  useEffect(() => {
    fetchBillingData()
  }, [])

  const fetchBillingData = async () => {
    try {
      setLoading(true)
      
      // 从Creem API获取真实的用户订阅数据
      const response = await fetch('https://novamail-api.zhuanz.workers.dev/api/creem/subscriptions')
      
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          const subscription = data.data
          setBilling({
            currentPlan: subscription.plan.name,
            monthlyEmails: subscription.plan.limits.emails,
            emailsUsed: 0, // 从使用统计API获取
            nextBillingDate: subscription.currentPeriodEnd,
            amount: subscription.plan.price,
            status: subscription.status
          })
          // 获取发票历史
          const invoicesResponse = await fetch('https://novamail-api.zhuanz.workers.dev/api/creem/invoices')
          if (invoicesResponse.ok) {
            const invoicesData = await invoicesResponse.json()
            setInvoices(invoicesData.data || [])
          }
        } else {
          // 如果用户没有订阅，显示免费计划
          setBilling({
            currentPlan: 'Free',
            monthlyEmails: 1000,
            emailsUsed: 0,
            nextBillingDate: '',
            amount: 0,
            status: 'active'
          })
          setInvoices([])
        }
      } else {
        // API失败时显示免费计划
        setBilling({
          currentPlan: 'Free',
          monthlyEmails: 1000,
          emailsUsed: 0,
          nextBillingDate: '',
          amount: 0,
          status: 'active'
        })
        setInvoices([])
      }
    } catch (error) {
      console.error('Failed to fetch billing data:', error)
      // 错误时显示免费计划
      setBilling({
        currentPlan: 'Free',
        monthlyEmails: 1000,
        emailsUsed: 0,
        nextBillingDate: '',
        amount: 0,
        status: 'active'
      })
      setInvoices([])
    } finally {
      setLoading(false)
    }
  }

  const getUsagePercentage = () => {
    if (!billing) return 0
    return Math.round((billing.emailsUsed / billing.monthlyEmails) * 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'past_due': return 'bg-yellow-100 text-yellow-800'
      case 'canceled': return 'bg-red-100 text-red-800'
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

  if (!billing) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No billing data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Usage</h1>
          <p className="text-gray-600">Manage your subscription and view usage</p>
        </div>
        <button 
          onClick={() => setShowUpgradeModal(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Upgrade Plan
        </button>
      </div>

      {/* Current Plan */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
            <p className="text-gray-600">Your active subscription details</p>
          </div>
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(billing.status)}`}>
            {billing.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-600">Plan</p>
            <p className="text-2xl font-bold text-gray-900">{billing.currentPlan}</p>
            <p className="text-sm text-gray-500">{billing.amount === 0 ? 'Free plan' : `$${billing.amount}/month`}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Next Billing</p>
            <p className="text-lg font-semibold text-gray-900">
              {billing.nextBillingDate ? new Date(billing.nextBillingDate).toLocaleDateString() : 'No billing'}
            </p>
            <p className="text-sm text-gray-500">{billing.amount === 0 ? 'Free plan' : `$${billing.amount}`}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Emails This Month</p>
            <p className="text-lg font-semibold text-gray-900">
              {billing.emailsUsed.toLocaleString()} / {billing.monthlyEmails.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">{getUsagePercentage()}% used</p>
          </div>
        </div>

        {/* Usage Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Email Usage</span>
            <span>{getUsagePercentage()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getUsagePercentage() > 80 ? 'bg-red-500' : getUsagePercentage() > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(getUsagePercentage(), 100)}%` }}
            ></div>
          </div>
        </div>
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
          {billing?.currentPlan === 'Free' ? (
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

        {billing?.currentPlan === 'Free' ? (
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`border rounded-lg p-6 ${billing?.currentPlan === 'Free' ? 'border-2 border-primary-500 relative' : 'border-gray-200'}`}>
            {billing?.currentPlan === 'Free' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-3 py-1 text-sm font-semibold rounded-full">Current</span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Free</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">$0<span className="text-lg text-gray-500">/month</span></p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Up to 500 contacts</li>
              <li>• Up to 1,000 emails/month</li>
              <li>• Simple email templates</li>
              <li>• AI email generation</li>
              <li>• SMTP configuration</li>
              <li>• Basic analytics</li>
              <li>• Email support</li>
            </ul>
            <button className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
              billing?.currentPlan === 'Free' 
                ? 'bg-primary-600 text-white cursor-default' 
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              {billing?.currentPlan === 'Free' ? 'Current Plan' : 'Downgrade'}
            </button>
          </div>

          <div className={`border rounded-lg p-6 ${billing?.currentPlan === 'Pro' ? 'border-2 border-primary-500 relative' : 'border-gray-200'}`}>
            {billing?.currentPlan === 'Pro' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-3 py-1 text-sm font-semibold rounded-full">Current</span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">$19<span className="text-lg text-gray-500">/month</span></p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Up to 10,000 contacts</li>
              <li>• Up to 50,000 emails/month</li>
              <li>• Advanced email templates</li>
              <li>• AI email generation</li>
              <li>• Advanced analytics</li>
              <li>• Priority support</li>
              <li>• Contact segmentation</li>
              <li>• A/B testing</li>
              <li>• Excel import support</li>
              <li>• Email scheduling</li>
              <li>• Custom branding</li>
            </ul>
            <button className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
              billing?.currentPlan === 'Pro' 
                ? 'bg-primary-600 text-white cursor-default' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}>
              {billing?.currentPlan === 'Pro' ? 'Current Plan' : 'Upgrade to Pro'}
            </button>
          </div>

          <div className={`border rounded-lg p-6 ${billing?.currentPlan === 'Enterprise' ? 'border-2 border-primary-500 relative' : 'border-gray-200'}`}>
            {billing?.currentPlan === 'Enterprise' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-3 py-1 text-sm font-semibold rounded-full">Current</span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">Custom<span className="text-lg text-gray-500"> pricing</span></p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Unlimited contacts</li>
              <li>• Unlimited emails</li>
              <li>• Custom templates</li>
              <li>• Advanced analytics</li>
              <li>• Dedicated support</li>
              <li>• White-label solution</li>
              <li>• Custom integrations</li>
            </ul>
            <button className="w-full mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upgrade Your Plan</h3>
            <p className="text-gray-600 mb-6">
              Contact our sales team to discuss enterprise features and custom pricing.
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
