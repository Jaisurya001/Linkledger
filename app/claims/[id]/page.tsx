"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Check, X, RotateCcw, MapPin, Calendar } from "lucide-react"
import { useToastTrigger } from "@/hooks/use-global-toast"
import MainLayout from "@/components/MainLayout"

// Sample item and claims data
const getItemData = (id: string) => ({
  id: Number.parseInt(id),
  title: "iPhone 14 Pro",
  description: "Black iPhone 14 Pro with cracked screen protector",
  category: "Electronics",
  date: "2024-01-15",
  location: "Library 2nd Floor",
  image: "/black-iphone.png",
  user: "Sarah Chen",
  type: "lost",
  claims: [
    {
      id: 1,
      user: "Mike Johnson",
      message:
        "I found this phone near the library entrance around 3:30 PM. It was on the ground near the bike racks. The screen protector has the same crack pattern as shown in your description.",
      date: "2024-01-16",
      time: "10:30 AM",
      proof: "/phone-proof.png",
      contactNumber: "+1 (555) 123-4567",
      status: "pending", // pending, confirmed, rejected
    },
    {
      id: 2,
      user: "Sarah Kim",
      message:
        "This looks exactly like the phone I found yesterday in the library study area. I turned it in to the front desk but they said to contact the owner directly through this platform.",
      date: "2024-01-16",
      time: "2:15 PM",
      proof: "/phone-proof2.png",
      contactNumber: "+1 (555) 987-6543",
      status: "pending",
    },
    {
      id: 3,
      user: "Alex Rivera",
      message:
        "Found a black iPhone with a cracked screen protector in the library bathroom. Matches your description perfectly. Can meet anytime today to return it.",
      date: "2024-01-17",
      time: "9:45 AM",
      proof: "/phone-proof.png",
      contactNumber: null,
      status: "pending",
    },
  ],
})

