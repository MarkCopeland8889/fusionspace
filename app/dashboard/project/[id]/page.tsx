'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  ChevronDown, 
  Save, 
  Share2, 
  Download, 
  Settings, 
  Eye, 
  Code, 
  Terminal,
  X,
  Sparkles,
  Edit3
} from 'lucide-react'
import ProjectEditor from '@/components/editor/ProjectEditor'
import ProjectHeader from '@/components/editor/ProjectHeader'
import { Project } from '@/lib/supabase'

export default function ProjectPage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const params = useParams()
  const projectId = params.id as string
  
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showFileViewer, setShowFileViewer] = useState(true)
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'terminal'>('preview')

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in')
    }
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    if (isSignedIn && projectId) {
      loadProject()
    }
  }, [isSignedIn, projectId])

  const loadProject = async () => {
    try {
      setIsLoading(true)
      // TODO: Implement actual API call to load project
      // const response = await fetch(`/api/projects/${projectId}`)
      // const data = await response.json()
      // setProject(data.project)
      
      // Mock project data for now
      setProject({
        id: projectId,
        user_id: user?.id || '',
        name: 'My First Website',
        description: 'A beautiful landing page for my business',
        type: 'simple',
        status: 'draft',
        logo_url: '/api/placeholder/64/64',
        prompt: 'Create a modern landing page for a tech startup',
        files: ['index.html', 'styles.css', 'script.js'],
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
      })
    } catch (error) {
      console.error('Error loading project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h1>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist or you don't have access to it.</p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectHeader project={project} />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* AI Chat Interface */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">AI Assistant</h3>
            <p className="text-sm text-gray-600">Ask me to help you build your project</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {/* Chat messages will go here */}
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  Hi! I'm here to help you build your {project.type === 'simple' ? 'website' : 'application'}. 
                  What would you like to work on?
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* File Viewer */}
        {showFileViewer && (
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Files</h3>
              <button
                onClick={() => setShowFileViewer(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-1">
                {project.files.map((file, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center"
                  >
                    <Code className="w-4 h-4 mr-2 text-gray-400" />
                    {file}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Tab Navigation */}
          <div className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'code'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Edit Code
                </button>
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'terminal'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  Terminal
                </button>
              </div>
              
              {!showFileViewer && (
                <button
                  onClick={() => setShowFileViewer(true)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Code className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'preview' && (
              <div className="h-full bg-white">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Live Preview</h3>
                    <p className="text-gray-600 mb-4">Your project preview will appear here</p>
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Select and Edit
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'code' && (
              <div className="h-full bg-gray-900">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Code Editor</h3>
                    <p className="text-gray-400">Select a file to start editing</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'terminal' && (
              <div className="h-full bg-gray-900">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Terminal className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Terminal</h3>
                    <p className="text-gray-400">Terminal output will appear here</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 