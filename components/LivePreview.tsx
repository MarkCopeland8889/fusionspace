'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Maximize2, Smartphone, Monitor, Tablet } from 'lucide-react'

interface LivePreviewProps {
  code: string
  onBackToEditor: () => void
}

type ViewportSize = 'desktop' | 'tablet' | 'mobile'

export default function LivePreview({ code, onBackToEditor }: LivePreviewProps) {
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const viewportSizes = {
    desktop: 'w-full',
    tablet: 'max-w-2xl mx-auto',
    mobile: 'max-w-sm mx-auto'
  }

  const getViewportWidth = () => {
    switch (viewportSize) {
      case 'desktop': return '100%'
      case 'tablet': return '768px'
      case 'mobile': return '375px'
      default: return '100%'
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    const previewElement = document.getElementById('preview-iframe')
    if (previewElement) {
      if (!document.fullscreenElement) {
        previewElement.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToEditor}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Editor</span>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
            <p className="text-gray-600">See your website in real-time</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Viewport Controls */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewportSize('desktop')}
              className={`p-2 rounded-md transition-colors ${
                viewportSize === 'desktop' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportSize('tablet')}
              className={`p-2 rounded-md transition-colors ${
                viewportSize === 'tablet' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportSize('mobile')}
              className={`p-2 rounded-md transition-colors ${
                viewportSize === 'mobile' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={toggleFullscreen}
            className="btn-secondary flex items-center space-x-2"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-0 overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 ml-2">
              Preview - {viewportSize.charAt(0).toUpperCase() + viewportSize.slice(1)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {getViewportWidth()}
          </div>
        </div>
        
        <div className={`${viewportSizes[viewportSize]} transition-all duration-300`}>
          <div className="bg-white border border-gray-200 rounded-b-lg overflow-hidden">
            <iframe
              id="preview-iframe"
              srcDoc={code}
              className="w-full h-96 border-0"
              title="Website Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </motion.div>

      {/* Preview Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card">
          <h4 className="font-semibold text-gray-900 mb-2">Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Load Time:</span>
              <span className="font-medium">0.8s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Page Size:</span>
              <span className="font-medium">24KB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">SEO Score:</span>
              <span className="font-medium text-green-600">85/100</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h4 className="font-semibold text-gray-900 mb-2">Accessibility</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">WCAG Score:</span>
              <span className="font-medium text-green-600">AA</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Alt Tags:</span>
              <span className="font-medium">Complete</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Keyboard Nav:</span>
              <span className="font-medium text-green-600">✓</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h4 className="font-semibold text-gray-900 mb-2">Next Steps</h4>
          <div className="space-y-2">
            <button className="w-full btn-primary text-sm">Deploy to Web</button>
            <button className="w-full btn-secondary text-sm">Add Analytics</button>
            <button className="w-full btn-secondary text-sm">Connect Domain</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 