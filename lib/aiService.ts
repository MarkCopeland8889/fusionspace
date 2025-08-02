import { GoogleGenAI } from '@google/genai'
import OpenAI from 'openai'
import { z } from 'zod'

// Initialize AI clients
const googleAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
})
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// AI Models
const GEMINI_PRO = 'gemini-1.5-pro'
const GEMINI_FLASH = 'gemini-1.5-flash'
const GPT_4 = 'gpt-4'
const GPT_3_5_TURBO = 'gpt-3.5-turbo'

// Validation schemas
const ProjectGenerationSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.enum(['simple', 'advanced']),
  prompt: z.string(),
  files: z.array(z.string()),
  template: z.string(),
})

const CodeGenerationSchema = z.object({
  html: z.string(),
  css: z.string(),
  javascript: z.string().optional(),
  metadata: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
  }),
})

export interface AIResponse {
  success: boolean
  data?: any
  error?: string
  tokens?: number
  cost?: number
}

export interface ProjectGenerationRequest {
  prompt: string
  type: 'simple' | 'advanced'
  files?: string[]
  businessType?: string
  targetAudience?: string
}

export interface CodeGenerationRequest {
  prompt: string
  projectType: 'simple' | 'advanced'
  existingCode?: {
    html?: string
    css?: string
    javascript?: string
  }
  requirements?: string[]
}

export interface LogoGenerationRequest {
  businessName: string
  businessType: string
  style: 'minimal' | 'modern' | 'classic' | 'playful'
  colors?: string[]
}

export interface ContentGenerationRequest {
  type: 'hero' | 'about' | 'services' | 'contact' | 'testimonials'
  businessType: string
  tone: 'professional' | 'friendly' | 'casual' | 'luxury'
  length: 'short' | 'medium' | 'long'
}

