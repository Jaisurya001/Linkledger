"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Eye } from "lucide-react"
import Link from "next/link"
import MainLayout from "@/components/MainLayout"

// Sample user entries data
const userEntries = {
  lost: [
    {
      id: 1,
      title: "iPhone 14 Pro",
      description: "Black iPhone 14 Pro with cracked screen protector",
      category: "Electronics",
      date: "2024-01-15",
      location: "Library 2nd Floor",
      image: "/black-iphone.png",
      status: "active",
      claims: [
        {
          id: 1,
          user: "Mike Johnson",
          message: "I found this phone near the library entrance",
          date: "2024-01-16",
          proof: "/phone-proof.png",
        },
        {
          id: 2,
          user: "Sarah Kim",
          message: "This looks like the phone I found yesterday",
          date: "2024-01-16",
          proof: "/phone-proof2.png",
        },
      ],
    },
    {
      id: 2,
      title: "MacBook Air",
      description: 'Silver MacBook Air 13" with coding stickers',
      category: "Electronics",
      date: "2024-01-13",
      location: "Computer Lab",
      image: "/placeholder-pae48.png",
      status: "resolved",
      claims: [],
    },
  ],
  found: [
    {
      id: 3,
      title: "Blue Water Bottle",
      description: "Hydro Flask water bottle with university stickers",
      category: "Personal Items",
      date: "2024-01-14",
      location: "Student Center",
      image: "/placeholder-kgk3n.png",
      status: "active",
      claims: [
        {
          id: 3,
          user: "Alex Rivera",
          message: "This is my water bottle! I lost it yesterday",
          date: "2024-01-15",
          proof: "/bottle-proof.png",
        },
      ],
    },
  ],
}

export default function EntriesPage() {
  const [activeTab, setActiveTab] = useState("lost")

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

  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 },
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
        <motion.div variants={itemVariants} className="mb-8">
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
            My Entries
          </motion.h1>
          <p className="text-gray-600">Manage your posted items and view claims</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Entries", value: 3, color: "text-purple-600" },
            { label: "Active Items", value: 2, color: "text-blue-600" },
            { label: "Pending Claims", value: 3, color: "text-yellow-600" },
            { label: "Resolved", value: 1, color: "text-green-600" },
          ].map((stat, index) => (
            <motion.div key={stat.label} variants={statsVariants} custom={index} whileHover={{ y: -5, scale: 1.02 }}>
              <Card className="glass-effect border-2 border-purple-200">
                <CardContent className="p-6 text-center">
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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div variants={itemVariants}>
  <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-transparent">
    <TabsTrigger
      value="lost"
      className="text-lg font-semibold rounded-full transition-all duration-300 px-3
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-orange-400
        data-[state=active]:text-white
        data-[state=inactive]:bg-white/70 data-[state=inactive]:backdrop-blur-md data-[state=inactive]:shadow-md
        data-[state=inactive]:text-transparent data-[state=inactive]:bg-clip-text
        data-[state=inactive]:bg-gradient-to-r data-[state=inactive]:from-violet-500 data-[state=inactive]:to-orange-400"
    >
      Lost Items ({userEntries.lost.length})
    </TabsTrigger>

    <TabsTrigger
      value="found"
      className="text-lg font-semibold rounded-full transition-all duration-300 px-3
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-orange-400
        data-[state=active]:text-white
        data-[state=inactive]:bg-white/70 data-[state=inactive]:backdrop-blur-md data-[state=inactive]:shadow-md
        data-[state=inactive]:text-transparent data-[state=inactive]:bg-clip-text
        data-[state=inactive]:bg-gradient-to-r data-[state=inactive]:from-violet-500 data-[state=inactive]:to-orange-400"
    >
      Found Items ({userEntries.found.length})
    </TabsTrigger>
  </TabsList>
</motion.div>


          <AnimatePresence mode="sync">
            <TabsContent value="lost">
              <motion.div
                key="lost"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {userEntries.lost.map((entry, index) => (
                  <motion.div key={entry.id} variants={itemVariants} custom={index}>
                    <EntryCard entry={entry} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="found">
              <motion.div
                key="found"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {userEntries.found.map((entry, index) => (
                  <motion.div key={entry.id} variants={itemVariants} custom={index}>
                    <EntryCard entry={entry} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </MainLayout>
  )
}

function EntryCard({ entry }: { entry: any }) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Card className="glass-effect border-2 border-purple-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="w-full md:w-48 h-48 flex-shrink-0">
              <motion.img
                src={entry.image || "/placeholder.svg"}
                alt={entry.title}
                className="w-full h-full object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <motion.h3
                    className="text-xl font-bold gradient-text mb-2"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    {entry.title}
                  </motion.h3>
                  <p className="text-gray-600 mb-3">{entry.description}</p>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Badge
                    className={entry.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {entry.status}
                  </Badge>
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Badge className="gradient-bg text-white text-xs">{entry.category}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{entry.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{entry.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {entry.claims.length} claim{entry.claims.length !== 1 ? "s" : ""}
                  </span>
                  {entry.claims.length > 0 && (
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                      }}
                    >
                      <Badge className="bg-yellow-100 text-yellow-800">{entry.claims.length} pending</Badge>
                    </motion.div>
                  )}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link href={`/claims/${entry.id}`}>
                    <Button
                      variant="outline"
                      className="border-purple-200 hover:bg-purple-50 bg-transparent"
                      disabled={entry.claims.length === 0}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Claims
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
