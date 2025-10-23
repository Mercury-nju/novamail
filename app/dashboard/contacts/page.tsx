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
  CheckIcon,
  DocumentArrowDownIcon,
  Cog6ToothIcon,
  UserPlusIcon,
  UserMinusIcon,
  Squares2X2Icon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx'

interface Contact {
  id: string
  name: string
  email: string
  tags: string[]
  status: 'new' | 'active' | 'silent' | 'unsubscribed' | 'bounced'
  lastContact?: string
  totalEmails?: number
  customFields?: Record<string, string>
  createdAt: string
  updatedAt: string
}

interface Tag {
  id: string
  name: string
  color: string
  count: number
  createdAt: string
}


export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [showImportModal, setShowImportModal] = useState(false)
  const [showAddContactModal, setShowAddContactModal] = useState(false)
  const [showTagManager, setShowTagManager] = useState(false)
  const [showContactDetails, setShowContactDetails] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [importing, setImporting] = useState(false)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    tags: [] as string[],
    customFields: {} as Record<string, string>
  })
  const [newTag, setNewTag] = useState({
    name: '',
    color: 'blue'
  })
  const [availableTags, setAvailableTags] = useState<Tag[]>([
    { id: '1', name: 'New User', color: 'green', count: 0, createdAt: new Date().toISOString() },
    { id: '2', name: 'Active User', color: 'blue', count: 0, createdAt: new Date().toISOString() },
    { id: '3', name: 'Silent User', color: 'gray', count: 0, createdAt: new Date().toISOString() },
    { id: '4', name: 'VIP', color: 'purple', count: 0, createdAt: new Date().toISOString() },
    { id: '5', name: 'Prospect', color: 'yellow', count: 0, createdAt: new Date().toISOString() }
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = () => {
    // Mock data with enhanced structure
    const mockContacts: Contact[] = [
      { 
        id: '1', 
        name: 'John Smith', 
        email: 'john.smith@example.com', 
        tags: ['New User'], 
        status: 'new', 
        lastContact: '2024-01-15', 
        totalEmails: 2,
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-15T14:30:00Z'
      },
      { 
        id: '2', 
        name: 'Sarah Johnson', 
        email: 'sarah.johnson@example.com', 
        tags: ['Active User', 'VIP'], 
        status: 'active', 
        lastContact: '2024-01-14', 
        totalEmails: 15,
        createdAt: '2024-01-05T09:00:00Z',
        updatedAt: '2024-01-14T16:45:00Z'
      },
      { 
        id: '3', 
        name: 'Mike Wilson', 
        email: 'mike.wilson@example.com', 
        tags: ['Silent User'], 
        status: 'silent', 
        lastContact: '2023-12-20', 
        totalEmails: 1,
        createdAt: '2023-12-15T11:00:00Z',
        updatedAt: '2023-12-20T10:15:00Z'
      },
      { 
        id: '4', 
        name: 'Emily Davis', 
        email: 'emily.davis@example.com', 
        tags: ['New User'], 
        status: 'new', 
        lastContact: '2024-01-16', 
        totalEmails: 1,
        createdAt: '2024-01-12T08:30:00Z',
        updatedAt: '2024-01-16T12:20:00Z'
      },
      { 
        id: '5', 
        name: 'David Brown', 
        email: 'david.brown@example.com', 
        tags: ['Active User'], 
        status: 'active', 
        lastContact: '2024-01-13', 
        totalEmails: 8,
        createdAt: '2024-01-08T14:00:00Z',
        updatedAt: '2024-01-13T09:30:00Z'
      },
      { 
        id: '6', 
        name: 'Lisa Anderson', 
        email: 'lisa.anderson@example.com', 
        tags: ['Prospect'], 
        status: 'new', 
        lastContact: '2024-01-12', 
        totalEmails: 3,
        createdAt: '2024-01-10T16:45:00Z',
        updatedAt: '2024-01-12T11:00:00Z'
      },
      { 
        id: '7', 
        name: 'Robert Taylor', 
        email: 'robert.taylor@example.com', 
        tags: ['VIP', 'Active User'], 
        status: 'active', 
        lastContact: '2024-01-11', 
        totalEmails: 22,
        createdAt: '2024-01-03T13:20:00Z',
        updatedAt: '2024-01-11T15:10:00Z'
      },
      { 
        id: '8', 
        name: 'Jennifer Martinez', 
        email: 'jennifer.martinez@example.com', 
        tags: ['Silent User'], 
        status: 'silent', 
        lastContact: '2023-11-15', 
        totalEmails: 0,
        createdAt: '2023-11-10T10:30:00Z',
        updatedAt: '2023-11-15T14:00:00Z'
      }
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

  // Tag Management Functions
  const handleCreateTag = () => {
    if (!newTag.name.trim()) {
      toast.error('Please enter a tag name')
      return
    }

    const tagExists = availableTags.some(tag => tag.name.toLowerCase() === newTag.name.toLowerCase())
    if (tagExists) {
      toast.error('Tag already exists')
      return
    }

    const newTagObj: Tag = {
      id: `tag_${Date.now()}`,
      name: newTag.name,
      color: newTag.color,
      count: 0,
      createdAt: new Date().toISOString()
    }

    setAvailableTags(prev => [...prev, newTagObj])
    setNewTag({ name: '', color: 'blue' })
    toast.success('Tag created successfully')
  }

  const handleDeleteTag = (tagId: string) => {
    const tag = availableTags.find(t => t.id === tagId)
    if (!tag) return

    // Remove tag from all contacts
    setContacts(prev => prev.map(contact => ({
      ...contact,
      tags: contact.tags.filter(tagName => tagName !== tag.name)
    })))

    setAvailableTags(prev => prev.filter(t => t.id !== tagId))
    toast.success('Tag deleted successfully')
  }

  // Contact Management Functions
  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
    setNewContact({
      name: contact.name,
      email: contact.email,
      tags: contact.tags,
      customFields: contact.customFields || {}
    })
    setShowAddContactModal(true)
  }

  const handleUpdateContact = async () => {
    if (!editingContact || !newContact.name || !newContact.email) {
      toast.error('Please fill in name and email')
      return
    }

    setEditing(true)
    try {
      const updatedContact: Contact = {
        ...editingContact,
        name: newContact.name,
        email: newContact.email,
        tags: newContact.tags,
        customFields: newContact.customFields,
        updatedAt: new Date().toISOString()
      }

      setContacts(prev => prev.map(c => c.id === editingContact.id ? updatedContact : c))
      updateTagCounts(contacts.map(c => c.id === editingContact.id ? updatedContact : c))
      setEditingContact(null)
      setNewContact({ name: '', email: '', tags: [], customFields: {} })
      setShowAddContactModal(false)
      toast.success('Contact updated successfully')
    } catch (error) {
      console.error('Update contact error:', error)
      toast.error('Failed to update contact')
    } finally {
      setEditing(false)
    }
  }

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact)
    setShowContactDetails(true)
  }

  // Bulk Operations
  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    )
  }

  const handleSelectAllContacts = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map(c => c.id))
    }
  }

  const handleBulkDelete = () => {
    if (selectedContacts.length === 0) {
      toast.error('Please select contacts to delete')
      return
    }

    setContacts(prev => {
      const updated = prev.filter(c => !selectedContacts.includes(c.id))
      updateTagCounts(updated)
      return updated
    })
    setSelectedContacts([])
    setShowBulkActions(false)
    toast.success(`${selectedContacts.length} contacts deleted successfully`)
  }

  const handleBulkTagAssignment = (tagName: string) => {
    if (selectedContacts.length === 0) {
      toast.error('Please select contacts to tag')
      return
    }

    setContacts(prev => prev.map(contact => 
      selectedContacts.includes(contact.id) && !contact.tags.includes(tagName)
        ? { ...contact, tags: [...contact.tags, tagName], updatedAt: new Date().toISOString() }
        : contact
    ))
    updateTagCounts(contacts.map(contact => 
      selectedContacts.includes(contact.id) && !contact.tags.includes(tagName)
        ? { ...contact, tags: [...contact.tags, tagName] }
        : contact
    ))
    setSelectedContacts([])
    setShowBulkActions(false)
    toast.success(`Tag "${tagName}" assigned to ${selectedContacts.length} contacts`)
  }

  const handleBulkStatusChange = (status: string) => {
    if (selectedContacts.length === 0) {
      toast.error('Please select contacts to update status')
      return
    }

    setContacts(prev => prev.map(contact => 
      selectedContacts.includes(contact.id)
        ? { ...contact, status: status as any, updatedAt: new Date().toISOString() }
        : contact
    ))
    setSelectedContacts([])
    setShowBulkActions(false)
    toast.success(`Status updated for ${selectedContacts.length} contacts`)
  }

  // Export Function
  const handleExportContacts = () => {
    const exportData = filteredContacts.map(contact => ({
      Name: contact.name,
      Email: contact.email,
      Status: contact.status,
      Tags: contact.tags.join(', '),
      'Total Emails': contact.totalEmails || 0,
      'Last Contact': contact.lastContact || '',
      'Created At': new Date(contact.createdAt).toLocaleDateString(),
      'Updated At': new Date(contact.updatedAt).toLocaleDateString()
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts')
    XLSX.writeFile(workbook, `contacts_export_${new Date().toISOString().split('T')[0]}.xlsx`)
    toast.success('Contacts exported successfully')
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
      case 'unsubscribed': return 'bg-red-100 text-red-800'
      case 'bounced': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'New User'
      case 'active': return 'Active User'
      case 'silent': return 'Silent User'
      case 'unsubscribed': return 'Unsubscribed'
      case 'bounced': return 'Bounced'
      default: return 'Unknown'
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
        name: row['Name'] || row['name'] || '',
        email: row['Email'] || row['email'] || '',
        tags: row['Tags'] ? row['Tags'].split(',').map((tag: string) => tag.trim()) : ['New User'],
        status: 'new' as const,
        lastContact: new Date().toISOString().split('T')[0],
        totalEmails: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })).filter(contact => contact.name && contact.email)

      setContacts(prev => [...prev, ...importedContacts])
      updateTagCounts([...contacts, ...importedContacts])
      toast.success(`Successfully imported ${importedContacts.length} contacts`)
      setShowImportModal(false)
    } catch (error) {
      console.error('Import error:', error)
      toast.error('Import failed, please check file format')
    } finally {
      setImporting(false)
    }
  }

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.email) {
      toast.error('Please fill in name and email')
      return
    }

    setAdding(true)
    try {
      const contact: Contact = {
        id: `new_${Date.now()}`,
        name: newContact.name,
        email: newContact.email,
        tags: newContact.tags.length > 0 ? newContact.tags : ['New User'],
        status: 'new',
        lastContact: new Date().toISOString().split('T')[0],
        totalEmails: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
        
        setContacts(prev => [...prev, contact])
      updateTagCounts([...contacts, contact])
      setNewContact({ name: '', email: '', tags: [], customFields: {} })
      setShowAddContactModal(false)
        toast.success('Contact added successfully')
        } catch (error) {
      console.error('Add contact error:', error)
      toast.error('Failed to add contact')
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
    toast.success('Contact deleted successfully')
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
          <p className="mt-4 text-gray-600">Loading contacts...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
              </div>
        </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExportContacts}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DocumentArrowUpIcon className="h-4 w-4 mr-2" />
                Import
              </button>
              <button
                onClick={() => setShowTagManager(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <TagIcon className="h-4 w-4 mr-2" />
                Manage Tags
              </button>
              {selectedContacts.length > 0 && (
                <button
                  onClick={() => setShowBulkActions(true)}
                  className="inline-flex items-center px-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
                  Bulk Actions ({selectedContacts.length})
                </button>
              )}
              <button
                onClick={() => setShowAddContactModal(true)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Contact
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
              <p className="text-sm font-medium text-gray-600">Total Contacts</p>
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
                <p className="text-sm font-medium text-gray-600">Active Users</p>
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
                <p className="text-sm font-medium text-gray-600">VIP Users</p>
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
                <p className="text-sm font-medium text-gray-600">New Users</p>
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
                placeholder="Search contacts..."
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
                <option value="all">All Status</option>
                <option value="new">New User</option>
                <option value="active">Active User</option>
                <option value="silent">Silent User</option>
                <option value="unsubscribed">Unsubscribed</option>
                <option value="bounced">Bounced</option>
            </select>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Filter by tags:</p>
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
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Contact List ({filteredContacts.length})
              </h3>
              {filteredContacts.length > 0 && (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedContacts.length === filteredContacts.length}
                    onChange={handleSelectAllContacts}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Select All</span>
                </label>
              )}
            </div>
            {selectedContacts.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{selectedContacts.length} selected</span>
                <button
                  onClick={() => setSelectedContacts([])}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear Selection
                </button>
              </div>
            )}
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
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => handleSelectContact(contact.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
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
                      Emails: {contact.totalEmails || 0}
                    </span>
                    <button 
                      onClick={() => handleViewContact(contact)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View Details"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleEditContact(contact)}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      title="Edit Contact"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Contact"
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
                <h3 className="text-lg font-semibold text-gray-900">Import Contacts</h3>
              <button
                  onClick={() => setShowImportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
              >
                  <XMarkIcon className="h-6 w-6" />
              </button>
          </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Supports Excel (.xlsx) and CSV files. Please ensure the file contains "Name" and "Email" columns.
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
                  {importing ? 'Importing...' : 'Select File'}
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
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingContact ? 'Edit Contact' : 'Add Contact'}
                </h3>
              <button
                  onClick={() => {
                    setShowAddContactModal(false)
                    setEditingContact(null)
                    setNewContact({ name: '', email: '', tags: [], customFields: {} })
                  }}
                  className="text-gray-400 hover:text-gray-600"
              >
                  <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
              
              <div className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newContact.name}
                    onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter name"
                />
              </div>
              
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newContact.email}
                    onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email"
                />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
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
                  onClick={editingContact ? handleUpdateContact : handleAddContact}
                  disabled={adding || editing}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
                >
                  {adding ? 'Adding...' : editing ? 'Updating...' : editingContact ? 'Update Contact' : 'Add Contact'}
              </button>
            </div>
            </motion.div>
          </motion.div>
      )}
      </AnimatePresence>

      {/* Tag Manager Modal */}
      <AnimatePresence>
        {showTagManager && (
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
              className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Manage Tags</h3>
                <button
                  onClick={() => setShowTagManager(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Create New Tag */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-3">Create New Tag</h4>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newTag.name}
                    onChange={(e) => setNewTag(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Tag name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={newTag.color}
                    onChange={(e) => setNewTag(prev => ({ ...prev, color: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="yellow">Yellow</option>
                    <option value="red">Red</option>
                    <option value="gray">Gray</option>
                  </select>
                  <button
                    onClick={handleCreateTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create
                  </button>
                </div>
              </div>

              {/* Existing Tags */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Existing Tags</h4>
                <div className="space-y-2">
                  {availableTags.map((tag) => (
                    <div key={tag.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag.name)}`}>
                          {tag.name}
                        </span>
                        <span className="text-sm text-gray-500">({tag.count} contacts)</span>
                      </div>
                      <button
                        onClick={() => handleDeleteTag(tag.id)}
                        className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        title="Delete Tag"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Actions Modal */}
      <AnimatePresence>
        {showBulkActions && (
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
                <h3 className="text-lg font-semibold text-gray-900">
                  Bulk Actions ({selectedContacts.length} contacts)
                </h3>
                <button
                  onClick={() => setShowBulkActions(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBulkDelete}
                  className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete Selected
                </button>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Assign Tag:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => handleBulkTagAssignment(tag.name)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${getTagColor(tag.name)}`}
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Change Status:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['new', 'active', 'silent', 'unsubscribed', 'bounced'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleBulkStatusChange(status)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${getStatusColor(status)}`}
                      >
                        {getStatusText(status)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Details Modal */}
      <AnimatePresence>
        {showContactDetails && selectedContact && (
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
              className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
                <button
                  onClick={() => setShowContactDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-medium">
                      {selectedContact.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gray-900">{selectedContact.name}</h4>
                    <p className="text-gray-600">{selectedContact.email}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedContact.status)}`}>
                      {getStatusText(selectedContact.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Total Emails</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedContact.totalEmails || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Last Contact</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedContact.lastContact || 'Never'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Created</p>
                    <p className="text-lg font-semibold text-gray-900">{new Date(selectedContact.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Updated</p>
                    <p className="text-lg font-semibold text-gray-900">{new Date(selectedContact.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedContact.tags.map((tag) => (
                      <span key={tag} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowContactDetails(false)
                      handleEditContact(selectedContact)
                    }}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit Contact
                  </button>
                  <button
                    onClick={() => {
                      setShowContactDetails(false)
                      handleDeleteContact(selectedContact.id)
                    }}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete Contact
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}