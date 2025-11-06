'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon, 
  SparklesIcon, 
  BoltIcon,
  CheckIcon,
  ArrowUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import config from '@/lib/config'

interface AICreditsModalProps {
  isOpen: boolean
  onClose: () => void
  userCredits?: number
  isPremium?: boolean
  requiredCredits?: number
}

export default function AICreditsModal({ 
  isOpen, 
  onClose, 
  userCredits = 0, 
  isPremium = false,
  requiredCredits = 3 
}: AICreditsModalProps) {
  
  const hasEnoughCredits = userCredits >= requiredCredits
  const remainingGenerations = Math.floor(userCredits / requiredCredits)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`px-6 py-5 ${
                hasEnoughCredits 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                      {hasEnoughCredits ? (
                        <SparklesIcon className="w-7 h-7 text-white" />
                      ) : (
                        <ExclamationTriangleIcon className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {hasEnoughCredits ? 'AI Email Generation' : 'Insufficient Credits'}
                      </h3>
                      <p className="text-sm text-white/90 mt-0.5">
                        {hasEnoughCredits 
                          ? `You have ${remainingGenerations} generation${remainingGenerations !== 1 ? 's' : ''} available`
                          : 'Upgrade to continue using AI'
                        }
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors p-1"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {hasEnoughCredits ? (
                  /* Has Credits - Info Message */
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start">
                        <BoltIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">How AI Generation Works</h4>
                          <ul className="text-sm text-blue-800 space-y-2">
                            <li className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              <span>Each AI generation costs <strong>{requiredCredits} credits</strong></span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              <span>You currently have <strong>{userCredits} credits</strong> ({remainingGenerations} generations)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              <span>Free users get {config.credits.freeMonthly} credits per month</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              <span>Premium users get {config.credits.premiumMonthly} credits per month</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-green-800">
                            <strong>Good news!</strong> All email templates are completely free to use. You only need credits for AI-generated content.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-colors shadow-lg"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : (
                  /* No Credits - Upgrade Message */
                  <div className="space-y-5">
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <div className="flex items-start">
                        <ExclamationTriangleIcon className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-orange-900 mb-1">You're out of AI credits</h4>
                          <p className="text-sm text-orange-800">
                            AI email generation requires {requiredCredits} credits per use. You currently have {userCredits} credits remaining.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-5">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <SparklesIcon className="w-5 h-5 text-purple-600 mr-2" />
                        Upgrade to Premium
                      </h4>
                      <ul className="space-y-2.5 mb-4">
                        {[
                          `${config.credits.premiumMonthly.toLocaleString()} AI credits per month`,
                          'Unlimited email templates',
                          'Advanced analytics',
                          'Priority support',
                          'No ads'
                        ].map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Remember:</strong> All {config.credits.freeMonthly}+ email templates are completely free to use and export, even on the free plan. You only need credits for AI-powered content generation.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                      >
                        Use Templates Instead
                      </button>
                      <Link href="/pricing" className="flex-1">
                        <button
                          className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg flex items-center justify-center"
                        >
                          <ArrowUpIcon className="w-4 h-4 mr-2" />
                          Upgrade Now
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

