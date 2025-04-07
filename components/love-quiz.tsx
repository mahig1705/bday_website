"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Award, ArrowRight, RefreshCw } from "lucide-react"
import confetti from "canvas-confetti"

const quizQuestions = [
  {
    id: 1,
    question: "When was our first message?",
    options: ["January 15, 2023", "december 24, 2023", "March 10, 2022", "December 25, 2023"],
    correctAnswer: 3, // changed from 4 to 3
    explanation: "We talked the first time on 25th!",
  },
  {
    id: 2,
    question: "What's my favorite food that you will always have to order for me?",
    options: ["Pizza", "frankie", "Pasta", "Tacos"],
    correctAnswer: 1, // changed from 2 to 1
    explanation: "our go to food is frankie!",
  },
  {
    id: 3,
    question: "when did you first realize that you liked me?",
    options: ["after 10th", "on classes trip", "snapchat talks", "when we fought for marks"],
    correctAnswer: 1, // changed from 2 to 1
    explanation: "it was the best trip.",
  },
  {
    id: 4,
    question: "What's the most special moment we have had together?",
    options: ["first hug", "going to concert", "studying together", "all of them"],
    correctAnswer: 3, // changed from 4 to 3
    explanation: "I've always loved doing everything with you",
  },
  {
    id: 5,
    question: "What do you want for your birthday?",
    options: ["riya", "riya", "riya", "riya"],
    correctAnswer: 1, // changed from 2 to 1 (can be any since all are the same)
    explanation: "I am all that you need!",
  },
]


export default function LoveQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return

    setSelectedOption(optionIndex)
    setIsAnswered(true)

    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1)
      // Trigger confetti for correct answers
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    setShowExplanation(true)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsAnswered(false)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setQuizCompleted(false)
    setShowExplanation(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100

    if (percentage === 100) {
      return "Perfect score! You know me so well! ❤️"
    } else if (percentage >= 80) {
      return "Amazing! You really pay attention to our relationship!"
    } else if (percentage >= 60) {
      return "Not bad! We still have more memories to make together!"
    } else {
      return "That's okay! Let's create more memorable moments together!"
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Love Quiz</h2>
        <p className="text-lg text-purple-700">Test how well you know me and our relationship!</p>
      </motion.div>

      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {!quizCompleted ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-gray-500">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
                <span className="text-sm font-medium text-pink-600">
                  Score: {score}/{quizQuestions.length}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h3>

              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedOption === index
                        ? index === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : isAnswered && index === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-pink-300"
                    }`}
                    disabled={isAnswered}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option}</span>
                      {isAnswered &&
                        (index === currentQuestion.correctAnswer ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : selectedOption === index ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : null)}
                    </div>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-pink-50 p-4 rounded-lg border border-pink-200 mb-6"
                  >
                    <p className="text-pink-800 italic">{currentQuestion.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end">
                <Button
                  onClick={goToNextQuestion}
                  disabled={!isAnswered}
                  className={`${isAnswered ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-300"} text-white`}
                >
                  {currentQuestionIndex === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <Award className="w-16 h-16 mx-auto text-pink-500 mb-4" />

              <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h3>

              <div className="text-5xl font-bold text-pink-600 my-6">
                {score}/{quizQuestions.length}
              </div>

              <p className="text-lg text-gray-700 mb-8">{getScoreMessage()}</p>

              <Button onClick={restartQuiz} className="bg-pink-500 hover:bg-pink-600 text-white">
                <RefreshCw className="mr-2 h-4 w-4" />
                Take Quiz Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

