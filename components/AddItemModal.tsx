"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { X, ImageIcon, Video, Mic, MapPin, FileText, Upload } from "lucide-react"
import { useToastTrigger } from "@/hooks/use-global-toast"

interface ContentBlock {
id: string
type: "image" | "video" | "audio" | "text" | "location" | "document"
content: any
}

export default function AddItemModal({
open,
onOpenChange,
itemType = "lost",
}: {
open: boolean
onOpenChange: (open: boolean) => void
itemType?: "lost" | "found"
}) {
const [title, setTitle] = useState("")
const [category, setCategory] = useState("")
const [description, setDescription] = useState("")
const [location, setLocation] = useState("")
const [otherCategory, setOtherCategory] = useState("");
const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  const toast = useToastTrigger()

  const categories = ["Electronics", "Personal Items", "Bags", "Clothing", "Books", "Keys", "Jewelry", "Other"]

  const addContentBlock = (type: ContentBlock["type"]) => {
  const newBlock: ContentBlock = {
  id: Date.now().toString(),
  type,
  content: type === "text" ? "" : null,
  }
  setContentBlocks([...contentBlocks, newBlock])
  toast.info(`${type.charAt(0).toUpperCase() + type.slice(1)} block added`)
  }

  const removeContentBlock = (id: string) => {
  setContentBlocks(contentBlocks.filter((block) => block.id !== id))
  toast.warning("Content block removed")
  }

  const updateContentBlock = (id: string, content: any) => {
  setContentBlocks(contentBlocks.map((block) => (block.id === id ? { ...block, content } : block)))
  }

  const handleSubmit = () => {
  if (!title.trim()) {
  toast.error("Please enter an item title")
  return
  }

  if (!category) {
  toast.error("Please select a category")
  return
  }

  if (!description.trim()) {
  toast.error("Please provide a description")
  return
  }

  toast.success(`${itemType === "lost" ? "Lost" : "Found"} item "${title}" posted successfully! 🎉`)
  onOpenChange(false)
  // Reset form
  setTitle("")
  setCategory("")
  setDescription("")
  setLocation("")
  setContentBlocks([])
  }

  const modalVariants = {
  hidden: {
  opacity: 0,
  scale: 0.9,
  y: 20,
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
  scale: 0.9,
  y: 20,
  transition: {
  duration: 0.3,
  ease: [0.25, 0.46, 0.45, 0.94],
  },
  },
  }

  return (
  <AnimatePresence>
    {open && (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl w-full h-[90vh] sm:max-w-[95vw] p-0 flex flex-col overflow-hidden [&>button.absolute]:hidden">
        <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
          className="w-full h-full flex flex-col">
          {/* Custom Header */}
          <motion.div
            className="flex items-center justify-between p-6 border-b border-purple-200 bg-white/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <DialogTitle className="text-2xl gradient-text">
              Add {itemType === "lost" ? "Lost" : "Found"} Item
            </DialogTitle>
            <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
              <DialogClose asChild>
                <Button variant="ghost" size="icon"
                  className="h-8 w-8 rounded-full gradient-bg text-white hover:opacity-80">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </motion.div>
          </motion.div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Basic Info */}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }}>
                  <Label htmlFor="title">Item Title</Label>
                  <Input id="title" placeholder="e.g., iPhone 14 Pro" value={title} onChange={(e)=>
                  setTitle(e.target.value)}
                  className="h-10 border-purple-200 focus:border-purple-400 transition-all duration-300"
                  />
                </motion.div>

                <motion.div className="space-y-2" whileFocus={{ scale: 1.02 }}>
                  <Label htmlFor="category">Category</Label>
                  <div className="flex gap-2">
                    <Select value={category} onValueChange={(value)=> {
                      setCategory(value);
                      if (value !== "Other") {
                      setOtherCategory(""); // Clear the other category value
                      }
                      }}
                      >
                      <SelectTrigger
                        className="!h-10 border-purple-200 focus:border-purple-400 transition-all duration-300">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {category === "Other" && (
                    <Input placeholder="Enter custom category" value={otherCategory} onChange={(e)=>
                    setOtherCategory(e.target.value)}
                    className="h-10 border-purple-200 focus:border-purple-400 transition-all duration-300 flex-1"
                    />
                    )}
                  </div>
                </motion.div>

              </motion.div>

              <motion.div className="space-y-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }} whileFocus={{ scale: 1.01 }}>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Where was it lost/found?" value={location} onChange={(e)=>
                setLocation(e.target.value)}
                className="border-purple-200 focus:border-purple-400 transition-all duration-300"
                />
              </motion.div>

              <motion.div className="space-y-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }} whileFocus={{ scale: 1.01 }}>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Provide detailed description..." value={description}
                  onChange={(e)=> setDescription(e.target.value)}
                      className="border-purple-200 focus:border-purple-400 min-h-[100px] transition-all duration-300"
                    />
                  </motion.div>

                  {/* Content Blocks */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-semibold">Additional Content</Label>
                      <div className="flex gap-2 flex-wrap">
                        {[
                          { type: "image", icon: ImageIcon, label: "Image" },
                          { type: "video", icon: Video, label: "Video" },
                          { type: "audio", icon: Mic, label: "Audio" },
                          { type: "location", icon: MapPin, label: "Location" },
                          { type: "document", icon: FileText, label: "Document" },
                        ].map((item, index) => {
                          const Icon = item.icon
                          return (
                            <motion.div
                              key={item.type}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addContentBlock(item.type as ContentBlock["type"])}
                                className="border-purple-200 hover:bg-purple-50 transition-all duration-300"
                              >
                                <Icon className="h-4 w-4 mr-1" />
                                {item.label}
                              </Button>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Render Blocks */}
                    <AnimatePresence>
                      <div className="space-y-3">
                        {contentBlocks.map((block, index) => (
                          <motion.div
                            key={block.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ContentBlockComponent
                              block={block}
                              onUpdate={(content) => updateContentBlock(block.id, content)}
                              onRemove={() => removeContentBlock(block.id)}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </AnimatePresence>
                  </motion.div>

                  {/* Submit */}
                  <motion.div
                    className="flex justify-end gap-3 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleSubmit}
                        className="gradient-bg text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Post {itemType === "lost" ? "Lost" : "Found"} Item
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

function ContentBlockComponent({
  block,
  onUpdate,
  onRemove,
}: {
  block: ContentBlock
  onUpdate: (content: any) => void
  onRemove: () => void
}) {
  const getBlockIcon = () => {
    switch (block.type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Mic className="h-4 w-4" />
      case "location":
        return <MapPin className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getBlockTitle = () => {
    switch (block.type) {
      case "image":
        return "Image Upload"
      case "video":
        return "Video Upload"
      case "audio":
        return "Audio Recording"
      case "location":
        return "Location Pin"
      case "document":
        return "Document Upload"
      default:
        return "Content Block"
    }
  }

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="border-purple-200 hover:shadow-md transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {getBlockIcon()}
              <span className="font-medium">{getBlockTitle()}</span>
            </div>
            <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {block.type === "text" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Textarea
                placeholder="Enter text content..."
                value={block.content || ""}
                onChange={(e) => onUpdate(e.target.value)}
                className="border-purple-200 focus:border-purple-400 transition-all duration-300"
              />
            </motion.div>
          )}

          {(block.type === "image" ||
            block.type === "video" ||
            block.type === "audio" ||
            block.type === "document") && (
            <motion.div
              className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center hover:border-purple-300 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              </motion.div>
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">
                {block.type === "image" && "PNG, JPG, GIF up to 10MB"}
                {block.type === "video" && "MP4, MOV up to 100MB"}
                {block.type === "audio" && "MP3, WAV up to 25MB"}
                {block.type === "document" && "PDF, DOC, DOCX up to 25MB"}
              </p>
            </motion.div>
          )}

          {block.type === "location" && (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Input
                placeholder="Enter location or address"
                className="border-purple-200 focus:border-purple-400 transition-all duration-300"
              />
              <motion.div
                className="h-32 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
                whileHover={{ scale: 1.01 }}
              >
                <p className="text-gray-500">Map preview will appear here</p>
              </motion.div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}