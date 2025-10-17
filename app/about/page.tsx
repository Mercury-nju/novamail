'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  SparklesIcon,
  ArrowRightIcon,
  CheckIcon,
  UserGroupIcon,
  LightBulbIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function AboutPage() {
  const values = [
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible in email marketing, leveraging cutting-edge AI technology.'
    },
    {
      icon: UserGroupIcon,
      title: 'User-Centric',
      description: 'Every feature we build is designed with our users in mind, making complex tasks simple and intuitive.'
    },
    {
      icon: HeartIcon,
      title: 'Passion',
      description: 'We\'re passionate about helping businesses grow through effective email marketing and meaningful connections.'
    }
  ]

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      description: 'Former product manager at leading tech companies with 10+ years in email marketing.',
      image: '👩‍💼'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      description: 'AI and machine learning expert with a passion for building scalable email infrastructure.',
      image: '👨‍💻'
    },
    {
      name: 'Emily Watson',
      role: 'Head of Design',
      description: 'User experience designer focused on creating beautiful, intuitive interfaces.',
      image: '👩‍🎨'
    },
    {
      name: 'David Kim',
      role: 'Head of Marketing',
      description: 'Growth marketing specialist with expertise in email marketing and customer acquisition.',
      image: '👨‍💼'
    }
  ]

  const milestones = [
    {
      year: '2024',
      title: 'NovaMail Founded',
      description: 'Started with a vision to make AI-powered email marketing accessible to everyone.'
    },
    {
      year: '2024',
      title: 'First 1,000 Users',
      description: 'Reached our first milestone of 1,000 active users within 6 months of launch.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Launched advanced AI content generation capabilities for personalized email campaigns.'
    },
    {
      year: '2024',
      title: 'Enterprise Features',
      description: 'Introduced white-label solutions and advanced analytics for enterprise customers.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">NovaMail</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
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
              About
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-primary-600 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent"
              >
                {" "}NovaMail
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              We're on a mission to democratize email marketing by making AI-powered tools accessible to businesses of all sizes.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                NovaMail was born from a simple observation: email marketing was becoming increasingly complex, 
                while the tools available to small and medium businesses remained limited and expensive.
              </p>
              <p>
                Our founders, having worked at leading tech companies, saw an opportunity to leverage 
                artificial intelligence to make professional email marketing accessible to everyone.
              </p>
              <p>
                Today, NovaMail serves thousands of businesses worldwide, helping them create, send, 
                and track email campaigns that drive real results.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 h-64 flex items-center justify-center"
          >
            <SparklesIcon className="h-24 w-24 text-primary-600 opacity-20" />
          </motion.div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-lg text-gray-600">Built with modern, scalable technologies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frontend</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Next.js 14</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">React 18</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">TypeScript</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Tailwind CSS</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Framer Motion</span>
                </div>
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend & Infrastructure</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Cloudflare Workers</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Cloudflare KV</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Prisma ORM</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">SQLite Database</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Edge Computing</span>
                </div>
              </div>
            </motion.div>

            {/* AI & Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI & External Services</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">DashScope AI</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Resend API</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Google OAuth</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Creem Payment</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Stripe Integration</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600">The passionate people behind NovaMail</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">{member.image}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-primary-600 font-medium mb-2">{member.role}</p>
              <p className="text-sm text-gray-600">{member.description}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Key milestones in our growth</p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl font-bold text-primary-600 mr-3">{milestone.year}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="hidden lg:block w-8 h-8 bg-primary-600 rounded-full mx-8 flex-shrink-0"></div>
                <div className="hidden lg:block flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
            <div className="text-gray-600">Active Users</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-3xl font-bold text-primary-600 mb-2">1M+</div>
            <div className="text-gray-600">Emails Sent</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </motion.div>
        </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to join our community?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Start your free trial today and experience the power of AI-driven email marketing
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
                Contact Us
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
