'use client'

import { useState } from 'react'

interface PricingPlan {
  id: string
  name: string
  price: number
  emails: number
  features: string[]
  popular?: boolean
  current?: boolean
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      emails: 10, // 10 AI credits
      features: [
        '100+ email templates (FREE forever)',
        '10 AI credits per month',
        '3 AI email generations per month',
        '500 contacts',
        'Unlimited campaigns with templates',
        'Basic analytics',
        'Email support',
        'Contact import (CSV)',
        'Email preview & testing'
      ],
      current: true
    },
    {
      id: 'pro',
      name: 'Premium',
      price: billingCycle === 'monthly' ? 19 : 190,
      emails: 5000, // 5000 AI credits
      features: [
        '100+ email templates (FREE forever)',
        '5,000 AI credits per month',
        '1,600+ AI email generations per month',
        'Unlimited contacts',
        'Unlimited campaigns',
        'Advanced analytics & ROI tracking',
        'Priority support (24h response)',
        'Contact segmentation',
        'A/B testing (5 variants)',
        'Email scheduling',
        'Custom branding',
        'All free features included'
      ],
      popular: true,
      current: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 0 : 0, // Custom pricing
      emails: -1, // Custom
      features: [
        '100+ email templates (FREE forever)',
        'Custom AI credits allocation',
        'Unlimited contacts & campaigns',
        'Advanced AI features & training',
        'Custom analytics & reporting',
        'Dedicated account manager',
        'Advanced segmentation',
        'API access & integrations',
        'White-label solution',
        'SLA guarantee (99.9%)',
        'Custom onboarding & training',
        'All premium features included'
      ],
      current: false
    }
  ]

  const handleUpgrade = (planId: string) => {
    // 模拟升级逻辑
    alert(`Upgrading to ${planId} plan...`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-gray-600 mt-2">Select the perfect plan for your email marketing needs</p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
              plan.popular ? 'border-primary-500' : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-4 py-2 text-sm font-semibold rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            {plan.current && (
              <div className="absolute -top-4 right-4">
                <span className="bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                  Current Plan
                </span>
              </div>
            )}

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                {plan.id === 'enterprise' ? (
                  <span className="text-2xl font-bold text-gray-900">Consult for Price</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </>
                )}
              </div>
              <p className="text-gray-600 mt-2">
                {plan.emails === -1 ? 'Custom AI credits' : `${plan.emails} AI credits per month`}
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              {plan.current ? (
                <button
                  disabled
                  className="w-full px-6 py-3 bg-gray-100 text-gray-400 rounded-lg font-semibold cursor-not-allowed"
                >
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.id === 'free' ? 'Current Plan' : plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade to Pro'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if I exceed my email limit?</h3>
            <p className="text-gray-600">
              If you exceed your monthly email limit, we'll notify you and you can either upgrade your plan or wait until the next billing cycle.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
            <p className="text-gray-600">
              We offer a 30-day money-back guarantee for all plans. If you're not satisfied, contact our support team for a full refund.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How does the AI credit system work?</h3>
            <p className="text-gray-600">
              AI credits are only used for AI-powered email generation. Each AI generation costs 3 credits. All 100+ email templates are completely free to use and export - no credits needed! Free users get 10 credits per month (3 AI generations). Premium users get 5,000 credits per month (1,600+ AI generations).
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Are email templates really free?</h3>
            <p className="text-gray-600">
              Yes! All 100+ professional email templates are completely free to use, customize, and export - forever. You can create unlimited campaigns using templates without spending any credits. Credits are only needed for AI-powered content generation.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-600">
              Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Sales */}
      <div className="bg-primary-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
        <p className="text-gray-600 mb-6">
          Our enterprise team can create a custom plan tailored to your specific needs.
        </p>
        <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
          Contact Sales
        </button>
      </div>
    </div>
  )
}
