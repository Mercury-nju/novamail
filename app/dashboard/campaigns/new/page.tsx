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
      id: 'modern-gradient',
      name: 'Modern Gradient',
      category: 'Modern',
      description: 'Contemporary design with vibrant gradients and bold typography',
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
      features: ['Vibrant Gradients', 'Bold Typography', 'Modern Layout', 'Strong CTA'],
      isPopular: true,
      isNew: false
    },
    {
      id: 'minimal-clean',
      name: 'Minimal Clean',
      category: 'Minimal',
      description: 'Clean, minimalist design with plenty of white space and elegant typography',
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
      features: ['Clean Typography', 'White Space', 'Elegant Layout', 'Subtle Colors'],
      isPopular: true,
      isNew: false
    },
    {
      id: 'corporate-professional',
      name: 'Corporate Professional',
      category: 'Corporate',
      description: 'Professional business design with structured layout and corporate colors',
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
      features: ['Structured Layout', 'Corporate Colors', 'Professional Tone', 'Business Focus'],
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
      case 'Modern': return 'bg-gray-100 text-gray-700'
      case 'Minimal': return 'bg-gray-100 text-gray-700'
      case 'Corporate': return 'bg-gray-100 text-gray-700'
      case 'Creative': return 'bg-gray-100 text-gray-700'
      case 'Elegant': return 'bg-gray-100 text-gray-700'
      case 'Bold': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
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
                <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-3">Choose Your Template</h2>
          <p className="text-gray-500 max-w-lg mx-auto">Select a design style that matches your brand</p>
                </div>
                
        {/* Template Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
                    <button
            onClick={handlePrevTemplate}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-md transition-all duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5" />
                    </button>

                    <button
            onClick={handleNextTemplate}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-md transition-all duration-200"
          >
            <ArrowRightIcon className="h-5 w-5" />
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
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Template Info */}
              <div className="p-8 lg:p-10">
                <div className="text-center mb-8">
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentTemplate.category)}`}>
                      {currentTemplate.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-light text-gray-900 mb-3">{currentTemplate.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                    {currentTemplate.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="space-y-2">
                    {currentTemplate.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center px-3 py-2 bg-gray-50 rounded-md"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>


                <motion.button 
                  onClick={handleUseTemplate}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-all duration-200"
                >
                  <span>Use This Template</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </motion.button>
                  </div>
                  
              {/* Template Preview */}
              <div className="bg-gray-50 p-6 lg:p-8">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-1">Preview</h4>
                  <p className="text-xs text-gray-500">Email design preview</p>
                </div>
                
                {/* Subject Line Preview */}
                <div className="mb-4">
                  <div className="bg-white rounded border border-gray-200 p-3">
                    <div className="text-xs text-gray-400 mb-1">Subject</div>
                    <div className="text-sm text-gray-900">
                      {currentTemplate.subject}
                    </div>
                  </div>
              </div>

                {/* Email Content Preview */}
                <div className="bg-white rounded border border-gray-200 overflow-hidden">
                  <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-3 max-h-80 overflow-y-auto">
                    <div 
                      className="w-full transform scale-75 origin-top pointer-events-none"
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
        <div className="flex justify-center mt-8 space-x-2">
          {professionalTemplates.map((template, index) => (
                      <button
              key={index}
              onClick={() => setCurrentTemplateIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentTemplateIndex
                  ? 'bg-gray-900'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}