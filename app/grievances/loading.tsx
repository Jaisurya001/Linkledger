"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function GrievancesLoading() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{
            rotate: 360,
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            rotate: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            backgroundPosition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
          className="mx-auto h-12 w-12 rounded-full gradient-bg shadow-md p-2 flex items-center justify-center"
        >
          <Loader2 className="h-8 w-8 text-white" />
        </motion.div>
        <motion.h2
          className="mt-4 text-xl font-medium gradient-text"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          Loading Grievances...
        </motion.h2>
        <motion.p
          className="mt-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Please wait while we fetch the latest data
        </motion.p>
      </motion.div>
    </div>
  )
}
