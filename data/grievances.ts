export interface Grievance {
  id: string
  title: string
  category: string
  description: string
  author: string
  studentId?: string
  authorAvatar?: string
  isAnonymous: boolean
  isPublic: boolean
  status: "Submitted" | "Reviewed" | "Resolved"
  upvotes: number
  upvotedBy: string[]
  comments: Comment[]
  attachments: Attachment[]
  createdAt: string
  updatedAt: string
}

export function addGrievance(data: {
  title: string
  description: string
  category: string
  isAnonymous: boolean
  isPublic: boolean
  attachments?: Attachment[]
}) {
  const authorName = data.isAnonymous ? "Anonymous" : "Student User"
  const now = new Date().toISOString()

  const newEntry: Grievance = {
    id: `g${Date.now()}`,
    title: data.title,
    category: data.category,
    description: data.description,
    author: authorName,
    studentId: data.isAnonymous ? undefined : "STU-DEMO",
    authorAvatar: data.isAnonymous ? undefined : "/student-avatar.png",
    isAnonymous: data.isAnonymous,
    isPublic: data.isPublic,
    status: "Submitted",
    upvotes: 0,
    upvotedBy: [],
    comments: [],
    attachments: data.attachments || [],
    createdAt: now,
    updatedAt: now,
  }

  grievances.push(newEntry)

  if (typeof window !== "undefined") {
    localStorage.setItem("grievances", JSON.stringify(grievances))
  }

  return newEntry
}



export interface Comment {
  id: string
  author: string
  authorType: "student" | "admin" | "faculty"
  authorAvatar?: string
  text: string
  isAdmin?: boolean
  isPinned?: boolean
  createdAt: string
  replies?: Comment[]
}

export interface Attachment {
  id: string
  name: string
  type: "image" | "pdf" | "doc" | "other"
  url: string
  size: string
}

