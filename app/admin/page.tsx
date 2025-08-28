"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, Package, CheckCircle, Clock, Search, Edit, Trash2 } from "lucide-react"
import MainLayout from "@/components/MainLayout"
import EditUserModal from "@/components/EditUserModal"
import DeleteUserModal from "@/components/DeleteUserModal"

// Sample data
const statsData = [
{ name: "Jan", lost: 45, found: 38, returned: 32 },
{ name: "Feb", lost: 52, found: 41, returned: 35 },
{ name: "Mar", lost: 48, found: 45, returned: 40 },
{ name: "Apr", lost: 61, found: 52, returned: 45 },
{ name: "May", lost: 55, found: 48, returned: 42 },
{ name: "Jun", lost: 67, found: 55, returned: 48 },
]

const categoryData = [
{ name: "Electronics", value: 35, color: "#8B5CF6" },
{ name: "Personal Items", value: 25, color: "#EC4899" },
{ name: "Bags", value: 20, color: "#3B82F6" },
{ name: "Clothing", value: 12, color: "#10B981" },
{ name: "Other", value: 8, color: "#F59E0B" },
]

const initialUsersData = [
{
id: 1,
name: "Sarah Chen",
email: "sarah.chen@university.edu",
role: "Student",
status: "Active",
itemsPosted: 12,
reputation: 4.8,
},
{
id: 2,
name: "Mike Johnson",
email: "mike.johnson@university.edu",
role: "Student",
status: "Active",
itemsPosted: 8,
reputation: 4.5,
},
{
id: 3,
name: "Alex Rivera",
email: "alex.rivera@university.edu",
role: "Student",
status: "Inactive",
itemsPosted: 15,
reputation: 4.9,
},
{
id: 4,
name: "Emma Davis",
email: "emma.davis@university.edu",
role: "Admin",
status: "Active",
itemsPosted: 3,
reputation: 5.0,
},
{
id: 5,
name: "John Smith",
email: "john.smith@university.edu",
role: "Student",
status: "Active",
itemsPosted: 6,
reputation: 4.2,
},
]

export default function AdminDashboard() {
const [searchQuery, setSearchQuery] = useState("")
const [selectedRole, setSelectedRole] = useState("all")
const [activeTab, setActiveTab] = useState("overview")
const [usersData, setUsersData] = useState(initialUsersData)
const [editingUser, setEditingUser] = useState(null)
const [deletingUser, setDeletingUser] = useState(null)
const [showEditModal, setShowEditModal] = useState(false)
const [showDeleteModal, setShowDeleteModal] = useState(false)

const filteredUsers = usersData.filter((user) => {
const matchesSearch =
user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
user.email.toLowerCase().includes(searchQuery.toLowerCase())
const matchesRole = selectedRole === "all" || user.role.toLowerCase() === selectedRole
return matchesSearch && matchesRole
})

const handleEditUser = (user) => {
setEditingUser(user)
setShowEditModal(true)
}

const handleDeleteUser = (user) => {
setDeletingUser(user)
setShowDeleteModal(true)
}

const handleSaveUser = (updatedUser) => {
setUsersData((users) => users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
}

const handleConfirmDelete = (userId) => {
setUsersData((users) => users.filter((user) => user.id !== userId))
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
staggerChildren: 0.1,
},
},
exit: {
opacity: 0,
x: 20,
transition: { duration: 0.3 },
},
}

