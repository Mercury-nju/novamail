'use client'

import { motion } from 'framer-motion'
import {
  SparklesIcon, 
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">NovaMail</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-2xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Email Templates
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Create stunning emails with our professionally designed templates
          </p>
          
          <Link
            href="/dashboard/campaigns/new"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            <SparklesIcon className="h-6 w-6 mr-3" />
            Create Email
            <ArrowRightIcon className="h-6 w-6 ml-3" />
          </Link>
            </motion.div>
      </div>
    </div>
  )
}