"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Text } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/use-window-size"

function Cake({ isBlown, onCakeClick }) {
  // Create a cake using basic Three.js geometries instead of loading a GLB model
  return (
    <group onClick={onCakeClick}>
      {/* Cake base layer */}
      <mesh position={[0, -0.5, 0]} scale={[1.5, 0.5, 1.5]}>
        <cylinderGeometry args={[1, 1.2, 1, 32]} />
        <meshStandardMaterial color="#f8a5c2" />
      </mesh>

      {/* Cake middle layer */}
      <mesh position={[0, 0.2, 0]} scale={[1.2, 0.5, 1.2]}>
        <cylinderGeometry args={[1, 1, 1, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Cake top layer */}
      <mesh position={[0, 0.8, 0]} scale={[0.9, 0.4, 0.9]}>
        <cylinderGeometry args={[1, 1, 1, 32]} />
        <meshStandardMaterial color="#f8a5c2" />
      </mesh>

      {/* Cake frosting */}
      <mesh position={[0, 1.1, 0]} scale={[0.9, 0.1, 0.9]}>
        <cylinderGeometry args={[1, 1, 1, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Candles and flames - only show if not blown */}
      {!isBlown && (
        <>
          {/* Center candle */}
          <mesh position={[0, 1.3, 0]} scale={[0.05, 0.3, 0.05]}>
            <cylinderGeometry args={[1, 1, 1, 16]} />
            <meshStandardMaterial color="#ffdd00" />
          </mesh>

          {/* Center flame */}
          <mesh position={[0, 1.7, 0]} scale={[0.08, 0.15, 0.08]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={2} />
          </mesh>

          {/* Additional candles in a circle */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2
            const x = Math.sin(angle) * 0.5
            const z = Math.cos(angle) * 0.5

            return (
              <group key={i}>
                {/* Candle */}
                <mesh position={[x, 1.3, z]} scale={[0.04, 0.25, 0.04]}>
                  <cylinderGeometry args={[1, 1, 1, 16]} />
                  <meshStandardMaterial color="#ffdd00" />
                </mesh>

                {/* Flame */}
                <mesh position={[x, 1.6, z]} scale={[0.06, 0.12, 0.06]}>
                  <sphereGeometry args={[1, 16, 16]} />
                  <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={2} />
                </mesh>
              </group>
            )
          })}
        </>
      )}
    </group>
  )
}

export default function CakeCeremony() {
  const [isBlown, setIsBlown] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [isCakeSliced, setIsCakeSliced] = useState(false)
  const [hiddenMessage, setHiddenMessage] = useState(false)
  const { width, height } = useWindowSize()
  const microphoneRef = useRef(null)
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(false)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    // Check if microphone is available
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setIsMicrophoneAvailable(true))
      .catch(() => setIsMicrophoneAvailable(false))
  }, [])

  const handleBlowCandles = () => {
    setIsBlown(true)
    setTimeout(() => {
      setShowMessage(true)
      setShowFireworks(true)

      setTimeout(() => {
        setIsCakeSliced(true)

        setTimeout(() => {
          setHiddenMessage(true)
        }, 1000)
      }, 2000)
    }, 500)
  }

  const startListening = () => {
    if (!isMicrophoneAvailable) return

    setIsListening(true)

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)
      const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1)

      analyser.smoothingTimeConstant = 0.8
      analyser.fftSize = 1024

      microphone.connect(analyser)
      analyser.connect(javascriptNode)
      javascriptNode.connect(audioContext.destination)

      javascriptNode.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(array)
        const values = array.reduce((a, b) => a + b, 0) / array.length

        if (values > 30) {
          // Threshold for "blowing" detection
          handleBlowCandles()
          javascriptNode.disconnect()
          stream.getTracks().forEach((track) => track.stop())
          setIsListening(false)
        }
      }

      microphoneRef.current = {
        stream,
        javascriptNode,
        disconnect: () => {
          javascriptNode.disconnect()
          stream.getTracks().forEach((track) => track.stop())
        },
      }
    })
  }

  useEffect(() => {
    return () => {
      if (microphoneRef.current) {
        microphoneRef.current.disconnect()
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {showFireworks && (
        <Confetti
          width={width}
          height={height}
          recycle={true}
          numberOfPieces={200}
          gravity={0.2}
          colors={["#ff6b6b", "#ffdd00", "#f8a5c2", "#c56cf0"]}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
          {hiddenMessage
            ? "I Love You More Each Day!"
            : showMessage
              ? "Make a Wish, My Love!"
              : "Blow Out the Candles!"}
        </h2>
        <p className="text-lg text-purple-700">
          {hiddenMessage
            ? "Every moment with you is a gift I cherish."
            : showMessage
              ? "Close your eyes and make your birthday wish..."
              : isMicrophoneAvailable
                ? "Click the button below or blow into your microphone"
                : "Click the candles to blow them out"}
        </p>
      </motion.div>

      <div className="relative w-full h-[400px] mb-8">
        <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[0, 10, 0]} intensity={1} />

          <Cake isBlown={isBlown} onCakeClick={!isBlown ? handleBlowCandles : undefined} />

          {hiddenMessage && (
            <Text position={[0, 1.5, 0]} fontSize={0.3} color="#ff6b6b" anchorX="center" anchorY="middle">
              I Love You!
            </Text>
          )}

          <OrbitControls enableZoom={false} />
          <Environment preset="sunset" />
        </Canvas>
      </div>

      {!isBlown && isMicrophoneAvailable && (
        <Button
          onClick={isListening ? () => {} : startListening}
          className={`mb-4 ${isListening ? "bg-red-500 animate-pulse" : "bg-pink-500 hover:bg-pink-600"}`}
        >
          {isListening ? "Listening..." : "Blow using Microphone"}
        </Button>
      )}

      {!isBlown && !isMicrophoneAvailable && (
        <Button onClick={handleBlowCandles} className="mb-4 bg-pink-500 hover:bg-pink-600">
          Blow Out Candles
        </Button>
      )}

      {isCakeSliced && !hiddenMessage && (
        <Button onClick={() => setHiddenMessage(true)} className="mt-4 bg-purple-500 hover:bg-purple-600">
          Cut the Cake
        </Button>
      )}
    </div>
  )
}

