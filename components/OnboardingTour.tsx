'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  target?: string
  position: 'center' | 'top' | 'bottom' | 'left' | 'right'
  action?: {
    text: string
    href: string
  }
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: '欢迎使用 NovaMail！',
    description: '让我们快速了解一下如何开始使用我们的AI邮件营销平台。',
    icon: EnvelopeIcon,
    position: 'center'
  },
  {
    id: 'smtp-config',
    title: '配置您的邮箱',
    description: '首先，您需要配置SMTP设置才能发送邮件。这是使用NovaMail的必要步骤。',
    icon: Cog6ToothIcon,
    target: '#nav-link-settings',
    position: 'right',
    action: {
      text: '去配置',
      href: '/dashboard/settings'
    }
  },
  {
    id: 'contacts',
    title: '管理联系人',
    description: '添加或导入您的联系人列表，这是发送邮件的基础。',
    icon: UserGroupIcon,
    target: '#nav-link-contacts',
    position: 'right',
    action: {
      text: '添加联系人',
      href: '/dashboard/contacts'
    }
  },
  {
    id: 'campaigns',
    title: '创建邮件活动',
    description: '使用AI生成邮件内容，创建您的第一个邮件营销活动。',
    icon: EnvelopeIcon,
    target: '#quick-action-create-campaign',
    position: 'right',
    action: {
      text: '创建活动',
      href: '/dashboard/campaigns/new'
    }
  },
  {
    id: 'analytics',
    title: '查看分析数据',
    description: '跟踪您的邮件发送效果，了解收件人的参与度。',
    icon: ChartBarIcon,
    target: '#nav-link-analytics',
    position: 'right'
  }
]

interface OnboardingTourProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export default function OnboardingTour({ isOpen, onClose, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' })

  useEffect(() => {
    if (isOpen) {
      const step = onboardingSteps[currentStep]
      
      if (step.target) {
        // 等待DOM更新后再查找元素
        const timer = setTimeout(() => {
          const target = document.querySelector(step.target!) as HTMLElement
          if (target) {
            setTargetElement(target)
            updateTooltipPosition(target, step.position)
          } else {
            console.warn(`Target element not found: ${step.target}`)
            setTargetElement(null)
            setTooltipPosition({ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' })
          }
        }, 100)
        
        return () => clearTimeout(timer)
      } else {
        setTargetElement(null)
        setTooltipPosition({ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' })
      }
    }
  }, [isOpen, currentStep])

  const updateTooltipPosition = (element: HTMLElement, position: string) => {
    const rect = element.getBoundingClientRect()
    const tooltipWidth = 320 // max-w-sm = 24rem = 384px, 使用320px作为安全宽度
    const tooltipHeight = 200 // 估算高度
    const margin = 20

    let left = '50%'
    let top = '50%'
    let transform = 'translate(-50%, -50%)'

    switch (position) {
      case 'right':
        left = `${Math.min(rect.right + margin, window.innerWidth - tooltipWidth - margin)}px`
        top = `${rect.top + rect.height / 2}px`
        transform = 'translateY(-50%)'
        break
      case 'left':
        left = `${Math.max(rect.left - tooltipWidth - margin, margin)}px`
        top = `${rect.top + rect.height / 2}px`
        transform = 'translateY(-50%)'
        break
      case 'top':
        left = `${rect.left + rect.width / 2}px`
        top = `${Math.max(rect.top - tooltipHeight - margin, margin)}px`
        transform = 'translateX(-50%)'
        break
      case 'bottom':
        left = `${rect.left + rect.width / 2}px`
        top = `${Math.min(rect.bottom + margin, window.innerHeight - tooltipHeight - margin)}px`
        transform = 'translateX(-50%)'
        break
      case 'center':
      default:
        left = '50%'
        top = '50%'
        transform = 'translate(-50%, -50%)'
        break
    }

    setTooltipPosition({ left, top, transform })
  }

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  if (!isOpen) return null

  const currentStepData = onboardingSteps[currentStep]
  const IconComponent = currentStepData.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleSkip}
          />

          {/* 高亮目标元素 */}
          {targetElement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed z-50 pointer-events-none"
              style={{
                left: targetElement.getBoundingClientRect().left - 4,
                top: targetElement.getBoundingClientRect().top - 4,
                width: targetElement.getBoundingClientRect().width + 8,
                height: targetElement.getBoundingClientRect().height + 8,
                border: '2px solid #3b82f6',
                borderRadius: '8px',
                boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)'
              }}
            />
          )}

          {/* 引导卡片 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-50 bg-white rounded-lg shadow-xl p-6 max-w-sm"
            style={{
              left: tooltipPosition.left,
              top: tooltipPosition.top,
              transform: tooltipPosition.transform
            }}
          >
            {/* 步骤指示器 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <IconComponent className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">
                  步骤 {currentStep + 1} / {onboardingSteps.length}
                </span>
              </div>
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* 进度条 */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* 内容 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {currentStepData.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    上一步
                  </button>
                )}
                
                {currentStepData.action && (
                  <a
                    href={currentStepData.action.href}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      // 延迟关闭引导，让用户有时间看到跳转
                      setTimeout(() => onComplete(), 500)
                    }}
                  >
                    {currentStepData.action.text}
                  </a>
                )}
              </div>

              <button
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                {currentStep === onboardingSteps.length - 1 ? (
                  <>
                    完成 <CheckIcon className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    下一步 <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>

            {/* 跳过按钮 */}
            {currentStep < onboardingSteps.length - 1 && (
              <button
                onClick={handleSkip}
                className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                跳过引导
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}