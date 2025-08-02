'use client'

import { useState, useRef } from 'react'
import { X, Upload, Monitor, Rocket, Plus } from 'lucide-react'
import { Project } from '@/lib/supabase'

interface CreateProjectModalProps {
  onClose: () => void
  onProjectCreated: (project: Project) => void
}

export default function CreateProjectModal({ onClose, onProjectCreated }: CreateProjectModalProps) {
  const [prompt, setPrompt] = useState('')
  const [projectType, setProjectType] = useState<'simple' | 'advanced' | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0)
    const maxSize = 500 * 1024 * 1024 // 500MB

    if (totalSize > maxSize) {
      alert('Total file size must be under 500MB')
      return
    }

    if (files.length + selectedFiles.length > 20) {
      alert('Maximum 20 files allowed')
      return
    }

    setFiles([...files, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleCreateProject = async () => {
    if (!prompt.trim() || !projectType) {
      alert('Please fill in all required fields')
      return
    }

    setIsCreating(true)

    try {
      // TODO: Implement actual project creation API call
      // const formData = new FormData()
      // formData.append('prompt', prompt)
      // formData.append('type', projectType)
      // files.forEach(file => formData.append('files', file))
      
      // const response = await fetch('/api/projects', {
      //   method: 'POST',
      //   body: formData
      // })
      
      // const newProject = await response.json()

      // Mock project creation for now
      const newProject: Project = {
        id: Date.now().toString(),
        user_id: 'user-id',
        name: 'New Project',
        description: prompt,
        type: projectType,
        status: 'draft',
        logo_url: '/api/placeholder/64/64',
        prompt: prompt,
        files: files.map(f => f.name),
        template: 'modern',
        settings: {
          mainPage: 'index.html',
          visibility: 'public',
          showFusionSpaceBadge: true
        },
        analytics: {
          views: 0,
          users: 0,
          lastViewed: new Date().toISOString()
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      onProjectCreated(newProject)
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Failed to create project. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Project Prompt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to create?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your website or application in detail..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attach Files (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Up to 20 files, total size under 500MB
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Choose Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Project Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Choose your project type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setProjectType('simple')}
                className={`p-6 border-2 rounded-lg text-left transition-colors ${
                  projectType === 'simple'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <Monitor className="w-6 h-6 text-green-600 mr-2" />
                  <span className="font-medium text-gray-900">Website</span>
                  <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Choose this option if you want to build a website for your business.
                </p>
              </button>

              <button
                onClick={() => setProjectType('advanced')}
                className={`p-6 border-2 rounded-lg text-left transition-colors ${
                  projectType === 'advanced'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <Rocket className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">Online Application</span>
                </div>
                <p className="text-sm text-gray-600">
                  Choose this option if you want to build a full stack application that has API integrations.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateProject}
            disabled={!prompt.trim() || !projectType || isCreating}
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 