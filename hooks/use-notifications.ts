"use client"

import { create } from "zustand"

export type ToastStatus = "success" | "error" | "warning" | "info"

export interface Notification {
  id: string
  title: string
  message: string
  type: "claim" | "match" | "system" | "success"
  timestamp: Date
  read: boolean
  itemId?: number
  userId?: string
  avatar?: string
}

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeToast: (id: string) => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
}

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "New Claim Received",
    message:
      "Mike Johnson claims to have found your iPhone 14 Pro. He provided proof of ownership and contact details for verification.",
    type: "claim",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    itemId: 1,
    userId: "mike-johnson",
    avatar: "/student-avatar.png",
  },
  {
    id: "2",
    title: "Item Match Found",
    message:
      "A blue water bottle matching your description was posted by Sarah Kim. The item details and location seem to match perfectly.",
    type: "match",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    itemId: 2,
  },
  {
    id: "3",
    title: "Claim Approved",
    message:
      "Your claim for the MacBook Air has been approved! The owner has confirmed your identity. Please coordinate pickup details.",
    type: "success",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    itemId: 3,
  },
  {
    id: "4",
    title: "System Update",
    message:
      "LinkLedger has been updated with new features including improved search functionality and better notification system.",
    type: "system",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: "5",
    title: "New Claim Received",
    message:
      "Sarah Kim claims your lost red backpack. She mentioned finding it in the library and provided a detailed description.",
    type: "claim",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    itemId: 4,
    userId: "sarah-kim",
  },
  {
    id: "6",
    title: "Potential Match Alert",
    message:
      "A black iPhone 14 Pro was just posted as found. The description and location match your lost item report.",
    type: "match",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    read: false,
    itemId: 5,
  },
]

export const useNotifications = create<NotificationStore>((set, get) => ({
  notifications: sampleNotifications,
  unreadCount: sampleNotifications.filter((n) => !n.read).length,
  isOpen: false,

  setIsOpen: (open: boolean) => set({ isOpen: open }),

  markAsRead: (id: string) =>
    set((state) => {
      const updatedNotifications = state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      )
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter((n) => !n.read).length,
      }
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  removeToast: (id: string) =>
    set((state) => {
      const updatedNotifications = state.notifications.filter((notification) => notification.id !== id)
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter((n) => !n.read).length,
      }
    }),

  addNotification: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
      }
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }
    }),
}))
