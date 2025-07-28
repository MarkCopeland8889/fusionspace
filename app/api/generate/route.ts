import { NextRequest, NextResponse } from 'next/server'
import { generateWebsiteFromPrompt } from '@/lib/aiService'

export async function POST(request: NextRequest) {
  try {
    const { prompt, model = 'gemini' } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Check if Gemini API key is available
    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'GOOGLE_AI_API_KEY not configured. Please add your Gemini API key to .env.local' 
        },
        { status: 500 }
      )
    }

    console.log(`Generating website with ${model} for prompt:`, prompt.substring(0, 100) + '...')

    // Generate website using Gemini
    const result = await generateWebsiteFromPrompt(prompt)

    if (result.success) {
      return NextResponse.json({
        success: true,
        content: result.content,
        model: result.model,
        tokensUsed: result.tokensUsed,
        cost: result.cost
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Website Generator API',
    version: '1.0.0',
    defaultModel: 'gemini',
    supportedModels: ['gemini', 'openai']
  })
} 