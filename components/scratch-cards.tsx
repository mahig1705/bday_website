"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Gift, RefreshCw, Heart } from "lucide-react"

// Sample surprise gifts - replace with your own personalized gifts
const surpriseGifts = [
  {
    id: 1,
    title: "Romantic Dinner",
    description: "I'll cook your favorite meal for a special date night at home.",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-pink-400 to-red-400",
  },
  {
    id: 2,
    title: "Movie Marathon",
    description: "A cozy day watching all your favorite movies with unlimited snacks.",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-purple-400 to-indigo-400",
  },
  {
    id: 3,
    title: "Massage Voucher",
    description: "Redeem for a relaxing 30-minute massage from yours truly.",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: 4,
    title: "Adventure Day",
    description: "I'll plan a surprise adventure day doing something new together.",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-green-400 to-emerald-400",
  },
  {
    id: 5,
    title: "Breakfast in Bed",
    description: "Wake up to your favorite breakfast served in bed with love.",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-yellow-400 to-amber-400",
  },
  {
    id: 6,
    title: "Stargazing Night",
    description: "A romantic evening under the stars with blankets and hot chocolate.",
    image: "/placeholder.svg?height=300&width=300",
    color: "from-orange-400 to-red-400",
  },
]

export default function ScratchCards() {
  const [revealedCards, setRevealedCards] = useState<number[]>([])
  const [currentlyRevealing, setCurrentlyRevealing] = useState<number | null>(null)
  const [isScratching, setIsScratching] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [revealedGifts, setRevealedGifts] = useState<typeof surpriseGifts>([])

  const resetCards = () => {
    setRevealedCards([])
    setRevealedGifts([])
    setCurrentlyRevealing(null)
  }

  const handleCardClick = (cardId: number) => {
    if (revealedCards.includes(cardId) || currentlyRevealing !== null) return

    setCurrentlyRevealing(cardId)
    setIsScratching(true)

    // Simulate scratching animation
    setTimeout(() => {
      setRevealedCards([...revealedCards, cardId])
      setIsScratching(false)
      setCurrentlyRevealing(null)

      // Add to revealed gifts
      const gift = surpriseGifts.find((g) => g.id === cardId)
      if (gift) {
        setRevealedGifts([...revealedGifts, gift])
      }
    }, 1500)
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Surprise Scratch Cards</h2>
        <p className="text-lg text-purple-700">Scratch to reveal special gifts and surprises!</p>
      </motion.div>

      <div className="w-full max-w-5xl mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {surpriseGifts.map((gift) => (
            <motion.div
              key={gift.id}
              className="relative cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(gift.id)}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                {/* Revealed card content */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gift.color} flex flex-col items-center justify-center p-4 text-center text-white`}
                >
                  <Gift className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{gift.title}</h3>
                  <p className="text-sm">{gift.description}</p>
                </div>

                {/* Heart-shaped scratch overlay */}
                <AnimatePresence>
                  {!revealedCards.includes(gift.id) && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-white"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      animate={
                        currentlyRevealing === gift.id && isScratching
                          ? {
                              opacity: [1, 0.8, 0.6, 0.4, 0.2, 0],
                              scale: [1, 0.98, 0.96, 0.94, 0.92, 0.9],
                            }
                          : { opacity: 1 }
                      }
                      transition={{ duration: 1.5 }}
                    >
                      <div className="relative w-full h-full">
                        <svg
                          viewBox="0 0 100 100"
                          className="absolute inset-0 w-full h-full text-pink-500"
                          fill="currentColor"
                        >
                          <path d="M50,90 C25,65 0,50 0,25 C0,10 10,0 25,0 C35,0 45,5 50,15 C55,5 65,0 75,0 C90,0 100,10 100,25 C100,50 75,65 50,90 Z" />
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-white font-bold text-lg z-10">Scratch Me!</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {revealedCards.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button onClick={resetCards} className="bg-pink-500 hover:bg-pink-600 text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset All Cards
            </Button>
          </div>
        )}
      </div>

      {revealedGifts.length > 0 && (
        <div className="w-full max-w-3xl">
          <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">Your Revealed Gifts</h3>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {revealedGifts.map((gift) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-pink-50"
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${gift.color} flex items-center justify-center`}
                    >
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{gift.title}</h4>
                    <p className="text-sm text-gray-600">{gift.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

