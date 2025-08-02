'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/Header'
import { 
  Settings, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react'

export default function SettingsPage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in')
    }
  }, [isLoaded, isSignedIn])

  const handleUpdateProfile = async () => {
    setIsUpdating(true)
    // TODO: Implement profile update
    setTimeout(() => {
      setIsUpdating(false)
    }, 2000)
  }

  const handleDeleteAccount = async () => {
    // TODO: Implement account deletion
    console.log('Deleting account...')
    setShowDeleteModal(false)
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
                  <p className="text-gray-600 mt-1">Update your personal information</p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Plan */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plan</label>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Free Plan</p>
                          <p className="text-sm text-gray-600">Up to 2 projects, 10 AI messages/day</p>
                        </div>
                      </div>
                      <a
                        href="/pricing"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Upgrade Plan
                      </a>
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      defaultValue={user?.username || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="email"
                        defaultValue={user?.emailAddresses[0]?.emailAddress || ''}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled
                      />
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email address is verified</p>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                      <span className="text-gray-500 font-normal ml-1">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number to receive SMS notifications"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      By entering your phone number, you agree to receive SMS notifications from us. 
                      You can opt out at any time - just remove the number.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={`${user?.firstName || ''} ${user?.lastName || ''}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Save Button */}
                  <div className="pt-4">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isUpdating ? 'Updating...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Security */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Shield className="w-4 h-4 mr-2 inline" />
                    Change Password
                  </button>
                  <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Shield className="w-4 h-4 mr-2 inline" />
                    Two-Factor Authentication
                  </button>
                  <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Shield className="w-4 h-4 mr-2 inline" />
                    Login History
                  </button>
                </div>
              </div>

              {/* Billing */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing</h3>
                <div className="space-y-3">
                  <a
                    href="/pricing"
                    className="block w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <CreditCard className="w-4 h-4 mr-2 inline" />
                    Manage Subscription
                  </a>
                  <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <CreditCard className="w-4 h-4 mr-2 inline" />
                    Billing History
                  </button>
                  <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <CreditCard className="w-4 h-4 mr-2 inline" />
                    Payment Methods
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full text-left p-3 text-sm text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2 inline" />
                    Close Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Close Account</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to close your account? This action cannot be undone and will permanently delete all your data.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-700">
                  This will permanently delete:
                </p>
                <ul className="text-sm text-red-700 mt-2 space-y-1">
                  <li>• All your projects and files</li>
                  <li>• Account settings and preferences</li>
                  <li>• Analytics and usage data</li>
                  <li>• Billing and subscription information</li>
                </ul>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Close Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 