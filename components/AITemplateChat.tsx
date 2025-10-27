'use client'

import { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface Message {
  role: 'user' | 'assistant'
  content: string
  html?: string
}

export default function AITemplateChat() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedTemplate, setGeneratedTemplate] = useState<{
    html: string
    subject: string
    name: string
  } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/generate-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate template')
      }

      const data = await response.json()

      if (data.success && data.template) {
        const template = data.template
        setGeneratedTemplate(template)
        
        const assistantMessage = `I've created an email template for you:\n\n**Template Name:** ${template.name}\n**Subject:** ${template.subject}\n\nWould you like to use this template or continue editing?`
        
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: assistantMessage,
          html: template.html 
        }])
      } else {
        throw new Error(data.error || 'Failed to generate template')
      }
    } catch (error) {
      console.error('AI assistant error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, an error occurred while generating the template. Please try again or re-describe your needs.'
      }])
      toast.error('Generation failed, please try again')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseTemplate = () => {
    if (!generatedTemplate) return

    const templateData = {
      name: generatedTemplate.name,
      subject: generatedTemplate.subject,
      html: generatedTemplate.html,
    }

    sessionStorage.setItem('ai-generated-template', JSON.stringify(templateData))
    router.push('/dashboard/campaigns/edit?ai-generated=true')
    toast.success('Opening editor...')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <SparklesIcon className="h-5 w-5 text-white" />
          </div>
          <div>
              <h3 className="text-base font-semibold text-gray-900">
              Template AI
            </h3>
            <p className="text-xs text-gray-500">Describe your needs, I'll create professional templates</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Template AI</h3>
              <p className="text-sm text-gray-500">Describe the email template you want, I'll create it for you</p>
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              
              {message.html && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <button
                    onClick={handleUseTemplate}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Use This Template
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 border-2 border-blue-400 shadow-lg rounded-2xl px-5 py-4 bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 focus-within:shadow-xl transition-all">
              <textarea
                rows={1}
                className="w-full resize-none bg-transparent border-0 focus:outline-none focus:ring-0 text-base text-gray-900 placeholder-gray-500"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  // Auto-resize textarea
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px'
                }}
                onKeyPress={handleKeyPress}
                style={{ minHeight: '32px', maxHeight: '200px', overflowY: 'auto' }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl hover:scale-110"
            >
              <PaperAirplaneIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

