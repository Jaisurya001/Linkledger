"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Calendar, Share2, QrCode, ArrowLeft, Upload, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Sample item data with different content types
const itemData = {
  id: 1,
  title: "iPhone 14 Pro",
  description: "Black iPhone 14 Pro with cracked screen protector. Last seen in the library.",
  category: "Electronics",
  date: "2024-01-15",
  location: "Library 2nd Floor",
  user: "Sarah Chen",
  userAvatar: "/student-avatar.png",
  status: "lost",
  contentBlocks: [
    {
      id: 1,
      type: "image",
      content: "/black-iphone-front.png",
    },
    {
      id: 2,
      type: "text",
      content:
        "This is my iPhone 14 Pro that I lost yesterday around 3 PM. It has a distinctive crack on the screen protector and several stickers on the back case. The phone case is black with a small university logo.",
    },
    {
      id: 3,
      type: "image",
      content: "/black-iphone-back-stickers.png",
    },
    {
      id: 4,
      type: "location",
      content: { address: "University Library, 2nd Floor, Study Area B", coordinates: { lat: 40.7128, lng: -74.006 } },
    },
    {
      id: 5,
      type: "audio",
      content: "/placeholder.mp3",
    },
    {
      id: 6,
      type: "text",
      content:
        "If found, please contact me immediately. This phone contains important academic work and personal photos. Reward offered for safe return.",
    },
  ],
}

export default function ItemDetailPage() {
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [claimMessage, setClaimMessage] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [proofImage, setProofImage] = useState<File | null>(null)
  const { toast } = useToast()

  const handleClaim = () => {
    toast({
      title: "Claim Submitted Successfully!",
      description: "The owner will be notified of your claim request.",
    })
    setShowClaimModal(false)
    setClaimMessage("")
    setContactNumber("")
    setProofImage(null)
  }

  const handleShare = () => {
    toast({
      title: "Link Copied",
      description: "Item link has been copied to clipboard.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="glass-effect border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold gradient-text">Item Details</h1>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <QrCode className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Item Header */}
        <Card className="glass-effect border-2 border-purple-200 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">{itemData.title}</h1>
                <p className="text-gray-600 text-lg mb-4">{itemData.description}</p>
              </div>
              <Badge className={itemData.status === "lost" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}>
                {itemData.status.toUpperCase()}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <Badge className="gradient-bg text-white">{itemData.category}</Badge>
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={itemData.userAvatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {itemData.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{itemData.user}</p>
                  <p className="text-sm text-gray-600">Posted this item</p>
                </div>
              </div>

              <Button onClick={() => setShowClaimModal(true)} className="gradient-bg text-white px-8">
                {itemData.status === "lost" ? "Found It!" : "Claim Item"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Blocks */}
        <div className="space-y-6">
          {itemData.contentBlocks.map((block) => (
            <ContentBlock key={block.id} block={block} />
          ))}
        </div>
      </main>

      {/* Claim Modal */}
      <Dialog open={showClaimModal} onOpenChange={setShowClaimModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">
              {itemData.status === "lost" ? "Claim Found Item" : "Claim Item"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="claim-message">Message to Owner</Label>
              <Textarea
                id="claim-message"
                placeholder="Describe how you found this item or why you believe it's yours..."
                value={claimMessage}
                onChange={(e) => setClaimMessage(e.target.value)}
                className="border-purple-200 focus:border-purple-400 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-number">Contact Number (Optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="contact-number"
                  type="tel"
                  placeholder="Your phone number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="pl-10 border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proof-image">Proof of Ownership (Optional)</Label>
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                <p className="text-sm text-gray-600">Upload an image as proof</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProofImage(e.target.files?.[0] || null)}
                  className="hidden"
                  id="proof-upload"
                />
                <Button
                  variant="outline"
                  className="mt-2 bg-transparent"
                  onClick={() => document.getElementById("proof-upload")?.click()}
                >
                  Choose File
                </Button>
                {proofImage && <p className="text-sm text-green-600 mt-2">✓ {proofImage.name}</p>}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowClaimModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleClaim} className="gradient-bg text-white flex-1">
                Submit Claim
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ContentBlock({ block }: { block: any }) {
  const renderContent = () => {
    switch (block.type) {
      case "image":
        return (
          <Card className="overflow-hidden border-2 border-purple-200">
            <img
              src={block.content || "/placeholder.svg"}
              alt="Item image"
              className="w-full h-auto max-h-96 object-cover"
            />
          </Card>
        )

      case "text":
        return (
          <Card className="glass-effect border-2 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">{block.content}</p>
              </div>
            </CardContent>
          </Card>
        )

      case "location":
        return (
          <Card className="glass-effect border-2 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-5 w-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-gray-600">{block.content.address}</p>
                </div>
              </div>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map preview would appear here</p>
              </div>
            </CardContent>
          </Card>
        )

      case "audio":
        return (
          <Card className="glass-effect border-2 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Audio Message</h4>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      Play
                    </Button>
                    <span className="text-sm text-gray-600">0:00 / 1:23</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return <div className="animate-in slide-in-from-bottom-4 duration-500">{renderContent()}</div>
}
