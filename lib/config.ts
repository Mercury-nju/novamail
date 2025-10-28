/**
 * Application Configuration
 * Centralized configuration management for API endpoints and settings
 */

export const config = {
  // API Base URL - from environment variable or fallback to production URL
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://novamail-api.lihongyangnju.workers.dev',
  
  // API Endpoints
  api: {
    auth: {
      sendVerification: '/api/auth/send-verification',
      verifyCode: '/api/auth/verify-code',
      login: '/api/auth/login',
      logout: '/api/auth/logout',
      refresh: '/api/auth/refresh',
    },
    user: {
      profile: '/api/user/profile',
      updateProfile: '/api/user/update-profile',
      credits: '/api/user/credits',
    },
    email: {
      generate: '/api/ai/generate-email',
      send: '/api/campaigns/send',
      templates: '/api/templates',
    },
    subscription: {
      plans: '/api/subscription/plans',
      subscribe: '/api/subscription/subscribe',
      cancel: '/api/subscription/cancel',
      webhook: '/api/creem/webhook',
    },
  },
  
  // App Settings
  app: {
    name: 'NovaMail',
    domain: process.env.NEXT_PUBLIC_APP_DOMAIN || 'novamail.world',
    supportEmail: 'support@novamail.world',
  },
  
  // Credits Configuration
  credits: {
    freeMonthly: 10,
    costPerGeneration: 3,
    premiumMonthly: 5000,
  },
  
  // Helper function to get full API URL
  getApiUrl: (endpoint: string) => {
    const baseUrl = config.apiBaseUrl
    return `${baseUrl}${endpoint}`
  },
}

export default config

