'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { XMarkIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function MarketingBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const pathname = usePathname()
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // 只在首页显示banner
    if (pathname === '/') {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [pathname])

  useEffect(() => {
    // 设置倒计时为24小时
    const targetTime = Date.now() + 24 * 60 * 60 * 1000 // 24小时后
    
    const updateCountdown = () => {
      const now = Date.now()
      const difference = targetTime - now
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ hours, minutes, seconds })
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
    }
    
    // 立即更新一次
    updateCountdown()
    
    // 每秒更新
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    // 不保存到localStorage，下次打开仍会显示
  }

  const handleUpgrade = () => {
    // 可以添加升级逻辑
    window.location.href = '/pricing'
  }

  // 只在首页显示，如果已关闭则不显示
  if (isDismissed || pathname !== '/') return null

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
              {/* Left section - Message */}
              <div className="flex items-center space-x-4 flex-1 min-w-0">
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
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white flex-1 min-w-0"
                >
                  <p className="text-sm font-medium">
                    🚀 <span className="font-semibold">Limited Time Offer!</span> 
                    Get unlimited AI generations, advanced templates, and priority support.
                  </p>
                  <p className="text-xs text-blue-100 mt-1">
                    Pro plan starts at just <span className="font-bold text-yellow-300">$0.51/day</span> with annual billing
                  </p>
                </motion.div>
              </div>

              {/* Center section - Countdown Timer */}
              <div className="flex items-center space-x-2 mx-6">
                <div className="text-center">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600">
                    <div className="text-lg font-bold text-white">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-300 uppercase tracking-wide">
                      Hours
                    </div>
                  </div>
                </div>
                
                <div className="text-white text-lg font-bold">:</div>
                
                <div className="text-center">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600">
                    <div className="text-lg font-bold text-white">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-300 uppercase tracking-wide">
                      Minutes
                    </div>
                  </div>
                </div>
                
                <div className="text-white text-lg font-bold">:</div>
                
                <div className="text-center">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600">
                    <div className="text-lg font-bold text-white">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-300 uppercase tracking-wide">
                      Seconds
                    </div>
                  </div>
                </div>
              </div>

              {/* Right section - CTA and Close */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/pricing"
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl relative overflow-hidden"
                  >
                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{
                        backgroundPosition: ['200% 0', '-200% 0'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    
                    {/* Content */}
                    <span className="relative z-10">Claim Offer</span>
                    <ArrowRightIcon className="h-4 w-4 relative z-10" />
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
