"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const { toast } = useToast()

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerification = () => {
    const otpCode = otp.join("")
    if (otpCode.length === 6) {
      toast({
        title: "Verification Successful!",
        description: "You are now logged in.",
      })
      // Redirect to home
      window.location.href = "/"
    }
  }

  const handleResendOTP = () => {
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your email.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
          <h1 className="text-3xl font-bold gradient-text mb-2">Verify Your Account</h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to
            <br />
            <span className="font-semibold">your.email@university.edu</span>
          </p>
        </div>

        <Card className="glass-effect border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text text-center">Enter Verification Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-lg font-bold border-2 border-purple-200 focus:border-purple-400"
                />
              ))}
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleVerification}
                className="w-full gradient-bg text-white"
                disabled={otp.join("").length !== 6}
              >
                Verify & Continue
              </Button>

              <div className="text-center">
                <Button variant="link" className="text-purple-600" onClick={handleResendOTP}>
                  Resend Code
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
