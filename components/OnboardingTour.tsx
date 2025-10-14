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
    title: 'Welcome to NovaMail!',
    description: 'Let\'s quickly learn how to get started with our AI email marketing platform.',
    icon: EnvelopeIcon
  },
  {
    id: 'smtp-config',
    title: 'Configure Your Email',
    description: 'First, you need to configure SMTP settings to send emails. This is a necessary step to use NovaMail.',
    icon: Cog6ToothIcon,
    action: {
      text: 'Go Configure',
      href: '/dashboard/settings'
    }
  },
  {
    id: 'contacts',
    title: 'Manage Contacts',
    description: 'Add or import your contact list, which is the foundation for sending emails.',
    icon: UserGroupIcon,
    action: {
      text: 'Add Contacts',
      href: '/dashboard/contacts'
    }
  },
  {
    id: 'campaigns',
    title: 'Create Email Campaigns',
    description: 'Use our AI assistant to create professional email content, or choose from preset templates.',
    icon: EnvelopeIcon,
    action: {
      text: 'Create Campaign',
      href: '/dashboard/campaigns/new'
    }
  },
  {
    id: 'analytics',
    title: 'View Analytics',
    description: 'Track your email campaign performance and understand key metrics like open rates and click rates.',
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
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleSkip}
          />

          {/* Tour card - Modern design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-auto border border-gray-100">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>
              
              {/* Content container */}
              <div className="relative z-10">
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Step {currentStep + 1}</span>
                      <div className="text-xs text-gray-400">of {onboardingSteps.length} steps</div>
                    </div>
                  </div>
                  <button
                    onClick={handleSkip}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-8 text-center">
                  <motion.h3 
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold text-gray-900 mb-4"
                  >
                    {currentStepData.title}
                  </motion.h3>
                  <motion.p 
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-gray-600 text-lg leading-relaxed"
                  >
                    {currentStepData.description}
                  </motion.p>
                </div>

                {/* Action buttons */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {currentStep > 0 && (
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handlePrevious}
                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        Previous
                      </motion.button>
                    )}
                    
                    {currentStepData.action && (
                      <motion.a
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        href={currentStepData.action.href}
                        className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        onClick={() => {
                          setTimeout(() => onComplete(), 500)
                        }}
                      >
                        {currentStepData.action.text}
                      </motion.a>
                    )}
                  </div>

                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    onClick={handleNext}
                    className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                  >
                    {currentStep === onboardingSteps.length - 1 ? (
                      <>
                        Complete <CheckIcon className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Next <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Skip button */}
                {currentStep < onboardingSteps.length - 1 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    onClick={handleSkip}
                    className="mt-6 w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors py-2 hover:bg-gray-50 rounded-lg"
                  >
                    Skip Tour
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}