'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Settings, BarChart3, Users, Rocket, Sparkles } from 'lucide-react'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/Header'
import CreateProjectModal from '@/components/dashboard/CreateProjectModal'
import DeleteProjectModal from '@/components/dashboard/DeleteProjectModal'
import { Project } from '@/lib/supabase'

export default function DashboardPage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)

  // Check for URL parameters (e.g., from landing page prompt)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const prompt = urlParams.get('prompt')
      if (prompt) {
        setShowCreateModal(true)
        // You can pre-fill the prompt in the modal
      }
    }
  }, [])

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in')
    }
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    if (isSignedIn && user) {
      loadProjects()
    }
  }, [isSignedIn, user])

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      // TODO: Implement actual API call to load projects
      // const response = await fetch('/api/projects')
      // const data = await response.json()
      // setProjects(data.projects)
      
      // Mock data for now
      setProjects([
        {
          id: '1',
          user_id: user?.id || '',
          name: 'My First Website',
          description: 'A beautiful landing page for my business',
          type: 'simple',
          status: 'draft',
          logo_url: '/api/placeholder/64/64',
          prompt: 'Create a modern landing page for a tech startup',
          files: [],
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
      ])
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project)
    setShowDeleteModal(true)
  }

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return

    try {
      // TODO: Implement actual delete API call
      // await fetch(`/api/projects/${projectToDelete.id}`, { method: 'DELETE' })
      
      setProjects(projects.filter(p => p.id !== projectToDelete.id))
      setShowDeleteModal(false)
      setProjectToDelete(null)
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.firstName || user?.username || 'there'}!
            </h1>
            <p className="text-gray-600 mt-2">
              Ready to build something amazing today?
            </p>
          </div>

          {/* Create New Project Button */}
          <div className="mb-8">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Project
            </button>
          </div>

          {/* Projects Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Projects</h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-6">
                  Create your first project to get started with FusionSpace
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Project Logo */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          project.type === 'simple' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {project.type === 'simple' ? 'Simple' : 'Advanced'}
                        </span>
                      </div>
                    </div>

                    {/* Project Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Last Edited */}
                    <p className="text-xs text-gray-500 mb-4">
                      Last edited: {new Date(project.updated_at).toLocaleDateString()}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.location.href = `/dashboard/project/${project.id}`}
                        className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project)}
                        className="flex items-center justify-center px-3 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onProjectCreated={(newProject) => {
            setProjects([newProject, ...projects])
            setShowCreateModal(false)
          }}
        />
      )}

      {showDeleteModal && projectToDelete && (
        <DeleteProjectModal
          project={projectToDelete}
          onClose={() => {
            setShowDeleteModal(false)
            setProjectToDelete(null)
          }}
          onConfirm={confirmDeleteProject}
        />
      )}
    </div>
  )
} 