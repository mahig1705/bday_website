"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Copy, Check, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample emoji translations - replace with your own personalized messages
const emojiTranslations = {
  "❤️": ["I love you more than words can say", "My heart beats only for you", "You're the love of my life"],
  "😘": [
    "I'm sending you a thousand kisses",
    "Wishing I could kiss you right now",
    "Your lips are my favorite destination",
  ],
  "🥺": ["You make my heart melt every time", "I'm completely yours, forever", "No one makes me feel the way you do"],
  "😍": [
    "You take my breath away",
    "I fall in love with you all over again every day",
    "Your beauty inside and out amazes me",
  ],
  "🌹": [
    "You're the most beautiful flower in my garden of life",
    "Our love blooms eternally",
    "You bring color to my world",
  ],
  "🔥": [
    "You ignite a passion in me that never fades",
    "Our chemistry is undeniable",
    "You're the flame that keeps me warm",
  ],
  "🌙": [
    "You're my last thought before sleep and first when I wake",
    "Even in darkness, our love shines bright",
    "Dreaming of you tonight",
  ],
  "☀️": ["You are the sunshine of my life", "You brighten even my darkest days", "Your smile is as radiant as the sun"],
  "🌈": [
    "You bring all the colors to my world",
    "After every storm, there's us - beautiful and strong",
    "Our love spans the spectrum of emotions",
  ],
  "🎵": [
    "You're the melody I can't get out of my head",
    "Our hearts beat in perfect harmony",
    "Life with you is my favorite song",
  ],
  "🍕": [
    "You're the pizza to my heart - essential and delicious",
    "I'd share my last slice with you",
    "You're my favorite comfort",
  ],
  "🏠": ["Wherever you are is home to me", "Building a life with you is my greatest joy", "You're my safe place"],
  "👑": ["You deserve to be treated like royalty", "You rule my heart completely", "To me, you're absolute perfection"],
  "🌊": ["My love for you is as deep as the ocean", "With you, I go with the flow of life", "You calm my storms"],
  "🧸": [
    "Cuddling with you is my favorite place to be",
    "You bring comfort to my soul",
    "You're my soft place to land",
  ],
  "🧩": ["We fit together perfectly", "You complete me in every way", "Without you, I'm incomplete"],
  "🚀": ["You make my heart soar", "With you, I can reach the stars", "Our love is out of this world"],
  "🌟": [
    "You shine brighter than anyone I know",
    "You're the star that guides me home",
    "You sparkle in a world of ordinary",
  ],
  "🎁": [
    "Every day with you is a gift",
    "You're the present I never knew I needed",
    "Unwrapping layers of you is my joy",
  ],
  "🔒": [
    "My heart is locked and you have the only key",
    "Our love is secure and unbreakable",
    "I'm yours exclusively, forever",
  ],
}

// Combinations of emojis
const emojiCombinations = {
  "❤️😘": ["My love for you grows stronger with each passing day", "One kiss from you makes my whole day better"],
  "🌹🌙": ["Even in the darkest night, my love for you blooms", "You're the romantic dream I never want to wake from"],
  "☀️🌈": ["You bring sunshine and color to my every day", "With you, even rainy days feel bright and beautiful"],
  "😍🔥": ["You set my heart on fire with just one look", "The way you look at me still gives me butterflies"],
  "🎵🚀": ["Our love song will echo through the stars", "You make my heart sing and my spirit soar"],
  "🧸🏠": ["Home is wherever I can hold you close", "Cuddling with you feels like the safest place in the world"],
  "🌊🌟": [
    "My love for you is as deep as the ocean and as vast as the stars",
    "You're my guiding star across life's ocean",
  ],
  "🎁🔒": [
    "The gift of your love is something I treasure and keep safe",
    "I lock your love in my heart where it's always protected",
  ],
  "👑🧩": [
    "You're the missing piece that makes my life complete, my queen/king",
    "Together we rule our own perfect world",
  ],
  "🍕🌈": ["Life with you is delicious and colorful", "You bring joy to the simplest moments, like sharing a pizza"],
}

