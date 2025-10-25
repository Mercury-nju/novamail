'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  DocumentTextIcon,
  PhotoIcon,
  CursorArrowRaysIcon,
  Bars3Icon,
  CodeBracketIcon,
  CalendarIcon,
  PlayIcon,
  Square3Stack3DIcon,
  LinkIcon,
  ShoppingCartIcon,
  ClockIcon,
  CheckIcon,
  EyeIcon,
  ArrowPathIcon,
  CloudArrowDownIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  QuestionMarkCircleIcon,
  FolderIcon,
  SparklesIcon,
  XMarkIcon,
  BookmarkIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  DocumentDuplicateIcon,
  ArrowLeftIcon,
  ShareIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { 
  TemplateDesigner, 
  TemplateElement, 
  DragItem, 
  dragItems, 
  createNewTemplateDesigner, 
  generateTemplateHTML,
  createTemplateDesignerFromProfessional
} from '@/lib/template-system'
import { professionalTemplates } from '@/lib/templates'

export default function TemplateDesignerPage() {
  const [template, setTemplate] = useState<TemplateDesigner>(createNewTemplateDesigner())
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [showTemplates, setShowTemplates] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showGlobalStyles, setShowGlobalStyles] = useState(false)
  
  const canvasRef = useRef<HTMLDivElement>(null)

  // 拖拽处理
  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const data = JSON.parse(e.dataTransfer.getData('application/json')) as DragItem

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newElement: TemplateElement = {
      id: `${data.type}-${Date.now()}`,
      type: data.type,
      content: { ...data.defaultContent },
      position: {
        x: Math.max(0, x - 10),
        y: Math.max(0, y - 10),
        width: data.defaultSize.width,
        height: data.defaultSize.height
      },
      styles: { ...data.defaultStyles }
    }

    setTemplate(prev => ({
      ...prev,
      content: [...prev.content, newElement],
      metadata: {
        ...prev.metadata,
        updatedAt: new Date().toISOString()
      }
    }))

    setSelectedItem(newElement.id)
    toast.success(`${data.name} added`)
  }

  // 保存模板
  const handleSaveTemplate = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/templates/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: template.id,
          templateData: template,
          userId: localStorage.getItem('user-id') || 'anonymous'
        })
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Template saved!')
      } else {
        toast.error(result.error || 'Failed to save template')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to save template')
    } finally {
      setIsSaving(false)
    }
  }

  // 从专业模板创建
  const handleCreateFromTemplate = (professionalTemplate: any) => {
    const newTemplate = createTemplateDesignerFromProfessional(professionalTemplate)
    setTemplate(newTemplate)
    setShowTemplates(false)
    toast.success(`Created from ${professionalTemplate.name}`)
  }

  // 元素操作
  const handleItemClick = (itemId: string) => {
    setSelectedItem(selectedItem === itemId ? null : itemId)
  }

  const updateElementContent = (elementId: string, content: any) => {
    setTemplate(prev => ({
      ...prev,
      content: prev.content.map(element =>
        element.id === elementId ? { ...element, content: { ...element.content, ...content } } : element
      ),
      metadata: {
        ...prev.metadata,
        updatedAt: new Date().toISOString()
      }
    }))
  }

  const updateElementStyles = (elementId: string, styles: any) => {
    setTemplate(prev => ({
      ...prev,
      content: prev.content.map(element =>
        element.id === elementId ? { ...element, styles: { ...element.styles, ...styles } } : element
      ),
      metadata: {
        ...prev.metadata,
        updatedAt: new Date().toISOString()
      }
    }))
  }

  const deleteElement = (elementId: string) => {
    setTemplate(prev => ({
      ...prev,
      content: prev.content.filter(element => element.id !== elementId),
      metadata: {
        ...prev.metadata,
        updatedAt: new Date().toISOString()
      }
    }))
    setSelectedItem(null)
    toast.success('Element deleted')
  }

  const duplicateElement = (elementId: string) => {
    const element = template.content.find(el => el.id === elementId)
    if (!element) return

    const newElement: TemplateElement = {
      ...element,
      id: `${element.type}-${Date.now()}`,
      position: {
        ...element.position,
        x: element.position.x + 20,
        y: element.position.y + 20
      }
    }

    setTemplate(prev => ({
      ...prev,
      content: [...prev.content, newElement],
      metadata: {
        ...prev.metadata,
        updatedAt: new Date().toISOString()
      }
    }))
    setSelectedItem(newElement.id)
    toast.success('Element duplicated')
  }

  const updateGlobalStyles = (styles: Partial<TemplateDesigner['globalStyles']>) => {
    setTemplate(prev => ({
      ...prev,
      globalStyles: { ...prev.globalStyles, ...styles }
    }))
  }

  const exportTemplate = () => {
    const html = generateTemplateHTML(template)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${template.name}.html`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Template exported')
  }

  const selectedItemData = template.content.find(item => item.id === selectedItem)

  // 渲染元素内容
  const renderElementContent = (element: TemplateElement) => {
    switch (element.type) {
      case 'text':
        const tag = element.content.level || 'p'
        return (
          <div style={element.styles}>
            {tag === 'h1' && <h1>{element.content.text}</h1>}
            {tag === 'h2' && <h2>{element.content.text}</h2>}
            {tag === 'h3' && <h3>{element.content.text}</h3>}
            {tag === 'p' && <p>{element.content.text}</p>}
            {tag === 'blockquote' && <blockquote>{element.content.text}</blockquote>}
          </div>
        )

      case 'image':
        return (
          <div style={element.styles}>
            <img
              src={element.content.src}
              alt={element.content.alt}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )

      case 'button':
        return (
          <div style={element.styles}>
            <a
              href={element.content.url}
              target={element.content.target || '_self'}
              style={{
                backgroundColor: element.styles.backgroundColor,
                color: element.styles.color,
                padding: element.styles.padding,
                borderRadius: element.styles.borderRadius,
                fontSize: element.styles.fontSize,
                fontWeight: element.styles.fontWeight,
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              {element.content.text}
            </a>
          </div>
        )

      case 'divider':
        if (element.content.type === 'dots') {
          return <div style={element.styles}>• • •</div>
        } else {
          return <hr style={element.styles} />
        }

      case 'spacer':
        return <div style={{ height: `${element.content.height}px` }} />

      case 'social':
        return (
          <div style={element.styles}>
            {element.content.platforms.map((platform: any, index: number) => (
              <a key={index} href={platform.url} style={{ margin: '0 10px', fontSize: '24px', textDecoration: 'none' }}>
                {platform.icon}
              </a>
            ))}
          </div>
        )

      case 'product':
        return (
          <div style={element.styles}>
            <img
              src={element.content.image}
              alt={element.content.title}
              style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '8px' }}
            />
            <h3 style={{ margin: '15px 0 10px 0', fontSize: '18px', color: '#1a202c' }}>
              {element.content.title}
            </h3>
            <p style={{ margin: '0 0 15px 0', color: '#4a5568', fontSize: '14px' }}>
              {element.content.description}
            </p>
            <div style={{ margin: '15px 0' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#667eea' }}>
                {element.content.price}
              </span>
            </div>
            <a
              href={element.content.buttonUrl}
              style={{
                backgroundColor: '#667eea',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-block'
              }}
            >
              {element.content.buttonText}
            </a>
          </div>
        )

      case 'countdown':
        return (
          <div style={element.styles}>
            <div style={{ marginBottom: '10px' }}>{element.content.message}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '24px' }}>
              <span>00</span>d <span>00</span>h <span>00</span>m <span>00</span>s
            </div>
          </div>
        )

      default:
        return <div style={element.styles}>{element.type} element</div>
    }
  }

  // 渲染元素属性编辑面板
  const renderElementProperties = (element: TemplateElement) => {
    switch (element.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
              <textarea
                value={element.content.text}
                onChange={(e) => updateElementContent(element.id, { text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Level</label>
              <select
                value={element.content.level}
                onChange={(e) => updateElementContent(element.id, { level: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              >
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="blockquote">Quote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
              <input
                type="number"
                value={parseInt(element.styles.fontSize) || 16}
                onChange={(e) => updateElementStyles(element.id, { fontSize: `${e.target.value}px` })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={element.styles.color || '#000000'}
                onChange={(e) => updateElementStyles(element.id, { color: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded"
              />
            </div>
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={element.content.src}
                onChange={(e) => updateElementContent(element.id, { src: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
              <input
                type="text"
                value={element.content.alt}
                onChange={(e) => updateElementContent(element.id, { alt: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                placeholder="Image description"
              />
            </div>
          </div>
        )

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={element.content.text}
                onChange={(e) => updateElementContent(element.id, { text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
              <input
                type="url"
                value={element.content.url}
                onChange={(e) => updateElementContent(element.id, { url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <input
                type="color"
                value={element.styles.backgroundColor || '#667eea'}
                onChange={(e) => updateElementStyles(element.id, { backgroundColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={element.styles.color || '#ffffff'}
                onChange={(e) => updateElementStyles(element.id, { color: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded"
              />
            </div>
          </div>
        )

      default:
        return <div className="text-gray-500">No properties available for this element type.</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 - NovaMail风格 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-lg font-bold text-blue-600">NovaMail</div>
            <ArrowLeftIcon className="w-5 h-5 text-gray-600 cursor-pointer" />
            <input
              type="text"
              value={template.name}
              onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
              className="px-3 py-1 border-none text-lg font-medium focus:outline-none"
              placeholder="New Template"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <ArrowPathIcon className="w-5 h-5 text-gray-600 cursor-pointer" />
            <ArrowPathIcon className="w-5 h-5 text-gray-600 cursor-pointer rotate-180" />
            <CodeBracketIcon className="w-5 h-5 text-gray-600 cursor-pointer" />
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-4 py-2 rounded-lg ${
                isPreviewMode ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Preview
            </button>
            <button
              onClick={exportTemplate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Export
            </button>
            <ShareIcon className="w-5 h-5 text-gray-600 cursor-pointer" />
            
            {/* 设备视图切换 */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`p-2 rounded ${deviceView === 'desktop' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                title="Desktop View"
              >
                <ComputerDesktopIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('tablet')}
                className={`p-2 rounded ${deviceView === 'tablet' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                title="Tablet View"
              >
                <DeviceTabletIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`p-2 rounded ${deviceView === 'mobile' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                title="Mobile View"
              >
                <DevicePhoneMobileIcon className="w-4 h-4" />
              </button>
            </div>
            
            <QuestionMarkCircleIcon className="w-5 h-5 text-gray-600 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">U</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* 左侧边栏 - 元素库 */}
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Elements</h3>
            <button
              onClick={() => setShowTemplates(true)}
              className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
            >
              Templates
            </button>
          </div>
          <div className="space-y-2">
            {dragItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-move hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 主画布区域 */}
        <div className="flex-1 bg-gray-100 p-8 overflow-auto">
          <div 
            ref={canvasRef}
            className={`bg-white mx-auto shadow-lg relative ${
              deviceView === 'desktop' ? 'w-[600px]' : 
              deviceView === 'tablet' ? 'w-[480px]' : 'w-[320px]'
            }`}
            style={{ 
              minHeight: '600px',
              backgroundColor: template.globalStyles.backgroundColor,
              padding: `${template.globalStyles.padding}px`
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {template.content.length === 0 ? (
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="border-2 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center p-8">
                  <div className="text-blue-400 mb-2">↓</div>
                  <p className="text-gray-500 text-sm">Drop content here</p>
                </div>
                <div className="border-2 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center p-8">
                  <div className="text-blue-400 mb-2">↓</div>
                  <p className="text-gray-500 text-sm">Drop content here</p>
                </div>
                <div className="col-span-2 border-2 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center p-8">
                  <div className="text-blue-400 mb-2">↓</div>
                  <p className="text-gray-500 text-sm">Drop content here</p>
                </div>
                <div className="border-2 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center p-8">
                  <div className="text-blue-400 mb-2">↓</div>
                  <p className="text-gray-500 text-sm">Drop content here</p>
                </div>
                <div className="border-2 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center p-8">
                  <div className="text-blue-400 mb-2">↓</div>
                  <p className="text-gray-500 text-sm">Drop content here</p>
                </div>
              </div>
            ) : (
              template.content.map((element) => (
                <motion.div
                  key={element.id}
                  className={`absolute border-2 border-dashed border-blue-300 p-2 cursor-pointer ${
                    selectedItem === element.id ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-400'
                  }`}
                  style={{
                    left: element.position.x,
                    top: element.position.y,
                    width: element.position.width,
                    height: element.position.height
                  }}
                  onClick={() => handleItemClick(element.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {renderElementContent(element)}
                  
                  {/* 元素操作按钮 */}
                  {selectedItem === element.id && (
                    <div className="absolute -top-8 left-0 flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          duplicateElement(element.id)
                        }}
                        className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
                        title="Duplicate"
                      >
                        <DocumentDuplicateIcon className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteElement(element.id)
                        }}
                        className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-red-50"
                        title="Delete"
                      >
                        <TrashIcon className="w-3 h-3 text-red-600" />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* 右侧属性面板 */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Global Styles & Layout</h3>
            <button
              onClick={() => setShowGlobalStyles(!showGlobalStyles)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={template.globalStyles.backgroundColor}
                  onChange={(e) => updateGlobalStyles({ backgroundColor: e.target.value })}
                  className="w-12 h-8 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={template.globalStyles.backgroundColor}
                  onChange={(e) => updateGlobalStyles({ backgroundColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Width</label>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => updateGlobalStyles({ contentWidth: template.globalStyles.contentWidth - 10 })}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={template.globalStyles.contentWidth}
                  onChange={(e) => updateGlobalStyles({ contentWidth: parseInt(e.target.value) })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded text-sm text-center"
                />
                <button 
                  onClick={() => updateGlobalStyles({ contentWidth: template.globalStyles.contentWidth + 10 })}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Alignment</label>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => updateGlobalStyles({ alignment: 'left' })}
                  className={`w-8 h-8 border border-gray-300 rounded flex items-center justify-center ${
                    template.globalStyles.alignment === 'left' ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                >
                  ←
                </button>
                <button 
                  onClick={() => updateGlobalStyles({ alignment: 'center' })}
                  className={`w-8 h-8 border border-gray-300 rounded flex items-center justify-center ${
                    template.globalStyles.alignment === 'center' ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                >
                  ↔
                </button>
                <button 
                  onClick={() => updateGlobalStyles({ alignment: 'right' })}
                  className={`w-8 h-8 border border-gray-300 rounded flex items-center justify-center ${
                    template.globalStyles.alignment === 'right' ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                >
                  →
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Underline Links</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={template.globalStyles.underlineLinks}
                  onChange={(e) => updateGlobalStyles({ underlineLinks: e.target.checked })}
                  className="rounded" 
                />
                <span className="text-sm text-gray-600">Underline Links</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Responsive Design</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={template.globalStyles.responsiveDesign}
                  onChange={(e) => updateGlobalStyles({ responsiveDesign: e.target.checked })}
                  className="rounded" 
                />
                <span className="text-sm text-gray-600">Responsive Design</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your email will automatically adjust for smaller screens by displaying content in a single column. 
                Side-by-side blocks will be stacked vertically.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => updateGlobalStyles({ padding: Math.max(0, template.globalStyles.padding - 5 })}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={template.globalStyles.padding}
                  onChange={(e) => updateGlobalStyles({ padding: parseInt(e.target.value) })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded text-sm text-center"
                />
                <button 
                  onClick={() => updateGlobalStyles({ padding: template.globalStyles.padding + 5 })}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 元素属性编辑 */}
          {selectedItemData && (
            <div className="border-t pt-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Element Properties</h4>
              {renderElementProperties(selectedItemData)}
            </div>
          )}
        </div>
      </div>

      {/* 专业模板选择模态框 */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Choose a Professional Template</h3>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {professionalTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleCreateFromTemplate(template)}
                  >
                    <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <DocumentTextIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{template.category}</span>
                      {template.isPopular && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}