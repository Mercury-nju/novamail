'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import BackgroundAnimations from '@/components/BackgroundAnimations'
import {
  CheckIcon,
  XMarkIcon,
  StarIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

export default function PricingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'Up to 500 contacts',
        'Up to 1,000 emails per month',
        'Simple email templates',
        'AI email generation',
        'SMTP configuration',
        'Basic analytics',
        'Email support',
        'Contact import (CSV, TXT)',
        'Basic contact groups'
      ],
      limitations: [
        'Limited to 2 campaigns per month',
        'No professional templates',
        'No advanced segmentation',
        'No Excel import',
        'NovaMail branding'
      ],
      popular: false,
      cta: 'Get Started Free',
      ctaLink: '/register'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Best for growing businesses',
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        'Up to 5,000 contacts',
        'Up to 25,000 emails per month',
        'All email templates (Simple + Professional)',
        'AI email generation',
        'Advanced analytics & reporting',
        'Priority email support',
        'Contact import (CSV, TXT, Excel)',
        'Advanced contact groups & segmentation',
        'Campaign drafts & scheduling',
        'Email preview & testing',
        'SMTP configuration',
        'Remove NovaMail branding'
      ],
      limitations: [],
      popular: false,
      cta: 'Start Pro Trial',
      ctaLink: '/register?plan=pro'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      consult: true,
      features: [
        'Unlimited contacts',
        'Unlimited emails',
        'All email templates + Custom templates',
        'AI email generation',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'All import formats + API integration',
        'Advanced segmentation & automation',
        'Campaign A/B testing',
        'White-label solution',
        'Custom domain & branding',
        'Priority phone support',
        'SSO & advanced security',
        'Custom integrations'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales',
      ctaLink: '/contact'
    }
  ]

  const faqs = [
    {
      question: 'What is AI email generation?',
      answer: 'Our AI email generation uses advanced AI technology to automatically create personalized email content based on your campaign theme, purpose, and business information. It works for both simple and professional templates.'
    },
    {
      question: 'What are professional templates?',
      answer: 'Professional templates are premium, visually-styled email designs including Modern Promo, Newsletter, E-commerce, and Event Invite templates. These are available in Pro and Enterprise plans.'
    },
    {
      question: 'Can I use my own SMTP server?',
      answer: 'Yes! All plans allow you to configure your own SMTP settings, so you can send emails from your own domain and email address.'
    },
    {
      question: 'What file formats can I import contacts from?',
      answer: 'Free plan supports CSV and TXT files. Pro and Enterprise plans also support Excel files (.xlsx, .xls). Enterprise plans include API integration for advanced imports.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your billing period.'
    }
  ]

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice
  }

  const getYearlyDiscount = (plan: typeof plans[0]) => {
    if (!plan.monthlyPrice || plan.monthlyPrice === 0) return 0
    const yearlyEquivalent = plan.monthlyPrice * 12
    return Math.round(((yearlyEquivalent - plan.yearlyPrice) / yearlyEquivalent) * 100)
  }

  const handleBillingCycleChange = (newCycle: 'monthly' | 'yearly') => {
    setBillingCycle(newCycle)
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      router.push('/login')
      return
    }

    if (planId === 'free') {
      router.push('/register')
      return
    }

    if (planId === 'enterprise') {
      router.push('/contact')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/paddle/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: planId,
          billingCycle: billingCycle
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        throw new Error(data.error || 'Failed to create subscription')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      toast.error('Failed to start subscription process')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <BackgroundAnimations variant="pricing" particleCount={10} />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                NovaMail
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Simple, Transparent
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-primary-600 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent"
              >
                {" "}Pricing
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto"
            >
              Choose the perfect plan for your email marketing needs. Start free, upgrade when you're ready.
            </motion.p>
            
            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center mb-0"
            >
              <div className="bg-gray-100 p-1 rounded-lg flex">
                <button
                  type="button"
                  onClick={() => handleBillingCycleChange('monthly')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer select-none ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => handleBillingCycleChange('yearly')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 relative cursor-pointer select-none ${
                    billingCycle === 'yearly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Yearly
                  {billingCycle === 'yearly' && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center px-1.5 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Save 17%
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>


      {/* Pricing Cards */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 relative"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                    <span>
                      {plan.id === 'free' ? 'Free' : plan.consult ? 'Custom' : `$${getPrice(plan)}`}
                      {plan.id !== 'free' && !plan.consult && (
                        <span className="text-lg font-normal text-gray-500">
                          /{billingCycle === 'yearly' ? 'year' : 'month'}
                        </span>
                      )}
                    </span>
                    {billingCycle === 'yearly' && plan.monthlyPrice && plan.monthlyPrice > 0 && !plan.consult && (
                      <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Save {getYearlyDiscount(plan)}%
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.slice(0, 4).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 4 && (
                    <div className="text-xs text-gray-500">
                      + {plan.features.length - 4} more features
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.id === 'free'
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : plan.consult
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isLoading ? 'Processing...' : plan.cta}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Compare All Features</h2>
            <p className="text-lg text-gray-600">See what's included in each plan</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="space-y-2">
                        <div className="text-lg font-bold text-gray-900">{plan.name}</div>
                        <div className="text-sm text-gray-600">{plan.description}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { feature: 'Contacts', free: '500', pro: '5,000', enterprise: 'Unlimited' },
                  { feature: 'Emails per month', free: '1,000', pro: '25,000', enterprise: 'Unlimited' },
                  { feature: 'Campaigns per month', free: '2', pro: 'Unlimited', enterprise: 'Unlimited' },
                  { feature: 'Email templates', free: 'Simple only', pro: 'Simple + Professional', enterprise: 'All + Custom' },
                  { feature: 'AI email generation', free: 'Yes', pro: 'Yes', enterprise: 'Yes' },
                  { feature: 'Contact import', free: 'CSV, TXT', pro: 'CSV, TXT, Excel', enterprise: 'All formats + API' },
                  { feature: 'Contact groups', free: 'Basic', pro: 'Advanced', enterprise: 'Advanced + Automation' },
                  { feature: 'SMTP configuration', free: 'Yes', pro: 'Yes', enterprise: 'Yes + Custom' },
                  { feature: 'Branding', free: 'NovaMail', pro: 'Custom', enterprise: 'White-label' },
                  { feature: 'Support', free: 'Email', pro: 'Priority Email', enterprise: 'Dedicated Manager' }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">
                      {row.feature}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-center">
                      {row.free}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-center">
                      {row.pro}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 text-center">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg border border-gray-200 p-4"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-start">
                  <QuestionMarkCircleIcon className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-7">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Ready to get started?
            </h2>
            <p className="text-xl text-primary-100 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses using NovaMail to grow their email marketing
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/register"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
              >
                Start Free Trial
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/integrations" className="hover:text-white">Integrations</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
                <li><Link href="/gdpr" className="hover:text-white">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NovaMail. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
