'use client'

import { useState, useEffect } from 'react'

// 支持的语言列表
export const supportedLocales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
]

// 全局状态
let currentLocale = 'en'
let currentTranslations = getHardcodedTranslations('en')
let updateCallbacks: Array<() => void> = []

// 通知所有组件更新
const notifyUpdate = () => {
  updateCallbacks.forEach(callback => callback())
}

// 翻译Hook
export const useTranslation = () => {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    // 只在客户端运行
    if (typeof window === 'undefined') return

    // 从localStorage获取保存的语言设置
    const savedLocale = localStorage.getItem('novaMail-locale') || 'en'
    currentLocale = savedLocale
    currentTranslations = getHardcodedTranslations(savedLocale)

    // 添加更新回调
    const updateCallback = () => forceUpdate({})
    updateCallbacks.push(updateCallback)

    return () => {
      updateCallbacks = updateCallbacks.filter(cb => cb !== updateCallback)
    }
  }, [])

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.')
    let value: any = currentTranslations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return fallback || key
      }
    }
    
    return typeof value === 'string' ? value : (fallback || key)
  }

  return { t, locale: currentLocale, loading: false }
}

// 语言切换函数
export const changeLanguage = (locale: string) => {
  // 只在客户端运行
  if (typeof window === 'undefined') return
  
  console.log(`Changing language to: ${locale}`)
  
  // 更新全局状态
  currentLocale = locale
  currentTranslations = getHardcodedTranslations(locale)
  
  // 保存到localStorage
  localStorage.setItem('novaMail-locale', locale)
  
  // 通知所有组件更新
  notifyUpdate()
  
  console.log(`Language changed to: ${locale}`)
}

