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
  EyeIcon
} from '@heroicons/react/24/outline'

interface ProfessionalTemplate {
  id: string
  name: string
  category: string
  description: string
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
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0)
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
      body: currentTemplate.body
    }))
    router.push(`/dashboard/campaigns/customize?template=${currentTemplate.id}`)
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
                <h1 className="text-2xl font-bold text-gray-900">Choose Template</h1>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Email Templates</h2>
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

                <div className="flex space-x-4">
                  <button
                    onClick={handleUseTemplate}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <PencilIcon className="h-5 w-5 mr-2" />
                    Use This Template
                  </button>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <EyeIcon className="h-5 w-5 mr-2" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Template Preview */}
              <div className="bg-gray-50 p-8 lg:p-12">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Email Preview</h4>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {currentTemplate.body}
                  </div>
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