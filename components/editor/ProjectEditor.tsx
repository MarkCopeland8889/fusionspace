'use client'

import { useState, useEffect } from 'react'
import { useFusionSpaceStore } from '@/lib/store'
import { useAI } from '@/lib/hooks/useAI'
import { Project } from '@/lib/supabase'
import { 
  Eye, 
  Code, 
  Terminal, 
  Sparkles, 
  Send, 
  Download,
  Save,
  RotateCcw
} from 'lucide-react'
import toast from 'react-hot-toast'

interface ProjectEditorProps {
  project: Project
}

export default function ProjectEditor({ project }: ProjectEditorProps) {
  const {
    editor,
    chat,
    setActiveFile,
    setFileContent,
    setActiveTab,
    setShowFileViewer,
    addMessage,
    setTyping,
  } = useFusionSpaceStore()

  const {
    generateCode,
    isGenerating,
    error,
    clearError,
  } = useAI()

  const [inputValue, setInputValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Initialize project files if empty
  useEffect(() => {
    if (Object.keys(editor.fileContent).length === 0 && project.files.length > 0) {
      const initialContent: Record<string, string> = {}
      project.files.forEach(file => {
        initialContent[file] = getDefaultContent(file)
      })
      
      Object.entries(initialContent).forEach(([file, content]) => {
        setFileContent(file, content)
      })
      
      setActiveFile(project.files[0])
    }
  }, [project.files, editor.fileContent, setFileContent, setActiveFile])

  const getDefaultContent = (filename: string): string => {
    if (filename.endsWith('.html')) {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-8">Welcome to ${project.name}</h1>
        <p class="text-center text-gray-600">Your project is ready to be customized!</p>
    </div>
    <script src="script.js"></script>
</body>
</html>`
    } else if (filename.endsWith('.css')) {
      return `/* Custom styles for ${project.name} */

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

/* Add your custom styles here */`
    } else if (filename.endsWith('.js')) {
      return `// JavaScript for ${project.name}

document.addEventListener('DOMContentLoaded', function() {
    console.log('${project.name} loaded successfully!');
    
    // Add your JavaScript functionality here
});`
    }
    return ''
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isGenerating) return

    const message = inputValue.trim()
    setInputValue('')

    try {
      setIsProcessing(true)

      // Add user message to chat
      addMessage({
        role: 'user',
        content: message,
        type: 'text',
      })

      // Generate code based on the message
      const result = await generateCode({
        prompt: message,
        projectType: project.type,
        existingCode: {
          html: editor.fileContent['index.html'] || '',
          css: editor.fileContent['styles.css'] || '',
          javascript: editor.fileContent['script.js'] || '',
        },
      })

      // Parse the result and update files
      if (result && typeof result === 'string') {
        try {
          const parsedResult = JSON.parse(result)
          
          if (parsedResult.html) {
            setFileContent('index.html', parsedResult.html)
          }
          if (parsedResult.css) {
            setFileContent('styles.css', parsedResult.css)
          }
          if (parsedResult.javascript) {
            setFileContent('script.js', parsedResult.javascript)
          }
        } catch (parseError) {
          // If it's not JSON, treat it as HTML content
          setFileContent('index.html', result)
        }
      }

      toast.success('Code updated successfully!')

    } catch (error) {
      console.error('Error generating code:', error)
      toast.error('Failed to generate code. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = (file: string) => {
    setActiveFile(file)
    setActiveTab('code')
  }

  const handleSave = () => {
    toast.success('Project saved successfully!')
  }

  const handleDownload = () => {
    // Create a zip file with all project files
    const zip = new JSZip()
    
    Object.entries(editor.fileContent).forEach(([filename, content]) => {
      zip.file(filename, content)
    })
    
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${project.name}.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    })
  }

  const renderPreview = () => {
    const htmlContent = editor.fileContent['index.html'] || ''
    const cssContent = editor.fileContent['styles.css'] || ''
    const jsContent = editor.fileContent['script.js'] || ''

    const fullHTML = htmlContent.replace(
      '</head>',
      `<style>${cssContent}</style></head>`
    ).replace(
      '</body>',
      `<script>${jsContent}</script></body>`
    )

    return (
      <div className="h-full bg-white">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">Live Preview</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                className="inline-flex items-center px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <iframe
              srcDoc={fullHTML}
              className="w-full h-full border-0"
              title="Project Preview"
            />
          </div>
        </div>
      </div>
    )
  }

  const renderCodeEditor = () => {
    const activeFile = editor.activeFile
    const content = activeFile ? editor.fileContent[activeFile] || '' : ''

    return (
      <div className="h-full bg-gray-900 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="font-medium text-white">Code Editor</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveFile(activeFile)}
              className="text-gray-400 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <textarea
            value={content}
            onChange={(e) => activeFile && setFileContent(activeFile, e.target.value)}
            className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none border-0 focus:ring-0"
            placeholder="Start coding..."
          />
        </div>
      </div>
    )
  }

  const renderTerminal = () => {
    return (
      <div className="h-full bg-gray-900 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="font-medium text-white">Terminal</h3>
        </div>
        <div className="flex-1 p-4">
          <div className="text-green-400 font-mono text-sm">
            <div>$ npm start</div>
            <div>Starting development server...</div>
            <div>Server running on http://localhost:3000</div>
            <div className="mt-4">$ Ready for development!</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex">
      {/* AI Chat Interface */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">AI Assistant</h3>
          <p className="text-sm text-gray-600">Ask me to help you build your project</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {chat.messages.length === 0 && (
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  Hi! I'm here to help you build your {project.type === 'simple' ? 'website' : 'application'}. 
                  What would you like to work on?
                </p>
              </div>
            )}
            
            {chat.messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-100 text-blue-900 ml-8'
                    : 'bg-gray-100 text-gray-900 mr-8'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
            
            {chat.isTyping && (
              <div className="bg-gray-100 rounded-lg p-3 mr-8">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isGenerating || isProcessing}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isGenerating || isProcessing}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* File Viewer */}
      {editor.showFileViewer && (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Files</h3>
            <button
              onClick={() => setShowFileViewer(false)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {project.files.map((file) => (
                <button
                  key={file}
                  onClick={() => handleFileSelect(file)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center transition-colors ${
                    editor.activeFile === file
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Code className="w-4 h-4 mr-2 text-gray-400" />
                  {file}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  editor.activeTab === 'preview'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  editor.activeTab === 'code'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code className="w-4 h-4 mr-2" />
                Edit Code
              </button>
              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  editor.activeTab === 'terminal'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Terminal className="w-4 h-4 mr-2" />
                Terminal
              </button>
            </div>
            
            {!editor.showFileViewer && (
              <button
                onClick={() => setShowFileViewer(true)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <Code className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {editor.activeTab === 'preview' && renderPreview()}
          {editor.activeTab === 'code' && renderCodeEditor()}
          {editor.activeTab === 'terminal' && renderTerminal()}
        </div>
      </div>
    </div>
  )
} 