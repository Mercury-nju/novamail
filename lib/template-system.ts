import { professionalTemplates, ProfessionalTemplate } from './templates'

// 模板设计器中的元素类型
export interface TemplateElement {
  id: string
  type: string
  content: any
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  styles: {
    [key: string]: any
  }
  locked?: boolean
  visible?: boolean
}

// 模板设计器状态
export interface TemplateDesigner {
  id: string
  name: string
  description: string
  category: string
  content: TemplateElement[]
  globalStyles: {
    backgroundColor: string
    contentWidth: number
    alignment: 'left' | 'center' | 'right'
    underlineLinks: boolean
    responsiveDesign: boolean
    padding: number
    fontFamily: string
    fontSize: number
    lineHeight: number
    textColor: string
    linkColor: string
  }
  metadata: {
    createdAt: string
    updatedAt: string
    version: number
    author: string
    isPublic: boolean
    usage: number
  }
}

// 可拖拽的元素定义
export interface DragItem {
  id: string
  type: string
  name: string
  icon: string
  category: string
  defaultContent: any
  defaultStyles: any
  defaultSize: {
    width: number
    height: number
  }
}

// 预定义的可拖拽元素
export const dragItems: DragItem[] = [
  // 布局元素
  {
    id: 'layout-1col',
    type: 'layout',
    name: 'Single Column',
    icon: '📄',
    category: 'Layout',
    defaultContent: { columns: 1 },
    defaultStyles: { padding: '20px' },
    defaultSize: { width: 600, height: 200 }
  },
  {
    id: 'layout-2col',
    type: 'layout',
    name: 'Two Columns',
    icon: '📊',
    category: 'Layout',
    defaultContent: { columns: 2 },
    defaultStyles: { padding: '20px' },
    defaultSize: { width: 600, height: 200 }
  },
  {
    id: 'layout-3col',
    type: 'layout',
    name: 'Three Columns',
    icon: '📋',
    category: 'Layout',
    defaultContent: { columns: 3 },
    defaultStyles: { padding: '20px' },
    defaultSize: { width: 600, height: 200 }
  },

  // 文本元素
  {
    id: 'text-heading',
    type: 'text',
    name: 'Heading',
    icon: '📝',
    category: 'Text',
    defaultContent: { 
      text: 'Your Heading Here',
      level: 'h1'
    },
    defaultStyles: { 
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1a202c',
      textAlign: 'left'
    },
    defaultSize: { width: 560, height: 40 }
  },
  {
    id: 'text-paragraph',
    type: 'text',
    name: 'Paragraph',
    icon: '📄',
    category: 'Text',
    defaultContent: { 
      text: 'Your paragraph text goes here. You can edit this content and customize the styling.',
      level: 'p'
    },
    defaultStyles: { 
      fontSize: '16px',
      fontWeight: 'normal',
      color: '#4a5568',
      textAlign: 'left',
      lineHeight: '1.6'
    },
    defaultSize: { width: 560, height: 60 }
  },
  {
    id: 'text-quote',
    type: 'text',
    name: 'Quote',
    icon: '💬',
    category: 'Text',
    defaultContent: { 
      text: '"This is an inspiring quote that will motivate your readers."',
      level: 'blockquote'
    },
    defaultStyles: { 
      fontSize: '18px',
      fontWeight: 'italic',
      color: '#2d3748',
      textAlign: 'center',
      fontStyle: 'italic',
      borderLeft: '4px solid #667eea',
      paddingLeft: '20px',
      backgroundColor: '#f8fafc'
    },
    defaultSize: { width: 560, height: 80 }
  },

  // 图片元素
  {
    id: 'image-single',
    type: 'image',
    name: 'Single Image',
    icon: '🖼️',
    category: 'Media',
    defaultContent: { 
      src: 'https://via.placeholder.com/400x200/667eea/ffffff?text=Your+Image',
      alt: 'Your image description',
      link: ''
    },
    defaultStyles: { 
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
      objectFit: 'cover'
    },
    defaultSize: { width: 400, height: 200 }
  },
  {
    id: 'image-gallery',
    type: 'image',
    name: 'Image Gallery',
    icon: '🖼️🖼️🖼️',
    category: 'Media',
    defaultContent: { 
      images: [
        { src: 'https://via.placeholder.com/180x120/667eea/ffffff?text=Image+1', alt: 'Image 1' },
        { src: 'https://via.placeholder.com/180x120/764ba2/ffffff?text=Image+2', alt: 'Image 2' },
        { src: 'https://via.placeholder.com/180x120/667eea/ffffff?text=Image+3', alt: 'Image 3' }
      ]
    },
    defaultStyles: { 
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px'
    },
    defaultSize: { width: 560, height: 140 }
  },

  // 按钮元素
  {
    id: 'button-primary',
    type: 'button',
    name: 'Primary Button',
    icon: '🔘',
    category: 'Interactive',
    defaultContent: { 
      text: 'Click Here',
      url: '#',
      target: '_blank'
    },
    defaultStyles: { 
      backgroundColor: '#667eea',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-block'
    },
    defaultSize: { width: 150, height: 48 }
  },
  {
    id: 'button-secondary',
    type: 'button',
    name: 'Secondary Button',
    icon: '🔘',
    category: 'Interactive',
    defaultContent: { 
      text: 'Learn More',
      url: '#',
      target: '_blank'
    },
    defaultStyles: { 
      backgroundColor: 'transparent',
      color: '#667eea',
      border: '2px solid #667eea',
      padding: '10px 22px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-block'
    },
    defaultSize: { width: 150, height: 48 }
  },

  // 分隔线元素
  {
    id: 'divider-line',
    type: 'divider',
    name: 'Line Divider',
    icon: '➖',
    category: 'Layout',
    defaultContent: { 
      type: 'line'
    },
    defaultStyles: { 
      border: 'none',
      borderTop: '1px solid #e2e8f0',
      margin: '20px 0'
    },
    defaultSize: { width: 560, height: 1 }
  },
  {
    id: 'divider-dots',
    type: 'divider',
    name: 'Dots Divider',
    icon: '⚫⚫⚫',
    category: 'Layout',
    defaultContent: { 
      type: 'dots'
    },
    defaultStyles: { 
      textAlign: 'center',
      fontSize: '20px',
      color: '#cbd5e0',
      margin: '20px 0'
    },
    defaultSize: { width: 560, height: 30 }
  },

  // 社交媒体元素
  {
    id: 'social-links',
    type: 'social',
    name: 'Social Links',
    icon: '🔗',
    category: 'Interactive',
    defaultContent: { 
      platforms: [
        { name: 'Facebook', url: '#', icon: '📘' },
        { name: 'Twitter', url: '#', icon: '🐦' },
        { name: 'Instagram', url: '#', icon: '📷' },
        { name: 'LinkedIn', url: '#', icon: '💼' }
      ]
    },
    defaultStyles: { 
      textAlign: 'center',
      fontSize: '24px',
      gap: '20px'
    },
    defaultSize: { width: 300, height: 40 }
  },

  // 产品展示元素
  {
    id: 'product-card',
    type: 'product',
    name: 'Product Card',
    icon: '🛍️',
    category: 'E-commerce',
    defaultContent: { 
      title: 'Product Name',
      description: 'Product description goes here',
      price: '$99.99',
      image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=Product',
      buttonText: 'Buy Now',
      buttonUrl: '#'
    },
    defaultStyles: { 
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center'
    },
    defaultSize: { width: 250, height: 350 }
  },

  // 倒计时元素
  {
    id: 'countdown-timer',
    type: 'countdown',
    name: 'Countdown Timer',
    icon: '⏰',
    category: 'Interactive',
    defaultContent: { 
      endDate: '2024-12-31T23:59:59',
      message: 'Sale ends in:',
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true
    },
    defaultStyles: { 
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#e53e3e',
      backgroundColor: '#fed7d7',
      padding: '15px',
      borderRadius: '8px'
    },
    defaultSize: { width: 400, height: 80 }
  },

  // 间距元素
  {
    id: 'spacer-small',
    type: 'spacer',
    name: 'Small Spacer',
    icon: '📏',
    category: 'Layout',
    defaultContent: { 
      height: 20
    },
    defaultStyles: { 
      height: '20px'
    },
    defaultSize: { width: 560, height: 20 }
  },
  {
    id: 'spacer-medium',
    type: 'spacer',
    name: 'Medium Spacer',
    icon: '📏',
    category: 'Layout',
    defaultContent: { 
      height: 40
    },
    defaultStyles: { 
      height: '40px'
    },
    defaultSize: { width: 560, height: 40 }
  },
  {
    id: 'spacer-large',
    type: 'spacer',
    name: 'Large Spacer',
    icon: '📏',
    category: 'Layout',
    defaultContent: { 
      height: 60
    },
    defaultStyles: { 
      height: '60px'
    },
    defaultSize: { width: 560, height: 60 }
  }
]

