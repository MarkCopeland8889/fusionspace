import { GoogleGenerativeAI } from '@google/generative-ai'

export interface AIGenerationRequest {
  prompt: string
  context?: Record<string, any>
  model?: 'gemini' | 'openai'
  temperature?: number
  maxTokens?: number
}

export interface AIGenerationResponse {
  success: boolean
  content: string
  model: string
  tokensUsed?: number
  cost?: number
  error?: string
}

class AIService {
  private gemini: GoogleGenerativeAI | null = null
  private openai: any = null

  constructor() {
    // Initialize Gemini
    if (process.env.GOOGLE_AI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)
    }

    // Initialize OpenAI (fallback)
    if (process.env.OPENAI_API_KEY) {
      // OpenAI initialization would go here
      this.openai = null // Placeholder
    }
  }

  async generateCode(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    const { prompt, context = {}, model = 'gemini', temperature = 0.7 } = request

    try {
      if (model === 'gemini' && this.gemini) {
        return await this.generateWithGemini(prompt, context, temperature)
      } else if (this.openai) {
        return await this.generateWithOpenAI(prompt, context, temperature)
      } else {
        throw new Error('No AI service available')
      }
    } catch (error) {
      return {
        success: false,
        content: '',
        model,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  private async generateWithGemini(
    prompt: string, 
    context: Record<string, any>, 
    temperature: number
  ): Promise<AIGenerationResponse> {
    if (!this.gemini) {
      throw new Error('Gemini not initialized')
    }

    console.log('🤖 Initializing Gemini model...')
    const model = this.gemini.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature,
        maxOutputTokens: 8192,
      }
    })

    // Build enhanced prompt with context
    const enhancedPrompt = this.buildEnhancedPrompt(prompt, context)
    console.log('📝 Enhanced prompt length:', enhancedPrompt.length)

    console.log('🚀 Calling Gemini API...')
    const result = await model.generateContent(enhancedPrompt)
    console.log('📡 Gemini response received')
    
    const response = await result.response
    console.log('📦 Processing response...')
    
    const text = response.text()
    console.log('✅ Text extracted, length:', text.length)

    return {
      success: true,
      content: text,
      model: 'gemini-1.5-flash',
      tokensUsed: response.usageMetadata?.totalTokenCount || 0,
      cost: this.calculateGeminiCost(response.usageMetadata?.totalTokenCount || 0)
    }
  }

  private async generateWithOpenAI(
    prompt: string, 
    context: Record<string, any>, 
    temperature: number
  ): Promise<AIGenerationResponse> {
    // Fallback to OpenAI implementation
    // This would use the OpenAI API
    throw new Error('OpenAI integration not implemented yet')
  }

  private buildEnhancedPrompt(prompt: string, context: Record<string, any>): string {
    let enhancedPrompt = `You are an expert web developer and designer. Create professional, modern websites using HTML, CSS, and JavaScript.

Requirements:
- Use Tailwind CSS for styling
- Make it responsive and mobile-friendly
- Include proper SEO meta tags
- Ensure accessibility compliance
- Use modern, clean design principles
- Include smooth animations and transitions

User Request: ${prompt}

`

    // Add context-specific instructions
    if (context.businessType) {
      enhancedPrompt += `Business Type: ${context.businessType}\n`
    }
    if (context.targetAudience) {
      enhancedPrompt += `Target Audience: ${context.targetAudience}\n`
    }
    if (context.colorScheme) {
      enhancedPrompt += `Color Scheme: ${context.colorScheme}\n`
    }
    if (context.features) {
      enhancedPrompt += `Required Features: ${context.features.join(', ')}\n`
    }

    enhancedPrompt += `

Generate a complete, production-ready website. Include:
1. Complete HTML structure with proper semantic elements
2. Tailwind CSS classes for styling
3. JavaScript for interactivity
4. SEO meta tags
5. Responsive design
6. Modern animations

Return only the complete HTML code with embedded CSS and JavaScript.`

    return enhancedPrompt
  }

  private calculateGeminiCost(tokens: number): number {
    // Gemini pricing: $0.000075 / 1K characters (input) + $0.0003 / 1K characters (output)
    // Rough estimate: 1 token ≈ 4 characters
    const inputCost = (tokens * 4 / 1000) * 0.000075
    const outputCost = (tokens * 4 / 1000) * 0.0003
    return inputCost + outputCost
  }

  async generateBusinessAnalysis(prompt: string): Promise<AIGenerationResponse> {
    const businessPrompt = `Analyze the following business description and provide a structured analysis:

Business Description: ${prompt}

Provide analysis in JSON format with these fields:
{
  "businessType": "string",
  "industry": "string", 
  "targetAudience": "string",
  "keyServices": ["string"],
  "valueProposition": "string",
  "competitiveAdvantages": ["string"],
  "websiteRequirements": {
    "essentialPages": ["string"],
    "keyFeatures": ["string"],
    "designStyle": "string",
    "contentSections": ["string"]
  }
}

Return only valid JSON.`

    return this.generateCode({
      prompt: businessPrompt,
      model: 'gemini',
      temperature: 0.3
    })
  }

  async generateDesignSpecs(businessAnalysis: any): Promise<AIGenerationResponse> {
    const designPrompt = `Based on this business analysis, generate design specifications:

${JSON.stringify(businessAnalysis, null, 2)}

Generate design specs in JSON format:
{
  "colorScheme": {
    "primary": ["string"],
    "secondary": ["string"],
    "accent": ["string"],
    "neutral": ["string"]
  },
  "typography": {
    "heading": "string",
    "body": "string",
    "accent": "string"
  },
  "layout": {
    "style": "string",
    "sections": ["string"],
    "animations": ["string"]
  }
}

Return only valid JSON.`

    return this.generateCode({
      prompt: designPrompt,
      model: 'gemini',
      temperature: 0.4
    })
  }

  async generateWebsiteCode(businessAnalysis: any, designSpecs: any): Promise<AIGenerationResponse> {
    const codePrompt = `Create a complete website based on:

Business Analysis: ${JSON.stringify(businessAnalysis, null, 2)}
Design Specifications: ${JSON.stringify(designSpecs, null, 2)}

Generate a complete, production-ready website using:
- HTML5 semantic elements
- Tailwind CSS for styling
- Modern JavaScript for interactivity
- Responsive design
- SEO optimization
- Accessibility features

Return only the complete HTML code with embedded CSS and JavaScript.`

    return this.generateCode({
      prompt: codePrompt,
      model: 'gemini',
      temperature: 0.7
    })
  }
}

