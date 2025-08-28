"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AuthModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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

  const handleLogin = () => {
    toast({
      title: "Login Successful!",
      description: "Welcome back to LinkLedger.",
    })
    setShowOTP(true)
  }

  const handleRegister = () => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Registration Successful!",
      description: "Please verify your email with the OTP sent.",
    })
    setShowOTP(true)
  }

  const handleOTPVerification = () => {
    const otpCode = otp.join("")
    if (otpCode.length === 6) {
      toast({
        title: "Verification Successful!",
        description: "You are now logged in.",
      })
      onOpenChange(false)
      // Reset states
      setShowOTP(false)
      setShowForgotPassword(false)
      setOtp(["", "", "", "", "", ""])
    }
  }

  const handleForgotPassword = () => {
    toast({
      title: "Reset Link Sent!",
      description: "Check your email for password reset instructions.",
    })
    setShowForgotPassword(false)
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 },
    },
  }

  if (showOTP) {
    return (
      <AnimatePresence>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-md">
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <DialogHeader>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <DialogTitle className="text-2xl gradient-text text-center">Verify Your Account</DialogTitle>
                </motion.div>
              </DialogHeader>

              <motion.div className="space-y-6" variants={contentVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants} className="text-center">
                  <p className="text-gray-600">
                    We've sent a 6-digit code to
                    <br />
                    <span className="font-semibold">{email}</span>
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileFocus={{ scale: 1.1 }}
                    >
                      <Input
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-lg font-bold border-2 border-purple-200 focus:border-purple-400"
                      />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleOTPVerification}
                      className="w-full gradient-bg text-white"
                      disabled={otp.join("").length !== 6}
                    >
                      Verify & Continue
                    </Button>
                  </motion.div>

                  <div className="text-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="link" className="text-purple-600">
                        Resend Code
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="ghost" onClick={() => setShowOTP(false)} className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Login
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    )
  }

  if (showForgotPassword) {
    return (
      <AnimatePresence>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-md">
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <DialogHeader>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <DialogTitle className="text-2xl gradient-text">Reset Password</DialogTitle>
                </motion.div>
              </DialogHeader>

              <motion.div className="space-y-6" variants={contentVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="reset-email">Email Address</Label>
                  <div className="relative">
                    <motion.div
                      animate={{
                        x: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                      }}
                    >
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-purple-200 focus:border-purple-400"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={handleForgotPassword} className="w-full gradient-bg text-white">
                      Send Reset Link
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="ghost" onClick={() => setShowForgotPassword(false)} className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Login
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-md">
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <DialogHeader>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <DialogTitle className="text-2xl gradient-text text-center">Welcome to LinkLedger</DialogTitle>
                </motion.div>
              </DialogHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="login"
                      className="data-[state=active]:gradient-bg data-[state=active]:text-white"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="register"
                      className="data-[state=active]:gradient-bg data-[state=active]:text-white"
                    >
                      Register
                    </TabsTrigger>
                  </TabsList>
                </motion.div>

                <AnimatePresence mode="sync">
                  <TabsContent value="login" className="space-y-4">
                    <motion.div
                      key="login"
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <motion.div
                            animate={{
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 4,
                            }}
                          >
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          </motion.div>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              id="login-email"
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-10 border-purple-200 focus:border-purple-400"
                            />
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              id="login-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="pl-10 pr-10 border-purple-200 focus:border-purple-400"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="text-right">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="link"
                            className="text-purple-600 p-0"
                            onClick={() => setShowForgotPassword(true)}
                          >
                            Forgot Password?
                          </Button>
                        </motion.div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button onClick={handleLogin} className="w-full gradient-bg text-white">
                            Login
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="register" className="space-y-4">
                    <motion.div
                      key="register"
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="register-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              id="register-name"
                              type="text"
                              placeholder="Enter your full name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="pl-10 border-purple-200 focus:border-purple-400"
                            />
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              id="register-email"
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-10 border-purple-200 focus:border-purple-400"
                            />
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              id="register-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="pl-10 pr-10 border-purple-200 focus:border-purple-400"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              id="confirm-password"
                              type="password"
                              placeholder="Confirm your password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="pl-10 border-purple-200 focus:border-purple-400"
                            />
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button onClick={handleRegister} className="w-full gradient-bg text-white">
                            Create Account
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
