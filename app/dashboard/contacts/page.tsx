'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  TagIcon,
  DocumentArrowUpIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  FunnelIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx'

interface Contact {
  id: string
  name: string
  email: string
  tags: string[]
  status: 'new' | 'active' | 'silent'
  lastContact?: string
  totalEmails?: number
  customFields?: Record<string, string>
}

interface Tag {
  name: string
  color: string
  count: number
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [showImportModal, setShowImportModal] = useState(false)
  const [showAddContactModal, setShowAddContactModal] = useState(false)
  const [importing, setImporting] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    tags: [] as string[],
    customFields: {} as Record<string, string>
  })
  const [availableTags, setAvailableTags] = useState<Tag[]>([
    { name: '新用户', color: 'green', count: 0 },
    { name: '活跃用户', color: 'blue', count: 0 },
    { name: '沉默用户', color: 'gray', count: 0 },
    { name: 'VIP', color: 'purple', count: 0 },
    { name: '潜在客户', color: 'yellow', count: 0 }
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = () => {
    // 模拟数据
    const mockContacts: Contact[] = [
      { id: '1', name: '张三', email: 'zhangsan@example.com', tags: ['新用户'], status: 'new', lastContact: '2024-01-15', totalEmails: 2 },
      { id: '2', name: '李四', email: 'lisi@example.com', tags: ['活跃用户', 'VIP'], status: 'active', lastContact: '2024-01-14', totalEmails: 15 },
      { id: '3', name: '王五', email: 'wangwu@example.com', tags: ['沉默用户'], status: 'silent', lastContact: '2023-12-20', totalEmails: 1 },
      { id: '4', name: '赵六', email: 'zhaoliu@example.com', tags: ['新用户'], status: 'new', lastContact: '2024-01-16', totalEmails: 1 },
      { id: '5', name: '钱七', email: 'qianqi@example.com', tags: ['活跃用户'], status: 'active', lastContact: '2024-01-13', totalEmails: 8 },
      { id: '6', name: '孙八', email: 'sunba@example.com', tags: ['潜在客户'], status: 'new', lastContact: '2024-01-12', totalEmails: 3 },
      { id: '7', name: '周九', email: 'zhoujiu@example.com', tags: ['VIP', '活跃用户'], status: 'active', lastContact: '2024-01-11', totalEmails: 22 },
      { id: '8', name: '吴十', email: 'wushi@example.com', tags: ['沉默用户'], status: 'silent', lastContact: '2023-11-15', totalEmails: 0 }
    ]

    setContacts(mockContacts)
    updateTagCounts(mockContacts)
    setLoading(false)
  }

  const updateTagCounts = (contactList: Contact[]) => {
    const tagCounts = availableTags.map(tag => ({
      ...tag,
      count: contactList.filter(contact => contact.tags.includes(tag.name)).length
    }))
    setAvailableTags(tagCounts)
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => contact.tags.includes(tag))
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus
    
    return matchesSearch && matchesTags && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800'
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'silent': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return '新用户'
      case 'active': return '活跃用户'
      case 'silent': return '沉默用户'
      default: return '未知'
    }
  }

  const getTagColor = (tagName: string) => {
    const tag = availableTags.find(t => t.name === tagName)
    if (!tag) return 'bg-gray-100 text-gray-800'
    
    switch (tag.color) {
      case 'green': return 'bg-green-100 text-green-800'
      case 'blue': return 'bg-blue-100 text-blue-800'
      case 'purple': return 'bg-purple-100 text-purple-800'
      case 'yellow': return 'bg-yellow-100 text-yellow-800'
      case 'gray': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImporting(true)
    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)

      const importedContacts: Contact[] = jsonData.map((row: any, index: number) => ({
        id: `imported_${Date.now()}_${index}`,
        name: row['姓名'] || row['Name'] || row['name'] || '',
        email: row['邮箱'] || row['Email'] || row['email'] || '',
        tags: row['标签'] ? row['标签'].split(',').map((tag: string) => tag.trim()) : ['新用户'],
        status: 'new' as const,
        lastContact: new Date().toISOString().split('T')[0],
        totalEmails: 0
      })).filter(contact => contact.name && contact.email)

      setContacts(prev => [...prev, ...importedContacts])
      updateTagCounts([...contacts, ...importedContacts])
      toast.success(`成功导入 ${importedContacts.length} 个联系人`)
      setShowImportModal(false)
    } catch (error) {
      console.error('Import error:', error)
      toast.error('导入失败，请检查文件格式')
    } finally {
      setImporting(false)
    }
  }

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.email) {
      toast.error('请填写姓名和邮箱')
      return
    }

    setAdding(true)
    try {
      const contact: Contact = {
        id: `new_${Date.now()}`,
        name: newContact.name,
        email: newContact.email,
        tags: newContact.tags.length > 0 ? newContact.tags : ['新用户'],
        status: 'new',
        lastContact: new Date().toISOString().split('T')[0],
        totalEmails: 0
      }

      setContacts(prev => [...prev, contact])
      updateTagCounts([...contacts, contact])
      setNewContact({ name: '', email: '', tags: [], customFields: {} })
      setShowAddContactModal(false)
      toast.success('联系人添加成功')
    } catch (error) {
      console.error('Add contact error:', error)
      toast.error('添加失败')
    } finally {
      setAdding(false)
    }
  }

  const handleDeleteContact = (contactId: string) => {
    setContacts(prev => {
      const updated = prev.filter(c => c.id !== contactId)
      updateTagCounts(updated)
      return updated
    })
    toast.success('联系人已删除')
  }

  const toggleTagFilter = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载联系人中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">联系人管理</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowImportModal(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DocumentArrowUpIcon className="h-4 w-4 mr-2" />
                导入联系人
              </button>
              <button
                onClick={() => setShowAddContactModal(true)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                添加联系人
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总联系人</p>
                <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TagIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">活跃用户</p>
                <p className="text-2xl font-bold text-gray-900">{contacts.filter(c => c.status === 'active').length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TagIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">VIP 用户</p>
                <p className="text-2xl font-bold text-gray-900">{contacts.filter(c => c.tags.includes('VIP')).length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TagIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">新用户</p>
                <p className="text-2xl font-bold text-gray-900">{contacts.filter(c => c.status === 'new').length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索联系人..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">所有状态</option>
                <option value="new">新用户</option>
                <option value="active">活跃用户</option>
                <option value="silent">沉默用户</option>
              </select>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">按标签筛选：</p>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => toggleTagFilter(tag.name)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag.name)
                      ? getTagColor(tag.name)
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag.name} ({tag.count})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contacts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              联系人列表 ({filteredContacts.length})
            </h3>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-medium">
                        {contact.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                          {getStatusText(contact.status)}
                        </span>
                        {contact.tags.map((tag) => (
                          <span key={tag} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                            <TagIcon className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      邮件: {contact.totalEmails || 0}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Import Modal */}
      <AnimatePresence>
        {showImportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">导入联系人</h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  支持 Excel (.xlsx) 和 CSV 文件。请确保文件包含"姓名"和"邮箱"列。
                </p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={importing}
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <DocumentArrowUpIcon className="h-6 w-6 text-gray-400 mr-2" />
                  {importing ? '导入中...' : '选择文件'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Contact Modal */}
      <AnimatePresence>
        {showAddContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">添加联系人</h3>
                <button
                  onClick={() => setShowAddContactModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  <input
                    type="text"
                    value={newContact.name}
                    onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入姓名"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  <input
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入邮箱"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">标签</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag.name}
                        onClick={() => {
                          setNewContact(prev => ({
                            ...prev,
                            tags: prev.tags.includes(tag.name)
                              ? prev.tags.filter(t => t !== tag.name)
                              : [...prev.tags, tag.name]
                          }))
                        }}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          newContact.tags.includes(tag.name)
                            ? getTagColor(tag.name)
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={handleAddContact}
                  disabled={adding}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
                >
                  {adding ? '添加中...' : '添加联系人'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}