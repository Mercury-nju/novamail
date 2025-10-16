'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon,
  RocketLaunchIcon,
  TagIcon,
  StarIcon,
  FireIcon
} from '@heroicons/react/24/outline'

interface ProfessionalTemplate {
  id: string
  name: string
  category: string
  description: string
  subject: string
  body: string
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
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<ProfessionalTemplate | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
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
      body: `Dear [Customer Name],

I'm excited to announce the launch of [Product Name], a revolutionary solution that will transform how you [solve problem].

**What makes [Product Name] special:**
• [Key Benefit 1]
• [Key Benefit 2] 
• [Key Benefit 3]

**Early Bird Offer:**
For the first 100 customers, we're offering [Product Name] at 50% off the regular price. This exclusive offer expires in 48 hours.

[Call to Action Button: Get [Product Name] Now]

**Why now?**
[Social proof or urgency reason]

Don't miss out on this opportunity to be among the first to experience the future.

Best regards,
[Your Name]
[Company Name]`,
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
      body: `Hi [Customer Name],

Welcome to [Company Name]! We're thrilled to have you on board.

**Your journey starts here:**

1. **Complete your profile** - Help us personalize your experience
2. **Explore our features** - Take a tour of what [Company Name] can do for you
3. **Connect with our community** - Join thousands of successful users

**Quick Start Guide:**
[Step-by-step instructions]

**Need help?**
Our support team is here 24/7. Just reply to this email or visit our help center.

**Pro tip:** [Helpful tip for new users]

We're excited to see what you'll accomplish with [Company Name]!

Welcome aboard,
[Your Name]
[Company Name] Team`,
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
      body: `Dear [Subscriber Name],

Welcome to our [Month Year] newsletter! Here's what's happening at [Company Name]:

**📈 This Month's Highlights:**
• [Key Achievement 1]
• [Key Achievement 2]
• [Key Achievement 3]

**🔍 Industry Insights:**
[Industry news or insights]

**💡 Featured Content:**
[Link to featured article or resource]

**🎯 What's Next:**
[Upcoming events, product updates, or initiatives]

**📊 Success Story:**
[Customer success story or case study]

Thank you for being part of our community. We value your feedback and suggestions.

Best regards,
[Your Name]
[Company Name]`,
      features: ['Clean Layout', 'Industry Insights', 'Company Updates', 'Exclusive Content'],
      isPopular: false,
      isNew: true
    },
    {
      id: 'sales-pitch',
      name: 'Sales Pitch Email',
      category: 'Sales',
      description: 'High-converting sales email with proven psychological triggers',
      subject: 'Quick question about [Pain Point] - Can I help?',
      body: `Hi [Prospect Name],

I noticed you're looking for a solution to [pain point]. I might be able to help.

**The problem:** [Describe the pain point in detail]

**The solution:** [Your product/service] has helped [X] companies like yours solve this exact problem.

**Here's how it works:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Results you can expect:**
• [Result 1]
• [Result 2]
• [Result 3]

**Social proof:** [Customer testimonial or case study]

**Next steps:**
Would you be interested in a 15-minute call to discuss how this could work for your business?

[Call to Action Button: Schedule a Call]

If this isn't the right time, no worries. I'll follow up in a few weeks.

Best,
[Your Name]
[Company Name]`,
      features: ['Pain Point Focus', 'Solution Presentation', 'Social Proof', 'Urgency'],
      isPopular: true,
      isNew: false
    },
    {
      id: 'customer-retention',
      name: 'Customer Retention Campaign',
      category: 'Retention',
      description: 'Strategic email to re-engage inactive customers and prevent churn',
      subject: 'We Miss You - Here\'s What You\'ve Been Missing',
      body: `Hi [Customer Name],

We noticed you haven't been active on [Company Name] lately, and we wanted to check in.

**What you've been missing:**
• [New feature or update]
• [Recent improvement]
• [New content or resource]

**We're here to help:**
If you're facing any challenges or have questions, our support team is ready to assist.

**Special offer for returning users:**
[Exclusive offer or incentive]

**Quick ways to get back on track:**
1. [Action 1]
2. [Action 2]
3. [Action 3]

**Success story:** [Recent customer success story]

We'd love to have you back and help you achieve your goals.

[Call to Action Button: Get Back on Track]

If you have any feedback or suggestions, we'd love to hear from you.

Best regards,
[Your Name]
[Company Name]`,
      features: ['Personal Touch', 'Value Reminder', 'Re-engagement Offer', 'Easy Return'],
      isPopular: false,
      isNew: true
    },
    {
      id: 'event-invitation',
      name: 'Event Invitation',
      category: 'Events',
      description: 'Elegant event invitation with clear details and compelling reasons to attend',
      subject: 'You\'re Invited: [Event Name] - [Date]',
      body: `Dear [Invitee Name],

You're cordially invited to [Event Name], an exclusive event that you won't want to miss.

**Event Details:**
📅 Date: [Event Date]
🕐 Time: [Event Time]
📍 Location: [Event Location/Virtual Link]
🎯 Focus: [Event Topic/Purpose]

**What to expect:**
• [Key speaker or session 1]
• [Key speaker or session 2]
• [Networking opportunities]
• [Special announcements]

**Why attend:**
[Compelling reasons to attend]

**Featured speakers:**
[Speaker highlights]

**Agenda highlights:**
[Key agenda items]

**RSVP:**
Please confirm your attendance by [RSVP deadline].

[Call to Action Button: RSVP Now]

**Questions?**
Contact us at [contact information].

We look forward to seeing you there!

Best regards,
[Your Name]
[Company Name]`,
      features: ['Clear Event Details', 'Speaker Highlights', 'Networking Benefits', 'Easy RSVP'],
      isPopular: false,
      isNew: false
    }
  ]

  const tones = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-appropriate' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
    { value: 'persuasive', label: 'Persuasive', description: 'Compelling and action-oriented' },
    { value: 'authoritative', label: 'Authoritative', description: 'Confident and expert-like' }
  ]

  useEffect(() => {
    const templateId = searchParams.get('template')
    if (templateId) {
      const template = professionalTemplates.find(t => t.id === templateId)
      if (template) {
        setSelectedTemplate(template)
        setCampaignData(prev => ({
          ...prev,
          templateId: template.id,
          subject: template.subject,
          body: template.body
        }))
        setStep(2)
      }
    }
  }, [searchParams])

  const progress = ((step - 1) / 3) * 100

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

  const handleTemplateSelect = (template: ProfessionalTemplate) => {
    setSelectedTemplate(template)
    setCampaignData(prev => ({
      ...prev,
      templateId: template.id,
      subject: template.subject,
      body: template.body
    }))
    setStep(2)
  }

  const handleCustomize = () => {
    setStep(3)
  }

  const handleSave = () => {
    toast.success('Campaign saved as draft!')
    router.push('/dashboard/campaigns')
  }

  const handleSend = () => {
    toast.success('Email sent successfully!')
    router.push('/dashboard/campaigns')
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push('/dashboard/campaigns')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
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
                <h1 className="text-2xl font-bold text-gray-900">Professional Email Templates</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Step {step} / 3
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
            </div>
          </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Template Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
                <p className="text-lg text-gray-600">Select from our collection of professionally designed email templates</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionalTemplates.map((template) => (
                <motion.div 
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTemplateSelect(template)}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                        {template.category}
                      </span>
                      <div className="flex space-x-1">
                        {template.isPopular && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            <FireIcon className="h-3 w-3 mr-1" />
                            Popular
                          </span>
                        )}
                        {template.isNew && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            New
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>

                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 mb-1">Subject:</p>
                      <p className="text-sm text-gray-800 font-medium">{template.subject}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 mb-2">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.features.map((feature, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Use This Template
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Template Details */}
          {step === 2 && selectedTemplate && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Template Details</h2>
                <p className="text-lg text-gray-600">Review and customize your selected template</p>
            </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Template Info */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedTemplate.category)}`}>
                      {selectedTemplate.category}
                    </span>
                    {selectedTemplate.isPopular && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <FireIcon className="h-3 w-3 mr-1" />
                        Popular
                      </span>
                    )}
                </div>
                
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedTemplate.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedTemplate.description}</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                        <input
                          type="text"
                          value={campaignData.businessName}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, businessName: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your company name"
                        />
                      </div>

                      <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product/Service</label>
                        <input
                          type="text"
                          value={campaignData.productService}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, productService: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Product or service name"
                        />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target URL</label>
                      <input
                        type="url"
                        value={campaignData.targetUrl}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, targetUrl: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                      <select
                        value={campaignData.tone}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, tone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {tones.map((tone) => (
                          <option key={tone.value} value={tone.value}>
                            {tone.label} - {tone.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Template Preview */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Preview</h3>
                  
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                      <p className="text-sm text-gray-800 font-medium">{selectedTemplate.subject}</p>
                </div>
                
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Content</label>
                      <div className="text-sm text-gray-700 whitespace-pre-line max-h-64 overflow-y-auto">
                        {selectedTemplate.body}
                      </div>
                      </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">Template Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedTemplate.features.map((feature, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  </div>
                </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Back
                </button>
                <button 
                  onClick={handleCustomize}
                  disabled={!campaignData.businessName}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  Customize Template
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Customization */}
          {step === 3 && selectedTemplate && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Customize Your Email</h2>
                <p className="text-lg text-gray-600">Edit the content to match your specific needs</p>
                    </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Editor */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Content</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                      <input
                        type="text"
                        value={campaignData.subject}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Body</label>
                      <textarea
                        value={campaignData.body}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, body: e.target.value }))}
                        rows={20}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                    <button 
                      onClick={() => setShowPreview(!showPreview)}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      {showPreview ? 'Hide' : 'Show'} Preview
                    </button>
                  </div>

                  {showPreview && (
                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="mb-4 p-3 bg-gray-50 rounded">
                        <p className="text-sm font-medium text-gray-800">{campaignData.subject}</p>
              </div>
                      <div className="text-sm text-gray-700 whitespace-pre-line">
                        {campaignData.body}
                  </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Back
                    </button>
                <div className="flex space-x-4">
                      <button
                    onClick={handleSave}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                    Save Draft
                      </button>
                      <button
                    onClick={handleSend}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <RocketLaunchIcon className="h-5 w-5 mr-2" />
                    Send Email
                      </button>
                    </div>
                  </div>
                </motion.div>
            )}
        </AnimatePresence>
        </div>
    </div>
  )
}