// Export singleton instance
export const aiService = new AIService()

// Helper functions
export async function generateWebsiteFromPrompt(userPrompt: string): Promise<AIGenerationResponse> {
  try {
    console.log('🎯 Starting direct website generation for:', userPrompt)
    
    // Direct website generation instead of 3-step process
    const websitePrompt = `You are an expert web developer. Create a complete, modern website based on this description: "${userPrompt}"

IMPORTANT: Return ONLY the complete HTML code. Do not include any markdown formatting, code blocks, or explanations.

Generate a complete, production-ready website using:
- HTML5 semantic elements
- Tailwind CSS for styling (include CDN link)
- Modern JavaScript for interactivity
- Responsive design
- SEO optimization
- Accessibility features

Requirements:
- Use Tailwind CSS CDN: <script src="https://cdn.tailwindcss.com"></script>
- Make it responsive and mobile-friendly
- Include proper SEO meta tags
- Ensure accessibility compliance
- Use modern, clean design principles
- Include smooth animations and transitions

Return ONLY the complete HTML code with embedded CSS and JavaScript. Make it beautiful and functional.`

    const result = await aiService.generateCode({
      prompt: websitePrompt,
      model: 'gemini',
      temperature: 0.7
    })

    console.log('✅ Website generation completed:', result.success)
    return result
  } catch (error) {
    console.error('💥 Error in generateWebsiteFromPrompt:', error)
    return {
      success: false,
      content: '',
      model: 'gemini',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
} 