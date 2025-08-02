import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id: string
  user_id: string
  name: string
  description: string
  type: 'simple' | 'advanced'
  status: 'draft' | 'published' | 'archived'
  logo_url?: string
  prompt: string
  files: string[]
  template: string
  settings: {
    mainPage: string
    visibility: 'public' | 'private'
    showFusionSpaceBadge: boolean
    customDomain?: string
  }
  analytics: {
    views: number
    users: number
    lastViewed: string
  }
  created_at: string
  updated_at: string
}

export interface ProjectCheckpoint {
  id: string
  project_id: string
  message_number: number
  content: string
  files: Record<string, string>
  created_at: string
}

export interface UserCredits {
  id: string
  user_id: string
  plan: 'free' | 'plus' | 'pro' | 'enterprise'
  daily_credits_used: number
  monthly_credits_used: number
  daily_credits_limit: number
  monthly_credits_limit: number
  last_reset: string
  created_at: string
  updated_at: string
}

export interface Analytics {
  id: string
  project_id?: string
  user_id: string
  event_type: 'view' | 'interaction' | 'conversion'
  event_data: Record<string, any>
  user_agent: string
  ip_address: string
  country: string
  created_at: string
} 