"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronUp, Filter, MessageSquare, Plus, Search, SlidersHorizontal, ThumbsUp } from "lucide-react"
import MainLayout from "@/components/MainLayout"
import { useToast } from "@/hooks/use-global-toast"
import { grievances, grievanceCategories } from "@/data/grievances"

export default function GrievancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [sortBy, setSortBy] = useState<"recent" | "upvotes">("recent")
  const [upvotedGrievances, setUpvotedGrievances] = useState<string[]>([])
  const [filteredGrievances, setFilteredGrievances] = useState(grievances.filter((g) => g.isPublic))
  const toast = useToast()
  const router = useRouter()

  // Filter grievances
  useEffect(() => {
    let filtered = grievances.filter((g) => g.isPublic)

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (g) =>
          g.title.toLowerCase().includes(query) ||
          g.description.toLowerCase().includes(query) ||
          g.category.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((g) => g.category === selectedCategory)
    }

    // Status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter((g) => g.status === selectedStatus)
    }

    // Sort
    if (sortBy === "recent") {
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else {
      filtered = [...filtered].sort((a, b) => b.upvotes - a.upvotes)
    }

    setFilteredGrievances(filtered)
  }, [searchQuery, selectedCategory, selectedStatus, sortBy])

  const handleUpvote = (id: string) => {
    if (upvotedGrievances.includes(id)) {
      toast.info("You've already upvoted this grievance")
      return
    }

    setUpvotedGrievances((prev) => [...prev, id])
    setFilteredGrievances((prev) => prev.map((g) => (g.id === id ? { ...g, upvotes: g.upvotes + 1 } : g)))

    toast.success("Grievance upvoted successfully")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Grievance Portal</h1>
          <p className="text-gray-600 max-w-3xl">
            A platform to submit and track issues across campus. Help us improve by sharing your concerns.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => router.push("/grievances/submit")} className="gradient-bg text-white shadow-md">
                <Plus className="mr-2 h-4 w-4" />
                Submit Grievance
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => router.push("/grievances/mine")}
                className="bg-white border-purple-200"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                My Grievances
              </Button>
            </motion.div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search grievances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <motion.div className="bg-white rounded-md shadow-sm p-1" whileHover={{ scale: 1.02 }}>
              <Tabs
                value={sortBy}
                onValueChange={(value) => setSortBy(value as "recent" | "upvotes")}
                className="w-full"
              >
                <TabsList className="grid w-[180px] grid-cols-2">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="upvotes">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Top
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-3 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium text-gray-500">Filters:</span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md text-sm px-3 py-1 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Categories</option>
            {grievanceCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-md text-sm px-3 py-1 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Resolved">Resolved</option>
          </select>
        </motion.div>

        {/* Grievance Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGrievances.map((grievance) => (
            <motion.div key={grievance.id} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-purple-200 h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge
                      className={`
                      ${grievance.status === "Submitted" && "bg-blue-500"} 
                      ${grievance.status === "Reviewed" && "bg-amber-500"} 
                      ${grievance.status === "Resolved" && "bg-green-500"}
                    `}
                    >
                      {grievance.status}
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      {grievance.category}
                    </Badge>
                  </div>
                  <Link href={`/grievances/${grievance.id}`}>
                    <CardTitle className="text-lg hover:text-purple-600 transition-colors cursor-pointer mt-2">
                      {grievance.title}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {searchQuery
                      ? // Highlight search matches
                        highlightSearchMatch(grievance.description, searchQuery)
                      : grievance.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>{grievance.isAnonymous ? "Anonymous" : grievance.author}</span>
                    <span>•</span>
                    <span>{formatDate(grievance.createdAt)}</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpvote(grievance.id)}
                      className={`flex items-center gap-1 ${upvotedGrievances.includes(grievance.id) ? "text-purple-600" : ""}`}
                    >
                      <motion.div
                        animate={
                          upvotedGrievances.includes(grievance.id)
                            ? {
                                y: [0, -5, 0],
                                scale: [1, 1.2, 1],
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      >
                        <ChevronUp className="h-5 w-5" />
                      </motion.div>
                      <motion.span
                        animate={
                          upvotedGrievances.includes(grievance.id)
                            ? {
                                scale: [1, 1.2, 1],
                              }
                            : {}
                        }
                      >
                        {grievance.upvotes}
                      </motion.span>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredGrievances.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
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
      </div>
    </MainLayout>
  )
}

// Format date to "Jan 15, 2023"
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

// Highlight search matches in text
function highlightSearchMatch(text: string, query: string) {
  if (!query) return text

  const parts = text.split(new RegExp(`(${query})`, "gi"))

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="bg-yellow-200 font-medium">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  )
}
