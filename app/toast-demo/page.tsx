"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'
import Link from "next/link"
import { useToastTrigger } from "@/hooks/use-global-toast"

export default function ToastDemoPage() {
  const toast = useToastTrigger()

  const demoMessages = {
    success: [
      "Item posted successfully! 🎉",
      "Claim approved and user notified",
      "Profile updated successfully",
      "Password changed successfully",
      "Email verification sent ✓"
    ],
    error: [
      "Failed to upload image. Please try again.",
      "Invalid credentials. Please check your login details.",
      "Network error. Please check your connection.",
      "File size too large. Maximum 10MB allowed.",
      "Session expired. Please login again."
    ],
    warning: [
      "Your session will expire in 5 minutes",
      "Please verify your email address",
      "Some fields are missing information",
      "This action cannot be undone",
      "Low storage space remaining"
    ],
    info: [
      "New features available! Check them out",
      "Maintenance scheduled for tonight at 2 AM",
      "Your item has received 3 new claims",
      "System will be updated in 30 minutes",
      "Welcome to LinkLedger! Here's how to get started"
    ]
  }

  const getRandomMessage = (type: keyof typeof demoMessages) => {
    const messages = demoMessages[type]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="glass-effect border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold gradient-text">Toast Notification Demo</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-4">Global Toast System</h2>
          <p className="text-lg text-gray-600">
            Test all toast notification types with vibrant gradients and smooth animations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Success Toasts */}
          <Card className="glass-effect border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Success Toasts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Green to blue-pink gradient for positive actions
              </p>
              <Button
                onClick={() => toast.success(getRandomMessage('success'))}
                className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white"
              >
                Trigger Success Toast
              </Button>
              <Button
                onClick={() => toast.success("Custom duration toast", 10000)}
                variant="outline"
                className="w-full border-green-300 text-green-700 hover:bg-green-50"
              >
                Long Duration (10s)
              </Button>
            </CardContent>
          </Card>

          {/* Error Toasts */}
          <Card className="glass-effect border-2 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="h-5 w-5" />
                Error Toasts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Red gradient for errors and failures
              </p>
              <Button
                onClick={() => toast.error(getRandomMessage('error'))}
                className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white"
              >
                Trigger Error Toast
              </Button>
              <Button
                onClick={() => toast.error("Quick error message", 2000)}
                variant="outline"
                className="w-full border-red-300 text-red-700 hover:bg-red-50"
              >
                Short Duration (2s)
              </Button>
            </CardContent>
          </Card>

          {/* Warning Toasts */}
          <Card className="glass-effect border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <AlertTriangle className="h-5 w-5" />
                Warning Toasts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Yellow to orange gradient for warnings
              </p>
              <Button
                onClick={() => toast.warning(getRandomMessage('warning'))}
                className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white"
              >
                Trigger Warning Toast
              </Button>
              <Button
                onClick={() => toast.warning("Multiple warnings can stack")}
                variant="outline"
                className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50"
              >
                Stack Multiple
              </Button>
            </CardContent>
          </Card>

          {/* Info Toasts */}
          <Card className="glass-effect border-2 border-violet-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-violet-700">
                <Info className="h-5 w-5" />
                Info Toasts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Violet to light blue gradient for information
              </p>
              <Button
                onClick={() => toast.info(getRandomMessage('info'))}
                className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-blue-400 text-white"
              >
                Trigger Info Toast
              </Button>
              <Button
                onClick={() => toast.info("This is a very long informational message that demonstrates how the toast handles longer text content gracefully with proper wrapping and spacing", 8000)}
                variant="outline"
                className="w-full border-violet-300 text-violet-700 hover:bg-violet-50"
              >
                Long Message
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bulk Actions */}
        <Card className="glass-effect border-2 border-purple-200 mt-8">
          <CardHeader>
            <CardTitle className="gradient-text">Bulk Actions & Edge Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => {
                  toast.success("First toast")
                  setTimeout(() => toast.warning("Second toast"), 500)
                  setTimeout(() => toast.info("Third toast"), 1000)
                  setTimeout(() => toast.error("Fourth toast"), 1500)
                }}
                className="gradient-bg text-white"
              >
                Trigger Multiple
              </Button>
              <Button
                onClick={() => {
                  for (let i = 1; i <= 5; i++) {
                    setTimeout(() => toast.info(`Toast #${i}`), i * 200)
                  }
                }}
                variant="outline"
                className="border-purple-300"
              >
                Rapid Fire (5)
              </Button>
              <Button
                onClick={() => toast.success("This toast will stay for 15 seconds", 15000)}
                variant="outline"
                className="border-purple-300"
              >
                Very Long (15s)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Developer Guide Preview */}
        <Card className="glass-effect border-2 border-blue-200 mt-8">
          <CardHeader>
            <CardTitle className="text-blue-700">Quick Usage Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="space-y-2">
                <div>
                  <span className="text-blue-400">import</span> {`{ useToastTrigger }`} <span className="text-blue-400">from</span> <span className="text-yellow-300">'@/hooks/use-global-toast'</span>
                </div>
                <div className="text-gray-500">// In your component:</div>
                <div>
                  <span className="text-blue-400">const</span> toast = <span className="text-yellow-300">useToastTrigger</span>()
                </div>
                <div className="text-gray-500">// Usage:</div>
                <div>toast.<span className="text-green-300">success</span>(<span className="text-yellow-300">"Success message"</span>)</div>
                <div>toast.<span className="text-red-300">error</span>(<span className="text-yellow-300">"Error message"</span>)</div>
                <div>toast.<span className="text-orange-300">warning</span>(<span className="text-yellow-300">"Warning message"</span>)</div>
                <div>toast.<span className="text-purple-300">info</span>(<span className="text-yellow-300">"Info message"</span>, <span className="text-blue-300">8000</span>)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
