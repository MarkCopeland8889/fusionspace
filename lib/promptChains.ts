export interface PromptStep {
  id: string
  name: string
  description: string
  prompt: string
  required: boolean
  order: number
}

export interface PromptChain {
  id: string
  name: string
  description: string
  category: string
  steps: PromptStep[]
  estimatedTokens: number
  cost: number
}

export const PROMPT_CHAINS: PromptChain[] = [
  {
    id: 'business-analysis',
    name: 'Business Analysis',
    description: 'Analyze business requirements and create a comprehensive plan',
    category: 'planning',
    estimatedTokens: 2000,
    cost: 0.06,
    steps: [
      {
        id: 'business-type',
        name: 'Business Type Analysis',
        description: 'Determine the type of business and its requirements',
        prompt: `Analyze the following business description and determine:
1. Business type and industry
2. Target audience and demographics
3. Key services or products
4. Unique value proposition
5. Competitive advantages

Business description: {userInput}

Provide a structured analysis in JSON format with these fields:
- businessType: string
- industry: string
- targetAudience: string
- keyServices: string[]
- valueProposition: string
- competitiveAdvantages: string[]`,
        required: true,
        order: 1
      },
      {
        id: 'website-requirements',
        name: 'Website Requirements',
        description: 'Define specific website requirements based on business analysis',
        prompt: `Based on the business analysis, determine the website requirements:

Business Analysis: {businessAnalysis}

Generate website requirements including:
1. Essential pages and sections
2. Key features and functionality
3. Design preferences and style
4. Content requirements
5. Technical specifications

Provide requirements in JSON format:
- essentialPages: string[]
- keyFeatures: string[]
- designStyle: string
- contentSections: string[]
- technicalRequirements: string[]`,
        required: true,
        order: 2
      }
    ]
  },
  {
    id: 'design-generation',
    name: 'Design Generation',
    description: 'Generate design concepts and visual elements',
    category: 'design',
    estimatedTokens: 1500,
    cost: 0.045,
    steps: [
      {
        id: 'color-scheme',
        name: 'Color Scheme',
        description: 'Generate appropriate color schemes for the business',
        prompt: `Create a professional color scheme for a {businessType} business.

Requirements:
- Primary brand colors (2-3 colors)
- Secondary accent colors (2-3 colors)
- Neutral colors for text and backgrounds
- Ensure accessibility and contrast compliance

Provide color scheme in JSON format:
- primaryColors: string[]
- accentColors: string[]
- neutralColors: string[]
- colorRationale: string`,
        required: true,
        order: 1
      },
      {
        id: 'typography',
        name: 'Typography',
        description: 'Select appropriate fonts and typography hierarchy',
        prompt: `Select typography for a {businessType} website.

Requirements:
- Primary heading font
- Body text font
- Accent font for special elements
- Font hierarchy and sizing
- Ensure readability and brand consistency

Provide typography in JSON format:
- headingFont: string
- bodyFont: string
- accentFont: string
- fontSizes: object
- typographyRationale: string`,
        required: true,
        order: 2
      }
    ]
  },
  {
    id: 'code-generation',
    name: 'Code Generation',
    description: 'Generate HTML, CSS, and JavaScript code',
    category: 'development',
    estimatedTokens: 3000,
    cost: 0.09,
    steps: [
      {
        id: 'html-structure',
        name: 'HTML Structure',
        description: 'Generate semantic HTML structure',
        prompt: `Create semantic HTML structure for a {businessType} website.

Requirements:
- Proper HTML5 semantic elements
- Accessibility features (ARIA labels, alt text)
- SEO optimization (meta tags, structured data)
- Mobile-responsive structure
- Clean, maintainable code

Business requirements: {websiteRequirements}
Design specifications: {designSpecs}

Generate complete HTML code with inline CSS and JavaScript.`,
        required: true,
        order: 1
      },
      {
        id: 'css-styling',
        name: 'CSS Styling',
        description: 'Generate modern CSS with Tailwind or custom styles',
        prompt: `Create modern CSS styling for the HTML structure.

Requirements:
- Use Tailwind CSS classes
- Responsive design (mobile-first)
- Modern animations and transitions
- Consistent spacing and typography
- Professional appearance

HTML Structure: {htmlStructure}
Color Scheme: {colorScheme}
Typography: {typography}

Generate CSS using Tailwind classes or custom CSS.`,
        required: true,
        order: 2
      },
      {
        id: 'javascript-functionality',
        name: 'JavaScript Functionality',
        description: 'Add interactive features and functionality',
        prompt: `Add JavaScript functionality to enhance the website.

Requirements:
- Interactive elements (forms, buttons, navigation)
- Smooth animations and transitions
- Form validation and submission
- Mobile menu functionality
- Performance optimization

HTML Structure: {htmlStructure}
CSS Styling: {cssStyling}

Generate clean, modern JavaScript code.`,
        required: false,
        order: 3
      }
    ]
  },
  {
    id: 'seo-optimization',
    name: 'SEO Optimization',
    description: 'Optimize website for search engines',
    category: 'marketing',
    estimatedTokens: 1000,
    cost: 0.03,
    steps: [
      {
        id: 'meta-tags',
        name: 'Meta Tags',
        description: 'Generate SEO meta tags and structured data',
        prompt: `Create SEO-optimized meta tags and structured data.

Business: {businessType}
Location: {location}
Services: {services}

Generate:
1. Title tag
2. Meta description
3. Open Graph tags
4. Twitter Card tags
5. Structured data (JSON-LD)
6. Canonical URL

Provide complete meta tag implementation.`,
        required: true,
        order: 1
      },
      {
        id: 'content-optimization',
        name: 'Content Optimization',
        description: 'Optimize content for target keywords',
        prompt: `Optimize website content for SEO.

Target keywords: {keywords}
Business type: {businessType}

Optimize:
1. Heading structure (H1, H2, H3)
2. Keyword placement
3. Internal linking
4. Image alt text
5. URL structure

Provide content optimization recommendations.`,
        required: false,
        order: 2
      }
    ]
  },
  {
    id: 'business-tools',
    name: 'Business Tools Integration',
    description: 'Integrate business tools and marketing features',
    category: 'business',
    estimatedTokens: 1500,
    cost: 0.045,
    steps: [
      {
        id: 'analytics-setup',
        name: 'Analytics Setup',
        description: 'Set up Google Analytics and tracking',
        prompt: `Set up analytics and tracking for the website.

Business: {businessType}
Goals: {businessGoals}

Configure:
1. Google Analytics 4 setup
2. Conversion tracking
3. Goal setup
4. Custom events
5. E-commerce tracking (if applicable)

Provide implementation code and setup instructions.`,
        required: false,
        order: 1
      },
      {
        id: 'marketing-tools',
        name: 'Marketing Tools',
        description: 'Integrate email marketing and social media',
        prompt: `Integrate marketing tools and social media.

Business: {businessType}
Target audience: {targetAudience}

Set up:
1. Email signup forms
2. Social media integration
3. Contact forms
4. Newsletter integration
5. Social sharing buttons

Provide implementation code and configuration.`,
        required: false,
        order: 2
      }
    ]
  }
]

export function getPromptChainById(id: string): PromptChain | undefined {
  return PROMPT_CHAINS.find(chain => chain.id === id)
}

export function getPromptChainsByCategory(category: string): PromptChain[] {
  return PROMPT_CHAINS.filter(chain => chain.category === category)
}

export function executePromptChain(chainId: string, userInput: string, context: Record<string, any> = {}): Promise<any> {
  const chain = getPromptChainById(chainId)
  if (!chain) {
    throw new Error(`Prompt chain not found: ${chainId}`)
  }

  // This would integrate with OpenAI API
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      resolve({
        chainId,
        results: chain.steps.map(step => ({
          stepId: step.id,
          result: `Generated result for ${step.name}`
        }))
      })
    }, 2000)
  })
}

export function estimateChainCost(chainId: string): number {
  const chain = getPromptChainById(chainId)
  return chain?.cost || 0
}

export function getTotalEstimatedCost(chains: string[]): number {
  return chains.reduce((total, chainId) => total + estimateChainCost(chainId), 0)
} 