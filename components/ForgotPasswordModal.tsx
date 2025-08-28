"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, X, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleForgotPassword = async () => {
    setIsLoading(true)


    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Reset Link Sent!",
      description: "Check your email for password reset instructions.",
    })
    setIsLoading(false)
    onOpenChange(false)
    setEmail("")
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

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="w-[95vw] h-auto max-h-[80vh] max-w-none max-h-none m-0 p-0 overflow-hidden [&>button.absolute]:hidden">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full flex flex-col"
            >
              {/* Custom Header with Close Button */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-purple-200 bg-white/80 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                  >
                    <Mail className="h-6 w-6 text-purple-600" />
                  </motion.div>
                  <DialogTitle className="text-2xl gradient-text">Reset Password</DialogTitle>
                </div>
                <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                  <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full gradient-bg text-white hover:opacity-80"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 flex items-center justify-center p-6">
                <motion.div
                  className="w-full max-w-md space-y-6"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="text-center">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <Mail className="h-10 w-10 text-purple-600" />
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">Forgot your password?</h3>
                    <p className="text-gray-600">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email Address</Label>
                      <div className="relative">
                        <motion.div
                          animate={{
                            x: [0, 2, -2, 0],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 4,
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
                            disabled={isLoading}
                          />
                        </motion.div>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleForgotPassword}
                        className="w-full gradient-bg text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={isLoading || !email}
                      >
                        <motion.div
                          className="flex items-center justify-center"
                          animate={
                            isLoading
                              ? {
                                  rotate: [0, 360],
                                }
                              : {}
                          }
                          transition={
                            isLoading
                              ? {
                                  duration: 1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                }
                              : {}
                          }
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {isLoading ? "Sending..." : "Send Reset Link"}
                        </motion.div>
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Loading Animation */}
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <motion.div
                          className="inline-flex items-center space-x-2 text-purple-600"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          <motion.div
                            className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          />
                          <span>Sending reset instructions...</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
