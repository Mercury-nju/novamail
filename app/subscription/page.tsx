'use client';

import { useState, useEffect } from 'react';

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
  const [plans, setPlans] = useState<CreemPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/creem/plans');
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
    setCreating(planId);
    
    try {
      // 获取用户邮箱（这里简化处理，实际应该从用户会话获取）
      const customerEmail = prompt('请输入您的邮箱地址:');
      if (!customerEmail) {
        setCreating(null);
        return;
      }

      const response = await fetch('/api/creem/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: planId,
          customerEmail: customerEmail,
          billingCycle: 'monthly'
        })
      });

      const data = await response.json();
      
      if (data.success && data.checkoutUrl) {
        // 跳转到Creem支付页面
        window.location.href = data.checkoutUrl;
      } else {
        alert('创建订阅失败: ' + data.message);
      }
    } catch (err) {
      alert('网络错误: ' + (err as Error).message);
    } finally {
      setCreating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">正在加载订阅计划...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">加载失败</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchPlans}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            重试
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
            🚀 选择您的订阅计划
          </h1>
          <p className="text-xl text-gray-600">
            解锁NovaMail的全部功能，提升您的邮件营销效果
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-lg p-8 relative">
              {plan.name.toLowerCase().includes('pro') && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    最受欢迎
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ${plan.price}
                  <span className="text-lg text-gray-500">/{plan.billingCycle === 'monthly' ? '月' : '年'}</span>
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
                    创建订阅中...
                  </div>
                ) : (
                  '立即订阅'
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            需要帮助？查看我们的 <a href="/help" className="text-blue-600 hover:underline">帮助中心</a>
          </p>
          <p className="text-sm text-gray-500">
            所有订阅都通过Creem安全支付处理
          </p>
        </div>
      </div>
    </div>
  );
}