class AIService {
  private async generateWithGemini(
    prompt: string,
    model: string = GEMINI_PRO
  ): Promise<AIResponse> {
    try {
      const result = await googleAI.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        }
      })
      
      const text = result.text || ''
      
      return {
        success: true,
        data: text,
        tokens: 0, // New SDK doesn't provide usage metadata in the same way
      }
    } catch (error) {
      console.error('Gemini API Error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private async generateWithOpenAI(
    prompt: string,
    model: string = GPT_4
  ): Promise<AIResponse> {
    try {
      const completion = await openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000,
      })

      const content = completion.choices[0]?.message?.content
      const usage = completion.usage

      return {
        success: true,
        data: content,
        tokens: usage?.total_tokens || 0,
        cost: this.calculateOpenAICost(usage?.total_tokens || 0, model),
      }
    } catch (error) {
      console.error('OpenAI API Error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private calculateOpenAICost(tokens: number, model: string): number {
    const rates = {
      [GPT_4]: 0.03, // $0.03 per 1K tokens
      [GPT_3_5_TURBO]: 0.002, // $0.002 per 1K tokens
    }
    return (tokens / 1000) * (rates[model as keyof typeof rates] || 0.03)
  }

  // Project Generation
  async generateProject(request: ProjectGenerationRequest): Promise<AIResponse> {
    const prompt = `
Generate a complete web project based on the following requirements:

Business Type: ${request.businessType || 'General'}
Target Audience: ${request.targetAudience || 'General users'}
Project Type: ${request.type === 'simple' ? 'Static Website' : 'Full Stack Application'}
User Prompt: ${request.prompt}

Requirements:
1. Create a modern, responsive design
2. Use semantic HTML5
3. Implement modern CSS with Tailwind classes
4. Add interactive JavaScript functionality
5. Ensure accessibility compliance
6. Optimize for SEO
7. Make it mobile-first responsive

Please provide the complete project structure with:
- HTML file with proper semantic structure
- CSS file with Tailwind classes and custom styles
- JavaScript file with modern ES6+ syntax
- Meta tags for SEO
- Structured data (JSON-LD)
- Responsive design considerations

Format the response as a JSON object with the following structure:
{
  "name": "Project Name",
  "description": "Project Description",
  "files": {
    "index.html": "Complete HTML content",
    "styles.css": "Complete CSS content",
    "script.js": "Complete JavaScript content"
  },
  "metadata": {
    "title": "Page Title",
    "description": "Meta description",
    "keywords": ["keyword1", "keyword2"],
    "structuredData": "JSON-LD structured data"
  }
}
`

    return await this.generateWithGemini(prompt, GEMINI_PRO)
  }

  // Code Generation
  async generateCode(request: CodeGenerationRequest): Promise<AIResponse> {
    const prompt = `
Generate code based on the following requirements:

Prompt: ${request.prompt}
Project Type: ${request.projectType === 'simple' ? 'Static Website' : 'Full Stack Application'}

${request.existingCode ? `
Existing Code:
HTML: ${request.existingCode.html || 'None'}
CSS: ${request.existingCode.css || 'None'}
JavaScript: ${request.existingCode.javascript || 'None'}
` : ''}

${request.requirements ? `Additional Requirements: ${request.requirements.join(', ')}` : ''}

Please generate:
1. Semantic HTML5 structure
2. Modern CSS with Tailwind classes
3. Interactive JavaScript (ES6+)
4. Ensure accessibility and SEO optimization
5. Mobile-responsive design

Format as JSON:
{
  "html": "Complete HTML content",
  "css": "Complete CSS content", 
  "javascript": "Complete JavaScript content",
  "metadata": {
    "title": "Page title",
    "description": "Meta description",
    "keywords": ["keyword1", "keyword2"]
  }
}
`

    return await this.generateWithGemini(prompt, GEMINI_FLASH)
  }

  // Logo Generation
  async generateLogo(request: LogoGenerationRequest): Promise<AIResponse> {
    const prompt = `
Generate a logo concept for:

Business Name: ${request.businessName}
Business Type: ${request.businessType}
Style: ${request.style}
Colors: ${request.colors?.join(', ') || 'Brand appropriate'}

Please provide:
1. Logo concept description
2. Color palette recommendations
3. Typography suggestions
4. Design principles
5. Scalability considerations

Format as JSON:
{
  "concept": "Logo concept description",
  "colors": ["#color1", "#color2", "#color3"],
  "typography": "Font recommendations",
  "principles": ["principle1", "principle2"],
  "scalability": "Scalability notes"
}
`

    return await this.generateWithGemini(prompt, GEMINI_FLASH)
  }

  // Content Generation
  async generateContent(request: ContentGenerationRequest): Promise<AIResponse> {
    const prompt = `
Generate ${request.type} content for a ${request.businessType} business.

Tone: ${request.tone}
Length: ${request.length}

Requirements:
- Engaging and conversion-focused
- SEO-optimized
- Professional yet approachable
- Include relevant keywords naturally
- Call-to-action elements

Please provide the content in a structured format.
`

    return await this.generateWithGemini(prompt, GEMINI_FLASH)
  }

  // Code Review and Optimization
  async reviewCode(code: string, language: 'html' | 'css' | 'javascript'): Promise<AIResponse> {
    const prompt = `
Review and optimize the following ${language.toUpperCase()} code:

${code}

Please provide:
1. Code quality assessment
2. Performance optimizations
3. Security considerations
4. Accessibility improvements
5. Best practices recommendations
6. Optimized version of the code

Format as JSON:
{
  "assessment": "Quality assessment",
  "optimizations": ["optimization1", "optimization2"],
  "security": ["security1", "security2"],
  "accessibility": ["accessibility1", "accessibility2"],
  "bestPractices": ["practice1", "practice2"],
  "optimizedCode": "Optimized code version"
}
`

    return await this.generateWithGemini(prompt, GEMINI_PRO)
  }

  // Bug Fixing
  async fixBugs(code: string, error: string, language: 'html' | 'css' | 'javascript'): Promise<AIResponse> {
    const prompt = `
Fix the following ${language.toUpperCase()} code that has this error:

Error: ${error}

Code:
${code}

Please provide:
1. Root cause analysis
2. Fixed code
3. Explanation of the fix
4. Prevention tips

Format as JSON:
{
  "rootCause": "Root cause analysis",
  "fixedCode": "Fixed code version",
  "explanation": "Explanation of the fix",
  "prevention": ["tip1", "tip2"]
}
`

    return await this.generateWithGemini(prompt, GEMINI_FLASH)
  }

  // SEO Optimization
  async optimizeSEO(content: string, businessType: string): Promise<AIResponse> {
    const prompt = `
Optimize the following content for SEO:

Content: ${content}
Business Type: ${businessType}

Please provide:
1. SEO analysis
2. Keyword recommendations
3. Meta tag suggestions
4. Content improvements
5. Structured data recommendations

Format as JSON:
{
  "analysis": "SEO analysis",
  "keywords": ["keyword1", "keyword2"],
  "metaTags": {
    "title": "Optimized title",
    "description": "Optimized description"
  },
  "improvements": ["improvement1", "improvement2"],
  "structuredData": "JSON-LD structured data"
}
`

    return await this.generateWithGemini(prompt, GEMINI_FLASH)
  }
}

export const aiService = new AIService()
export default aiService 