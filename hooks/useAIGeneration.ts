import { useState, useCallback } from 'react'
import config from '@/lib/config'

interface UserCredits {
  credits: number
  isPremium: boolean
  creditsUsed: number
  creditsLimit: number
}

interface AIGenerationResult {
  success: boolean
  data?: any
  error?: string
  creditsRemaining?: number
}

export function useAIGeneration() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showCreditsModal, setShowCreditsModal] = useState(false)
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null)

  // Check if user has enough credits
  const checkCredits = useCallback(async (): Promise<boolean> => {
    try {
      const userEmail = localStorage.getItem('user-email')
      if (!userEmail) {
        return false
      }

      const response = await fetch(config.getApiUrl(`/api/user/status?email=${encodeURIComponent(userEmail)}`))
      
      if (response.ok) {
        const data = await response.json()
        const credits = {
          credits: data.credits || config.credits.freeMonthly,
          isPremium: data.isPremium || false,
          creditsUsed: data.creditsUsed || 0,
          creditsLimit: data.isPremium ? config.credits.premiumMonthly : config.credits.freeMonthly
        }
        
        setUserCredits(credits)
        
        // Check if has enough credits (3 credits per generation)
        return credits.credits >= config.credits.costPerGeneration
      }
      
      return false
    } catch (error) {
      console.error('Failed to check credits:', error)
      return false
    }
  }, [])

  // Generate email with AI
  const generateEmail = useCallback(async (prompt: string): Promise<AIGenerationResult> => {
    setIsGenerating(true)

    try {
      // First check credits
      const hasCredits = await checkCredits()
      
      if (!hasCredits) {
        setShowCreditsModal(true)
        setIsGenerating(false)
        return {
          success: false,
          error: 'Insufficient credits. Please upgrade to continue using AI generation.'
        }
      }

      // Call AI generation API
      const userEmail = localStorage.getItem('user-email')
      const userToken = localStorage.getItem('user-token')

      const response = await fetch(config.getApiUrl(config.api.email.generate), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          prompt,
          email: userEmail
        })
      })

      const result = await response.json()

      if (result.success) {
        // Update local credits
        if (userCredits) {
          setUserCredits({
            ...userCredits,
            credits: userCredits.credits - config.credits.costPerGeneration,
            creditsUsed: userCredits.creditsUsed + config.credits.costPerGeneration
          })
        }

        return {
          success: true,
          data: result.data,
          creditsRemaining: result.creditsRemaining
        }
      } else {
        return {
          success: false,
          error: result.error || 'AI generation failed'
        }
      }
    } catch (error: any) {
      console.error('AI generation error:', error)
      return {
        success: false,
        error: error.message || 'Failed to generate email'
      }
    } finally {
      setIsGenerating(false)
    }
  }, [checkCredits, userCredits])

  // Show credits modal before generation
  const promptForGeneration = useCallback(async (prompt: string): Promise<AIGenerationResult | null> => {
    const hasCredits = await checkCredits()
    
    if (!hasCredits) {
      setShowCreditsModal(true)
      return null
    }

    // Show modal to confirm
    setShowCreditsModal(true)
    return null
  }, [checkCredits])

  return {
    isGenerating,
    showCreditsModal,
    setShowCreditsModal,
    userCredits,
    checkCredits,
    generateEmail,
    promptForGeneration
  }
}

