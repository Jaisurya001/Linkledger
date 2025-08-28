"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, Save, Mail, Camera } from "lucide-react"
import { useEffect } from "react"
import { useToastTrigger } from "@/hooks/use-global-toast"

interface EditUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: any | null
  onSave: (user: any) => void
}

export default function EditUserModal({ open, onOpenChange, user, onSave }: EditUserModalProps) {
  const [editedUser, setEditedUser] = useState<any | null>(user)

  useEffect(() => {
    setEditedUser(user)
  }, [user])
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToastTrigger()

  const handleSave = async () => {
    if (!editedUser) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSave(editedUser)
    toast.success(`User ${editedUser.name} updated successfully!`)
    setIsLoading(false)
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

  if (!user || !editedUser) return (
    <></>
  )

  return (
    <AnimatePresence mode="sync">
      {open ? (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-hidden [&>button.absolute]:hidden">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col h-full"
            >
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-purple-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                  >
                    <Mail className="h-6 w-6 text-purple-600" />
                  </motion.div>
                  <DialogTitle className="text-2xl gradient-text">Edit User</DialogTitle>
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
              <motion.div
                className="flex-1 overflow-y-auto p-6 space-y-6"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Avatar Section */}
                <motion.div variants={itemVariants} className="flex items-center space-x-4">
                  <div className="relative">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Avatar className="h-20 w-20 ring-4 ring-purple-200">
                        <AvatarImage src="/student-avatar.png" />
                        <AvatarFallback className="text-xl gradient-bg text-white">
                          {editedUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-1 -right-1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button size="icon" className="h-7 w-7 rounded-full gradient-bg text-white shadow-lg">
                        <Camera className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  </div>
                  <div>
                    <motion.h3
                      className="text-xl font-bold gradient-text"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      {editedUser.name}
                    </motion.h3>
                    <p className="text-gray-600">{editedUser.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        className={editedUser.role === "Admin" ? "gradient-bg text-white" : "bg-blue-100 text-blue-800"}
                      >
                        {editedUser.role}
                      </Badge>
                      <Badge
                        className={
                          editedUser.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {editedUser.status}
                      </Badge>
                    </div>
                  </div>
                </motion.div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="edit-name">Full Name</Label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        id="edit-name"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="border-purple-200 focus:border-purple-400 transition-all duration-300"
                        disabled={isLoading}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="edit-email">Email Address</Label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        id="edit-email"
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        className="border-purple-200 focus:border-purple-400 transition-all duration-300"
                        disabled={isLoading}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="edit-role">Role</Label>
                    <Select
                      value={editedUser.role}
                      onValueChange={(value) => setEditedUser({ ...editedUser, role: value })}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="border-purple-200 focus:border-purple-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Moderator">Moderator</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={editedUser.status}
                      onValueChange={(value) => setEditedUser({ ...editedUser, status: value })}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="border-purple-200 focus:border-purple-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                {/* Stats */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-center">
                      <motion.div
                        className="text-2xl font-bold gradient-text"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 3,
                        }}
                      >
                        {editedUser.itemsPosted}
                      </motion.div>
                      <div className="text-sm text-gray-600">Items Posted</div>
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-center">
                      <motion.div
                        className="text-2xl font-bold gradient-text"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 3,
                          delay: 0.5,
                        }}
                      >
                        {editedUser.reputation}★
                      </motion.div>
                      <div className="text-sm text-gray-600">Reputation</div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                      disabled={isLoading}
                      className="border-gray-300"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="gradient-bg text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <motion.div
                        animate={isLoading ? { rotate: 360 } : {}}
                        transition={isLoading ? { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : {}}
                      >
                        <Save className="h-4 w-4 mr-2" />
                      </motion.div>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      ) :  (
    <></>
  )}
</AnimatePresence>
  )
}
