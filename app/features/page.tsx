'use client'

import { motion } from 'framer-motion'
import BackgroundAnimations from '@/components/BackgroundAnimations'
import { 
  SparklesIcon,
  TemplateIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

export default function FeaturesPage() {
  const features = [
    {
      icon: SparklesIcon,
      title: "Smart Email Generation",
      description: "AI-powered email content generation using advanced technology to create personalized content and improve marketing effectiveness",
      features: [
        "AI Smart Content Generation",
        "Personalized Email Templates",
        "Multi-language Support",
        "Content Optimization Suggestions"
      ]
    },
    {
      icon: TemplateIcon,
      title: "Professional Template Library",
      description: "Rich email templates with custom design support to create brand-specific emails",
      features: [
        "Professional Templates",
        "Responsive Design",
        "Brand Customization",
        "Drag & Drop Editor"
      ]
    },
    {
      icon: UserGroupIcon,
      title: "Contact Management",
      description: "Efficiently manage contacts with support for grouping, tagging and batch operations",
      features: [
        "Smart Grouping",
        "Batch Import",
        "Status Tracking",
        "Data Synchronization"
      ]
    },
    {
      icon: ChartBarIcon,
      title: "Data Analytics",
      description: "Detailed email sending statistics to help optimize marketing strategies",
      features: [
        "Real-time Statistics",
        "Open Rate Analysis",
        "Click Rate Tracking",
        "ROI Calculation"
      ]
    },
    {
      icon: CogIcon,
      title: "SMTP Configuration",
      description: "Support for custom SMTP settings to send emails using your own email account",
      features: [
        "Multi-email Support",
        "Secure Authentication",
        "Send Testing",
        "Configuration Backup"
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: "Data Security",
      description: "Enterprise-level security assurance to protect user data and privacy",
      features: [
        "Data Encryption",
        "Privacy Protection",
        "Compliance Certification",
        "Security Audit"
      ]
    }
  ]

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "1M+", label: "Emails Sent" },
    { number: "99.9%", label: "Delivery Rate" },
    { number: "24/7", label: "Technical Support" }
  ]

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <BackgroundAnimations variant="default" particleCount={15} />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900">Features</h1>
              <p className="text-gray-600 mt-2">More Nova Mail's powerful features</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Powerful Email Marketing
              <span className="block text-yellow-300">Feature Suite</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From smart content generation to data analytics, NovaMail provides you with a complete email marketing solution
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Core Features</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each feature is carefully designed to improve your email marketing effectiveness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <div className="space-y-2">
                  {feature.features.map((feat, featIndex) => (
                    <div key={featIndex} className="flex items-center text-sm text-gray-700">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                      {feat}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start your email marketing journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Register NovaMail now and experience powerful email marketing features
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <span>Get Started</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
              >
                View Pricing
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}