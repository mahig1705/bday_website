"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause, SkipBack, SkipForward } from "lucide-react"
import Image from "next/image"

// Sample memories - replace with your actual memories
const memories = [
  {
    id: 1,
    title: "Our First Date",
    description:
      "Remember that nervous excitement? The coffee shop where we talked for hours and didn't want the night to end.",
    frames: [
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "You were 10 minutes early, I was 5 minutes late.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "You ordered a cappuccino, I got a latte.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "We discovered we both love the same obscure band.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "The cafe was closing, but we weren't ready to say goodbye.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "A goodnight kiss that felt like the beginning of something special.",
      },
    ],
  },
  {
    id: 2,
    title: "Our Weekend Getaway",
    description:
      "That spontaneous trip to the mountains where we got lost, found a hidden waterfall, and fell even deeper in love.",
    frames: [
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "Early morning start, coffee and playlists for the road.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "The GPS failed us, but we found adventure instead.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "Hiking through the forest, holding hands.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "The waterfall was our reward - breathtaking and just for us.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "Stargazing and whispered dreams under the night sky.",
      },
    ],
  },
  {
    id: 3,
    title: "The Day We Moved In Together",
    description:
      "Boxes everywhere, takeout dinner on the floor, and the excitement of starting our life together under one roof.",
    frames: [
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "The moving truck arrived at 8 AM sharp.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "Your face when you realized how many books I own.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "Our first argument - where to put the couch.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "Pizza and champagne - our first meal at home.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        caption: "Falling asleep together, exhausted but happy in OUR home.",
      },
    ],
  },
]

export default function MemoryReplay() {
  const [selectedMemory, setSelectedMemory] = useState(memories[0])
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    let interval

    if (isPlaying) {
      interval = setInterval(() => {
        nextFrame()
      }, 3000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentFrameIndex, selectedMemory])

  useEffect(() => {
    // Reset to first frame when memory changes
    setCurrentFrameIndex(0)
    setIsPlaying(false)
  }, [selectedMemory])

  const selectMemory = (memory) => {
    setSelectedMemory(memory)
  }

  const nextFrame = () => {
    if (isTransitioning) return

    setIsTransitioning(true)

    setTimeout(() => {
      if (currentFrameIndex < selectedMemory.frames.length - 1) {
        setCurrentFrameIndex(currentFrameIndex + 1)
      } else {
        setIsPlaying(false)
        // Optional: loop back to beginning
        // setCurrentFrameIndex(0)
      }
      setIsTransitioning(false)
    }, 500)
  }

  const prevFrame = () => {
    if (isTransitioning || currentFrameIndex === 0) return

    setIsTransitioning(true)

    setTimeout(() => {
      setCurrentFrameIndex(currentFrameIndex - 1)
      setIsTransitioning(false)
    }, 500)
  }

  const togglePlayPause = () => {
    if (currentFrameIndex === selectedMemory.frames.length - 1) {
      // If at the end, restart from beginning
      setCurrentFrameIndex(0)
      setIsPlaying(true)
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  const restartMemory = () => {
    setCurrentFrameIndex(0)
    setIsPlaying(true)
  }

  const skipToEnd = () => {
    setCurrentFrameIndex(selectedMemory.frames.length - 1)
    setIsPlaying(false)
  }

  const currentFrame = selectedMemory.frames[currentFrameIndex]

  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Replay Our Memories</h2>
        <p className="text-lg text-purple-700">Relive our special moments together</p>
      </motion.div>

      <div className="w-full max-w-5xl">
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {memories.map((memory) => (
            <Button
              key={memory.id}
              variant={selectedMemory.id === memory.id ? "default" : "outline"}
              onClick={() => selectMemory(memory)}
              className={selectedMemory.id === memory.id ? "bg-pink-500 hover:bg-pink-600" : ""}
            >
              {memory.title}
            </Button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-purple-700 mb-2">{selectedMemory.title}</h3>
            <p className="text-gray-600 mb-4">{selectedMemory.description}</p>
          </div>

          <div className="relative aspect-video bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFrameIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentFrame.image || "/placeholder.svg"}
                  alt={currentFrame.caption}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-center text-lg font-medium">{currentFrame.caption}</p>
            </div>

            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevFrame}
                disabled={currentFrameIndex === 0 || isTransitioning}
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 pointer-events-auto"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextFrame}
                disabled={currentFrameIndex === selectedMemory.frames.length - 1 || isTransitioning}
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 pointer-events-auto"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>

          <div className="p-4 flex items-center justify-center gap-4">
            <Button variant="ghost" size="icon" onClick={restartMemory} className="text-gray-600">
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={togglePlayPause}
              className="bg-pink-500 hover:bg-pink-600 h-12 w-12 rounded-full"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={skipToEnd} className="text-gray-600">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          <div className="px-4 pb-4">
            <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
              <motion.div
                className="bg-pink-500 h-full"
                initial={{ width: `${(currentFrameIndex / (selectedMemory.frames.length - 1)) * 100}%` }}
                animate={{ width: `${(currentFrameIndex / (selectedMemory.frames.length - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Frame {currentFrameIndex + 1}</span>
              <span>{selectedMemory.frames.length} total</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {selectedMemory.frames.map((frame, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                currentFrameIndex === index ? "border-pink-500" : "border-transparent"
              }`}
              onClick={() => {
                setCurrentFrameIndex(index)
                setIsPlaying(false)
              }}
            >
              <Image src={frame.image || "/placeholder.svg"} alt={frame.caption} fill className="object-cover" />

              {currentFrameIndex === index && <div className="absolute inset-0 bg-pink-500 bg-opacity-20" />}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

