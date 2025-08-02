'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Rocket, 
  BarChart3, 
  Users, 
  Settings, 
  Sparkles,
  DollarSign,
  BookOpen
} from 'lucide-react'

export default function DashboardSidebar() {
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: pathname === '/dashboard'
    },
    {
      name: 'Launch Your Business',
      href: '/dashboard/launch-business',
      icon: Rocket,
      current: pathname === '/dashboard/launch-business'
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      current: pathname === '/dashboard/analytics'
    },
    {
      name: 'Community',
      href: '/dashboard/community',
      icon: Users,
      current: pathname === '/dashboard/community',
      comingSoon: true
    },
    {
      name: 'Affiliates',
      href: '/dashboard/affiliates',
      icon: DollarSign,
      current: pathname === '/dashboard/affiliates',
      comingSoon: true
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      current: pathname === '/dashboard/settings'
    }
  ]

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.comingSoon ? '#' : item.href}
                onClick={item.comingSoon ? (e) => e.preventDefault() : undefined}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  item.current
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                } ${item.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
                {item.comingSoon && (
                  <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    Soon
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Credits Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Credits</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Daily Credits</span>
                <span>8/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Monthly Credits</span>
                <span>35/50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <Link
              href="/pricing"
              className="flex items-center text-xs text-blue-600 hover:text-blue-700"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Upgrade Plan
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Links</h3>
          <div className="space-y-2">
            <Link
              href="/docs"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Documentation
            </Link>
            <Link
              href="/help"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 