"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/use-window-size"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [showConfetti, setShowConfetti] = useState(true)
  const { width, height } = useWindowSize()

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 to-purple-200">
      {showConfetti && (
        <Confetti width={width} height={height} recycle={true} numberOfPieces={200} gravity={0.05} />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-4 z-10"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-pink-600 mb-6"
          animate={{
            textShadow: ["0 0 5px #ff69b4", "0 0 20px #ff69b4", "0 0 5px #ff69b4"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          Happy Birthday, My Love ❤️
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-purple-700 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A special journey through our memories awaits you...
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/journey">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 rounded-full text-xl font-semibold shadow-lg">
              Click to Start Our Journey
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <div className="absolute inset-0 bg-[url('/images/hearts-bg.svg')] bg-repeat opacity-10"></div>
      </motion.div>
    </main>
  )
}
