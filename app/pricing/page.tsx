'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
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
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

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
        'Custom SMTP configuration',
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
      monthlyPrice: 49,
      yearlyPrice: 490,
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
      answer: 'Yes! Pro and Enterprise plans allow you to configure your own SMTP settings, so you can send emails from your own domain and email address.'
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
    if (plan.monthlyPrice === 0) return 0
    const yearlyEquivalent = plan.monthlyPrice * 12
    return Math.round(((yearlyEquivalent - plan.yearlyPrice) / yearlyEquivalent) * 100)
  }

  // 调试函数
  const handleToggleBilling = () => {
    console.log('Current billing cycle:', billingCycle)
    const newCycle = billingCycle === 'monthly' ? 'yearly' : 'monthly'
    console.log('New billing cycle:', newCycle)
    setBillingCycle(newCycle)
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Choose the perfect plan for your email marketing needs. Start free, upgrade when you're ready.
            </motion.p>
            
            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center space-x-4 mb-12"
            >
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={handleToggleBilling}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Save up to 17%
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id
            const isHovered = hoveredPlan === plan.id
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: isSelected ? 1.05 : 1,
                  rotateY: isHovered ? 2 : 0
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  scale: { duration: 0.3 },
                  rotateY: { duration: 0.2 }
                }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlanSelect(plan.id)}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative bg-white rounded-2xl shadow-lg border-2 cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'border-primary-500 shadow-2xl shadow-primary-200' 
                    : isHovered 
                      ? 'border-primary-300 shadow-xl' 
                      : 'border-gray-200'
                } overflow-hidden`}
              >
                {isSelected && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-600 to-blue-600 text-white text-center py-2 text-sm font-medium"
                  >
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      ✨ Selected Plan
                    </motion.span>
                  </motion.div>
                )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-2"
                    animate={{ color: isSelected ? '#3B82F6' : '#111827' }}
                    transition={{ duration: 0.3 }}
                  >
                    {plan.name}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-6"
                    animate={{ opacity: isSelected ? 0.8 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {plan.description}
                  </motion.p>
                  
                  <motion.div 
                    className="mb-4"
                    animate={{ scale: isSelected ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span 
                      className="text-4xl font-bold text-gray-900"
                      animate={{ color: isSelected ? '#3B82F6' : '#111827' }}
                      transition={{ duration: 0.3 }}
                    >
                      ${getPrice(plan)}
                    </motion.span>
                    <span className="text-gray-600 ml-2">
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </motion.div>
                  
                  {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                    <motion.div 
                      className="text-sm text-gray-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="line-through">${plan.monthlyPrice}/month</span>
                      <span className="ml-2 text-green-600 font-medium">
                        Save {getYearlyDiscount(plan)}%
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={featureIndex} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: featureIndex * 0.05 }}
                    >
                      <motion.div
                        animate={{ 
                          scale: isSelected ? 1.2 : 1,
                          color: isSelected ? '#10B981' : '#10B981'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      </motion.div>
                      <motion.span 
                        className="text-gray-700"
                        animate={{ 
                          color: isSelected ? '#374151' : '#374151',
                          fontWeight: isSelected ? '500' : '400'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {feature}
                      </motion.span>
                    </motion.div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <motion.div 
                      key={limitationIndex} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (plan.features.length + limitationIndex) * 0.05 }}
                    >
                      <XMarkIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={plan.ctaLink}
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white hover:from-primary-700 hover:to-blue-700 shadow-lg'
                        : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md'
                    }`}
                  >
                    <motion.span
                      animate={{ 
                        scale: isSelected ? 1.05 : 1,
                        fontWeight: isSelected ? '600' : '500'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {plan.cta}
                    </motion.span>
                    <motion.div
                      animate={{ 
                        x: isSelected ? 4 : 0,
                        scale: isSelected ? 1.1 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>

      {/* Features Comparison */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare All Features</h2>
            <p className="text-lg text-gray-600">See what's included in each plan</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Free
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pro
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enterprise
                  </th>
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
                  { feature: 'SMTP configuration', free: 'No', pro: 'Yes', enterprise: 'Yes + Custom' },
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
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
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
