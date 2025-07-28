'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Editor } from '@monaco-editor/react'
import { Eye, MessageSquare, Save, Download, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'

interface CodeEditorProps {
  code: string
  onCodeChange: (code: string) => void
  onViewPreview: () => void
}

export default function CodeEditor({ code, onCodeChange, onViewPreview }: CodeEditorProps) {
  const [aiPrompt, setAiPrompt] = useState('')
  const [isAiProcessing, setIsAiProcessing] = useState(false)

  const handleAiEdit = async () => {
    if (!aiPrompt.trim()) return
    
    setIsAiProcessing(true)
    try {
      // Simulate AI processing (replace with actual OpenAI API call)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, we'll just add a comment
      const newCode = code + `\n<!-- AI Edit: ${aiPrompt} -->\n`
      onCodeChange(newCode)
      setAiPrompt('')
      toast.success('AI changes applied!')
    } catch (error) {
      toast.error('Failed to apply AI changes')
    } finally {
      setIsAiProcessing(false)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'website.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Website downloaded!')
  }

  const handleSave = () => {
    // In a real app, this would save to a database or cloud storage
    localStorage.setItem('savedWebsite', code)
    toast.success('Website saved!')
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset? This will clear all changes.')) {
      onCodeChange('')
      toast.success('Website reset!')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Code Editor</h2>
          <p className="text-gray-600">Edit your website code manually or ask AI for help</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            className="btn-secondary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          <button
            onClick={onViewPreview}
            className="btn-primary flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* AI Assistant */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center space-x-2 mb-4">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">AI Assistant</h3>
        </div>
        <div className="flex space-x-3">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Ask AI to make changes... (e.g., 'Add a contact form', 'Change colors to blue')"
            className="input-field flex-1"
            disabled={isAiProcessing}
          />
          <button
            onClick={handleAiEdit}
            disabled={!aiPrompt.trim() || isAiProcessing}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            {isAiProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4" />
                <span>Ask AI</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Code Editor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-0 overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 ml-2">index.html</span>
          </div>
          <button
            onClick={handleReset}
            className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>
        </div>
        <div className="h-96">
          <Editor
            height="100%"
            defaultLanguage="html"
            value={code}
            onChange={(value) => onCodeChange(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="card text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Add Contact Form</h4>
          <p className="text-sm text-gray-600 mb-3">Quickly add a professional contact form</p>
          <button className="btn-secondary text-sm">Add Form</button>
        </div>
        <div className="card text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Optimize SEO</h4>
          <p className="text-sm text-gray-600 mb-3">Add meta tags and SEO optimization</p>
          <button className="btn-secondary text-sm">Optimize</button>
        </div>
        <div className="card text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Mobile Responsive</h4>
          <p className="text-sm text-gray-600 mb-3">Make your website mobile-friendly</p>
          <button className="btn-secondary text-sm">Make Responsive</button>
        </div>
      </motion.div>
    </div>
  )
} 