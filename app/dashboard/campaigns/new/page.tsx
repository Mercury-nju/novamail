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
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #bfdbfe;">
              <h4 style="color: #1e40af; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Featured Content</h4>
              <p style="color: #1e40af; margin: 0; font-size: 14px; line-height: 1.5;">Read our latest case study: "How TechCorp Increased Email Engagement by 300% with NovaMail"</p>
            </div>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="#" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px;">
                Read Full Report
              </a>
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
      features: ['Structured Layout', 'Corporate Colors', 'Professional Tone', 'Business Focus'],
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