'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import * as XLSX from 'xlsx'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CloudArrowUpIcon,
  UserPlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Contact {
  id: string
  firstName?: string
  lastName?: string
  email: string
  status: 'active' | 'unsubscribed' | 'bounced'
  createdAt: string
  userSegment?: string
  unsubscribeDate?: string
  bounceDate?: string
  bounceReason?: string
}

export default function ContactsPage() {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [showImportModal, setShowImportModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false)
  const [showManageGroupsModal, setShowManageGroupsModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedContactForStatus, setSelectedContactForStatus] = useState<Contact | null>(null)
  const [newContact, setNewContact] = useState({ firstName: '', lastName: '', email: '', userSegment: '' })
  const [selectedSegment, setSelectedSegment] = useState('')
  const [newGroupName, setNewGroupName] = useState('')
  const [editingGroup, setEditingGroup] = useState<{ id: string; name: string } | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [userSegments, setUserSegments] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user?.email) {
      fetchContacts()
      fetchUserSegments()
    }
  }, [session])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/contacts')
      const data = await response.json()
      
      if (data.success) {
        setContacts(data.contacts)
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
      toast.error('Failed to fetch contacts list')
    } finally {
      setLoading(false)
    }
  }

  const fetchUserSegments = async () => {
    try {
      const response = await fetch('/api/contacts/segments')
      const data = await response.json()
      
      if (data.success) {
        setUserSegments(data.segments)
      }
    } catch (error) {
      console.error('Failed to fetch segments:', error)
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.trim()
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSegment = !selectedSegment || contact.userSegment === selectedSegment
    return matchesSearch && matchesSegment
  })

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    )
  }

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id))
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedContacts.length === 0) {
      toast.error('Please select contacts to delete')
      return
    }
    
    try {
      const response = await fetch('/api/contacts/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactIds: selectedContacts })
      })
      
      const data = await response.json()
      if (data.success) {
        toast.success('Contacts deleted successfully')
        setSelectedContacts([])
        fetchContacts()
      } else {
        toast.error(data.error || 'Delete failed')
      }
    } catch (error) {
      console.error('Delete contacts error:', error)
      toast.error('Failed to delete contacts')
    }
  }

  const handleCreateCampaign = () => {
    if (selectedContacts.length === 0) {
      toast.error('请选择联系人创建活动')
      return
    }
    
    setShowCreateCampaignModal(true)
  }

  const getSelectedContactEmails = () => {
    return contacts
      .filter(contact => selectedContacts.includes(contact.id))
      .map(contact => contact.email)
  }

  const handleAddGroup = () => {
    if (!newGroupName.trim()) {
      toast.error('Please enter a group name')
      return
    }

    const newGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName.trim()
    }

    setUserSegments(prev => [...prev, newGroup])
    setNewGroupName('')
    toast.success(`Group "${newGroup.name}" added successfully`)
  }

  const handleEditGroup = (groupId: string, newName: string) => {
    if (!newName.trim()) {
      toast.error('Please enter a group name')
      return
    }

    setUserSegments(prev => 
      prev.map(group => 
        group.id === groupId ? { ...group, name: newName.trim() } : group
      )
    )
    setEditingGroup(null)
    toast.success(`Group renamed to "${newName.trim()}"`)
  }

  const handleDeleteGroup = (groupId: string) => {
    const group = userSegments.find(g => g.id === groupId)
    if (!group) return

    // 检查是否有联系人使用这个分组
    const contactsInGroup = contacts.filter(contact => contact.userSegment === groupId)
    if (contactsInGroup.length > 0) {
      toast.error(`Cannot delete group "${group.name}" - ${contactsInGroup.length} contacts are using it`)
      return
    }

    setUserSegments(prev => prev.filter(group => group.id !== groupId))
    toast.success(`Group "${group.name}" deleted successfully`)
  }

  const handleMoveContactsToGroup = async (groupId: string) => {
    if (selectedContacts.length === 0) {
      toast.error('请选择要移动的联系人')
      return
    }

    const group = userSegments.find(g => g.id === groupId)
    if (!group) return

    try {
      const response = await fetch('/api/contacts/move-to-group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactIds: selectedContacts, groupId })
      })
      
      const data = await response.json()
      if (data.success) {
        toast.success(`${selectedContacts.length} 个联系人已移动到 "${group.name}"`)
        setSelectedContacts([])
        fetchContacts()
      } else {
        toast.error(data.error || '移动失败')
      }
    } catch (error) {
      console.error('Move contacts error:', error)
      toast.error('移动联系人失败')
    }
  }

  const handleChangeContactStatus = async (contactId: string, newStatus: 'active' | 'unsubscribed' | 'bounced', reason?: string) => {
    try {
      const response = await fetch(`/api/contacts/${contactId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, reason })
      })
      
      const data = await response.json()
      if (data.success) {
        const statusText = {
          'active': '激活',
          'unsubscribed': '退订',
          'bounced': '退回'
        }
        
        toast.success(`联系人状态已更新为: ${statusText[newStatus]}`)
        setShowStatusModal(false)
        setSelectedContactForStatus(null)
        fetchContacts()
      } else {
        toast.error(data.error || '状态更新失败')
      }
    } catch (error) {
      console.error('Change contact status error:', error)
      toast.error('状态更新失败')
    }
  }

  const handleBulkStatusChange = async (newStatus: 'active' | 'unsubscribed' | 'bounced') => {
    if (selectedContacts.length === 0) {
      toast.error('请选择要更改状态的联系人')
      return
    }

    try {
      const response = await fetch('/api/contacts/bulk-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactIds: selectedContacts, status: newStatus })
      })
      
      const data = await response.json()
      if (data.success) {
        const statusText = {
          'active': '激活',
          'unsubscribed': '退订',
          'bounced': '退回'
        }
        
        toast.success(`${selectedContacts.length} 个联系人状态已更新为: ${statusText[newStatus]}`)
        setSelectedContacts([])
        fetchContacts()
      } else {
        toast.error(data.error || '状态更新失败')
      }
    } catch (error) {
      console.error('Bulk status change error:', error)
      toast.error('状态更新失败')
    }
  }

  const handleAddContact = async () => {
    if (!newContact.firstName || !newContact.email) {
      toast.error('请填写所有必填字段')
      return
    }

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: newContact.firstName,
          lastName: newContact.lastName,
          email: newContact.email,
          userSegment: newContact.userSegment || undefined
        })
      })
      
      const data = await response.json()
      if (data.success) {
        toast.success('联系人添加成功')
        setNewContact({ firstName: '', lastName: '', email: '', userSegment: '' })
        setShowAddModal(false)
        fetchContacts()
      } else {
        toast.error(data.error || '添加失败')
      }
    } catch (error) {
      console.error('Add contact error:', error)
      toast.error('添加联系人失败')
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      console.log('No file selected')
      return
    }

    console.log('File selected:', file.name, file.type, file.size)

    const fileName = file.name.toLowerCase()
    const isCSV = fileName.endsWith('.csv')
    const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls')
    const isTXT = fileName.endsWith('.txt')

    console.log('File type check:', { isCSV, isExcel, isTXT })

    if (!isCSV && !isExcel && !isTXT) {
      toast.error('请上传CSV、Excel或TXT格式的文件')
      return
    }

    try {
      let contacts: Contact[] = []

      if (isExcel) {
        // 处理Excel文件
        contacts = await parseExcelFile(file)
      } else {
        // 处理CSV和TXT文件
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          console.log('File content length:', content.length)
          console.log('File content preview:', content.substring(0, 200))
          
          try {
            const parsedContacts = parseFileContent(content, file.name)
            console.log('Parsed contacts:', parsedContacts)
            
            if (parsedContacts.length > 0) {
              setContacts(prev => [...parsedContacts, ...prev])
              toast.success(`成功导入 ${parsedContacts.length} 个联系人`)
            } else {
              toast.error('文件中没有找到有效的联系人数据')
            }
          } catch (error) {
            console.error('Parse error:', error)
            toast.error('文件解析失败，请检查文件格式')
          }
        }

        reader.onerror = (error) => {
          console.error('File read error:', error)
          toast.error('文件读取失败')
        }

        reader.readAsText(file, 'utf-8')
        setShowImportModal(false)
        return
      }

      if (contacts.length > 0) {
        setContacts(prev => [...contacts, ...prev])
        toast.success(`成功导入 ${contacts.length} 个联系人`)
      } else {
        toast.error('文件中没有找到有效的联系人数据')
      }
    } catch (error) {
      console.error('File processing error:', error)
      toast.error('文件处理失败，请检查文件格式')
    }

    setShowImportModal(false)
  }

  const parseFileContent = (content: string, fileName: string): Contact[] => {
    const contacts: Contact[] = []
    const lines = content.split('\n').filter(line => line.trim())

    if (fileName.toLowerCase().endsWith('.txt')) {
      // TXT格式：每行一个邮箱地址，可选格式 "姓名,邮箱" 或 "邮箱"
      lines.forEach((line, index) => {
        const trimmedLine = line.trim()
        if (trimmedLine) {
          if (trimmedLine.includes(',')) {
            const [name, email] = trimmedLine.split(',').map(s => s.trim())
            if (email && isValidEmail(email)) {
              const [firstName, ...lastNameParts] = (name || email.split('@')[0]).split(' ')
              contacts.push({
                id: `temp_${Date.now()}_${index}`,
                firstName: firstName || '',
                lastName: lastNameParts.join(' ') || '',
                email: email,
                status: 'active',
                createdAt: new Date().toISOString()
              })
            }
          } else if (isValidEmail(trimmedLine)) {
            const name = trimmedLine.split('@')[0]
            contacts.push({
              id: `temp_${Date.now()}_${index}`,
              firstName: name,
              lastName: '',
              email: trimmedLine,
              status: 'active',
              createdAt: new Date().toISOString()
            })
          }
        }
      })
    } else {
      // CSV格式：包含标题行
      if (lines.length === 0) {
        return contacts
      }
      
      const [header, ...dataLines] = lines
      const headers = header.split(',').map(h => h.trim().toLowerCase())
      
      const firstNameIndex = headers.findIndex(h => h.includes('firstname') || h.includes('first_name') || h.includes('名'))
      const lastNameIndex = headers.findIndex(h => h.includes('lastname') || h.includes('last_name') || h.includes('姓'))
      const nameIndex = headers.findIndex(h => h.includes('name') || h.includes('姓名'))
      const emailIndex = headers.findIndex(h => h.includes('email') || h.includes('邮箱'))
      const segmentIndex = headers.findIndex(h => h.includes('segment') || h.includes('分层'))

      dataLines.forEach((line, index) => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
        let firstName = firstNameIndex >= 0 ? values[firstNameIndex] : ''
        let lastName = lastNameIndex >= 0 ? values[lastNameIndex] : ''
        const name = nameIndex >= 0 ? values[nameIndex] : ''
        const email = emailIndex >= 0 ? values[emailIndex] : ''
        const segment = segmentIndex >= 0 ? values[segmentIndex] : ''

        if (name && !firstName) {
          const [first, ...last] = name.split(' ')
          firstName = first
          lastName = last.join(' ')
        }

        if (email && isValidEmail(email)) {
          contacts.push({
            id: `temp_${Date.now()}_${index}`,
            firstName: firstName || email.split('@')[0],
            lastName: lastName || '',
            email: email,
            status: 'active',
            createdAt: new Date().toISOString(),
            userSegment: segment || undefined
          })
        }
      })
    }

    return contacts
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const parseExcelFile = async (file: File): Promise<Contact[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result
          if (!data) {
            reject(new Error('No data found'))
            return
          }

          // 使用 SheetJS 解析 Excel 文件
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          
          // 转换为 JSON 格式
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
          
          if (jsonData.length === 0) {
            resolve([])
            return
          }

          // 获取标题行
          const headers = (jsonData[0] as string[]).map(h => h?.toString().toLowerCase().trim() || '')
          
          // 查找列索引
          const firstNameIndex = headers.findIndex(h => h.includes('firstname') || h.includes('first_name') || h.includes('名'))
          const lastNameIndex = headers.findIndex(h => h.includes('lastname') || h.includes('last_name') || h.includes('姓'))
          const nameIndex = headers.findIndex(h => h.includes('name') || h.includes('姓名'))
          const emailIndex = headers.findIndex(h => h.includes('email') || h.includes('邮箱'))
          const segmentIndex = headers.findIndex(h => h.includes('segment') || h.includes('分层'))

          const contacts: Contact[] = []
          
          // 处理数据行
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as any[]
            if (!row || row.length === 0) continue

            let firstName = firstNameIndex >= 0 ? (row[firstNameIndex]?.toString().trim() || '') : ''
            let lastName = lastNameIndex >= 0 ? (row[lastNameIndex]?.toString().trim() || '') : ''
            const name = nameIndex >= 0 ? (row[nameIndex]?.toString().trim() || '') : ''
            const email = emailIndex >= 0 ? (row[emailIndex]?.toString().trim() || '') : ''
            const segment = segmentIndex >= 0 ? (row[segmentIndex]?.toString().trim() || '') : ''

            if (name && !firstName) {
              const [first, ...last] = name.split(' ')
              firstName = first
              lastName = last.join(' ')
            }

            if (email && isValidEmail(email)) {
              contacts.push({
                id: `temp_${Date.now()}_${i}`,
                firstName: firstName || email.split('@')[0],
                lastName: lastName || '',
                email: email,
                status: 'active',
                createdAt: new Date().toISOString(),
                userSegment: segment || undefined
              })
            }
          }

          resolve(contacts)
        } catch (error) {
          console.error('Excel parsing error:', error)
          reject(error)
        }
      }

      reader.onerror = (error) => {
        console.error('File read error:', error)
        reject(error)
      }

      // 读取为二进制数据
      reader.readAsBinaryString(file)
    })
  }


  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'unsubscribed':
        return 'bg-yellow-100 text-yellow-800'
      case 'bounced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your email contacts and lists
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowManageGroupsModal(true)}
            className="btn-secondary flex items-center"
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            Manage Groups
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="btn-secondary flex items-center"
          >
            <CloudArrowUpIcon className="h-4 w-4 mr-2" />
            Import Contacts
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Contact
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserPlusIcon className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Contacts</p>
              <p className="text-2xl font-semibold text-gray-900">{contacts.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-semibold text-gray-900">
                {contacts.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Unsubscribed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {contacts.filter(c => c.status === 'unsubscribed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Bounced</p>
              <p className="text-2xl font-semibold text-gray-900">
                {contacts.filter(c => c.status === 'bounced').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="input-field"
            >
              <option value="">所有用户分层</option>
              {userSegments.map(segment => (
                <option key={segment.id} value={segment.id}>
                  {segment.name}
                </option>
              ))}
            </select>
            {selectedContacts.length > 0 && (
              <>
                <button
                  onClick={handleCreateCampaign}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                  Create Campaign ({selectedContacts.length})
                </button>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleMoveContactsToGroup(e.target.value)
                      e.target.value = ''
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 border-0"
                >
                  <option value="">Move to Group</option>
                  {userSegments.map(group => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleBulkStatusChange(e.target.value as 'active' | 'unsubscribed' | 'bounced')
                      e.target.value = ''
                    }
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 border-0"
                >
                  <option value="">Change Status</option>
                  <option value="active">激活 (Active)</option>
                  <option value="unsubscribed">退订 (Unsubscribed)</option>
                  <option value="bounced">退回 (Bounced)</option>
                </select>
                <button
                  onClick={handleDeleteSelected}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete ({selectedContacts.length})
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="card">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Segment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    {searchTerm || selectedSegment ? 'No contacts found matching your criteria.' : 'No contacts yet. '}
                    {!searchTerm && !selectedSegment && (
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="text-primary-600 hover:text-primary-500"
                      >
                        Add your first contact
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => handleSelectContact(contact.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {`${contact.firstName || ''} ${contact.lastName || ''}`.trim() || contact.email.split('@')[0]}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.userSegment ? (
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                        {userSegments.find(s => s.id === contact.userSegment)?.name || contact.userSegment}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">未分类</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedContactForStatus(contact)
                          setShowStatusModal(true)
                        }}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Change Status"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Import Contacts</h3>
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
                      <li>Name/姓名 (必填)</li>
                      <li>Email/邮箱 (必填)</li>
                      <li>User Segment/用户分层 (可选)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">CSV格式：</p>
                    <ul className="list-disc list-inside mt-1 ml-2">
                      <li>Name/姓名 (必填)</li>
                      <li>Email/邮箱 (必填)</li>
                      <li>User Segment/用户分层 (可选)</li>
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
                onClick={() => setShowImportModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Contact</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={newContact.firstName}
                  onChange={(e) => setNewContact(prev => ({ ...prev, firstName: e.target.value }))}
                  className="input-field"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Segment
                </label>
                <select
                  value={newContact.userSegment}
                  onChange={(e) => setNewContact(prev => ({ ...prev, userSegment: e.target.value }))}
                  className="input-field"
                >
                  <option value="">选择用户分层</option>
                  {userSegments.map(segment => (
                    <option key={segment.id} value={segment.id}>
                      {segment.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="btn-primary"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateCampaignModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create Campaign for Selected Contacts</h3>
            
            {/* Selected Contacts Summary */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Selected Contacts ({selectedContacts.length})
              </h4>
              <div className="text-sm text-blue-700">
                {getSelectedContactEmails().slice(0, 5).join(', ')}
                {getSelectedContactEmails().length > 5 && ` and ${getSelectedContactEmails().length - 5} more...`}
              </div>
            </div>

            {/* Quick Campaign Creation */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Theme
                </label>
                <input
                  type="text"
                  placeholder="Enter campaign theme"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Purpose
                </label>
                <textarea
                  placeholder="What is the purpose of this campaign?"
                  rows={3}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 border border-gray-300 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50">
                    <div className="text-2xl mb-2">✉️</div>
                    <div className="font-medium">Simple Email</div>
                    <div className="text-sm text-gray-600">Quick and simple</div>
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50">
                    <div className="text-2xl mb-2">🎨</div>
                    <div className="font-medium">Professional Template</div>
                    <div className="text-sm text-gray-600">Beautiful templates</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateCampaignModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <Link
                href={`/dashboard/campaigns/new?recipients=${encodeURIComponent(getSelectedContactEmails().join(','))}`}
                onClick={() => setShowCreateCampaignModal(false)}
                className="btn-primary"
              >
                Create Campaign
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Manage Groups Modal */}
      {showManageGroupsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Contact Groups</h3>
            
            {/* Add New Group */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Add New Group</h4>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter group name"
                  className="flex-1 input-field"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGroup()}
                />
                <button
                  onClick={handleAddGroup}
                  className="btn-primary"
                >
                  Add Group
                </button>
              </div>
            </div>

            {/* Existing Groups */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900">Existing Groups</h4>
              {userSegments.map((group) => (
                <div key={group.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    {editingGroup?.id === group.id ? (
                      <input
                        type="text"
                        defaultValue={group.name}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleEditGroup(group.id, e.currentTarget.value)
                          }
                        }}
                        onBlur={(e) => handleEditGroup(group.id, e.target.value)}
                        className="input-field"
                        autoFocus
                      />
                    ) : (
                      <div>
                        <div className="font-medium text-gray-900">{group.name}</div>
                        <div className="text-sm text-gray-500">
                          {contacts.filter(c => c.userSegment === group.id).length} contacts
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {editingGroup?.id !== group.id && (
                      <>
                        <button
                          onClick={() => setEditingGroup({ id: group.id, name: group.name })}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGroup(group.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowManageGroupsModal(false)
                  setEditingGroup(null)
                  setNewGroupName('')
                }}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Status Modal */}
      {showStatusModal && selectedContactForStatus && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Contact Status</h3>
            
            {/* Contact Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">{selectedContactForStatus.firstName} {selectedContactForStatus.lastName}</div>
              <div className="text-sm text-gray-600">{selectedContactForStatus.email}</div>
              <div className="text-xs text-gray-500 mt-1">
                Current Status: <span className={`font-medium ${getStatusColor(selectedContactForStatus.status)}`}>
                  {selectedContactForStatus.status}
                </span>
              </div>
            </div>

            {/* Status Options */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900">Select New Status:</h4>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleChangeContactStatus(selectedContactForStatus.id, 'active')}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-900">激活 (Active)</div>
                      <div className="text-xs text-gray-600">联系人可以正常接收邮件</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleChangeContactStatus(selectedContactForStatus.id, 'unsubscribed')}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-900">退订 (Unsubscribed)</div>
                      <div className="text-xs text-gray-600">联系人已取消订阅，不会接收邮件</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleChangeContactStatus(selectedContactForStatus.id, 'bounced', 'Invalid email address')}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-900">退回 (Bounced)</div>
                      <div className="text-xs text-gray-600">邮件地址无效或无法送达</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowStatusModal(false)
                  setSelectedContactForStatus(null)
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
