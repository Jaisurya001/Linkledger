"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, Home, FileText, LogOut, User, Shield } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"
import NotificationDrawer from "./NotificationDrawer"
import ProfileModal from "./ProfileModal"

interface MainNavigationProps {
  isLoggedIn?: boolean
  isAdmin?: boolean
}

export default function MainNavigation({ isLoggedIn = true, isAdmin = false }: MainNavigationProps) {
  const pathname = usePathname()
  const { unreadCount, setIsOpen } = useNotifications()
  const [showProfileModal, setShowProfileModal] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    // Special cases for nested routes
    if (path === "/" && pathname.startsWith("/item/")) return true
    if (path === "/entries" && pathname.startsWith("/claims/")) return true
    return false
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home, show: true },
    { href: "/entries", label: "Entries", icon: FileText, show: isLoggedIn },
    { href: "/admin", label: "Admin", icon: Shield, show: isLoggedIn && isAdmin },
  ]

  // Mobile navigation items with proper ordering
  const getMobileNavItems = () => {
    const items = []

    // Left side items
    if (isLoggedIn) {
      items.push({ href: "/entries", label: "Entries", icon: FileText, position: "left" })
    }

    // Notifications (always visible)
    items.push({
      href: "#",
      label: "Alerts",
      icon: Bell,
      position: "left",
      onClick: () => setIsOpen(true),
      badge: unreadCount > 0 ? (unreadCount > 9 ? "9+" : unreadCount.toString()) : null,
    })

    // Center - Home (always visible)
    items.push({ href: "/", label: "Home", icon: Home, position: "center" })

    // Right side items
    if (isLoggedIn) {
      items.push({
        href: "#",
        label: "Profile",
        icon: User,
        position: "right",
        onClick: () => setShowProfileModal(true),
      })

      if (isAdmin) {
        items.push({ href: "/admin", label: "Admin", icon: Shield, position: "right" })
      }

      items.push({
        href: "#",
        label: "Logout",
        icon: LogOut,
        position: "right",
        onClick: () => {
          // Handle logout
          console.log("Logout clicked")
        },
      })
    } else {
      items.push({ href: "/login", label: "Login", icon: User, position: "right" })
    }

    return items
  }

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const mobileNavVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <>
      {/* Desktop/Tablet Navigation */}
      <motion.nav
        className="hidden md:flex items-center justify-between w-full px-6 py-4 bg-gray-100/80 backdrop-blur-md border-b border-gray-300/50"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center space-x-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold gradient-text">LinkLedger</h1>
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 5,
                }}
              >
                <Badge className="gradient-bg text-white">S7</Badge>
              </motion.div>
            </Link>
          </motion.div>

          <div className="flex items-center space-x-1">
            {navItems
              .filter((item) => item.show)
              .map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={item.href}>
                      <Button
                        variant={isActive(item.href) ? "default" : "ghost"}
                        className={`flex items-center space-x-2 transition-all duration-300 ${
                          isActive(item.href)
                            ? "gradient-bg text-white shadow-lg"
                            : "text-gray-700 hover:text-purple-600 hover:bg-purple-50/80"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Button>
                    </Link>
                  </motion.div>
                )
              })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-700 hover:text-purple-600"
              onClick={() => setIsOpen(true)}
            >
              <motion.div
                animate={
                  unreadCount > 0
                    ? {
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 1,
                  repeat: unreadCount > 0 ? Number.POSITIVE_INFINITY : 0,
                  repeatDelay: 2,
                }}
              >
                <Bell className="h-5 w-5" />
              </motion.div>
              <AnimatePresence>
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full gradient-bg text-white text-xs flex items-center justify-center p-0">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* User Menu */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Avatar className="cursor-pointer ring-2 ring-purple-300 h-8 w-8 transition-all duration-300 hover:ring-purple-400">
                    <AvatarImage src="/student-avatar.png" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setShowProfileModal(true)}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/login">
                <Button className="gradient-bg text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Login
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Mobile Curved Bottom Navigation */}
      <motion.div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40"
        variants={mobileNavVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background with curve */}
        <div className="relative">
          <motion.svg
            viewBox="0 0 375 80"
            className="w-full h-20"
            preserveAspectRatio="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <defs>
              <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(236, 72, 153, 0.95)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.95)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.95)" />
              </linearGradient>
            </defs>
            <path d="M0,20 Q187.5,0 375,20 L375,80 L0,80 Z" fill="url(#navGradient)" className="drop-shadow-lg" />
          </motion.svg>

          {/* Navigation Items */}
          <div className="absolute inset-0 flex items-center justify-around px-4 pb-2">
            {getMobileNavItems().map((item, index) => {
              const Icon = item.icon
              const isActiveItem = item.href !== "#" && isActive(item.href)
              const isCenterItem = item.position === "center"

              const handleClick = () => {
                if (item.onClick) {
                  item.onClick()
                } else if (item.href !== "#") {
                  // Handle navigation
                }
              }

              return (
                <motion.div
                  key={`${item.label}-${index}`}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Elevated background for active/center item */}
                  <AnimatePresence>
                    {(isActiveItem || (isCenterItem && isActive("/"))) && (
                      <motion.div
                        className="absolute -top-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white"
                        initial={{ scale: 0, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: 10 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <motion.div
                          className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center"
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                            scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 },
                          }}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Regular navigation item */}
                  {item.href !== "#" ? (
                    <Link href={item.href} className="flex flex-col items-center">
                      <motion.div
                        className={`relative p-2 ${isActiveItem || (isCenterItem && isActive("/")) ? "opacity-0" : ""}`}
                        whileHover={{ scale: 1.1 }}
                        animate={
                          item.badge
                            ? {
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1],
                              }
                            : {}
                        }
                        transition={{
                          duration: 1,
                          repeat: item.badge ? Number.POSITIVE_INFINITY : 0,
                          repeatDelay: 2,
                        }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                        <AnimatePresence>
                          {item.badge && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                                {item.badge}
                              </Badge>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <span
                        className={`text-xs mt-1 text-white font-medium ${isActiveItem || (isCenterItem && isActive("/")) ? "opacity-0" : ""}`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <motion.button
                      onClick={handleClick}
                      className="flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className="relative p-2"
                        animate={
                          item.badge
                            ? {
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1],
                              }
                            : {}
                        }
                        transition={{
                          duration: 1,
                          repeat: item.badge ? Number.POSITIVE_INFINITY : 0,
                          repeatDelay: 2,
                        }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                        <AnimatePresence>
                          {item.badge && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                                {item.badge}
                              </Badge>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <span className="text-xs mt-1 text-white font-medium">{item.label}</span>
                    </motion.button>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <NotificationDrawer />
      <ProfileModal open={showProfileModal} onOpenChange={setShowProfileModal} />
    </>
  )
}
