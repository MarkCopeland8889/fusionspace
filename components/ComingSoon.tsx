'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Clock, Sparkles } from 'lucide-react'

interface ComingSoonProps {
  title?: string
  description?: string
  showBackButton?: boolean
  backUrl?: string
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "We're working hard to bring you this feature. Stay tuned for updates!",
  showBackButton = true,
  backUrl
}: ComingSoonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl)
    } else {
      router.back()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-full">
            <Clock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-8">{description}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-purple-600 bg-purple-100 rounded-full">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">We're Building Something Amazing</h2>
          <p className="text-gray-600">
            Our team is working tirelessly to bring you this feature. We'll notify you as soon as it's ready!
          </p>
        </div>

        {showBackButton && (
          <button
            onClick={handleBack}
            className="inline-flex items-center px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        )}
      </div>
    </div>
  )
} 