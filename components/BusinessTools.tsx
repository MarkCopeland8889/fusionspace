'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  TrendingUp, 
  Users, 
  Mail, 
  Globe, 
  BarChart3, 
  Target, 
  Share2,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function BusinessTools() {
  const [activeTab, setActiveTab] = useState('launch')
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [targetAudience, setTargetAudience] = useState('')

  const tabs = [
    { id: 'launch', label: 'Launch', icon: Rocket },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'social', label: 'Social Media', icon: Share2 },
  ]

  const handleLaunchWebsite = () => {
    toast.success('Website launched successfully!')
  }

  const handleGenerateMarketingPlan = () => {
    toast.success('Marketing plan generated!')
  }

  const handleSetupAnalytics = () => {
    toast.success('Analytics setup complete!')
  }

  const handleSocialMediaSetup = () => {
    toast.success('Social media accounts configured!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-6">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Launch & Market Your Business
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take your website from concept to successful business with our comprehensive 
            launch and marketing tools.
          </p>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'launch' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Launch</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Enter your business name"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select business type</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="retail">Retail Store</option>
                      <option value="service">Service Business</option>
                      <option value="consulting">Consulting</option>
                      <option value="ecommerce">E-commerce</option>
                    </select>
                  </div>
                  <button
                    onClick={handleLaunchWebsite}
                    className="w-full btn-primary"
                  >
                    Launch Website
                  </button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Domain & Hosting</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Free Domain</p>
                      <p className="text-sm text-gray-600">Get a free .com domain for 1 year</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Rocket className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Fast Hosting</p>
                      <p className="text-sm text-gray-600">99.9% uptime with CDN</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Target className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">SSL Certificate</p>
                      <p className="text-sm text-gray-600">Free SSL for security</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Strategy</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Audience
                    </label>
                    <input
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="e.g., Young professionals, 25-35"
                      className="input-field"
                    />
                  </div>
                  <button
                    onClick={handleGenerateMarketingPlan}
                    className="w-full btn-primary"
                  >
                    Generate Marketing Plan
                  </button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Email Marketing</span>
                    </div>
                    <button className="btn-secondary text-sm">Setup</button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Social Media</span>
                    </div>
                    <button className="btn-secondary text-sm">Connect</button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Google Ads</span>
                    </div>
                    <button className="btn-secondary text-sm">Configure</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Google Analytics</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Track website traffic and user behavior
                </p>
                <button
                  onClick={handleSetupAnalytics}
                  className="btn-primary w-full"
                >
                  Setup Analytics
                </button>
              </div>

              <div className="card text-center">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Conversion Tracking</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Monitor sales and lead generation
                </p>
                <button className="btn-secondary w-full">
                  Configure
                </button>
              </div>

              <div className="card text-center">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">User Insights</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Understand your audience better
                </p>
                <button className="btn-secondary w-full">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Setup</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <Instagram className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Instagram</p>
                  <button className="btn-secondary text-sm mt-2">Connect</button>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <Facebook className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Facebook</p>
                  <button className="btn-secondary text-sm mt-2">Connect</button>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <Twitter className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Twitter</p>
                  <button className="btn-secondary text-sm mt-2">Connect</button>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <Linkedin className="w-8 h-8 text-blue-700 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">LinkedIn</p>
                  <button className="btn-secondary text-sm mt-2">Connect</button>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Calendar</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Weekly Posts</p>
                    <p className="text-sm text-gray-600">3-5 posts per week recommended</p>
                  </div>
                  <button className="btn-secondary text-sm">Schedule</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Content Ideas</p>
                    <p className="text-sm text-gray-600">AI-generated content suggestions</p>
                  </div>
                  <button className="btn-secondary text-sm">Generate</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
} 