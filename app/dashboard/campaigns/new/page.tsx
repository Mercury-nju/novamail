'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  ArrowLeftIcon,
  PaperAirplaneIcon,
  PencilIcon,
  SwatchIcon,
  UserGroupIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx'

export default function NewCampaignPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [emailMode, setEmailMode] = useState<'simple' | 'professional'>('simple')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [previewTemplate, setPreviewTemplate] = useState<string>('')
  const [showPreview, setShowPreview] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showImportContactsModal, setShowImportContactsModal] = useState(false)
  const [showImportFileModal, setShowImportFileModal] = useState(false)
  const [campaignData, setCampaignData] = useState({
    name: '',
    purpose: '',
    subject: '',
    body: '',
    businessName: '',
    productService: '',
    targetUrl: '',
    recipients: [] as string[]
  })

  // 从 URL 参数中获取预选的收件人
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const recipients = params.get('recipients')
      if (recipients) {
        const recipientList = recipients.split(',').filter(email => email.trim())
        setCampaignData(prev => ({ ...prev, recipients: recipientList }))
      }
    }
  }, [])

  const progress = ((step - 1) / 2) * 100

  const generateEmailContent = async () => {
    setIsGenerating(true)
    
    try {
      // 调用真实的AI服务
      const response = await fetch('/api/ai/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailMode,
          selectedTemplate,
          campaignData
        }),
      })

      const result = await response.json()

      if (result.success) {
        setCampaignData(prev => ({ 
          ...prev, 
          subject: result.subject, 
          body: result.body 
        }))
        toast.success(`AI生成完成！使用${result.template}模板`)
      } else {
        throw new Error(result.error || '生成失败')
      }
    } catch (error) {
      console.error('AI Generation Error:', error)
      toast.error('AI生成失败，请稍后重试')
      
      // 降级到简单生成（保持现有功能作为备用）
      const fallbackSubject = emailMode === 'professional' 
        ? `Professional Email: ${campaignData.purpose}` 
        : `Message from ${campaignData.businessName || 'Us'}: ${campaignData.purpose}`
      
      const fallbackBody = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">          
        <h1 style="color: #333; margin-bottom: 20px;">Hello there!</h1>
        <p style="line-height: 1.6; color: #666; margin-bottom: 20px;">We hope this email finds you well.</p>
        <p style="line-height: 1.6; color: #666; margin-bottom: 20px;">${campaignData.purpose}</p>
        ${campaignData.targetUrl ? `<div style="text-align: center; margin: 30px 0;">
          <a href="${campaignData.targetUrl}" style="background: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">Learn More</a>
        </div>` : ''}
        <p style="line-height: 1.6; color: #666;">Best regards,<br>The ${campaignData.businessName || 'NovaMail'} Team</p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
          <p>© 2024 ${campaignData.businessName || 'NovaMail'}. All rights reserved.</p>
        </div>
      </div>`
      
      setCampaignData(prev => ({ 
        ...prev, 
        subject: fallbackSubject, 
        body: fallbackBody 
      }))
    } finally {
      setIsGenerating(false)
      setStep(2)
    }
  }

  const handleNext = () => {
    if (step === 1) {
      if (!campaignData.name.trim() || !campaignData.purpose.trim()) {
        toast.error('Please fill in Campaign Theme and Purpose')
        return
      }
      if (emailMode === 'professional' && !selectedTemplate) {
        toast.error('Please select a professional template')
        return
      }
      generateEmailContent()
    } else if (step === 2) {
      if (!campaignData.subject.trim() || !campaignData.body.trim()) {
        toast.error('Please fill in Subject and Email Body')
        return
      }
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSend = async () => {
    if (campaignData.recipients.length === 0) {
      toast.error('Please add at least one recipient')
      return
    }
    
    try {
      // 调用邮件发送API
      const response = await fetch('/api/campaigns/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignData,
          recipients: campaignData.recipients
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(`Campaign sent successfully to ${campaignData.recipients.length} recipients!`)
        router.push('/dashboard/campaigns')
      } else {
        throw new Error(result.error || '发送失败')
      }
    } catch (error) {
      console.error('Send campaign error:', error)
      toast.error('邮件发送失败，请稍后重试')
    }
  }

  const handleSave = () => {
    toast.success('Campaign saved as draft!')
    router.push('/dashboard/campaigns')
  }

  // 模拟联系人数据
  const [availableContacts] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@company.com', status: 'active' },
    { id: 3, name: 'Mike Wilson', email: 'mike.wilson@email.com', status: 'active' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@startup.io', status: 'active' },
    { id: 5, name: 'David Brown', email: 'david.brown@tech.com', status: 'active' },
    { id: 6, name: 'Lisa Chen', email: 'lisa.chen@design.com', status: 'active' },
    { id: 7, name: 'Tom Anderson', email: 'tom.anderson@marketing.com', status: 'active' },
    { id: 8, name: 'Anna Lee', email: 'anna.lee@business.com', status: 'active' }
  ])

  const [selectedContacts, setSelectedContacts] = useState<number[]>([])

  const handleImportFromContacts = () => {
    setShowImportContactsModal(true)
  }

  const handleImportFromFile = () => {
    setShowImportFileModal(true)
  }

  const handleAddSelectedContacts = () => {
    const selectedEmails = availableContacts
      .filter(contact => selectedContacts.includes(contact.id))
      .map(contact => contact.email)
    
    const newRecipients = Array.from(new Set([...campaignData.recipients, ...selectedEmails]))
    setCampaignData(prev => ({ ...prev, recipients: newRecipients }))
    setSelectedContacts([])
    setShowImportContactsModal(false)
    toast.success(`Added ${selectedEmails.length} contacts`)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileName = file.name.toLowerCase()
    const isCSV = fileName.endsWith('.csv')
    const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls')
    const isTXT = fileName.endsWith('.txt')

    if (!isCSV && !isExcel && !isTXT) {
      toast.error('请上传CSV、Excel或TXT格式的文件')
      return
    }

    try {
      let emails: string[] = []

      if (isExcel) {
        emails = await parseExcelFile(file)
      } else {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          const parsedEmails = parseFileContent(content, file.name)
          const newRecipients = Array.from(new Set([...campaignData.recipients, ...parsedEmails]))
          setCampaignData(prev => ({ ...prev, recipients: newRecipients }))
          setShowImportFileModal(false)
          toast.success(`Added ${parsedEmails.length} contacts from file`)
        }
        reader.readAsText(file, 'utf-8')
        return
      }

      if (emails.length > 0) {
        const newRecipients = Array.from(new Set([...campaignData.recipients, ...emails]))
        setCampaignData(prev => ({ ...prev, recipients: newRecipients }))
        setShowImportFileModal(false)
        toast.success(`Added ${emails.length} contacts from file`)
      } else {
        toast.error('文件中没有找到有效的邮箱地址')
      }
    } catch (error) {
      console.error('File processing error:', error)
      toast.error('文件处理失败，请检查文件格式')
    }
  }

  const parseFileContent = (content: string, fileName: string): string[] => {
    const emails: string[] = []
    const lines = content.split('\n').filter(line => line.trim())
    
    if (fileName.toLowerCase().endsWith('.txt')) {
      lines.forEach((line) => {
        const trimmedLine = line.trim()
        if (trimmedLine) {
          if (trimmedLine.includes(',')) {
            const [, email] = trimmedLine.split(',').map(s => s.trim())
            if (email && isValidEmail(email)) {
              emails.push(email)
            }
          } else if (isValidEmail(trimmedLine)) {
            emails.push(trimmedLine)
          }
        }
      })
    } else {
      const [header, ...dataLines] = lines
      const headers = header.split(',').map(h => h.trim().toLowerCase())
      const emailIndex = headers.findIndex(h => h.includes('email') || h.includes('邮箱'))

      dataLines.forEach((line) => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
        const email = emailIndex >= 0 ? values[emailIndex] : ''

        if (email && isValidEmail(email)) {
          emails.push(email)
        }
      })
    }

    return emails
  }

  const parseExcelFile = async (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result
          if (!data) {
            reject(new Error('No data found'))
            return
          }

          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
          
          if (jsonData.length === 0) {
            resolve([])
            return
          }

          const headers = (jsonData[0] as string[]).map(h => h?.toString().toLowerCase().trim() || '')
          const emailIndex = headers.findIndex(h => h.includes('email') || h.includes('邮箱'))

          const emails: string[] = []
          
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as any[]
            if (!row || row.length === 0) continue

            const email = emailIndex >= 0 ? (row[emailIndex]?.toString().trim() || '') : ''

            if (email && isValidEmail(email)) {
              emails.push(email)
            }
          }

          resolve(emails)
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = (error) => {
        reject(error)
      }

      reader.readAsBinaryString(file)
    })
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
            <p className="mt-1 text-sm text-gray-600">
              Step {step} of 3: {step === 1 ? 'Campaign Setup' : step === 2 ? 'Email Creation' : 'Review & Send'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Save Draft
          </button>
          {step === 3 && (
            <button onClick={handleSend} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2">
              <PaperAirplaneIcon className="h-4 w-4" />
              <span>Send Campaign</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <motion.div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Template Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {previewTemplate === 'modern-promo' && 'Modern Promo Template Preview'}
                {previewTemplate === 'newsletter' && 'Newsletter Template Preview'}
                {previewTemplate === 'ecommerce' && 'E-commerce Template Preview'}
                {previewTemplate === 'event' && 'Event Invite Template Preview'}
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[70vh] p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Desktop Preview */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                    <span className="mr-2">🖥️</span>
                    Desktop Preview
                  </h4>
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                      {/* Email Header */}
                      <div className="border-b border-gray-200 p-4">
                        <div className="text-xs text-gray-600 mb-1">Subject:</div>
                        <div className="font-medium text-gray-900">
                          {previewTemplate === 'modern-promo' && '🚀 Don\'t Miss Out: Limited Time Offer Inside!'}
                          {previewTemplate === 'newsletter' && '📰 Weekly Newsletter: Latest Updates & Insights'}
                          {previewTemplate === 'ecommerce' && '🛒 New Collection Arrived: Shop Now & Save 20%'}
                          {previewTemplate === 'event' && '🎉 You\'re Invited: Exclusive Event This Weekend!'}
                        </div>
                      </div>
                      
                      {/* Email Body Preview */}
                      <div className="p-6">
                        {previewTemplate === 'modern-promo' && (
                          <div className="space-y-4 text-sm text-gray-700">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg text-center">
                              <h2 className="text-lg font-bold text-gray-900 mb-2">⚡ Special Promotion</h2>
                              <p className="text-gray-600 mb-3">Get 50% off on all premium plans!</p>
                              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
                                {campaignData.targetUrl ? (
                                  <a href={campaignData.targetUrl} className="text-white">Claim Offer</a>
                                ) : (
                                  'Claim Offer'
                                )}
                              </button>
                            </div>
                            <div className="text-center text-xs text-gray-500">
                              <p>Valid until end of month. Terms & conditions apply.</p>
                            </div>
                          </div>
                        )}
                        
                        {previewTemplate === 'newsletter' && (
                          <div className="space-y-4 text-sm text-gray-700">
                            <div className="text-center mb-4">
                              <h2 className="text-lg font-bold text-gray-900 mb-2">📰 Weekly Newsletter</h2>
                              <p className="text-gray-600">Your weekly dose of insights and updates</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="border border-gray-200 rounded p-3">
                                <h3 className="font-semibold mb-2">📈 Featured Article</h3>
                                <p className="text-xs text-gray-600">Industry trends and analysis...</p>
                              </div>
                              <div className="border border-gray-200 rounded p-3">
                                <h3 className="font-semibold mb-2">💡 Quick Tips</h3>
                                <p className="text-xs text-gray-600">Helpful tips and tricks...</p>
                              </div>
                            </div>
                            {campaignData.targetUrl && (
                              <div className="text-center">
                                <button className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium">
                                  <a href={campaignData.targetUrl} className="text-white">📖 Read More</a>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {previewTemplate === 'ecommerce' && (
                          <div className="space-y-4 text-sm text-gray-700">
                            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg text-center">
                              <h2 className="text-lg font-bold text-gray-900 mb-2">🛒 New Collection</h2>
                              <p className="text-gray-600 mb-3">Fresh arrivals just for you</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-gray-100 aspect-square rounded flex items-center justify-center">
                                  <span className="text-xs text-gray-500">Product {i}</span>
                                </div>
                              ))}
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-lg text-center">
                              <p className="text-sm text-yellow-700 font-semibold">🎉 Limited Time: 20% OFF!</p>
                            </div>
                            {campaignData.targetUrl && (
                              <div className="text-center">
                                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
                                  <a href={campaignData.targetUrl} className="text-white">🛒 Shop Now</a>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                    
                        {previewTemplate === 'event' && (
                          <div className="space-y-4 text-sm text-gray-700">
                            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg text-center">
                              <div className="text-4xl mb-3">🎉</div>
                              <h2 className="text-lg font-bold text-gray-900 mb-2">You're Invited!</h2>
                              <p className="text-gray-600 mb-4">Join us for an exclusive event this weekend</p>
                              <div className="bg-white p-3 rounded-lg mb-4">
                                <p className="text-xs text-gray-600"><strong>📅 Saturday, Dec 14th • 7:00 PM</strong></p>
                              </div>
                              <div className="flex justify-center space-x-4">
                                <button className="bg-pink-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
                                  {campaignData.targetUrl ? (
                                    <a href={campaignData.targetUrl} className="text-white">✅ RSVP Yes</a>
                                  ) : (
                                    '✅ RSVP Yes'
                                  )}
                                </button>
                                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium">❓ Maybe Later</button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                          <p>© 2024 NovaMail. All rights reserved.</p>
                          <p className="mt-1 text-xs">If you have any questions, contact us at support@novamail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Preview */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                    <span className="mr-2">📱</span>
                    Mobile Preview
                  </h4>
                  <div className="w-80 mx-auto border-2 border-gray-800 rounded-lg bg-gray-900 overflow-hidden">
                    {/* Phone Header */}
                    <div className="h-8 bg-gray-800 flex items-center justify-between px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                      <div className="text-xs text-white">9:41</div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-2 border border-white rounded-sm">
                          <div className="w-full h-full bg-green-500 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Phone Content */}
                    <div className="bg-white">
                      <div className="p-3 border-b border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">From: NovaMail &lt;noreply@novamail.com&gt;</div>
                        <div className="text-xs text-gray-500 mb-2">Subject:</div>
                        <div className="text-xs font-medium text-gray-900 leading-tight">
                          {previewTemplate === 'modern-promo' && '🚀 Don\'t Miss Out: Limited Time Offer!'}
                          {previewTemplate === 'newsletter' && '📰 Weekly Newsletter: Latest Updates'}
                          {previewTemplate === 'ecommerce' && '🛒 New Collection: Shop Now & Save'}
                          {previewTemplate === 'event' && '🎉 You\'re Invited: Event This Weekend!'}
                        </div>
                      </div>
                      
                      {/* Mobile Email Body */}
                      <div className="p-3 text-xs text-gray-700 overflow-y-auto h-[300px]">
                        {previewTemplate === 'modern-promo' && (
                          <div className="space-y-3">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded text-center">
                              <div className="text-lg mb-2">🚀</div>
                              <div className="text-lg font-bold text-gray-900 mb-2">Special Promotion</div>
                              <div className="text-gray-600 mb-3">Get 50% off premium plans!</div>
                              <button className="bg-blue-600 text-white px-4 py-2 rounded text-xs font-medium">
                                {campaignData.targetUrl ? (
                                  <a href={campaignData.targetUrl} className="text-white">Claim Offer</a>
                                ) : (
                                  'Claim Offer'
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                        
                        {previewTemplate === 'newsletter' && (
                          <div className="space-y-3">
                            <div className="text-center">
                              <div className="text-lg mb-2">📰</div>
                              <div className="text-lg font-bold text-gray-900 mb-2">Weekly Newsletter</div>
                              <div className="text-gray-600">Your weekly dose of insights...</div>
                            </div>
                            <div className="space-y-2 mt-3">
                              <div className="border border-gray-200 rounded p-2">
                                <div className="font-semibold text-xs mb-1">📈 Featured Article</div>
                                <div className="text-gray-600">Industry trends...</div>
                              </div>
                              {campaignData.targetUrl && (
                                <div className="text-center mt-3">
                                  <button className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium">
                                    <a href={campaignData.targetUrl} className="text-white">📖 Read More</a>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {previewTemplate === 'ecommerce' && (
                          <div className="space-y-3">
                            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded text-center">
                              <div className="text-lg mb-2">🛒</div>
                              <div className="text-lg font-bold text-gray-900 mb-2">New Collection</div>
                              <div className="text-gray-600 mb-3">Fresh arrivals!</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3">
                              {[1, 2].map((i) => (
                                <div key={i} className="bg-gray-100 aspect-square rounded flex items-center justify-center">
                                  <span className="text-xs text-gray-500">P{i}</span>
                                </div>
                              ))}
                            </div>
                            {campaignData.targetUrl && (
                              <button className="bg-orange-600 text-white px-4 py-2 rounded text-xs w-full font-medium mt-3">
                                <a href={campaignData.targetUrl} className="text-white">🛒 Shop Now</a>
                              </button>
                            )}
                          </div>
                        )}
                    
                        {previewTemplate === 'event' && (
                          <div className="space-y-3">
                            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded text-center">
                              <div className="text-2xl mb-3">🎉</div>
                              <div className="text-lg font-bold text-gray-900 mb-2">You're Invited!</div>
                              <div className="text-gray-600 mb-3">Join us this weekend!</div>
                              <div className="bg-white p-2 rounded mb-3">
                                <div className="text-xs text-gray-600"><strong>📅 Saturday, Dec 14th • 7:00 PM</strong></div>
                              </div>
                              {campaignData.targetUrl ? (
                                <div className="space-y-2">
                                  <button className="bg-pink-600 text-white px-4 py-2 rounded text-xs w-full font-medium">
                                    <a href={campaignData.targetUrl} className="text-white">✅ RSVP Yes</a>
                                  </button>
                                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-xs w-full">❓ Maybe Later</button>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <button className="bg-pink-600 text-white px-4 py-2 rounded text-xs w-full font-medium">✅ RSVP Yes</button>
                                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-xs w-full">❓ Maybe Later</button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Mobile Footer */}
                        <div className="mt-4 pt-2 border-t border-gray-200 text-center text-xs text-gray-500">
                          <div>© 2024 NovaMail</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                This is a preview. Choose this template to start customizing your email.
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    setSelectedTemplate(previewTemplate)
                    setShowPreview(false)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Select This Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <div className="space-y-8">
            {/* Email Style Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <SwatchIcon className="h-5 w-5 mr-2 text-blue-600" />
                Email Style Selection
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setEmailMode('simple')
                      setSelectedTemplate('')
                    }}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                      emailMode === 'simple'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">✉️</div>
                      <h4 className="font-semibold text-gray-900 mb-1">Simple Email</h4>
                      <p className="text-sm text-gray-600">
                        Quick and simple email format. Write your content freely without templates.
                      </p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setEmailMode('professional')}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                      emailMode === 'professional'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎨</div>
                      <h4 className="font-semibold text-gray-900 mb-1">Professional Templates</h4>
                      <p className="text-sm text-gray-600">
                        Choose from beautiful, professional email templates designed for conversion.
                      </p>
                    </div>
                  </button>
                </div>
                
                {/* Professional Template Styles */}
                {emailMode === 'professional' && (
                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-gray-700 mb-4">Choose Template Style:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { 
                          id: 'modern-promo', 
                          name: 'Modern Promo', 
                          icon: '🚀', 
                          desc: 'Sleek promotional design',
                          gradient: 'from-blue-50 to-purple-50',
                          accentColor: 'blue'
                        },
                        { 
                          id: 'newsletter', 
                          name: 'Newsletter',
                          icon: '📰', 
                          desc: 'Clean newsletter layout',
                          gradient: 'from-green-50 to-blue-50',
                          accentColor: 'green'
                        },
                        { 
                          id: 'ecommerce', 
                          name: 'E-commerce', 
                          icon: '🛒', 
                          desc: 'Product-focused design',
                          gradient: 'from-orange-50 to-red-50',
                          accentColor: 'orange'
                        },
                        { 
                          id: 'event', 
                          name: 'Event Invite', 
                          icon: '🎉', 
                          desc: 'Party and event themed',
                          gradient: 'from-pink-50 to-purple-50',
                          accentColor: 'pink'
                        }
                      ].map((template) => (
                        <button
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id)}
                          className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                            selectedTemplate === template.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-2">{template.icon}</div>
                          <h6 className="font-semibold text-gray-900 mb-1">{template.name}</h6>
                          <p className="text-xs text-gray-600">{template.desc}</p>
                          
                          {/* Template Preview */}
                          <div className="mt-3 border border-gray-200 rounded p-2 bg-white">
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-xs text-gray-500">{template.name} Preview:</div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setPreviewTemplate(template.id)
                                  setShowPreview(true)
                                }}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                View Full Preview
                              </button>
                            </div>
                            <div className={`h-16 bg-gradient-to-r ${template.gradient} rounded flex items-center justify-center relative overflow-hidden cursor-pointer`}>
                              <div className="absolute inset-0 bg-black bg-opacity-10 rounded"></div>
                              <div className="text-xs text-gray-600 relative z-10 font-medium">
                                {template.name}
                              </div>
                              {/* Decorative elements based on template type */}
                              {template.id === 'modern-promo' && (
                                <div className="absolute top-1 right-1 text-xs">⚡</div>
                              )}
                              {template.id === 'newsletter' && (
                                <div className="absolute bottom-1 left-1 text-xs">📄</div>
                              )}
                              {template.id === 'ecommerce' && (
                                <div className="absolute top-1 left-1 text-xs">💰</div>
                              )}
                              {template.id === 'event' && (
                                <div className="absolute bottom-1 right-1 text-xs">🎊</div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Campaign Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <PencilIcon className="h-5 w-5 mr-2 text-blue-600" />
                Campaign Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Theme *</label>
                  <input type="text" value={campaignData.name} onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })} placeholder="Enter campaign theme" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Purpose *</label>
                  <textarea value={campaignData.purpose} onChange={(e) => setCampaignData({ ...campaignData, purpose: e.target.value })} placeholder="What is the purpose of this?" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={campaignData.businessName}
                    onChange={(e) => setCampaignData({ ...campaignData, businessName: e.target.value })}
                    placeholder="Your business or company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product/Service Description
                  </label>
                  <textarea
                    value={campaignData.productService}
                    onChange={(e) => setCampaignData({ ...campaignData, productService: e.target.value })}
                    placeholder="Describe your product or service"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Website/Activity Link (Optional)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={campaignData.targetUrl}
                      onChange={(e) => setCampaignData({ ...campaignData, targetUrl: e.target.value })}
                      placeholder="https://your-website.com or https://eventbrite.com/..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500">
                      🔗 This link will be used for buttons like "Shop Now", "Learn More", "RSVP", etc. in your email templates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={
                  !campaignData.name.trim() || 
                  !campaignData.purpose.trim() ||
                  (emailMode === 'professional' && !selectedTemplate) ||
                  isGenerating
                }
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>AI is generating content...</span>
                  </>
                ) : (
                  <span>Next: Create Content</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review Generated Content */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-green-800">✨ AI Content Generated Successfully!</h3>
                  <p className="text-sm text-green-600 mt-1">Your email has been automatically generated. You can edit it below.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Email Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                  <input type="text" value={campaignData.subject} onChange={(e) => setCampaignData({ ...campaignData, subject: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Body</label>
                  <div className="space-y-4">
                    {/* 邮件内容显示和编辑 */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">邮件内容 (可编辑)</label>
                      <div className="border border-gray-300 rounded-lg bg-white min-h-[200px]">
                        <div 
                          className="p-4"
                          style={{ 
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '14px',
                            lineHeight: '1.6',
                            color: '#333',
                            textAlign: 'left'
                          }}
                          dangerouslySetInnerHTML={{ __html: campaignData.body }}
                          contentEditable={true}
                          onInput={(e) => {
                            const newContent = e.currentTarget.innerHTML
                            setCampaignData({ ...campaignData, body: newContent })
                          }}
                          suppressContentEditableWarning={true}
                        />
                      </div>
                    </div>
                    
                    {/* 隐藏的 HTML 编辑器 (用于保存) */}
                    <textarea 
                      value={campaignData.body} 
                      onChange={(e) => setCampaignData({ ...campaignData, body: e.target.value })} 
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={handleBack} className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors">← Back</button>
              <button onClick={handleNext} className="bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">Next: Review & Send</button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Send */}
        {step === 3 && (
          <div className="space-y-8">
            {/* Campaign Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Campaign Theme</div>
                  <div className="text-gray-900">{campaignData.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Email Style</div>
                  <div className="text-gray-900">
                    {emailMode === 'professional' ? 'Professional Template' : 'Simple Email'}
                    {emailMode === 'professional' && selectedTemplate && (
                      <span className="text-xs text-blue-600 ml-1">({selectedTemplate.replace('-', ' ')})</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Business Name</div>
                  <div className="text-gray-900">{campaignData.businessName || 'Not specified'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Target Link</div>
                  <div className="text-gray-900 text-sm">
                    {campaignData.targetUrl ? (
                      <a href={campaignData.targetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 break-all">
                        {campaignData.targetUrl}
                      </a>
                    ) : (
                      'No link specified'
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">Subject Line</div>
                  <div className="text-gray-900">{campaignData.subject}</div>
                </div>
              </div>
            </div>

            {/* Recipients Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Recipients</h3>
              <div className="space-y-4">
                {/* Import Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Import Recipients</label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleImportFromContacts}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <UserGroupIcon className="h-4 w-4 mr-2" />
                      From Contacts
                    </button>
                    <button
                      onClick={handleImportFromFile}
                      className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                      <CloudArrowUpIcon className="h-4 w-4 mr-2" />
                      From File
                    </button>
                  </div>
                </div>

                {/* Manual Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manual Input</label>
                  <textarea
                    value={campaignData.recipients.join(', ')}
                    onChange={(e) => {
                      const emails = e.target.value.split(',').map(email => email.trim()).filter(email => email)
                      setCampaignData({ ...campaignData, recipients: emails })
                    }}
                    placeholder="Enter email addresses separated by commas (e.g., user1@example.com, user2@example.com)"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 You can enter multiple email addresses separated by commas
                  </p>
                </div>
                
                {/* Quick Add Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quick Add</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const newEmails = [...campaignData.recipients, 'test@example.com']
                        setCampaignData({ ...campaignData, recipients: newEmails })
                      }}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      + Test Email
                    </button>
                    <button
                      onClick={() => {
                        const newEmails = [...campaignData.recipients, 'demo@novamail.com']
                        setCampaignData({ ...campaignData, recipients: newEmails })
                      }}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      + Demo Email
                    </button>
                  </div>
                </div>

                {/* Recipients List */}
                {campaignData.recipients.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipients ({campaignData.recipients.length})
                    </label>
                    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 max-h-32 overflow-y-auto">
                      <div className="flex flex-wrap gap-2">
                        {campaignData.recipients.map((email, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg"
                          >
                            {email}
                            <button
                              onClick={() => {
                                const newRecipients = campaignData.recipients.filter((_, i) => i !== index)
                                setCampaignData({ ...campaignData, recipients: newRecipients })
                              }}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button onClick={handleBack} className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors">← Back</button>
              <div className="flex space-x-4">
                <button onClick={handleSave} className="px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors">Save Draft</button>
                <button 
                  onClick={handleSend} 
                  disabled={campaignData.recipients.length === 0}
                  className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                  <span>Send to {campaignData.recipients.length} Recipients</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Import Contacts Modal */}
        {showImportContactsModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select Contacts to Import</h3>
              
              {/* Contacts List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availableContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedContacts(prev => [...prev, contact.id])
                          } else {
                            setSelectedContacts(prev => prev.filter(id => id !== contact.id))
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-600">{contact.email}</div>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {contact.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                  {selectedContacts.length} contacts selected
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => {
                      setShowImportContactsModal(false)
                      setSelectedContacts([])
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSelectedContacts}
                    disabled={selectedContacts.length === 0}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Selected ({selectedContacts.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Import File Modal */}
        {showImportFileModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Import Contacts from File</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File (CSV, TXT, Excel)
                  </label>
                  <input
                    type="file"
                    accept=".csv,.txt,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>
                
                <div className="text-sm text-gray-500">
                  <p className="font-medium mb-2">支持的文件格式：</p>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">Excel格式 (.xlsx, .xls)：</p>
                      <ul className="list-disc list-inside mt-1 ml-2">
                        <li>Email/邮箱 (必填)</li>
                        <li>Name/姓名 (可选)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">CSV格式：</p>
                      <ul className="list-disc list-inside mt-1 ml-2">
                        <li>Email/邮箱 (必填)</li>
                        <li>Name/姓名 (可选)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">TXT格式：</p>
                      <ul className="list-disc list-inside mt-1 ml-2">
                        <li>每行一个邮箱地址</li>
                        <li>或格式：姓名,邮箱</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowImportFileModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}