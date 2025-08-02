'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { 
  ChevronDown, 
  Save, 
  Share2, 
  Download, 
  Settings, 
  Sparkles,
  Edit3,
  Upload,
  Copy,
  Globe,
  User,
  CreditCard,
  HelpCircle,
  LogOut,
  ArrowLeft
} from 'lucide-react'
import { Project } from '@/lib/supabase'

interface ProjectHeaderProps {
  project: Project
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const { user } = useUser()
  const [showDropdown, setShowDropdown] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDeployModal, setShowDeployModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showLogoModal, setShowLogoModal] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [projectName, setProjectName] = useState(project.name)

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving project...')
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const handleDeploy = () => {
    setShowDeployModal(true)
  }

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Downloading project...')
  }

  const handleNameEdit = () => {
    setIsEditingName(true)
  }

  const handleNameSave = () => {
    // TODO: Implement name update
    setIsEditingName(false)
  }

  const handleNameCancel = () => {
    setProjectName(project.name)
    setIsEditingName(false)
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              {/* FusionSpace Logo with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">FusionSpace</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <button className="flex items-center w-full text-left text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Editor
                      </button>
                    </div>
                    
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-600">{user?.emailAddresses[0]?.emailAddress}</p>
                    </div>

                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900 mb-2">Credits</div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Daily Credits</span>
                            <span>8/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Monthly Credits</span>
                            <span>35/50</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="py-1">
                      <a href="/docs" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Documentation
                      </a>
                      <a href="/billing" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Billing
                      </a>
                      <a href="/help" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Help Center
                      </a>
                      <a href="/pricing" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Upgrade Plan
                      </a>
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Logo */}
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <button
                  onClick={() => setShowLogoModal(true)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                >
                  <Edit3 className="w-2.5 h-2.5 text-gray-600" />
                </button>
              </div>

              {/* Project Name */}
              <div className="flex items-center space-x-2">
                {isEditingName ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                    <button
                      onClick={handleNameSave}
                      className="text-green-600 hover:text-green-700"
                    >
                      ✓
                    </button>
                    <button
                      onClick={handleNameCancel}
                      className="text-red-600 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-lg font-semibold text-gray-900">{projectName}</h1>
                    <button
                      onClick={handleNameEdit}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                className="inline-flex items-center px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </button>
              
              <button
                onClick={handleShare}
                className="inline-flex items-center px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </button>
              
              <button
                onClick={handleDeploy}
                className="inline-flex items-center px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Globe className="w-4 h-4 mr-1" />
                Deploy
              </button>
              
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
              
              <button
                onClick={() => setShowSettingsModal(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modals would go here - simplified for now */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Share Project</h3>
            <p className="text-gray-600 mb-4">Share functionality coming soon...</p>
            <button
              onClick={() => setShowShareModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showDeployModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Deploy Project</h3>
            <p className="text-gray-600 mb-4">Deploy functionality coming soon...</p>
            <button
              onClick={() => setShowDeployModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Project Settings</h3>
            <p className="text-gray-600 mb-4">Settings functionality coming soon...</p>
            <button
              onClick={() => setShowSettingsModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showLogoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Change Logo</h3>
            <p className="text-gray-600 mb-4">Logo change functionality coming soon...</p>
            <button
              onClick={() => setShowLogoModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
} 