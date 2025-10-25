'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  DocumentTextIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Template {
  id: string
  name: string
  description: string
  category: string
  thumbnail: string
  createdAt: string
  updatedAt: string
  isPublic: boolean
  usage: number
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'All Templates', count: 0 },
    { id: 'newsletter', name: 'Newsletter', count: 0 },
    { id: 'promotional', name: 'Promotional', count: 0 },
    { id: 'transactional', name: 'Transactional', count: 0 },
    { id: 'welcome', name: 'Welcome', count: 0 },
    { id: 'custom', name: 'Custom', count: 0 }
  ]

  // Mock data for demonstration
  useEffect(() => {
    const mockTemplates: Template[] = [
      {
        id: '1',
        name: 'Welcome Email Template',
        description: 'A beautiful welcome email for new subscribers',
        category: 'welcome',
        thumbnail: '/api/placeholder/300/200',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        isPublic: true,
        usage: 45
      },
      {
        id: '2',
        name: 'Product Launch Announcement',
        description: 'Exciting product launch email template',
        category: 'promotional',
        thumbnail: '/api/placeholder/300/200',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18',
        isPublic: false,
        usage: 23
      },
      {
        id: '3',
        name: 'Newsletter Template',
        description: 'Weekly newsletter template with modern design',
        category: 'newsletter',
        thumbnail: '/api/placeholder/300/200',
        createdAt: '2024-01-05',
        updatedAt: '2024-01-15',
        isPublic: true,
        usage: 67
      },
      {
        id: '4',
        name: 'Order Confirmation',
        description: 'Professional order confirmation email',
        category: 'transactional',
        thumbnail: '/api/placeholder/300/200',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-12',
        isPublic: false,
        usage: 89
      }
    ]

    // Update category counts
    const updatedCategories = categories.map(category => ({
      ...category,
      count: category.id === 'all' 
        ? mockTemplates.length 
        : mockTemplates.filter(t => t.category === category.id).length
    }))

    setTemplates(mockTemplates)
    setIsLoading(false)
  }, [])

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(prev => prev.filter(t => t.id !== templateId))
      toast.success('Template deleted successfully')
    }
  }

  const handleDuplicateTemplate = (template: Template) => {
    const newTemplate: Template = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      usage: 0
    }
    setTemplates(prev => [newTemplate, ...prev])
    toast.success('Template duplicated successfully')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading templates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
              <p className="mt-2 text-gray-600">Create and manage your email templates</p>
            </div>
            <Link
              href="/dashboard/templates/designer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Template
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div> */}

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Templates Grid */}
            {filteredTemplates.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || selectedCategory !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by creating your first email template.'
                  }
                </p>
                <Link
                  href="/dashboard/templates/designer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Create Template
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    {/* Template Thumbnail */}
                    <div className="aspect-video bg-gray-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <DocumentTextIcon className="w-16 h-16 text-gray-400" />
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          template.isPublic 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.isPublic ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {template.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <EyeIcon className="w-4 h-4" />
                          <span className="text-sm">{template.usage}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {template.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <TagIcon className="w-4 h-4" />
                          <span className="capitalize">{template.category}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/dashboard/templates/designer?id=${template.id}`}
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <PencilIcon className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                        
                        <button
                          onClick={() => handleDuplicateTemplate(template)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                          title="Duplicate"
                        >
                          <DocumentTextIcon className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="px-3 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
