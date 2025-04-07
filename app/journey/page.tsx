"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import CakeCeremony from "@/components/cake-ceremony"
import LoveTimeline from "@/components/love-timeline"
import LoveLetter from "@/components/love-letter"
import MusicPlayer from "@/components/music-player"
import MemoryGallery from "@/components/memory-gallery"
import LoveNotes from "@/components/love-notes"
import VirtualHug from "@/components/virtual-hug"
import OpenWhenLetters from "@/components/open-when-letters"
import EmojiTranslator from "@/components/emoji-translator"
import MoodBoard from "@/components/mood-board"
import FortuneCookies from "@/components/fortune-cookies"
import LoveMadLibs from "@/components/love-mad-libs"
import MemoryReplay from "@/components/memory-replay"
import LoveQuiz from "@/components/love-quiz"
import ScratchCards from "@/components/scratch-cards"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import Link from "next/link"

const sections = [
  { id: "cake", title: "Birthday Cake", component: CakeCeremony },
  { id: "timeline", title: "Our Timeline", component: LoveTimeline },
  { id: "letter", title: "Your Gift", component: LoveLetter },
  { id: "music", title: "Our Songs", component: MusicPlayer },
  { id: "memories", title: "Our Memories", component: MemoryGallery },
  { id: "notes", title: "Love Notes", component: LoveNotes },
  { id: "hug", title: "Virtual Hug", component: VirtualHug },
  { id: "open-when", title: "Open When Letters", component: OpenWhenLetters },
  { id: "emoji", title: "Emoji Translator", component: EmojiTranslator },
  { id: "moodboard", title: "My Moodboard", component: MoodBoard },
  { id: "fortune", title: "Fortune Cookies", component: FortuneCookies },
  { id: "madlibs", title: "Love Mad Libs", component: LoveMadLibs },
  { id: "memory-replay", title: "Replay Memories", component: MemoryReplay },
  { id: "love-quiz", title: "Love Quiz", component: LoveQuiz },
  { id: "scratch-cards", title: "Surprise Gifts", component: ScratchCards },
]

export default function JourneyPage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const goToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
    }
  }

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
    }
  }

  const CurrentSection = sections[currentSectionIndex].component

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <Home className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex flex-wrap justify-center gap-1 max-w-[70vw]">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setCurrentSectionIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSectionIndex ? "bg-pink-500" : "bg-pink-200 hover:bg-pink-300"
              }`}
              aria-label={`Go to ${section.title}`}
            />
          ))}
        </div>
        <div className="w-10"></div> {/* Spacer for balance */}
      </header>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSectionIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col"
          >
            <CurrentSection />
          </motion.div>
        </AnimatePresence>

        <div className="fixed bottom-0 left-0 right-0 flex justify-center space-x-4 px-4">
          <Button
            onClick={goToPreviousSection}
            disabled={currentSectionIndex === 0}
            className="bg-white/70 hover:bg-white text-pink-600 backdrop-blur-sm"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={goToNextSection}
            disabled={currentSectionIndex === sections.length - 1}
            className="bg-white/70 hover:bg-white text-pink-600 backdrop-blur-sm"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}

export const dynamic = "force-dynamic"


