"use client"

import { motion } from "framer-motion"

// Sample notes - replace with actual messages from friends and family
const loveNotes = [
  {
    id: 1,
    name: "Mom",
    message:
      "Happy birthday, sweetheart! We are so proud of the wonderful person you've become. Wishing you all the happiness in the world on your special day!",
    color: "bg-yellow-100",
  },
  {
    id: 2,
    name: "Dad",
    message: "Son, happy birthday! May this year bring you success in everything you do. We love you!",
    color: "bg-blue-100",
  },
  {
    id: 3,
    name: "Sarah (Sister)",
    message: "Happy birthday to the best brother ever! Thanks for always being there for me. Love you lots!",
    color: "bg-green-100",
  },
  {
    id: 4,
    name:"Riya",
    message: "Dude! Happy birthday! Here's to another year of crazy adventures and good times. Let's celebrate soon!",
    color: "bg-orange-100",
  },
  {
    id: 5,
    name: "dhir",
    message: "Happy birthday ! Here’s to another year of amazing adventures, unforgettable memories, and all the happiness your heart can hold. You deserve the absolute best today and alway!",
    color: "bg-purple-100",
  },
  {
    id: 6,
    name: "daksh",
    message: "Happy birthday to an incredible friend! Wishing you a day filled with laughter, love, and all your favorite things.Here to another amazing year! Cheers to many more adventures together! Have a blast!",
    color: "bg-pink-100",
  },
]

export default function LoveNotes() {
  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Love Notes</h2>
        <p className="text-lg text-purple-700">Special messages from your loved ones</p>
      </motion.div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {loveNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${note.color} p-6 rounded-lg shadow-md transform rotate-${Math.floor(Math.random() * 5) - 2}`}
            whileHover={{ scale: 1.03, rotate: 0 }}
          >
            <div className="font-handwriting">
              <p className="text-gray-700 mb-4">{note.message}</p>
              <p className="text-right font-medium text-gray-800">- {note.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

