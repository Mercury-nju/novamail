'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SparklesIcon, 
  EyeIcon,
  PencilIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface ProfessionalTemplate {
  id: string
  name: string
  category: string
  description: string
  preview: string
  subject: string
  isPopular: boolean
  isNew: boolean
  features: string[]
}

export default function Dashboard() {
  const [templates, setTemplates] = useState<ProfessionalTemplate[]>([])
  const [stats, setStats] = useState({
    totalTemplates: 0,
    templatesUsed: 0,
    emailsSent: 0,
    successRate: 0
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    // Real professional email templates
    const professionalTemplates: ProfessionalTemplate[] = [
      {
        id: 'product-launch',
        name: 'Product Launch Announcement',
        category: 'Marketing',
        description: 'Professional product launch email with compelling CTA and brand storytelling',
        preview: 'Introducing our revolutionary new product that will transform your business...',
        subject: '🚀 Introducing [Product Name] - The Future is Here',
        isPopular: true,
        isNew: false,
        features: ['Brand Storytelling', 'Product Showcase', 'Strong CTA', 'Social Proof']
      },
      {
        id: 'customer-onboarding',
        name: 'Customer Onboarding Series',
        category: 'Welcome',
        description: 'Comprehensive onboarding sequence to guide new customers through your platform',
        preview: 'Welcome to [Company Name]! Let\'s get you started on your journey to success...',
        subject: 'Welcome to [Company Name] - Let\'s Get Started!',
        isPopular: true,
        isNew: false,
        features: ['Step-by-step Guide', 'Resource Links', 'Personal Touch', 'Next Steps']
      },
      {
        id: 'newsletter-professional',
        name: 'Professional Newsletter',
        category: 'Newsletter',
        description: 'Clean, professional newsletter template for business communications',
        preview: 'This month\'s highlights: industry insights, company updates, and exclusive content...',
        subject: '[Company Name] Monthly Newsletter - [Month Year]',
        isPopular: false,
        isNew: true,
        features: ['Clean Layout', 'Industry Insights', 'Company Updates', 'Exclusive Content']
      },
      {
        id: 'sales-pitch',
        name: 'Sales Pitch Email',
        category: 'Sales',
        description: 'High-converting sales email with proven psychological triggers',
        preview: 'I noticed you\'re looking for a solution to [pain point]. Here\'s how we can help...',
        subject: 'Quick question about [Pain Point] - Can I help?',
        isPopular: true,
        isNew: false,
        features: ['Pain Point Focus', 'Solution Presentation', 'Social Proof', 'Urgency']
      },
      {
        id: 'customer-retention',
        name: 'Customer Retention Campaign',
        category: 'Retention',
        description: 'Strategic email to re-engage inactive customers and prevent churn',
        preview: 'We miss you! Here\'s what you\'ve been missing and how to get back on track...',
        subject: 'We Miss You - Here\'s What You\'ve Been Missing',
        isPopular: false,
        isNew: true,
        features: ['Personal Touch', 'Value Reminder', 'Re-engagement Offer', 'Easy Return']
      },
      {
        id: 'event-invitation',
        name: 'Event Invitation',
        category: 'Events',
        description: 'Elegant event invitation with clear details and compelling reasons to attend',
        preview: 'You\'re invited to our exclusive event featuring industry leaders and networking...',
        subject: 'You\'re Invited: [Event Name] - [Date]',
        isPopular: false,
        isNew: false,
        features: ['Clear Event Details', 'Speaker Highlights', 'Networking Benefits', 'Easy RSVP']
      }
    ]

    setTemplates(professionalTemplates)
    setStats({
      totalTemplates: professionalTemplates.length,
      templatesUsed: 12,
      emailsSent: 2847,
      successRate: 23.5
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Marketing': return 'bg-blue-100 text-blue-800'
      case 'Welcome': return 'bg-green-100 text-green-800'
      case 'Newsletter': return 'bg-purple-100 text-purple-800'
      case 'Sales': return 'bg-red-100 text-red-800'
      case 'Retention': return 'bg-yellow-100 text-yellow-800'
      case 'Events': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">NovaMail</h1>
              </div>
              <div className="hidden md:block">
                <span className="text-sm text-gray-600">Professional Email Marketing Platform</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/campaigns/new"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <SparklesIcon className="h-4 w-4 mr-2" />
                Create Email
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Email Templates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of professionally designed email templates. 
            Each template is crafted by experts and optimized for maximum engagement.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Templates</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTemplates}</p>
                        </div>
                      </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Used</p>
                <p className="text-2xl font-bold text-gray-900">{stats.templatesUsed}</p>
                      </div>
                    </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <RocketLaunchIcon className="h-6 w-6 text-purple-600" />
                              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold text-gray-900">{stats.emailsSent.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <StarIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
              </div>
            </div>
          </motion.div>
                  </div>

                  {/* Professional Templates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
                  <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional Templates</h3>
              <p className="text-gray-600">Choose from our expertly crafted email templates</p>
                            </div>
            <Link
              href="/dashboard/campaigns/new"
              className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
                  </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                      {template.category}
                    </span>
                    {template.isPopular && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <FireIcon className="h-3 w-3 mr-1" />
                        Popular
                      </span>
                    )}
                    {template.isNew && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        New
                      </span>
                    )}
            </div>
      </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-1">Subject Line:</p>
                  <p className="text-sm text-gray-800 font-medium">{template.subject}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-1">Preview:</p>
                  <p className="text-sm text-gray-700 italic">"{template.preview}"</p>
                  </div>

                <div className="mb-6">
                  <p className="text-xs font-medium text-gray-500 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                  </div>

                <div className="flex space-x-2">
                  <Link
                    href={`/dashboard/campaigns/new?template=${template.id}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Use Template
                  </Link>
                  <button
                    onClick={() => toast.success('Preview feature coming soon!')}
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                </div>
            </motion.div>
            ))}
        </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Get Started</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/dashboard/campaigns/new"
              className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all duration-200 group"
            >
              <div className="p-4 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors mb-4">
                <SparklesIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Create Email</h4>
              <p className="text-sm text-gray-600 text-center">Choose a professional template and customize it for your needs</p>
            </Link>

            <Link
              href="/dashboard/contacts"
              className="flex flex-col items-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:from-green-100 hover:to-blue-100 transition-all duration-200 group"
            >
              <div className="p-4 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors mb-4">
                <DocumentTextIcon className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Manage Contacts</h4>
              <p className="text-sm text-gray-600 text-center">Import and organize your contact lists for targeted campaigns</p>
            </Link>

            <Link
              href="/dashboard/analytics"
              className="flex flex-col items-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group"
            >
              <div className="p-4 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors mb-4">
                <RocketLaunchIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">View Analytics</h4>
              <p className="text-sm text-gray-600 text-center">Track your email performance and optimize your campaigns</p>
            </Link>
          </div>
        </motion.div>
        </div>
    </div>
  )
}