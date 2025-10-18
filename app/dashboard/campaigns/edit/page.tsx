'use client'

import { useState, useEffect, useRef } from 'react'
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
import { useTranslation } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

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
  const { t } = useTranslation()
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [leftPanelWidth, setLeftPanelWidth] = useState(65) // 默认左侧占65%
  
  const [chatHistory, setChatHistory] = useState<Array<{
    type: 'user' | 'ai'
    message: string
    timestamp: Date
    generatedContent?: {
      subject: string
      textContent: string
    }
  }>>([])
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

  // 移除useEffect，直接使用textarea编辑

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
    },
    {
      id: 'elegant-luxury',
      name: 'Elegant Luxury',
      category: 'Elegant',
      description: 'Sophisticated design with premium aesthetics and refined typography',
      subject: 'Exclusive Invitation: [Event Name] - A Night of Elegance',
      htmlContent: `
        <div style="font-family: 'Georgia', 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
          <div style="background: #1a1a1a; padding: 50px 40px; text-align: center; position: relative;">
            <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); width: 60px; height: 2px; background: linear-gradient(90deg, transparent, #d4af37, transparent);"></div>
            <h1 style="color: #d4af37; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Exclusive Invitation</h1>
            <p style="color: #ffffff; margin: 20px 0 0 0; font-size: 16px; font-weight: 300; letter-spacing: 1px;">A Night of Elegance & Sophistication</p>
          </div>
          
          <div style="padding: 50px 40px; background: #fafafa;">
            <p style="color: #2c2c2c; font-size: 16px; line-height: 1.8; margin-bottom: 30px; font-weight: 300;">
              Dear [Guest Name],
            </p>
            
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.8; margin-bottom: 35px; font-weight: 300;">
              We are delighted to extend a personal invitation to you for an exclusive evening of elegance and sophistication. Join us for an unforgettable experience that celebrates the finest in [Industry/Theme].
            </p>
            
            <div style="background: #ffffff; padding: 30px; margin: 35px 0; border-left: 4px solid #d4af37; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
              <h3 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 20px; font-weight: 400; letter-spacing: 0.5px;">Event Details</h3>
              <div style="color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <p style="margin: 0 0 8px 0;"><strong>Date:</strong> [Event Date]</p>
                <p style="margin: 0 0 8px 0;"><strong>Time:</strong> [Event Time]</p>
                <p style="margin: 0 0 8px 0;"><strong>Venue:</strong> [Venue Name]</p>
                <p style="margin: 0;"><strong>Dress Code:</strong> Black Tie Optional</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="#" style="display: inline-block; background: #1a1a1a; color: #d4af37; padding: 18px 40px; text-decoration: none; border: 2px solid #d4af37; font-weight: 300; font-size: 16px; letter-spacing: 1px; text-transform: uppercase; transition: all 0.3s ease;">
                Accept Invitation
              </a>
            </div>
            
            <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; margin: 35px 0; font-weight: 300; text-align: center;">
              We look forward to welcoming you to this exclusive gathering.
            </p>
            
            <p style="color: #2c2c2c; font-size: 15px; line-height: 1.8; margin: 40px 0 0 0; font-weight: 300;">
              With warm regards,<br>
              <strong style="color: #1a1a1a;">The [Organization] Team</strong>
            </p>
          </div>
        </div>
      `,
      features: ['Premium Aesthetics', 'Elegant Typography', 'Luxury Branding', 'Sophisticated Layout'],
      isPopular: true,
      isNew: false
    },
    {
      id: 'creative-vibrant',
      name: 'Creative Vibrant',
      category: 'Creative',
      description: 'Bold, colorful design perfect for creative industries and artistic brands',
      subject: '🎨 Creative Workshop: [Workshop Name] - Unleash Your Creativity',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">
          <div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57); padding: 40px 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 0%, transparent 50%); opacity: 0.6;"></div>
            <h1 style="color: white; margin: 0; font-size: 30px; font-weight: 800; letter-spacing: -0.5px; position: relative; z-index: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🎨 Creative Workshop</h1>
            <p style="color: white; margin: 12px 0 0 0; font-size: 16px; font-weight: 500; position: relative; z-index: 1; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">Unleash Your Creative Potential</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin-bottom: 25px; font-weight: 500;">
              Hey [Creative Name]! 👋
            </p>
            
            <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin-bottom: 30px;">
              Ready to dive into a world of creativity? We're excited to invite you to our exclusive <strong style="color: #ff6b6b;">[Workshop Name]</strong> - where imagination meets innovation!
            </p>
            
            <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #e2e8f0;">
              <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">✨ What You'll Learn:</h3>
              <ul style="color: #4a5568; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
                <li style="margin-bottom: 8px;">🎯 Creative problem-solving techniques</li>
                <li style="margin-bottom: 8px;">🎨 Advanced design principles</li>
                <li style="margin-bottom: 8px;">💡 Innovation methodologies</li>
                <li style="margin-bottom: 8px;">🚀 Portfolio development strategies</li>
              </ul>
            </div>
            
            <div style="background: linear-gradient(135deg, #ff6b6b, #4ecdc4); padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0; position: relative; overflow: hidden;">
              <div style="position: absolute; top: -20px; right: -20px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
              <div style="position: absolute; bottom: -30px; left: -30px; width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
              <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px; font-weight: 600; position: relative; z-index: 1;">🎉 Special Offer</h3>
              <p style="color: white; margin: 0; font-size: 15px; position: relative; z-index: 1;">
                Early bird pricing: <strong>30% off</strong> for the first 20 participants!
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="display: inline-block; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 16px 32px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4); transition: all 0.3s ease;">
                Join the Workshop 🚀
              </a>
            </div>
            
            <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 25px 0; text-align: center;">
              Let's create something amazing together! 🎨✨
            </p>
            
            <p style="color: #2d3748; font-size: 15px; line-height: 1.6; margin: 30px 0 0 0;">
              Creative regards,<br>
              <strong style="color: #ff6b6b;">The Creative Team</strong><br>
              <span style="color: #4ecdc4;">[Organization Name]</span>
            </p>
          </div>
        </div>
      `,
      features: ['Bold Colors', 'Creative Layout', 'Vibrant Design', 'Artistic Elements'],
      isPopular: true,
      isNew: true
    },
    {
      id: 'tech-modern',
      name: 'Tech Modern',
      category: 'Modern',
      description: 'Clean, tech-focused design with modern aesthetics and digital elements',
      subject: 'Tech Update: [Product Name] v2.0 - Now Live!',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, transparent 49%, rgba(59, 130, 246, 0.1) 50%, transparent 51%); background-size: 20px 20px;"></div>
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; position: relative; z-index: 1;">Tech Update</h1>
            <p style="color: #94a3b8; margin: 12px 0 0 0; font-size: 16px; font-weight: 400; position: relative; z-index: 1;">Version 2.0 is Now Live</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin-bottom: 25px; font-weight: 500;">
              Hello [Developer Name],
            </p>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.7; margin-bottom: 30px;">
              We're excited to announce that <strong style="color: #3b82f6;">[Product Name] v2.0</strong> is now live! This major update brings powerful new features and significant performance improvements.
            </p>
            
            <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">🚀 New Features</h3>
              <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
                <li style="margin-bottom: 8px;">⚡ 3x faster processing speed</li>
                <li style="margin-bottom: 8px;">🔧 Enhanced API endpoints</li>
                <li style="margin-bottom: 8px;">📊 Real-time analytics dashboard</li>
                <li style="margin-bottom: 8px;">🔒 Advanced security protocols</li>
              </ul>
            </div>
            
            <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 25px; border-radius: 8px; text-align: center; margin: 25px 0;">
              <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">📈 Performance Boost</h3>
              <p style="color: white; margin: 0; font-size: 15px;">
                Experience <strong>300% faster</strong> response times and improved reliability.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);">
                Explore New Features
              </a>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
              <h4 style="color: #92400e; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">⚠️ Breaking Changes</h4>
              <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">Please review our migration guide for any breaking changes that may affect your implementation.</p>
            </div>
            
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 25px 0;">
              Thank you for being part of our developer community. We're committed to providing you with the best tools and experience.
            </p>
            
            <p style="color: #1e293b; font-size: 15px; line-height: 1.6; margin: 30px 0 0 0;">
              Best regards,<br>
              <strong>The Development Team</strong><br>
              <span style="color: #3b82f6;">[Company Name]</span>
            </p>
          </div>
        </div>
      `,
      features: ['Tech Aesthetics', 'Modern Layout', 'Performance Focus', 'Developer Friendly'],
      isPopular: false,
      isNew: true
    },
    {
      id: 'health-wellness',
      name: 'Health & Wellness',
      category: 'Minimal',
      description: 'Clean, calming design perfect for health, wellness, and lifestyle brands',
      subject: 'Wellness Wednesday: [Topic] - Your Health Journey Starts Here',
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 60%);"></div>
            <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 600; letter-spacing: -0.3px; position: relative; z-index: 1;">🌱 Wellness Wednesday</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 16px; font-weight: 400; position: relative; z-index: 1;">Your Health Journey Starts Here</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin-bottom: 25px; font-weight: 400;">
              Hi [Wellness Seeker],
            </p>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.7; margin-bottom: 30px;">
              This week, we're focusing on <strong style="color: #10b981;">[Wellness Topic]</strong> - a key component of your overall health and wellbeing journey.
            </p>
            
            <div style="background: #f0fdf4; padding: 25px; border-radius: 10px; margin: 25px 0; border: 1px solid #bbf7d0;">
              <h3 style="color: #166534; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">💚 This Week's Focus</h3>
              <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
                <li style="margin-bottom: 8px;">🧘‍♀️ Mindful breathing exercises</li>
                <li style="margin-bottom: 8px;">🥗 Nutritious meal planning</li>
                <li style="margin-bottom: 8px;">🚶‍♀️ Daily movement goals</li>
                <li style="margin-bottom: 8px;">😴 Quality sleep strategies</li>
              </ul>
            </div>
            
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 25px; border-radius: 10px; text-align: center; margin: 25px 0;">
              <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">🌟 Wellness Tip</h3>
              <p style="color: white; margin: 0; font-size: 15px;">
                Start your day with 5 minutes of gratitude practice for a positive mindset.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="display: inline-block; background: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 16px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);">
                Start Your Journey 🌱
              </a>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
              <h4 style="color: #92400e; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">💡 Remember</h4>
              <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">Small, consistent steps lead to big changes. Be patient and kind to yourself on this journey.</p>
            </div>
            
            <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 25px 0; text-align: center;">
              Your wellness matters. Take care of yourself today. 💚
            </p>
            
            <p style="color: #1f2937; font-size: 15px; line-height: 1.6; margin: 30px 0 0 0;">
              With care,<br>
              <strong style="color: #10b981;">The Wellness Team</strong><br>
              <span style="color: #059669;">[Organization Name]</span>
            </p>
          </div>
        </div>
      `,
      features: ['Calming Colors', 'Wellness Focus', 'Clean Design', 'Health Oriented'],
      isPopular: false,
      isNew: false
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

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignData(prev => ({ ...prev, subject: e.target.value }))
  }

  // 移除handleContentChange函数，现在直接在onInput中处理

  const handleHintClick = (hintText: string) => {
    setChatInput(hintText)
  }

  const handleResize = (e: React.MouseEvent) => {
    const startX = e.clientX
    const startWidth = leftPanelWidth
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX
      const containerWidth = window.innerWidth - 200 // 减去padding和边距
      const newWidth = Math.max(30, Math.min(80, startWidth + (deltaX / containerWidth) * 100))
      setLeftPanelWidth(newWidth)
    }
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // 智能文本转HTML函数
  const convertTextToHtml = (text: string) => {
    let html = text
    
    // 处理列表项（以 • 开头的行）
    html = html.replace(/^•\s*(.+)$/gm, '<li>$1</li>')
    
    // 处理其他列表符号
    html = html.replace(/^[-*]\s*(.+)$/gm, '<li>$1</li>')
    
    // 将连续的 <li> 包装在 <ul> 中
    html = html.replace(/(<li>.*<\/li>)(\s*<li>.*<\/li>)*/gs, (match) => {
      return `<ul>${match}</ul>`
    })
    
    // 处理标题（以数字+点开头的行，如 "1. 标题"）
    html = html.replace(/^(\d+\.\s*.+)$/gm, '<h3>$1</h3>')
    
    // 处理粗体文本（**文本**）
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    
    // 处理斜体文本（*文本*）
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
    
    // 处理段落（双换行）
    html = html.replace(/\n\n/g, '</p><p>')
    
    // 处理单换行
    html = html.replace(/\n/g, '<br>')
    
    // 包装在段落中
    html = `<p>${html}</p>`
    
    // 清理空段落和多余的标签
    html = html.replace(/<p><\/p>/g, '')
    html = html.replace(/<p>\s*<br>\s*<\/p>/g, '')
    html = html.replace(/<p>\s*<\/p>/g, '')
    
    // 确保列表不被段落包围
    html = html.replace(/<p>(<ul>.*<\/ul>)<\/p>/gs, '$1')
    
    // 确保标题不被段落包围
    html = html.replace(/<p>(<h3>.*<\/h3>)<\/p>/gs, '$1')
    
    // 清理多余的段落标签
    html = html.replace(/<p>\s*<\/p>/g, '')
    
    return html
  }

  // 检测内容是否为HTML格式
  const isHtmlContent = (content: string) => {
    return /<[a-z][\s\S]*>/i.test(content)
  }

  // 将HTML转换为纯文本显示
  const htmlToText = (html: string) => {
    if (!html) return ''
    
    // 创建一个临时的div元素来解析HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    
    // 处理列表项
    const listItems = tempDiv.querySelectorAll('li')
    listItems.forEach(li => {
      li.textContent = '• ' + li.textContent
    })
    
    // 处理标题
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach(heading => {
      heading.textContent = heading.textContent + '\n'
    })
    
    // 处理段落
    const paragraphs = tempDiv.querySelectorAll('p')
    paragraphs.forEach(p => {
      if (p.textContent && p.textContent.trim()) {
        p.textContent = p.textContent + '\n\n'
      }
    })
    
    // 处理换行
    const brs = tempDiv.querySelectorAll('br')
    brs.forEach(br => {
      br.replaceWith('\n')
    })
    
    // 获取纯文本内容
    let text = tempDiv.textContent || tempDiv.innerText || ''
    
    // 清理多余的换行
    text = text.replace(/\n{3,}/g, '\n\n')
    text = text.trim()
    
    return text
  }

  // 移除复杂的useEffect，直接使用dangerouslySetInnerHTML

  // 测试专业模板编辑的函数
  const testProfessionalTemplate = () => {
    const testText = '• 测试列表项1\n• 测试列表项2\n\n这是段落\n\n**粗体文本**\n*斜体文本*'
    const testHtml = convertTextToHtml(testText)
    console.log('=== Test Professional Template ===')
    console.log('Test text:', testText)
    console.log('Test HTML:', testHtml)
    
    // 更新状态 - React会自动重新渲染
    setCampaignData(prev => ({
      ...prev,
      body: testHtml
    }))
  }

  const handleAcceptContent = (generatedContent: { subject: string; textContent: string }) => {
    console.log('=== handleAcceptContent called ===')
    console.log('Generated content:', generatedContent)
    
    // 将AI生成的纯文本转换为HTML格式
    const htmlContent = convertTextToHtml(generatedContent.textContent)
    
    // 调试信息
    console.log('=== AI Content Acceptance Debug ===')
    console.log('Original text:', generatedContent.textContent)
    console.log('Converted HTML:', htmlContent)
    
    // Apply the generated content to the template
    setCampaignData(prev => {
      console.log('=== setCampaignData called ===')
      console.log('Previous body:', prev.body)
      console.log('New body:', htmlContent)
      
      const newData = {
        ...prev,
        subject: generatedContent.subject,
        body: htmlContent
      }
      
      console.log('New campaignData:', newData)
      return newData
    })
    
    // Add acceptance message to chat
    setChatHistory(prev => [...prev, {
      type: 'ai',
      message: '✅ Content has been applied to the template! You can continue editing or make new requests.',
      timestamp: new Date()
    }])
    
    toast.success('✨ Content applied to template!')
  }


  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || isGenerating) return

    const userMessage = chatInput.trim()
    setChatInput('')
    
    // Add user message to chat history
    setChatHistory(prev => [...prev, {
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    }])

    try {
      setIsGenerating(true)
      toast.loading('🤖 AI is generating email content...', { id: 'ai-chat' })
      
      const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/ai/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: currentTemplate.id,
          userRequest: userMessage,
          currentSubject: campaignData.subject,
          currentBody: campaignData.body,
          businessName: campaignData.businessName || 'Your Business',
          productService: campaignData.productService || 'Your Product/Service',
          targetAudience: campaignData.targetAudience || 'Your Customers',
          tone: campaignData.tone,
          templateName: currentTemplate.name,
          templateDescription: currentTemplate.description
        })
      })

      if (response.ok) {
        const result = await response.json()
        
        // Add AI response to chat history with generated content
        setChatHistory(prev => [...prev, {
          type: 'ai',
          message: `I've created email content based on your request: "${userMessage}". Here's what I generated:`,
          timestamp: new Date(),
          generatedContent: {
            subject: result.subject,
            textContent: result.textContent
          }
        }])
        
        toast.success('✨ Email content generated! Review and accept to apply.', { id: 'ai-chat' })
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to generate content')
      }
    } catch (error) {
      console.error('AI generation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setChatHistory(prev => [...prev, {
        type: 'ai',
        message: `Sorry, I encountered an error: ${errorMessage}. Please try again with a different request.`,
        timestamp: new Date()
      }])
      toast.error('❌ Failed to generate content. Please try again.', { id: 'ai-chat' })
    } finally {
      setIsGenerating(false)
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

  const handleSaveDraft = async () => {
    if (isSaving) return
    
    try {
      setIsSaving(true)
      toast.loading('💾 Saving draft...', { id: 'save-draft' })
      
      // Save to localStorage for now (in a real app, this would be saved to a database)
      const draftData = {
        ...campaignData,
        chatHistory,
        savedAt: new Date().toISOString()
      }
      
      localStorage.setItem(`draft-${templateId}`, JSON.stringify(draftData))
      
      toast.success('✅ Draft saved successfully!', { id: 'save-draft' })
    } catch (error) {
      toast.error('❌ Failed to save draft. Please try again.', { id: 'save-draft' })
    } finally {
      setIsSaving(false)
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
                <h1 className="text-xl font-semibold text-gray-900">{t('editor.title')}</h1>
                <p className="text-sm text-gray-500">{currentTemplate.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex" style={{ height: 'calc(100vh - 120px)' }}>
          {/* Left Panel - Email Template */}
          <div 
            className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full"
            style={{ width: `${leftPanelWidth}%` }}
          >
            {/* Fixed Header */}
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{currentTemplate.name}</h3>
                <p className="text-sm text-gray-500">{currentTemplate.description}</p>
              </div>
            </div>
            
            {/* Subject Line - Fixed */}
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line:</label>
              <input
                type="text"
                value={campaignData.subject}
                onChange={handleSubjectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Enter email subject..."
              />
            </div>
            
            {/* Email Content - Professional Template with WYSIWYG Editing */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-2xl mx-auto">
                {/* Professional Email Template */}
                <div 
                  className="bg-white border border-gray-200 rounded-lg shadow-sm"
                  style={{ 
                    minHeight: '400px',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                >
                  {/* Email Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
                    <h1 className="text-2xl font-bold">NovaMail</h1>
                    <p className="text-blue-100 text-sm mt-1">AI-Powered Email Marketing</p>
                  </div>
                  
                  {/* Email Body - Professional Template with WYSIWYG Editing */}
                  <div className="p-6 relative">
                    {/* Display Layer - Shows the professional template */}
                    <div 
                      className="absolute inset-0 p-6 pointer-events-none"
                      style={{
                        lineHeight: '1.6',
                        fontSize: '16px',
                        color: '#374151',
                        minHeight: '300px'
                      }}
                      dangerouslySetInnerHTML={{
                        __html: campaignData.body || '<p style="color: #9CA3AF; font-style: italic;">点击这里开始编辑您的邮件内容...</p>'
                      }}
                    />
                    
                    {/* Edit Layer - Transparent overlay for editing */}
                    <div 
                      className="absolute inset-0 p-6"
                      contentEditable
                      suppressContentEditableWarning={true}
                      onInput={(e) => {
                        const newContent = e.currentTarget.innerHTML
                        setCampaignData(prev => ({ ...prev, body: newContent }))
                      }}
                      onBlur={(e) => {
                        const newContent = e.currentTarget.innerHTML
                        setCampaignData(prev => ({ ...prev, body: newContent }))
                      }}
                      style={{
                        outline: 'none',
                        lineHeight: '1.6',
                        fontSize: '16px',
                        color: 'transparent',
                        caretColor: '#374151',
                        background: 'transparent',
                        minHeight: '300px'
                      }}
                    >
                      {campaignData.body ? (campaignData.body.replace(/<[^>]*>/g, '')) : '点击这里开始编辑您的邮件内容...'}
                    </div>
                  </div>
                  
                  {/* Email Footer */}
                  <div className="bg-gray-50 p-6 rounded-b-lg border-t border-gray-200">
                    <div className="text-center text-sm text-gray-600">
                      <p>© 2024 NovaMail. All rights reserved.</p>
                      <p className="mt-1">
                        <a href="#" className="text-blue-600 hover:text-blue-800">Unsubscribe</a> | 
                        <a href="#" className="text-blue-600 hover:text-blue-800 ml-2">Privacy Policy</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Editing Instructions */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    💡 点击邮件内容区域直接编辑，支持富文本格式
                  </p>
                </div>
              </div>
            </div>
            
            {/* Fixed Footer */}
            <div className="p-3 border-t border-gray-200 flex-shrink-0">
              <p className="text-xs text-gray-500 text-center">
                💡 点击邮件内容区域直接编辑，支持富文本格式，更改自动保存
              </p>
            </div>
          </div>

          {/* Resizable Divider */}
          <div 
            className="w-1 bg-gray-200 hover:bg-gray-300 cursor-col-resize flex-shrink-0 transition-colors"
            onMouseDown={handleResize}
            title="Drag to resize panels"
          />

          {/* Right Panel - AI Chat */}
          <div 
            className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full"
            style={{ width: `${100 - leftPanelWidth}%` }}
          >
            {/* Fixed Header */}
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{t('editor.aiAssistant')}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={testProfessionalTemplate}
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Test Template
                  </button>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-500">Online</span>
                </div>
              </div>
            </div>
            
            {/* Chat History - Flexible Height */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  <SparklesIcon className="h-8 w-8 mx-auto mb-3 text-blue-400" />
                  <h4 className="text-sm font-medium mb-3 text-gray-700">🤖 AI Email Content Generator</h4>
                  <p className="text-sm mb-4">Describe what kind of email you want to create, and AI will generate professional content for you!</p>
                  
                  <div className="space-y-2 text-xs text-gray-500 mb-4">
                    <div 
                      className="p-2 bg-gray-50 rounded border-l-2 border-blue-400 cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-colors"
                      onClick={() => handleHintClick("Write a product launch email for my new mobile app")}
                    >
                      <strong>📧 Product Launch:</strong> "Write a product launch email for my new mobile app"
                    </div>
                    <div 
                      className="p-2 bg-gray-50 rounded border-l-2 border-green-400 cursor-pointer hover:bg-green-50 hover:border-green-500 transition-colors"
                      onClick={() => handleHintClick("Create a welcome email for new customers")}
                    >
                      <strong>👋 Welcome Series:</strong> "Create a welcome email for new customers"
                    </div>
                    <div 
                      className="p-2 bg-gray-50 rounded border-l-2 border-orange-400 cursor-pointer hover:bg-orange-50 hover:border-orange-500 transition-colors"
                      onClick={() => handleHintClick("Generate a promotional email for Black Friday sale")}
                    >
                      <strong>🛍️ Promotions:</strong> "Generate a promotional email for Black Friday sale"
                    </div>
                    <div 
                      className="p-2 bg-gray-50 rounded border-l-2 border-purple-400 cursor-pointer hover:bg-purple-50 hover:border-purple-500 transition-colors"
                      onClick={() => handleHintClick("Write a newsletter about company updates")}
                    >
                      <strong>📰 Newsletter:</strong> "Write a newsletter about company updates"
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-2">
                      <div className="text-blue-500 mt-0.5">💡</div>
                      <div className="text-xs text-blue-700 text-left">
                        <p className="font-medium mb-1">How it works:</p>
                        <ol className="space-y-1 text-left">
                          <li>1. Type your request in the input below</li>
                          <li>2. AI generates professional email content</li>
                          <li>3. Click "Accept & Apply" to use it in your template</li>
                          <li>4. Edit directly in the template if needed</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                chatHistory.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      
                      {/* Show generated content if available */}
                      {message.generatedContent && (
                        <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                          <div className="mb-2">
                            <label className="text-xs font-medium text-gray-500">Subject:</label>
                            <p className="text-sm font-medium text-gray-900">{message.generatedContent.subject}</p>
                          </div>
                          <div className="mb-3">
                            <label className="text-xs font-medium text-gray-500">Content Preview:</label>
                            <div 
                              className="text-xs text-gray-700 mt-1 max-h-32 overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50 whitespace-pre-wrap"
                            >
                              {message.generatedContent.textContent}
                            </div>
                          </div>
                          
                          {/* Action button */}
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleAcceptContent(message.generatedContent!)}
                              className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                            >
                              ✅ Accept & Apply
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Chat Input - Positioned Lower */}
            <div className="mt-auto p-4 border-t border-gray-200">
              <div className="mb-3">
                <p className="text-sm text-gray-600 text-center">
                  💡 {t('editor.aiHint', 'Tell AI what email content you want to create, and AI will generate a professional email template for you')}
                </p>
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t('editor.chatPlaceholder')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-0"
                  disabled={isGenerating}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isGenerating}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex-shrink-0 ${
                    !chatInput.trim() || isGenerating
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <SparklesIcon className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
        
        {/* Bottom Action Bar */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Ready to send your email campaign?
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBack}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
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
                {isSending ? 'Sending...' : 'Send Email Campaign'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
