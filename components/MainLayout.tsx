"use client"

import type { ReactNode } from "react"
import MainNavigation from "./MainNavigation"

interface MainLayoutProps {
  children: ReactNode
  isLoggedIn?: boolean
  isAdmin?: boolean
}

export default function MainLayout({ children, isLoggedIn = true, isAdmin = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-30">
        <MainNavigation isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Desktop/Tablet: Card Layout */}
        <div className="hidden md:block p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 min-h-[calc(100vh-8rem)] overflow-hidden">
              {children}
            </div>
          </div>
        </div>

        {/* Mobile: Full Width */}
        <div className="md:hidden pb-20">{children}</div>
      </div>
    </div>
  )
}
