'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [planId, setPlanId] = useState('');
  const [email, setEmail] = useState('');
  const [isActivating, setIsActivating] = useState(true);
  const [activationStatus, setActivationStatus] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const plan = searchParams.get('plan');
    const emailParam = searchParams.get('email');
    
    if (plan) setPlanId(plan);
    if (emailParam) setEmail(emailParam);
    
    // 激活用户权益
    activateUserSubscription(plan || 'pro', emailParam || '');
  }, [searchParams]);

  const activateUserSubscription = async (plan: string, userEmail: string) => {
    try {
      setIsActivating(true);
      
      // 获取用户邮箱
      const userEmailFromStorage = userEmail || 
        (mounted ? (
          localStorage.getItem('user-email') || 
          sessionStorage.getItem('user-email') || 
          'user@example.com'
        ) : 'user@example.com');

      // 调用支付成功回调API
      const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/payment/success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmailFromStorage,
          subscriptionId: 'creem_' + Date.now(),
          planId: plan,
          amount: 19,
          currency: 'USD'
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // 更新本地存储的订阅状态
        const subscriptionData = {
          email: userEmailFromStorage,
          plan: plan,
          status: 'active',
          activatedAt: new Date().toISOString(),
          expiresAt: null, // 买断制，永不过期
          features: {
            maxContacts: plan === 'pro' ? -1 : 500, // -1 表示无限制
            maxEmailsPerMonth: plan === 'pro' ? -1 : 1000,
            hasAdvancedTemplates: plan === 'pro',
            hasAITeatures: true,
            hasAnalytics: true,
            hasAPIAccess: plan === 'pro',
            hasWebhookAccess: plan === 'pro',
            hasCustomBranding: plan === 'pro'
          }
        };

        localStorage.setItem('user-subscription', JSON.stringify(subscriptionData));
        localStorage.setItem('user-plan', plan);
        localStorage.setItem('subscription-status', 'active');
        
        setActivationStatus('success');
        console.log('Subscription activated successfully:', subscriptionData);
      } else {
        throw new Error('Failed to activate subscription');
      }
    } catch (error) {
      console.error('Subscription activation error:', error);
      setActivationStatus('error');
    } finally {
      setIsActivating(false);
    }
  };

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
          {isActivating ? '🔄 Activating Subscription...' : activationStatus === 'success' ? '🎉 Payment Successful!' : '❌ Activation Failed'}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {isActivating 
            ? 'Please wait while we activate your subscription...'
            : activationStatus === 'success'
            ? `Thank you for your subscription! Your NovaMail ${planId} plan has been activated.`
            : 'There was an issue activating your subscription. Please contact support.'
          }
        </p>

        {/* Plan Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Subscription Details</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Plan:</strong> {planId}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Status:</strong> <span className="text-green-600">Activated</span></p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            href="/dashboard"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
          
          <Link 
            href="/dashboard/billing"
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Billing
          </Link>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This is a mock payment page. In production, users will be redirected to the real Creem.io payment page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment results...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
