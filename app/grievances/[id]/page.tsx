"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  Calendar,
  User,
  Share2,
  LinkIcon,
  Download,
  QrCode,
  Check,
  Send,
  FileText,
  ImageIcon,
  Flag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import MainLayout from "@/components/MainLayout"
import { useToast } from "@/hooks/use-global-toast"
import { grievances } from "@/data/grievances"

export default function GrievanceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const toast = useToast()

  const grievance = grievances.find((g) => g.id === id)

  const [upvoted, setUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(grievance?.upvotes || 0)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [replying, setReplying] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  if (!grievance) {
    return (
      <MainLayout isLoggedIn={true} isAdmin={false}>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Grievance not found</h2>
          <p className="text-gray-600 mb-8">The grievance you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/grievances")} className="gradient-bg text-white">
            Back to Grievances
          </Button>
        </div>
      </MainLayout>
    )
  }

  const handleUpvote = () => {
    if (upvoted) {
      toast.info("You've already upvoted this grievance")
      return
    }

    setUpvoted(true)
    setUpvoteCount((prev) => prev + 1)
    toast.success("Grievance upvoted successfully")
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleDownload = (attachment: any) => {
    toast.success(`Downloading ${attachment.name}...`)
  }

  const handleSubmitComment = () => {
    if (!commentText.trim()) return

    toast.success("Comment submitted successfully")
    setCommentText("")
  }

  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim()) return

    toast.success("Reply submitted successfully")
    setReplyText("")
    setReplying(null)
  }

  const handleReport = () => {
    toast.info("Content reported for review")
  }

  // Get status step number
  const getStatusStep = () => {
    switch (grievance.status) {
      case "Submitted":
        return 1
      case "Reviewed":
        return 2
      case "Resolved":
        return 3
      default:
        return 1
    }
  }

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

  const statusStep = getStatusStep()

  return (
    <MainLayout isLoggedIn={true} isAdmin={false}>
      <motion.div
        className="container mx-auto px-4 py-6 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back button */}
        <motion.div variants={itemVariants} className="mb-6">
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
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">{grievance.title}</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <Badge variant="outline" className="bg-white">
                  {grievance.category}
                </Badge>
                <span>•</span>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>{new Date(grievance.createdAt).toLocaleDateString()}</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <User className="mr-1 h-3 w-3" />
                  <span>{grievance.isAnonymous ? "Anonymous" : grievance.author}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" onClick={handleShare} className="bg-white">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleUpvote}
                  className={`flex items-center ${upvoted ? "gradient-bg text-white" : "bg-white border border-gray-200"}`}
                  size="sm"
                >
                  <motion.div
                    animate={
                      upvoted
                        ? {
                            y: [0, -5, 0],
                            scale: [1, 1.2, 1],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                  </motion.div>
                  <motion.span animate={upvoted ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.5 }}>
                    Upvote ({upvoteCount})
                  </motion.span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Status Tracker */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Status Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Progress Bar */}
                <div className="h-2 bg-gray-200 rounded-full">
                  <motion.div
                    className="h-2 gradient-bg rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(statusStep / 3) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                {/* Steps */}
                <div className="flex justify-between items-center mt-4 px-2">
                  <motion.div
                    className="flex flex-col items-center"
                    animate={
                      statusStep >= 1
                        ? {
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        statusStep >= 1 ? "gradient-bg" : "bg-gray-300"
                      }`}
                    >
                      <motion.div
                        animate={
                          statusStep >= 1
                            ? {
                                scale: [0, 1.2, 1],
                                opacity: [0, 1],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <Check className="h-5 w-5 text-white" />
                      </motion.div>
                    </div>
                    <span className="text-xs mt-1 text-center">Submitted</span>
                  </motion.div>

                  <motion.div
                    className="flex flex-col items-center"
                    animate={
                      statusStep >= 2
                        ? {
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        statusStep >= 2 ? "gradient-bg" : "bg-gray-300"
                      }`}
                    >
                      {statusStep >= 2 && (
                        <motion.div
                          animate={{
                            scale: [0, 1.2, 1],
                            opacity: [0, 1],
                          }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          <Check className="h-5 w-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <span className="text-xs mt-1 text-center">Reviewed</span>
                  </motion.div>

                  <motion.div
                    className="flex flex-col items-center"
                    animate={
                      statusStep >= 3
                        ? {
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        statusStep >= 3 ? "gradient-bg" : "bg-gray-300"
                      }`}
                    >
                      {statusStep >= 3 && (
                        <motion.div
                          animate={{
                            scale: [0, 1.2, 1],
                            opacity: [0, 1],
                          }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                        >
                          <Check className="h-5 w-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <span className="text-xs mt-1 text-center">Resolved</span>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content + Comments */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
            {/* Description */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{grievance.description}</p>
              </CardContent>
            </Card>

            {/* Attachments */}
            {grievance.attachments.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {grievance.attachments.map((attachment) => (
                      <motion.div
                        key={attachment.id}
                        whileHover={{ scale: 1.02 }}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        {attachment.type === "image" && (
                          <div className="relative h-48">
                            <img
                              src={attachment.url || "/placeholder.svg"}
                              alt={attachment.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                              <Button variant="secondary" size="sm" onClick={() => handleDownload(attachment)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </div>
                          </div>
                        )}
                        <div className="p-3 flex justify-between items-center bg-gray-50">
                          <div className="flex items-center gap-2">
                            {attachment.type === "image" ? (
                              <ImageIcon className="h-4 w-4 text-gray-500" />
                            ) : (
                              <FileText className="h-4 w-4 text-gray-500" />
                            )}
                            <span className="text-sm text-gray-700">{attachment.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(attachment)}
                            className="text-gray-500 hover:text-gray-900"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comments */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Comment Input */}
                <div className="mb-6">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 bg-purple-100">
                      <AvatarFallback className="text-purple-600">YO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Add your comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="mb-2 min-h-[80px]"
                      />
                      <div className="flex justify-end">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={handleSubmitComment}
                            className="gradient-bg text-white"
                            disabled={!commentText.trim()}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Submit Comment
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment List */}
                <div className="space-y-6">
                  {grievance.comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
                      <p>No comments yet. Be the first to comment!</p>
                    </div>
                  ) : (
                    grievance.comments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${comment.isPinned ? "border-l-4 border-purple-500 pl-4" : ""}`}
                      >
                        <div className="flex gap-3">
                          <Avatar className={`h-8 w-8 ${comment.isAdmin ? "bg-orange-100" : "bg-gray-100"}`}>
                            <AvatarFallback className={comment.isAdmin ? "text-orange-600" : "text-gray-600"}>
                              {comment.author.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{comment.author}</span>
                              {comment.isAdmin && <Badge className="gradient-bg text-white text-xs">Admin</Badge>}
                              {comment.isPinned && (
                                <Badge variant="outline" className="text-xs flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  Official Response
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">{comment.text}</p>
                            <div className="flex gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-gray-500 h-6 px-2"
                                onClick={() => setReplying(comment.id)}
                              >
                                Reply
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-gray-500 h-6 px-2"
                                onClick={handleReport}
                              >
                                <Flag className="h-3 w-3 mr-1" />
                                Report
                              </Button>
                            </div>

                            {/* Reply Form */}
                            <AnimatePresence>
                              {replying === comment.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 ml-6 overflow-hidden"
                                >
                                  <div className="flex gap-3">
                                    <Avatar className="h-6 w-6 bg-purple-100">
                                      <AvatarFallback className="text-purple-600 text-xs">YO</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <Textarea
                                        placeholder="Your reply..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="mb-2 min-h-[60px] text-sm"
                                      />
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setReplying(null)}
                                          className="text-xs h-8"
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          size="sm"
                                          onClick={() => handleSubmitReply(comment.id)}
                                          className="gradient-bg text-white text-xs h-8"
                                          disabled={!replyText.trim()}
                                        >
                                          Reply
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Nested Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="mt-3 ml-6 space-y-4">
                                {comment.replies.map((reply) => (
                                  <motion.div key={reply.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="flex gap-3">
                                      <Avatar className={`h-6 w-6 ${reply.isAdmin ? "bg-orange-100" : "bg-gray-100"}`}>
                                        <AvatarFallback
                                          className={`text-xs ${reply.isAdmin ? "text-orange-600" : "text-gray-600"}`}
                                        >
                                          {reply.author.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-medium text-sm">{reply.author}</span>
                                          {reply.isAdmin && (
                                            <Badge className="gradient-bg text-white text-xs">Admin</Badge>
                                          )}
                                          <span className="text-xs text-gray-500">
                                            {new Date(reply.createdAt).toLocaleDateString()}
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-700">{reply.text}</p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Info Card */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Grievance Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
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
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <Badge variant="outline" className="bg-white">
                    {grievance.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Submitted by</p>
                  <div className="flex items-center gap-2">
                    {grievance.authorAvatar ? (
                      <Avatar className="h-6 w-6">
                        <img src={grievance.authorAvatar || "/placeholder.svg"} alt={grievance.author} />
                        <AvatarFallback>{grievance.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="h-6 w-6 bg-gray-100">
                        <AvatarFallback className="text-gray-600">
                          {grievance.isAnonymous ? "AN" : grievance.author.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <span>{grievance.isAnonymous ? "Anonymous" : grievance.author}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Submitted on</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(grievance.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last updated</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(grievance.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Visibility</p>
                  <Badge variant="outline" className="bg-white">
                    {grievance.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Upvotes</p>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-gray-500" />
                    <span>{upvoteCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Grievances Card */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Similar Grievances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {grievances
                    .filter((g) => g.id !== grievance.id && g.category === grievance.category)
                    .slice(0, 3)
                    .map((g) => (
                      <motion.div
                        key={g.id}
                        whileHover={{ x: 5 }}
                        className="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                      >
                        <Button
                          variant="link"
                          className="p-0 h-auto text-left font-medium text-gray-700 hover:text-purple-600"
                          onClick={() => router.push(`/grievances/${g.id}`)}
                        >
                          {g.title}
                        </Button>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Badge
                            className={`text-xs text-white
                              ${g.status === "Submitted" && "bg-blue-500"} 
                              ${g.status === "Reviewed" && "bg-amber-500"} 
                              ${g.status === "Resolved" && "bg-green-500"}
                            `}
                          >
                            {g.status}
                          </Badge>
                          <span>•</span>
                          <div className="flex items-center">
                            <ThumbsUp className="mr-1 h-3 w-3" />
                            <span>{g.upvotes}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                  {grievances.filter((g) => g.id !== grievance.id && g.category === grievance.category).length ===
                    0 && <p className="text-center text-gray-500 py-4">No similar grievances found</p>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Share Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Grievance</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="bg-white p-3 rounded-lg shadow-md mb-4">
                <QrCode className="h-32 w-32 text-gray-800" />
              </div>
              <p className="text-sm text-gray-500">Scan to view this grievance</p>
            </div>

            <div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={typeof window !== "undefined" ? window.location.href : ""}
                  readOnly
                  className="flex-1 p-2 border rounded-l-md focus:outline-none"
                />
                <Button onClick={handleCopyLink} className="gradient-bg text-white rounded-l-none">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" className="bg-blue-500 text-white border-0 h-10 w-10 p-0 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.203 3.203 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.23 3.23 0 0 1-.865.115 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" className="bg-blue-700 text-white border-0 h-10 w-10 p-0 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" className="bg-blue-600 text-white border-0 h-10 w-10 p-0 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" className="bg-green-600 text-white border-0 h-10 w-10 p-0 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                </Button>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
