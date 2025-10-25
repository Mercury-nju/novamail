'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface DragItem {
  id: string
  type: string
  content: any
  x: number
  y: number
  width: number
  height: number
}

interface TemplateDesigner {
  id: string
  name: string
  content: DragItem[]
  globalStyles: {
    backgroundColor: string
    contentWidth: number
    alignment: 'left' | 'center' | 'right'
    underlineLinks: boolean
    responsiveDesign: boolean
    padding: number
  }
}

export default function TemplateDesignerPage() {
  const [template, setTemplate] = useState<TemplateDesigner>({
    id: 'new-template',
    name: 'Empty template',
    content: [],
    globalStyles: {
      backgroundColor: '#f6f6f6',
      contentWidth: 600,
      alignment: 'center',
      underlineLinks: true,
      responsiveDesign: true,
      padding: 20
    }
  })
  
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [showGlobalStyles, setShowGlobalStyles] = useState(true)
  const canvasRef = useRef<HTMLDivElement>(null)

  const dragItems = [
    { id: 'layout', type: 'layout', icon: Square3Stack3DIcon, label: 'Layout' },
    { id: 'image', type: 'image', icon: PhotoIcon, label: 'Image' },
    { id: 'text', type: 'text', icon: DocumentTextIcon, label: 'Text' },
    { id: 'button', type: 'button', icon: CursorArrowRaysIcon, label: 'Button' },
    { id: 'divider', type: 'divider', icon: Bars3Icon, label: 'Divider' },
    { id: 'social', type: 'social', icon: LinkIcon, label: 'Social' },
    { id: 'menu', type: 'menu', icon: Bars3Icon, label: 'Menu' },
    { id: 'html', type: 'html', icon: CodeBracketIcon, label: 'HTML' },
    { id: 'calendar', type: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { id: 'video', type: 'video', icon: PlayIcon, label: 'Video' },
    { id: 'spacer', type: 'spacer', icon: Square3Stack3DIcon, label: 'Spacer' },
    { id: 'footer', type: 'footer', icon: Square3Stack3DIcon, label: 'Footer' },
    { id: 'header', type: 'header', icon: Square3Stack3DIcon, label: 'Header' },
    { id: 'product', type: 'product', icon: ShoppingCartIcon, label: 'Product' },
    { id: 'countdown', type: 'countdown', icon: ClockIcon, label: 'Countdown' },
    { id: 'amp', type: 'amp', icon: CodeBracketIcon, label: 'AMP' }
  ]

  const handleDragStart = (e: React.DragEvent, item: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const data = JSON.parse(e.dataTransfer.getData('application/json'))
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newItem: DragItem = {
      id: `${data.type}-${Date.now()}`,
      type: data.type,
      content: getDefaultContent(data.type),
      x,
      y,
      width: getDefaultWidth(data.type),
      height: getDefaultHeight(data.type)
    }

    setTemplate(prev => ({
      ...prev,
      content: [...prev.content, newItem]
    }))

    toast.success(`${data.label} added to template`)
  }

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'text':
        return { text: 'Your text here', fontSize: 16, color: '#000000' }
      case 'image':
        return { src: '', alt: 'Image', width: 300, height: 200 }
      case 'button':
        return { text: 'Click me', url: '#', backgroundColor: '#007bff', color: '#ffffff' }
      case 'divider':
        return { color: '#cccccc', height: 1 }
      case 'social':
        return { platforms: ['facebook', 'twitter', 'instagram'] }
      case 'spacer':
        return { height: 20 }
      default:
        return {}
    }
  }

  const getDefaultWidth = (type: string) => {
    switch (type) {
      case 'image':
        return 300
      case 'button':
        return 150
      case 'divider':
        return 100
      default:
        return 200
    }
  }

  const getDefaultHeight = (type: string) => {
    switch (type) {
      case 'image':
        return 200
      case 'button':
        return 40
      case 'divider':
        return 1
      case 'spacer':
        return 20
      default:
        return 50
    }
  }

  const handleItemClick = (itemId: string) => {
    setSelectedItem(selectedItem === itemId ? null : itemId)
  }

  const updateItemContent = (itemId: string, content: any) => {
    setTemplate(prev => ({
      ...prev,
      content: prev.content.map(item => 
        item.id === itemId ? { ...item, content: { ...item.content, ...content } } : item
      )
    }))
  }

  const deleteItem = (itemId: string) => {
    setTemplate(prev => ({
      ...prev,
      content: prev.content.filter(item => item.id !== itemId)
    }))
    setSelectedItem(null)
    toast.success('Item deleted')
  }

  const updateGlobalStyles = (styles: Partial<TemplateDesigner['globalStyles']>) => {
    setTemplate(prev => ({
      ...prev,
      globalStyles: { ...prev.globalStyles, ...styles }
    }))
  }

  const exportTemplate = () => {
    const html = generateHTML(template)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${template.name}.html`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Template exported successfully')
  }

  const generateHTML = (template: TemplateDesigner) => {
    const { globalStyles, content } = template
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name}</title>
    <style>
        body { margin: 0; padding: 0; background-color: ${globalStyles.backgroundColor}; }
        .email-container { 
            max-width: ${globalStyles.contentWidth}px; 
            margin: 0 auto; 
            background: white; 
            padding: ${globalStyles.padding}px;
        }
        .email-item { 
            margin: 10px 0; 
            text-align: ${globalStyles.alignment};
        }
        ${globalStyles.underlineLinks ? 'a { text-decoration: underline; }' : ''}
        @media (max-width: 600px) {
            .email-container { padding: 10px; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        ${content.map(item => generateItemHTML(item)).join('')}
    </div>
</body>
</html>`
  }

  const generateItemHTML = (item: DragItem) => {
    switch (item.type) {
      case 'text':
        return `<div class="email-item" style="font-size: ${item.content.fontSize}px; color: ${item.content.color};">${item.content.text}</div>`
      case 'image':
        return `<div class="email-item"><img src="${item.content.src}" alt="${item.content.alt}" style="max-width: 100%; height: auto;" /></div>`
      case 'button':
        return `<div class="email-item"><a href="${item.content.url}" style="background-color: ${item.content.backgroundColor}; color: ${item.content.color}; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">${item.content.text}</a></div>`
      case 'divider':
        return `<div class="email-item"><hr style="border: none; border-top: ${item.content.height}px solid ${item.content.color};" /></div>`
      case 'spacer':
        return `<div class="email-item" style="height: ${item.content.height}px;"></div>`
      default:
        return `<div class="email-item">${item.type} element</div>`
    }
  }

  const selectedItemData = template.content.find(item => item.id === selectedItem)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <input 
                type="text" 
                value={template.name}
                onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
                className="border-none outline-none text-lg font-medium bg-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <CloudArrowDownIcon className="w-5 h-5" />
              <span>Import</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <ArrowPathIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <ArrowPathIcon className="w-5 h-5 rotate-180" />
              </button>
            </div>
            
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <CodeBracketIcon className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded"
            >
              Preview
            </button>
            
            <button 
              onClick={exportTemplate}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Export
            </button>
            
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setDeviceView('desktop')}
                className={`p-2 ${deviceView === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <ComputerDesktopIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setDeviceView('tablet')}
                className={`p-2 ${deviceView === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <DeviceTabletIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setDeviceView('mobile')}
                className={`p-2 ${deviceView === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <DevicePhoneMobileIcon className="w-5 h-5" />
              </button>
            </div>
            
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <QuestionMarkCircleIcon className="w-5 h-5" />
            </button>
            
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">HL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Drag Items */}
        <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
          {dragItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-move"
                title={item.label}
              >
                <Icon className="w-6 h-6" />
              </div>
            )
          })}
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex">
          <div className="flex-1 bg-gray-100 p-8 overflow-auto">
            <div 
              ref={canvasRef}
              className="bg-white mx-auto shadow-lg min-h-[600px] relative"
              style={{ 
                maxWidth: `${template.globalStyles.contentWidth}px`,
                backgroundColor: template.globalStyles.backgroundColor,
                padding: `${template.globalStyles.padding}px`
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {template.content.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">📧</div>
                    <p className="text-lg">Drop content here</p>
                    <p className="text-sm">Drag elements from the left sidebar</p>
                  </div>
                </div>
              ) : (
                template.content.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`absolute border-2 border-dashed border-blue-300 p-4 cursor-pointer ${
                      selectedItem === item.id ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-400'
                    }`}
                    style={{
                      left: item.x,
                      top: item.y,
                      width: item.width,
                      height: item.height
                    }}
                    onClick={() => handleItemClick(item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {renderItemContent(item)}
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar - Properties */}
          {showGlobalStyles && (
            <div className="w-80 bg-white border-l border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Global Styles & Layout</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      General Background Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={template.globalStyles.backgroundColor}
                        onChange={(e) => updateGlobalStyles({ backgroundColor: e.target.value })}
                        className="w-8 h-8 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        value={template.globalStyles.backgroundColor}
                        onChange={(e) => updateGlobalStyles({ backgroundColor: e.target.value })}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message Content Width
                    </label>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateGlobalStyles({ contentWidth: Math.max(300, template.globalStyles.contentWidth - 50) })}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={template.globalStyles.contentWidth}
                        onChange={(e) => updateGlobalStyles({ contentWidth: parseInt(e.target.value) })}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                      />
                      <button 
                        onClick={() => updateGlobalStyles({ contentWidth: Math.min(800, template.globalStyles.contentWidth + 50) })}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message Alignment
                    </label>
                    <div className="flex space-x-2">
                      {[
                        { value: 'left', icon: '←' },
                        { value: 'center', icon: '↔' },
                        { value: 'right', icon: '→' }
                      ].map((align) => (
                        <button
                          key={align.value}
                          onClick={() => updateGlobalStyles({ alignment: align.value as any })}
                          className={`w-10 h-10 border rounded flex items-center justify-center ${
                            template.globalStyles.alignment === align.value
                              ? 'border-blue-500 bg-blue-50 text-blue-600'
                              : 'border-gray-300'
                          }`}
                        >
                          {align.icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Underline Links</span>
                    <button
                      onClick={() => updateGlobalStyles({ underlineLinks: !template.globalStyles.underlineLinks })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        template.globalStyles.underlineLinks ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        template.globalStyles.underlineLinks ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Responsive Design</span>
                    <button
                      onClick={() => updateGlobalStyles({ responsiveDesign: !template.globalStyles.responsiveDesign })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        template.globalStyles.responsiveDesign ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        template.globalStyles.responsiveDesign ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Structure Padding on Desktop
                    </label>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateGlobalStyles({ padding: Math.max(0, template.globalStyles.padding - 5) })}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={template.globalStyles.padding}
                        onChange={(e) => updateGlobalStyles({ padding: parseInt(e.target.value) })}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                      />
                      <button 
                        onClick={() => updateGlobalStyles({ padding: template.globalStyles.padding + 5 })}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item Properties */}
              {selectedItemData && (
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold mb-4">Item Properties</h4>
                  {renderItemProperties(selectedItemData)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const renderItemContent = (item: DragItem) => {
  switch (item.type) {
    case 'text':
      return (
        <div style={{ fontSize: `${item.content.fontSize}px`, color: item.content.color }}>
          {item.content.text}
        </div>
      )
    case 'image':
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          {item.content.src ? (
            <img src={item.content.src} alt={item.content.alt} className="max-w-full max-h-full object-contain" />
          ) : (
            <div className="text-gray-500 text-center">
              <PhotoIcon className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No image</p>
            </div>
          )}
        </div>
      )
    case 'button':
      return (
        <button
          style={{
            backgroundColor: item.content.backgroundColor,
            color: item.content.color,
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {item.content.text}
        </button>
      )
    case 'divider':
      return (
        <hr style={{ border: 'none', borderTop: `${item.content.height}px solid ${item.content.color}` }} />
      )
    case 'spacer':
      return <div style={{ height: `${item.content.height}px` }} />
    default:
      return <div className="text-gray-500">{item.type}</div>
  }
}

const renderItemProperties = (item: DragItem) => {
  switch (item.type) {
    case 'text':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
            <textarea
              value={item.content.text}
              onChange={(e) => updateItemContent(item.id, { text: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
            <input
              type="number"
              value={item.content.fontSize}
              onChange={(e) => updateItemContent(item.id, { fontSize: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <input
              type="color"
              value={item.content.color}
              onChange={(e) => updateItemContent(item.id, { color: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded"
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
              value={item.content.text}
              onChange={(e) => updateItemContent(item.id, { text: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
            <input
              type="text"
              value={item.content.url}
              onChange={(e) => updateItemContent(item.id, { url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
            <input
              type="color"
              value={item.content.backgroundColor}
              onChange={(e) => updateItemContent(item.id, { backgroundColor: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
            <input
              type="color"
              value={item.content.color}
              onChange={(e) => updateItemContent(item.id, { color: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded"
            />
          </div>
        </div>
      )
    default:
      return <div className="text-gray-500">No properties available</div>
  }
}

// Helper function to update item content
const updateItemContent = (itemId: string, content: any) => {
  // This would be implemented in the parent component
  console.log('Update item content:', itemId, content)
}
