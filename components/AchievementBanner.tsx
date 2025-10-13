'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function AchievementBadge() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // 检查是否已经关闭过badge
    const dismissed = localStorage.getItem('achievement-badge-dismissed')
    if (!dismissed) {
      // 延迟显示badge，给页面加载时间
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    // 记住用户关闭了badge
    localStorage.setItem('achievement-badge-dismissed', 'true')
  }

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
          }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div className="bg-gray-100 rounded-lg border border-pink-300 shadow-lg px-4 py-3 flex items-center space-x-3 relative">
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
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-md border border-yellow-300">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              
              {/* Ribbon */}
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2">
                <div className="w-5 h-2.5 bg-gradient-to-br from-orange-400 to-orange-500 rounded-b-full shadow-sm"></div>
                <div className="w-3.5 h-1.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-b-full shadow-sm mx-auto mt-0.5"></div>
              </div>
            </motion.div>
            
            {/* Text Content */}
            <div className="flex flex-col">
              <p className="text-xs font-medium text-pink-500 uppercase tracking-wide leading-tight">
                AI EMAIL MARKETING
              </p>
              <p className="text-sm font-bold text-pink-600 leading-tight">
                #1 AI-Powered Email Platform
              </p>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200 shadow-sm"
              aria-label="Close badge"
            >
              <XMarkIcon className="h-3 w-3" />
            </motion.button>

            {/* Subtle glow effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-pink-200/20 to-yellow-200/20 rounded-lg blur-sm -z-10"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
