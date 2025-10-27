'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Send, Sparkles, Check, X, Zap, AlertTriangle, Download, Share, Clipboard } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { professionalTemplates, type ProfessionalTemplate } from '@/lib/templates'
import CreditsDisplay from '@/components/CreditsDisplay'

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
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // 从URL参数获取模板ID
  const templateId = searchParams.get('template') || 'modern-gradient'
  
  // 简单的状态管理
  const [campaignData, setCampaignData] = useState({
    subject: '',
    body: ''
  })
  
  const [chatInput, setChatInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  
  // 邮件发送状态
  const [isSending, setIsSending] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [selectedESP, setSelectedESP] = useState('')
  const [sendForm, setSendForm] = useState({
    recipients: '',
    senderName: 'NovaMail'
  })
  
  // 批量收件人管理
  const [recipientList, setRecipientList] = useState<string[]>([])
  const [showRecipientManager, setShowRecipientManager] = useState(false)
  const [importMethod, setImportMethod] = useState<'manual' | 'csv' | 'contacts'>('manual')
  
  // 积分和订阅状态
  const [userCredits, setUserCredits] = useState({
    remainingCredits: 50,
    totalCredits: 50,
    subscriptionType: 'free',
    aiAccess: false
  })
  const [showCreditsModal, setShowCreditsModal] = useState(false)
  
  // 移除无意义的域名功能
  // const [useUserDomain, setUseUserDomain] = useState(false)
  // const [userDomains, setUserDomains] = useState<any[]>([])
  // const [userEmailAliases, setUserEmailAliases] = useState<Array<{
  //   email: string
  //   domain: string
  //   label: string
  // }>>([])
  
  
  // 根据模板ID获取当前模板
  const currentTemplate = professionalTemplates.find(template => template.id === templateId) || professionalTemplates[0]
  
  // 初始化模板内容
  useEffect(() => {
    console.log('=== 模板初始化调试 ===')
    console.log('currentTemplate:', currentTemplate)
    console.log('campaignData.body:', campaignData.body)
    console.log('campaignData.body length:', campaignData.body?.length)
    console.log('========================')
    
    if (currentTemplate && currentTemplate.htmlContent && (!campaignData.body || campaignData.body.trim() === '')) {
      console.log('设置模板内容...')
      setCampaignData(prev => ({
        ...prev,
        subject: currentTemplate.subject,
        body: currentTemplate.htmlContent
      }))
    }
    
    // 获取用户积分信息
    fetchUserCredits()
  }, [currentTemplate])
  
  // 模板保存功能
  const handleSaveTemplate = () => {
    const templateData = {
      name: currentTemplate.name,
      category: currentTemplate.category,
      subject: campaignData.subject || currentTemplate.subject,
      htmlContent: campaignData.body || currentTemplate.htmlContent,
      features: currentTemplate.features,
      savedAt: new Date().toISOString(),
      customizations: {
        subject: campaignData.subject,
        body: campaignData.body
      }
    }

    // Create downloadable file
    const dataStr = JSON.stringify(templateData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    // Create download link
    const link = document.createElement('a')
    link.href = url
    link.download = `${currentTemplate.name.replace(/\s+/g, '_')}_template.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success(`Template "${currentTemplate.name}" saved successfully!`)
  }

  const handleCopyHTML = () => {
    const htmlContent = campaignData.body || currentTemplate.htmlContent
    navigator.clipboard.writeText(htmlContent)
    toast.success('HTML code copied to clipboard!')
  }

  const handleCopySubject = () => {
    const subject = campaignData.subject || currentTemplate.subject
    navigator.clipboard.writeText(subject)
    toast.success('Subject line copied to clipboard!')
  }

  const handleDownloadHTML = () => {
    const htmlContent = campaignData.body || currentTemplate.htmlContent
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `${currentTemplate.name.replace(/\s+/g, '_')}_template.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    toast.success('HTML file downloaded successfully!')
    setShowSaveModal(false)
  }

  const handleCopySourceCode = () => {
    const htmlContent = campaignData.body || currentTemplate.htmlContent
    navigator.clipboard.writeText(htmlContent)
    toast.success('HTML source code copied to clipboard!')
    setShowSaveModal(false)
  }

  const handleExportToESP = async () => {
    if (!selectedESP) {
      toast.error('Please select an ESP to export to')
      return
    }

    setIsExporting(true)
    
    try {
      const userEmail = localStorage.getItem('user-email') || sessionStorage.getItem('user-email') || localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
      
      if (!userEmail) {
        toast.error('User email not found. Please log in again.')
        setIsExporting(false)
        return
      }

      const htmlContent = campaignData.body || currentTemplate.htmlContent || '<p>Template content</p>'
      const templateName = currentTemplate.name
      const templateSubject = campaignData.subject || currentTemplate.subject
      
      console.log('=== Export Request Debug ===')
      console.log('ESP:', selectedESP)
      console.log('Template Name:', templateName)
      console.log('User Email:', userEmail)
      console.log('HTML Length:', htmlContent.length)
      console.log('Subject:', templateSubject)
      
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          esp: selectedESP,
          name: templateName,
          html: htmlContent,
          subject: templateSubject,
          userEmail: userEmail
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      console.log('Export response:', result)

      if (result.success) {
        toast.success(`Template exported to ${selectedESP} successfully!`)
        
        // 显示成功消息和跳转按钮
        const shouldOpenEditor = confirm(
          `Template "${result.template_name}" has been exported to ${selectedESP} successfully!\n\nWould you like to open the editor in ${selectedESP}?`
        )
        
        if (shouldOpenEditor && result.edit_url) {
          window.open(result.edit_url, '_blank')
        }
        
        setShowExportModal(false)
        setSelectedESP('')
      } else {
        console.error('Export failed:', result.error)
        // 处理不同类型的错误
        if (result.error === 'token_expired') {
          toast.error('Mailchimp authorization expired. Please reconnect your account.')
          // 显示重新连接按钮
          if (selectedESP === 'mailchimp') {
            setTimeout(() => {
              handleMailchimpConnect()
            }, 2000)
          }
        } else if (result.error.includes('未授权') || result.error.includes('not connected') || result.error.includes('connect your Mailchimp account')) {
          toast.error('Please connect your Mailchimp account first. Click "Connect Mailchimp" to authorize.')
          if (selectedESP === 'mailchimp') {
            // 自动提示用户连接
            setTimeout(() => {
              if (confirm('Would you like to connect your Mailchimp account now?')) {
                handleMailchimpConnect()
              }
            }, 1500)
          }
        } else if (result.error.includes('configuration is incomplete')) {
          toast.error(`${selectedESP} is not properly configured. Please contact support.`)
        } else if (result.error.includes('not supported')) {
          toast.error(`${selectedESP} template feature is not supported. Please try another ESP.`)
        } else {
          toast.error(`Export failed: ${result.error}`)
        }
      }
    } catch (error) {
      console.error('Export error:', error)
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        toast.error('Network error. Please check your connection and try again.')
      } else {
        toast.error('Failed to export template. Please try again.')
      }
    } finally {
      setIsExporting(false)
    }
  }

  const handleMailchimpConnect = async () => {
    try {
      const userEmail = localStorage.getItem('user-email') || sessionStorage.getItem('user-email') || localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
      
      if (!userEmail) {
        toast.error('User email not found. Please log in again.')
        return
      }
      
      const response = await fetch('/api/mailchimp/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userEmail
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        // 打开Mailchimp授权页面
        const authWindow = window.open(result.auth_url, '_blank', 'width=600,height=600')
        
        if (!authWindow) {
          toast.error('Please allow popups to complete Mailchimp authorization')
          return
        }
        
        // 提示用户完成授权后返回
        toast.success('Please complete Mailchimp authorization in the new window')
        
        // 监听窗口关闭事件
        const checkClosed = setInterval(() => {
          if (authWindow.closed) {
            clearInterval(checkClosed)
            toast.success('Authorization window closed. You can now try exporting to Mailchimp.')
          }
        }, 1000)
        
      } else {
        toast.error(`Failed to connect Mailchimp: ${result.error}`)
      }
    } catch (error) {
      console.error('Mailchimp connect error:', error)
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        toast.error('Network error. Please check your connection and try again.')
      } else {
        toast.error('Failed to connect Mailchimp. Please try again.')
      }
    }
  }

  // 获取用户积分信息
  const fetchUserCredits = async () => {
    try {
      const response = await fetch('/api/credits')
      const data = await response.json()
      
      if (data.success) {
        setUserCredits({
          remainingCredits: data.data.remainingCredits,
          totalCredits: data.data.totalCredits,
          subscriptionType: data.data.subscriptionType,
          aiAccess: data.data.aiAccess
        })
      }
    } catch (error) {
      console.error('Failed to fetch user credits:', error)
    }
  }

  // 批量收件人管理功能
  const addRecipients = (emails: string[]) => {
    const validEmails = emails.filter(email => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email.trim())
    })
    
    setRecipientList(prev => {
      const newList = [...prev, ...validEmails]
      return [...new Set(newList)] // 去重
    })
    
    // 更新发送表单
    setSendForm(prev => ({
      ...prev,
      recipients: [...new Set([...prev.recipients.split(',').filter(e => e.trim()), ...validEmails])].join(', ')
    }))
  }
  
  const removeRecipient = (email: string) => {
    setRecipientList(prev => prev.filter(e => e !== email))
    setSendForm(prev => ({
      ...prev,
      recipients: prev.recipients.split(',').filter(e => e.trim() !== email).join(', ')
    }))
  }
  
  const clearAllRecipients = () => {
    setRecipientList([])
    setSendForm(prev => ({ ...prev, recipients: '' }))
  }
  
  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const emails = text.split('\n')
        .map(line => line.split(',')[0].trim()) // 取第一列作为邮箱
        .filter(email => email && email.includes('@'))
      
      addRecipients(emails)
      toast.success(`Imported ${emails.length} email addresses`)
    }
    reader.readAsText(file)
  }

  // 简化：移除复杂的邮箱配置加载
  // useEffect(() => {
  //   const loadEmailConfig = () => {
  //     try {
  //       const savedConfig = localStorage.getItem('emailDomainConfig')
  //       if (savedConfig) {
  //         const config = JSON.parse(savedConfig)
  //         setUserDomains([{ domain: config.domain, status: 'configured' }])
  //         
  //         // 生成邮箱别名选项
  //         const aliases = config.prefixes.map((prefix: string) => ({
  //           email: `${prefix}@${config.domain}`,
  //           domain: config.domain,
  //           label: `${prefix}@${config.domain}`
  //         }))
  //         setUserEmailAliases(aliases)
  //         
  //         // 设置默认发件人邮箱
  //         if (config.selectedPrefix && config.domain) {
  //           setSendForm(prev => ({
  //             ...prev,
  //             senderEmail: `${config.selectedPrefix}@${config.domain}`
  //           }))
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Failed to load email config:', error)
  //     }
  //   }

  //   loadEmailConfig()
  // }, [])
  
  // 专业模板内容 - 使用当前模板
  const templateContent = currentTemplate.htmlContent

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


  // AI对话功能 - 专注于对话交互，不同步到邮件内容

  // 处理聊天提交
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || isGenerating) return

    // 检查AI访问权限
    if (!userCredits.aiAccess) {
      toast.error('AI Assistant is only available for Premium users. Please upgrade to continue.')
      return
    }

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
      // 智能API路由选择 - 生产环境兼容
      const apiUrl = typeof window !== 'undefined' && window.location.hostname.includes('novamail.world')
        ? '/api/ai/generate-email'  // 生产环境也使用本地API（通过Cloudflare Pages Functions）
        : '/api/ai/generate-email'  // 开发环境
      
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
      
                if (data.success && data.message) {
                  // 添加AI对话响应
                  setChatHistory(prev => [...prev, {
                    type: 'ai',
                    message: data.message,
                    timestamp: new Date()
                  }])
                  toast.success('✨ AI responded successfully!')
                } else {
                  throw new Error('Invalid API response format')
                }

    } catch (error: any) {
      console.error('❌ Error generating content:', error)
      console.error('❌ Error details:', error?.message || 'Unknown error')
      console.error('❌ Error stack:', error?.stack || 'No stack trace')
      
      setChatHistory(prev => [...prev, {
        type: 'ai',
        message: `Sorry, I encountered an error: ${error?.message || 'Unknown error'}. Please try again.`,
        timestamp: new Date()
      }])
      toast.error(`Failed to generate content: ${error?.message || 'Unknown error'}`)
    } finally {
      setIsGenerating(false)
    }
  }

  // 处理邮件发送
  const handleSendEmail = async () => {
    console.log('=== 发送邮件调试信息 ===')
    console.log('sendForm.recipients:', sendForm.recipients)
    console.log('sendForm.senderName:', sendForm.senderName)
    console.log('campaignData.subject:', campaignData.subject)
    console.log('campaignData.body:', campaignData.body)
    console.log('campaignData.body length:', campaignData.body?.length)
    console.log('=== 调试信息 ===')
    console.log('campaignData:', campaignData)
    console.log('========================')
    
    // 积分检查 - 每次发送邮件消耗5个积分
    const emailCost = 5
    const totalRecipients = [
      ...sendForm.recipients.split(',').map(email => email.trim()).filter(e => e),
      ...recipientList
    ].length
    
    if (userCredits.subscriptionType === 'free' && userCredits.remainingCredits < emailCost) {
      toast.error(`Insufficient credits! You need ${emailCost} credits to send an email. You have ${userCredits.remainingCredits} credits remaining.`)
      setShowCreditsModal(true)
      return
    }
    
    console.log(`📧 准备发送邮件，消耗 ${emailCost} 个积分，收件人数量: ${totalRecipients}`)
    
    // 🔧 彻底修复：确保所有字段都有值，使用强制默认值
    const finalSubject = campaignData.subject || currentTemplate?.subject || 'Welcome to NovaMail'
    const finalBody = campaignData.body || currentTemplate?.htmlContent || '<p>Thank you for using NovaMail!</p>'
    const finalSenderName = sendForm.senderName || 'NovaMail'
    
    console.log('=== 强制修复后的数据 ===')
    console.log('finalSubject:', finalSubject)
    console.log('finalBody length:', finalBody?.length)
    console.log('finalSenderName:', finalSenderName)
    console.log('recipients:', sendForm.recipients)
    console.log('==================')
    
    // 验证收件人
    if (!sendForm.recipients || sendForm.recipients.trim() === '') {
      console.log('❌ 错误: 缺少收件人')
      toast.error('Please fill in recipients')
      return
    }

    // 验证邮箱格式 - 支持批量收件人
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const allRecipients = [
      ...sendForm.recipients.split(',').map(email => email.trim()).filter(e => e),
      ...recipientList
    ]
    const uniqueRecipients = [...new Set(allRecipients)]
    const invalidEmails = uniqueRecipients.filter(email => !emailRegex.test(email))
    
    if (invalidEmails.length > 0) {
      toast.error(`Invalid email addresses: ${invalidEmails.join(', ')}`)
      return
    }

    if (uniqueRecipients.length === 0) {
      toast.error('Please add at least one recipient')
      return
    }


    setIsSending(true)
    try {
            // 🔧 彻底修复：使用强制默认值，确保所有字段都有值
            const requestData = {
              campaignData: {
                subject: finalSubject,
                body: finalBody
              },
              recipients: uniqueRecipients,
              senderEmail: 'noreply@novamail.world',
              senderName: finalSenderName,
            }
      
      console.log('=== 发送到后端的数据 ===')
      console.log('requestData:', JSON.stringify(requestData, null, 2))
      console.log('========================')
      
      const response = await fetch('/api/campaigns/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      const responseData = await response.json()

      console.log('=== 后端响应 ===')
      console.log('Response Status:', response.status)
      console.log('Response Data:', JSON.stringify(responseData, null, 2))
      console.log('================')

      if (responseData.success) {
        toast.success(`Email sent successfully to ${responseData.data?.recipients || uniqueRecipients.length} recipient(s)!`)
        
        // 保存campaign数据到后端
        try {
          const userEmail = localStorage.getItem('user-email') || sessionStorage.getItem('user-email') || localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail')
          if (userEmail) {
            const campaignData = {
              id: `campaign_${Date.now()}`,
              subject: finalSubject,
              body: finalBody,
              recipients: uniqueRecipients.length,
              status: 'sent',
              createdAt: new Date().toISOString(),
              sentAt: new Date().toISOString(),
              templateId: currentTemplate?.id,
              templateName: currentTemplate?.name,
              // 模拟一些统计数据（实际应该从邮件服务提供商获取）
              openRate: Math.random() * 30 + 15, // 15-45% 打开率
              clickRate: Math.random() * 10 + 5  // 5-15% 点击率
            }
            
            const saveResponse = await fetch('/api/campaigns/save', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userEmail,
                campaignData
              })
            })
            
            if (saveResponse.ok) {
              console.log('Campaign data saved successfully')
            } else {
              console.error('Failed to save campaign data')
            }
          }
        } catch (error) {
          console.error('Error saving campaign data:', error)
        }
        
        setShowSendModal(false)
        setSendForm({
          recipients: '',
          senderName: 'NovaMail'
        })
        setRecipientList([]) // 清空收件人列表
        
        // 更新积分状态
        if (userCredits.subscriptionType === 'free') {
          setUserCredits(prev => ({
            ...prev,
            remainingCredits: Math.max(0, prev.remainingCredits - emailCost)
          }))
        }
        
        // 刷新积分信息
        fetchUserCredits()
      } else {
        // 使用后端返回的错误信息，如果后端没有提供，则使用通用错误信息
        throw new Error(responseData.error || 'Failed to send email')
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
            <div className="flex items-center gap-4">
              
              {/* 积分显示 */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  {userCredits.subscriptionType === 'premium' ? '∞' : userCredits.remainingCredits}
                </span>
                <span className="text-xs text-gray-500">credits</span>
              </div>
              
              {/* Template Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                  title="Save Template"
                >
                  <Download className="w-4 h-4" />
                  Save Template
                </button>
              </div>
              
              <button
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Export to ESP
              </button>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - AI Assistant & Template Actions */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* AI Assistant Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
                <p className="text-sm text-gray-500">Chat with AI for email marketing advice and content ideas</p>
              </div>
              {!userCredits.aiAccess && (
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded-full">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  <span className="text-xs font-medium text-purple-600">Premium</span>
                </div>
              )}
            </div>
          </div>

          {/* AI Hints */}
          <div className="p-4 border-b border-gray-200">
            {userCredits.aiAccess ? (
              <>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Start:</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setChatInput('How to write better email subject lines?')}
                    className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-600 transition-colors"
                  >
                    💡 Email Subject Lines
                  </button>
                  <button
                    onClick={() => setChatInput('What are the best email marketing strategies?')}
                    className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-600 transition-colors"
                  >
                    📊 Marketing Strategies
                  </button>
                  <button
                    onClick={() => setChatInput('How to increase email open rates?')}
                    className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-600 transition-colors"
                  >
                    🎯 Open Rate Tips
                  </button>
                  <button
                    onClick={() => setChatInput('Give me email content ideas for my business')}
                    className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-600 transition-colors"
                  >
                    📝 Content Ideas
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-purple-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Get personalized email marketing advice and content suggestions
                </p>
                <button
                  onClick={() => window.open('/pricing', '_blank')}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                >
                  Upgrade to Premium
                </button>
              </div>
            )}
          </div>

          {/* Chat History */}
          {userCredits.aiAccess ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center text-gray-500">
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">AI Assistant is available for Premium users</p>
              </div>
            </div>
          )}

          {/* Chat Input */}
          {userCredits.aiAccess ? (
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
          ) : (
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Upgrade to Premium to use AI Assistant..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-400 cursor-not-allowed"
                  disabled
                />
                <button
                  type="button"
                  onClick={() => window.open('/pricing', '_blank')}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:from-purple-600 hover:to-blue-600 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Upgrade
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Panel - Email Editor */}
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
      </div>

      {/* Send Email Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Send Email Campaign</h3>
              <button
                onClick={() => setShowSendModal(false)}
                className="text-gray-400 hover:text-gray-600"
                disabled={isSending}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipients <span className="text-red-500">*</span>
                  <span className="text-gray-500 font-normal">
                    ({recipientList.length + (sendForm.recipients ? sendForm.recipients.split(',').filter(e => e.trim()).length : 0)} total)
                  </span>
                </label>
                
                {/* 收件人管理按钮 */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setShowRecipientManager(true)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                    disabled={isSending}
                  >
                    Manage Recipients
                  </button>
                  <button
                    onClick={() => setImportMethod('csv')}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors"
                    disabled={isSending}
                  >
                    Import CSV
                  </button>
                  {recipientList.length > 0 && (
                    <button
                      onClick={clearAllRecipients}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
                      disabled={isSending}
                    >
                      Clear All
                    </button>
                  )}
                </div>
                
                {/* 快速输入框 */}
                <input
                  type="text"
                  value={sendForm.recipients}
                  onChange={(e) => setSendForm(prev => ({ ...prev, recipients: e.target.value }))}
                  placeholder="user1@example.com, user2@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSending}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple emails with commas, or use the "Manage Recipients" button for bulk operations
                </p>
                
                {/* 收件人列表预览 */}
                {recipientList.length > 0 && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium text-gray-700 mb-2">Added Recipients:</p>
                    <div className="flex flex-wrap gap-2">
                      {recipientList.slice(0, 5).map((email, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {email}
                          <button
                            onClick={() => removeRecipient(email)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                            disabled={isSending}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {recipientList.length > 5 && (
                        <span className="text-xs text-gray-500">
                          +{recipientList.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
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
                  disabled={isSending}
                />
              </div>

              {/* 简化：移除复杂的域名验证UI */}

              {/* Email Preview */}
              <div className="bg-gray-50 rounded-md p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Email Preview</h4>
                <div className="text-xs text-gray-600">
                  <p><strong>Subject:</strong> {campaignData.subject}</p>
                  <p><strong>From:</strong> {sendForm.senderName} &lt;noreply@novamail.world&gt;</p>
                  <p><strong>To:</strong> {sendForm.recipients || 'No recipients'}</p>
                  <p><strong>Method:</strong> Resend API (统一发送)</p>
                </div>
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
                disabled={isSending || !sendForm.recipients}
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
                    Send Email
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 收件人管理模态框 */}
      {showRecipientManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Manage Recipients</h3>
              <button
                onClick={() => setShowRecipientManager(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* 添加收件人 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Recipients
                </label>
                <textarea
                  placeholder="Enter email addresses, one per line or separated by commas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  onChange={(e) => {
                    const emails = e.target.value.split(/[,\n]/).map(email => email.trim()).filter(e => e)
                    if (emails.length > 0) {
                      addRecipients(emails)
                      e.target.value = ''
                    }
                  }}
                />
              </div>
              
              {/* 收件人列表 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Current Recipients ({recipientList.length})
                  </h4>
                  {recipientList.length > 0 && (
                    <button
                      onClick={clearAllRecipients}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md">
                  {recipientList.length === 0 ? (
                    <p className="p-4 text-gray-500 text-center">No recipients added yet</p>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {recipientList.map((email, index) => (
                        <div key={index} className="flex items-center justify-between p-3">
                          <span className="text-sm text-gray-700">{email}</span>
                          <button
                            onClick={() => removeRecipient(email)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowRecipientManager(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV导入模态框 */}
      {importMethod === 'csv' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Import CSV</h3>
              <button
                onClick={() => setImportMethod('manual')}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Upload a CSV file with email addresses. The first column should contain email addresses.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVImport}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="text-xs text-gray-500">
                <p>CSV format example:</p>
                <pre className="bg-gray-100 p-2 rounded mt-1">
                  email,name{'\n'}
                  user1@example.com,John Doe{'\n'}
                  user2@example.com,Jane Smith
                </pre>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setImportMethod('manual')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 积分不足模态框 */}
      {showCreditsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Insufficient Credits</h3>
              <button
                onClick={() => setShowCreditsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-red-800">Not enough credits</p>
                  <p className="text-xs text-red-600">
                    You need 5 credits to send an email. You have {userCredits.remainingCredits} credits remaining.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Upgrade Options:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Free Plan</p>
                      <p className="text-xs text-gray-500">50 credits per month</p>
                    </div>
                    <span className="text-sm text-gray-500">Current</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-purple-200 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Premium Plan</p>
                      <p className="text-xs text-gray-500">Unlimited credits + AI Assistant</p>
                    </div>
                    <span className="text-sm font-medium text-purple-600">$29/month</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreditsModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => window.open('/pricing', '_blank')}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Template Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Save Template</h3>
              <button
                onClick={() => setShowSaveModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              Choose how you'd like to save your template:
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleDownloadHTML}
                className="w-full flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
              >
                <Download className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Download HTML File</p>
                  <p className="text-xs text-gray-500">Save as .html file to your computer</p>
                </div>
              </button>
              
              <button
                onClick={handleCopySourceCode}
                className="w-full flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
              >
                <Clipboard className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Copy Source Code</p>
                  <p className="text-xs text-gray-500">Copy HTML code to clipboard</p>
                </div>
              </button>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export to ESP Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Export to ESP</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              Choose an Email Service Provider to export your template:
            </p>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setSelectedESP('mailchimp')}
                className={`w-full flex items-center space-x-3 p-4 text-left rounded-lg transition-colors border ${
                  selectedESP === 'mailchimp' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">M</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Mailchimp</p>
                  <p className="text-xs text-gray-500">Requires OAuth authorization</p>
                </div>
                {selectedESP === 'mailchimp' && (
                  <Check className="w-5 h-5 text-blue-500 ml-auto" />
                )}
              </button>
              
              <button
                onClick={() => setSelectedESP('sendgrid')}
                className={`w-full flex items-center space-x-3 p-4 text-left rounded-lg transition-colors border ${
                  selectedESP === 'sendgrid' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">SG</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">SendGrid</p>
                  <p className="text-xs text-gray-500">Uses API Key authentication</p>
                </div>
                {selectedESP === 'sendgrid' && (
                  <Check className="w-5 h-5 text-blue-500 ml-auto" />
                )}
              </button>
              
              <button
                onClick={() => setSelectedESP('resend')}
                className={`w-full flex items-center space-x-3 p-4 text-left rounded-lg transition-colors border ${
                  selectedESP === 'resend' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Resend</p>
                  <p className="text-xs text-gray-500">Template feature not supported</p>
                </div>
                {selectedESP === 'resend' && (
                  <Check className="w-5 h-5 text-blue-500 ml-auto" />
                )}
              </button>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isExporting}
              >
                Cancel
              </button>
              
              {selectedESP === 'mailchimp' && (
                <button
                  onClick={handleMailchimpConnect}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <span>🔗</span>
                  Connect Mailchimp
                </button>
              )}
              
              <button
                onClick={handleExportToESP}
                disabled={!selectedESP || isExporting}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Export
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