// Mock data
export const grievances: Grievance[] = [
  {
    id: "g1",
    title: "WiFi Issues in Hostel Block C",
    category: "IT & Infrastructure",
    description:
      "The WiFi in Block C has been extremely slow and unstable for the past week. It disconnects frequently during evening hours (6-10pm) which is affecting our ability to attend online classes and submit assignments on time. Multiple students have reported the same issue.",
    author: "Alex Johnson",
    studentId: "STU23405",
    authorAvatar: "/student-male-studying.png",
    isAnonymous: false,
    isPublic: true,
    status: "Reviewed",
    upvotes: 87,
    upvotedBy: ["user1", "user2", "user3"],
    comments: [
      {
        id: "c1",
        author: "Taylor Smith",
        authorType: "student",
        authorAvatar: "/student-female-indian.jpg",
        text: "I'm facing the same issue. It's particularly bad on the 3rd floor.",
        createdAt: "2023-09-28T14:23:00Z",
        isAdmin: false,
      },
      {
        id: "c2",
        author: "IT Department",
        authorType: "admin",
        text: "Thank you for reporting this issue. We're aware of the network congestion problem in Block C and have ordered additional access points. The installation is scheduled for this weekend. In the meantime, we've optimized the existing network to improve performance.",
        createdAt: "2023-09-29T10:15:00Z",
        isAdmin: true,
        isPinned: true,
      },
      {
        id: "c3",
        author: "Miguel Rivera",
        authorType: "student",
        text: "Can we get an update on this? It's been three days and the situation is still the same.",
        createdAt: "2023-10-01T18:45:00Z",
        isAdmin: false,
        replies: [
          {
            id: "c3-r1",
            author: "IT Department",
            authorType: "admin",
            text: "The installation has been delayed due to supply chain issues. We expect the equipment to arrive by Tuesday. In the meantime, we've set up a temporary solution in the common areas with extended range.",
            createdAt: "2023-10-01T19:30:00Z",
            isAdmin: true,
          },
        ],
      },
    ],
    attachments: [
      {
        id: "a1",
        name: "wifi-speed-test.jpg",
        type: "image",
        url: "/internet-speed-test-result.jpg",
        size: "1.2 MB",
      },
    ],
    createdAt: "2023-09-27T09:15:00Z",
    updatedAt: "2023-09-29T10:15:00Z",
  },
  {
    id: "g2",
    title: "Need More Vegetarian Options in Cafeteria",
    category: "Cafeteria & Food",
    description:
      "The cafeteria consistently has limited vegetarian options, and they often run out before lunch period ends. Many international students and those with dietary restrictions struggle to find suitable meals. We need more diverse and abundant vegetarian offerings.",
    author: "Anonymous",
    isAnonymous: true,
    isPublic: true,
    status: "Resolved",
    upvotes: 125,
    upvotedBy: ["user4", "user5"],
    comments: [
      {
        id: "c4",
        author: "Priya Patel",
        authorType: "student",
        authorAvatar: "/student-female-indian.jpg",
        text: "Absolutely agree! As a vegetarian, I often end up eating just salads because everything else contains meat.",
        createdAt: "2023-09-15T12:30:00Z",
        isAdmin: false,
      },
      {
        id: "c5",
        author: "Cafeteria Services",
        authorType: "admin",
        text: "We appreciate your feedback. Starting next week, we'll be introducing 3 new vegetarian options daily and ensuring they're available throughout the lunch period. We're also working on clearly labeling all food items with dietary information.",
        createdAt: "2023-09-16T09:45:00Z",
        isAdmin: true,
        isPinned: true,
      },
    ],
    attachments: [
      {
        id: "a2",
        name: "cafeteria-menu.jpg",
        type: "image",
        url: "/cafeteria-food.jpg",
        size: "950 KB",
      },
    ],
    createdAt: "2023-09-15T10:05:00Z",
    updatedAt: "2023-09-20T14:30:00Z",
  },
  {
    id: "g3",
    title: "Library Hours Extension During Exam Period",
    category: "Academic & Library",
    description:
      "The current library closing time of 9 PM is too early during exam weeks. Students need extended access to study spaces, especially when dormitories can be noisy. Many universities keep their libraries open 24/7 during final exams period.",
    author: "Sarah Chen",
    studentId: "STU24981",
    authorAvatar: "/diverse-female-student.png",
    isAnonymous: false,
    isPublic: true,
    status: "Submitted",
    upvotes: 214,
    upvotedBy: ["user6", "user7", "user8", "user9"],
    comments: [
      {
        id: "c6",
        author: "James Wilson",
        authorType: "student",
        authorAvatar: "/student-male-athlete.jpg",
        text: "This would be incredibly helpful. My roommate has different study hours and it's hard to concentrate in the dorm.",
        createdAt: "2023-10-05T16:20:00Z",
        isAdmin: false,
      },
      {
        id: "c7",
        author: "Student Council",
        authorType: "student",
        text: "We've started a petition to support this request. Already gathered 500+ signatures in 2 days!",
        createdAt: "2023-10-06T11:15:00Z",
        isAdmin: false,
      },
    ],
    attachments: [],
    createdAt: "2023-10-05T14:30:00Z",
    updatedAt: "2023-10-05T14:30:00Z",
  },
  {
    id: "g4",
    title: "Need More EV Charging Stations in Parking Lot",
    category: "Transportation & Parking",
    description:
      "With the increasing number of electric vehicles on campus, the current 3 charging stations are insufficient. There's often a queue and people have to wait hours for a spot. We should convert at least 10 more parking spaces to EV charging stations.",
    author: "David Chang",
    studentId: "STU21753",
    authorAvatar: "/student-male-indian.jpg",
    isAnonymous: false,
    isPublic: true,
    status: "Submitted",
    upvotes: 68,
    upvotedBy: ["user10"],
    comments: [
      {
        id: "c8",
        author: "Emma Rodriguez",
        authorType: "faculty",
        text: "As a faculty member with an EV, I support this proposal. The university's sustainability goals should align with providing adequate infrastructure.",
        createdAt: "2023-10-10T08:45:00Z",
        isAdmin: false,
      },
    ],
    attachments: [],
    createdAt: "2023-10-09T16:50:00Z",
    updatedAt: "2023-10-09T16:50:00Z",
  },
  {
    id: "g5",
    title: "Mental Health Resources Inadequate",
    category: "Health & Wellness",
    description:
      "The waiting time to see a counselor at the student health center is currently 3-4 weeks. This is too long for students experiencing mental health crises. We need more counselors and possibly an emergency mental health service.",
    author: "Anonymous",
    isAnonymous: true,
    isPublic: false,
    status: "Reviewed",
    upvotes: 0, // Private grievance
    upvotedBy: [],
    comments: [
      {
        id: "c9",
        author: "Student Health Services",
        authorType: "admin",
        text: "We understand your concern and are actively working to improve our mental health resources. We've hired two additional counselors starting next month and are implementing a triage system to prioritize urgent cases. If you're experiencing a crisis, please use our 24/7 crisis hotline at 555-HELP.",
        createdAt: "2023-10-03T11:20:00Z",
        isAdmin: true,
        isPinned: true,
      },
    ],
    attachments: [],
    createdAt: "2023-10-02T19:15:00Z",
    updatedAt: "2023-10-03T11:20:00Z",
  },
  {
    id: "g6",
    title: "Sports Facilities Need Renovation",
    category: "Sports & Recreation",
    description:
      "The basketball courts have damaged flooring and two of the six hoops are broken. The gym equipment is outdated compared to other universities. As students who pay recreation fees, we deserve better maintained facilities.",
    author: "Marcus Johnson",
    studentId: "STU23091",
    authorAvatar: "/student-male-athlete.jpg",
    isAnonymous: false,
    isPublic: true,
    status: "Reviewed",
    upvotes: 145,
    upvotedBy: ["user11", "user12"],
    comments: [
      {
        id: "c10",
        author: "Athletics Department",
        authorType: "admin",
        text: "Thank you for bringing this to our attention. We're planning comprehensive renovations for the next semester break. The budget has been approved for new gym equipment and court resurfacing. In the meantime, we're repairing the broken hoops this week.",
        createdAt: "2023-09-22T15:40:00Z",
        isAdmin: true,
        isPinned: true,
      },
    ],
    attachments: [],
    createdAt: "2023-09-20T08:30:00Z",
    updatedAt: "2023-09-22T15:40:00Z",
  },
  {
    id: "g7",
    title: "Dormitory Laundry Machines Out of Order",
    category: "Housing & Facilities",
    description:
      "4 out of 6 washing machines in West Hall have been out of order for over two weeks. The remaining machines are always occupied with long waiting times. This is causing significant inconvenience to residents.",
    author: "Lisa Wang",
    studentId: "STU25467",
    isAnonymous: false,
    isPublic: true,
    status: "Resolved",
    upvotes: 89,
    upvotedBy: ["user13"],
    comments: [
      {
        id: "c11",
        author: "Housing Services",
        authorType: "admin",
        text: "The repair service has been completed today. All machines should now be operational. We're also implementing a new maintenance schedule to prevent future issues. Thank you for your patience.",
        createdAt: "2023-10-12T14:15:00Z",
        isAdmin: true,
        isPinned: true,
      },
      {
        id: "c12",
        author: "Lisa Wang",
        authorType: "student",
        text: "Confirmed! All machines are working now. Thanks for the quick resolution.",
        createdAt: "2023-10-12T18:30:00Z",
        isAdmin: false,
      },
    ],
    attachments: [],
    createdAt: "2023-10-10T10:45:00Z",
    updatedAt: "2023-10-12T14:15:00Z",
  },
  {
    id: "g8",
    title: "Need More Group Study Rooms",
    category: "Academic & Library",
    description:
      "The library currently has only 8 group study rooms, which are constantly booked. With increasing group projects in many courses, we need more dedicated spaces for collaborative work. Could some of the unused administrative spaces be converted?",
    author: "Omar Al-Farsi",
    studentId: "STU26104",
    isAnonymous: false,
    isPublic: true,
    status: "Submitted",
    upvotes: 76,
    upvotedBy: [],
    comments: [],
    attachments: [],
    createdAt: "2023-10-15T13:20:00Z",
    updatedAt: "2023-10-15T13:20:00Z",
  },
]

