'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Users, Shield, Globe, Code, Rocket } from 'lucide-react'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  const { user, isSignedIn } = useUser()
  const [prompt, setPrompt] = useState('')
  const [showSignupPrompt, setShowSignupPrompt] = useState(false)

  const handleTryPrompt = () => {
    if (!isSignedIn) {
      setShowSignupPrompt(true)
    } else {
      // Redirect to dashboard with the prompt
      window.location.href = `/dashboard?prompt=${encodeURIComponent(prompt)}`
    }
  }

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI-Powered Generation',
      description: 'Describe what you want and watch AI create your entire application instantly.'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Real React/Next.js Code',
      description: 'Get production-ready code that you can customize, export, or deploy immediately.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Live Preview',
      description: 'See your changes in real-time without waiting for deployment or setup.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Built for Developers',
      description: 'Perfect for MVPs, admin panels, SaaS tools, or any custom application.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Business Ready',
      description: 'Clean, responsive sites with booking forms, product pages, and contact forms.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Instant Deployment',
      description: 'Deploy your projects with one click and get a live URL immediately.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Build Modern Web Apps
            <span className="block text-blue-600">Instantly with AI</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-gray-600">
            FusionSpace helps you create stunning websites, dashboards, and applications without writing boilerplate code. 
            Just describe what you want, and watch it come to life.
          </p>
          
          {/* Try Out Section */}
          <div className="max-w-xl mx-auto mt-10">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Describe your website or app..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleTryPrompt()}
              />
              <button
                onClick={handleTryPrompt}
                className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Try It
              </button>
            </div>
            
            {showSignupPrompt && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800">
                  Sign up to start building! Get access to our AI-powered builder and free sales & marketing training.
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                  >
                    Sign Up Free
                  </Link>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need to build and launch
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Whether you're a developer or business owner, FusionSpace has you covered
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-center w-12 h-12 mb-4 text-blue-600 bg-blue-100 rounded-lg">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sales & Marketing Training Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="w-8 h-8 text-green-600 mr-2" />
            <h2 className="text-3xl font-bold text-gray-900">Free Sales & Marketing Training</h2>
          </div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
            Get your first customers with our comprehensive roadmap. Learn proven strategies to market your product 
            and build a successful business from the ground up.
          </p>
          <Link
            href={isSignedIn ? '/dashboard/launch-business' : '/sign-up'}
            className="inline-flex items-center px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Learning
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to build something amazing?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of developers and business owners who are building faster with FusionSpace
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Building Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 