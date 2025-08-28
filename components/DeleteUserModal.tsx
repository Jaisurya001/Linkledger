"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, X, Trash2 } from "lucide-react"
import { useToastTrigger } from "@/hooks/use-global-toast"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  itemsPosted: number
  reputation: number
}

interface DeleteUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onDelete: (userId: number) => void
}

export default function DeleteUserModal({ open, onOpenChange, user, onDelete }: DeleteUserModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const toast = useToastTrigger()

  const handleDelete = async () => {
    if (!user) return

    setIsDeleting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onDelete(user.id)
    toast.success(`User ${user.name} has been deleted successfully.`)
    setIsDeleting(false)
    onOpenChange(false)
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

  const warningVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  }

  const shakeVariants = {
    shake: {
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 2,
      },
    },
  }

  if (!user) return null

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-md w-full [&>button.absolute]:hidden">
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
              <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <DialogTitle className="text-2xl font-bold text-red-600">Delete User</DialogTitle>
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

              {/* Warning Icon */}
              <motion.div variants={warningVariants} initial="hidden" animate="visible" className="mb-6">
                <motion.div
                  variants={shakeVariants}
                  animate="shake"
                  className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center"
                >
                  <AlertTriangle className="h-10 w-10 text-red-600" />
                </motion.div>
              </motion.div>

              {/* User Info */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Avatar className="h-16 w-16 ring-4 ring-red-200">
                      <AvatarImage src="/student-avatar.png" />
                      <AvatarFallback className="bg-red-100 text-red-600 text-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className={user.role === "Admin" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}
                      >
                        {user.role}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-600">{user.itemsPosted} items</Badge>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Warning Message */}
              <motion.div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ This action cannot be undone!</h4>
                  <p className="text-red-700 text-sm">Deleting this user will permanently remove:</p>
                  <ul className="text-red-700 text-sm mt-2 space-y-1">
                    <li>• User account and profile</li>
                    <li>• All posted items ({user.itemsPosted} items)</li>
                    <li>• Activity history and reputation</li>
                    <li>• Associated claims and messages</li>
                  </ul>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={isDeleting}
                    className="w-full border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <motion.div
                      className="flex items-center justify-center"
                      animate={
                        isDeleting
                          ? {
                              rotate: [0, 10, -10, 10, -10, 0],
                            }
                          : {}
                      }
                      transition={
                        isDeleting
                          ? {
                              duration: 0.5,
                              repeat: Number.POSITIVE_INFINITY,
                            }
                          : {}
                      }
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {isDeleting ? "Deleting..." : "Delete User"}
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Loading Animation */}
              <AnimatePresence>
                {isDeleting && (
                  <motion.div
                    className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="flex flex-col items-center space-y-4"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      <motion.div
                        className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                      <p className="text-red-600 font-medium">Deleting user...</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
