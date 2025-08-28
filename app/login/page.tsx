"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { useToastTrigger } from "@/hooks/use-global-toast"
import ForgotPasswordModal from "@/components/ForgotPasswordModal"

// Sample credentials for demo
const DEMO_CREDENTIALS = {
  email: "test@example.com",
  password: "password123"
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToastTrigger()

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warning("Please fill in all fields")
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      toast.success("Login successful! Welcome back to LinkLedger 🎉")
      setTimeout(() => {
        window.location.href = "/verify-otp"
      }, 1500)
    } else {
      toast.error("Invalid credentials. Please check your email and password.")
    }

    setIsLoading(false)
  }

  const showDemoCredentials = () => {
    toast.info(`Demo credentials: ${DEMO_CREDENTIALS.email} / ${DEMO_CREDENTIALS.password}`, 7000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your LinkLedger account</p>
        </div>

        <Card className="glass-effect border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text text-center">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Demo Credentials Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Demo Mode</p>
                  <p className="text-xs text-blue-600">Click to see demo credentials</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={showDemoCredentials}
                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  Show
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-purple-200 focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-purple-200 focus:border-purple-400"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <Button variant="link" className="text-purple-600 p-0" onClick={() => setShowForgotModal(true)}>
                  Forgot Password?
                </Button>
              </div>

              <Button 
                onClick={handleLogin} 
                className="w-full gradient-bg text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ForgotPasswordModal open={showForgotModal} onOpenChange={setShowForgotModal} />
    </div>
  )
}
