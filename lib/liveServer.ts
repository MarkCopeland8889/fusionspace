export interface DeploymentConfig {
  platform: 'vercel' | 'netlify' | 'custom'
  projectId?: string
  domain?: string
  environment: 'development' | 'staging' | 'production'
  autoDeploy: boolean
}

export interface DeploymentResult {
  id: string
  url: string
  status: 'pending' | 'building' | 'success' | 'failed'
  createdAt: Date
  updatedAt: Date
  logs?: string[]
  error?: string
}

export interface LiveServerService {
  name: string
  description: string
  features: string[]
  pricing: {
    free: string
    paid: string
  }
  apiKeys: string[]
}

export const LIVE_SERVER_SERVICES: LiveServerService[] = [
  {
    name: 'Vercel',
    description: 'Fast, global deployment platform for modern web applications',
    features: [
      'Automatic deployments',
      'Global CDN',
      'Custom domains',
      'SSL certificates',
      'Preview deployments',
      'Analytics'
    ],
    pricing: {
      free: 'Free for personal projects',
      paid: 'From $20/month for teams'
    },
    apiKeys: ['VERCEL_TOKEN', 'VERCEL_PROJECT_ID']
  },
  {
    name: 'Netlify',
    description: 'All-in-one platform for web projects',
    features: [
      'Continuous deployment',
      'Form handling',
      'Serverless functions',
      'Edge functions',
      'Split testing',
      'Analytics'
    ],
    pricing: {
      free: 'Free for personal projects',
      paid: 'From $19/month for teams'
    },
    apiKeys: ['NETLIFY_TOKEN', 'NETLIFY_SITE_ID']
  },
  {
    name: 'Cloudflare Pages',
    description: 'Fast, secure static site hosting',
    features: [
      'Global edge network',
      'Automatic builds',
      'Custom domains',
      'DDoS protection',
      'Analytics',
      'Workers integration'
    ],
    pricing: {
      free: 'Free for personal projects',
      paid: 'From $20/month for teams'
    },
    apiKeys: ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID']
  }
]

export class LiveServerManager {
  private config: DeploymentConfig

  constructor(config: DeploymentConfig) {
    this.config = config
  }

  async deploy(code: string, projectName: string): Promise<DeploymentResult> {
    const deploymentId = `deploy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    try {
      switch (this.config.platform) {
        case 'vercel':
          return await this.deployToVercel(code, projectName, deploymentId)
        case 'netlify':
          return await this.deployToNetlify(code, projectName, deploymentId)
        case 'custom':
          return await this.deployToCustom(code, projectName, deploymentId)
        default:
          throw new Error(`Unsupported platform: ${this.config.platform}`)
      }
    } catch (error) {
      return {
        id: deploymentId,
        url: '',
        status: 'failed',
        createdAt: new Date(),
        updatedAt: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  private async deployToVercel(code: string, projectName: string, deploymentId: string): Promise<DeploymentResult> {
    // Simulate Vercel deployment
    const baseUrl = `https://${projectName.toLowerCase().replace(/\s+/g, '-')}.vercel.app`
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: deploymentId,
          url: baseUrl,
          status: 'success',
          createdAt: new Date(),
          updatedAt: new Date(),
          logs: [
            'Deploying to Vercel...',
            'Building project...',
            'Deployment successful!'
          ]
        })
      }, 3000)
    })
  }

  private async deployToNetlify(code: string, projectName: string, deploymentId: string): Promise<DeploymentResult> {
    // Simulate Netlify deployment
    const baseUrl = `https://${projectName.toLowerCase().replace(/\s+/g, '-')}.netlify.app`
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: deploymentId,
          url: baseUrl,
          status: 'success',
          createdAt: new Date(),
          updatedAt: new Date(),
          logs: [
            'Deploying to Netlify...',
            'Building site...',
            'Deployment successful!'
          ]
        })
      }, 3000)
    })
  }

  private async deployToCustom(code: string, projectName: string, deploymentId: string): Promise<DeploymentResult> {
    // Simulate custom deployment
    const baseUrl = `https://${projectName.toLowerCase().replace(/\s+/g, '-')}.yourdomain.com`
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: deploymentId,
          url: baseUrl,
          status: 'success',
          createdAt: new Date(),
          updatedAt: new Date(),
          logs: [
            'Deploying to custom server...',
            'Uploading files...',
            'Deployment successful!'
          ]
        })
      }, 3000)
    })
  }

  async getDeploymentStatus(deploymentId: string): Promise<DeploymentResult> {
    // Simulate status check
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: deploymentId,
          url: `https://deployment-${deploymentId}.example.com`,
          status: 'success',
          createdAt: new Date(Date.now() - 300000), // 5 minutes ago
          updatedAt: new Date()
        })
      }, 1000)
    })
  }

  async listDeployments(): Promise<DeploymentResult[]> {
    // Simulate listing deployments
    return [
      {
        id: 'deploy_1',
        url: 'https://project-1.vercel.app',
        status: 'success',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000)
      },
      {
        id: 'deploy_2',
        url: 'https://project-2.vercel.app',
        status: 'success',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        updatedAt: new Date(Date.now() - 172800000)
      }
    ]
  }

  async deleteDeployment(deploymentId: string): Promise<boolean> {
    // Simulate deletion
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  }
}

export function createLiveServerManager(config: DeploymentConfig): LiveServerManager {
  return new LiveServerManager(config)
}

export function validateDeploymentConfig(config: DeploymentConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!config.platform) {
    errors.push('Platform is required')
  }

  if (config.platform === 'vercel' && !process.env.VERCEL_TOKEN) {
    errors.push('VERCEL_TOKEN is required for Vercel deployment')
  }

  if (config.platform === 'netlify' && !process.env.NETLIFY_TOKEN) {
    errors.push('NETLIFY_TOKEN is required for Netlify deployment')
  }

  if (config.domain && !isValidDomain(config.domain)) {
    errors.push('Invalid domain format')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

function isValidDomain(domain: string): boolean {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
  return domainRegex.test(domain)
}

export function generateProjectName(businessName: string): string {
  return businessName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50)
}

export function estimateDeploymentTime(platform: string, codeSize: number): number {
  const baseTime = 30 // seconds
  const sizeMultiplier = Math.ceil(codeSize / 10000) // 10KB chunks
  const platformMultiplier = platform === 'vercel' ? 1 : platform === 'netlify' ? 1.2 : 1.5
  
  return Math.round(baseTime * sizeMultiplier * platformMultiplier)
} 