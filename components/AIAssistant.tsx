'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SparklesIcon, 
  PaperAirplaneIcon,
  UserIcon,
  CpuChipIcon,
  XMarkIcon,
  ArrowRightIcon,
  LightBulbIcon,
  DocumentTextIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'
import { professionalTemplates, type ProfessionalTemplate } from '@/lib/templates'

interface AIAssistantProps {
  onTemplateSelect: (template: ProfessionalTemplate) => void
  onClose: () => void
}

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIAssistant({ onTemplateSelect, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hi! I\'m your AI email assistant. I can help you create the perfect email campaign. What type of email are you looking to create?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getSuggestedTemplates = (query: string): ProfessionalTemplate[] => {
    const lowerQuery = query.toLowerCase()
    
    // Keyword matching for template suggestions
    if (lowerQuery.includes('newsletter') || lowerQuery.includes('update') || lowerQuery.includes('weekly')) {
      return professionalTemplates.filter(t => t.category === 'Newsletter' || t.id === 'newsletter')
    }
    if (lowerQuery.includes('product') || lowerQuery.includes('launch') || lowerQuery.includes('new')) {
      return professionalTemplates.filter(t => t.category === 'Product' || t.id === 'product-launch')
    }
    if (lowerQuery.includes('welcome') || lowerQuery.includes('onboard') || lowerQuery.includes('new user')) {
      return professionalTemplates.filter(t => t.category === 'Onboarding' || t.id === 'welcome-series')
    }
    if (lowerQuery.includes('event') || lowerQuery.includes('invitation') || lowerQuery.includes('rsvp')) {
      return professionalTemplates.filter(t => t.category === 'Events' || t.id === 'event-invitation')
    }
    if (lowerQuery.includes('corporate') || lowerQuery.includes('business') || lowerQuery.includes('professional')) {
      return professionalTemplates.filter(t => t.category === 'Corporate' || t.id === 'corporate-professional')
    }
    if (lowerQuery.includes('modern') || lowerQuery.includes('gradient') || lowerQuery.includes('trendy')) {
      return professionalTemplates.filter(t => t.category === 'Modern' || t.id === 'modern-gradient')
    }
    if (lowerQuery.includes('minimal') || lowerQuery.includes('clean') || lowerQuery.includes('simple')) {
      return professionalTemplates.filter(t => t.category === 'Minimal' || t.id === 'minimal-clean')
    }
    if (lowerQuery.includes('ecommerce') || lowerQuery.includes('sales') || lowerQuery.includes('shop')) {
      return professionalTemplates.filter(t => t.category === 'Sales' || t.id === 'ecommerce')
    }
    
    // Default suggestions
    return professionalTemplates.slice(0, 3)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const suggestedTemplates = getSuggestedTemplates(inputValue)
      
      let response = ''
      if (suggestedTemplates.length > 0) {
        response = `Based on your request, I recommend these templates:\n\n`
        suggestedTemplates.forEach((template, index) => {
          response += `${index + 1}. **${template.name}** (${template.category})\n   ${template.description}\n\n`
        })
        response += `Would you like me to set up one of these templates for you?`
      } else {
        response = `I understand you're looking to create an email campaign. Here are some popular templates that might work well:\n\n`
        professionalTemplates.slice(0, 3).forEach((template, index) => {
          response += `${index + 1}. **${template.name}** (${template.category})\n   ${template.description}\n\n`
        })
        response += `Could you tell me more about your specific needs? For example:\n- What type of business are you in?\n- Who is your target audience?\n- What's the purpose of this email?`
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleTemplateQuickSelect = (template: ProfessionalTemplate) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `I'd like to use the ${template.name} template`,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, message])
    setIsTyping(true)

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Perfect! I've selected the **${template.name}** template for you. This template is great for ${template.category.toLowerCase()} campaigns. Let me set that up for you now.`,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, response])
      setIsTyping(false)

      // Auto-select template after a short delay
      setTimeout(() => {
        onTemplateSelect(template)
      }, 1000)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <CpuChipIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Email Assistant</h2>
              <p className="text-sm text-gray-500">Let me help you create the perfect email</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600'
                }`}>
                  {message.type === 'user' ? (
                    <UserIcon className="w-5 h-5 text-white" />
                  ) : (
                    <CpuChipIcon className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <CpuChipIcon className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Template Suggestions */}
        <div className="border-t border-gray-200 p-4">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Quick Templates</h3>
            <div className="grid grid-cols-2 gap-2">
              {professionalTemplates.slice(0, 4).map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateQuickSelect(template)}
                  className="flex items-center space-x-2 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <SparklesIcon className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{template.name}</p>
                    <p className="text-xs text-gray-500 truncate">{template.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex space-x-3">
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your email campaign needs..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
