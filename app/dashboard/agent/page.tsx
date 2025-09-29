'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  SparklesIcon,
  PaperAirplaneIcon,
  UserIcon,
  ArrowRightIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type?: 'text' | 'email'
  emailData?: {
    name: string
    subject: string
    body: string
    userSegment: string
    goal: string
    style: string
    layout: string
    businessName: string
    productService: string
  }
}

export default function AgentPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const examplePrompts = [
    "I want to send a welcome email to new users introducing our AI email marketing platform",
    "Need to send product update notifications to paid users with new feature introductions",
    "Create a weekly newsletter for active users sharing industry insights and tips",
    "Send re-engagement emails to churned users with special offers",
    "Send holiday greeting emails to all users with warm and friendly tone"
  ]

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim() || isGenerating) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsGenerating(true)

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const emailData = generateCampaignFromInput(userMessage.content)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I've generated an email campaign for you based on your requirements. Here's what I created:`,
        timestamp: new Date(),
        type: 'email',
        emailData
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error while generating your email. Please try again.',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleUseEmail = (emailData: any) => {
    const params = new URLSearchParams({
      name: emailData.name,
      subject: emailData.subject,
      body: emailData.body,
      userSegment: emailData.userSegment,
      goal: emailData.goal,
      style: emailData.style,
      layout: emailData.layout,
      businessName: emailData.businessName,
      productService: emailData.productService
    })
    
    router.push(`/dashboard/campaigns/new?${params.toString()}`)
  }

  const generateCampaignFromInput = (input: string) => {
    // Simple keyword matching logic, in real app should use actual LLM
    const lowerInput = input.toLowerCase()
    
    let userSegment = 'active-users'
    let goal = 'general'
    let style = 'casual'
    let layout = 'text-only'
    let businessName = 'NovaMail'
    let productService = 'AI Email Marketing Platform'

    // User segment detection
    if (lowerInput.includes('new user') || lowerInput.includes('welcome')) {
      userSegment = 'new-users'
      goal = 'welcome'
    } else if (lowerInput.includes('paid user') || lowerInput.includes('vip') || lowerInput.includes('premium')) {
      userSegment = 'paid-users'
      goal = 'premium'
    } else if (lowerInput.includes('active user') || lowerInput.includes('newsletter')) {
      userSegment = 'active-users'
      goal = 'newsletter'
    } else if (lowerInput.includes('churned user') || lowerInput.includes('re-engagement') || lowerInput.includes('win-back')) {
      userSegment = 'churned-users'
      goal = 'win-back'
    }

    // Style detection
    if (lowerInput.includes('formal') || lowerInput.includes('business')) {
      style = 'formal'
    } else if (lowerInput.includes('promotional') || lowerInput.includes('offer') || lowerInput.includes('sale')) {
      style = 'promotional'
    }

    // Layout detection
    if (lowerInput.includes('image') || lowerInput.includes('visual')) {
      layout = 'image-text'
    }

    // Generate email content
    const campaign = generateEmailContent(userSegment, goal, style, layout, businessName, productService)
    
    return {
      name: generateCampaignName(input),
      subject: campaign.subject,
      body: campaign.body,
      userSegment,
      goal,
      style,
      layout,
      businessName,
      productService
    }
  }

  const generateCampaignName = (input: string): string => {
    if (input.includes('welcome')) return 'New User Welcome Email'
    if (input.includes('update')) return 'Product Update Notification'
    if (input.includes('newsletter')) return 'Weekly Newsletter'
    if (input.includes('re-engagement') || input.includes('win-back')) return 'User Re-engagement'
    if (input.includes('holiday') || input.includes('greeting')) return 'Holiday Greeting Email'
    return 'AI Generated Email Campaign'
  }

  const generateEmailContent = (userSegment: string, goal: string, style: string, layout: string, businessName: string, productService: string) => {
    const segmentNames = {
      'new-users': 'New User',
      'paid-users': 'Paid User',
      'active-users': 'Active User',
      'churned-users': 'Churned User',
      'silent-users': 'Silent User'
    }

    const segmentName = segmentNames[userSegment as keyof typeof segmentNames] || 'User'

    if (style === 'casual') {
      return {
        subject: `${businessName} - Special Message`,
        body: `Hi ${segmentName}!\n\nHope you're doing great! 👋\n\nWe're the ${businessName} team and we'd like to share a special message with you.\n\n${productService}\n\nWant to learn more? Click below to find out more!\n\nThanks for being awesome!\n${businessName} Team\n\nP.S. If this isn't your thing, no worries at all. Just let us know and we'll stop sending these updates.\n\n---\nUnsubscribe | Update preferences`
      }
    } else if (style === 'formal') {
      return {
        subject: `${businessName} - Important Notice`,
        body: `Dear ${segmentName},\n\nHello!\n\nI am a representative of ${businessName} and would like to convey important information to you.\n\n${productService}\n\nWe believe this will bring great value to you. If you need more information or have any questions, please feel free to contact us.\n\nBest regards,\n${businessName} Team\n\n---\nYou can unsubscribe from these emails at any time.`
      }
    } else {
      return {
        subject: `🎉 ${businessName} - Exclusive Message for ${segmentName}`,
        body: `Hi ${segmentName}!\n\nAs our ${segmentName}, we're excited to share special information with you.\n\n${productService}\n\n✨ Features designed specifically for ${segmentName}\n✨ Why this matters to you\n✨ How to get started\n\nReady to experience something different? Click below to learn more!\n\nBest regards,\n${businessName} Team\n\n---\nYou're receiving this email because you subscribed to our updates. Click here to unsubscribe.`
      }
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <SparklesIcon className="h-8 w-8 text-primary-600" />
          <h1 className="text-xl font-semibold text-gray-900">AI Email Assistant</h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to AI Email Assistant</h3>
            <p className="text-gray-600 mb-6">Describe your email requirements and I'll help you create professional email campaigns.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="p-3 text-left border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <span className="text-sm text-gray-700">{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {message.role === 'user' ? (
                    <UserIcon className="h-5 w-5" />
                  ) : (
                    <SparklesIcon className="h-5 w-5" />
                  )}
                </div>
              </div>
              
              <div className={`rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {message.type === 'email' && message.emailData ? (
                  <div className="space-y-4">
                    <p className="text-sm">{message.content}</p>
                    
                    <div className="bg-white rounded-lg p-4 text-gray-900">
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Campaign Name</label>
                          <p className="text-sm font-medium">{message.emailData.name}</p>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Subject</label>
                          <p className="text-sm">{message.emailData.subject}</p>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</label>
                          <div className="mt-2 p-3 bg-gray-50 rounded border text-sm max-h-32 overflow-y-auto">
                            <div 
                              dangerouslySetInnerHTML={{ 
                                __html: message.emailData.body.replace(/\n/g, '<br>') 
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <button
                            onClick={() => handleUseEmail(message.emailData)}
                            className="btn-primary text-xs px-3 py-2 flex items-center"
                          >
                            <ArrowRightIcon className="h-3 w-3 mr-1" />
                            Use This Email
                          </button>
                          <button
                            onClick={() => navigator.clipboard.writeText(message.emailData?.body || '')}
                            className="btn-secondary text-xs px-3 py-2 flex items-center"
                          >
                            <ClipboardDocumentIcon className="h-3 w-3 mr-1" />
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                )}
                
                <div className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex justify-start">
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                  <SparklesIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your email requirements..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={1}
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isGenerating}
            className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}