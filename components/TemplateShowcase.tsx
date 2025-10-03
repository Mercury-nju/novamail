'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon, EyeIcon } from '@heroicons/react/24/outline'

interface Template {
  id: string
  name: string
  heroGradient: string
  heroTitle: string
  heroSubtitle: string
  subject: string
  content: {
    greeting: string
    intro: string
    features: string[]
    ctaText: string
  }
  preview: JSX.Element
}

const templates: Template[] = [
  {
    id: 'modern-promo',
    name: 'Modern Promo',
    heroGradient: 'from-blue-500 to-purple-600',
    heroTitle: 'Professional Service Upgrade',
    heroSubtitle: 'Providing stronger support for your business',
    subject: '🎉 Limited Offer! Professional Service Upgrade Plan',
    content: {
      greeting: 'Dear Customer,',
      intro: 'We are pleased to introduce our professional service upgrade plan. Through this plan, you will receive:',
      features: [
        '24/7 Professional Technical Support',
        'Advanced Data Analysis Reports',
        'Customized Solutions'
      ],
      ctaText: 'Upgrade Now'
    },
    preview: (
      <div className="h-20 rounded-lg bg-white border border-gray-200 p-2 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-6 rounded mb-2"></div>
        <div className="space-y-1">
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    heroGradient: 'from-green-500 to-teal-600',
    heroTitle: 'Weekly Newsletter',
    heroSubtitle: 'Stay updated with industry insights and trends',
    subject: '📰 This Week in Tech - Industry Updates',
    content: {
      greeting: 'Dear Subscriber,',
      intro: 'Here are the most important updates from this week that you should know:',
      features: [
        'Industry News & Analysis',
        'Technology Trends',
        'Market Insights'
      ],
      ctaText: 'Read More'
    },
    preview: (
      <div className="h-20 rounded-lg bg-white border border-gray-200 p-2 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 h-6 rounded mb-2"></div>
        <div className="space-y-1">
          <div className="h-2 bg-gray-200 rounded w-2/3"></div>
          <div className="h-2 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    )
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    heroGradient: 'from-pink-500 to-rose-600',
    heroTitle: 'Special Offer',
    heroSubtitle: 'Limited time offer on premium products',
    subject: '🛍️ Special Offer - Premium Products Sale',
    content: {
      greeting: 'Dear Customer,',
      intro: 'Don\'t miss out on our exclusive limited-time offer:',
      features: [
        'Premium Quality Products',
        'Free Shipping Worldwide',
        'Money-back Guarantee'
      ],
      ctaText: 'Shop Now'
    },
    preview: (
      <div className="h-20 rounded-lg bg-white border border-gray-200 p-2 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 h-6 rounded mb-2"></div>
        <div className="space-y-1">
          <div className="h-2 bg-gray-200 rounded w-5/6"></div>
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  },
  {
    id: 'event-invite',
    name: 'Event Invite',
    heroGradient: 'from-indigo-500 to-purple-600',
    heroTitle: 'Annual Conference',
    heroSubtitle: 'Join us for innovation and networking',
    subject: '🎪 Annual Innovation Conference Invitation',
    content: {
      greeting: 'Dear Colleague,',
      intro: 'You are cordially invited to our annual innovation conference featuring:',
      features: [
        'Keynote Speeches by Industry Leaders',
        'Networking Opportunities',
        'Latest Technology Demonstrations'
      ],
      ctaText: 'RSVP Now'
    },
    preview: (
      <div className="h-20 rounded-lg bg-white border border-gray-200 p-2 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-6 rounded mb-2"></div>
        <div className="space-y-1">
          <div className="h-2 bg-gray-200 rounded w-4/5"></div>
          <div className="h-2 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }
]

export default function TemplateShowcase() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])

  return (
    <section className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-100 rounded-full filter blur-sm opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-50 rounded-full filter blur-sm opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
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
            <span className="text-primary-600"> Elevate Your Brand</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Powered by AI - intelligently analyze your needs, generate personalized content, and create professional emails that drive results
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Template Selection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Template Options */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose Your Template</h3>
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedTemplate(template)}
                  className={`
                    relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300
                    ${selectedTemplate.id === template.id 
                      ? 'border-primary-500 bg-primary-50 shadow-lg' 
                      : 'border-gray-200 hover:border-primary-300 hover:shadow-md'
                    }
                  `}
                >
                  {/* Selected Indicator */}
                  {selectedTemplate.id === template.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3"
                    >
                      <CheckIcon className="w-6 h-6 text-primary-600" />
                    </motion.div>
                  )}
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {template.preview}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600">Professional email template</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Right: Email Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              key={selectedTemplate.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
            >
              {/* Email Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      N
                    </div>
                   < div>
                      <div className="font-semibold text-gray-900">NovaMail</div>
                      <div className="text-sm text-gray-500">noreply@novamail.com</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Generated</span>
                  </div>
                </div>
              </div>

              {/* Email Content */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-500">Subject: </span>
                  <span className="text-sm text-gray-900">{selectedTemplate.subject}</span>
                </div>

                <div className="space-y-4">
                  {/* Hero Section */}
                  <div className={`bg-gradient-to-r ${selectedTemplate.heroGradient} p-6 rounded-lg text-white text-center`}>
                    <h1 className="text-2xl font-bold mb-2">{selectedTemplate.heroTitle}</h1>
                    <p className="text-sm opacity-90">{selectedTemplate.heroSubtitle}</p>
                  </div>

                  {/* Email Body */}
                  <div className="space-y-3">
                    <p>{selectedTemplate.content.greeting}</p>
                    <p className="text-gray-700">{selectedTemplate.content.intro}</p>
                    
                    <div className="space-y-2">
                      {selectedTemplate.content.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center pt-4"
                  >
                    <button className={`bg-gradient-to-r ${selectedTemplate.heroGradient} text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200`}>
                      {selectedTemplate.content.ctaText}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
