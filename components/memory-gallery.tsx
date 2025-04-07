"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"

const memories = [
  {
    id: 1,
    image: "/images/sit.jpeg",
    caption: "Remember this day? We laughed so much!",
    title: "concert Day",
  },
  {
    id: 2,
    image: "/images/baby.jpeg",
    caption: "officialy your whole fam saw me for the first time!",
    title:"Parna Day",
  },
  {
    id: 3,
    image: "/images/roam.jpeg",
    caption: "choosing my newme outfit was a lil difficult.",
    title: "shopping date",
  },
  {
    id: 4,
    image: "/images/pro.jpeg",
    caption: "listening our fav artists was amazing!",
    title: "Kshitij'24",
  },
  {
    id: 5,
    image: "/images/pja.jpeg",
    caption: "our giripoojan.",
    title: "Pooja time",
  },
  {
    id: 6,
    image: "/images/cute.jpeg",
    caption: "You looked so handsome that day.",
    title: "Cutuu selfie",
  },
  {
    id: 7,
    image: "/images/blue.jpeg",
    caption: "all i wanna enjoy is you and good food!",
    title: "cafe hopping",
  },
  {
    id: 8,
    image: "/images/clg.jpeg",
    caption: ".best navratri so far",
    title: "Navratri Night",
  },
]

export default function MemoryGallery() {
  const [selectedMemory, setSelectedMemory] = useState(null)

  const openMemory = (memory) => {
    setSelectedMemory(memory)
  }

  const closeMemory = () => {
    setSelectedMemory(null)
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Our Special Moments</h2>
        <p className="text-lg text-purple-700">A collection of our favorite memories together</p>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => openMemory(memory)}
            className="cursor-pointer rounded-lg overflow-hidden shadow-md bg-white"
          >
            <div className="relative h-48">
              <Image src={memory.image || "/placeholder.svg"} alt={memory.title} fill className="object-cover" />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-800">{memory.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={closeMemory}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-3xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 rounded-full p-1 text-white"
                onClick={closeMemory}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-[50vh]">
                <Image
                  src={selectedMemory.image || "/placeholder.svg"}
                  alt={selectedMemory.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedMemory.title}</h3>
                <p className="text-gray-600">{selectedMemory.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

