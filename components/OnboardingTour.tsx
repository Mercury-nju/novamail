'use client'

import { useState } from 'react'
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
    icon: EnvelopeIcon
  },
  {
    id: 'smtp-config',
    title: '配置您的邮箱',
    description: '首先，您需要配置SMTP设置才能发送邮件。这是使用NovaMail的必要步骤。',
    icon: Cog6ToothIcon,
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
    action: {
      text: '创建活动',
      href: '/dashboard/campaigns/new'
    }
  },
  {
    id: 'analytics',
    title: '查看分析数据',
    description: '跟踪您的邮件发送效果，了解收件人的参与度。',
    icon: ChartBarIcon
  }
]

interface OnboardingTourProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export default function OnboardingTour({ isOpen, onClose, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)

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

          {/* 引导卡片 - 居中显示 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-auto">
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
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* 内容 */}
              <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {currentStepData.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}