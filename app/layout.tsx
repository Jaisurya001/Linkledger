import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import GlobalToastContainer from "@/components/GlobalToastContainer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LinkLedger - Smart Campus Utility Portal",
  description: "Modern Lost & Found system for college students",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            {children}
            <Toaster />
            <GlobalToastContainer />
          </div>
        </TooltipProvider>
      </body>
    </html>
  )
}
