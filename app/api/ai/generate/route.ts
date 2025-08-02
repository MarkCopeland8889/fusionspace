import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import aiService from '@/lib/aiService'
import { z } from 'zod'

// Validation schemas
const ProjectGenerationSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  type: z.enum(['simple', 'advanced']),
  files: z.array(z.string()).optional(),
  businessType: z.string().optional(),
  targetAudience: z.string().optional(),
})

const CodeGenerationSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  projectType: z.enum(['simple', 'advanced']),
  existingCode: z.object({
    html: z.string().optional(),
    css: z.string().optional(),
    javascript: z.string().optional(),
  }).optional(),
  requirements: z.array(z.string()).optional(),
})

const LogoGenerationSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  style: z.enum(['minimal', 'modern', 'classic', 'playful']),
  colors: z.array(z.string()).optional(),
})

const ContentGenerationSchema = z.object({
  type: z.enum(['hero', 'about', 'services', 'contact', 'testimonials']),
  businessType: z.string().min(1, 'Business type is required'),
  tone: z.enum(['professional', 'friendly', 'casual', 'luxury']),
  length: z.enum(['short', 'medium', 'long']),
})

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { type, ...data } = body

    let result

    switch (type) {
      case 'project':
        const projectData = ProjectGenerationSchema.parse(data)
        result = await aiService.generateProject(projectData)
        break

      case 'code':
        const codeData = CodeGenerationSchema.parse(data)
        result = await aiService.generateCode(codeData)
        break

      case 'logo':
        const logoData = LogoGenerationSchema.parse(data)
        result = await aiService.generateLogo(logoData)
        break

      case 'content':
        const contentData = ContentGenerationSchema.parse(data)
        result = await aiService.generateContent(contentData)
        break

      default:
        return NextResponse.json(
          { error: 'Invalid generation type' },
          { status: 400 }
        )
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'AI generation failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      tokens: result.tokens,
      cost: result.cost,
    })

  } catch (error) {
    console.error('AI Generation API Error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 