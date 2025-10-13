"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCheck,
  Clock,
  FileQuestion,
  MessageSquare,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainLayout from "@/components/MainLayout"
import { grievances } from "@/data/grievances"

export default function MyGrievancesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "submitted" | "reviewed" | "resolved">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Mock user ID
  const userId = "user1"

  // Filter grievances by user and status
  const filteredGrievances = grievances.filter((g) => {
    if (searchQuery && !g.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    if (activeTab === "submitted" && g.status !== "Submitted") return false
    if (activeTab === "reviewed" && g.status !== "Reviewed") return false
    if (activeTab === "resolved" && g.status !== "Resolved") return false

    // For demo purposes, just show all grievances
    return true
  })

  const submittedCount = grievances.filter((g) => g.status === "Submitted").length
  const reviewedCount = grievances.filter((g) => g.status === "Reviewed").length
  const resolvedCount = grievances.filter((g) => g.status === "Resolved").length

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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

  return (
    <MainLayout isLoggedIn={true} isAdmin={false}>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Back button */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/grievances")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Grievances
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-1">My Grievances</h1>
            <p className="text-gray-600">Track and manage your submitted grievances</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => router.push("/grievances/submit")} className="gradient-bg text-white shadow-md">
              <Plus className="mr-2 h-4 w-4" />
              New Grievance
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-bold">{grievances.length}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileQuestion className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="text-2xl font-bold">{submittedCount}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Reviewed</p>
                    <p className="text-2xl font-bold">{reviewedCount}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Resolved</p>
                    <p className="text-2xl font-bold">{resolvedCount}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCheck className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Search and Tabs */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
          >
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search grievances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as typeof activeTab)}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </motion.div>

        {/* Grievance List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredGrievances.length > 0 ? (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                {filteredGrievances.map((grievance) => (
                  <motion.div
                    key={grievance.id}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="cursor-pointer"
                    onClick={() => router.push(`/grievances/${grievance.id}`)}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm hover:border-purple-200 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-medium text-lg">{grievance.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                              <Badge variant="outline" className="bg-white">
                                {grievance.category}
                              </Badge>
                              <span>•</span>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>{new Date(grievance.updatedAt).toLocaleDateString()}</span>
                              </div>
                              {grievance.isAnonymous && (
                                <>
                                  <span>•</span>
                                  <span>Anonymous</span>
                                </>
                              )}
                              {!grievance.isPublic && (
                                <>
                                  <span>•</span>
                                  <span>Private</span>
                                </>
                              )}
                            </div>
                          </div>

                          <Badge
                            className={`
                              ${grievance.status === "Submitted" && "bg-blue-500"} 
                              ${grievance.status === "Reviewed" && "bg-amber-500"} 
                              ${grievance.status === "Resolved" && "bg-green-500"}
                            `}
                          >
                            {grievance.status}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            {grievance.comments.length > 0 && (
                              <div className="flex items-center text-gray-500">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span>{grievance.comments.length}</span>
                              </div>
                            )}

                            {grievance.comments.some((c) => c.isAdmin) && (
                              <Badge variant="outline" className="text-xs flex items-center gap-1 bg-white">
                                <Check className="h-3 w-3 text-green-600" />
                                Admin Response
                              </Badge>
                            )}
                          </div>

                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="sm" variant="outline" className="bg-white text-xs">
                              View Details
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-gray-400 mb-4"
                >
                  <SlidersHorizontal className="mx-auto h-12 w-12" />
                </motion.div>
                <h3 className="text-xl font-medium text-gray-700 mb-1">No grievances found</h3>
                <p className="text-gray-500">Try adjusting your filters or search criteria</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </MainLayout>
  )
}