// Categories for filtering
export const grievanceCategories = [
  "IT & Infrastructure",
  "Cafeteria & Food",
  "Academic & Library",
  "Transportation & Parking",
  "Health & Wellness",
  "Sports & Recreation",
  "Housing & Facilities",
  "Events & Activities",
  "Administration",
  "Other",
]

// Data for charts
export const categoryStats = [
  { name: "IT & Infrastructure", count: 12 },
  { name: "Cafeteria & Food", count: 9 },
  { name: "Academic & Library", count: 15 },
  { name: "Transportation & Parking", count: 8 },
  { name: "Health & Wellness", count: 6 },
  { name: "Sports & Recreation", count: 7 },
  { name: "Housing & Facilities", count: 14 },
  { name: "Events & Activities", count: 4 },
  { name: "Administration", count: 5 },
  { name: "Other", count: 3 },
]

export const statusStats = [
  { name: "Submitted", count: 24 },
  { name: "Reviewed", count: 31 },
  { name: "Resolved", count: 28 },
]

export const weeklyStats = [
  { date: "Oct 1", count: 4 },
  { date: "Oct 2", count: 6 },
  { date: "Oct 3", count: 2 },
  { date: "Oct 4", count: 8 },
  { date: "Oct 5", count: 5 },
  { date: "Oct 6", count: 3 },
  { date: "Oct 7", count: 7 },
]
