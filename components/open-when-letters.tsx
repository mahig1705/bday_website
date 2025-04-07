"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Mail, Heart } from "lucide-react"
import Image from "next/image"

// Sample letters - replace with your actual content
const letters = [
  {
    id: 1,
    title: "Open When You Miss Me",
    content: `My vanduu,

When you're reading this, I might be physically away, but my heart is always with you. remember that distance cannot reduce our love.Bubuu dont miss me close your eyes i am there around you hugging and kissing you.i also miss you badly. Those moments are etched in my heart forever.

 I'm sending you the biggest virtual hug right now. Look at our photos, listen to our fav songs.

Forever yours,
❤️`,
    image: "/images/o1.jpeg",
    color: "bg-pink-100 border-pink-300",
  },
  {
    id: 2,
    title: "Open When You Need Motivation",
    content: `My incredible love,

If you're reading this, you might be facing a challenge. pehla toh be ekdum chill take a deep breath. Now remember: you are the most capable, brilliant, and determined person I know.

  That same strength is still in you. I believe in you more than anyone else in this world.I know ke tara thi kai pan thai sakse you are very strong . I am there for you cheering loudly. You've got this, and I've got you.

your riyuu,
❤️`,
    image: "/images/o2.jpeg",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 3,
    title: "Open When You Need a Laugh",
    content: `Hey you!

So, remember that time you tried to impress me by your flirting skills and almost made me fall in love with you ? 

baby remember there is only one life enjoy it to your fullest. we have bunch of our memories,videos etc. They're my favorite memories to replay when I need a smile.

your rolly polly jokes se lekar sab is stored in my heart... just wannaa stay happy and thank god

I love your laugh more than anything. Hope this brought it out!

Your personal comedian,
❤️`,
    image: "/images/o3.jpeg",
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    id: 4,
    title: "Open When You Can't Sleep",
    content: `My sleepless love,

It's late, and your mind is probably racing with thought. I know overthinking ni adat che but this not the time you need to focus on your gaols.why to stress when riya is here.

Imagine us on that perfect vacation spot we've been dreaming about. Feel the gentle breeze, hear the soft sounds of nature. We're there together, peaceful and content.

 And know that somewhere, I'm probably thinking of you too.bau tension leu nai bhagvan ne bajvu hahhahah!

Sweet dreams, my love. Tomorrow is a new day, and I'll be loving you through it all.

Your forever,
❤️`,
    image: "/images/o4.jpeg",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 5,
    title: "Open When You're Celebrating",
    content: `My shining star!

CONGRATULATIONS! Whatever you're celebrating right now, know that I am bursting with pride and joy for you.

Your success is so well-deserved. Your hard work, dedication, and incredible spirit have brought you to this moment. I wish I could be there clinking glasses with you and seeing that beautiful smile light up your face.

Celebrate fully! Dance like nobody's watching (or like I'm the only one watching, because you know how much I love your dance moves).

I'm celebrating you today and always.

With immense pride and love,
❤️`,
    image: "/images/05.jpeg",
    color: "bg-green-100 border-green-300",
  },
  {
    id: 6,
    title: "Open When You Need to Remember How Much I Love You",
    content: `My heart's keeper,

The fact that you're reading this means you need a reminder of my love. So here it is: I love you immeasurably, unconditionally, and eternally.

I love the way your eyes look at me , your smile,your soft soft cheeks,your pinky red nose. I love you and every part of you . I love how passionate you get about things you care about. I love your kindness, your strength, your vulnerability.

I love you on your brightest days and your darkest nights. I love you through challenges and celebrations. I love every version of you that has existed and will exist.

You are my favorite person, my best friend, my greatest adventure.

Loving you always,
❤️`,
    image: "/images/v2.jpeg",
    color: "bg-red-100 border-red-300",
  },
]

export default function OpenWhenLetters() {
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [openedLetters, setOpenedLetters] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const lettersPerPage = 3
  const totalPages = Math.ceil(letters.length / lettersPerPage)

  const openLetter = (letter) => {
    setSelectedLetter(letter)
    if (!openedLetters[letter.id]) {
      setOpenedLetters({ ...openedLetters, [letter.id]: true })
      // No audio playback - removed to prevent errors
    }
  }

  const closeLetter = () => {
    setSelectedLetter(null)
  }

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const currentLetters = letters.slice(currentPage * lettersPerPage, (currentPage + 1) * lettersPerPage)

  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">"Open When..." Letters</h2>
        <p className="text-lg text-purple-700">Special messages for different moments in your life</p>
      </motion.div>

      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {currentLetters.map((letter) => (
              <motion.div
                key={letter.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`relative cursor-pointer rounded-lg overflow-hidden shadow-lg ${openedLetters[letter.id] ? "border-2 border-pink-500" : "border border-gray-200"}`}
                onClick={() => openLetter(letter)}
              >
                <div className={`p-6 ${letter.color}`}>
                  <div className="flex items-center justify-between mb-4">
                    <Mail className="w-8 h-8 text-pink-600" />
                    {openedLetters[letter.id] && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full"
                      >
                        Opened
                      </motion.div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{letter.title}</h3>
                  <div className="flex justify-center mt-4">
                    <motion.div
                      animate={{
                        rotate: openedLetters[letter.id] ? [0, -5, 5, -5, 5, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={letter.image || "/placeholder.svg"}
                        width={100}
                        height={100}
                        alt={letter.title}
                        className="rounded-lg object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-8 space-x-4">
          <Button onClick={prevPage} disabled={currentPage === 0} variant="outline" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full ${index === currentPage ? "bg-pink-500" : "bg-pink-200"}`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            variant="outline"
            className="flex items-center"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={closeLetter}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-2xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-8 ${selectedLetter.color}`}>
                <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={closeLetter}>
                  <X className="w-6 h-6" />
                </button>

                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedLetter.title}</h3>
                  <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                </div>

                <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-inner">
                  <p className="whitespace-pre-line font-handwriting text-lg text-gray-700">{selectedLetter.content}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

