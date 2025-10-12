'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  SparklesIcon,
  HomeIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  CreditCardIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import OnboardingTour from '@/components/OnboardingTour'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Contacts', href: '/dashboard/contacts', icon: UserGroupIcon },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: EnvelopeIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCardIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
  { name: 'Pricing', href: '/pricing', icon: CurrencyDollarIcon },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  
  // 认证状态检查
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // 用户引导状态
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const userToken = localStorage.getItem('user-token')
        const userEmail = localStorage.getItem('user-email')
        
        if (userToken && userEmail) {
          setIsAuthenticated(true)
          console.log('User authenticated:', userEmail)
          
        // 检查是否需要显示用户引导（按用户ID区分）
        const userId = localStorage.getItem('user-id') || userEmail
        const hasSeenOnboarding = localStorage.getItem(`has-seen-onboarding-${userId}`)
        console.log('Onboarding check:', { hasSeenOnboarding, userEmail, userId })
        if (!hasSeenOnboarding) {
          console.log('Showing onboarding tour for user:', userId)
          setShowOnboarding(true)
        } else {
          console.log('Onboarding already seen for user:', userId)
        }
        } else {
          setIsAuthenticated(false)
          console.log('User not authenticated, redirecting to login')
          router.push('/login')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  // 处理用户引导完成
  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    const userId = localStorage.getItem('user-id') || localStorage.getItem('user-email')
    if (userId) {
      localStorage.setItem(`has-seen-onboarding-${userId}`, 'true')
      console.log('Onboarding completed for user:', userId)
    }
  }

  // 手动触发用户引导（用于测试）
  const triggerOnboarding = () => {
    const userId = localStorage.getItem('user-id') || localStorage.getItem('user-email')
    if (userId) {
      localStorage.removeItem(`has-seen-onboarding-${userId}`)
      console.log('Manually triggering onboarding for user:', userId)
      setShowOnboarding(true)
    }
  }

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // 未认证用户重定向
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    // 清理所有认证数据
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-email')
      localStorage.removeItem('user-name')
      localStorage.removeItem('user-id')
      localStorage.removeItem('user-picture')
      localStorage.removeItem('auth-provider')
    }
    
    toast.success('Logged out successfully')
    setIsAuthenticated(false)
    router.push('/')
  }

  // 获取用户显示信息（静态导出模式）
  const getUserDisplayName = () => {
    if (typeof window !== 'undefined') {
      const userName = localStorage.getItem('user-name')
      const userEmail = localStorage.getItem('user-email')
      return userName || userEmail || 'Guest User'
    }
    return 'Guest User'
  }

  const getUserInitials = () => {
    const name = getUserDisplayName()
    if (name.includes('@')) {
      return name.charAt(0).toUpperCase()
    }
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center">
                <img 
                  src="/logo.svg" 
                  alt="NovaMail" 
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  id={`nav-link-${item.name.toLowerCase()}`}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <Link href="/dashboard" className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="NovaMail" 
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  id={`nav-link-${item.name.toLowerCase()}`}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
              <div className="flex items-center gap-x-2">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-700">{getUserInitials()}</span>
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700">{getUserDisplayName()}</span>
                <button
                  onClick={triggerOnboarding}
                  className="text-blue-400 hover:text-blue-600 text-xs px-2 py-1 rounded ml-2"
                  title="重新显示用户引导"
                >
                  引导
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* 用户引导 */}
      <OnboardingTour
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  )
}
