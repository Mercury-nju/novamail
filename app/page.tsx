'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRouter } from 'next/navigation'
import TemplateShowcase from '@/components/TemplateShowcase'
import { 
  SparklesIcon, 
  EnvelopeIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  ArrowRightIcon,
  CheckIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { useAutoLanguageDetection } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function HomePage() {
  const router = useRouter()
  useAutoLanguageDetection() // 自动检测用户语言
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const handleGetStarted = () => {
    // Always redirect to login page (no session check in static export)
      router.push('/login')
    }

  // Continuous auto scroll functionality
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = scrollContainer.scrollLeft || 0
    const scrollSpeed = 0.5 // pixels per frame (slower = more smooth)

    const animateScroll = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed
        
        // Reset to beginning when reaching the end
        if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollPosition = 0
        }
        
        scrollContainer.scrollLeft = scrollPosition
      }
      
      animationId = requestAnimationFrame(animateScroll)
    }

    animationId = requestAnimationFrame(animateScroll)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPaused])

  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Content',
      description: 'Generate compelling email content with AI in seconds'
    },
    {
      icon: EnvelopeIcon,
      title: 'Easy Sending',
      description: 'Upload contacts and send emails with one click'
    },
    {
      icon: ChartBarIcon,
      title: 'Smart Analytics',
      description: 'Track delivery rates, reply rates, and campaign performance'
    },
    {
      icon: UserGroupIcon,
      title: 'Contact Management',
      description: 'Organize and manage your email lists effortlessly'
    }
  ]

  const steps = [
    'Upload your contact list or add emails manually',
    'Describe your email goal and let AI generate content',
    'Review, customize, and send to your audience',
    'Monitor performance with detailed analytics'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/30 via-transparent to-blue-50/20 relative overflow-hidden backdrop-blur-sm">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main floating blobs */}
        <motion.div 
          style={{ y }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/60 to-primary-300/40 rounded-full mix-blend-multiply filter blur-2xl opacity-80 backdrop-blur-sm"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.8, 1, 0.8],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/60 to-blue-300/40 rounded-full mix-blend-multiply filter blur-2xl opacity-80 backdrop-blur-sm"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.8, 0.6, 0.8],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '20%']) }}
          className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-200/60 to-purple-300/40 rounded-full mix-blend-multiply filter blur-2xl opacity-80 backdrop-blur-sm"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.8, 1, 0.8],
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Additional floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-br from-white/40 to-primary-300/60 rounded-full opacity-80 backdrop-blur-sm border border-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.8, 1],
              opacity: [0.8, 0.2, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Large floating circles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute w-48 h-48 bg-gradient-to-br from-white/20 to-blue-100/40 rounded-full blur-3xl backdrop-blur-sm border border-white/10"
            style={{
              left: `${10 + i * 18}%`,
              top: `${20 + i * 12}%`,
            }}
            animate={{
              scale: [1, 1.6, 1],
              rotate: [0, 180, 360],
              y: [0, -50, 0],
              x: [0, 25, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 7 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-50"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(248,250,252,0.05) 50%, rgba(255,255,255,0.1) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center">
                {/* Logo Text Only */}
                <motion.span 
                  whileHover={{ 
                    scale: 1.02,
                    textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                  }}
                  className="text-xl font-bold text-blue-600"
                >
                  NovaMail
                </motion.span>
              </Link>
            </motion.div>
            <div className="flex items-center space-x-6">
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/pricing" className="text-gray-700 hover:text-gray-900 transition-all duration-300 py-2 px-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/25 hover:border-white/40 shadow-xl hover:shadow-2xl">
                  Pricing
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="https://discord.gg/dkNVHVNn2B" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-all duration-300 py-2 px-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/25 hover:border-white/40 shadow-xl hover:shadow-2xl flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>Discord</span>
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/login" className="text-gray-700 hover:text-gray-900 transition-all duration-300 py-2 px-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/25 hover:border-white/40 shadow-xl hover:shadow-2xl">
                  Sign In
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-gray-700 hover:text-gray-900 transition-all duration-300 py-2 px-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/25 hover:border-white/40 shadow-xl hover:shadow-2xl">
                  <LanguageSwitcher />
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 12px 32px rgba(59, 130, 246, 0.4)",
                  transition: { type: "spring", stiffness: 300 }
                }} 
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
              >
                <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer">
                  Get Started
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-32 relative z-10 overflow-hidden min-h-[80vh] flex items-center"
      >
        {/* Enhanced Hero Background */}
        <div className="absolute inset-0 -z-10">
          {/* Dynamic gradient background */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(135deg, rgba(240,249,255,0.3) 0%, rgba(255,255,255,0.1) 30%, rgba(224,242,254,0.2) 70%, rgba(240,249,255,0.3) 100%)",
                "linear-gradient(135deg, rgba(224,242,254,0.2) 0%, rgba(255,255,255,0.05) 30%, rgba(219,234,254,0.15) 70%, rgba(224,242,254,0.2) 100%)",
                "linear-gradient(135deg, rgba(243,232,255,0.2) 0%, rgba(255,255,255,0.05) 30%, rgba(233,213,255,0.15) 70%, rgba(243,232,255,0.2) 100%)",
                "linear-gradient(135deg, rgba(240,249,255,0.3) 0%, rgba(255,255,255,0.1) 30%, rgba(224,242,254,0.2) 70%, rgba(240,249,255,0.3) 100%)"
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Large floating geometric shapes */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-primary-200/50 to-pink-200/50 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.8, 0.4],
              rotate: [360, 180, 0],
              x: [0, -40, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-green-200/30 to-teal-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 90, 180, 270, 360],
              x: [0, 30, -20, 0],
              y: [0, -20, 30, 0],
            }}
            transition={{
                duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-primary-300/40 blur-sm"
              style={{
                width: `${Math.random() * 12 + 6}px`,
                height: `${Math.random() * 12 + 6}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 80 - 40, 0],
                x: [0, Math.random() * 60 - 30, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Floating orbs with different colors */}
          {[...Array(8)].map((_, i) => {
            const colors = [
              'from-blue-200/30 to-purple-200/30',
              'from-pink-200/30 to-rose-200/30',
              'from-green-200/30 to-emerald-200/30',
              'from-cyan-200/30 to-blue-200/30',
              'from-indigo-200/30 to-blue-200/30',
              'from-purple-200/30 to-pink-200/30',
              'from-teal-200/30 to-cyan-200/30',
              'from-slate-200/30 to-gray-200/30'
            ];
            return (
              <motion.div
                key={`orb-${i}`}
                className={`absolute w-20 h-20 bg-gradient-to-br ${colors[i]} rounded-full blur-xl`}
                style={{
                  left: `${5 + i * 12}%`,
                  top: `${10 + (i % 3) * 30}%`,
                }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0.7, 0.3],
                  y: [0, -40, 0],
                  x: [0, 20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              />
            );
          })}
          
          {/* Animated grid pattern */}
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            animate={{
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="h-full w-full bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </motion.div>
          
          {/* Light rays effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex flex-col justify-center min-h-[60vh]">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 leading-tight whitespace-nowrap"
            >
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-900"
              >
                Your AI Copilot for 
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotateX: 0
                }}
                transition={{ 
                  duration: 1, 
                  delay: 0.4,
                  ease: "easeOut"
                }}
                className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                {' '}Email Marketing
              </motion.span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-16 max-w-5xl mx-auto leading-relaxed font-light space-y-2"
            >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
            >
                Writes, designs, and sends stunning campaigns — all in minutes.
            </motion.p>
              <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-lg md:text-xl"
              >
                Track results instantly and grow your audience effortlessly.
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                  onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 text-white text-lg px-12 py-6 flex items-center rounded-2xl font-bold cursor-pointer select-none transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-white/20 hover:border-white/40 relative overflow-hidden"
                style={{
                  border: 'none',
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Get Started</span>
                  <motion.div
                  animate={{ 
                    x: [0, 8, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-3 relative z-10"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                  </motion.div>
              </motion.div>
              <motion.div
                whileHover={{ 
                  scale: 1.01,
                  y: -1,
                  boxShadow: "0 15px 35px rgba(16, 185, 129, 0.3)"
                }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  // Scroll to the template showcase section
                  const templateSection = document.querySelector('[data-section="templates"]');
                  if (templateSection) {
                    templateSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white/30 backdrop-blur-md border border-white/40 hover:border-white/60 hover:bg-white/40 text-gray-800 text-base px-8 py-4 flex items-center rounded-xl font-medium cursor-pointer select-none transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden"
                style={{
                  border: 'none',
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 text-gray-800 font-semibold">View Templates</span>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-10 text-sm"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.15,
                  y: -5,
                  rotateX: 5,
                  boxShadow: "0 15px 35px rgba(34, 197, 94, 0.4)"
                }}
                className="flex items-center gap-3 px-6 py-4 bg-white/15 backdrop-blur-lg rounded-full border border-white/20 hover:border-white/35 shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <motion.div 
                  animate={{ 
                    scale: [1, 1.8, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.8, 1, 0.8],
                    boxShadow: ["0 0 0px rgba(34, 197, 94, 0)", "0 0 20px rgba(34, 197, 94, 0.6)", "0 0 0px rgba(34, 197, 94, 0)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                ></motion.div>
                <span className="text-green-700 font-medium">AI-powered</span>
              </motion.div>
              <motion.div 
                whileHover={{ 
                  scale: 1.15,
                  y: -5,
                  rotateX: 5,
                  boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)"
                }}
                className="flex items-center gap-3 px-6 py-4 bg-white/15 backdrop-blur-lg rounded-full border border-white/20 hover:border-white/35 shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <motion.div 
                  animate={{ 
                    scale: [1, 1.8, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.8, 1, 0.8],
                    boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.6)", "0 0 0px rgba(59, 130, 246, 0)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                ></motion.div>
                <span className="text-blue-700 font-medium">Easy setup</span>
              </motion.div>
              <motion.div 
                whileHover={{ 
                  scale: 1.15,
                  y: -5,
                  rotateX: 5,
                  boxShadow: "0 15px 35px rgba(147, 51, 234, 0.4)"
                }}
                className="flex items-center gap-3 px-6 py-4 bg-white/15 backdrop-blur-lg rounded-full border border-white/20 hover:border-white/35 shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <motion.div 
                  animate={{ 
                    scale: [1, 1.8, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.8, 1, 0.8],
                    boxShadow: ["0 0 0px rgba(147, 51, 234, 0)", "0 0 20px rgba(147, 51, 234, 0.6)", "0 0 0px rgba(147, 51, 234, 0)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="w-3 h-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"
                ></motion.div>
                <span className="text-purple-700 font-medium">Smart templates</span>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </motion.section>


      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 relative z-10 overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(248,250,252,0.05) 50%, rgba(255,255,255,0.1) 100%)'
        }}
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-blue-50/20 to-transparent rounded-full blur-3xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-primary-50/20 to-transparent rounded-full blur-3xl opacity-30"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.1, 0.3],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
            >
              Why Choose NovaMail
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything you need to 
              <span className="text-primary-600"> grow your business</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Powerful AI-driven features designed for modern email marketing. 
              Simple, effective, and built for success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ 
                  y: -15,
                  scale: 1.05,
                  rotateX: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative"
              >
                <div className="bg-white/15 backdrop-blur-lg rounded-xl p-5 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/20 hover:border-white/35 h-full group relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300 rounded-xl"></div>
                  
                  <motion.div 
                    whileHover={{ 
                      scale: 1.3,
                      rotate: 20,
                      y: -8,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className="bg-gradient-to-br from-primary-600/70 to-primary-700/70 backdrop-blur-lg w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-2xl transition-shadow relative z-10 border border-white/15"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 15
                      }}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  </motion.div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-primary-200/20 to-primary-300/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Connecting Element */}
      <div className="relative h-8 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/10 to-transparent"></div>
      </div>

      {/* Product Showcase - Professional Templates */}
      <motion.section 
        data-section="templates"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 relative"
        style={{
          background: 'linear-gradient(to bottom, rgba(248,250,252,0.1) 0%, rgba(241,245,249,0.05) 50%, rgba(248,250,252,0.1) 100%)'
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-100 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        {/* Add full professional template showcase */}
      <TemplateShowcase />
        
        {/* Old simple showcase - keeping for backup */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ display: 'none' }}>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4"
            >
              Professional Template Showcase
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Professional Templates Make Your
              <span className="text-primary-600"> Emails Stand Out</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Choose professional templates, AI intelligently generates content, easily create beautiful marketing emails
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <SparklesIcon className="w-8 h-8" />,
                title: "Smart Generation",
                description: "AI automatically generates professional content based on templates, saving 90% of creation time"
              },
              {
                icon: <EyeIcon className="w-8 h-8" />,
                title: "Real-time Preview", 
                description: "What you see is what you get, real-time preview of email effects, ensuring perfect presentation"
              },
              {
                icon: <CheckIcon className="w-8 h-8" />,
                title: "Professional Templates",
                description: "Beautiful templates covering various industry needs, enhancing brand image"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Connecting Element */}
      <div className="relative h-8 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/10 to-transparent"></div>
      </div>

      {/* Simple Email Flow Showcase */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 relative z-10 overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(248,250,252,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(248,250,252,0.1) 100%)'
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1], 
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.4, 0.6, 0.4],
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-6"
            >
              Simple & Effective
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Create <span className="text-green-600">Professional</span> Emails in Minutes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Perfect for newsletters, announcements, and business communications. 
              Clean, professional, and effortless to create.
            </p>
          </motion.div>

          {/* Simple Email Flow Demo */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Process Steps */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                  >
                    1
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Template</h3>
                    <p className="text-gray-600 text-sm">Select from professional templates or create simple text-based emails.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                  >
                    2
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Content Generation</h3>
                    <p className="text-gray-600 text-sm">Our AI analyzes your business and generates personalized, engaging content.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                  >
                    3
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Review & Send</h3>
                    <p className="text-gray-600 text-sm">Preview, customize if needed, and send to your audience with one click.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Email Preview */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
              className="relative"
            >
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {/* Email Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white text-sm font-bold">N</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">NovaMail</p>
                        <p className="text-xs text-gray-500">noreply@novamail.com</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">Just now</div>
                  </div>
                </div>

                {/* Email Content */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Subject: Welcome to Our Service</h3>
                  </div>
                  
                  <div className="space-y-3 text-gray-700 text-sm">
                    <p className="font-medium">Dear Customer,</p>
                    
                    <p>Thank you for choosing our service. We're excited to have you on board and look forward to helping you achieve your goals.</p>
                    
                    <p className="font-medium">Here's what you can expect from us:</p>
                    
                    <ul className="space-y-1 ml-4">
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Personalized support and guidance</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Regular updates on your progress</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Access to our knowledge base</span>
                      </li>
                    </ul>
                    
                    <p>If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
                    
                    <p className="font-medium">Best regards,<br />The NovaMail Team</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-white text-xs">✓</span>
              </motion.div>
              
              {/* Success indicator */}
              <motion.div 
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Connecting Element */}
      <div className="relative h-8 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/10 to-transparent"></div>
      </div>

      {/* How it Works */}
      <motion.section 
        id="how-it-works"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 relative z-10 overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(248,250,252,0.1) 0%, rgba(241,245,249,0.05) 30%, rgba(219,234,254,0.03) 70%, rgba(248,250,252,0.1) 100%)'
        }}
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.05), transparent 50%)",
                "radial-gradient(circle at 30% 70%, rgba(59,130,246,0.08), transparent 50%)",
                "radial-gradient(circle at 70% 30%, rgba(59,130,246,0.05), transparent 50%)",
                "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.05), transparent 50%)"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary-200 to-transparent opacity-30"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating geometric shapes */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`how-it-works-${i}`}
              className="absolute w-20 h-20 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-xl"
              style={{
                left: `${15 + i * 25}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
            >
              Simple Process
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How it <span className="text-primary-600">works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get started in minutes, not hours. Our intuitive process makes email marketing effortless.
            </p>
          </motion.div>

          <div className="relative">
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.05,
                    rotateX: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="text-center group relative"
                >
                  <div className="bg-white/15 backdrop-blur-lg rounded-xl p-5 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/20 hover:border-white/35 relative z-10 h-full flex flex-col overflow-hidden">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300 rounded-xl"></div>
                    
                    <motion.div 
                      whileHover={{ 
                        scale: 1.4,
                        rotate: 20,
                        y: -8,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      className="bg-gradient-to-br from-primary-600/70 to-primary-700/70 backdrop-blur-lg text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-lg font-bold group-hover:shadow-2xl transition-shadow relative z-10 border border-white/15"
                    >
                      <motion.span
                        whileHover={{ 
                          scale: 1.3,
                          rotate: 15
                        }}
                    >
                      {index + 1}
                      </motion.span>
                    </motion.div>
                    <p className="text-gray-700 text-sm leading-relaxed flex-grow relative z-10">
                      {step}
                    </p>
                    
                  </div>
                  
                </motion.div>
              ))}
                      </div>
                    </div>
        </div>
      </motion.section>

      {/* User Reviews Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 relative z-10 overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(248,250,252,0.1) 0%, rgba(241,245,249,0.05) 50%, rgba(248,250,252,0.1) 100%)'
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1], 
              opacity: [0.2, 0.4, 0.2],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.3, 0.5, 0.3],
              x: [0, -25, 0],
              y: [0, 25, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4"
            >
              Customer Reviews
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              What Our Users Say
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Join thousands of satisfied customers who have transformed their email marketing with NovaMail
            </motion.p>
                </motion.div>

          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
                {[
              {
                name: "Alex M.",
                role: "Solo Developer",
                company: "",
                avatar: "AM",
                rating: 5,
                review: "As a solo developer, I needed an email marketing solution that wouldn't break the bank. NovaMail's AI features are incredible - it writes better emails than I ever could. My newsletter engagement doubled in just 2 weeks!"
              },
              {
                name: "Sarah K.",
                role: "Freelance Designer",
                company: "",
                avatar: "SK",
                rating: 5,
                review: "I was spending hours crafting emails for my design clients. NovaMail's templates and AI content generation cut my email work time by 80%. The professional templates make my clients think I have a whole marketing team!"
              },
              {
                name: "Mike R.",
                role: "Indie Game Developer",
                company: "",
                avatar: "MR",
                rating: 5,
                review: "Launching my game was stressful enough without worrying about email marketing. NovaMail made it so easy - I just described my game and it created engaging newsletters that actually convert. Game changer!"
              },
              {
                name: "Emma L.",
                role: "Content Creator",
                company: "",
                avatar: "EL",
                rating: 5,
                review: "I run a small YouTube channel and needed to grow my email list. NovaMail's AI understands my niche perfectly and creates content that resonates with my audience. My subscriber growth has been amazing!"
              },
              {
                name: "David C.",
                role: "Consultant",
                company: "",
                avatar: "DC",
                rating: 5,
                review: "Working solo means wearing many hats. NovaMail handles all my email marketing needs - from templates to analytics. It's like having a marketing expert on my team without the cost. Absolutely worth every penny!"
              },
              {
                name: "Lisa W.",
                role: "Online Course Creator",
                company: "",
                avatar: "LW",
                rating: 5,
                review: "I was struggling to promote my courses effectively. NovaMail's AI creates compelling email sequences that actually sell. My course enrollment rates increased by 300% since I started using it. It's incredible!"
              },
              {
                name: "James T.",
                role: "Co-founder",
                company: "",
                avatar: "JT",
                rating: 5,
                review: "We're a 3-person startup with no marketing budget. NovaMail gave us enterprise-level email marketing capabilities at a fraction of the cost. Our user acquisition through email campaigns has been phenomenal!"
              },
              {
                name: "Rachel S.",
                role: "Marketing Lead",
                company: "",
                avatar: "RS",
                rating: 5,
                review: "As a startup, we needed to move fast and test different approaches. NovaMail's AI helps us iterate quickly on email campaigns. We've seen 5x improvement in our conversion rates since implementing it."
              },
              {
                name: "Tom H.",
                role: "Founder",
                company: "",
                avatar: "TH",
                rating: 5,
                review: "Starting a SaaS company means wearing every hat. NovaMail's automation features and AI content generation saved us from hiring a full-time marketer. Our email marketing ROI is through the roof!"
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
                }}
                className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-white/50 flex-shrink-0 w-80"
              >
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
              ))}
            </div>

                {/* Review Text */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className="text-gray-700 mb-6 leading-relaxed"
                >
                  "{review.review}"
                </motion.p>

                {/* User Info */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  className="flex items-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                <div className="w-2 h-2 bg-primary-200 rounded-full"></div>
                <div className="w-2 h-2 bg-primary-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Brand Philosophy Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 relative z-10 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(248,250,252,0.8) 0%, rgba(255,255,255,0.6) 50%, rgba(240,249,255,0.8) 100%)'
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1], 
              opacity: [0.2, 0.4, 0.2],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
            >
              Our Story
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            >
              Built for 
              <span className="text-primary-600"> Startups & Indie Developers</span>
            </motion.h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/40">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 font-light"
              >
                "We built NovaMail for startups and indie developers who need to focus on building, not marketing."
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4 text-left max-w-3xl mx-auto"
              >
                <p className="text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">We understand</strong> that as a startup or indie developer, you need to maintain user relationships, collect feedback, and increase retention — but you don't have time for complex email marketing tools.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">We believe</strong> that customer communication shouldn't be a bottleneck. Whether you're onboarding new users, gathering product feedback, or nurturing your community, email should be simple and effective.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">We built NovaMail</strong> to handle your user maintenance, email marketing, customer retention, and feedback collection — so you can focus on what matters most: building your product.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 relative z-10 overflow-hidden"
      >
        {/* Enhanced CTA Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.05, 0.15, 0.05],
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating stars */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 1.5,
                repeat: Infinity,
                delay: Math.random() * 1,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
              className="bg-white/15 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-3xl"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-6 py-3 bg-white/20 text-white rounded-full text-sm font-medium mb-8"
            >
              Ready to Get Started?
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to grow your 
              <span className="text-yellow-300"> business?</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Join thousands of businesses using NovaMail to connect with their customers. 
              Start your journey today with our powerful email marketing platform.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 25px 50px rgba(255, 255, 255, 0.5)",
                  y: -8,
                  rotateX: 8,
                  rotateY: 2
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href="/dashboard/campaigns/new" className="bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-gray-200 text-primary-700 hover:text-primary-800 text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center border-0">
                  Get Started
                  <motion.div
                    animate={{ 
                      x: [0, 8, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.button 
                whileHover={{ 
                  scale: 1.1,
                  y: -8,
                  rotateX: 8,
                  rotateY: -2,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  // Scroll to pricing section
                  const pricingSection = document.querySelector('[data-section="pricing"]');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-white hover:text-yellow-300 font-semibold text-lg transition-all duration-300 px-8 py-4 rounded-xl bg-white/15 backdrop-blur-lg border border-white/20 hover:border-white/35 hover:bg-white/25 shadow-2xl hover:shadow-3xl"
              >
                View Pricing
              </motion.button>
            </motion.div>
            
            {/* Additional CTA elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-100"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span className="text-sm">No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                />
                <span className="text-sm">Easy to use</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="w-2 h-2 bg-purple-400 rounded-full"
                />
                <span className="text-sm">24/7 support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 text-white relative z-10"
      >
        <div className="py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center mb-4"
              >
                <span className="text-2xl font-bold text-primary-400">NovaMail</span>
              </motion.div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Professional email marketing platform to help you create, send and track marketing campaigns.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API Docs</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookie" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link href="/gdpr" className="hover:text-white transition-colors">GDPR Compliance</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 NovaMail. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/cookie" className="hover:text-white transition-colors">Cookie Policy</Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
