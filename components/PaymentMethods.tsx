'use client'

import { useState, useEffect } from 'react'
import { PaymentProvider, paymentService } from '@/lib/payment-service'

interface PaymentMethodsProps {
  onSelect: (method: PaymentProvider) => void
  selectedMethod?: PaymentProvider
  userRegion?: string
  className?: string
}

export default function PaymentMethods({ 
  onSelect, 
  selectedMethod, 
  userRegion = 'overseas',
  className = '' 
}: PaymentMethodsProps) {
  const [availableMethods, setAvailableMethods] = useState<PaymentProvider[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 获取推荐的支付方式
    const recommended = paymentService.getRecommendedPaymentMethods(userRegion)
    setAvailableMethods(recommended)
    
    // 如果没有选中的支付方式，自动选择第一个推荐方式
    if (!selectedMethod && recommended.length > 0) {
      onSelect(recommended[0])
    }
    
    setLoading(false)
  }, [userRegion, selectedMethod, onSelect])

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Select Payment Method
      </h3>
      
      {availableMethods.map((method) => {
        const methodInfo = paymentService.getPaymentMethodInfo(method)
        const isSelected = selectedMethod === method
        
        return (
          <div
            key={method}
            onClick={() => onSelect(method)}
            className={`
              relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
              ${isSelected 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }
            `}
          >
            <div className="flex items-center space-x-4">
              {/* 支付方式图标 */}
              <div className="flex-shrink-0">
                {method === PaymentProvider.ALIPAY && (
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Alipay</span>
                  </div>
                )}
                {method === PaymentProvider.WECHAT && (
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">WeChat</span>
                  </div>
                )}
                {method === PaymentProvider.STRIPE && (
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">CARD</span>
                  </div>
                )}
              </div>
              
              {/* 支付方式信息 */}
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium text-gray-900">
                  {methodInfo.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {methodInfo.description}
                </p>
              </div>
              
              {/* 选中状态指示器 */}
              <div className="flex-shrink-0">
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                  }
                `}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            
            {/* 特殊提示 */}
            {method === PaymentProvider.ALIPAY && userRegion === 'china' && (
              <div className="mt-3 p-2 bg-blue-100 rounded text-sm text-blue-800">
                💡 Recommended: Alipay has the most users and highest success rate
              </div>
            )}
            {method === PaymentProvider.WECHAT && userRegion === 'china' && (
              <div className="mt-3 p-2 bg-green-100 rounded text-sm text-green-800">
                📱 Convenient: WeChat QR code payment, fast and easy
              </div>
            )}
            {method === PaymentProvider.STRIPE && userRegion !== 'china' && (
              <div className="mt-3 p-2 bg-purple-100 rounded text-sm text-purple-800">
                🌍 Global: Support for major international credit cards
              </div>
            )}
          </div>
        )
      })}
      
      {/* 安全提示 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1L5 6v6l5 5 5-5V6l-5-5zM8.5 6L10 4.5 11.5 6 10 7.5 8.5 6zm0 5L10 9.5 11.5 11 10 12.5 8.5 11z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900">Security Guarantee</h4>
            <p className="text-sm text-gray-600 mt-1">
              All payments use bank-grade encryption technology to ensure your funds and information security. 7-day no-reason refund is supported.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 支付方式图标组件
export function PaymentMethodIcon({ method, size = 'md' }: { 
  method: PaymentProvider
  size?: 'sm' | 'md' | 'lg' 
}) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base'
  }

  const className = `${sizeClasses[size]} rounded flex items-center justify-center font-bold text-white`

  switch (method) {
    case PaymentProvider.ALIPAY:
      return (
        <div className={`${className} bg-blue-500`}>
          A
        </div>
      )
    case PaymentProvider.WECHAT:
      return (
        <div className={`${className} bg-green-500`}>
          W
        </div>
      )
    case PaymentProvider.STRIPE:
      return (
        <div className={`${className} bg-purple-500`}>
          💳
        </div>
      )
    default:
      return (
        <div className={`${className} bg-gray-500`}>
          💰
        </div>
      )
  }
}



