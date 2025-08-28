"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Filter, QrCode, Share2, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import AddItemModal from "@/components/AddItemModal"
import { useToastTrigger } from "@/hooks/use-global-toast"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Upload } from "lucide-react"
import MainLayout from "@/components/MainLayout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const sampleItems = [
{
id: 1,
type: "lost",
title: "iPhone 14 Pro",
description: "Black iPhone 14 Pro with cracked screen protector",
category: "Electronics",
date: "2024-01-15",
location: "Library 2nd Floor",
image: "/black-iphone.png",
user: "Sarah Chen",
},
{
id: 2,
type: "found",
title: "Blue Water Bottle",
description: "Hydro Flask water bottle with university stickers",
category: "Personal Items",
date: "2024-01-14",
location: "Student Center",
image: "/placeholder-kgk3n.png",
user: "Mike Johnson",
},
// ... rest of the sample items
]

export default function HomePage() {
const [activeTab, setActiveTab] = useState("lost")
const [searchQuery, setSearchQuery] = useState("")
const [selectedFilter, setSelectedFilter] = useState("")
const [showAddModal, setShowAddModal] = useState(false)
const [isLoggedIn, setIsLoggedIn] = useState(true) // For demo purposes
const toast = useToastTrigger()

const [showClaimModal, setShowClaimModal] = useState(false)
const [selectedItem, setSelectedItem] = useState<any>(null)
  const [claimMessage, setClaimMessage] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [proofImage, setProofImage] = useState<File | null>(null)

    const filteredItems = sampleItems.filter(
    (item) => item.type === activeTab && item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleClaimItem = (item: any) => {
    setSelectedItem(item)
    setShowClaimModal(true)
    }

    const handleShareItem = (itemId: number) => {
    toast.success("Link copied to clipboard!")
    }

    const handleSubmitClaim = () => {
    toast.success(`Your claim for "${selectedItem?.title}" has been sent to the owner.`)
    setShowClaimModal(false)
    setSelectedItem(null)
    setClaimMessage("")
    setContactNumber("")
    setProofImage(null)
    }

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
    staggerChildren: 0.05,
    },
    },
    exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3 },
    },
    }

    const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4 },
    },
    };

    return (
    <MainLayout isLoggedIn={isLoggedIn} isAdmin={true}>
      <motion.div className="p-6 md:p-8" variants={pageVariants} initial="hidden" animate="visible">
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4" animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }} transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}>
            Find What You've Lost, Return What You've Found
          </motion.h2>
          <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Connect with your campus community through our smart lost & found system
          </motion.p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <motion.div animate={{
                x: [0, 2, -2, 0],
              }} transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 4,
              }}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </motion.div>
            <motion.div whileFocus={{ scale: 1.02 }}>
              <Input placeholder="Search for items..." value={searchQuery} onChange={(e)=>
              setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-2 border-purple-200 focus:border-purple-400"
              />
            </motion.div>
          </div>
          <div className="flex justify-center sm:justify-end items-center gap-4 flex-wrap">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger
                  className="!h-12 px-6 border-purple-200 focus:border-purple-400 transition-all duration-300 w-[200px]">
                  <SelectValue placeholder="Filters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="found">Found</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="personal">Personal Items</SelectItem>
                  <SelectItem value="bags">Bags</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="keys">Keys</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button onClick={()=> setShowAddModal(true)} className="h-12 px-6 gradient-bg text-white
                hover:opacity-90">
                <Plus className="mr-2 h-5 w-5" />
                Add {activeTab === "lost" ? "Lost" : "Found"} Item
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div variants={itemVariants}>
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-transparent">
              <TabsTrigger value="lost"
                className="text-lg font-semibold rounded-full transition-all duration-300 px-3
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-orange-400
        data-[state=active]:text-white
        data-[state=inactive]:bg-white/70 data-[state=inactive]:backdrop-blur-md data-[state=inactive]:shadow-md
        data-[state=inactive]:text-transparent data-[state=inactive]:bg-clip-text
        data-[state=inactive]:bg-gradient-to-r data-[state=inactive]:from-violet-500 data-[state=inactive]:to-orange-400">
                Lost Items
              </TabsTrigger>

              <TabsTrigger value="found"
                className="text-lg font-semibold rounded-full transition-all duration-300 px-3
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-orange-400
        data-[state=active]:text-white
        data-[state=inactive]:bg-white/70 data-[state=inactive]:backdrop-blur-md data-[state=inactive]:shadow-md
        data-[state=inactive]:text-transparent data-[state=inactive]:bg-clip-text
        data-[state=inactive]:bg-gradient-to-r data-[state=inactive]:from-violet-500 data-[state=inactive]:to-orange-400">
                Found Items
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <AnimatePresence mode="sync">
            <TabsContent value="lost">
              <motion.div key="lost" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                <motion.div key={item.id} variants={cardVariants} custom={index}>
                  <ItemCard item={item} onClaim={()=> handleClaimItem(item)} onShare={handleShareItem} />
                </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="found">
              <motion.div key="found" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                <motion.div key={item.id} variants={cardVariants} custom={index}>
                  <ItemCard item={item} onClaim={()=> handleClaimItem(item)} onShare={handleShareItem} />
                </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>

      {/* Modals */}
      <AddItemModal open={showAddModal} onOpenChange={setShowAddModal} itemType={activeTab as "lost" | "found" } />

      {/* Claim Modal */}
      <AnimatePresence>
        {showClaimModal && (
        <Dialog open={showClaimModal} onOpenChange={setShowClaimModal}>
          <DialogContent
            className="max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col sm:max-w-[90vw] [&>button.absolute]:hidden">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col h-full">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-purple-200 bg-white/80 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <DialogTitle className="text-2xl gradient-text">
                  {selectedItem?.type === "lost" ? "Found This Item?" : "Claim This Item"}
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

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">

                <motion.div className="max-w-2xl mx-auto space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, staggerChildren: 0.1 }}>
                  {/* Item Preview */}
                  {selectedItem && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}>
                    <Card className="glass-effect border-2 border-purple-200">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <motion.img src={selectedItem.image || "/placeholder.svg" } alt={selectedItem.title}
                            className="w-20 h-20 object-cover rounded-lg" whileHover={{ scale: 1.05 }} />
                          <div>
                            <h3 className="font-semibold gradient-text">{selectedItem.title}</h3>
                            <p className="text-sm text-gray-600">{selectedItem.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="gradient-bg text-white text-xs">{selectedItem.category}</Badge>
                              <span className="text-xs text-gray-500">{selectedItem.location}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  )}

                  {/* Claim Form */}
                  <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}>
                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="claim-message">Message to Owner</Label>
                      <motion.div whileFocus={{ scale: 1.01 }}>
                        <Textarea id="claim-message" placeholder={ selectedItem?.type==="lost"
                          ? "Describe where and when you found this item..." : "Explain why this item belongs to you..."
                          } value={claimMessage} onChange={(e)=> setClaimMessage(e.target.value)}
                            className="border-purple-200 focus:border-purple-400 min-h-[120px]"
                          />
                        </motion.div>
                      </div>

                      {/* Contact Number */}
                      <div className="space-y-2">
                        <Label htmlFor="contact-number">Contact Number (Optional)</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <motion.div whileFocus={{ scale: 1.01 }}>
                            <Input
                              id="contact-number"
                              type="tel"
                              placeholder="Your phone number"
                              value={contactNumber}
                              onChange={(e) => setContactNumber(e.target.value)}
                              className="pl-10 border-purple-200 focus:border-purple-400"
                            />
                          </motion.div>
                        </div>
                      </div>

                      {/* Proof Image Upload */}
                      <div className="space-y-2">
                        <Label htmlFor="proof-image">Proof of Ownership (Optional)</Label>
                        <motion.div
                          className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center"
                          whileHover={{ borderColor: "rgb(147 51 234)" }}
                        >
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          >
                            <Upload className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                          </motion.div>
                          <p className="text-sm text-gray-600">Upload an image as proof</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProofImage(e.target.files?.[0] || null)}
                            className="hidden"
                            id="proof-upload"
                          />
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              className="mt-2 bg-transparent border-purple-200"
                              onClick={() => document.getElementById("proof-upload")?.click()}
                            >
                              Choose File
                            </Button>
                          </motion.div>
                          {proofImage && (
                            <motion.p
                              className="text-sm text-green-600 mt-2"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                            >
                              ✓ {proofImage.name}
                            </motion.p>
                          )}
                        </motion.div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 pt-4">
                        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="outline" onClick={() => setShowClaimModal(false)} className="w-full">
                            Cancel
                          </Button>
                        </motion.div>
                        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button onClick={handleSubmitClaim} className="gradient-bg text-white w-full">
                            Submit Claim
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </MainLayout>
  )
}

function ItemCard({
  item,
  onClaim,
  onShare,
}: {
  item: any
  onClaim: () => void
  onShare: (id: number) => void
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-purple-200">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <motion.img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
            />
            <motion.div
              className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-white/90"
                  onClick={() => onShare(item.id)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90">
                  <QrCode className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              >
                <Badge className="gradient-bg text-white text-xs">{item.category}</Badge>
              </motion.div>
              <span className="text-xs text-gray-500">{item.date}</span>
            </div>

            <motion.h3
              className="font-semibold text-lg mb-2 gradient-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {item.title}
            </motion.h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

            <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>{item.location}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {item.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <span className="text-xs text-gray-600">{item.user}</span>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" onClick={onClaim} className="gradient-bg text-white hover:opacity-90">
                  {item.type === "lost" ? "Found It!" : "Claim"}
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}