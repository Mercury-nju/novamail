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
      <div className="relative">
        <SparklesIcon className="w-8 h-8 text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
      </div>
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
      <div className="relative">
        <DocumentTextIcon className="w-8 h-8 text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
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
      <div className="relative">
        <ShoppingCartIcon className="w-8 h-8 text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full"></div>
      </div>
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
      <div className="relative">
        <CalendarIcon className="w-8 h-8 text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full"></div>
      </div>
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
    <section className="py-16 relative bg-gray-50 overflow-hidden">
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
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4"
          >
            Professional Template Showcase
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Professional Templates That
            <span className="text-primary-600 block"> Elevate Your Brand</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Powered by AI - intelligently analyze your needs, generate personalized content, and create professional emails that drive results
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
            <div className="space-y-4 mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Template</h3>
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedTemplate(template)}
                  className={`
                    relative group cursor-pointer transition-all duration-300 p-4 rounded-lg border-2 h-24
                    ${selectedTemplate.id === template.id 
                      ? 'border-primary-500 bg-primary-50 shadow-md' 
                      : 'border-gray-200 hover:border-primary-300 hover:shadow-sm hover:bg-gray-50'
                    }
                  `}
                >
                  {/* Selected Indicator */}
                  {selectedTemplate.id === template.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-sm">
                        <CheckIcon className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="flex items-center space-x-4 h-full">
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${template.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.category}</p>
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
              className="bg-gradient-to-r from-primary-50 to-purple-50 p-4 rounded-xl border border-primary-100 h-32 flex flex-col justify-center"
            >
              <div className="flex items-center space-x-3 mb-2">
                <EyeIcon className="w-5 h-5 text-primary-600" />
                <h4 className="text-base font-semibold text-gray-900">Smart Preview</h4>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
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
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col w-full"
            >
              {/* Email Client Header */}
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${selectedTemplate.gradient} rounded-full flex items-center justify-center shadow-md`}>
                      {selectedTemplate.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">NovaMail</div>
                      <div className="text-sm text-gray-500">noreply@novamail.com</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Just now</div>
                  </div>
                </div>
              </div>

              {/* Email Content */}
              <div className="p-6 flex-grow">
                {/* Subject Line */}
                <div className="mb-6 p-3 bg-gray-50 rounded-lg border-l-4 border-primary-500">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Subject: </span>
                  <span className="text-sm font-medium text-gray-900">{selectedTemplate.emailContent.subject}</span>
                </div>

                {/* Email Body */}
                <div className="space-y-4 mb-8">
                  <div className={`h-20 bg-gradient-to-r ${selectedTemplate.gradient} rounded-lg text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative p-4 h-full flex flex-col justify-center">
                      <h3 className="text-lg font-bold mb-1">{selectedTemplate.name}</h3>
                      <p className="text-sm opacity-90">{selectedTemplate.emailContent.message}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-900 font-medium">{selectedTemplate.emailContent.greeting}</p>
                    <p className="text-gray-700 leading-relaxed">{selectedTemplate.emailContent.message}</p>
                    
                    <div className="space-y-2">
                      {selectedTemplate.emailContent.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckIcon className="w-2.5 h-2.5 text-green-600" />
                          </div>
                          <span className="text-gray-700 text-sm">{feature}</span>
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
                    w-full mt-4 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200
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