"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Gift, Heart, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const loveLetterText = `My Dearest Love,

Happy Birthday to the most amazing person in my life! Today is all about celebrating you - your smile, your kindness, your love that makes every day brighter.

From our first date to this moment, you've filled my life with joy and laughter. I cherish every memory we've created together, and I look forward to making countless more.

You are my best friend, my confidant, my partner in all of life's adventures. Your strength inspires me, your humor delights me, and your love completes me.

On your special day, I want you to know how deeply loved you are. You deserve all the happiness in the world, and I promise to do everything I can to bring that happiness to you every day.

Forever Yours,
With All My Love ❤️`

  useEffect(() => {
    // Initialize audio
    const voiceMessage = new Audio("/audio/birthday-message.mp3")
    setAudio(voiceMessage)

    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen && !isComplete) {
      let i = 0
      const interval = setInterval(() => {
        if (i <= loveLetterText.length) {
          setDisplayText(loveLetterText.slice(0, i))
          i++
        } else {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, 50) // Speed of typing animation

      return () => clearInterval(interval)
    }
  }, [isOpen, isComplete])

  const handleGiftClick = () => {
    setIsOpen(true)
  }

  const toggleAudio = () => {
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-64 h-64 mx-auto mb-8 cursor-pointer"
            onClick={handleGiftClick}
          >
            <div className="absolute inset-0 bg-pink-500 rounded-lg shadow-lg flex items-center justify-center">
              <Gift className="w-32 h-32 text-white" />
            </div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <div className="w-full h-full bg-white opacity-20 rounded-lg" />
            </motion.div>
          </motion.div>

          <h2 className="text-3xl font-bold text-pink-600 mb-4">Your Special Gift</h2>
          <p className="text-lg text-purple-700">Tap to open your love letter</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-pink-50 p-8 rounded-lg shadow-lg border-2 border-pink-200 relative">
            <div className="absolute -top-3 -right-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
              </motion.div>
            </div>

            <div className="font-handwriting text-lg whitespace-pre-line text-gray-800">
              {displayText}
              {!isComplete && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                >
                  |
                </motion.span>
              )}
            </div>

            {isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex justify-center"
              >
                <Button
                  onClick={toggleAudio}
                  className="bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause Voice Message
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Listen to Voice Message
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

