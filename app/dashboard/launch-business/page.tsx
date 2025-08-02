'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/Header'
import { 
  Rocket, 
  Target, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Mail, 
  Globe,
  BookOpen,
  Play,
  CheckCircle
} from 'lucide-react'

export default function LaunchBusinessPage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const [activeModule, setActiveModule] = useState(0)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in')
    }
  }, [isLoaded, isSignedIn])

  const modules = [
    {
      id: 1,
      title: 'Understanding Your Market',
      description: 'Learn how to identify and understand your target audience',
      duration: '15 min',
      lessons: [
        'Defining your target audience',
        'Market research techniques',
        'Competitive analysis',
        'Customer persona development'
      ],
      completed: true
    },
    {
      id: 2,
      title: 'Building Your Brand',
      description: 'Create a compelling brand that resonates with your audience',
      duration: '20 min',
      lessons: [
        'Brand positioning',
        'Visual identity design',
        'Brand voice and messaging',
        'Brand consistency'
      ],
      completed: true
    },
    {
      id: 3,
      title: 'Digital Marketing Fundamentals',
      description: 'Master the basics of digital marketing',
      duration: '25 min',
      lessons: [
        'SEO basics',
        'Social media marketing',
        'Email marketing',
        'Content marketing'
      ],
      completed: false
    },
    {
      id: 4,
      title: 'Customer Acquisition',
      description: 'Strategies to attract and convert your first customers',
      duration: '30 min',
      lessons: [
        'Lead generation',
        'Sales funnel optimization',
        'Conversion rate optimization',
        'Customer retention'
      ],
      completed: false
    },
    {
      id: 5,
      title: 'Growth Strategies',
      description: 'Scale your business with proven growth tactics',
      duration: '35 min',
      lessons: [
        'Viral marketing',
        'Partnership strategies',
        'Referral programs',
        'Scaling operations'
      ],
      completed: false
    }
  ]

  const stats = [
    { label: 'Students Enrolled', value: '2,847', icon: Users },
    { label: 'Average Rating', value: '4.8/5', icon: TrendingUp },
    { label: 'Completion Rate', value: '94%', icon: CheckCircle },
    { label: 'Success Stories', value: '156', icon: Rocket }
  ]

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
            <div className="flex items-center mb-4">
              <Rocket className="w-8 h-8 text-green-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Launch Your Business</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl">
              Get your first customers with our comprehensive sales and marketing training. 
              Learn proven strategies to market your product and build a successful business from the ground up.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Course Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Module List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Course Modules</h2>
                  <p className="text-gray-600 mt-1">Complete these modules to master business launch</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {modules.map((module, index) => (
                      <div
                        key={module.id}
                        className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                          activeModule === index
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveModule(index)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h3 className="font-semibold text-gray-900">{module.title}</h3>
                              {module.completed && (
                                <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <BookOpen className="w-4 h-4 mr-1" />
                              {module.duration}
                            </div>
                          </div>
                          <button className="ml-4 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                            <Play className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Current Module */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {modules[activeModule]?.title}
                </h3>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-4">
                    {modules[activeModule]?.description}
                  </p>
                  
                  <div className="space-y-3">
                    {modules[activeModule]?.lessons.map((lesson, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Module
                </button>
              </div>

              {/* Quick Tips */}
              <div className="bg-blue-50 rounded-lg p-6 mt-6">
                <h4 className="font-semibold text-blue-900 mb-3">Quick Tips</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Focus on one marketing channel at a time</li>
                  <li>• Always track your results</li>
                  <li>• Test different approaches</li>
                  <li>• Listen to your customers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Launch Your Business?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have successfully launched their businesses 
              using these proven strategies. Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Start Learning
              </button>
              <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                View Success Stories
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 