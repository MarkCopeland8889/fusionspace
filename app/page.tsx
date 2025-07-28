'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Code, Eye, Settings, Rocket, MessageSquare } from 'lucide-react'
import PromptInput from '@/components/PromptInput'
import CodeEditor from '@/components/CodeEditor'
import LivePreview from '@/components/LivePreview'
import BusinessTools from '@/components/BusinessTools'
import toast from 'react-hot-toast'

export default function Home() {
  const [currentView, setCurrentView] = useState<'prompt' | 'editor' | 'preview' | 'business'>('prompt')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateCode = async (prompt: string) => {
    setIsGenerating(true)
    try {
      // Use Gemini AI for code generation
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, model: 'gemini' }),
      })

      const result = await response.json()
      
      if (result.success) {
        setGeneratedCode(result.content)
        setCurrentView('editor')
        toast.success(`Website generated successfully using ${result.model}!`)
      } else {
        throw new Error(result.error || 'Failed to generate website')
      }
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to generate website. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateSampleCode = (prompt: string) => {
    // This is a simplified example - in production, this would call OpenAI API
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prompt.includes('business') ? 'My Business' : 'My Website'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <h1 class="text-xl font-bold text-gray-900">${prompt.includes('business') ? 'My Business' : 'My Website'}</h1>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="#" class="text-gray-700 hover:text-gray-900">Home</a>
                    <a href="#" class="text-gray-700 hover:text-gray-900">About</a>
                    <a href="#" class="text-gray-700 hover:text-gray-900">Contact</a>
                </div>
            </div>
        </div>
    </nav>
    
    <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Welcome to ${prompt.includes('business') ? 'Our Business' : 'Our Website'}</h2>
            <p class="text-xl text-gray-600 mb-8">${prompt}</p>
            <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
            </button>
        </div>
    </main>
</body>
</html>`
  }

  const navigationItems = [
    { id: 'prompt', label: 'AI Prompt', icon: Sparkles },
    { id: 'editor', label: 'Code Editor', icon: Code },
    { id: 'preview', label: 'Live Preview', icon: Eye },
    { id: 'business', label: 'Business Tools', icon: Rocket },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI Website Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as any)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    currentView === item.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentView === 'prompt' && (
            <PromptInput onGenerate={handleGenerateCode} isGenerating={isGenerating} />
          )}
          
          {currentView === 'editor' && (
            <CodeEditor 
              code={generatedCode} 
              onCodeChange={setGeneratedCode}
              onViewPreview={() => setCurrentView('preview')}
            />
          )}
          
          {currentView === 'preview' && (
            <LivePreview 
              code={generatedCode}
              onBackToEditor={() => setCurrentView('editor')}
            />
          )}
          
          {currentView === 'business' && (
            <BusinessTools />
          )}
        </motion.div>
      </main>
    </div>
  )
} 