'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { XMarkIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function MarketingBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // 检查是否已经关闭过banner
    const dismissed = localStorage.getItem('marketing-banner-dismissed')
    if (!dismissed) {
      // 延迟显示banner，给页面加载时间
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    // 记住用户关闭了banner
    localStorage.setItem('marketing-banner-dismissed', 'true')
  }

  const handleUpgrade = () => {
    // 可以添加升级逻辑
    window.location.href = '/pricing'
  }

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 shadow-2xl border-t border-white/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {/* Left side - Message */}
              <div className="flex items-center space-x-4 flex-1">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex-shrink-0"
                >
                  <SparklesIcon className="h-6 w-6 text-yellow-300" />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white"
                  >
                    <p className="text-sm font-medium">
                      🚀 <span className="font-semibold">Unlock Premium Features!</span> 
                      Get unlimited AI generations, advanced templates, and priority support.
                    </p>
                    <p className="text-xs text-blue-100 mt-1">
                      Join 10,000+ businesses growing with NovaMail Pro
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Right side - CTA and Close */}
              <div className="flex items-center space-x-3 ml-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/pricing"
                    className="bg-white text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <span>Upgrade Now</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDismiss}
                  className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all duration-200"
                  aria-label="Close banner"
                >
                  <XMarkIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 origin-left"
            />
          </div>

          {/* Background animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
