'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  ArrowLeftIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  SparklesIcon,
  PaperAirplaneIcon,
  EyeIcon
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

export default function EditCampaignPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')
  
  const [editingField, setEditingField] = useState<'subject' | 'content' | null>(null)
  const [editedContent, setEditedContent] = useState('')
  const [isEditingTemplate, setIsEditingTemplate] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [campaignData, setCampaignData] = useState<CampaignData>({
    templateId: templateId || '',
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
      description: 'Professional product launch email with compelling CTA and brand storytelling',
      subject: '🚀 Introducing [Product Name] - The Future is Here',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.12);">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%); opacity: 0.6;"></div>
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; position: relative; z-index: 1;">Introducing NovaAI</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 16px; font-weight: 300; position: relative; z-index: 1;">The Future of Email Marketing</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <p style="color: #1a202c; font-size: 16px; line-height: 1.6; margin-bottom: 20px; font-weight: 400;">
              Hi [Customer Name],
            </p>
            
            <p style="color: #2d3748; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
              We're thrilled to announce the launch of <strong style="color: #667eea;">NovaAI</strong>, our revolutionary AI-powered email marketing platform that will transform how you connect with your audience.
            </p>
            
            <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #2d3748; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">What makes NovaAI special:</h3>
              <ul style="color: #4a5568; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
                <li style="margin-bottom: 8px;">AI-powered content generation that writes like a human</li>
                <li style="margin-bottom: 8px;">Advanced personalization that increases engagement by 300%</li>
                <li style="margin-bottom: 8px;">Smart analytics that predict customer behavior</li>
              </ul>
            </div>
            
            <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0; position: relative; overflow: hidden;">
              <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: pulse 2s infinite;"></div>
              <h3 style="color: white; margin: 0 0 12px 0; font-size: 18px; font-weight: 600; position: relative; z-index: 1;">🎯 Early Access Offer</h3>
              <p style="color: white; margin: 0; font-size: 15px; position: relative; z-index: 1;">
                Join 10,000+ marketers already using NovaAI. Get <strong>50% off</strong> your first year.
              </p>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 13px; position: relative; z-index: 1;">
                Limited time offer - expires in 48 hours
              </p>
            </div>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                Start Your Free Trial
              </a>
            </div>
            
            <div style="background: #e6fffa; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #b2f5ea;">
              <h4 style="color: #234e52; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Why choose NovaAI?</h4>
              <p style="color: #2c7a7b; margin: 0; font-size: 14px; line-height: 1.5;">Over 10,000 businesses trust NovaAI to power their email marketing. Join industry leaders like Shopify, Stripe, and Notion.</p>
            </div>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 24px 0;">
              Ready to revolutionize your email marketing? Let's get started.
            </p>
            
            <p style="color: #2d3748; font-size: 15px; line-height: 1.6; margin: 32px 0 0 0;">
              Best regards,<br>
              <strong>The NovaAI Team</strong><br>
              <span style="color: #667eea;">NovaMail</span>
            </p>
          </div>
        </div>
      `,
      features: ['Brand Storytelling', 'Product Showcase', 'Strong CTA', 'Social Proof'],
      isPopular: true,
      isNew: false
    },
    {
      id: 'minimal-clean',
      name: 'Minimal Clean',
      category: 'Minimal',
      description: 'Comprehensive onboarding sequence to guide new customers through your platform',
      subject: 'Welcome to [Company Name] - Let\'s Get Started!',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <div style="background: #ffffff; padding: 60px 40px 40px 40px; text-align: center; border-bottom: 1px solid #f0f0f0;">
            <h1 style="color: #1a1a1a; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: -0.5px;">Welcome to NovaMail</h1>
            <p style="color: #666666; margin: 16px 0 0 0; font-size: 16px; font-weight: 300;">Let's get you started</p>
          </div>
          
          <div style="padding: 60px 40px;">
            <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin-bottom: 32px; font-weight: 300;">
              Hi [Customer Name],
            </p>
            
            <p style="color: #333333; font-size: 16px; line-height: 1.7; margin-bottom: 40px; font-weight: 300;">
              Welcome to NovaMail. We're excited to have you join thousands of businesses already using our platform to create beautiful, effective email campaigns.
            </p>
            
            <div style="background: #fafafa; padding: 32px; margin: 40px 0; border-left: 2px solid #e0e0e0;">
              <h3 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 18px; font-weight: 400;">Your next steps</h3>
              <ol style="color: #555555; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6; font-weight: 300;">
                <li style="margin-bottom: 12px;">Complete your profile setup</li>
                <li style="margin-bottom: 12px;">Choose your first template</li>
                <li style="margin-bottom: 12px;">Import your contact list</li>
                <li style="margin-bottom: 12px;">Send your first campaign</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin: 48px 0;">
              <a href="#" style="display: inline-block; background: #1a1a1a; color: white; padding: 16px 32px; text-decoration: none; border-radius: 0; font-weight: 400; font-size: 16px; letter-spacing: 0.5px;">
                Get Started
              </a>
            </div>
            
            <div style="border-left: 2px solid #e0e0e0; padding-left: 24px; margin: 40px 0;">
              <h3 style="color: #1a1a1a; margin: 0 0 12px 0; font-size: 16px; font-weight: 400;">Need help?</h3>
              <p style="color: #666666; margin: 0; font-size: 14px; line-height: 1.5; font-weight: 300;">Visit our help center for guides, tutorials, and best practices.</p>
            </div>
            
            <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 40px 0; font-weight: 300;">
              We're here to help you succeed. If you have any questions, just reply to this email.
            </p>
            
            <p style="color: #1a1a1a; font-size: 15px; line-height: 1.6; margin: 48px 0 0 0; font-weight: 300;">
              Best,<br>
              The NovaMail Team
            </p>
          </div>
        </div>
      `,
      features: ['Step-by-step Guide', 'Resource Links', 'Personal Touch', 'Next Steps'],
      isPopular: true,
      isNew: false
    },
    {
      id: 'corporate-professional',
      name: 'Corporate Professional',
      category: 'Corporate',
      description: 'Clean, professional newsletter template for business communications',
      subject: '[Company Name] Monthly Newsletter - [Month Year]',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 0; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="background: #1e293b; padding: 40px 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">NovaMail</h1>
            <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px; font-weight: 400;">Monthly Newsletter - December 2024</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin-bottom: 24px; font-weight: 400;">
              Dear [Subscriber Name],
            </p>
            
            <p style="color: #334155; font-size: 16px; line-height: 1.7; margin-bottom: 32px; font-weight: 400;">
              Welcome to our <strong>December 2024</strong> newsletter. This month, we're excited to share significant updates and insights from the NovaMail platform.
            </p>
            
            <div style="background: #f8fafc; padding: 24px; border-radius: 8px; margin: 24px 0; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">This Month's Highlights</h3>
              <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
                <li style="margin-bottom: 8px;">Launched AI-powered email personalization features</li>
                <li style="margin-bottom: 8px;">Achieved 99.9% email delivery rate across all campaigns</li>
                <li style="margin-bottom: 8px;">Expanded integration support for 15+ CRM platforms</li>
              </ul>
            </div>
            
            <div style="border-left: 4px solid #3b82f6; padding-left: 20px; margin: 24px 0;">
              <h3 style="color: #1e293b; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Industry Insights</h3>
              <p style="color: #475569; margin: 0; font-size: 15px; line-height: 1.6;">Email marketing ROI increased by 42% in 2024, with personalized campaigns showing the highest engagement rates across all industries.</p>
            </div>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="#" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px;">
                Read Full Report
              </a>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #bfdbfe;">
              <h4 style="color: #1e40af; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Featured Content</h4>
              <p style="color: #1e40af; margin: 0; font-size: 14px; line-height: 1.5;">Read our latest case study: "How TechCorp Increased Email Engagement by 300% with NovaMail"</p>
            </div>
            
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 24px 0; font-weight: 400;">
              Thank you for being part of our community. We value your feedback and suggestions for improving our platform.
            </p>
            
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6; margin: 32px 0 0 0; font-weight: 400;">
              Best regards,<br>
              <strong>The NovaMail Team</strong><br>
              <span style="color: #64748b; font-size: 14px;">Marketing Department</span>
            </p>
          </div>
        </div>
      `,
      features: ['Clean Layout', 'Industry Insights', 'Professional Tone', 'Call-to-Action'],
      isPopular: false,
      isNew: true
    }
  ]

  const currentTemplate = professionalTemplates.find(t => t.id === templateId) || professionalTemplates[0]

  // 替换模板中的占位符
  const replacePlaceholders = (content: string) => {
    return content
      .replace(/\[Product Name\]/g, campaignData.productService || '[Product Name]')
      .replace(/\[Company Name\]/g, campaignData.businessName || '[Company Name]')
      .replace(/\[Customer Name\]/g, campaignData.targetAudience || '[Customer Name]')
      .replace(/\[Your Name\]/g, campaignData.businessName || '[Your Name]')
      .replace(/\[Target URL\]/g, campaignData.targetUrl || '[Target URL]')
      .replace(/\[solve problem\]/g, 'solve your problems')
      .replace(/\[Key Benefit 1\]/g, 'Revolutionary features')
      .replace(/\[Key Benefit 2\]/g, 'Easy to use')
      .replace(/\[Key Benefit 3\]/g, '24/7 support')
      .replace(/\[Social proof or urgency reason\]/g, 'Limited time offer')
      .replace(/\[Month Year\]/g, new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))
      .replace(/\[Subscriber Name\]/g, campaignData.targetAudience || '[Subscriber Name]')
      .replace(/\[Key Achievement 1\]/g, 'New product launch')
      .replace(/\[Key Achievement 2\]/g, 'Customer growth')
      .replace(/\[Key Achievement 3\]/g, 'Industry recognition')
      .replace(/\[Industry news or insights\]/g, 'Latest industry trends and insights')
      .replace(/\[Read More URL\]/g, campaignData.targetUrl || '[Read More URL]')
      .replace(/\[Dashboard URL\]/g, campaignData.targetUrl || '[Dashboard URL]')
      .replace(/\[Resource Center\]/g, 'Resource Center')
  }

  useEffect(() => {
    if (currentTemplate) {
      const personalizedSubject = replacePlaceholders(currentTemplate.subject)
      const personalizedBody = replacePlaceholders(currentTemplate.htmlContent)
      
      setCampaignData(prev => ({
        ...prev,
        templateId: currentTemplate.id,
        subject: personalizedSubject,
        body: personalizedBody
      }))
    }
  }, [currentTemplate, campaignData.businessName, campaignData.productService, campaignData.targetAudience, campaignData.targetUrl])

  const handleEditField = (field: 'subject' | 'content') => {
    setEditingField(field)
    setIsEditingTemplate(true)
    if (field === 'subject') {
      setEditedContent(campaignData.subject)
    } else {
      setEditedContent(campaignData.body)
    }
  }

  const handleSaveEdit = () => {
    if (editingField === 'subject') {
      setCampaignData(prev => ({ ...prev, subject: editedContent }))
    } else if (editingField === 'content') {
      setCampaignData(prev => ({ ...prev, body: editedContent }))
    }
    
    setEditingField(null)
    setEditedContent('')
    setIsEditingTemplate(false)
    toast.success('Changes saved successfully!')
  }

  const handleCancelEdit = () => {
    setEditingField(null)
    setEditedContent('')
    setIsEditingTemplate(false)
  }

  const handleDirectEdit = (field: 'subject' | 'content', newValue: string) => {
    if (field === 'subject') {
      setCampaignData(prev => ({ ...prev, subject: newValue }))
    } else if (field === 'content') {
      setCampaignData(prev => ({ ...prev, body: newValue }))
    }
  }

  const handleGenerateWithAI = async () => {
    if (isGenerating) return
    
    try {
      setIsGenerating(true)
      toast.loading('🤖 AI is crafting your personalized content...', { id: 'ai-generate' })
      
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
        setCampaignData(prev => ({
          ...prev,
          subject: result.subject || prev.subject,
          body: result.htmlContent || prev.body
        }))
        toast.success('✨ AI-generated content applied successfully!', { id: 'ai-generate' })
      } else {
        throw new Error('Failed to generate content')
      }
    } catch (error) {
      toast.error('❌ Failed to generate AI content. Please try again.', { id: 'ai-generate' })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSendCampaign = async () => {
    if (isSending) return
    
    try {
      setIsSending(true)
      toast.loading('📧 Sending your campaign...', { id: 'send-campaign' })
      
      const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/campaigns/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData)
      })

      if (response.ok) {
        toast.success('🎉 Campaign sent successfully!', { id: 'send-campaign' })
        // Add a small delay for better UX
        setTimeout(() => {
          router.push('/dashboard/campaigns')
        }, 1000)
      } else {
        throw new Error('Failed to send campaign')
      }
    } catch (error) {
      toast.error('❌ Failed to send campaign. Please try again.', { id: 'send-campaign' })
    } finally {
      setIsSending(false)
    }
  }

  const handleBack = () => {
    router.push('/dashboard/campaigns/new')
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
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Edit Email Campaign</h1>
                <p className="text-sm text-gray-500">{currentTemplate.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={handleSendCampaign}
                disabled={isSending}
                whileHover={!isSending ? { scale: 1.05 } : {}}
                whileTap={!isSending ? { scale: 0.95 } : {}}
                className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-all duration-200 shadow-lg ${
                  isSending 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 hover:shadow-xl'
                }`}
              >
                <PaperAirplaneIcon className={`h-5 w-5 mr-2 ${isSending ? 'animate-bounce' : ''}`} />
                {isSending ? 'Sending...' : 'Send Campaign'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Business Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
              <div className="space-y-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target URL</label>
                  <input
                    type="url"
                    value={campaignData.targetUrl}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, targetUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Template:</span>
                  <p className="text-gray-900">{currentTemplate.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <p className="text-gray-900">{currentTemplate.category}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Description:</span>
                  <p className="text-gray-900">{currentTemplate.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Live Email Editor */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Live Email Editor</h3>
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
                    disabled={isGenerating}
                    className={`inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md transition-all duration-200 ${
                      isGenerating 
                        ? 'text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed' 
                        : 'text-green-600 hover:text-green-700 border-green-200 hover:bg-green-50'
                    }`}
                  >
                    <SparklesIcon className={`h-4 w-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                    {isGenerating ? 'Generating...' : 'AI Generate'}
                  </button>
                </div>
              </div>
              
              {/* Subject Line Editor */}
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
                  <div 
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleEditField('subject')}
                    title="Click to edit subject line"
                  >
                    {campaignData.subject}
                  </div>
                )}
              </div>
              
              {/* Live Email Preview with Inline Editing */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Preview (Click to Edit):</label>
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
                    className="bg-gray-50 border border-gray-200 rounded-md p-4 max-h-96 overflow-y-auto cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleEditField('content')}
                    title="Click to edit email content"
                  >
                    <div 
                      className="w-full pointer-events-none"
                      dangerouslySetInnerHTML={{ 
                        __html: campaignData.body.replace(
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
                )}
              </div>
              
              {/* Real-time Updates Info */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-700">
                  💡 <strong>Tip:</strong> Changes to business information above will automatically update the email template. 
                  Click on the subject line or email content to edit directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
