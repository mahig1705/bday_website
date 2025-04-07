"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VirtualHug() {
  const [isHugging, setIsHugging] = useState(false)
  const [hugCount, setHugCount] = useState(0)
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    if (isHugging) {
      const interval = setInterval(() => {
        setHugCount((prev) => prev + 1)
        addHeart()

        // Vibration API if available
        if (navigator.vibrate) {
          navigator.vibrate(100)
        }
      }, 300)

      return () => clearInterval(interval)
    }
  }, [isHugging])

  const startHug = () => {
    setIsHugging(true)
  }

  const endHug = () => {
    setIsHugging(false)
  }

  const addHeart = () => {
    const newHeart = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // 10% to 90% of container width
      y: Math.random() * 80 + 10, // 10% to 90% of container height
      size: Math.random() * 30 + 20, // 20px to 50px
      duration: Math.random() * 2 + 2, // 2-4 seconds
    }

    setHearts((prev) => [...prev, newHeart])

    // Remove heart after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id))
    }, newHeart.duration * 1000)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Virtual Hug</h2>
        <p className="text-lg text-purple-700">
          {isHugging ? `Sending you ${hugCount} hugs and counting...` : "Press and hold for a virtual hug"}
        </p>
      </motion.div>

      <div className="relative w-full max-w-md h-64 mb-8">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            initial={{
              x: `${heart.x}%`,
              y: `${heart.y}%`,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: [0, 1, 0],
              y: `${heart.y - 20}%`,
            }}
            transition={{ duration: heart.duration }}
          >
            <Heart className="text-pink-500 fill-pink-500" style={{ width: heart.size, height: heart.size }} />
          </motion.div>
        ))}

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={
            isHugging
              ? {
                  scale: [1, 1.2, 1],
                }
              : {}
          }
          transition={{
            duration: 0.5,
            repeat: isHugging ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        >
          <motion.div whileHover={{ scale: 1.1 }} className="relative">
            <img
              src="/images/v40.jpg"
              alt="Hug"
              className="w-40 h-40 rounded-full object-cover"
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-pink-500"
              animate={
                isHugging
                  ? {
                      boxShadow: ["0 0 0 0 rgba(236, 72, 153, 0.7)", "0 0 0 20px rgba(236, 72, 153, 0)"],
                    }
                  : {}
              }
              transition={{
                duration: 1,
                repeat: isHugging ? Number.POSITIVE_INFINITY : 0,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      <Button
        onMouseDown={startHug}
        onMouseUp={endHug}
        onMouseLeave={endHug}
        onTouchStart={startHug}
        onTouchEnd={endHug}
        className={`${
          isHugging ? "bg-pink-600 scale-110" : "bg-pink-500 hover:bg-pink-600"
        } text-white px-8 py-6 rounded-full text-xl font-semibold shadow-lg transition-all duration-200`}
      >
        {isHugging ? "Feeling the Love!" : "Press & Hold for a Hug"}
      </Button>
    </div>
  )
}

