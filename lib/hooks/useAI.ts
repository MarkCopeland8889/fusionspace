import { useState, useCallback } from 'react'
import { useFusionSpaceStore } from '../store'
import toast from 'react-hot-toast'

interface AIGenerationOptions {
  type: 'project' | 'code' | 'logo' | 'content'
  data: any
  onSuccess?: (result: any) => void
  onError?: (error: string) => void
}

export const useAI = () => {
  const {
    ai,
    user,
    setGenerating,
    setCurrentRequest,
    setLastResponse,
    setAIError,
    addTokensUsed,
    addCost,
    useCredits,
    addMessage,
    setTyping,
  } = useFusionSpaceStore()

  const [isLoading, setIsLoading] = useState(false)

  const checkCredits = useCallback(() => {
    const { daily, monthly, dailyLimit, monthlyLimit } = user.credits
    
    if (daily >= dailyLimit) {
      throw new Error('Daily credit limit reached. Please upgrade your plan or wait until tomorrow.')
    }
    
    if (monthly >= monthlyLimit) {
      throw new Error('Monthly credit limit reached. Please upgrade your plan.')
    }
    
    return true
  }, [user.credits])

  const generate = useCallback(async (options: AIGenerationOptions) => {
    const { type, data, onSuccess, onError } = options

    try {
      // Check credits
      checkCredits()

      // Set loading states
      setIsLoading(true)
      setGenerating(true)
      setCurrentRequest(data.prompt || 'Processing...')
      setAIError(null)

      // Add user message to chat
      addMessage({
        role: 'user',
        content: data.prompt || `Generate ${type}`,
        type: 'text',
      })

      // Set typing indicator
      setTyping(true)

      // Make API request
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          ...data,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'AI generation failed')
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'AI generation failed')
      }

      // Update state
      setLastResponse(result.data)
      addTokensUsed(result.tokens || 0)
      addCost(result.cost || 0)
      useCredits(1) // Use 1 credit per request

      // Add AI response to chat
      addMessage({
        role: 'assistant',
        content: result.data,
        type: type === 'code' ? 'code' : 'text',
      })

      // Success callback
      if (onSuccess) {
        onSuccess(result.data)
      }

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} generated successfully!`)

      return result.data

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      // Update error state
      setAIError(errorMessage)
      
      // Add error message to chat
      addMessage({
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}`,
        type: 'error',
      })

      // Error callback
      if (onError) {
        onError(errorMessage)
      }

      toast.error(errorMessage)
      throw error

    } finally {
      // Reset loading states
      setIsLoading(false)
      setGenerating(false)
      setCurrentRequest(null)
      setTyping(false)
    }
  }, [
    user.credits,
    checkCredits,
    setGenerating,
    setCurrentRequest,
    setAIError,
    addTokensUsed,
    addCost,
    useCredits,
    addMessage,
    setTyping,
    setLastResponse,
  ])

  const generateProject = useCallback(
    (data: {
      prompt: string
      type: 'simple' | 'advanced'
      files?: string[]
      businessType?: string
      targetAudience?: string
    }) => {
      return generate({
        type: 'project',
        data,
      })
    },
    [generate]
  )

  const generateCode = useCallback(
    (data: {
      prompt: string
      projectType: 'simple' | 'advanced'
      existingCode?: {
        html?: string
        css?: string
        javascript?: string
      }
      requirements?: string[]
    }) => {
      return generate({
        type: 'code',
        data,
      })
    },
    [generate]
  )

  const generateLogo = useCallback(
    (data: {
      businessName: string
      businessType: string
      style: 'minimal' | 'modern' | 'classic' | 'playful'
      colors?: string[]
    }) => {
      return generate({
        type: 'logo',
        data,
      })
    },
    [generate]
  )

  const generateContent = useCallback(
    (data: {
      type: 'hero' | 'about' | 'services' | 'contact' | 'testimonials'
      businessType: string
      tone: 'professional' | 'friendly' | 'casual' | 'luxury'
      length: 'short' | 'medium' | 'long'
    }) => {
      return generate({
        type: 'content',
        data,
      })
    },
    [generate]
  )

  const clearError = useCallback(() => {
    setAIError(null)
  }, [setAIError])

  return {
    // State
    isGenerating: ai.isGenerating,
    isLoading,
    currentRequest: ai.currentRequest,
    lastResponse: ai.lastResponse,
    error: ai.error,
    tokensUsed: ai.tokensUsed,
    cost: ai.cost,
    credits: user.credits,
    plan: user.plan,

    // Actions
    generate,
    generateProject,
    generateCode,
    generateLogo,
    generateContent,
    clearError,
  }
} 