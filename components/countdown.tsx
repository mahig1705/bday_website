"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Countdown() {
  // Set the target date - replace with your actual date
  const targetDate = new Date("2023-12-31T00:00:00")

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Special Surprise Countdown</h2>
        <p className="text-lg text-purple-700">Something special is coming your way...</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-3xl">
        <CountdownUnit value={timeLeft.days} label="Days" />
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <CountdownUnit value={timeLeft.minutes} label="Minutes" />
        <CountdownUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      <motion.p
        className="mt-12 text-xl text-center text-purple-700 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        See you in person soon, my love! I have a special surprise planned just for you.
      </motion.p>
    </div>
  )
}

function CountdownUnit({ value, label }) {
  return (
    <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
      <motion.div
        className="w-full aspect-square bg-white rounded-lg shadow-lg flex items-center justify-center mb-2"
        animate={{
          boxShadow: [
            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <motion.span
          className="text-4xl md:text-5xl font-bold text-pink-600"
          key={value}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.span>
      </motion.div>
      <span className="text-sm md:text-base font-medium text-purple-700">{label}</span>
    </motion.div>
  )
}

