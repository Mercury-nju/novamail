'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for trying out email marketing',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        '50 credits per month (10 emails)',
        '5 professional email templates',
        '100 contacts',
        '5 campaigns per month',
        'Standard support',
        'Contact import (CSV)',
        'Basic analytics',
        'Email preview & testing'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Advanced features for growing businesses',
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        '10,000 emails per month',
        'AI Email Assistant & Content Generation',
        'Professional email templates',
        'Advanced Analytics & ROI Tracking',
        'Email Scheduling & Time Optimization',
        'A/B Testing (5 variants)',
        'Contact Segmentation & Targeting',
        'Custom Branding & White-label',
        'Bulk Recipient Management',
        'Email Automation (10 workflows)',
        'Mobile App Access',
        'Smart Send Time Optimization',
        'Advanced Contact Management',
        'Email Performance Insights',
        'Priority Support (24h response)',
        'Marketing Academy Access'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Complete email marketing solution for large organizations',
      monthlyPrice: null,
      yearlyPrice: null,
      features: [
        'Unlimited emails',
        'Advanced AI Features & Custom Training',
        'Unlimited Professional Templates',
        'Unlimited Contacts & Campaigns',
        'Dedicated Account Manager',
        'Custom Analytics & Reporting',
        'Advanced Email Scheduling',
        'A/B Testing (unlimited variants)',
        'White-label Solution',
        'API Access & Custom Integrations',
        'Email Automation (unlimited workflows)',
        'Custom Email Templates',
        'SLA Guarantee (99.9% uptime)',
        'Custom Onboarding & Training',
        'Advanced Security Features',
        'Multi-user Access & Permissions',
        'Custom Mobile App',
        'Multi-domain Support',
        'Advanced Performance Analytics',
        'Predictive Analytics',
        'Advanced Contact Scoring',
        'Custom Dashboard',
        'Brand Asset Management',
        'Advanced Workflow Builder',
        'Real-time Notifications',
        'Exclusive Enterprise Resources'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const checkLoginStatus = () => {
    // 暂时总是返回true，因为用户已经登录了
    // 实际部署时应该使用正确的登录状态检查
    return true;
  };

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') {
      router.push('/register');
    } else if (planId === 'enterprise') {
      router.push('/contact');
    } else {
      // 检查用户是否已登录
      const isLoggedIn = checkLoginStatus();
      
      if (!isLoggedIn) {
        // 未登录用户跳转到登录页面
        router.push('/login?redirect=/pricing');
      } else {
        // 已登录用户直接跳转到Creem.io支付页面
        const customerEmail = mounted ? (
          localStorage.getItem('user-email') || 
          sessionStorage.getItem('user-email') || 
          'user@example.com'
        ) : 'user@example.com';
        
        // 根据选择的计费周期跳转到对应的支付页面
        const checkoutUrl = billingCycle === 'yearly' 
          ? 'https://www.creem.io/payment/prod_3ulmbn45cEhsQX5yQlBMOr'
          : 'https://www.creem.io/payment/prod_1PTunmBSWBQRUyJjM6g90r';
        
        // 直接跳转到Creem.io支付页面
        window.location.href = checkoutUrl;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
                NovaMail
              </Link>
            <div className="flex items-center space-x-4">
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Credit-based pricing that scales with you
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Send emails with our credit system. Each email costs 5 credits. Start free, upgrade when you need more.
          </p>
          
          {/* 积分系统说明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-900">How Credits Work</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
              <div className="text-center">
                <div className="font-semibold">1 Email = 5 Credits</div>
                <div className="text-xs text-blue-600">Simple pricing</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">Free: 50 Credits/Month</div>
                <div className="text-xs text-blue-600">10 emails included</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">Premium: Unlimited</div>
                <div className="text-xs text-blue-600">Send as much as you want</div>
              </div>
            </div>
          </div>
            
            {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
                </button>
            <span className={`ml-3 ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Yearly
              <span className="ml-1 text-sm text-green-600">(Save 20%)</span>
                    </span>
          </div>
        </div>

      {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
                key={plan.id}
              className={`bg-white rounded-lg shadow-lg p-8 relative ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                        </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {plan.monthlyPrice === null ? (
                    <span className="text-lg">咨询报价</span>
                  ) : (
                    <>
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      <span className="text-lg text-gray-500">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

                <button
                  onClick={() => {
                    console.log('Button clicked for plan:', plan.id)
                    handleSubscribe(plan.id)
                  }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors cursor-pointer ${
                    plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  {plan.cta}
                </button>
                      </div>
          ))}
      </div>


      {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
            </h2>
          <div className="max-w-3xl mx-auto text-left space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards and process payments securely through Creem.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does the credit system work?
              </h3>
              <p className="text-gray-600">
                Each email you send costs 5 credits, regardless of how many recipients you include. Free users get 50 credits per month (enough for 10 emails). Premium users have unlimited credits. Credits reset monthly for free users.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the AI email assistant?
              </h3>
              <p className="text-gray-600">
                The AI assistant helps you write better emails, suggests improvements, and generates content. This feature is only available to Premium subscribers and provides personalized email marketing advice.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I send to multiple recipients with one email?
              </h3>
              <p className="text-gray-600">
                Yes! You can send to multiple recipients with a single email, and it still only costs 5 credits total. Use our bulk recipient management to import contacts via CSV or add them manually.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I run out of credits?
              </h3>
              <p className="text-gray-600">
                If you run out of credits on the free plan, you'll need to wait until next month for your credits to reset, or upgrade to Premium for unlimited credits. We'll notify you when you're running low.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="mt-16 bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Feature Comparison
            </h2>
            <p className="text-lg text-gray-600">
              See exactly what's included in each plan
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                  <th className="border border-gray-200 px-6 py-4 text-center text-sm font-semibold text-gray-900">Free</th>
                  <th className="border border-gray-200 px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-purple-50">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">Monthly Credits</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">50 (10 emails)</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">Unlimited</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">AI Email Assistant</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">❌</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">Email Templates</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">Professional</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">Professional</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">Contacts</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">100</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">Unlimited</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">Campaigns</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">10/month</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">Unlimited</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">Bulk Recipient Management</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">✅</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">CSV Import</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">✅</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">Analytics</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">Basic</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">Advanced</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">Support</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">Standard</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}