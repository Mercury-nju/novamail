'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  SparklesIcon,
  EnvelopeIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CheckIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ClockIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CogIcon
} from '@heroicons/react/24/outline'

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: CpuChipIcon,
      title: 'AI-Powered Content Generation',
      description: 'Generate compelling email content in seconds with our advanced AI technology. Create personalized messages that resonate with your audience.',
      features: [
        'Multiple content styles (casual, formal, promotional)',
        'User segment-specific messaging',
        'Goal-based content generation',
        'Customizable templates'
      ]
    },
    {
      icon: UserGroupIcon,
      title: 'Smart Contact Management',
      description: 'Organize and manage your email lists with intelligent segmentation and deduplication features.',
      features: [
        'CSV import and export',
        'Manual contact addition',
        'User segment classification',
        'Contact deduplication'
      ]
    },
    {
      icon: EnvelopeIcon,
      title: 'Advanced Email Campaigns',
      description: 'Create, schedule, and manage email campaigns with powerful automation and personalization tools.',
      features: [
        'Multi-step campaign creation',
        'Draft saving and editing',
        'Campaign scheduling',
        'A/B testing capabilities'
      ]
    },
    {
      icon: ChartBarIcon,
      title: 'Comprehensive Analytics',
      description: 'Track and analyze your email marketing performance with detailed insights and reporting.',
      features: [
        'Delivery and reply rate tracking',
        'Campaign performance metrics',
        'User segment analysis',
        'Hourly engagement patterns'
      ]
    }
  ]

  const additionalFeatures = [
    {
      icon: ShieldCheckIcon,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with GDPR compliance and data protection.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Multi-language Support',
      description: 'Support for multiple languages and timezones for global reach.'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile Responsive',
      description: 'Fully responsive design that works perfectly on all devices.'
    },
    {
      icon: CogIcon,
      title: 'API Integration',
      description: 'Powerful API for custom integrations and third-party connections.'
    },
    {
      icon: ClockIcon,
      title: 'Real-time Updates',
      description: 'Live campaign status updates and real-time analytics.'
    },
    {
      icon: SparklesIcon,
      title: 'Custom Branding',
      description: 'White-label options and custom branding for enterprise customers.'
    }
  ]

  const useCases = [
    {
      title: 'E-commerce Marketing',
      description: 'Drive sales with targeted product announcements and promotional campaigns.',
      icon: '🛒'
    },
    {
      title: 'SaaS Onboarding',
      description: 'Welcome new users and guide them through your platform with automated sequences.',
      icon: '🚀'
    },
    {
      title: 'Content Marketing',
      description: 'Share blog posts, newsletters, and thought leadership content with your audience.',
      icon: '📝'
    },
    {
      title: 'Event Promotion',
      description: 'Promote webinars, conferences, and events with engaging email campaigns.',
      icon: '🎯'
    },
    {
      title: 'Customer Retention',
      description: 'Re-engage inactive users and reduce churn with personalized messaging.',
      icon: '💝'
    },
    {
      title: 'Lead Nurturing',
      description: 'Convert prospects into customers with strategic email sequences.',
      icon: '🌱'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                NovaMail
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Powerful Features for
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-primary-600 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent"
              >
                {" "}Email Marketing
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Everything you need to create, send, and track professional email campaigns with AI assistance.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <h2 className="ml-4 text-2xl font-bold text-gray-900">{feature.title}</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 h-64 flex items-center justify-center">
                  <feature.icon className="h-24 w-24 text-primary-600 opacity-20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Features */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Features</h2>
            <p className="text-lg text-gray-600">Everything you need for professional email marketing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect for Every Use Case</h2>
          <p className="text-lg text-gray-600">See how NovaMail can help your business grow</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
              <p className="text-gray-600">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to experience these features?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Start your free trial today and see how NovaMail can transform your email marketing
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/register"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
              >
                Start Free Trial
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/integrations" className="hover:text-white">Integrations</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
                <li><Link href="/gdpr" className="hover:text-white">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NovaMail. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
