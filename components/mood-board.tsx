"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, X, ZoomIn } from "lucide-react"

// Sample mood board items - replace with your own images and captions
const moodItems = [
  {
    id: 1,
    image: "/images/v3.jpeg",
    caption: "our career",
    color: "bg-pink-100",
  },
  {
    id: 2,
    image: "/images/v20.jpeg",
    caption: "It is gonna work",
    color: "bg-purple-100",
  },
  {
    id: 3,
    image: "/images/v1.jpeg",
    caption: "money,money and money",
    color: "bg-blue-100",
  },
  {
    id: 4,
    image: "/images/v4.jpeg",
    caption: "From aditya ghadhvi to coldplay",
    color: "bg-yellow-100",
  },
  {
    id: 5,
    image: "/images/v5.jpeg",
    caption: "Travelling the whole world with you",
    color: "bg-green-100",
  },
  {
    id: 6,
    image: "/images/v6.jpeg",
    caption: "Polaroids",
    color: "bg-red-100",
  },
  {
    id: 7,
    image: "/images/v21.jpeg",
    caption: "Being the best ceo's",
    color: "bg-indigo-100",
  },
  {
    id: 8,
    image: "/images/v8.jpeg",
    caption: "You me and our detox",
    color: "bg-orange-100",
  },
  {
    id: 9,
    image: "/images/v9.jpeg",
    caption: "Those peaceful nights with you",
    color: "bg-teal-100",
  },
  {
    id: 10,
    image: "/images/v10.jpeg",
    caption: "Getting fit together",
    color: "bg-rose-100",
  },
  {
    id: 11,
    image: "/images/v23.jpeg",
    caption: "Dream car",
    color: "bg-violet-100",
  },
  {
    id: 12,
    image: "/images/v12.jpeg",
    caption: "Want to see the best sunsets with you",
    color: "bg-cyan-100",
  },
]

export default function MoodBoard() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)

  const openItem = (item) => {
    setSelectedItem(item)
  }

  const closeItem = () => {
    setSelectedItem(null)
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Our Vision-Board</h2>
        <p className="text-lg text-purple-700">A collection of moments, dreams, and feelings that remind me of us</p>
      </motion.div>

      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {moodItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: Math.random() * 6 - 3,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 10,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className={`${item.color} rounded-lg overflow-hidden shadow-md cursor-pointer relative`}
              onClick={() => openItem(item)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative aspect-square">
                <Image src={item.image || "/placeholder.svg"} alt={item.caption} fill className="object-cover" />

                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredItem === item.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ZoomIn className="text-white w-8 h-8" />
                </motion.div>
              </div>

              <motion.div
                className="p-3 text-center"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredItem === item.id ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-medium text-gray-700">{item.caption}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeItem}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className={`relative max-w-2xl w-full ${selectedItem.color} rounded-lg overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 z-10 bg-white bg-opacity-70 rounded-full p-1 text-gray-800 hover:bg-opacity-100"
              onClick={closeItem}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-square md:aspect-video">
              <Image
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.caption}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-5 h-5 text-pink-500 mr-2 fill-pink-500" />
                <h3 className="text-xl font-medium text-gray-800">{selectedItem.caption}</h3>
              </div>
              <p className="text-gray-600 italic">
                "This reminds me of our love story and all the beautiful moments we've shared together."
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

