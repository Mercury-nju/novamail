'use client'

import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import { getUserLimits } from '@/lib/permissions'

interface Contact {
  id: string
  name: string
  email: string
  status: string
  tags: string[]
  lastContact: string
  totalEmails: number
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importing, setImporting] = useState(false)
  const [showAddContactModal, setShowAddContactModal] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    tags: [] as string[],
    customFields: {} as Record<string, string>
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 获取用户使用限制
  const limits = getUserLimits()
  const isAtLimit = limits.maxContacts !== -1 && contacts.length >= limits.maxContacts

  useEffect(() => {
      fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      
      // 构建查询参数
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedStatus !== 'all') params.append('status', selectedStatus)
      params.append('page', '1')
      params.append('limit', '100')
      
      const userEmail = localStorage.getItem('user-email') || 'anonymous@example.com';
      const response = await fetch(`https://novamail-api.lihongyangnju.workers.dev/api/contacts?${params}`, {
        headers: {
          'x-user-email': userEmail
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      if (data.success) {
        setContacts(data.data.contacts || [])
      } else {
        throw new Error(data.error || 'Failed to fetch contacts')
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
      toast.error('Failed to load contacts')
      // 如果API失败，设置为空数组而不是模拟数据
      setContacts([])
    } finally {
      setLoading(false)
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => contact.tags.includes(tag))
    
    return matchesSearch && matchesStatus && matchesTags
  })

  const allTags = Array.from(new Set(contacts.flatMap(contact => contact.tags)))

  // 处理文件上传
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileName = file.name.toLowerCase()
    const isCSV = fileName.endsWith('.csv')
    const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls')

    if (!isCSV && !isExcel) {
      toast.error('Please upload CSV or Excel format file')
      return
    }

    try {
      setImporting(true)
      let contactsData: any[] = []

      if (isCSV) {
        // 处理CSV文件
        const formData = new FormData()
        formData.append('csvFile', file)

        const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/contacts/import', {
        method: 'POST',
          body: formData
      })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      
      const data = await response.json()
      if (data.success) {
          contactsData = data.data.contacts || []
          toast.success(`Successfully imported ${contactsData.length} contacts from CSV`)
      } else {
          throw new Error(data.message || 'Failed to import contacts')
        }
      } else if (isExcel) {
        // 处理Excel文件
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet)

          // 验证和格式化数据
          contactsData = jsonData.map((row: any, index: number) => {
            const email = row.email || row.Email || row.EMAIL
            const name = row.name || row.Name || row.NAME || email?.split('@')[0] || `Contact ${index + 1}`
            
            if (!email) {
              throw new Error(`Row ${index + 1}: Email is required`)
            }

            // 验证邮箱格式
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            if (!emailRegex.test(email)) {
              throw new Error(`Row ${index + 1}: Invalid email format`)
            }

            return {
              id: `contact_${Date.now()}_${index}`,
              name: name.toString().trim(),
              email: email.toString().toLowerCase().trim(),
              status: 'active',
              tags: [],
              lastContact: new Date().toISOString(),
              totalEmails: 0
            }
          })

          // 批量保存联系人
          saveContacts(contactsData)
        }
        reader.readAsArrayBuffer(file)
      return
    }

      // 保存联系人数据
      if (contactsData.length > 0) {
        await saveContacts(contactsData)
      }

    } catch (error) {
      console.error('Import failed:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to import contacts')
    } finally {
      setImporting(false)
      setShowImportModal(false)
      // 清空文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  // 保存联系人到后端
  const saveContacts = async (contactsData: Contact[]) => {
    try {
      // 这里可以调用后端API保存联系人
      // 暂时直接更新本地状态
      setContacts(prev => [...prev, ...contactsData])
      toast.success(`Successfully imported ${contactsData.length} contacts`)
      
      // 触发Dashboard数据刷新
      window.dispatchEvent(new CustomEvent('contactUpdated'))
    } catch (error) {
      console.error('Failed to save contacts:', error)
      toast.error('Failed to save contacts')
    }
  }

  // 打开文件选择器
  const handleImportClick = () => {
    if (isAtLimit) {
      toast.error('Contact limit reached. Upgrade to add more contacts.')
      return
    }
    fileInputRef.current?.click()
  }

  // 打开添加联系人模态框
  const handleAddContactClick = () => {
    if (isAtLimit) {
      toast.error('Contact limit reached. Upgrade to add more contacts.')
      return
    }
    setShowAddContactModal(true)
  }

  // 处理添加联系人表单提交
  const handleAddContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newContact.name.trim() || !newContact.email.trim()) {
      toast.error('Name and email are required')
        return
      }

    // 验证邮箱格式
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(newContact.email)) {
      toast.error('Please enter a valid email address')
            return
          }

    try {
      setAdding(true)
      
      const userEmail = localStorage.getItem('user-email') || 'anonymous@example.com';
      const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': userEmail
        },
        body: JSON.stringify({
          name: newContact.name.trim(),
          email: newContact.email.toLowerCase().trim(),
          tags: newContact.tags,
          customFields: newContact.customFields
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.success) {
        // 添加新联系人到列表
        const contact: Contact = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          status: data.data.status || 'active',
          tags: data.data.tags || [],
          lastContact: data.data.lastContact || new Date().toISOString(),
          totalEmails: data.data.totalEmails || 0
        }
        
        setContacts(prev => [...prev, contact])
        toast.success('Contact added successfully')
        
        // 触发Dashboard数据刷新
        window.dispatchEvent(new CustomEvent('contactUpdated'))
        
        // 重置表单
        setNewContact({
          name: '',
          email: '',
          tags: [],
          customFields: {}
        })
        setShowAddContactModal(false)
      } else {
        throw new Error(data.error || 'Failed to add contact')
      }
        } catch (error) {
      console.error('Add contact failed:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to add contact')
    } finally {
      setAdding(false)
    }
  }

  // 处理表单输入变化
  const handleInputChange = (field: string, value: string) => {
    setNewContact(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600">Manage your email contacts and lists</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleImportClick}
            disabled={importing}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {importing ? 'Importing...' : 'Import Contacts'}
          </button>
          <button
            onClick={handleAddContactClick}
            disabled={adding}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adding ? 'Adding...' : 'Add Contact'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Contacts</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.length}
                {limits.maxContacts !== -1 && (
                  <span className="text-sm font-normal text-gray-500"> / {limits.maxContacts}</span>
                )}
              </p>
              {isAtLimit && (
                <p className="text-xs text-red-600 mt-1">Contact limit reached. Upgrade to add more contacts.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.filter(c => c.status === 'inactive').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full md:w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredContacts.length} of {contacts.length} contacts
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emails Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      contact.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag) => (
                        <span key={tag} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                          {tag}
                      </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contact.lastContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contact.totalEmails}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
          </table>
        </div>
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first contact.</p>
          <div className="mt-6">
              <button
              onClick={handleAddContactClick}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
              Add Contact
              </button>
          </div>
        </div>
      )}

      {/* 隐藏的文件输入 */}
                <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      {/* 导入模态框 */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Import Contacts</h3>
            <p className="text-gray-600 mb-4">
              Upload a CSV or Excel file to import contacts. The file should contain columns for name and email.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Choose File
              </button>
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 添加联系人模态框 */}
      {showAddContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New Contact</h3>
            <form onSubmit={handleAddContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter contact name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter tags separated by commas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                    setNewContact(prev => ({ ...prev, tags }))
                  }}
                />
            </div>

              <div className="flex space-x-3 pt-4">
              <button
                  type="submit"
                  disabled={adding}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adding ? 'Adding...' : 'Add Contact'}
              </button>
                <button
                  type="button"
                  onClick={() => setShowAddContactModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
