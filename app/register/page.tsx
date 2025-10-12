'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { SparklesIcon, EyeIcon, EyeSlashIcon, CheckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

type Step = 'form' | 'verify'

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('form')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    company: '',
    acceptTerms: false
  })
  const [verificationCode, setVerificationCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSendVerification = async () => {
    setIsLoading(true)

    try {
      // Basic validation
      if (!formData.email) {
        toast.error('Please enter your email address')
        return
      }

      // 调用真实的验证码发送API
      const response = await fetch('https://novamail.world/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Verification code sent! Please check your email.')
        setStep('verify')
        // 在开发环境中显示验证码（仅用于测试）
        if (result.code) {
          console.log('Verification code for testing:', result.code)
        }
      } else {
        toast.error(result.error || 'Failed to send verification code')
      }
    } catch (error: any) {
      console.error('Send verification error:', error)
      toast.error(error.message || 'Failed to send verification code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyAndRegister = async () => {
    setIsLoading(true)

    try {
      // Verify verification code
      if (!verificationCode || verificationCode.length !== 6) {
        toast.error('Please enter a valid 6-digit verification code')
        return
      }

      // 调用真实的验证码验证API
      const response = await fetch('https://novamail.world/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: verificationCode,
          firstName: formData.firstName,
          lastName: formData.lastName
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Account created successfully!')
        // 存储用户信息到本地存储
        localStorage.setItem('user-email', formData.email)
        localStorage.setItem('user-name', `${formData.firstName} ${formData.lastName}`)
        localStorage.setItem('user-token', result.user.token)
        localStorage.setItem('user-id', result.user.id)
        router.push('/dashboard')
      } else {
        toast.error(result.error || 'Invalid verification code')
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)

    try {
      // 调用真实的验证码发送API
      const response = await fetch('https://novamail.world/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('New verification code sent!')
        // 在开发环境中显示验证码（仅用于测试）
        if (result.code) {
          console.log('New verification code for testing:', result.code)
        }
      } else {
        toast.error(result.error || 'Failed to resend verification code')
      }
    } catch (error: any) {
      console.error('Resend verification error:', error)
      toast.error(error.message || 'Failed to resend verification code')
    } finally {
      setIsResending(false)
    }
  }

  // Verification page
  if (step === 'verify') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50/30 via-transparent to-blue-50/20 relative overflow-hidden backdrop-blur-sm">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main floating blobs */}
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/60 to-primary-300/40 rounded-full mix-blend-multiply filter blur-2xl opacity-80 backdrop-blur-sm"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/60 to-purple-300/40 rounded-full mix-blend-multiply filter blur-2xl opacity-80 backdrop-blur-sm"
            animate={{
              scale: [1.3, 1, 1.3],
              rotate: [360, 180, 0],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-primary-300 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                scale: [1, 1.5, 1],
                opacity: [0.6, 0.1, 0.6],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
          <div className="max-w-md w-full space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mx-auto h-12 w-12 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mb-6"
              >
                <motion.svg 
                  className="h-7 w-7 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </motion.svg>
              </motion.div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Verify Your Email
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We've sent a 6-digit verification code to <strong>{formData.email}</strong>
              </p>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-green-100/80 backdrop-blur-sm border border-green-400/50 text-green-800 rounded-xl"
              >
                <p className="text-sm">
                  <strong>Check your email:</strong> We've sent a 6-digit verification code to your email address.
                </p>
              </motion.div>
            </motion.div>

            <div className="mt-8 space-y-6">
              <div className="bg-white/20 backdrop-blur-md py-10 px-8 shadow-2xl rounded-2xl border border-white/30">
                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-800 mb-2">
                    Verification Code
                  </label>
                  <input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    maxLength={6}
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-center text-2xl font-mono tracking-widest placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300"
                    placeholder="000000"
                    autoComplete="one-time-code"
                  />
                </div>

                <div className="space-y-3 mt-6">
                  <button
                    type="button"
                    onClick={handleVerifyAndRegister}
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 via-primary-700 to-purple-600 hover:from-primary-700 hover:via-primary-800 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Create Account'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  >
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Back to registration
                  </button>

                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="w-full text-sm text-primary-600 hover:text-primary-500 disabled:opacity-50 transition-colors duration-300"
                  >
                    {isResending ? 'Sending...' : "Didn't receive code? Resend"}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              Code expires in 10 minutes
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Password strength requirements
  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'Contains number', met: /\d/.test(formData.password) },
    { label: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) }
  ]

  const isPasswordValid = passwordRequirements.every(req => req.met)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/30 via-transparent to-blue-50/20 relative overflow-hidden backdrop-blur-sm">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main floating blobs */}
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/60 to-primary-300/40 rounded-full mix-blend-multiply filter blur-2xl opacity-80 backdrop-blur-sm"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/60 to-purple-300/40 rounded-full mix-blend-multiply filter blur-2xl opacity-80 backdrop-blur-sm"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-primary-300 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.5, 1],
              opacity: [0.6, 0.1, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl border-2 border-white flex items-center justify-center shadow-xl mb-8">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* Paper airplane */}
                <path d="M8 12 L16 8 L12 16 L8 12 Z" fill="white"/>
                <path d="M12 16 L16 8 L20 12 L12 16 Z" fill="white"/>
                {/* Speed lines */}
                <line x1="6" y1="8" x2="4" y2="6" stroke="white" strokeWidth="1.5" opacity="0.8"/>
                <line x1="6" y1="10" x2="4" y2="8" stroke="white" strokeWidth="1.5" opacity="0.6"/>
                <line x1="6" y1="12" x2="4" y2="10" stroke="white" strokeWidth="1.5" opacity="0.4"/>
                {/* Star */}
                <path d="M4 4 L5 5 L4 6 L3 5 Z" fill="white" opacity="0.9"/>
                <path d="M4 4 L4 6 L2 5 L6 5 Z" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join NovaMail and start your email marketing journey
            </p>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => { e.preventDefault(); handleSendVerification() }}
          >
            <div className="bg-white/20 backdrop-blur-md py-10 px-8 shadow-2xl rounded-2xl border border-white/30">
              <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-800 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-800 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300"
                  placeholder="Create a strong password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              
              {formData.password && (
                <div className="mt-2 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className={`flex items-center text-sm ${req.met ? 'text-green-600' : 'text-red-500'}`}>
                      <CheckIcon className={`mr-2 h-4 w-4 ${req.met ? 'text-green-500' : 'text-red-400'}`} />
                      {req.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-800 mb-2">
                Company (Optional)
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-300"
                placeholder="Acme Inc."
              />
            </div>
            </div>

            <div className="flex items-center mt-6">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-white/40 rounded bg-white/30 backdrop-blur-sm"
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-800">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-500 transition-colors duration-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-500 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading || !formData.acceptTerms || !isPasswordValid || !formData.email || !formData.firstName || !formData.lastName}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 via-primary-700 to-purple-600 hover:from-primary-700 hover:via-primary-800 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl"
              >
                {isLoading ? 'Sending verification code...' : 'Send Verification Code'}
              </button>
            </div>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-700">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-300">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}