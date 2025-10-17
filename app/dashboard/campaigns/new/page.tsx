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
  const [isEditing, setIsEditing] = useState(false)
  const [editingField, setEditingField] = useState<'subject' | 'content' | null>(null)
  const [editedContent, setEditedContent] = useState('')
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
    toast.success('Template selected! You can now customize the content.')
  }

  const handleEditField = (field: 'subject' | 'content') => {
    setEditingField(field)
    if (field === 'subject') {
      setEditedContent(currentTemplate.subject)
    } else {
      setEditedContent(currentTemplate.htmlContent)
    }
  }

  const handleSaveEdit = () => {
    if (editingField === 'subject') {
      // Update the template subject
      const updatedTemplate = { ...currentTemplate, subject: editedContent }
      professionalTemplates[currentTemplateIndex] = updatedTemplate
      setCampaignData(prev => ({ ...prev, subject: editedContent }))
    } else if (editingField === 'content') {
      // Update the template content
      const updatedTemplate = { ...currentTemplate, htmlContent: editedContent }
      professionalTemplates[currentTemplateIndex] = updatedTemplate
      setCampaignData(prev => ({ ...prev, body: editedContent }))
    }
    
    setEditingField(null)
    setEditedContent('')
    toast.success('Changes saved successfully!')
  }

  const handleCancelEdit = () => {
    setEditingField(null)
    setEditedContent('')
  }

  const handleGenerateWithAI = async () => {
    try {
      toast.loading('Generating personalized content with AI...', { id: 'ai-generate' })
      
      const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/ai/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: currentTemplate.id,
          businessName: campaignData.businessName || 'Your Business',
          productService: campaignData.productService || 'Your Product/Service',
          targetAudience: campaignData.targetAudience || 'Your Customers',
          tone: campaignData.tone,
          customizations: campaignData.customizations
        })
      })

      if (response.ok) {
        const result = await response.json()
        const updatedTemplate = { 
          ...currentTemplate, 
          subject: result.subject || currentTemplate.subject,
          htmlContent: result.htmlContent || currentTemplate.htmlContent
        }
        professionalTemplates[currentTemplateIndex] = updatedTemplate
        setCampaignData(prev => ({
          ...prev,
          subject: result.subject || prev.subject,
          body: result.htmlContent || prev.body
        }))
        toast.success('AI-generated content applied!', { id: 'ai-generate' })
      } else {
        throw new Error('Failed to generate content')
      }
    } catch (error) {
      toast.error('Failed to generate AI content. Please try again.', { id: 'ai-generate' })
    }
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handleEditTemplate = () => {
    setIsEditing(true)
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
                <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Select from our collection of professionally designed email templates</h2>
          <p className="text-lg text-gray-600">Swipe to browse our collection of expertly crafted templates</p>
                </div>
                
        {/* Template Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
                    <button
            onClick={handlePrevTemplate}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeftIcon className="h-6 w-6" />
                    </button>

                    <button
            onClick={handleNextTemplate}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all duration-200"
          >
            <ArrowRightIcon className="h-6 w-6" />
                    </button>

          {/* Template Display */}
          <motion.div
            key={currentTemplateIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Template Info */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-3 mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentTemplate.category)}`}>
                    {currentTemplate.category}
                  </span>
                  {currentTemplate.isPopular && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Popular
                    </span>
                  )}
                  {currentTemplate.isNew && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      New
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentTemplate.name}</h3>
                <p className="text-gray-600 mb-6">{currentTemplate.description}</p>

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Template Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentTemplate.features.map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">Business Information</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                      <input
                        type="text"
                        value={campaignData.businessName}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, businessName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Business Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product/Service</label>
                      <input
                        type="text"
                        value={campaignData.productService}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, productService: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Product or Service"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                      <input
                        type="text"
                        value={campaignData.targetAudience}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, targetAudience: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Target Customers"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleUseTemplate}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Use This Template
                </button>
                  </div>
                  
              {/* Template Preview */}
              <div className="bg-gray-50 p-8 lg:p-12">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Email Preview</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditField('subject')}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-md hover:bg-blue-50"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit Subject
                    </button>
                    <button
                      onClick={() => handleEditField('content')}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-purple-600 hover:text-purple-700 border border-purple-200 rounded-md hover:bg-purple-50"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit Content
                    </button>
                    <button
                      onClick={handleGenerateWithAI}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600 hover:text-green-700 border border-green-200 rounded-md hover:bg-green-50"
                    >
                      <SparklesIcon className="h-4 w-4 mr-1" />
                      AI Generate
                    </button>
                  </div>
                </div>
                
                {/* Subject Line */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line:</label>
                  {editingField === 'subject' ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email subject..."
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        <CheckIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900">
                      {currentTemplate.subject}
                    </div>
                  )}
                </div>
                
                {/* Email Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  {editingField === 'content' ? (
                    <div className="space-y-2">
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                        placeholder="Enter HTML content..."
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          <CheckIcon className="h-4 w-4 mr-1 inline" />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                          <XMarkIcon className="h-4 w-4 mr-1 inline" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: currentTemplate.htmlContent }}
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
                  </div>
                  
        {/* Template Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {professionalTemplates.map((_, index) => (
                      <button
              key={index}
              onClick={() => setCurrentTemplateIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTemplateIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}