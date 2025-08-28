"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Camera, Lock, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfileModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("Sarah Chen")
  const [email, setEmail] = useState("sarah.chen@university.edu")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { toast } = useToast()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  const userStats = {
    itemsPosted: 12,
    itemsClaimed: 8,
    successfulReturns: 15,
    reputation: 4.8,
  }

  const recentActivity = [
    { id: 1, action: "Posted", item: "iPhone 14 Pro", date: "2024-01-15", type: "lost" },
    { id: 2, action: "Claimed", item: "Blue Water Bottle", date: "2024-01-14", type: "found" },
    { id: 3, action: "Returned", item: "MacBook Air", date: "2024-01-13", type: "success" },
  ]

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: `Your profile information has been saved successfully. 2FA is now ${twoFactorEnabled ? "enabled" : "disabled"}.`,
    })
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    })
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
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

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-none max-h-[95vh] m-0 p-0 overflow-hidden [&>button.absolute]:hidden">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full flex flex-col"
            >
              {/* Custom Header with Close Button */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-purple-200 bg-white/80 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <DialogTitle className="text-2xl gradient-text">Profile</DialogTitle>
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

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 transition-all duration-300" style={{ maxHeight: 'calc(100vh - 96px)' }}>
                <div className="max-w-2xl mx-auto">
                  <Tabs defaultValue="profile" className="w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                      </TabsList>
                    </motion.div>

                    <TabsContent value="profile" className="space-y-6">
                      {/* Profile Header */}
                      <motion.div
                        className="flex items-center space-x-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="relative">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Avatar className="h-24 w-24 ring-4 ring-purple-200">
                              <AvatarImage src="/student-avatar.png" />
                              <AvatarFallback className="text-2xl">SC</AvatarFallback>
                            </Avatar>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="icon"
                              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full gradient-bg text-white"
                            >
                              <Camera className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <motion.h3
                              className="text-2xl font-bold gradient-text"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              {name}
                            </motion.h3>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-white hover:text-white border-purple-200 gradient-bg"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                {isEditing ? "Cancel" : "Edit"}
                              </Button>
                            </motion.div>
                          </div>
                          <motion.p
                            className="text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            {email}
                          </motion.p>
                          <motion.div
                            className="flex items-center gap-2 mt-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                          >
                            <Badge className="gradient-bg text-white">Student</Badge>
                            <Badge variant="outline">Verified</Badge>
                            <Badge
                              className={twoFactorEnabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                            >
                              {twoFactorEnabled ? "2FA Enabled" : "2FA Disabled"}
                            </Badge>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Stats */}
                      <motion.div
                        className="grid grid-cols-2 md:grid-col-2 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        {Object.entries(userStats).map(([key, value], index) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                          >
                            <Card className="text-center">
                              <CardContent className="p-4">
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
                                  {value}
                                </motion.div>
                                <div className="text-sm text-gray-600">
                                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Edit Form */}
                      <AnimatePresence>
                        {isEditing && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card>
                              <CardHeader>
                                <CardTitle>Edit Profile</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <motion.div
                                  className="space-y-2"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  <Label htmlFor="edit-name">Full Name</Label>
                                  <Input
                                    id="edit-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border-purple-200"
                                  />
                                </motion.div>
                                <motion.div
                                  className="space-y-2"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <Label htmlFor="edit-email">Email</Label>
                                  <Input
                                    id="edit-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border-purple-200"
                                  />
                                </motion.div>
                                <motion.div
                                  className="flex items-center justify-between p-4 border border-purple-200 rounded-lg"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <div>
                                    <Label className="text-base font-medium">Two-Factor Authentication</Label>
                                    <p className="text-sm text-gray-600">
                                      Add an extra layer of security to your account
                                    </p>
                                  </div>
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                      variant={twoFactorEnabled ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                      className={twoFactorEnabled ? "gradient-bg text-white" : "border-purple-200"}
                                    >
                                      {twoFactorEnabled ? "Enabled" : "Disabled"}
                                    </Button>
                                  </motion.div>
                                </motion.div>
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.4 }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Button onClick={handleSaveProfile} className="gradient-bg text-white">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                  </Button>
                                </motion.div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {recentActivity.map((activity, index) => (
                                <motion.div
                                  key={activity.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + index * 0.1 }}
                                  whileHover={{ x: 5, scale: 1.02 }}
                                >
                                  <div className="flex items-center space-x-3">
                                    <Badge
                                      className={
                                        activity.type === "lost"
                                          ? "bg-red-100 text-red-800"
                                          : activity.type === "found"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-green-100 text-green-800"
                                      }
                                    >
                                      {activity.action}
                                    </Badge>
                                    <span className="font-medium">{activity.item}</span>
                                  </div>
                                  <span className="text-sm text-gray-500">{activity.date}</span>
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <motion.div
                              className="space-y-2"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <Label htmlFor="current-password">Current Password</Label>
                              <Input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="border-purple-200"
                              />
                            </motion.div>
                            <motion.div
                              className="space-y-2"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <Label htmlFor="new-password">New Password</Label>
                              <Input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border-purple-200"
                              />
                            </motion.div>
                            <motion.div
                              className="space-y-2"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Label htmlFor="confirm-password">Confirm New Password</Label>
                              <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border-purple-200"
                              />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button onClick={handleChangePassword} className="gradient-bg text-white">
                                <Lock className="h-4 w-4 mr-2" />
                                Update Password
                              </Button>
                            </motion.div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
