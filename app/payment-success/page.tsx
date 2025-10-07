'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [planId, setPlanId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const plan = searchParams.get('plan');
    const emailParam = searchParams.get('email');
    
    if (plan) setPlanId(plan);
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          🎉 支付成功！
        </h1>
        
        <p className="text-gray-600 mb-6">
          感谢您的订阅！您的NovaMail {planId} 计划已激活。
        </p>

        {/* Plan Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">订阅详情</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>计划:</strong> {planId}</p>
            <p><strong>邮箱:</strong> {email}</p>
            <p><strong>状态:</strong> <span className="text-green-600">已激活</span></p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            href="/dashboard"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            进入控制台
          </Link>
          
          <Link 
            href="/dashboard/billing"
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            查看账单
          </Link>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>注意:</strong> 这是模拟支付页面。实际部署时会跳转到真实的Creem.io支付页面。
          </p>
        </div>
      </div>
    </div>
  );
}
