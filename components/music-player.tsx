"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

// Sample playlist - replace with your actual songs
const playlist = [
  {
    title: "Tum hi ho",
    artist: "Arijit Singh",
    cover: "/images/luv.jpeg",
    audio: "/music/tum hi ho.mp3",
  },
  {
    title: "Chand ne kaho aaje",
    artist: "Sachin jigar",
    cover: "/images/2.jpeg",
    audio: "/music/chand.mp3",
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    cover: "/images/3.jpeg",
    audio: "/music/perfect.mp3",
  },
  {
    title: "Happy Birthday Vandu",
    artist: "Your Love",
    cover: "/images/4.jpeg",
    audio: "/music/bday.mp3",
  },
]

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationRef = useRef<number | null>(null)

  const currentSong = playlist[currentSongIndex]

  useEffect(() => {
    // Initialize audio
    const audio = new Audio(currentSong.audio)
    audioRef.current = audio

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration)
    })

    audio.addEventListener("ended", () => {
      nextSong()
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentSongIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    } else {
      audioRef.current.play()
      animationRef.current = requestAnimationFrame(updateProgress)
    }

    setIsPlaying(!isPlaying)
  }

  const updateProgress = () => {
    if (!audioRef.current) return

    setProgress(audioRef.current.currentTime)
    animationRef.current = requestAnimationFrame(updateProgress)
  }

  const seekTo = (value: number[]) => {
    if (!audioRef.current) return

    const newTime = value[0]
    audioRef.current.currentTime = newTime
    setProgress(newTime)
  }

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex === 0 ? playlist.length - 1 : prevIndex - 1))
    setIsPlaying(false)
  }

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex === playlist.length - 1 ? 0 : prevIndex + 1))
    setIsPlaying(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Our Playlist</h2>
        <p className="text-lg text-purple-700">The soundtrack of our love story</p>
      </motion.div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <motion.div
            className="w-full aspect-square bg-gradient-to-br from-pink-300 to-purple-400"
            animate={{
              rotate: isPlaying ? 360 : 0,
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <img
              src={currentSong.cover || "/placeholder.svg"}
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-pink-600" />
              ) : (
                <Play className="w-8 h-8 text-pink-600 ml-1" />
              )}
            </motion.div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 truncate">{currentSong.title}</h3>
            <p className="text-gray-600">{currentSong.artist}</p>
          </div>

          <div className="mb-4">
            <Slider value={[progress]} max={duration || 100} step={0.1} onValueChange={seekTo} className="w-full" />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={prevSong} className="text-gray-700 hover:text-pink-600">
                <SkipBack className="w-5 h-5" />
              </Button>

              <Button
                variant="default"
                size="icon"
                onClick={togglePlayPause}
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </Button>

              <Button variant="ghost" size="icon" onClick={nextSong} className="text-gray-700 hover:text-pink-600">
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMute} className="text-gray-700 hover:text-pink-600">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>

              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0] / 100)}
                className="w-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

