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
        '100+ email templates (FREE forever)',
        '10 AI credits per month (3 AI generations)',
        '500 contacts',
        'Unlimited campaigns',
        'Standard support',
        'Contact import (CSV)',
        'Basic analytics',
        'Email preview & testing',
        'All templates free to use & export'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Unlimited AI power for growing businesses',
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        '100+ email templates (FREE forever)',
        '5,000 AI credits per month (1,600+ generations)',
        'Unlimited contacts',
        'Unlimited campaigns',
        'AI Email Assistant & Content Generation',
        'Advanced Analytics & ROI Tracking',
        'Email Scheduling & Time Optimization',
        'A/B Testing (5 variants)',
        'Contact Segmentation & Targeting',
        'Custom Branding & White-label',
        'Bulk Recipient Management',
        'Email Automation (10 workflows)',
        'Smart Send Time Optimization',
        'Priority Support (24h response)',
        'All free plan features included'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Complete solution for large organizations',
      monthlyPrice: null,
      yearlyPrice: null,
      features: [
        '100+ email templates (FREE forever)',
        'Custom AI credits allocation',
        'Unlimited contacts & campaigns',
        'Advanced AI features & custom training',
        'Dedicated account manager',
        'Custom analytics & reporting',
        'A/B testing (unlimited variants)',
        'White-label solution',
        'API access & custom integrations',
        'Email automation (unlimited workflows)',
        'Custom email templates',
        'SLA guarantee (99.9% uptime)',
        'Custom onboarding & training',
        'Advanced security features',
        'Multi-user access & permissions',
        'Multi-domain support',
        'Predictive analytics',
        'Custom dashboard',
        'Priority 24/7 support',
        'All premium features included'
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
            Simple Pricing, Powerful Features
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            All 100+ templates are completely free. Only AI generation uses credits. Start free, upgrade for unlimited AI power.
          </p>
          
          {/* AI积分系统说明 */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 max-w-3xl mx-auto mb-8 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">How AI Credits Work</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                <div className="font-bold text-gray-900 text-base mb-1">🎨 Templates</div>
                <div className="text-2xl font-bold text-green-600 mb-1">FREE</div>
                <div className="text-xs text-gray-600">100+ professional templates<br/>Use & export unlimited</div>
              </div>
              <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                <div className="font-bold text-gray-900 text-base mb-1">⚡ Free Plan</div>
                <div className="text-2xl font-bold text-blue-600 mb-1">10 Credits</div>
                <div className="text-xs text-gray-600">3 AI generations/month<br/>(3 credits per generation)</div>
              </div>
              <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                <div className="font-bold text-gray-900 text-base mb-1">🚀 Premium</div>
                <div className="text-2xl font-bold text-purple-600 mb-1">5,000 Credits</div>
                <div className="text-xs text-gray-600">1,600+ AI generations/month<br/>Unlimited everything else</div>
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
                How does the AI credit system work?
              </h3>
              <p className="text-gray-600">
                AI credits are only used for AI-powered email generation. Each AI generation costs 3 credits. All 100+ email templates are completely free to use and export - no credits needed! Free users get 10 credits per month (3 AI generations). Premium users get 5,000 credits per month (1,600+ AI generations).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are email templates really free?
              </h3>
              <p className="text-gray-600">
                Yes! All 100+ professional email templates are completely free to use, customize, and export - forever. You can create unlimited campaigns using templates without spending any credits. Credits are only needed for AI-powered content generation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is AI email generation?
              </h3>
              <p className="text-gray-600">
                Our AI can automatically write personalized email content based on your description. Just tell the AI what you want (e.g., "product launch announcement" or "holiday sale"), and it will generate professional email copy for you. This feature costs 3 credits per generation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I run out of AI credits?
              </h3>
              <p className="text-gray-600">
                If you run out of AI credits on the free plan, you can still use all 100+ templates for free. You'll just need to wait until next month for your AI credits to reset, or upgrade to Premium for 5,000 monthly AI credits. You'll always have access to free templates!
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
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900 font-semibold">Email Templates</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">✅ 100+ FREE</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">✅ 100+ FREE</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">AI Credits per Month</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">10 (3 generations)</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">5,000 (1,600+ generations)</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">AI Content Generation</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">✅ Limited</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">✅ Unlimited</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">Contacts</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">500</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">Unlimited</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">Campaigns</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">Unlimited</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">Contact Import (CSV)</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">✅</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4 text-sm text-gray-900">A/B Testing</td>
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600">❌</td>
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
                  <td className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-600 bg-purple-50">Priority (24h)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}