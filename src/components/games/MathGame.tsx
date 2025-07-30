import React, { useState, useEffect } from 'react'
import { X, RotateCcw } from 'lucide-react'

interface MathGameProps {
  onComplete: (points: number) => void
  onClose: () => void
}

const MathGame: React.FC<MathGameProps> = ({ onComplete, onClose }) => {
  const [currentProblem, setCurrentProblem] = useState<{ num1: number; num2: number; operator: string; answer: number } | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isPlaying, setIsPlaying] = useState(false)
  const [problems, setProblems] = useState<Array<{ num1: number; num2: number; operator: string; answer: number }>>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    let interval: number
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, timeLeft])

  const generateProblem = () => {
    const operators = ['+', '-', '*']
    const operator = operators[Math.floor(Math.random() * operators.length)]
    let num1, num2, answer

    switch (operator) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1
        num2 = Math.floor(Math.random() * 50) + 1
        answer = num1 + num2
        break
      case '-':
        num1 = Math.floor(Math.random() * 50) + 25
        num2 = Math.floor(Math.random() * num1) + 1
        answer = num1 - num2
        break
      case '*':
        num1 = Math.floor(Math.random() * 12) + 1
        num2 = Math.floor(Math.random() * 12) + 1
        answer = num1 * num2
        break
      default:
        num1 = 1
        num2 = 1
        answer = 2
    }

    return { num1, num2, operator, answer }
  }

  const initializeGame = () => {
    const gameProblems = Array.from({ length: 10 }, () => generateProblem())
    setProblems(gameProblems)
    setCurrentProblem(gameProblems[0])
    setCurrentIndex(0)
    setScore(0)
    setTimeLeft(30)
    setUserAnswer('')
    setIsPlaying(true)
  }

  const handleSubmit = () => {
    if (!currentProblem || !isPlaying) return

    const answer = parseInt(userAnswer)
    if (answer === currentProblem.answer) {
      setScore(prev => prev + 10)
    }

    setUserAnswer('')
    
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setCurrentProblem(problems[currentIndex + 1])
    } else {
      setIsPlaying(false)
      const finalScore = score + (answer === currentProblem.answer ? 10 : 0)
      const points = Math.floor(finalScore / 2) + Math.max(0, timeLeft * 2)
      setTimeout(() => onComplete(points), 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  if (!currentProblem) return null

  return (
    <div className="w-full max-w-sm">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          <div>Time: {formatTime(timeLeft)}</div>
          <div>Score: {score}</div>
          <div>Problem: {currentIndex + 1}/10</div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={initializeGame}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Math Problem */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-800 mb-4">
          {currentProblem.num1} {currentProblem.operator} {currentProblem.num2} = ?
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isPlaying}
            className="w-20 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="?"
            autoFocus
          />
          <button
            onClick={handleSubmit}
            disabled={!isPlaying || !userAnswer}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* Game Status */}
      {!isPlaying && (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600 mb-2">
            {timeLeft === 0 ? '⏰ Time\'s Up!' : '🎉 Game Complete!'}
          </div>
          <div className="text-sm text-gray-600">
            Final Score: {score} | Points earned: {Math.floor(score / 2) + Math.max(0, timeLeft * 2)}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-gray-500 text-center mt-4">
        Solve math problems quickly! Press Enter to submit.
      </div>
    </div>
  )
}

export default MathGame 