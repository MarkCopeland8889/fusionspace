'use client'

import { Project } from '@/lib/supabase'

interface ProjectEditorProps {
  project: Project
}

export default function ProjectEditor({ project }: ProjectEditorProps) {
  return (
    <div className="h-full">
      {/* This component will be expanded with the full editor functionality */}
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Project Editor</h3>
          <p className="text-gray-600">Full editor functionality coming soon...</p>
        </div>
      </div>
    </div>
  )
} 