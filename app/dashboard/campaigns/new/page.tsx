'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  SparklesIcon, 
  ArrowRightIcon,
  ArrowLeftIcon,
  XMarkIcon,
  RocketLaunchIcon,
  PencilIcon,
  EyeIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

interface ProfessionalTemplate {
  id: string
  name: string
  category: string
  description: string
  subject: string
  htmlContent: string
  features: string[]
  isPopular: boolean
  isNew: boolean
}

interface CampaignData {
  templateId: string
  subject: string
  body: string
  businessName: string
  productService: string
  targetUrl: string
  tone: string
  targetAudience: string
  customizations: Record<string, string>
}

export default function NewCampaignPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0)
  const [campaignData, setCampaignData] = useState<CampaignData>({
    templateId: '',
    subject: '',
    body: '',
    businessName: '',
    productService: '',
    targetUrl: '',
    tone: 'professional',
    targetAudience: '',
    customizations: {}
  })

  const professionalTemplates: ProfessionalTemplate[] = [
    {
      id: 'product-launch',
      name: 'Product Launch Announcement',
      category: 'Marketing',
      description: 'Professional product launch email with compelling CTA and brand storytelling',
      subject: '🚀 Introducing [Product Name] - The Future is Here',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">🚀 Introducing [Product Name]</h1>
            <p style="color: white; margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">The Future is Here</p>
          </div>
          
          <div style="padding: 30px 20px;">
            <p style="color: #333; font-size: 14px; line-height: 1.5; margin-bottom: 15px;">
              Dear [Customer Name],
            </p>
            
            <p style="color: #333; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
              I'm excited to announce the launch of <strong>[Product Name]</strong>, a revolutionary solution that will transform how you [solve problem].
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #333; margin: 0 0 12px 0; font-size: 16px;">What makes [Product Name] special:</h3>
              <ul style="color: #555; margin: 0; padding-left: 16px; font-size: 13px;">
                <li style="margin-bottom: 6px;">[Key Benefit 1]</li>
                <li style="margin-bottom: 6px;">[Key Benefit 2]</li>
                <li style="margin-bottom: 6px;">[Key Benefit 3]</li>
              </ul>
            </div>
            
            <div style="background: linear-gradient(135deg, #ff6b6b, #ee5a24); padding: 20px; border-radius: 6px; text-align: center; margin: 20px 0;">
              <h3 style="color: white; margin: 0 0 8px 0; font-size: 16px;">🎯 Early Bird Offer</h3>
              <p style="color: white; margin: 0; font-size: 13px;">
                For the first 100 customers, we're offering [Product Name] at <strong>50% off</strong> the regular price.
              </p>
              <p style="color: white; margin: 8px 0 0 0; font-size: 12px; opacity: 0.9;">
                This exclusive offer expires in 48 hours.
              </p>
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="[Target URL]" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; font-weight: bold; font-size: 14px;">
                Get [Product Name] Now
              </a>
            </div>
            
            <div style="background: #e8f4fd; padding: 16px; border-radius: 6px; margin: 20px 0;">
              <h4 style="color: #333; margin: 0 0 8px 0; font-size: 14px;">Why now?</h4>
              <p style="color: #555; margin: 0; font-size: 12px;">[Social proof or urgency reason]</p>
            </div>
            
            <p style="color: #333; font-size: 14px; line-height: 1.5; margin: 20px 0;">
              Don't miss out on this opportunity to be among the first to experience the future.
            </p>
            
            <p style="color: #333; font-size: 14px; line-height: 1.5; margin: 25px 0 0 0;">
              Best regards,<br>
              [Your Name]<br>
              [Company Name]
            </p>
          </div>
        </div>
      `,
      features: ['Brand Storytelling', 'Product Showcase', 'Strong CTA', 'Social Proof'],
      isPopular: true,
      isNew: false
    },
    {
      id: 'customer-onboarding',
      name: 'Customer Onboarding Series',
      category: 'Welcome',
      description: 'Comprehensive onboarding sequence to guide new customers through your platform',
      subject: 'Welcome to [Company Name] - Let\'s Get Started!',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">👋 Welcome to [Company Name]</h1>
            <p style="color: white; margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Let's Get Started!</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hi [Customer Name],
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Welcome to <strong>[Company Name]</strong>! We're thrilled to have you on board.
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #333; margin: 0 0 20px 0; font-size: 18px;">Your journey starts here:</h3>
              
              <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 30px; height: 30px; background: #4ecdc4; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                    <span style="color: white; font-weight: bold;">1</span>
                  </div>
                  <div>
                    <h4 style="color: #333; margin: 0; font-size: 16px;">Complete your profile</h4>
                    <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Help us personalize your experience</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 30px; height: 30px; background: #4ecdc4; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                    <span style="color: white; font-weight: bold;">2</span>
                  </div>
                  <div>
                    <h4 style="color: #333; margin: 0; font-size: 16px;">Explore our features</h4>
                    <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Take a tour of what [Company Name] can do for you</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center;">
                  <div style="width: 30px; height: 30px; background: #4ecdc4; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                    <span style="color: white; font-weight: bold;">3</span>
                  </div>
                  <div>
                    <h4 style="color: #333; margin: 0; font-size: 16px;">Connect with our community</h4>
                    <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Join thousands of successful users</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h4 style="color: #333; margin: 0 0 10px 0; font-size: 16px;">💡 Pro tip:</h4>
              <p style="color: #555; margin: 0; font-size: 14px;">[Helpful tip for new users]</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="[Target URL]" style="display: inline-block; background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
                Get Started Now
              </a>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 25px 0;">
              We're excited to see what you'll accomplish with [Company Name]!
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
              Welcome aboard,<br>
              [Your Name]<br>
              [Company Name] Team
            </p>
          </div>
        </div>
      `,
      features: ['Step-by-step Guide', 'Resource Links', 'Personal Touch', 'Next Steps'],
      isPopular: true,
      isNew: false
    },
    {
      id: 'newsletter-professional',
      name: 'Professional Newsletter',
      category: 'Newsletter',
      description: 'Clean, professional newsletter template for business communications',
      subject: '[Company Name] Monthly Newsletter - [Month Year]',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">📰 [Company Name]</h1>
            <p style="color: white; margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Monthly Newsletter - [Month Year]</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Dear [Subscriber Name],
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Welcome to our <strong>[Month Year]</strong> newsletter! Here's what's happening at [Company Name]:
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">📈 This Month's Highlights:</h3>
              <ul style="color: #555; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">[Key Achievement 1]</li>
                <li style="margin-bottom: 8px;">[Key Achievement 2]</li>
                <li style="margin-bottom: 8px;">[Key Achievement 3]</li>
              </ul>
            </div>
            
            <div style="border-left: 4px solid #667eea; padding-left: 20px; margin: 25px 0;">
              <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">🔍 Industry Insights:</h3>
              <p style="color: #555; margin: 0; font-size: 14px;">[Industry news or insights]</p>
            </div>
            
            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h4 style="color: #333; margin: 0 0 10px 0; font-size: 16px;">💡 Featured Content:</h4>
              <p style="color: #555; margin: 0; font-size: 14px;">[Link to featured article or resource]</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="[Target URL]" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
                Read More
              </a>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 25px 0;">
              Thank you for being part of our community. We value your feedback and suggestions.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
              Best regards,<br>
              [Your Name]<br>
              [Company Name]
            </p>
          </div>
        </div>
      `,
      features: ['Clean Layout', 'Industry Insights', 'Company Updates', 'Exclusive Content'],
      isPopular: false,
      isNew: true
    }
  ]

  useEffect(() => {
    const templateId = searchParams.get('template')
    if (templateId) {
      const index = professionalTemplates.findIndex(t => t.id === templateId)
      if (index !== -1) {
        setCurrentTemplateIndex(index)
      }
    }
  }, [searchParams])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevTemplate()
      } else if (event.key === 'ArrowRight') {
        handleNextTemplate()
      } else if (event.key === 'Enter' && event.target === document.body) {
        handleUseTemplate()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  const currentTemplate = professionalTemplates[currentTemplateIndex]

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

  const handleNextTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev + 1) % professionalTemplates.length)
  }

  const handlePrevTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev - 1 + professionalTemplates.length) % professionalTemplates.length)
  }

  const handleUseTemplate = () => {
    setCampaignData(prev => ({
      ...prev,
      templateId: currentTemplate.id,
      subject: currentTemplate.subject,
      body: currentTemplate.htmlContent
    }))
    // Navigate to the editing page
    router.push(`/dashboard/campaigns/edit?template=${currentTemplate.id}`)
  }


  const handleBack = () => {
    router.push('/dashboard')
  }


  return (
    <div className="min-h-screen bg-white">
          {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Professional Templates</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentTemplateIndex + 1} of {professionalTemplates.length}
              </div>
            </div>
                    </div>
              </div>
            </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Email Template</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">Browse our collection of professionally designed templates. Each one is crafted to help you create stunning emails that engage your audience.</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs mr-1">←</kbd>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs mr-1">→</kbd>
              Navigate
            </span>
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs mr-1">Enter</kbd>
              Select
            </span>
          </div>
                </div>
                
        {/* Template Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
                    <button
            onClick={handlePrevTemplate}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
          >
            <ArrowLeftIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                    </button>

                    <button
            onClick={handleNextTemplate}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
          >
            <ArrowRightIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                    </button>

          {/* Template Display */}
          <motion.div
            key={currentTemplateIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Template Info */}
              <div className="p-8 lg:p-12">
                <div className="text-center mb-8">
                  <div className="flex justify-center space-x-2 mb-4">
                    {currentTemplate.isNew && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✨ New
                      </span>
                    )}
                    {currentTemplate.isPopular && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                        🔥 Popular
                      </span>
                    )}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentTemplate.category)}`}>
                      {currentTemplate.category}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{currentTemplate.name}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                    {currentTemplate.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">Key Features</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {currentTemplate.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-sm font-medium text-gray-800">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>


                <motion.button 
                  onClick={handleUseTemplate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl group"
                >
                  <PencilIcon className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Use This Template</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
                  </div>
                  
              {/* Template Preview */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Live Preview</h4>
                  <p className="text-sm text-gray-500">See how your email will look</p>
                </div>
                
                {/* Subject Line Preview */}
                    <div className="mb-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="text-sm text-gray-500 mb-1">Subject Line</div>
                    <div className="text-gray-900 font-medium">
                      {currentTemplate.subject}
                    </div>
                  </div>
              </div>

                {/* Email Content Preview */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="text-xs text-gray-500 ml-2">Email Preview</div>
                    </div>
                  </div>
                  <div className="p-4 max-h-96 overflow-y-auto">
                    <div 
                      className="w-full transform scale-90 origin-top pointer-events-none"
                      dangerouslySetInnerHTML={{ 
                        __html: currentTemplate.htmlContent.replace(
                          /<a\s+([^>]*?)>/gi, 
                          '<a $1 style="pointer-events: none; cursor: default; text-decoration: none;">'
                        )
                      }}
                      style={{ 
                        userSelect: 'none',
                        '--preview-mode': 'true'
                      } as React.CSSProperties}
                    />
                  </div>
                  </div>
                </div>
            </div>
          </motion.div>
                  </div>
                  
        {/* Template Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {professionalTemplates.map((template, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentTemplateIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                index === currentTemplateIndex
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              <motion.div 
                className={`w-2 h-2 rounded-full ${
                  index === currentTemplateIndex ? 'bg-white' : 'bg-gray-400'
                }`}
                animate={{
                  scale: index === currentTemplateIndex ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 0.6,
                  repeat: index === currentTemplateIndex ? Infinity : 0,
                  repeatDelay: 2
                }}
              ></motion.div>
              <span className="text-sm font-medium">{template.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}