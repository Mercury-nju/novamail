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
import DOMPurify from 'dompurify'

export default function NewCampaignPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Static export mode: no session check
  // useEffect(() => {
  //   if (status === 'loading') {
  //     return
  //   }
  //   
  //   if (status === 'unauthenticated') {
  //     // User not logged in, redirect to login page
  //     router.push('/login')
  //     return
  //   }
  // }, [session, status, router])
  const [step, setStep] = useState(1)
  const [emailMode, setEmailMode] = useState<'simple' | 'professional'>('simple')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [previewTemplate, setPreviewTemplate] = useState<string>('')
  const [showPreview, setShowPreview] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showImportContactsModal, setShowImportContactsModal] = useState(false)
  const [showImportFileModal, setShowImportFileModal] = useState(false)
  const [toneStyle, setToneStyle] = useState<string>('friendly')
  const [campaignData, setCampaignData] = useState({
    purpose: '',
    subject: '',
    body: '',
    businessName: '',
    productService: '',
    targetUrl: '',
    recipients: [] as string[]
  })

  // Get pre-selected recipients from URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const recipients = params.get('recipients')
      if (recipients) {
        const recipientList = recipients.split(',').filter(email => email.trim())
        if (recipientList.length > 0) {
          setCampaignData(prev => ({ ...prev, recipients: recipientList }))
        }
      }
    }
  }, [])

  const progress = ((step - 1) / 2) * 100

  const generateEmailContent = async () => {
    setIsGenerating(true)
    
    try {
      // Call the real AI service
      console.log('Generating email with:', { emailMode, selectedTemplate, toneStyle, campaignData })
      
      // Add default targetUrl for preview to ensure button display
      const campaignDataWithUrl = {
        ...campaignData,
        targetUrl: campaignData.targetUrl || 'https://example.com/event'
      }
      
      const response = await fetch('https://novamail.world/api/ai/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailMode,
          selectedTemplate,
          toneStyle,
          campaignData: campaignDataWithUrl
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setCampaignData(prev => ({ 
          ...prev, 
          subject: result.subject, 
          body: result.body 
        }))
        toast.success(`AI generation completed! Using ${result.template} template`)
      } else {
        throw new Error(result.error || 'Generation failed')
      }
    } catch (error) {
      console.error('AI Generation Error:', error)
      toast.error('AI generation failed, please try again later')
      
      // Fallback to simple generation (keep existing functionality as backup)
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
      if (!campaignData.purpose.trim()) {
        toast.error('Please fill in Campaign Purpose')
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
    } else {
      // Move to campaign list if in first step
      router.push('/dashboard/campaigns')
    }
  }

  const handleSend = async () => {
    if (campaignData.recipients.length === 0) {
      toast.error('Please add at least one recipient')
      return
    }

    // 检查用户订阅等级和邮件发送限制
    const getUserPlan = () => {
      if (!mounted) return 'free'
      // 从localStorage获取用户订阅状态
      const subscriptionData = localStorage.getItem('user-subscription');
      if (subscriptionData) {
        try {
          const subscription = JSON.parse(subscriptionData);
          return subscription.status === 'active' ? subscription.plan : 'free';
        } catch (e) {
          console.log('Invalid subscription data');
        }
      }
      return 'free';
    };

    const getEmailLimit = () => {
      if (!mounted) return 1000
      const subscriptionData = localStorage.getItem('user-subscription');
      if (subscriptionData) {
        try {
          const subscription = JSON.parse(subscriptionData);
          if (subscription.status === 'active' && subscription.features) {
            return subscription.features.maxEmailsPerMonth;
          }
        } catch (e) {
          console.log('Invalid subscription data');
        }
      }
      return 1000; // 默认免费用户限制
    };

    const emailLimit = getEmailLimit();
    if (emailLimit !== -1 && campaignData.recipients.length > emailLimit) {
      toast.error(`Email limit exceeded. Your plan allows up to ${emailLimit} emails per month. Upgrade to send more.`)
      return;
    }

    // Check if user can send emails
    try {
      const response = await fetch('https://novamail.world/api/user/check-permission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send_email',
          currentCount: campaignData.recipients.length
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (!data.allowed) {
        toast.error(data.reason || 'You have reached your email sending limit. Please upgrade your plan.')
        return
      }
    } catch (error) {
      console.error('Permission check error:', error)
      toast.error('Failed to verify permissions')
      return
    }
    
    try {
      // Call email sending API
      const userId = localStorage.getItem('user-id') || localStorage.getItem('user-email') || 'default_user'
      const response = await fetch('https://novamail.world/api/campaigns/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignData,
          recipients: campaignData.recipients,
          userId: userId
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        // Update usage counter
        try {
          await fetch('https://novamail.world/api/user/update-usage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'send_email',
              increment: campaignData.recipients.length
            }),
          })
        } catch (error) {
          console.error('Failed to update usage:', error)
        }

        toast.success(`Campaign sent successfully to ${campaignData.recipients.length} recipients!`)
        router.push('/dashboard/campaigns')
      } else {
        throw new Error(result.error || 'Sending failed')
      }
    } catch (error) {
      console.error('Send campaign error:', error)
      toast.error('Email sending failed, please try again later')
    }
  }

  const handleSave = () => {
    toast.success('Campaign saved as draft!')
    router.push('/dashboard/campaigns')
  }

  const [availableContacts, setAvailableContacts] = useState<any[]>([])
  const [selectedContacts, setSelectedContacts] = useState<number[]>([])

  // Fetch real contacts from API (static export mode)
  useEffect(() => {
    // Static export mode: always fetch contacts
      fetchAvailableContacts()
  }, [])

  const fetchAvailableContacts = async () => {
    try {
      const response = await fetch('https://novamail.world/api/contacts')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      if (data.success) {
        setAvailableContacts(data.data.contacts || [])
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    }
  }

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
      toast.error('Please upload CSV, Excel or TXT format file')
      return
    }

    try {
      let emails: string[] = []

      if (isCSV) {
        // 使用Workers API处理CSV文件
        const formData = new FormData()
        formData.append('csvFile', file)

        const response = await fetch('https://novamail.world/api/contacts/import', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (data.success) {
          emails = data.data.contacts.map((contact: any) => contact.email)
          toast.success(`Successfully imported ${emails.length} contacts from CSV`)
        } else {
          toast.error(data.message || 'Failed to import contacts')
          return
        }
      } else if (isExcel) {
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
        toast.error('No valid email addresses found in file')
      }
    } catch (error) {
      console.error('File processing error:', error)
      toast.error('File processing failed, please check file format')
    }
  }

  const parseFileContent = (content: string, fileName: string): string[] => {
    const emails: string[] = []
    if (!content || content.trim().length === 0) {
      return emails
    }
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
      if (lines.length === 0) {
        return emails
      }
      const [header, ...dataLines] = lines
      if (!header) {
        return emails
      }
      const headers = header.split(',').map(h => h.trim().toLowerCase())
      const emailIndex = headers.findIndex(h => h.includes('email') || h.toLowerCase().includes('mail'))

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
          const emailIndex = headers.findIndex(h => h.includes('email') || h.toLowerCase().includes('mail'))

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
                {previewTemplate === 'announcement' && 'Announcement Template Preview'}
                {previewTemplate === 'welcome' && 'Welcome Template Preview'}
                {previewTemplate === 'survey' && 'Survey Template Preview'}
                {previewTemplate === 'thank-you' && 'Thank You Template Preview'}
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
                          {previewTemplate === 'announcement' && '📢 Important Announcement from Our Team'}
                          {previewTemplate === 'welcome' && '👋 Welcome to Our Community!'}
                          {previewTemplate === 'survey' && '📊 Your Opinion Matters - Quick Survey'}
                          {previewTemplate === 'thank-you' && '🙏 Thank You for Your Support'}
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
                        
                        {previewTemplate === 'announcement' && (
                          <div className="space-y-4 text-sm text-gray-700">
                            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg text-center">
                              <h2 className="text-lg font-bold text-gray-900 mb-2">📢 Important Announcement</h2>
                              <p className="text-gray-600 mb-3">We have exciting news to share with you</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-700 mb-3">This is an important update that affects our community and services.</p>
                              {campaignData.targetUrl && (
                                <div className="text-center">
                                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
                                    Learn More
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {previewTemplate === 'welcome' && (
                          <div className="space-y-4 text-sm text-gray-700">
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg text-center">
                              <h2 className="text-lg font-bold text-gray-900 mb-2">👋 Welcome to Our Community</h2>
                              <p className="text-gray-600 mb-3">We're thrilled to have you join us</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-700 mb-3">Thank you for becoming part of our amazing community. We're here to help you succeed!</p>
                              {campaignData.targetUrl && (
                                <div className="text-center">
                                  <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
                                    Get Started
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {previewTemplate === 'survey' && (
                          <div className="space-y-4 text-sm text-gray-700">
                            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg text-center">
                              <h2 className="text-lg font-bold text-gray-900 mb-2">📊 Your Opinion Matters</h2>
                              <p className="text-gray-600 mb-3">Help us improve by sharing your feedback</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-700 mb-3">We value your input and would love to hear your thoughts on our services.</p>
                              {campaignData.targetUrl && (
                                <div className="text-center">
                                  <button className="bg-teal-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
                                    Take Survey
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {previewTemplate === 'thank-you' && (
                          <div className="space-y-4 text-sm text-gray-700">
                            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-lg text-center">
                              <h2 className="text-lg font-bold text-gray-900 mb-2">🙏 Thank You</h2>
                              <p className="text-gray-600 mb-3">We appreciate your support and trust</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-700 mb-3">Your support means the world to us. We're grateful for your continued partnership.</p>
                              {campaignData.targetUrl && (
                                <div className="text-center">
                                  <button className="bg-rose-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
                                    Continue
                                  </button>
                                </div>
                              )}
                            </div>
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
                          {previewTemplate === 'announcement' && '📢 Important Announcement from Our Team'}
                          {previewTemplate === 'welcome' && '👋 Welcome to Our Community!'}
                          {previewTemplate === 'survey' && '📊 Your Opinion Matters - Quick Survey'}
                          {previewTemplate === 'thank-you' && '🙏 Thank You for Your Support'}
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
                        
                        {previewTemplate === 'announcement' && (
                          <div className="space-y-3">
                            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded text-center">
                              <div className="text-2xl mb-3">📢</div>
                              <div className="text-lg font-bold text-gray-900 mb-2">Important Update</div>
                              <div className="text-gray-600 mb-3">We have exciting news to share!</div>
                            </div>
                            <div className="bg-white border border-indigo-200 rounded p-3">
                              <div className="text-xs text-gray-600 mb-2">📋 Announcement Details:</div>
                              <div className="text-xs text-gray-700">• New features coming soon</div>
                              <div className="text-xs text-gray-700">• System maintenance scheduled</div>
                              <div className="text-xs text-gray-700">• Important policy updates</div>
                            </div>
                            {campaignData.targetUrl && (
                              <button className="bg-indigo-600 text-white px-4 py-2 rounded text-xs w-full font-medium">
                                <a href={campaignData.targetUrl} className="text-white">📖 Read Full Announcement</a>
                              </button>
                            )}
                          </div>
                        )}
                        
                        {previewTemplate === 'welcome' && (
                          <div className="space-y-3">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded text-center">
                              <div className="text-2xl mb-3">👋</div>
                              <div className="text-lg font-bold text-gray-900 mb-2">Welcome Aboard!</div>
                              <div className="text-gray-600 mb-3">We're thrilled to have you join us!</div>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white border border-green-200 rounded p-3">
                                <div className="text-xs text-gray-600 mb-2">🎯 Getting Started:</div>
                                <div className="text-xs text-gray-700">• Complete your profile</div>
                                <div className="text-xs text-gray-700">• Explore our features</div>
                                <div className="text-xs text-gray-700">• Join our community</div>
                              </div>
                              {campaignData.targetUrl && (
                                <button className="bg-green-600 text-white px-4 py-2 rounded text-xs w-full font-medium">
                                  <a href={campaignData.targetUrl} className="text-white">🚀 Get Started</a>
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {previewTemplate === 'survey' && (
                          <div className="space-y-3">
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded text-center">
                              <div className="text-2xl mb-3">📊</div>
                              <div className="text-lg font-bold text-gray-900 mb-2">Quick Survey</div>
                              <div className="text-gray-600 mb-3">Your feedback helps us improve!</div>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white border border-yellow-200 rounded p-3">
                                <div className="text-xs text-gray-600 mb-2">📝 Survey Topics:</div>
                                <div className="text-xs text-gray-700">• Product satisfaction</div>
                                <div className="text-xs text-gray-700">• Service quality</div>
                                <div className="text-xs text-gray-700">• Future improvements</div>
                              </div>
                              <div className="text-xs text-gray-500 text-center">⏱️ Takes only 2 minutes</div>
                              {campaignData.targetUrl && (
                                <button className="bg-yellow-600 text-white px-4 py-2 rounded text-xs w-full font-medium">
                                  <a href={campaignData.targetUrl} className="text-white">📋 Take Survey</a>
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {previewTemplate === 'thank-you' && (
                          <div className="space-y-3">
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded text-center">
                              <div className="text-2xl mb-3">🙏</div>
                              <div className="text-lg font-bold text-gray-900 mb-2">Thank You!</div>
                              <div className="text-gray-600 mb-3">We appreciate your support!</div>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white border border-purple-200 rounded p-3">
                                <div className="text-xs text-gray-600 mb-2">💝 What's Next:</div>
                                <div className="text-xs text-gray-700">• Your order is being processed</div>
                                <div className="text-xs text-gray-700">• You'll receive updates soon</div>
                                <div className="text-xs text-gray-700">• Thank you for choosing us</div>
                              </div>
                              {campaignData.targetUrl && (
                                <button className="bg-purple-600 text-white px-4 py-2 rounded text-xs w-full font-medium">
                                  <a href={campaignData.targetUrl} className="text-white">📦 Track Order</a>
                                </button>
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
                  <div className="mt-8">
                    <div className="text-center mb-8">
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">Choose Template Style</h5>
                      <p className="text-sm text-gray-600">Select from our professional email templates</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        },
                        { 
                          id: 'announcement', 
                          name: 'Announcement', 
                          icon: '📢', 
                          desc: 'Formal announcement style',
                          gradient: 'from-indigo-50 to-blue-50',
                          accentColor: 'indigo'
                        },
                        { 
                          id: 'welcome', 
                          name: 'Welcome', 
                          icon: '👋', 
                          desc: 'Warm welcome message',
                          gradient: 'from-yellow-50 to-orange-50',
                          accentColor: 'yellow'
                        },
                        { 
                          id: 'survey', 
                          name: 'Survey', 
                          icon: '📊', 
                          desc: 'Feedback collection',
                          gradient: 'from-teal-50 to-cyan-50',
                          accentColor: 'teal'
                        },
                        { 
                          id: 'thank-you', 
                          name: 'Thank You', 
                          icon: '🙏', 
                          desc: 'Gratitude and appreciation',
                          gradient: 'from-rose-50 to-pink-50',
                          accentColor: 'rose'
                        }
                      ].map((template) => (
                        <button
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id)}
                          className={`p-6 border-2 rounded-xl text-center transition-all duration-200 hover:shadow-md ${
                            selectedTemplate === template.id
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="text-3xl mb-3">{template.icon}</div>
                          <h6 className="font-semibold text-gray-900 mb-2 text-sm">{template.name}</h6>
                          <p className="text-xs text-gray-600 leading-relaxed">{template.desc}</p>
                          
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

            {/* Tone Style Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <SwatchIcon className="h-5 w-5 mr-2 text-blue-600" />
                Tone Style Selection
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">Choose the tone and style for your email content:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      id: 'friendly', 
                      name: 'Friendly', 
                      icon: '😊', 
                      desc: 'Warm and approachable tone',
                      color: 'from-green-50 to-blue-50',
                      borderColor: 'border-green-200'
                    },
                    { 
                      id: 'professional', 
                      name: 'Professional', 
                      icon: '💼', 
                      desc: 'Formal and business-like',
                      color: 'from-blue-50 to-indigo-50',
                      borderColor: 'border-blue-200'
                    },
                    { 
                      id: 'casual', 
                      name: 'Casual', 
                      icon: '😎', 
                      desc: 'Relaxed and informal',
                      color: 'from-yellow-50 to-orange-50',
                      borderColor: 'border-yellow-200'
                    },
                    { 
                      id: 'enthusiastic', 
                      name: 'Enthusiastic', 
                      icon: '🚀', 
                      desc: 'Energetic and exciting',
                      color: 'from-red-50 to-pink-50',
                      borderColor: 'border-red-200'
                    },
                    { 
                      id: 'persuasive', 
                      name: 'Persuasive', 
                      icon: '💡', 
                      desc: 'Convincing and compelling',
                      color: 'from-purple-50 to-indigo-50',
                      borderColor: 'border-purple-200'
                    },
                    { 
                      id: 'informative', 
                      name: 'Informative', 
                      icon: '📚', 
                      desc: 'Clear and educational',
                      color: 'from-gray-50 to-slate-50',
                      borderColor: 'border-gray-200'
                    }
                  ].map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setToneStyle(tone.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                        toneStyle === tone.id
                          ? 'border-blue-500 bg-blue-50'
                          : `border-gray-200 hover:${tone.borderColor}`
                      }`}
                    >
                      <div className="text-2xl mb-2">{tone.icon}</div>
                      <h6 className="font-semibold text-gray-900 mb-1">{tone.name}</h6>
                      <p className="text-xs text-gray-600">{tone.desc}</p>
                    </button>
                  ))}
                </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Purpose *</label>
                  <textarea value={campaignData.purpose} onChange={(e) => setCampaignData({ ...campaignData, purpose: e.target.value })} placeholder="What is the purpose of this campaign? Describe what you want to achieve." rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
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
                    {/* Email content display and editing */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Email Content (Editable)</label>
                      
                      {/* Editing Toolbar */}
                      <div className="border border-gray-300 rounded-t-lg bg-gray-100 p-3 flex items-center space-x-2">
                        <button
                          onClick={() => {
                            const selection = window.getSelection()
                            if (selection && selection.rangeCount > 0) {
                              document.execCommand('bold')
                            }
                          }}
                          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          title="Bold"
                        >
                          <strong>B</strong>
                        </button>
                        <button
                          onClick={() => {
                            const selection = window.getSelection()
                            if (selection && selection.rangeCount > 0) {
                              document.execCommand('italic')
                            }
                          }}
                          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          title="Italic"
                        >
                          <em>I</em>
                        </button>
                        <button
                          onClick={() => {
                            const selection = window.getSelection()
                            if (selection && selection.rangeCount > 0) {
                              document.execCommand('underline')
                            }
                          }}
                          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          title="Underline"
                        >
                          <u>U</u>
                        </button>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <button
                          onClick={() => {
                            const selection = window.getSelection()
                            if (selection && selection.rangeCount > 0) {
                              document.execCommand('justifyLeft')
                            }
                          }}
                          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          title="Align Left"
                        >
                          ⬅️
                        </button>
                        <button
                          onClick={() => {
                            const selection = window.getSelection()
                            if (selection && selection.rangeCount > 0) {
                              document.execCommand('justifyCenter')
                            }
                          }}
                          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          title="Align Center"
                        >
                          ↔️
                        </button>
                        <button
                          onClick={() => {
                            const selection = window.getSelection()
                            if (selection && selection.rangeCount > 0) {
                              document.execCommand('justifyRight')
                            }
                          }}
                          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          title="Align Right"
                        >
                          ➡️
                        </button>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <button
                          onClick={() => {
                            const selection = window.getSelection()
                            if (selection && selection.rangeCount > 0) {
                              document.execCommand('insertUnorderedList')
                            }
                          }}
                          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          title="Bullet List"
                        >
                          • List
                        </button>
                        <button
                          onClick={() => {
                            const selection = window.getSelection()
                            if (selection && selection.rangeCount > 0) {
                              document.execCommand('insertOrderedList')
                            }
                          }}
                          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          title="Numbered List"
                        >
                          1. List
                        </button>
                        <div className="flex-1"></div>
                        <button
                          onClick={() => {
                            const newContent = prompt('Enter HTML content:', campaignData.body)
                            if (newContent !== null) {
                              setCampaignData({ ...campaignData, body: newContent })
                            }
                          }}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          HTML Editor
                        </button>
                      </div>
                      
                      {/* Email client simulation interface */}
                      <div className="border-l border-r border-b border-gray-300 rounded-b-lg bg-gray-50 p-4">
                        {/* Email client header */}
                        <div className="bg-white border-b border-gray-200 p-3 rounded-t-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">G</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">Gmail</div>
                                <div className="text-xs text-gray-500">Email Editor</div>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Email content area */}
                        <div className="bg-white border-x border-b border-gray-200 rounded-b-lg min-h-[400px] overflow-auto">
                          <div 
                            id="email-editor"
                            className="w-full"
                            style={{ 
                              fontFamily: 'Arial, sans-serif',
                              fontSize: '14px',
                              lineHeight: '1.6',
                              color: '#333',
                              textAlign: 'left',
                              minHeight: '400px',
                              padding: '20px',
                              margin: '0',
                              outline: 'none'
                            }}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(campaignData.body) }}
                            contentEditable={true}
                            onInput={(e) => {
                              const newContent = e.currentTarget.innerHTML
                              setCampaignData({ ...campaignData, body: newContent })
                            }}
                            onKeyDown={(e) => {
                              // Handle keyboard shortcuts
                              if (e.ctrlKey || e.metaKey) {
                                switch (e.key) {
                                  case 'b':
                                    e.preventDefault()
                                    document.execCommand('bold')
                                    break
                                  case 'i':
                                    e.preventDefault()
                                    document.execCommand('italic')
                                    break
                                  case 'u':
                                    e.preventDefault()
                                    document.execCommand('underline')
                                    break
                                }
                              }
                            }}
                            suppressContentEditableWarning={true}
                          />
                        </div>
                      </div>
                      
                      {/* Editing Tips */}
                      <div className="mt-2 text-xs text-gray-500">
                        💡 <strong>Editing Tips:</strong> Use Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline. 
                        Click and drag to select text, then use the toolbar buttons above.
                      </div>
                    </div>
                    
                    {/* Hidden HTML editor (for saving) */}
                    <textarea 
                      value={campaignData.body} 
                      onChange={(e) => setCampaignData({ ...campaignData, body: e.target.value })} 
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Preview Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📱</span>
                Email Preview (Web & Mobile)
              </h3>
              
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
                        <div className="font-medium text-gray-900">{campaignData.subject}</div>
                      </div>
                      
                      {/* Email Body Preview */}
                      <div className="p-6">
                        <div 
                          className="w-full"
                          style={{ 
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '14px',
                            lineHeight: '1.6',
                            color: '#333',
                            textAlign: 'left'
                          }}
                          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(campaignData.body) }}
                        />
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
                        <div className="text-xs text-gray-500 mb-1">From: {campaignData.businessName || 'NovaMail'} &lt;noreply@novamail.com&gt;</div>
                        <div className="text-xs text-gray-500 mb-2">Subject:</div>
                        <div className="text-xs font-medium text-gray-900 leading-tight">{campaignData.subject}</div>
                      </div>
                      
                      {/* Mobile Email Body */}
                      <div className="p-3 text-xs text-gray-700 overflow-y-auto h-[300px]">
                        <div 
                          className="w-full"
                          style={{ 
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '12px',
                            lineHeight: '1.4',
                            color: '#333',
                            textAlign: 'left'
                          }}
                          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(campaignData.body) }}
                        />
                      </div>
                    </div>
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
                  <div className="text-sm font-medium text-gray-700 mb-2">Tone Style</div>
                  <div className="text-gray-900 capitalize">{toneStyle}</div>
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
                        const newEmails = [...campaignData.recipients, 'your-email@example.com']
                        setCampaignData({ ...campaignData, recipients: newEmails })
                      }}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      + Your Email
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
                  <p className="font-medium mb-2">Supported file formats:</p>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">Excel format (.xlsx, .xls):</p>
                      <ul className="list-disc list-inside mt-1 ml-2">
                        <li>Email (required)</li>
                        <li>Name (optional)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">CSV format:</p>
                      <ul className="list-disc list-inside mt-1 ml-2">
                        <li>Email (required)</li>
                        <li>Name (optional)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">TXT format:</p>
                      <ul className="list-disc list-inside mt-1 ml-2">
                        <li>One email address per line</li>
                        <li>Or format: Name,Email</li>
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