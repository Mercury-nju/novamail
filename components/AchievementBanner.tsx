'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { XMarkIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline'

export default function AchievementBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // 检查是否已经关闭过banner
    const dismissed = localStorage.getItem('achievement-banner-dismissed')
    if (!dismissed) {
      // 延迟显示banner，给页面加载时间
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    // 记住用户关闭了banner
    localStorage.setItem('achievement-banner-dismissed', 'true')
  }

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-pink-400 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              {/* Left side - Medal and Text */}
              <div className="flex items-center space-x-4 flex-1">
                {/* Gold Medal Icon */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex-shrink-0 relative"
                >
                  {/* Gold Medal */}
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-300">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  
                  {/* Ribbon */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-b-full shadow-sm"></div>
                    <div className="w-6 h-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-b-full shadow-sm mx-auto mt-0.5"></div>
                  </div>
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-800"
                  >
                    <p className="text-sm font-semibold text-pink-500 uppercase tracking-wide">
                      AI EMAIL MARKETING
                    </p>
                    <p className="text-lg font-bold text-pink-500">
                      #1 AI-Powered Email Platform
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      First to combine AI content generation with professional email marketing
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Right side - Sparkles and Close */}
              <div className="flex items-center space-x-3 ml-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex-shrink-0"
                >
                  <SparklesIcon className="h-6 w-6 text-yellow-500" />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDismiss}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-all duration-200"
                  aria-label="Close banner"
                >
                  <XMarkIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Subtle progress bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 10, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 via-yellow-400 to-pink-400 origin-left"
            />
          </div>

          {/* Background animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-pink-200/20 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
