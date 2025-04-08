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

  const loveLetterText = `Do you remember the very beginning? How we hated each other in impact .Honestly, I never thought that the guy I fought with over a few extra marks would become my person, my biggest supporter, and the one who makes my heart feel the safest.I still smile thinking about your very first text on snap—“Hey, I unfriended you by mistake.” That one line led to hours of talking, laughing, flirting and suddenly… I was looking forward to every snap, every message. We talked till midnight had the best time .Something changed in me,slowly fell in love with you..Then came the trip. That one magical trip that somehow brought us even closer. And after 10th ended, it all had completely changed . We became partners in crime, in love, in every little moment. And destiny? It played it’s part beautifully by putting us in the same college. From classes to concerts, from study sessions to silly dates—everything with you feels like a memory I want to relive forever.We’ve laughed till our stomachs hurt, cried a little (mostly me), fought over the silliest things, and learned how to be better for each other. You’ve seen me with my glasses on, at my worst moods, through my overthinking storms—and yet, you’ve never left.You’re not just my boyfriend, Vandit. You’re the most special part of my life. You’re my home, my safe space, my best friend, and the one I want to create a million more memories with.Happy Birthday, baby. I love you endlessly.Your Lilu🥰💋`

  useEffect(() => {
    // Initialize audio
    const voiceMessage = new Audio("/music/Birthday.mp3")
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

            <div className="font-serif-lg whitespace-pre-line text-gray-800">
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

