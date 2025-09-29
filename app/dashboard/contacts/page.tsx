'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CloudArrowUpIcon,
  UserPlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Contact {
  id: number
  name: string
  email: string
  status: 'active' | 'unsubscribed' | 'bounced'
  addedDate: string
  userSegment?: string
}

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContacts, setSelectedContacts] = useState<number[]>([])
  const [showImportModal, setShowImportModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', email: '', userSegment: '' })
  const [selectedSegment, setSelectedSegment] = useState('')

  // User segments
  const userSegments = [
    { id: 'new-users', name: '新用户' },
    { id: 'silent-users', name: '沉默用户' },
    { id: 'paid-users', name: '付费用户' },
    { id: 'active-users', name: '活跃用户' },
    { id: 'churned-users', name: '流失用户' }
  ]

  // Mock data
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      status: 'active',
      addedDate: '2024-11-20',
      userSegment: 'paid-users'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      status: 'active',
      addedDate: '2024-11-19',
      userSegment: 'new-users'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      status: 'unsubscribed',
      addedDate: '2024-11-18',
      userSegment: 'churned-users'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@startup.io',
      status: 'active',
      addedDate: '2024-11-17',
      userSegment: 'active-users'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@tech.com',
      status: 'bounced',
      addedDate: '2024-11-16',
      userSegment: 'silent-users'
    }
  ])

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSegment = !selectedSegment || contact.userSegment === selectedSegment
    return matchesSearch && matchesSegment
  })

  const handleSelectContact = (contactId: number) => {
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

  const handleDeleteSelected = () => {
    if (selectedContacts.length === 0) {
      toast.error('Please select contacts to delete')
      return
    }
    
    setContacts(prev => prev.filter(contact => !selectedContacts.includes(contact.id)))
    setSelectedContacts([])
    toast.success(`${selectedContacts.length} contacts deleted`)
  }

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) {
      toast.error('Please fill in all fields')
      return
    }

    const contact: Contact = {
      id: Date.now(),
      name: newContact.name,
      email: newContact.email,
      status: 'active',
      addedDate: new Date().toISOString().split('T')[0],
      userSegment: newContact.userSegment || undefined
    }

    setContacts(prev => [contact, ...prev])
    setNewContact({ name: '', email: '', userSegment: '' })
    setShowAddModal(false)
    toast.success('Contact added successfully')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      console.log('File content length:', content.length)
      console.log('File content preview:', content.substring(0, 200))
      
      try {
        const contacts = parseFileContent(content, file.name)
        console.log('Parsed contacts:', contacts)
        
        if (contacts.length > 0) {
          setContacts(prev => [...contacts, ...prev])
          toast.success(`成功导入 ${contacts.length} 个联系人`)
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

    // 对于Excel文件，我们需要特殊处理
    if (isExcel) {
      toast.error('Excel文件需要转换为CSV格式后导入')
      return
    }

    reader.readAsText(file, 'utf-8')
    setShowImportModal(false)
  }

  const parseFileContent = (content: string, fileName: string): Contact[] => {
    const contacts: Contact[] = []
    const lines = content.split('\n').filter(line => line.trim())
    
    console.log('Total lines:', lines.length)
    console.log('First few lines:', lines.slice(0, 3))

    if (fileName.toLowerCase().endsWith('.txt')) {
      // TXT格式：每行一个邮箱地址，可选格式 "姓名,邮箱" 或 "邮箱"
      lines.forEach((line, index) => {
        const trimmedLine = line.trim()
        if (trimmedLine) {
          if (trimmedLine.includes(',')) {
            const [name, email] = trimmedLine.split(',').map(s => s.trim())
            if (email && isValidEmail(email)) {
              contacts.push({
                id: Date.now() + index,
                name: name || email.split('@')[0],
                email: email,
                status: 'active',
                addedDate: new Date().toISOString().split('T')[0]
              })
            }
          } else if (isValidEmail(trimmedLine)) {
            contacts.push({
              id: Date.now() + index,
              name: trimmedLine.split('@')[0],
              email: trimmedLine,
              status: 'active',
              addedDate: new Date().toISOString().split('T')[0]
            })
          }
        }
      })
    } else {
      // CSV格式：包含标题行
      if (lines.length === 0) {
        console.log('No lines found in file')
        return contacts
      }
      
      const [header, ...dataLines] = lines
      console.log('Header:', header)
      console.log('Data lines count:', dataLines.length)
      
      const headers = header.split(',').map(h => h.trim().toLowerCase())
      console.log('Headers:', headers)
      
      const nameIndex = headers.findIndex(h => h.includes('name') || h.includes('姓名'))
      const emailIndex = headers.findIndex(h => h.includes('email') || h.includes('邮箱'))
      const segmentIndex = headers.findIndex(h => h.includes('segment') || h.includes('分层'))

      console.log('Column indices:', { nameIndex, emailIndex, segmentIndex })

      dataLines.forEach((line, index) => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
        const name = nameIndex >= 0 ? values[nameIndex] : ''
        const email = emailIndex >= 0 ? values[emailIndex] : ''
        const segment = segmentIndex >= 0 ? values[segmentIndex] : ''

        console.log(`Line ${index}:`, { name, email, segment, values })

        if (email && isValidEmail(email)) {
          contacts.push({
            id: Date.now() + index,
            name: name || email.split('@')[0],
            email: email,
            status: 'active',
            addedDate: new Date().toISOString().split('T')[0],
            userSegment: segment || undefined
          })
        }
      })
    }

    console.log('Final contacts count:', contacts.length)
    return contacts
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
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
              <button
                onClick={handleDeleteSelected}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete ({selectedContacts.length})
              </button>
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
              {filteredContacts.map((contact) => (
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
                        {contact.name}
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
                    {contact.addedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
                  Upload File (CSV, TXT)
                </label>
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
              </div>
              <div className="text-sm text-gray-500">
                <p className="font-medium mb-2">支持的文件格式：</p>
                <div className="space-y-2">
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
                  Name
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="Enter contact name"
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

    </div>
  )
}