// 硬编码的翻译
function getHardcodedTranslations(locale: string) {
  if (locale === 'zh') {
    return {
      nav: { 
        home: '首页', 
        features: '功能', 
        pricing: '价格', 
        about: '关于', 
        contact: '联系', 
        login: '登录', 
        register: '注册', 
        dashboard: '控制台' 
      },
      hero: { 
        title: 'AI驱动的邮件营销助手', 
        subtitle: '使用AI创建精美的专业邮件模板并发送给您的受众', 
        cta: '免费开始', 
        learnMore: '了解更多' 
      },
      dashboard: { 
        title: '控制台', 
        welcome: '欢迎使用NovaMail', 
        createEmail: '创建邮件',
        subtitle: 'AI驱动的专业邮件营销平台',
        professionalTemplates: '专业模板',
        contactManagement: '联系人管理',
        analytics: '数据分析',
        aiAssistant: 'AI助手',
        templateGeneration: '模板生成',
        personalizedContent: '个性化内容',
        performanceTracking: '性能跟踪'
      },
      editor: { 
        title: '邮件编辑器', 
        aiAssistant: 'AI助手', 
        chatPlaceholder: '描述您想要创建的邮件内容...', 
        saveDraft: '保存草稿' 
      },
      common: { 
        loading: '加载中...', 
        error: '错误', 
        success: '成功', 
        save: '保存', 
        cancel: '取消',
        email: '邮箱',
        password: '密码',
        alreadyHaveAccount: '已有账户？'
      }
    }
  }
  
  if (locale === 'ja') {
    return {
      nav: { 
        home: 'ホーム', 
        features: '機能', 
        pricing: '料金', 
        about: 'について', 
        contact: 'お問い合わせ', 
        login: 'ログイン', 
        register: '登録', 
        dashboard: 'ダッシュボード' 
      },
      hero: { 
        title: 'AI駆動のメールマーケティングアシスタント', 
        subtitle: 'AIを使用して美しいプロフェッショナルなメールテンプレートを作成し、オーディエンスに送信', 
        cta: '無料で始める', 
        learnMore: '詳細を見る' 
      },
      dashboard: { 
        title: 'ダッシュボード', 
        welcome: 'NovaMailへようこそ', 
        createEmail: 'メール作成',
        subtitle: 'AI駆動のプロフェッショナルメールマーケティングプラットフォーム',
        professionalTemplates: 'プロフェッショナルテンプレート',
        contactManagement: '連絡先管理',
        analytics: 'データ分析',
        aiAssistant: 'AIアシスタント',
        templateGeneration: 'テンプレート生成',
        personalizedContent: 'パーソナライズコンテンツ',
        performanceTracking: 'パフォーマンス追跡'
      },
      editor: { 
        title: 'メールエディター', 
        aiAssistant: 'AIアシスタント', 
        chatPlaceholder: '作成したいメールコンテンツを説明してください...', 
        saveDraft: '下書き保存' 
      },
      common: { 
        loading: '読み込み中...', 
        error: 'エラー', 
        success: '成功', 
        save: '保存', 
        cancel: 'キャンセル' 
      }
    }
  }
  
  if (locale === 'ko') {
    return {
      nav: { 
        home: '홈', 
        features: '기능', 
        pricing: '가격', 
        about: '소개', 
        contact: '연락처', 
        login: '로그인', 
        register: '회원가입', 
        dashboard: '대시보드' 
      },
      hero: { 
        title: 'AI 기반 이메일 마케팅 어시스턴트', 
        subtitle: 'AI를 사용하여 아름다운 전문 이메일 템플릿을 만들고 청중에게 전송', 
        cta: '무료로 시작하기', 
        learnMore: '자세히 보기' 
      },
      dashboard: { 
        title: '대시보드', 
        welcome: 'NovaMail에 오신 것을 환영합니다', 
        createEmail: '이메일 만들기',
        subtitle: 'AI 기반 전문 이메일 마케팅 플랫폼',
        professionalTemplates: '전문 템플릿',
        contactManagement: '연락처 관리',
        analytics: '데이터 분석',
        aiAssistant: 'AI 어시스턴트',
        templateGeneration: '템플릿 생성',
        personalizedContent: '개인화된 콘텐츠',
        performanceTracking: '성능 추적'
      },
      editor: { 
        title: '이메일 에디터', 
        aiAssistant: 'AI 어시스턴트', 
        chatPlaceholder: '만들고 싶은 이메일 콘텐츠를 설명해주세요...', 
        saveDraft: '초안 저장' 
      },
      common: { 
        loading: '로딩 중...', 
        error: '오류', 
        success: '성공', 
        save: '저장', 
        cancel: '취소' 
      }
    }
  }
  
  // 默认英文
  return {
    nav: { 
      home: 'Home', 
      features: 'Features', 
      pricing: 'Pricing', 
      about: 'About', 
      contact: 'Contact', 
      login: 'Login', 
      register: 'Register', 
      dashboard: 'Dashboard' 
    },
    hero: { 
      title: 'AI-Powered Email Marketing Assistant', 
      subtitle: 'Create stunning professional email templates with AI and send them to your audience', 
      cta: 'Get Started Free', 
      learnMore: 'Learn More' 
    },
    dashboard: { 
      title: 'Dashboard', 
      welcome: 'Welcome to NovaMail', 
      createEmail: 'Create Email',
      subtitle: 'AI-Powered Professional Email Marketing Platform',
      professionalTemplates: 'Professional Templates',
      contactManagement: 'Contact Management',
      analytics: 'Analytics',
      aiAssistant: 'AI Assistant',
      templateGeneration: 'Template Generation',
      personalizedContent: 'Personalized Content',
      performanceTracking: 'Performance Tracking'
    },
    editor: { 
      title: 'Email Editor', 
      aiAssistant: 'AI Assistant', 
      chatPlaceholder: 'Describe the email content you want to create...', 
      saveDraft: 'Save Draft' 
    },
  common: { 
    loading: 'Loading...', 
    error: 'Error', 
    success: 'Success', 
    save: 'Save', 
    cancel: 'Cancel',
    email: 'Email',
    password: 'Password',
    alreadyHaveAccount: 'Already have an account?'
  }
  }
}

// 自动检测并设置语言
export const useAutoLanguageDetection = () => {
  const [detecting, setDetecting] = useState(false)

  useEffect(() => {
    // 只在客户端运行
    if (typeof window === 'undefined') return
    
    const detectAndSetLanguage = async () => {
      // 检查是否已经设置过语言
      const savedLocale = localStorage.getItem('novaMail-locale')
      if (savedLocale || detecting) return
      
      setDetecting(true)
      try {
        // 获取浏览器语言
        const browserLang = navigator.language.split('-')[0]
        const supportedCodes = supportedLocales.map(l => l.code)
        
        if (supportedCodes.includes(browserLang)) {
          console.log(`Auto-switching to ${browserLang} based on browser language`)
          changeLanguage(browserLang)
        }
      } catch (error) {
        console.error('Language detection failed:', error)
      } finally {
        setDetecting(false)
      }
    }

    detectAndSetLanguage()
  }, [detecting])

  return { detecting }
}