'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Send, Sparkles, Check, X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useTranslation } from '@/lib/i18n'

interface ChatMessage {
  type: 'user' | 'ai'
  message: string
  timestamp: Date
  generatedContent?: {
    subject: string
    textContent: string
  }
}

export default function CampaignEditPage() {
  const { t } = useTranslation()
  const router = useRouter()
  
  // 简单的状态管理
  const [campaignData, setCampaignData] = useState({
    subject: '🚀 Introducing [Product Name] - The Future is Here',
    body: ''
  })
  
  
  
  const [chatInput, setChatInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  
  // 邮件发送状态
  const [isSending, setIsSending] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [sendForm, setSendForm] = useState({
    recipients: '',
    senderEmail: '',
    senderName: 'NovaMail'
  })
  
  // 专业模板内容 - 直接作为状态
  const [templateContent] = useState(`
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">NovaMail</h1>
        <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 14px; font-weight: 400;">AI-Powered Email Marketing</p>
      </div>
      
      <div style="padding: 40px 30px;">
        <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin-bottom: 24px; font-weight: 400;">
          Dear [Customer Name],
        </p>
        
        <p style="color: #334155; font-size: 16px; line-height: 1.7; margin-bottom: 32px; font-weight: 400;">
          We're excited to introduce our latest innovation that will transform your business. This is more than just a product launch – it's the beginning of a new era.
        </p>
        
        <div style="background: #f8fafc; padding: 24px; border-radius: 8px; margin: 24px 0; border: 1px solid #e2e8f0;">
          <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">What's New</h3>
          <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.6;">
            <li style="margin-bottom: 8px;">Revolutionary AI-powered features</li>
            <li style="margin-bottom: 8px;">Seamless integration with your existing tools</li>
            <li style="margin-bottom: 8px;">24/7 dedicated support</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
            Get Started Today
          </a>
        </div>
        
        <p style="color: #1a1a1a; font-size: 15px; line-height: 1.6; margin: 48px 0 0 0; font-weight: 300;">
          Best,<br>
          The NovaMail Team
        </p>
      </div>
    </div>
  `)

  // 简单的文本转HTML函数
  const convertTextToHtml = (text: string): string => {
    if (!text) return ''
    
    // 处理列表项
    let html = text.replace(/^•\s*(.+)$/gm, '<li>$1</li>')
    html = html.replace(/^-\s*(.+)$/gm, '<li>$1</li>')
    html = html.replace(/^\*\s*(.+)$/gm, '<li>$1</li>')
    
    // 包装列表
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    
    // 处理标题
    html = html.replace(/^(\d+\.\s*.+)$/gm, '<h3>$1</h3>')
    
    // 处理粗体和斜体
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
    
    // 处理段落
    html = html.replace(/\n\n/g, '</p><p>')
    html = html.replace(/\n/g, '<br>')
    
    // 包装段落
    if (html && !html.startsWith('<')) {
      html = '<p>' + html + '</p>'
    }
    
    return html
  }

  // 从HTML提取纯文本
  const extractTextFromHtml = (html: string): string => {
    if (!html) return ''
    
    // 创建临时DOM元素
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    
    // 处理列表
    const lists = tempDiv.querySelectorAll('ul')
    lists.forEach(ul => {
      const items = ul.querySelectorAll('li')
      items.forEach(li => {
        li.textContent = '• ' + (li.textContent || '')
      })
    })
    
    // 处理标题
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach(h => {
      h.textContent = h.textContent + '\n'
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


  // 处理AI内容接受
  const handleAcceptContent = (generatedContent: { subject: string; textContent: string }) => {
    const aiContentHtml = convertTextToHtml(generatedContent.textContent)
    
    // 创建完整的专业模板
    const fullTemplate = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">NovaMail</h1>
          <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 14px; font-weight: 400;">AI-Powered Email Marketing</p>
        </div>
        
        <div style="padding: 40px 30px;">
          ${aiContentHtml}
        </div>
      </div>
    `
    
    setCampaignData(prev => ({
      ...prev,
      subject: generatedContent.subject,
      body: fullTemplate
    }))
    
    setChatHistory(prev => [...prev, {
      type: 'ai',
      message: '✅ Content applied to professional template!',
      timestamp: new Date()
    }])
    
    toast.success('✨ Content applied to template!')
  }

  // 处理聊天提交
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || isGenerating) return

    const userMessage = chatInput.trim()
    setChatInput('')
    setIsGenerating(true)

    // 添加用户消息
    setChatHistory(prev => [...prev, {
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    }])

    try {
      // 智能API路由选择 - 简化逻辑
      const apiUrl = '/api/ai/generate-email'  // 始终使用本地API进行开发
      
      console.log('🔍 API URL:', apiUrl)
      console.log('🔍 Hostname:', typeof window !== 'undefined' ? window.location.hostname : 'server-side')
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userRequest: userMessage,
          businessName: 'Your Business',
          productService: 'Your Product/Service',
          targetAudience: 'Your Customers'
        }),
      })

      console.log('🔍 Response status:', response.status)
      console.log('🔍 Response ok:', response.ok)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ API Error:', errorText)
        throw new Error(`Failed to generate content: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log('✅ API Response:', data)
      console.log('✅ Data success:', data.success)
      console.log('✅ Data subject:', data.subject)
      console.log('✅ Data textContent:', data.textContent)
      
      if (data.success && data.subject && data.textContent) {
        // 添加AI响应
        setChatHistory(prev => [...prev, {
          type: 'ai',
          message: 'Here\'s your generated email content:',
          timestamp: new Date(),
          generatedContent: {
            subject: data.subject,
            textContent: data.textContent
          }
        }])
        toast.success('✨ Email content generated successfully!')
      } else {
        throw new Error('Invalid API response format')
      }

    } catch (error) {
      console.error('Error generating content:', error)
      setChatHistory(prev => [...prev, {
        type: 'ai',
        message: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }])
      toast.error('Failed to generate content')
    } finally {
      setIsGenerating(false)
    }
  }

  // 处理邮件发送
  const handleSendEmail = async () => {
    if (!sendForm.recipients || !sendForm.senderEmail) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSending(true)
    try {
      // 智能API路由选择 - 简化逻辑
      const apiUrl = '/api/campaigns/send'  // 始终使用本地API进行开发
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: campaignData.subject,
          content: campaignData.body,
          recipients: sendForm.recipients.split(',').map(email => email.trim()),
          senderEmail: sendForm.senderEmail,
          senderName: sendForm.senderName
        })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Email sent successfully!')
        setShowSendModal(false)
        setSendForm({
          recipients: '',
          senderEmail: '',
          senderName: 'NovaMail'
        })
      } else {
        throw new Error(data.error || 'Failed to send email')
      }
    } catch (error) {
      console.error('Send email error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to send email')
    } finally {
      setIsSending(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Email Editor</h1>
              <p className="text-sm text-gray-500">Modern Gradient</p>
            </div>
          </div>
          <button
            onClick={() => setShowSendModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Email
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Email Template */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Line:
              </label>
              <input
                type="text"
                value={campaignData.subject}
                onChange={(e) => setCampaignData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email subject..."
              />
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                contentEditable
                suppressContentEditableWarning={true}
                onInput={(e) => {
                  const newContent = e.currentTarget.innerHTML
                  setCampaignData(prev => ({ ...prev, body: newContent }))
                }}
                className="min-h-[500px] focus:outline-none"
                style={{
                  lineHeight: '1.6',
                  fontSize: '16px',
                  color: '#374151',
                  userSelect: 'text',
                  WebkitUserSelect: 'text',
                  MozUserSelect: 'text',
                  msUserSelect: 'text',
                  cursor: 'text'
                }}
                onKeyDown={(e) => {
                  // 防止Tab键跳转焦点
                  if (e.key === 'Tab') {
                    e.preventDefault()
                    document.execCommand('insertText', false, '    ')
                  }
                }}
                onPaste={(e) => {
                  e.preventDefault()
                  const text = e.clipboardData.getData('text/plain')
                  document.execCommand('insertText', false, text)
                }}
                onMouseDown={(e) => {
                  // 防止点击时焦点跳转
                  e.stopPropagation()
                }}
                onFocus={(e) => {
                  // 完全阻止默认焦点行为
                  e.stopPropagation()
                }}
                ref={(el) => {
                  if (el && !el.innerHTML) {
                    el.innerHTML = campaignData.body || templateContent
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Panel - AI Assistant */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
            <p className="text-sm text-gray-500">Generate professional email content</p>
          </div>

          {/* AI Hints */}
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Start:</h4>
            <div className="space-y-2">
              <button
                onClick={() => setChatInput('Write a product launch email for a new AI tool')}
                className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-600 transition-colors"
              >
                🚀 Product Launch Email
              </button>
              <button
                onClick={() => setChatInput('Create a newsletter about company updates')}
                className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-600 transition-colors"
              >
                📧 Company Newsletter
              </button>
              <button
                onClick={() => setChatInput('Write a promotional email for a sale')}
                className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-600 transition-colors"
              >
                🎉 Sale Promotion
              </button>
              <button
                onClick={() => setChatInput('Create a welcome email for new customers')}
                className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-600 transition-colors"
              >
                👋 Welcome Email
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  
                  {message.generatedContent && (
                    <div className="mt-3 p-3 bg-white rounded border">
                      <div className="text-xs text-gray-500 mb-2">Subject:</div>
                      <div className="text-sm font-medium mb-2">{message.generatedContent.subject}</div>
                      <div className="text-xs text-gray-500 mb-2">Content:</div>
                      <div className="text-sm whitespace-pre-wrap">{message.generatedContent.textContent}</div>
                      
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleAcceptContent(message.generatedContent!)}
                          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                        >
                          <Check className="w-3 h-3" />
                          Accept
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Describe the email you want to generate..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isGenerating}
              />
              <button
                type="submit"
                disabled={isGenerating || !chatInput.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Send Email Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Send Email</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipients (comma-separated)
                </label>
                <input
                  type="text"
                  value={sendForm.recipients}
                  onChange={(e) => setSendForm(prev => ({ ...prev, recipients: e.target.value }))}
                  placeholder="user1@example.com, user2@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sender Email *
                </label>
                <input
                  type="email"
                  value={sendForm.senderEmail}
                  onChange={(e) => setSendForm(prev => ({ ...prev, senderEmail: e.target.value }))}
                  placeholder="your-email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sender Name
                </label>
                <input
                  type="text"
                  value={sendForm.senderName}
                  onChange={(e) => setSendForm(prev => ({ ...prev, senderName: e.target.value }))}
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSendModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                disabled={isSending}
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSending}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
