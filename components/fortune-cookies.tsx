"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RefreshCw, Cookie } from "lucide-react"
import Image from "next/image"

// Sample fortune messages - replace with your own personalized messages
const fortuneMessages = [
  "Your smile will brighten someone's day today... mine!",
  "A lifetime of happiness awaits you... with me by your side.",
  "The love of your life is thinking about you right now... that's me!",
  "Your kindness is what made me fall in love with you.",
  "Our love story is my favorite fairytale.",
  "The stars aligned when we met, and they continue to shine on our love.",
  "Your heart knows the way, and I'm grateful it led you to me.",
  "The best is yet to come in our journey together.",
  "Every moment with you feels like magic.",
  "You are the missing piece that makes my life complete.",
  "Our love grows stronger with each passing day.",
  "The universe conspired to bring us together, and I'm forever thankful.",
  "Your love is the greatest gift I've ever received.",
  "In a sea of people, my heart recognized yours.",
  "The way you love me makes every day feel special.",
  "Our love story is my favorite to tell.",
  "You are my today and all of my tomorrows.",
  "The best thing I ever did was fall in love with you.",
  "Every love story is beautiful, but ours is my favorite.",
  "You're not just my love, you're my best friend and my home.",
]

export default function FortuneCookies() {
  const [cookies, setCookies] = useState(generateCookies())
  const [openedCookie, setOpenedCookie] = useState(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [revealedFortunes, setRevealedFortunes] = useState([])

  function generateCookies() {
    // Generate 6 random cookies
    return Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      message: fortuneMessages[Math.floor(Math.random() * fortuneMessages.length)],
      rotation: Math.random() * 30 - 15,
      position: {
        x: Math.random() * 0.6 - 0.3, // -30% to 30%
        y: Math.random() * 0.6 - 0.3, // -30% to 30%
      },
    }))
  }

  const openCookie = (cookie) => {
    if (isRevealing) return

    setIsRevealing(true)
    setOpenedCookie(cookie)

    // No audio playback - removed to prevent errors

    setTimeout(() => {
      setIsRevealing(false)
      setRevealedFortunes([...revealedFortunes, cookie.message])

      // Remove the opened cookie from the tray
      setCookies(cookies.filter((c) => c.id !== cookie.id))

      // If all cookies are opened, generate new ones after a delay
      if (cookies.length === 1) {
        setTimeout(() => {
          setCookies(generateCookies())
        }, 2000)
      }
    }, 1500)
  }

  const resetCookies = () => {
    setOpenedCookie(null)
    setRevealedFortunes([])
    setCookies(generateCookies())
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Love Fortune Cookies</h2>
        <p className="text-lg text-purple-700">Crack open a cookie to reveal a sweet message</p>
      </motion.div>

      <div className="w-full max-w-4xl mb-8">
        <motion.div
          className="relative bg-amber-50 rounded-xl p-8 shadow-inner min-h-[300px] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {cookies.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <Cookie className="w-16 h-16 mx-auto text-amber-300 mb-4" />
              <p className="text-amber-800 mb-4">You've opened all the fortune cookies!</p>
              <Button onClick={resetCookies} className="bg-amber-500 hover:bg-amber-600 text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                Get New Cookies
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
              {cookies.map((cookie) => (
                <motion.div
                  key={cookie.id}
                  className="flex justify-center items-center"
                  initial={{
                    rotate: cookie.rotation,
                    x: `${cookie.position.x * 100}%`,
                    y: `${cookie.position.y * 100}%`,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.div
                    className="w-24 h-24 md:w-32 md:h-32 cursor-pointer relative"
                    onClick={() => openCookie(cookie)}
                  >
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Fortune Cookie"
                      fill
                      className="object-contain"
                    />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Cookie className="w-full h-full text-amber-300" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {openedCookie && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: isRevealing ? [1, 1.2, 0.9, 1] : 1,
              y: 0,
              transition: {
                duration: isRevealing ? 1 : 0.3,
                times: isRevealing ? [0, 0.3, 0.6, 1] : undefined,
              },
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center mb-8"
          >
            <div className="mb-4">
              <motion.div
                animate={{
                  rotateY: isRevealing ? [0, 180, 360] : 0,
                  scale: isRevealing ? [1, 1.2, 0.9, 1] : 1,
                }}
                transition={{
                  duration: isRevealing ? 1.5 : 0.3,
                  times: isRevealing ? [0, 0.3, 0.6, 1] : undefined,
                }}
                className="inline-block"
              >
                <Cookie className="w-12 h-12 text-amber-400 mx-auto" />
              </motion.div>
            </div>

            <AnimatePresence>
              {!isRevealing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-amber-800 italic font-handwriting text-lg">"{openedCookie.message}"</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {revealedFortunes.length > 0 && (
        <div className="w-full max-w-2xl">
          <h3 className="text-xl font-medium text-amber-700 mb-4 text-center">Your Fortune History</h3>

          <div className="space-y-2">
            {revealedFortunes.map((fortune, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-amber-300"
              >
                <p className="text-gray-700 italic text-sm">"{fortune}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

