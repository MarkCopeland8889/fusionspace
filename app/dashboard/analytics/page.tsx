'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/Header'
import { 
  BarChart3, 
  Users, 
  Eye, 
  TrendingUp, 
  Download,
  Calendar,
  Globe,
  Filter
} from 'lucide-react'

export default function AnalyticsPage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const [selectedProject, setSelectedProject] = useState('all')
  const [timeRange, setTimeRange] = useState('7d')
  const [showUserData, setShowUserData] = useState(false)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in')
    }
  }, [isLoaded, isSignedIn])

  const projects = [
    { id: 'all', name: 'All Projects' },
    { id: '1', name: 'My First Website' },
    { id: '2', name: 'E-commerce Store' },
    { id: '3', name: 'Portfolio Site' }
  ]

  const timeRanges = [
    { value: '1d', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' }
  ]

  // Mock data
  const viewsData = [
    { date: '2024-01-01', views: 120 },
    { date: '2024-01-02', views: 145 },
    { date: '2024-01-03', views: 98 },
    { date: '2024-01-04', views: 167 },
    { date: '2024-01-05', views: 203 },
    { date: '2024-01-06', views: 189 },
    { date: '2024-01-07', views: 234 }
  ]

  const usersData = [
    { email: 'user1@example.com', country: 'United States', visits: 15, lastVisit: '2024-01-07' },
    { email: 'user2@example.com', country: 'Canada', visits: 8, lastVisit: '2024-01-06' },
    { email: 'user3@example.com', country: 'United Kingdom', visits: 12, lastVisit: '2024-01-07' },
    { email: 'user4@example.com', country: 'Germany', visits: 6, lastVisit: '2024-01-05' },
    { email: 'user5@example.com', country: 'Australia', visits: 9, lastVisit: '2024-01-07' }
  ]

  const stats = [
    { label: 'Total Views', value: '1,156', change: '+12%', icon: Eye },
    { label: 'Unique Users', value: '847', change: '+8%', icon: Users },
    { label: 'Avg. Session', value: '2m 34s', change: '+5%', icon: TrendingUp },
    { label: 'Bounce Rate', value: '34%', change: '-3%', icon: BarChart3 }
  ]

  const exportData = () => {
    const data = {
      project: selectedProject,
      timeRange,
      views: viewsData,
      users: usersData,
      stats
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${selectedProject}-${timeRange}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600 mt-2">Track your project performance and user engagement</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={exportData}
                  className="inline-flex items-center px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timeRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Filter className="w-4 h-4 mr-2 inline" />
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const isPositive = stat.change.startsWith('+')
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className={`text-sm font-medium ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-600 ml-1">vs last period</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Views Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Views</h3>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Last 7 days</span>
                </div>
              </div>
              
              <div className="h-64 flex items-end justify-between space-x-2">
                {viewsData.map((data, index) => {
                  const maxViews = Math.max(...viewsData.map(d => d.views))
                  const height = (data.views / maxViews) * 100
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-blue-100 rounded-t" style={{ height: `${height}%` }}>
                        <div className="w-full bg-blue-600 rounded-t" style={{ height: '100%' }}></div>
                      </div>
                      <span className="text-xs text-gray-600 mt-2">{data.views}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Users Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                <button
                  onClick={() => setShowUserData(!showUserData)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {showUserData ? 'Hide Details' : 'View Data'}
                </button>
              </div>
              
              {showUserData ? (
                <div className="space-y-3">
                  {usersData.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                        <p className="text-xs text-gray-600">{user.country}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">{user.visits} visits</p>
                        <p className="text-xs text-gray-600">{user.lastVisit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click "View Data" to see user details</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Geographic Distribution</h3>
              <Globe className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { country: 'United States', percentage: 45, color: 'bg-blue-500' },
                { country: 'Canada', percentage: 20, color: 'bg-green-500' },
                { country: 'United Kingdom', percentage: 15, color: 'bg-yellow-500' },
                { country: 'Other', percentage: 20, color: 'bg-gray-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.country}</p>
                    <p className="text-xs text-gray-600">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 