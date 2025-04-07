"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import Image from "next/image"
import { Heart } from "lucide-react"

// Sample timeline data - replace with your actual memories
const timelineEvents = [
  {
    date: " may 17 ,2024",
    title: "Our First Date",
    description: "endless conversations over scoops of icecream",
    image: "/images/1.jpeg",
  },
  {
    date: "august 1, 2024",
    title: "First concert Together",
    description: "dancing to our favorite songs",
    image: "/images/yt.PNG",
  },
  {
    date: "august 25,2024",
    title:"movie date",
    description: "watching a movie in the coziest seat",
    image: "/images/movie.jpeg",
  },
  {
    date: "september 21,2024",
    title: "our first ever navratri",
    description: "every garba step felt like a heartbeat sync.",
    image: "/images/nav.jpeg",
  },
  {
    date:"december 25,2024",
    title: "our navvanu together",
    description: "every moment of navvanu with you was unforgetable.",
    image: "/images/navanu.jpg",
  },
  {
    date: "february 14, 2024",
    title: "Valentine's Day",
    description: "that smile when i gave you the surprise.",
    image: "/images/valen.jpeg",
  },
]

export default function LoveTimeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div className="w-full h-full flex flex-col items-center py-8 px-4 overflow-y-auto" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Our Love Timeline</h2>
        <p className="text-lg text-purple-700">A journey through our most precious moments</p>
      </motion.div>

      <div className="relative w-full max-w-4xl">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-pink-300 transform -translate-x-1/2" />

        {timelineEvents.map((event, index) => (
          <TimelineEvent key={index} event={event} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}

function TimelineEvent({ event, index, progress }) {
  const isEven = index % 2 === 0
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 * index }}
      className={`relative flex items-center mb-16 ${isEven ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className={`w-1/2 ${isEven ? "pr-8 text-right" : "pl-8"}`}>
        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
            {event.date}
          </span>
        </div>
        <h3 className="text-xl font-bold text-purple-800 mb-2">{event.title}</h3>
        <p className="text-gray-600">{event.description}</p>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <motion.div
          className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center z-10"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <Heart className="w-5 h-5 text-white" />
        </motion.div>
      </div>

      <div className={`w-1/2 ${isEven ? "pl-8" : "pr-8"}`}>
        <motion.div
          className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        </motion.div>
      </div>
    </motion.div>
  )
}

