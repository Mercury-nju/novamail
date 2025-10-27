'use client'

import { Fragment, useState, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface Message {
  role: 'user' | 'assistant'
  content: string
  html?: string
}

interface AIAssistantProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function AIAssistant({ isOpen, setIsOpen }: AIAssistantProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '你好！我是你的AI邮件模板助手。请描述你想要的邮件模板，我会为你创建一个专业的模板。'
    }
  ])
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
        
        const assistantMessage = `我已经为你创建了一个邮件模板：\n\n**模板名称：** ${template.name}\n**主题：** ${template.subject}\n\n你想使用这个模板还是继续修改？`
        
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
        content: '抱歉，生成模板时出现了错误。请稍后再试或重新描述你的需求。'
      }])
      toast.error('生成失败，请重试')
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
    setIsOpen(false)
    toast.success('正在打开编辑器...')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-0">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">AI</span>
                    </div>
                    <div>
                      <Dialog.Title as="h3" className="text-base font-semibold text-gray-900">
                        AI 邮件模板助手
                      </Dialog.Title>
                      <p className="text-xs text-gray-500">描述你的需求，我来创建专业模板</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500"
                    onClick={() => setIsOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="h-[500px] overflow-y-auto px-6 py-4 space-y-4">
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
                              使用此模板
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
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="flex items-end space-x-2">
                    <textarea
                      rows={3}
                      className="flex-1 resize-none rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      placeholder="描述你想要的邮件模板..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-white hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Shift + Enter 换行，Enter 发送
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
