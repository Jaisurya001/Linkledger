"use client"

import { create } from 'zustand'

export type ToastStatus = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  status: ToastStatus
  duration?: number
  isVisible: boolean
}

interface ToastStore {
  toasts: Toast[]
  addToast: (message: string, status: ToastStatus, duration?: number) => void
  removeToast: (id: string) => void
  hideToast: (id: string) => void
}

export const useGlobalToast = create<ToastStore>((set, get) => ({
  toasts: [],
  
  addToast: (message: string, status: ToastStatus, duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      id,
      message,
      status,
      duration,
      isVisible: true,
    }
    
    set((state) => ({
      toasts: [...state.toasts, newToast]
    }))
    
    // Auto remove after duration
    setTimeout(() => {
      get().hideToast(id)
      setTimeout(() => {
        get().removeToast(id)
      }, 300) // Wait for exit animation
    }, duration)
  },
  
  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
  },
  
  hideToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    }))
  },
}))

// Convenience hook for easy usage
export const useToastTrigger = () => {
  const addToast = useGlobalToast((state) => state.addToast)
  
  return {
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error: (message: string, duration?: number) => addToast(message, 'error', duration),
    warning: (message: string, duration?: number) => addToast(message, 'warning', duration),
    info: (message: string, duration?: number) => addToast(message, 'info', duration),
  }
}
