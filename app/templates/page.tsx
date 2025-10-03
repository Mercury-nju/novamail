'use client'

import { motion } from 'framer-motion'
import BackgroundAnimations from '@/components/BackgroundAnimations'
import { 
  EyeIcon,
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function TemplatesPage() {
  const templates = [
    {
      id: 'modern-promo',
      name: 'Modern Promo',
      category: 'Marketing',
      description: 'Modern design suitable for product promotion and sales activities',
      preview: '/api/placeholder/400/300',
      features: ['Responsive Design', 'CTA Button', 'Product Display', 'Social Media Links'],
      isPro: true
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      category: 'Content Marketing',
      description: 'Professional newsletter template, suitable for regular content delivery',
      preview: '/api/placeholder/400/300',
      features: ['Multi-column Layout', 'Article Summary', 'Subscription Management', 'Sharing Features'],
      isPro: true
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      category: 'E-commerce Marketing',
      description: 'Email template designed specifically for e-commerce, highlighting product features',
      preview: '/api/placeholder/400/300',
      features: ['Product Grid', 'Price Display', 'Shopping Cart Reminder', 'Product Recommendations'],
      isPro: true
    },
    {
      id: 'event-invite',
      name: 'Event Invite',
      category: 'Event Marketing',
      description: 'Beautiful event invitation template to increase participation',
      preview: '/api/placeholder/400/300',
      features: ['Event Details', 'Time & Location', 'RSVP Button', 'Map Integration'],
      isPro: true
    },
    {
      id: 'welcome',
      name: 'Welcome Email',
      category: 'User Onboarding',
      description: 'New user welcome email to create a good first impression',
      preview: '/api/placeholder/400/300',
      features: ['Personalized Welcome', 'Feature Introduction', 'Quick Start', 'Help Links'],
      isPro: false
    },
    {
      id: 'simple-text',
      name: 'Simple Text',
      category: 'Basic Template',
      description: 'Simple text email template suitable for formal communication',
      preview: '/api/placeholder/400/300',
      features: ['Plain Text Format', 'Clean Layout', 'High Readability', 'Universal Applicability'],
      isPro: false
    }
  ]

  const categories = ['All', 'Marketing', 'Content Marketing', 'E-commerce Marketing', 'Event Marketing', 'User Onboarding', 'Basic Template']

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <BackgroundAnimations variant="default" particleCount={10} />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
              <p className="text-gray-600 mt-2">Choose the right template to create professional emails</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === 'All' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Preview Image */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <EyeIcon className="w-12 h-12 text-gray-400" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {template.category}
                  </span>
                  {template.isPro && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <SparklesIcon className="w-3 h-3 mr-1" />
                      Pro
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        <CheckIcon className="w-3 h-3 mr-1 text-green-500" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <span>Use Template</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't Find the Perfect Template?</h2>
          <p className="text-gray-600 mb-6">Contact our team to create a custom template tailored for your business needs.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-500 hover:bg-primary-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Request Custom Template
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}