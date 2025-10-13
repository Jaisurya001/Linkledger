"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, ImageIcon, Paperclip, Plus, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MainLayout from "@/components/MainLayout"
import { useToast } from "@/hooks/use-global-toast"
import { grievanceCategories, addGrievance } from "@/data/grievances"

export default function SubmitGrievancePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [customCategory, setCustomCategory] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCategoryInput, setShowCategoryInput] = useState(false)


  const router = useRouter()
  const toast = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Please enter a title")
      return
    }

    if (!description.trim()) {
      toast.error("Please enter a description")
      return
    }

    if (!selectedCategory && !customCategory) {
      toast.error("Please select or enter a category")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const grievanceData = {
        title,
        description,
        category: selectedCategory || customCategory,
        isAnonymous,
        isPublic,
      }

      addGrievance(grievanceData)
      toast.success("Grievance submitted successfully!")
      router.push("/grievances/mine")
    } catch (error) {
      toast.error("Failed to submit grievance. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
      <div className="container mx-auto px-4 py-6 max-w-4xl">
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
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-3xl font-bold gradient-text mb-2">Submit New Grievance</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your concerns or suggestions with the campus administration. All submissions are reviewed within 48
            hours.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle>Grievance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief title for your grievance"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={100}
                    className="focus:border-purple-400"
                  />
                  <div className="flex justify-end">
                    <span className="text-xs text-gray-500">{title.length}/100</span>
                  </div>
                </motion.div>

                {/* Category */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {grievanceCategories.map((category) => (
                        <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Badge
                            className={`cursor-pointer py-1.5 px-3 
                              ${
                                selectedCategory === category ? "gradient-bg text-white" : "bg-white bg-gray text-black hover:bg-gray-100"
                              }`}
                            onClick={() => {
                              setSelectedCategory(category)
                              setShowCategoryInput(false)
                              setCustomCategory("")
                            }}
                          >
                            {category}
                          </Badge>
                        </motion.div>
                      ))}
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          className={`cursor-pointer py-1.5 px-3 bg-white 
                            ${showCategoryInput ? "border-2 border-purple-400" : "hover:bg-gray-100"}`}
                          onClick={() => {
                            setShowCategoryInput(!showCategoryInput)
                            setSelectedCategory("")
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Custom
                        </Badge>
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {showCategoryInput && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <Input
                            placeholder="Enter custom category"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            className="focus:border-purple-400"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed explanation of your grievance. Please include relevant information like dates, locations, and specific issues."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="min-h-[150px] focus:border-purple-400"
                  />
                </motion.div>

                {/* File Upload */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="attachments">Attachments (Optional)</Label>
                  <div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-purple-300 transition-colors cursor-pointer"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                    </motion.div>
                    <p className="mt-2 text-sm text-gray-500">Drop files here or click to upload</p>
                    <p className="text-xs text-gray-400">PNG, JPG, PDF, DOC up to 10MB</p>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium">Uploaded Files:</p>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              {file.type.includes("image") ? (
                                <ImageIcon className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Paperclip className="h-4 w-4 text-gray-500" />
                              )}
                              <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                              <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(0)} KB)</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeFile(index)
                              }}
                              className="h-8 w-8 p-0 rounded-full hover:bg-gray-200"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Options */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="anonymous" className="text-base">
                        Submit Anonymously
                      </Label>
                      <p className="text-sm text-gray-500">Your name will not be visible to others</p>
                    </div>
                    <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="public" className="text-base">
                        Make Public
                      </Label>
                      <p className="text-sm text-gray-500">Allow others to view and upvote your grievance</p>
                    </div>
                    <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
                  </div>
                </motion.div>

                {/* Submit */}
                <motion.div variants={itemVariants} className="pt-4 flex gap-4">
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => router.push("/grievances")}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="w-full gradient-bg text-white" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="mr-2"
                          >
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </motion.div>
                          Submitting...
                        </>
                      ) : (
                        <>Submit Grievance</>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  )
}
