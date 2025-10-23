'use client'

import { motion } from 'framer-motion'
import {
  SparklesIcon, 
  ArrowRightIcon,
  RocketLaunchIcon,
  StarIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Dashboard() {
  

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-900">NovaMail</h1>
                <p className="text-xs text-gray-500">AI Email Marketing Platform</p>
              </div>
            </div>
            <span className="text-gray-700">English</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Hero Section */}
            <div className="mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Welcome to NovaMail
              </h2>
              
              <p className="text-gray-500 mb-12 max-w-lg mx-auto">
                Create stunning email campaigns with AI-powered tools
              </p>
              </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link
                href="/dashboard/campaigns/new"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Email Campaign
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Link>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
            <div className="text-center">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <RocketLaunchIcon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Professional Templates</h3>
                <p className="text-sm text-gray-500">Expertly designed templates for every business need</p>
                  </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <StarIcon className="h-5 w-5 text-purple-600" />
                          </div>
                <h3 className="font-medium text-gray-900 mb-2">Easy Customization</h3>
                <p className="text-sm text-gray-500">Customize templates to match your brand perfectly</p>
                  </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <EnvelopeIcon className="h-5 w-5 text-green-600" />
                  </div>
                <h3 className="font-medium text-gray-900 mb-2">High Engagement</h3>
                <p className="text-sm text-gray-500">Optimized for maximum open and click rates</p>
                </div>
            </motion.div>
          </motion.div>
              </div>
            </div>

    </div>
  )
}