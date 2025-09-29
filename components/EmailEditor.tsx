'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  EyeIcon, 
  EyeSlashIcon, 
  PhotoIcon, 
  PencilIcon,
  SwatchIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline'

interface EmailEditorProps {
  content: string
  onChange: (content: string) => void
  preview?: boolean
}

export default function EmailEditor({ content, onChange, preview = true }: EmailEditorProps) {
  const [activeTab, setActiveTab] = useState<'design' | 'preview'>('design')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [customContent, setCustomContent] = useState(content)

  // Beautiful email templates
  const templates = [
    {
      id: 'modern-promo',
      name: 'Modern Promotional',
      description: 'Perfect for product launches and special offers',
      thumbnail: '🎨',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">{{BUSINESS_NAME}}</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">{{TAGLINE}}</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">{{HEADLINE}}</h2>
            <p style="color: #6b7280; line-height: 1.6; margin: 0 0 30px 0; font-size: 16px;">{{DESCRIPTION}}</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{CTA_URL}}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">{{CTA_TEXT}}</a>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; margin: 40px 0 20px 0; padding-top: 20px;">
              <p style="color: #9ca3af; font-size: 14px; margin: 0; text-align: center;">{{BUSINESS_NAME}} • {{BUSINESS_ADDRESS}}</p>
              <p style="color: #9ca3af; font-size: 14px; margin: 10px 0 0 0; text-align: center;">Unsubscribe | Update preferences</p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'newsletter',
      name: 'Newsletter Style',
      description: 'Professional newsletter with rich content layout',
      thumbnail: '📰',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Georgia, 'Times New Roman', serif; background: #ffffff;">
          <div style="background: #f8fafc; padding: 30px 20px; border-bottom: 3px solid #e2e8f0;">
            <h1 style="color: #1e293b; margin: 0; font-size: 32px; font-weight: 300; text-align: center;">{{BUSINESS_NAME}}</h1>
            <h2 style="color: #475569; margin: 10px 0 0 0; font-size: 18px; font-weight: 400; text-align: center;">{{NEWSLETTER_TITLE}}</h2>
          </div>
          
          <div style="padding: 40px 30px;">
            <div style="float: right; margin: 0 0 20px 20px; width: 120px; height: 120px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #64748b;">Image</div>
            
            <h3 style="color: #0f172a; margin: 0 0 15px 0; font-size: 22px; font-weight: 600;">{{MAIN_HEADLINE}}</h3>
            <p style="color: #334155; line-height: 1.7; margin: 0 0 25px 0; font-size: 16px;">{{MAIN_CONTENT}}</p>
            
            <div style="clear: both; margin: 30px 0;">
              <h4 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Featured Highlights</h4>
              <ul style="color: #475569; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>{{FEATURE_1}}</li>
                <li>{{FEATURE_2}}</li>
                <li>{{FEATURE_3}}</li>
              </ul>
            </div>
            
            <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #3b82f6;">
              <p style="color: #1e293b; margin: 0; font-weight: 500; font-style: italic;">{{QUOTE_OR_TESTIMONIAL}}</p>
            </div>
          </div>
          
          <div style="background: #1e293b; padding: 20px; text-align: center;">
            <p style="color: #94a3b8; margin: 0 0 10px 0; font-size: 14px;"></p>You received this because you subscribed to {{BUSINESS_NAME}}}</p>
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">Unsubscribe | Update preferences | {{BUSINESS_ADDRESS}}</p>
          </div>
        </div>
      `
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Clean and elegant design for minimalists',
      thumbnail: '✨',
      html: `
        <div style="max-width: 500px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #ffffff;">
          <div style="padding: 60px 40px;">
            <h1 style="color: #000000; margin: 0 0 30px 0; font-size: 28px; font-weight: 300; text-align: center;">{{BUSINESS_NAME}}</h1>
            
            <div style="background: #fafafa; padding: 40px 30px; border-radius: 4px; margin: 30px 0;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 20px; font-weight: 500;">{{HEADLINE}}</h2>
              <p style="color: #666666; line-height: 1.6; margin: 0 0 25px 0; font-size: 15px;">{{DESCRIPTION}}</p>
              
              <div style="text-align: center;">
                <a href="{{CTA_URL}}" style="background: #000000; color: white; padding: 14px 28px; border-radius: 2px; text-decoration: none; font-weight: 500; display: inline-block;">{{CTA_TEXT}}</a>
              </div>
            </div>
            
            <p style="color: #999999; font-size: 12px; margin: 40px 0 0 0; text-align: center;">{{BUSINESS_NAME}} • Unsubscribe</p>
          </div>
        </div>
      `
    },
    {
      id: 'product-showcase',
      name: 'Product Showcase',
      description: 'Perfect for product launches and feature announcements',
      thumbnail: '🚀',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">New Product Launch 🚀</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">Introducing {{PRODUCT_NAME}}</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin: 0 0 30px 0;">
              <div style="background: #f3f4f6; border-radius: 12px; padding: 40px; margin: 0 auto; max-width: 300px;">
                <div style="background: #e5e7eb; height: 200px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6b7280;">
                  Product Image
                </div>
              </div>
            </div>
            
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; text-align: center; font-weight: 600;">{{PRODUCT_NAME}}</h2>
            <p style="color: #6b7280; line-height: 1.6; margin: 0 0 30px 0; text-align: center; font-size: 16px;">{{PRODUCT_DESCRIPTION}}</p>
            
            <div style="display: flex; gap: 20px; margin: 30px 0; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 150px; background: #f8fafc; padding: 20px; border-radius: 8px;">
                <h4 style="color: #1e293b; margin: 0 0 10px 0; font-size: 16px;">✨ Key Feature 1</h4>
                <p style="color: #64748b; margin: 0; font-size: 14px;">{{FEATURE_1}}</p>
              </div>
              <div style="flex: 1; min-width: 150px; background: #f8fafc; padding: 20px; border-radius: 8px;">
                <h4 style="color: #1e293b; margin: 0 0 10px 0; font-size: 16px;">✨ Key Feature 2</h4>
                <p style="color: #64748b; margin: 0; font-size: 14px;">{{FEATURE_2}}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{BUY_URL}}" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 18px 36px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; font-size: 18px;">{{CTA_TEXT}} - {{PRICE}}</a>
            </div>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">© {{BUSINESS_NAME}} • Unsubscribe | Update preferences</p>
          </div>
        </div>
      `
    },
    {
      id: 'tech-startup',
      name: 'Tech Startup',
      description: 'Modern design for tech companies and SaaS products',
      thumbnail: '🚀',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 40px 20px; text-align: center;">
            <div style="background: #ffffff; width: 60px; height: 60px; border-radius: 12px; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 24px;">⚡</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">{{BUSINESS_NAME}}</h1>
            <p style="color: #d1d5db; margin: 10px 0 0 0; font-size: 18px;">{{TAGLINE}}</p>
          </div>
          
          <div style="padding: 50px 30px;">
            <h2 style="color: #111827; margin: 0 0 30px 0; font-size: 28px; text-align: center; font-weight: 600;">{{HEADLINE}}</h2>
            
            <div style="background: #f9fafb; border-radius: 12px; padding: 30px; margin: 30px 0; border: 1px solid #e5e7eb;">
              <p style="color: #4b5563; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">{{DESCRIPTION}}</p>
              
              <div style="display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 180px;">
                  <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <h4 style="color: #1f2937; margin: 0 0 10px 0; font-size: 14px; font-weight: 600;">✨ Advanced Analytics</h4>
                    <p style="color: #6b7280; margin: 0; font-size: 12px;">Real-time insights</p>
                  </div>
                </div>
                <div style="flex: 1; min-width: 180px;">
                  <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <h4 style="color: #1f2937; margin: 0 0 10px 0; font-size: 14px; font-weight: 600;">🚀 Enterprise Ready</h4>
                    <p style="color: #6b7280; margin: 0; font-size: 12px;">Built for scale</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="{{CTA_URL}}" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; font-size: 16px;">{{CTA_TEXT}}</a>
              <p style="color: #6b7280; margin: 15px 0 0 0; font-size: 14px;">Start your free trial today • No credit card required</p>
            </div>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">© 2024 {{BUSINESS_NAME}} • Unsubscribe • Update preferences</p>
          </div>
        </div>
      `
    },
    {
      id: 'elegant-fashion',
      name: 'Elegant Fashion',
      description: 'Sophisticated design for fashion and lifestyle brands',
      thumbnail: '👗',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Helvetica Neue', Arial, sans-serif; background: #ffffff;">
          <div style="background: #1a1a1a; padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 36px; font-weight: 100; letter-spacing: 3px;">{{BUSINESS_NAME}}</h1>
            <div style="width: 100px; height: 1px; background: white; margin: 20px auto;"></div>
            <p style="color: white; margin: 0; opacity: 0.7; font-size: 14px; letter-spacing: 1px;">{{TAGLINE}}</p>
          </div>
          
          <div style="padding: 50px 40px; background: #f9f9f9;">
            <div style="display: flex; gap: 30px; margin-bottom: 40px;">
              <div style="flex: 1; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
                <div style="background: #f0f0f0; height: 200px; display: flex; align-items: center; justify-content: center; color: #999;">Featured Image</div>
                <div style="padding: 20px;">
                  <h3 style="color: #2c2c2c; margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">{{ITEM_1}}</h3>
                  <p style="color: #888; margin: 0 0 15px 0; font-size: 14px;">{{ITEM_1_DESC}}</p>
                  <span style="color: #000; font-size: 18px; font-weight: 600;">{{ITEM_1_PRICE}}</span>
                </div>
              </div>
              
              <div style="flex: 1; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
                <div style="background: #f0f0f0; height: 200px; display: flex; align-items: center; justify-content: center; color: #999;">Featured Image</div>
                <div style="padding: 20px;">
                  <h3 style="color: #2c2c2c; margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">{{ITEM_2}}</h3>
                  <p style="color: #888; margin: 0 0 15px 0; font-size: 14px;">{{ITEM_2_DESC}}</p>
                  <span style="color: #000; font-size: 18px; font-weight: 600;">{{ITEM_2_PRICE}}</span>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="{{CTA_URL}}" style="background: #000; color: white; padding: 16px 40px; border-radius: 0; text-decoration: none; font-weight: 500; display: inline-block; letter-spacing: 1px;">{{CTA_TEXT}}</a>
            </div>
          </div>
          
          <div style="background: #fff; padding: 30px 40px; border-top: 1px solid #e5e5e5;">
            <p style="color: #999; font-size: 12px; margin: 0; text-align: center; letter-spacing: 1px;">{{BUSINESS_NAME}} • {{BUSINESS_ADDRESS}} • Unsubscribe</p>
          </div>
        </div>
      `
    }
  ]

  const templateVariables = {
    BUSINESS_NAME: 'NovaMail',
    BUSINESS_ADDRESS: '123 Marketing St, Business City',
    TAGLINE: 'Email Marketing Made Simple',
    HEADLINE: 'Boost Your Business with Smart Email Marketing',
    DESCRIPTION: 'Create stunning, professional emails that convert. Our AI-powered platform helps you design beautiful campaigns that your customers will love.',
    CTA_TEXT: 'Get Started Today',
    CTA_URL: 'https://novamail.com/signup',
    NEWSLETTER_TITLE: 'Weekly Business Insights',
    MAIN_HEADLINE: 'Your Weekly Marketing Update',
    MAIN_CONTENT: 'Here are the latest insights and tips to help you grow much business with effective email marketing strategies.',
    FEATURE_1: 'Professional email templates',
    FEATURE_2: 'Advanced analytics and insights',
    FEATURE_3: 'AI-powered content suggestions',
    QUOTE_OR_TESTIMONIAL: 'NovaMail increased our email open rates by 300%!',
    PRODUCT_NAME: 'Pro Marketing Suite',
    PRODUCT_DESCRIPTION: 'The ultimate toolkit for modern marketers. Everything you need to create, send, and track professional email campaigns.',
    BUY_URL: 'https://novamail.com/upgrade',
    PRICE: '$99',
    ITEM_1: 'Premium Collection',
    ITEM_1_DESC: 'Exclusive limited edition',
    ITEM_1_PRICE: '$299',
    ITEM_2: 'Classic Style',
    ITEM_2_DESC: 'Timeless elegance',
    ITEM_2_PRICE: '$199',
    ICON: '⚡'
  }

  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find(t => t.id === selectedTemplate)
      if (template) {
        let html = template.html
        Object.entries(templateVariables).forEach(([key, value]) => {
          html = html.replace(new RegExp(`{{${key}}}`, 'g'), value)
        })
        setCustomContent(html)
        onChange(html)
      }
    }
  }, [selectedTemplate, onChange])

  const renderDesign = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template Style</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTemplate(template.id)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedTemplate === template.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center mb-3">
                <div className="text-4xl mb-2">{template.thumbnail}</div>
                <h4 className="font-medium text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  Template selected! This will generate a beautiful, professional email design automatically.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )

  const renderPreview = () => {
    return (
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="border-b bg-gray-50 px-4 py-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">Email Preview - What Your Customers Will See</span>
          <div className="flex space-x-2">
            <button className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">Desktop</button>
            <button className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded">Mobile</button>
          </div>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto bg-gray-50">
          <iframe
            srcDoc={customContent}
            className="w-full h-96 border-0 bg-white rounded-lg shadow-sm"
            title="Email Preview"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    )
  }


  return (
    <div className="space-y-4">
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { id: 'design', label: 'Design', icon: SparklesIcon },
            { id: 'preview', label: 'Preview', icon: EyeIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'design' | 'preview')}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'design' && renderDesign()}
          {activeTab === 'preview' && renderPreview()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