// Create a list of all available emojis for the dropdown
const availableEmojis = Object.keys(emojiTranslations).map((emoji) => ({
  value: emoji,
  label: `${emoji} ${emoji === "❤️" ? "- Heart" : emoji === "😘" ? "- Kiss" : ""}`,
}))

export default function EmojiTranslator() {
  const [inputEmojis, setInputEmojis] = useState("")
  const [translation, setTranslation] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [recentTranslations, setRecentTranslations] = useState([])

  const addEmoji = (emoji: string) => {
    setInputEmojis((prev) => prev + emoji)
  }

  const translateEmojis = () => {
    if (!inputEmojis.trim()) return

    setIsTranslating(true)

    setTimeout(() => {
      let result = ""

      // First check for combinations
      for (const [combo, messages] of Object.entries(emojiCombinations)) {
        if (inputEmojis.includes(combo)) {
          result = messages[Math.floor(Math.random() * messages.length)]
          break
        }
      }

      // If no combination found, check individual emojis
      if (!result) {
        for (const emoji of inputEmojis) {
          if (emojiTranslations[emoji]) {
            const messages = emojiTranslations[emoji]
            result = messages[Math.floor(Math.random() * messages.length)]
            break
          }
        }
      }

      // If still no translation found
      if (!result) {
        result = "Your love is beyond words... Try different emojis for a translation."
      }

      setTranslation(result)
      setIsTranslating(false)

      // Add to recent translations
      if (recentTranslations.length >= 5) {
        setRecentTranslations([
          { emojis: inputEmojis, message: result, id: Date.now() },
          ...recentTranslations.slice(0, 4),
        ])
      } else {
        setRecentTranslations([{ emojis: inputEmojis, message: result, id: Date.now() }, ...recentTranslations])
      }
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearInput = () => {
    setInputEmojis("")
    setTranslation("")
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Emoji Love Translator</h2>
        <p className="text-lg text-purple-700">
          Express your feelings with emojis and see them translated into love messages
        </p>
      </motion.div>

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <div className="flex items-center border-2 border-pink-200 rounded-lg p-3 focus-within:border-pink-400 transition-colors">
              <div className="flex-1 text-3xl min-h-[50px]">
                {inputEmojis || <span className="text-gray-400 text-lg">Select emojis from the dropdown...</span>}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearInput}
                  disabled={!inputEmojis}
                  className="text-gray-500"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select onValueChange={addEmoji}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an emoji" />
                </SelectTrigger>
                <SelectContent>
                  {availableEmojis.map((emoji) => (
                    <SelectItem key={emoji.value} value={emoji.value}>
                      <span className="text-xl mr-2">{emoji.value}</span>
                      <span className="text-sm text-gray-500">{emoji.label.split("-")[1] || ""}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={translateEmojis}
              disabled={!inputEmojis || isTranslating}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              {isTranslating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="mr-2"
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
              ) : (
                <Sparkles className="mr-2 h-5 w-5" />
              )}
              {isTranslating ? "Translating..." : "Translate Love Message"}
            </Button>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Selected emojis:</p>
            <div className="flex flex-wrap gap-2">
              {inputEmojis.split("").map((emoji, index) => (
                <div key={index} className="bg-pink-50 p-2 rounded-md text-xl">
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {translation && !isTranslating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200 relative"
            >
              <div className="absolute top-2 right-2">
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 w-8 p-0 rounded-full">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-500" />}
                </Button>
              </div>

              <p className="text-gray-700 italic pr-8 font-handwriting text-lg">"{translation}"</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {recentTranslations.length > 0 && (
        <div className="w-full max-w-2xl">
          <h3 className="text-xl font-medium text-purple-700 mb-4">Recent Translations</h3>

          <div className="space-y-3">
            {recentTranslations.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-3 rounded-lg shadow-sm flex items-start"
              >
                <div className="text-2xl mr-3">{item.emojis}</div>
                <div className="text-sm text-gray-600 italic">"{item.message}"</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