export default function ClaimsPage({ params }: { params: { id: string } }) {
  const itemData = getItemData(params.id)
  const [claims, setClaims] = useState(itemData.claims)
  const [isResetting, setIsResetting] = useState(false)
  const toast = useToastTrigger()

  const handleConfirmClaim = (claimId: number) => {
  setClaims((prevClaims) =>
    prevClaims.map((claim) => {
      if (claim.id === claimId) {
        return { ...claim, status: "confirmed" }
      }
      return { ...claim, status: "rejected" }
    })
  )

  const confirmedClaim = claims.find((claim) => claim.id === claimId)
    toast.success(`${confirmedClaim?.user}'s claim has been confirmed. They will be notified.`)
  }

  const handleRejectClaim = (claimId: number) => {
    setClaims((prevClaims) =>
      prevClaims.map((claim) => (claim.id === claimId ? { ...claim, status: "rejected" } : claim)),
    )

    const rejectedClaim = claims.find((claim) => claim.id === claimId)
    toast.warning(`${rejectedClaim?.user}'s claim has been rejected.`)
  }

  const handleResetConfirmations = async () => {
    setIsResetting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setClaims((prevClaims) => prevClaims.map((claim) => ({ ...claim, status: "pending" })))
    toast.info("All claim confirmations have been reset to pending status.")
    setIsResetting(false)
  }

  const confirmedClaim = claims.find((claim) => claim.status === "confirmed")
  const pendingClaims = claims.filter((claim) => claim.status === "pending")
  const rejectedClaims = claims.filter((claim) => claim.status === "rejected")

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <MainLayout isLoggedIn={true} isAdmin={false}>
      <motion.div className="p-6 md:p-8" variants={pageVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
          <div>
            <motion.h1
              className="text-3xl font-bold gradient-text mb-2"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              Claims for "{itemData.title}"
            </motion.h1>
            <p className="text-gray-600">Review and manage claims for your item</p>
          </div>

          {/* Reset Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleResetConfirmations}
              variant="outline"
              className="text-white hover:text-white gradient-bg"
              disabled={!claims.some((claim) => claim.status !== "pending") || isResetting}
            >
              <motion.div
                animate={isResetting ? { rotate: 360 } : {}}
                transition={isResetting ? { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : {}}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
              </motion.div>
              {isResetting ? "Resetting..." : "Reset Confirmations"}
            </Button>
          </motion.div>
        </motion.div>

        {/* Item Summary */}
        <motion.div variants={itemVariants}>
          <Card className="glass-effect border-2 border-purple-200 mb-8">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <motion.img
                  src={itemData.image || "/placeholder.svg"}
                  alt={itemData.title}
                  className="w-32 h-32 object-cover rounded-lg border-2 border-purple-200"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <motion.h2
                      className="text-2xl font-bold gradient-text"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      {itemData.title}
                    </motion.h2>
                    <Badge
                      className={itemData.type === "lost" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}
                    >
                      {itemData.type.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{itemData.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Badge className="gradient-bg text-white text-xs">{itemData.category}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{itemData.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{itemData.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Claims Statistics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Claims", value: claims.length, color: "text-purple-600" },
            { label: "Pending", value: pendingClaims.length, color: "text-yellow-600" },
            { label: "Confirmed", value: confirmedClaim ? 1 : 0, color: "text-green-600" },
            { label: "Rejected", value: rejectedClaims.length, color: "text-red-600" },
          ].map((stat, index) => (
            <motion.div key={stat.label} variants={statsVariants} custom={index} whileHover={{ y: -5, scale: 1.02 }}>
              <Card className="glass-effect border-2 border-purple-200">
                <CardContent className="p-4 text-center">
                  <motion.div
                    className={`text-2xl font-bold ${stat.color}`}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                      delay: index * 0.2,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Claims List */}
        <motion.div variants={itemVariants} className="space-y-6">
          {claims.length === 0 ? (
            <Card className="glass-effect border-2 border-purple-200">
              <CardContent className="p-8 text-center">
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
                  <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                </motion.div>
                <p className="text-gray-600">No claims yet</p>
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence>
              {claims.map((claim, index) => (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ClaimCard
                    claim={claim}
                    onConfirm={() => handleConfirmClaim(claim.id)}
                    onReject={() => handleRejectClaim(claim.id)}
                    isConfirmed={claim.status === "confirmed"}
                    isRejected={claim.status === "rejected"}
                    hasConfirmedClaim={!!confirmedClaim}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </motion.div>
    </MainLayout>
  )
}

function ClaimCard({
  claim,
  onConfirm,
  onReject,
  isConfirmed,
  isRejected,
  hasConfirmedClaim,
}: {
  claim: any
  onConfirm: () => void
  onReject: () => void
  isConfirmed: boolean
  isRejected: boolean
  hasConfirmedClaim: boolean
}) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  const handleConfirm = async () => {
    setIsConfirming(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    onConfirm()
    setIsConfirming(false)
  }

  const handleReject = async () => {
    setIsRejecting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    onReject()
    setIsRejecting(false)
  }

  const getStatusBadge = () => {
    if (isConfirmed) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
        </motion.div>
      )
    }
    if (isRejected) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Badge className="bg-red-100 text-red-800">Rejected</Badge>
        </motion.div>
      )
    }
    if (hasConfirmedClaim && !isConfirmed) {
      return <Badge className="bg-gray-100 text-gray-600">Not Confirmed</Badge>
    }
    return (
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 1,
        }}
      >
        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      </motion.div>
    )
  }

  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Card
        className={`border-2 transition-all duration-300 ${
          isConfirmed
            ? "border-green-300 bg-green-50/50"
            : isRejected
              ? "border-red-300 bg-red-50/50"
              : "border-purple-200 glass-effect"
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="gradient-bg text-white">
                    {claim.user
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div>
                <motion.h4
                  className="font-semibold text-lg"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  {claim.user}
                </motion.h4>
                <p className="text-sm text-gray-600">
                  {claim.date} at {claim.time}
                </p>
                {claim.contactNumber && (
                  <motion.p
                    className="text-sm text-purple-600 font-medium"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                  >
                    {claim.contactNumber}
                  </motion.p>
                )}
              </div>
            </div>
            {getStatusBadge()}
          </div>

          <motion.div className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <p className="text-gray-700 leading-relaxed">{claim.message}</p>
          </motion.div>

          {claim.proof && (
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm font-medium mb-2">Proof of Ownership:</p>
              <motion.img
                src={claim.proof || "/placeholder.svg"}
                alt="Proof"
                className="w-40 h-40 object-cover rounded-lg border-2 border-gray-200"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          )}

          <AnimatePresence>
            {!isConfirmed && !isRejected && (
              <motion.div
                className="flex space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleConfirm}
                    className="gradient-bg text-white w-full"
                    disabled={hasConfirmedClaim || isConfirming}
                  >
                    <motion.div
                      className="flex items-center justify-center"
                      animate={
                        isConfirming
                          ? {
                              rotate: [0, 360],
                            }
                          : {}
                      }
                      transition={
                        isConfirming
                          ? {
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }
                          : {}
                      }
                    >
                      <Check className="h-4 w-4 mr-2" />
                      {isConfirming ? "Confirming..." : "Confirm"}
                    </motion.div>
                  </Button>
                </motion.div>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    onClick={handleReject}
                    className="border-red-200 text-red-600 hover:bg-red-50 w-full bg-transparent"
                    disabled={isRejecting}
                  >
                    <motion.div
                      className="flex items-center justify-center"
                      animate={
                        isRejecting
                          ? {
                              x: [-2, 2, -2, 2, 0],
                            }
                          : {}
                      }
                      transition={
                        isRejecting
                          ? {
                              duration: 0.5,
                              repeat: Number.POSITIVE_INFINITY,
                            }
                          : {}
                      }
                    >
                      <X className="h-4 w-4 mr-2" />
                      {isRejecting ? "Rejecting..." : "Reject"}
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isConfirmed && (
              <motion.div
                className="bg-green-100 border border-green-300 rounded-lg p-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <motion.div
                  className="flex items-center text-green-800"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                  }}
                >
                  <Check className="h-5 w-5 mr-2" />
                  <span className="font-medium">This claim has been confirmed</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isRejected && (
              <motion.div
                className="bg-red-100 border border-red-300 rounded-lg p-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <motion.div
                  className="flex items-center text-red-800"
                  animate={{
                    x: [-1, 1, -1, 1, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                >
                  <X className="h-5 w-5 mr-2" />
                  <span className="font-medium">This claim has been rejected</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}