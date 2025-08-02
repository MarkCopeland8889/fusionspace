import { GoogleGenAI } from '@google/genai'

export interface AIGenerationRequest {
  prompt: string
  context?: Record<string, any>
  model?: 'gemini' | 'gemini-2.5-flash' | 'openai'
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
  private gemini: GoogleGenAI | null = null
  private openai: any = null

  constructor() {
    // Initialize Gemini
    if (process.env.GOOGLE_AI_API_KEY) {
      this.gemini = new GoogleGenAI({})
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

    // Build enhanced prompt with context
    const enhancedPrompt = this.buildEnhancedPrompt(prompt, context)
    console.log('📝 Enhanced prompt length:', enhancedPrompt.length)

    console.log('🚀 Calling Gemini API...')
    const result = await this.gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: enhancedPrompt,
      config: {
        temperature,
        maxOutputTokens: 8192,
      }
    })
    console.log('📡 Gemini response received')
    
    const text = result.text || ''
    console.log('✅ Text extracted, length:', text.length)

    return {
      success: true,
      content: text,
      model: 'gemini-2.5-flash',
      tokensUsed: 0, // New SDK doesn't provide usage metadata in the same way
      cost: 0 // Will calculate based on text length
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
    const businessPrompt = `Analyze the following business description and provide a structured analysis.

Business Description: ${prompt}

CRITICAL: Return ONLY the JSON object below. Do not include any explanations, markdown formatting, code blocks, HTML, or any other content.

Provide analysis in this exact JSON format:
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

Return ONLY the JSON object above. Nothing else.`

    return this.generateCode({
      prompt: businessPrompt,
      model: 'gemini-2.5-flash',
      temperature: 0.3
    })
  }

  async generateDesignSpecs(businessAnalysis: any): Promise<AIGenerationResponse> {
    const designPrompt = `Based on this business analysis, generate design specifications.

Business Analysis: ${JSON.stringify(businessAnalysis, null, 2)}

CRITICAL: Return ONLY the JSON object below. Do not include any explanations, markdown formatting, code blocks, HTML, or any other content.

Generate design specs in this exact JSON format:
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

Return ONLY the JSON object above. Nothing else.`

    return this.generateCode({
      prompt: designPrompt,
      model: 'gemini-2.5-flash',
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
      model: 'gemini-2.5-flash',
      temperature: 0.7
    })
  }
}

// Export singleton instance
export const aiService = new AIService()

// Helper functions
export async function generateWebsiteFromPrompt(userPrompt: string): Promise<AIGenerationResponse> {
  try {
    console.log('🎯 Starting 3-step website generation for:', userPrompt)
    
    // Step 1: Business Analysis
    console.log('📊 Step 1: Business Analysis...')
    const businessAnalysis = await aiService.generateBusinessAnalysis(userPrompt)
    if (!businessAnalysis.success) {
      console.error('❌ Business analysis failed, falling back to direct generation:', businessAnalysis.error)
      return await generateDirectWebsite(userPrompt)
    }
    
    // Extract JSON from markdown response
    let businessData
    try {
      businessData = extractJsonFromMarkdown(businessAnalysis.content)
      console.log('✅ Business analysis completed:', businessData.businessType)
    } catch (error) {
      console.error('❌ JSON parsing failed, falling back to direct generation:', error)
      return await generateDirectWebsite(userPrompt)
    }

    // Step 2: Design Specifications
    console.log('🎨 Step 2: Design Specifications...')
    const designSpecs = await aiService.generateDesignSpecs(businessData)
    if (!designSpecs.success) {
      console.error('❌ Design specs failed, falling back to direct generation:', designSpecs.error)
      return await generateDirectWebsite(userPrompt)
    }
    
    // Extract JSON from markdown response
    let designData
    try {
      designData = extractJsonFromMarkdown(designSpecs.content)
      console.log('✅ Design specs completed:', designData.colorScheme?.primary)
    } catch (error) {
      console.error('❌ Design JSON parsing failed, falling back to direct generation:', error)
      return await generateDirectWebsite(userPrompt)
    }

    // Step 3: Generate Website Code
    console.log('💻 Step 3: Website Code Generation...')
    const websiteCode = await aiService.generateWebsiteCode(businessData, designData)
    console.log('✅ Website generation completed:', websiteCode.success)

    return websiteCode
  } catch (error) {
    console.error('💥 Error in generateWebsiteFromPrompt:', error)
    console.log('🔄 Falling back to direct generation...')
    return await generateDirectWebsite(userPrompt)
  }
}

// Fallback function for direct website generation
async function generateDirectWebsite(userPrompt: string): Promise<AIGenerationResponse> {
  console.log('🚀 Using direct website generation fallback...')
  
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

  return await aiService.generateCode({
    prompt: websitePrompt,
    model: 'gemini-2.5-flash',
    temperature: 0.7
  })
}

// Helper function to extract JSON from markdown code blocks
function extractJsonFromMarkdown(content: string): any {
  try {
    console.log('🔍 Extracting JSON from:', content.substring(0, 200) + '...')
    
    // Remove markdown code blocks if present
    let jsonString = content.trim()
    
    // Remove ```json and ``` markers
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json\s*/, '')
    }
    if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/^```\s*/, '')
    }
    if (jsonString.endsWith('```')) {
      jsonString = jsonString.replace(/\s*```$/, '')
    }
    
    // Find the first { and look for the matching closing }
    const firstBrace = jsonString.indexOf('{')
    if (firstBrace === -1) {
      throw new Error('No JSON object found in response')
    }
    
    let braceCount = 0
    let endBrace = -1
    
    for (let i = firstBrace; i < jsonString.length; i++) {
      if (jsonString[i] === '{') {
        braceCount++
      } else if (jsonString[i] === '}') {
        braceCount--
        if (braceCount === 0) {
          endBrace = i
          break
        }
      }
    }
    
    if (endBrace === -1) {
      throw new Error('Unmatched braces in JSON')
    }
    
    // Extract only the JSON part
    jsonString = jsonString.substring(firstBrace, endBrace + 1)
    
    console.log('📝 Extracted JSON string:', jsonString.substring(0, 200) + '...')
    
    // Parse the JSON
    return JSON.parse(jsonString.trim())
  } catch (error) {
    console.error('❌ Failed to parse JSON from markdown:', error)
    console.log('📝 Raw content:', content)
    
    // Try to find and extract just the JSON part with regex
    try {
      const jsonMatch = content.match(/\{[\s\S]*?\}/)
      if (jsonMatch) {
        console.log('🔄 Trying to extract JSON with regex...')
        return JSON.parse(jsonMatch[0])
      }
    } catch (regexError) {
      console.error('❌ Regex extraction also failed:', regexError)
    }
    
    throw new Error(`Failed to parse JSON response: ${error}`)
  }
} 