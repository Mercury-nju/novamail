'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon, EyeIcon, SparklesIcon, DocumentTextIcon, ShoppingCartIcon, CalendarIcon } from '@heroicons/react/24/outline'

interface Template {
  id: string
  name: string
  category: string
  icon: JSX.Element
  emailContent: {
    subject: string
    greeting: string
    message: string
    features: string[]
    cta: string
  }
  gradient: string
}

const templates: Template[] = [
  {
    id: 'modern-promo',
    name: 'Modern Promo',
    category: 'Marketing',
    gradient: 'from-blue-500 to-purple-600',
    icon: (
      <SparklesIcon className="w-6 h-6 text-white" />
    ),
    emailContent: {
      subject: '🚀 Exclusive Launch Offer - Limited Time!',
      greeting: 'Dear Valued Customer,',
      message: 'We\'re thrilled to announce our latest product launch with special insider pricing just for you!',
      features: [
        '30% OFF Premium Plans',
        'Free Premium Support',
        'Extended Trial Period'
      ],
      cta: 'Claim Your Offer'
    }
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    category: 'Content',
    gradient: 'from-green-500 to-teal-600',
    icon: (
      <DocumentTextIcon className="w-6 h-6 text-white" />
    ),
    emailContent: {
      subject: '📰 Weekly Newsletter - Industry Insights',
      greeting: 'Hello there,',
      message: 'Welcome to this week\'s digest of the latest trends, tips, and breakthroughs in email marketing.',
      features: [
        'Latest Industry News',
        'Pro Marketing Tips',
        'Success Stories'
      ],
      cta: 'Read Full Newsletter'
    }
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    category: 'Sales',
    gradient: 'from-pink-500 to-rose-600',
    icon: (
      <ShoppingCartIcon className="w-6 h-6 text-white" />
    ),
    emailContent: {
      subject: '🛍️ New Collection Alert - Limited Stock!',
      greeting: 'Hi Fashion Enthusiast,',
      message: 'Our hottest spring collection just dropped and we\'re seeing items fly off the shelves!',
      features: [
        'Free Shipping Over $75',
        'Express Delivery Available',
        'Exclusive Early Access'
      ],
      cta: 'Shop Now'
    }
  },
  {
    id: 'event-invite',
    name: 'Event Invite',
    category: 'Events',
    gradient: 'from-indigo-500 to-purple-600',
    icon: (
      <CalendarIcon className="w-6 h-6 text-white" />
    ),
    emailContent: {
      subject: '🎉 You\'re Invited! Digital Marketing Summit',
      greeting: 'Dear Professional,',
      message: 'Join industry leaders at the biggest digital marketing event of the year.',
      features: [
        'Keynote Speakers',
        'Networking Sessions',
        'Live Workshops'
      ],
      cta: 'RSVP Now'
    }
  }
]

export default function TemplateShowcase() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])

  return (
    <section className="py-12 relative bg-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-72 h-72 bg-primary-100 rounded-full filter blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-20"
          animate={{ 
            scale: [1.1, 1, 1.1], 
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4"
          >
            Professional Templates
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            AI-Powered Templates That
            <span className="text-primary-600 block"> Drive Results</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Choose from professional templates, let AI generate personalized content, and create stunning emails that convert
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Template Selection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between h-full"
          >
            {/* Template Options */}
            <div className="space-y-3 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Template</h3>
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedTemplate(template)}
                  className={`
                    relative group cursor-pointer transition-all duration-300 p-3 rounded-lg border-2 h-20
                    ${selectedTemplate.id === template.id 
                      ? 'border-primary-500 bg-primary-50 shadow-sm' 
                      : 'border-gray-200 hover:border-primary-300 hover:shadow-sm hover:bg-gray-50'
                    }
                  `}
                >
                  {/* Selected Indicator */}
                  {selectedTemplate.id === template.id && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute -top-1 -right-1"
                    >
                      <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="flex items-center space-x-3 h-full">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${template.gradient} rounded-lg flex items-center justify-center shadow-sm`}>
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-900 mb-1">{template.name}</h4>
                      <p className="text-xs text-gray-600">{template.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-primary-50 to-purple-50 p-3 rounded-lg border border-primary-100 h-24 flex flex-col justify-center"
            >
              <div className="flex items-center space-x-2 mb-1">
                <EyeIcon className="w-4 h-4 text-primary-600" />
                <h4 className="text-sm font-semibold text-gray-900">Smart Preview</h4>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                See exactly how your email will look before sending.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Email Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-stretch"
          >
            <motion.div
              key={selectedTemplate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col w-full"
            >
              {/* Email Client Header */}
              <div className="bg-gray-50 p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 bg-gradient-to-r ${selectedTemplate.gradient} rounded-full flex items-center justify-center shadow-sm`}>
                      {selectedTemplate.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">NovaMail</div>
                      <div className="text-xs text-gray-500">noreply@novamail.com</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Just now</div>
                  </div>
                </div>
              </div>

              {/* Email Content */}
              <div className="p-4 flex-grow">
                {/* Subject Line */}
                <div className="mb-4 p-2 bg-gray-50 rounded-lg border-l-4 border-primary-500">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Subject: </span>
                  <span className="text-sm font-medium text-gray-900">{selectedTemplate.emailContent.subject}</span>
                </div>

                {/* Email Body */}
                <div className="space-y-3 mb-6">
                  <div className={`h-16 bg-gradient-to-r ${selectedTemplate.gradient} rounded-lg text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative p-3 h-full flex flex-col justify-center">
                      <h3 className="text-base font-bold mb-1">{selectedTemplate.name}</h3>
                      <p className="text-xs opacity-90">{selectedTemplate.emailContent.message}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-900 font-medium text-sm">{selectedTemplate.emailContent.greeting}</p>
                    <p className="text-gray-700 leading-relaxed text-sm">{selectedTemplate.emailContent.message}</p>
                    
                    <div className="space-y-1">
                      {selectedTemplate.emailContent.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700 text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    w-full mt-3 py-2 rounded-lg font-semibold text-white shadow-sm hover:shadow-md transition-all duration-200 text-sm
                    bg-gradient-to-r ${selectedTemplate.gradient}
                  `}
                >
                  {selectedTemplate.emailContent.cta}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}