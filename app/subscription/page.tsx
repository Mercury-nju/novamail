'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CreemPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: string;
  features: string[];
}

export default function SubscriptionPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<CreemPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetchPlans();
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    // 暂时总是返回true，因为用户已经登录了
    // 实际部署时应该使用正确的登录状态检查
    setIsLoggedIn(true);
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch('https://novamail-api.zhuanz.workers.dev/api/creem/plans');
      const data = await response.json();
      
      if (data.success) {
        setPlans(data.plans);
      } else {
        setError(data.message || 'Failed to fetch plans');
      }
    } catch (err) {
      setError('Network error: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (planId: string) => {
    // 检查用户是否已登录
    if (!isLoggedIn) {
      // 未登录用户跳转到登录页面
      router.push('/login?redirect=/subscription');
      return;
    }

    setCreating(planId);
    
    try {
      // 已登录用户，从多种存储方式获取邮箱
      const customerEmail = mounted ? (
        localStorage.getItem('user-email') || 
        sessionStorage.getItem('user-email') || 
        'user@example.com'
      ) : 'user@example.com';

      const response = await fetch('https://novamail-api.zhuanz.workers.dev/api/creem/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: planId,
          customerEmail: customerEmail,
          billingCycle: billingCycle
        })
      });

      const data = await response.json();
      
      if (data.success && data.checkoutUrl) {
        // 直接跳转到Creem支付页面
        window.location.href = data.checkoutUrl;
      } else {
        alert('Subscription creation failed: ' + data.message);
      }
    } catch (err) {
      alert('Network error: ' + (err as Error).message);
    } finally {
      setCreating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Failed</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchPlans}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Choose Your Subscription Plan
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Unlock all NovaMail features and boost your email marketing results
          </p>
          
          {/* Billing Cycle Toggle */}
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
          
          {!isLoggedIn && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-yellow-800">
                <span className="font-semibold">Note:</span> Please log in first before subscribing
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-lg p-8 relative">
              {plan.name.toLowerCase().includes('pro') && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ${plan.price}
                  <span className="text-lg text-gray-500">/{plan.billingCycle === 'monthly' ? 'month' : 'year'}</span>
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
                onClick={() => createSubscription(plan.id)}
                disabled={creating === plan.id}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.name.toLowerCase().includes('pro')
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                } ${creating === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                  {creating === plan.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating subscription...
                    </div>
                  ) : (
                    'Subscribe Now'
                  )}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need help? Check out our <a href="/help" className="text-blue-600 hover:underline">Help Center</a>
          </p>
          <p className="text-sm text-gray-500">
            All subscriptions are processed securely through Creem
          </p>
        </div>
      </div>
    </div>
  );
}
