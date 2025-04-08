"use client"

import { useState } from "react"

export default function CakeCeremony() {
  const [isBlown, setIsBlown] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const handleBlowCandles = () => {
    setIsBlown(true)
    setTimeout(() => setShowMessage(true), 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-pink-600 text-center mb-4">
        {showMessage
          ? "I Love You More Each Day! 💖"
          : isBlown
          ? "Make a Wish, My Love!"
          : "Blow Out the Candles!"}
      </h1>
      <p className="text-purple-700 text-lg text-center mb-8">
        {showMessage
          ? "Every moment with you is a gift I cherish."
          : isBlown
          ? "Close your eyes and make your wish..."
          : "Click the cake to blow out the candles!"}
      </p>

      {/* Simple Cake Design */}
      <div
        className="relative flex flex-col items-center justify-end w-40 h-40 rounded-full bg-pink-300 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={!isBlown ? handleBlowCandles : undefined}
      >
        {/* Cake Layers */}
        <div className="absolute bottom-0 w-32 h-6 bg-white rounded-t-md"></div>
        <div className="absolute bottom-6 w-28 h-6 bg-pink-200 rounded-t-md"></div>
        <div className="absolute bottom-12 w-24 h-5 bg-white rounded-t-md"></div>

        {/* Candles */}
        {!isBlown && (
          <div className="absolute top-4 flex gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-1 h-6 bg-yellow-300 rounded-sm"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showMessage && (
        <p className="mt-6 text-purple-600 font-semibold text-lg">
          🎂 Let's celebrate with love!
        </p>
      )}
    </div>
  )
}