// 将专业模板转换为设计器元素
export function convertProfessionalTemplateToElements(template: ProfessionalTemplate): TemplateElement[] {
  const elements: TemplateElement[] = []
  
  // 解析HTML内容并转换为元素
  // 这里需要根据具体的HTML结构来解析
  // 为了简化，我们创建一个基础的文本元素
  elements.push({
    id: `element-${Date.now()}-1`,
    type: 'text',
    content: {
      text: template.subject,
      level: 'h1'
    },
    position: {
      x: 20,
      y: 20,
      width: 560,
      height: 60
    },
    styles: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1a202c',
      textAlign: 'center'
    }
  })

  elements.push({
    id: `element-${Date.now()}-2`,
    type: 'text',
    content: {
      text: template.description,
      level: 'p'
    },
    position: {
      x: 20,
      y: 100,
      width: 560,
      height: 80
    },
    styles: {
      fontSize: '16px',
      color: '#4a5568',
      textAlign: 'center',
      lineHeight: '1.6'
    }
  })

  return elements
}

// 生成HTML内容
export function generateTemplateHTML(designer: TemplateDesigner): string {
  const { globalStyles, content } = designer
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${designer.name}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: ${globalStyles.backgroundColor};
            font-family: ${globalStyles.fontFamily};
            font-size: ${globalStyles.fontSize}px;
            line-height: ${globalStyles.lineHeight};
        }
        .email-container {
            max-width: ${globalStyles.contentWidth}px;
            margin: 0 auto;
            background: white;
            padding: ${globalStyles.padding}px;
        }
        .email-element {
            position: relative;
            margin: 10px 0;
            text-align: ${globalStyles.alignment};
        }
        ${globalStyles.underlineLinks ? 'a { text-decoration: underline; }' : 'a { text-decoration: none; }'}
        
        @media (max-width: 600px) {
            .email-container {
                padding: 10px;
            }
            .email-element {
                margin: 5px 0;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        ${content.map(element => generateElementHTML(element)).join('')}
    </div>
</body>
</html>`

  return html
}

// 生成单个元素的HTML
export function generateElementHTML(element: TemplateElement): string {
  const { type, content, styles } = element
  
  switch (type) {
    case 'text':
      const tag = content.level || 'p'
      return `<div class="email-element" style="${generateInlineStyles(styles)}">
        <${tag}>${content.text}</${tag}>
      </div>`
      
    case 'image':
      return `<div class="email-element" style="${generateInlineStyles(styles)}">
        <img src="${content.src}" alt="${content.alt}" style="max-width: 100%; height: auto;" />
      </div>`
      
    case 'button':
      return `<div class="email-element" style="${generateInlineStyles(styles)}">
        <a href="${content.url}" target="${content.target || '_self'}" style="
          background-color: ${styles.backgroundColor};
          color: ${styles.color};
          padding: ${styles.padding};
          border-radius: ${styles.borderRadius};
          font-size: ${styles.fontSize};
          font-weight: ${styles.fontWeight};
          text-decoration: none;
          display: inline-block;
        ">${content.text}</a>
      </div>`
      
    case 'divider':
      if (content.type === 'dots') {
        return `<div class="email-element" style="${generateInlineStyles(styles)}">
          • • •
        </div>`
      } else {
        return `<div class="email-element" style="${generateInlineStyles(styles)}">
          <hr style="border: none; border-top: 1px solid #e2e8f0;" />
        </div>`
      }
      
    case 'spacer':
      return `<div class="email-element" style="height: ${content.height}px;"></div>`
      
    case 'social':
      return `<div class="email-element" style="${generateInlineStyles(styles)}">
        ${content.platforms.map((platform: any) => 
          `<a href="${platform.url}" style="margin: 0 10px; font-size: 24px; text-decoration: none;">${platform.icon}</a>`
        ).join('')}
      </div>`
      
    case 'product':
      return `<div class="email-element" style="${generateInlineStyles(styles)}">
        <img src="${content.image}" alt="${content.title}" style="width: 100%; max-width: 200px; height: auto; border-radius: 8px;" />
        <h3 style="margin: 15px 0 10px 0; font-size: 18px; color: #1a202c;">${content.title}</h3>
        <p style="margin: 0 0 15px 0; color: #4a5568; font-size: 14px;">${content.description}</p>
        <div style="margin: 15px 0;">
          <span style="font-size: 20px; font-weight: bold; color: #667eea;">${content.price}</span>
        </div>
        <a href="${content.buttonUrl}" style="
          background-color: #667eea;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
        ">${content.buttonText}</a>
      </div>`
      
    case 'countdown':
      return `<div class="email-element" style="${generateInlineStyles(styles)}">
        <div style="margin-bottom: 10px;">${content.message}</div>
        <div id="countdown-${element.id}" style="font-family: monospace; font-size: 24px;">
          <span id="days">00</span>d 
          <span id="hours">00</span>h 
          <span id="minutes">00</span>m 
          <span id="seconds">00</span>s
        </div>
        <script>
          (function() {
            const endDate = new Date('${content.endDate}').getTime();
            const countdown = document.getElementById('countdown-${element.id}');
            
            function updateCountdown() {
              const now = new Date().getTime();
              const distance = endDate - now;
              
              if (distance < 0) {
                countdown.innerHTML = 'EXPIRED';
                return;
              }
              
              const days = Math.floor(distance / (1000 * 60 * 60 * 24));
              const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((distance % (1000 * 60)) / 1000);
              
              countdown.innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
            }
            
            updateCountdown();
            setInterval(updateCountdown, 1000);
          })();
        </script>
      </div>`
      
    default:
      return `<div class="email-element" style="${generateInlineStyles(styles)}">
        ${type} element
      </div>`
  }
}

// 生成内联样式
export function generateInlineStyles(styles: any): string {
  return Object.entries(styles)
    .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
    .join('; ')
}

// 创建新的模板设计器
export function createNewTemplateDesigner(name: string = 'Untitled Template'): TemplateDesigner {
  return {
    id: `template-${Date.now()}`,
    name,
    description: '',
    category: 'custom',
    content: [],
    globalStyles: {
      backgroundColor: '#f6f6f6',
      contentWidth: 600,
      alignment: 'center',
      underlineLinks: true,
      responsiveDesign: true,
      padding: 20,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: 16,
      lineHeight: 1.6,
      textColor: '#333333',
      linkColor: '#0066cc'
    },
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      author: '',
      isPublic: false,
      usage: 0
    }
  }
}

// 从专业模板创建设计器
export function createTemplateDesignerFromProfessional(template: ProfessionalTemplate): TemplateDesigner {
  const elements = convertProfessionalTemplateToElements(template)
  
  return {
    id: `template-${Date.now()}`,
    name: `${template.name} (Copy)`,
    description: template.description,
    category: template.category.toLowerCase(),
    content: elements,
    globalStyles: {
      backgroundColor: '#f6f6f6',
      contentWidth: 600,
      alignment: 'center',
      underlineLinks: true,
      responsiveDesign: true,
      padding: 20,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: 16,
      lineHeight: 1.6,
      textColor: '#333333',
      linkColor: '#0066cc'
    },
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      author: '',
      isPublic: false,
      usage: 0
    }
  }
}
