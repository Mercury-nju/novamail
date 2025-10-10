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
  target: string
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
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
    target: '',
    position: 'center'
  },
  {
    id: 'smtp-config',
    title: '配置您的邮箱',
    description: '首先，您需要配置SMTP设置才能发送邮件。这是使用NovaMail的必要步骤。',
    icon: Cog6ToothIcon,
    target: '[href="/dashboard/settings"]',
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
    target: '[href="/dashboard/contacts"]',
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
    target: '[href="/dashboard/campaigns"]',
    position: 'right',
    action: {
      text: '创建活动',
      href: '/dashboard/campaigns'
    }
  },
  {
    id: 'analytics',
    title: '查看分析数据',
    description: '跟踪您的邮件发送效果，了解收件人的参与度。',
    icon: ChartBarIcon,
    target: '[href="/dashboard/analytics"]',
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

  useEffect(() => {
    if (isOpen) {
      const step = onboardingSteps[currentStep]
      if (step.target) {
        const target = document.querySelector(step.target) as HTMLElement
        setTargetElement(target)
      } else {
        setTargetElement(null)
      }
    }
  }, [isOpen, currentStep])

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
                left: targetElement.offsetLeft - 4,
                top: targetElement.offsetTop - 4,
                width: targetElement.offsetWidth + 8,
                height: targetElement.offsetHeight + 8,
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
              left: targetElement && currentStepData.position !== 'center' ? 
                (currentStepData.position === 'right' ? targetElement.offsetLeft + targetElement.offsetWidth + 20 : 
                 currentStepData.position === 'left' ? targetElement.offsetLeft - 320 : 
                 targetElement.offsetLeft) : '50%',
              top: targetElement && currentStepData.position !== 'center' ? 
                (currentStepData.position === 'bottom' ? targetElement.offsetTop + targetElement.offsetHeight + 20 : 
                 currentStepData.position === 'top' ? targetElement.offsetTop - 200 : 
                 targetElement.offsetTop) : '50%',
              transform: (targetElement && currentStepData.position !== 'center') ? 'none' : 'translate(-50%, -50%)'
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

            {/* 内容 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {currentStepData.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            {/* 进度条 */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    上一步
                  </button>
                )}
              </div>

              <div className="flex space-x-2">
                {currentStepData.action && (
                  <a
                    href={currentStepData.action.href}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={handleNext}
                  >
                    {currentStepData.action.text}
                  </a>
                )}
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                  <span>{currentStep === onboardingSteps.length - 1 ? '完成' : '下一步'}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
