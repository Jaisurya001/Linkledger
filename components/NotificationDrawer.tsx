"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNotifications, type Notification } from "@/hooks/use-notifications"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { X, Bell, CheckCheck, Clock, Gift, AlertCircle, User, Check, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

const notificationIcons = {
  claim: User,
  match: Gift,
  system: AlertCircle,
  success: CheckCheck,
}

const notificationColors = {
  claim: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "bg-blue-500",
    text: "text-blue-800",
  },
  match: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "bg-purple-500",
    text: "text-purple-800",
  },
  system: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    icon: "bg-gray-500",
    text: "text-gray-800",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "bg-green-500",
    text: "text-green-800",
  },
}

function NotificationCard({ notification, index }: { notification: Notification; index: number }) {
  const { markAsRead, removeToast } = useNotifications()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMarkingRead, setIsMarkingRead] = useState(false)
  const Icon = notificationIcons[notification.type]
  const colors = notificationColors[notification.type]

  const handleMarkAsRead = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!notification.read) {
      setIsMarkingRead(true)
      // Add a small delay for animation
      setTimeout(() => {
        markAsRead(notification.id)
        setIsMarkingRead(false)
      }, 600)
    }
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDeleting(true)
    // Add delay for exit animation
    setTimeout(() => {
      removeToast(notification.id)
    }, 400)
  }

  const getNotificationLink = () => {
    if (notification.type === "claim" && notification.itemId) {
      return `/claims/${notification.itemId}`
    }
    if (notification.type === "match" && notification.itemId) {
      return `/item/${notification.itemId}`
    }
    return null
  }

  const link = getNotificationLink()

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      x: isDeleting ? 300 : 0,
      scale: 0.8,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const markAsReadVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  }

  const cardContent = (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{
        y: -2,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`
        ${colors.bg} ${colors.border} border-2 transition-all duration-300 hover:shadow-lg
        ${!notification.read ? "ring-2 ring-blue-200 ring-opacity-50" : ""}
        ${isMarkingRead ? "animate-pulse" : ""}
      `}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Animated Icon */}
            <motion.div
              className={`
              w-10 h-10 rounded-full ${colors.icon} 
              flex items-center justify-center flex-shrink-0 shadow-sm
            `}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
            >
              <Icon className="h-5 w-5 text-white" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <motion.h4
                  className={`font-semibold text-sm md:text-base ${colors.text} leading-tight`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {notification.title}
                </motion.h4>
                {!notification.read && (
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>

              <motion.p
                className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {notification.message}
              </motion.p>

              <div className="flex items-center justify-between">
                <motion.div
                  className="flex items-center text-xs text-gray-500"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</span>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex items-center gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <TooltipProvider>
                    {/* Mark as Read Button */}
                    {!notification.read && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            variants={markAsReadVariants}
                            initial="initial"
                            animate={isMarkingRead ? "animate" : "initial"}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleMarkAsRead}
                              className="h-7 w-7 text-green-600 hover:text-green-700 hover:bg-green-100"
                              disabled={isMarkingRead}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Mark as read</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {/* Delete Button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                            rotate: isDeleting ? 180 : 0,
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDelete}
                            className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-100"
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete notification</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              </div>

              {/* User Avatar for claim notifications */}
              {notification.avatar && notification.type === "claim" && (
                <motion.div
                  className="flex items-center mt-3 pt-3 border-t border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{notification.userId?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600">From {notification.userId?.replace("-", " ")}</span>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return link ? (
    <Link href={link} className="block">
      {cardContent}
    </Link>
  ) : (
    <div className="cursor-pointer">{cardContent}</div>
  )
}

export default function NotificationDrawer() {
  const { notifications, unreadCount, isOpen, setIsOpen, markAllAsRead } = useNotifications()

  const drawerVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const mobileDrawerVariants = {
    hidden: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
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
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile: Full screen overlay */}
          <motion.div
            className="md:hidden fixed inset-0 bg-white z-50 flex flex-col"
            variants={mobileDrawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                >
                  <Bell className="h-5 w-5 text-purple-600" />
                </motion.div>
                <h2 className="text-lg font-semibold gradient-text">Notifications</h2>
                {unreadCount > 0 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
                    <Badge className="gradient-bg text-white text-xs">{unreadCount}</Badge>
                  </motion.div>
                )}
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                  <X className="h-4 w-4 gradient-bg" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Actions */}
            {unreadCount > 0 && (
              <motion.div
                className="p-4 border-b border-gray-100 bg-gray-50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllAsRead}
                    className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-white"
                  >
                    <CheckCheck className="h-4 w-4 mr-2" />
                    Mark all as read
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence>
                {notifications.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full text-gray-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Bell className="h-12 w-12 mb-4 text-gray-300" />
                    </motion.div>
                    <p>No notifications yet</p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification, index) => (
                      <NotificationCard key={notification.id} notification={notification} index={index} />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Desktop/Tablet: Right side drawer */}
          <div className="hidden md:block">
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />

            {/* Drawer */}
            <motion.div
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-gray-200 bg-white shadow-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                  >
                    <Bell className="h-5 w-5 text-purple-600" />
                  </motion.div>
                  <h2 className="text-lg font-semibold gradient-text">Notifications</h2>
                  {unreadCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <Badge className="gradient-bg text-white text-xs">{unreadCount}</Badge>
                    </motion.div>
                  )}
                </div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Actions */}
              {unreadCount > 0 && (
                <motion.div
                  className="p-4 border-b border-gray-100 bg-gray-50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={markAllAsRead}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-white"
                    >
                      <CheckCheck className="h-4 w-4 mr-2" />
                      Mark all as read
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto p-4">
                <AnimatePresence>
                  {notifications.length === 0 ? (
                    <motion.div
                      className="flex flex-col items-center justify-center h-full text-gray-500"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <Bell className="h-12 w-12 mb-4 text-gray-300" />
                      </motion.div>
                      <p>No notifications yet</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((notification, index) => (
                        <NotificationCard key={notification.id} notification={notification} index={index} />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
