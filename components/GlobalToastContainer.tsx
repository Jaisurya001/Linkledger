"use client"

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useGlobalToast, type Toast, type ToastStatus } from '@/hooks/use-global-toast'

const statusConfig = {
  success: {
    gradient: 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600',
    icon: '✓',
    bgColor: 'bg-gradient-to-r from-green-50 to-blue-50',
    borderColor: 'border-green-200',
  },
  error: {
    gradient: 'bg-gradient-to-r from-red-500 via-pink-500 to-red-600',
    icon: '✕',
    bgColor: 'bg-gradient-to-r from-red-50 to-pink-50',
    borderColor: 'border-red-200',
  },
  warning: {
    gradient: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500',
    icon: '⚠',
    bgColor: 'bg-gradient-to-r from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200',
  },
  info: {
    gradient: 'bg-gradient-to-r from-violet-500 via-purple-500 to-blue-400',
    icon: 'ℹ',
    bgColor: 'bg-gradient-to-r from-violet-50 to-blue-50',
    borderColor: 'border-violet-200',
  },
}

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast, hideToast } = useGlobalToast()
  const [progress, setProgress] = useState(100)
  const config = statusConfig[toast.status]

  useEffect(() => {
    const duration = toast.duration || 5000
    const interval = 50 // Update every 50ms
    const decrement = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - decrement
        return newProgress <= 0 ? 0 : newProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [toast.duration])

  const handleDismiss = () => {
    hideToast(toast.id)
    setTimeout(() => removeToast(toast.id), 300)
  }

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border-2 ${config.borderColor} ${config.bgColor}
        backdrop-blur-md shadow-lg transform transition-all duration-300 ease-out
        ${toast.isVisible 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
        w-full max-w-sm mx-auto sm:mx-0
      `}
    >
      {/* Main Content */}
      <div className="p-4 pr-12">
        <div className="flex items-start space-x-3">
          {/* Status Icon */}
          <div className={`
            w-8 h-8 rounded-full ${config.gradient} 
            flex items-center justify-center text-white font-bold text-sm
            shadow-lg
          `}>
            {config.icon}
          </div>
          
          {/* Message */}
          <div className="flex-1 min-w-0">
            <p className="text-gray-800 font-medium leading-relaxed">
              {toast.message}
            </p>
          </div>
        </div>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/80 hover:bg-white 
                   flex items-center justify-center transition-colors duration-200
                   text-gray-600 hover:text-gray-800"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
        <div
          className={`h-full ${config.gradient} transition-all duration-75 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default function GlobalToastContainer() {
  const toasts = useGlobalToast((state) => state.toasts)

  if (toasts.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Desktop: Bottom-right */}
      <div className="hidden sm:block absolute bottom-6 right-6 space-y-3 pointer-events-auto">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>

      {/* Mobile: Bottom-center */}
      <div className="sm:hidden absolute bottom-6 left-4 right-4 space-y-3 pointer-events-auto">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  )
}