return (
<MainLayout isLoggedIn={true} isAdmin={true}>
  <motion.div className="p-4 md:p-8" variants={pageVariants} initial="hidden" animate="visible">
    <motion.div variants={itemVariants} className="mb-6 md:mb-8">
      <motion.h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2" animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }} transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}>
        Admin Dashboard
      </motion.h1>
      <p className="text-gray-600 text-sm md:text-base">Manage your LinkLedger portal</p>
    </motion.div>

    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Mobile-optimized tabs */}
      <motion.div variants={itemVariants}>
        <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 h-10 md:h-12 bg-transparent">
          <TabsTrigger value="overview"
            className="text-xs md:text-lg font-semibold rounded-full transition-all duration-300 px-2 md:px-4
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-orange-400
        data-[state=active]:text-white
        data-[state=inactive]:bg-white/70 data-[state=inactive]:backdrop-blur-md data-[state=inactive]:shadow-md
        data-[state=inactive]:text-transparent data-[state=inactive]:bg-clip-text
        data-[state=inactive]:bg-gradient-to-r data-[state=inactive]:from-violet-500 data-[state=inactive]:to-orange-400">
            Overview
          </TabsTrigger>

          <TabsTrigger value="analytics"
            className="text-xs md:text-lg font-semibold rounded-full transition-all duration-300 px-2 md:px-4
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-orange-400
        data-[state=active]:text-white
        data-[state=inactive]:bg-white/70 data-[state=inactive]:backdrop-blur-md data-[state=inactive]:shadow-md
        data-[state=inactive]:text-transparent data-[state=inactive]:bg-clip-text
        data-[state=inactive]:bg-gradient-to-r data-[state=inactive]:from-violet-500 data-[state=inactive]:to-orange-400">
            Analytics
          </TabsTrigger>

          <TabsTrigger value="users"
            className="text-xs md:text-lg font-semibold rounded-full transition-all duration-300 px-2 md:px-4
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-orange-400
        data-[state=active]:text-white
        data-[state=inactive]:bg-white/70 data-[state=inactive]:backdrop-blur-md data-[state=inactive]:shadow-md
        data-[state=inactive]:text-transparent data-[state=inactive]:bg-clip-text
        data-[state=inactive]:bg-gradient-to-r data-[state=inactive]:from-violet-500 data-[state=inactive]:to-orange-400">
            Users
          </TabsTrigger>
        </TabsList>
      </motion.div>

      <AnimatePresence mode="sync">
        <TabsContent value="overview" className="space-y-4 md:space-y-6">
          <motion.div key="overview" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
            {/* Stats Cards - Mobile optimized */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
              { title: "Lost Items", value: 328, change: "+12%", icon: Package, color: "text-red-500" },
              { title: "Found Items", value: 279, change: "+8%", icon: CheckCircle, color: "text-green-500" },
              { title: "Pending", value: 42, change: "-5%", icon: Clock, color: "text-yellow-500" },
              { title: "Users", value: 1247, change: "+15%", icon: Users, color: "text-blue-500" },
              ].map((stat, index) => {
              const Icon = stat.icon
              return (
              <motion.div key={stat.title} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }} whileHover={{ y: -5, scale: 1.02 }}>
                <Card className="glass-effect border-2 border-purple-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-4">
                    <CardTitle className="text-xs md:text-sm font-medium">{stat.title}</CardTitle>
                    <motion.div animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                              }} transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 3,
                                delay: index * 0.5,
                              }}>
                      <Icon className={`h-3 w-3 md:h-4 md:w-4 ${stat.color}`} />
                    </motion.div>
                  </CardHeader>
                  <CardContent className="p-3 md:p-4 pt-0">
                    <motion.div className="text-lg md:text-2xl font-bold gradient-text" animate={{
                                scale: [1, 1.05, 1],
                              }} transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 4,
                                delay: index * 0.2,
                              }}>
                      {stat.value}
                    </motion.div>
                    <p className="text-xs text-muted-foreground">
                      <span className={ stat.change.startsWith("+") ? "text-green-500" : stat.change.startsWith("-")
                        ? "text-red-500" : "text-yellow-500" }>
                        {stat.change}
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              )
              })}
            </motion.div>

            {/* Recent Activity - Mobile optimized */}
            <motion.div variants={itemVariants}>
              <Card className="glass-effect border-transparent bg-white/40 mt-8">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="gradient-text text-base md:text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="space-y-3 md:space-y-4">
                    {[
                    {
                    user: "Sarah Chen",
                    action: "posted a lost iPhone 14 Pro",
                    time: "2 min ago",
                    type: "lost",
                    },
                    {
                    user: "Mike Johnson",
                    action: "claimed a blue water bottle",
                    time: "15 min ago",
                    type: "claim",
                    },
                    {
                    user: "Alex Rivera",
                    action: "posted a found MacBook Air",
                    time: "1 hour ago",
                    type: "found",
                    },
                    {
                    user: "Emma Davis",
                    action: "verified a successful return",
                    time: "2 hours ago",
                    type: "success",
                    },
                    ].map((activity, index) => (
                    <motion.div key={index}
                      className="flex items-center justify-between p-2 md:p-3 bg-white/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }} whileHover={{ x: 5, scale: 1.02 }}>
                      <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                        <Badge className={`text-xs ${ activity.type==="lost" ? "bg-red-100 text-red-800" :
                          activity.type==="found" ? "bg-blue-100 text-blue-800" : activity.type==="claim"
                          ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800" }`}>
                          {activity.type}
                        </Badge>
                        <span className="text-xs md:text-sm truncate">
                          <strong>{activity.user}</strong> {activity.action}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{activity.time}</span>
                    </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 md:space-y-6">
          <motion.div key="analytics" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
            {/* Charts - Mobile optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <motion.div variants={itemVariants}>
                <Card className="glass-effect border-2 border-purple-200">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="gradient-text text-base md:text-lg">Monthly Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <motion.div className="w-full h-64 md:h-80" initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statsData}>
                          <defs>
                            <linearGradient id="lostGradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#ec4899" />
                              <stop offset="50%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip content={({ active, payload, label })=> {
                            if (active && payload && payload.length) {
                            // Map names to colors
                            const colorMap: Record<string, string> = {
                              "Lost Items": "#EC4899", // pink
                              "Found Items": "#8B5CF6", // purple
                              "Returned Items": "#10B981" // green
                              }

                              return (
                              <div style={{
                    background: "white",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                  }}>
                                {/* Month title in gradient */}
                                <div style={{
                      fontWeight: "bold",
                      background: "linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: "4px"
                    }}>
                                  {label}
                                </div>

                                {/* Stats with matching colors */}
                                {payload.map((entry, index) => (
                                <div key={`item-${index}`} style={{
                        color: colorMap[entry.name] || "#374151",
                        fontWeight: 500
                      }}>
                                  {entry.name}: {entry.value}
                                </div>
                                ))}
                              </div>
                              )
                              }
                              return null
                              }}
                              />
                              <Bar dataKey="lost" fill="#EC4899" name="Lost Items" radius={[6, 6, 0, 0]} />
                              <Bar dataKey="found" fill="#8B5CF6" name="Found Items" radius={[6, 6, 0, 0]} />
                              <Bar dataKey="returned" fill="#10B981" name="Returned Items" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="glass-effect border-2 border-purple-200">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="gradient-text text-base md:text-lg">Items by Category</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <motion.div className="w-full h-64 md:h-80" initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value"
                            label={({ name, percent })=> `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                            {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>

                          <Tooltip content={({ active, payload })=> {
                            if (active && payload && payload.length) {
                            const { name, value, payload: dataPoint } = payload[0]
                            return (
                            <div style={{
                    background: "white",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                  }}>
                              {/* Category title in gradient */}
                              <div style={{
                      fontWeight: "bold",
                      background: "linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: "4px"
                    }}>
                                {name}
                              </div>

                              {/* Value in the same color as the slice */}
                              <div style={{
                      color: dataPoint.color,
                      fontWeight: 500
                    }}>
                                {value}
                              </div>
                            </div>
                            )
                            }
                            return null
                            }}
                            />
                        </PieChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Performance Metrics - Mobile optimized */}
            <motion.div variants={itemVariants}>
              <Card className="glass-effect border-2 mt-8 border-purple-200">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="gradient-text text-base md:text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {[
                    {
                    value: "85%",
                    label: "Success Rate",
                    change: "↑ 5% from last month",
                    color: "text-green-500",
                    },
                    {
                    value: "2.3 days",
                    label: "Avg. Resolution Time",
                    change: "↓ 0.5 days from last month",
                    color: "text-green-500",
                    },
                    {
                    value: "4.7/5",
                    label: "User Satisfaction",
                    change: "↑ 0.2 from last month",
                    color: "text-green-500",
                    },
                    ].map((metric, index) => (
                    <motion.div key={metric.label} className="text-center" initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}>
                      <motion.div className="text-2xl md:text-3xl font-bold gradient-text mb-2" animate={{
                                scale: [1, 1.1, 1],
                              }} transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 3,
                                delay: index * 0.5,
                              }}>
                        {metric.value}
                      </motion.div>
                      <div className="text-sm text-gray-600">{metric.label}</div>
                      <div className={`text-xs ${metric.color} mt-1`}>{metric.change}</div>
                    </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4 md:space-y-6">
          <motion.div key="users" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
            {/* Search and Filters - Mobile optimized */}
            <motion.div variants={itemVariants}>
              <Card className="glass-effect border-2 border-purple-200">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <div className="relative flex-1">
                      <motion.div animate={{
                              x: [0, 2, -2, 0],
                            }} transition={{
                              duration: 0.5,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 4,
                            }}>
                        <Search
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input placeholder="Search users..." value={searchQuery} onChange={(e)=>
                        setSearchQuery(e.target.value)}
                        className="pl-8 md:pl-10 border-purple-200 focus:border-purple-400 text-sm md:text-base"
                        />
                      </motion.div>
                    </div>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-full md:w-48 border-purple-200 text-sm md:text-base">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Users Table - Mobile optimized */}
            <motion.div variants={itemVariants}>
              <Card className="glass-effect border-2 border-purple-200">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="gradient-text text-base md:text-lg">User Management</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  {/* Mobile: Card layout */}
                  <div className="md:hidden space-y-3">
                    <AnimatePresence>
                      {filteredUsers.map((user, index) => (
                      <motion.div key={user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02 }}>
                        <Card className="border border-purple-200">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-sm">{user.name}</h4>
                                <p className="text-xs text-gray-600 truncate">{user.email}</p>
                              </div>
                              <div className="flex space-x-1">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={()=>
                                    handleEditUser(user)}
                                    >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={()=>
                                    handleDeleteUser(user)}
                                    >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-2">
                                <Badge className={ user.role==="Admin" ? "gradient-bg text-white"
                                  : "bg-blue-100 text-blue-800" }>
                                  {user.role}
                                </Badge>
                                <Badge className={ user.status==="Active" ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800" }>
                                  {user.status}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <div>{user.itemsPosted} items</div>
                                <div className="gradient-text font-semibold">{user.reputation}★</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Desktop: Table layout */}
                  <div className="hidden md:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Items Posted</TableHead>
                          <TableHead>Reputation</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence>
                          {filteredUsers.map((user, index) => (
                          <motion.tr key={user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.1 }}
                            whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge className={ user.role==="Admin" ? "gradient-bg text-white"
                                : "bg-blue-100 text-blue-800" }>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={ user.status==="Active" ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800" }>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.itemsPosted}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className="gradient-text font-semibold">{user.reputation}</span>
                                <span className="text-yellow-400 ml-1">★</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={()=>
                                    handleEditUser(user)}
                                    >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-700" onClick={()=>
                                    handleDeleteUser(user)}
                                    >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </div>
                            </TableCell>
                          </motion.tr>
                          ))}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </AnimatePresence>
    </Tabs>
  </motion.div>

  {/* Modals */}
  <EditUserModal open={showEditModal} onOpenChange={setShowEditModal} user={editingUser} onSave={handleSaveUser} />
  <DeleteUserModal open={showDeleteModal} onOpenChange={setShowDeleteModal} user={deletingUser}
    onDelete={handleConfirmDelete} />
</MainLayout>
)
}