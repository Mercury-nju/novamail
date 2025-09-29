'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  SparklesIcon, 
  EnvelopeIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '20%']) }}
          className="absolute top-40 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
        />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <Link href="/" className="text-2xl font-bold text-primary-600">
                NovaMail
              </Link>
            </motion.div>
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="btn-primary">
                  Get Started for Free
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-32 pb-32 relative z-10 overflow-hidden"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 -z-10">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50"
            animate={{
              background: [
                "linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f0f9ff 100%)",
                "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #eff6ff 100%)",
                "linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f0f9ff 100%)"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-primary-300 rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0.7, 0.1, 0.7],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Large floating circles */}
          <motion.div
            className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-primary-100 to-blue-100 rounded-full opacity-40"
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-100 to-primary-100 rounded-full opacity-50"
            animate={{
              scale: [1.3, 1, 1.3],
              rotate: [360, 180, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-r from-primary-200 to-blue-200 rounded-full opacity-60"
            animate={{
              y: [0, -40, 0],
              x: [0, 25, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8"
            >
              The Future of
              <motion.span 
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.4,
                  backgroundPosition: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="text-primary-600 bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                {" "}Email Marketing
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Create, send, and track professional email campaigns with AI assistance. 
              Perfect for small businesses, creators, entrepreneurs, and independent developers.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5)",
                  y: -5
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <Link href="/dashboard/campaigns/new" className="btn-primary text-lg px-10 py-4 flex items-center rounded-xl font-semibold">
                  Get Started
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </motion.div>
                </Link>
              </motion.div>
              <motion.button 
                whileHover={{ 
                  scale: 1.1,
                  y: -5
                }}
                whileTap={{ scale: 0.9 }}
                className="text-primary-600 hover:text-primary-700 font-semibold text-lg transition-all duration-300 px-6 py-3 rounded-lg hover:bg-primary-50"
              >
                Watch Demo
              </motion.button>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed for modern email marketing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="text-center group"
              >
                <motion.div 
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="bg-gradient-to-br from-primary-100 to-primary-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow"
                >
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How it Works */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in minutes, not hours
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="text-center group"
              >
                <motion.div 
                  whileHover={{ 
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold group-hover:shadow-lg transition-shadow"
                >
                  {index + 1}
                </motion.div>
                <p className="text-gray-700">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Ready to grow your business?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of businesses using NovaSend to connect with their customers
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/dashboard/campaigns/new" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center">
              Get Started
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900 text-white py-12 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center mb-4 md:mb-0"
            >
              <SparklesIcon className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">NovaSend</span>
            </motion.div>
            <div className="text-gray-400">
              © 2024 NovaSend. All rights reserved.
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
