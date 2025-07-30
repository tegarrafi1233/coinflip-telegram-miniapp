import React, { useState, useEffect } from 'react'
import { X, RotateCcw } from 'lucide-react'

interface ColorGameProps {
  onComplete: (points: number) => void
  onClose: () => void
}

const ColorGame: React.FC<ColorGameProps> = ({ onComplete, onClose }) => {
  const [sequence, setSequence] = useState<string[]>([])
  const [userSequence, setUserSequence] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShowingSequence, setIsShowingSequence] = useState(false)
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const colors = ['red', 'blue', 'green', 'yellow']

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    setLevel(1)
    setScore(0)
    setGameOver(false)
    setIsPlaying(false)
    generateNewSequence()
  }

  const generateNewSequence = () => {
    const newSequence = Array.from({ length: level + 2 }, () => 
      colors[Math.floor(Math.random() * colors.length)]
    )
    setSequence(newSequence)
    setUserSequence([])
    showSequence(newSequence)
  }

  const showSequence = async (seq: string[]) => {
    setIsShowingSequence(true)
    setIsPlaying(false)
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
    }
    
    setIsShowingSequence(false)
    setIsPlaying(true)
  }

  const handleColorClick = (color: string) => {
    if (!isPlaying || isShowingSequence) return

    const newUserSequence = [...userSequence, color]
    setUserSequence(newUserSequence)

    // Check if the sequence is correct so far
    const currentIndex = newUserSequence.length - 1
    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      // Wrong color - game over
      setGameOver(true)
      setIsPlaying(false)
      const points = Math.floor(score / 2) + (level * 5)
      setTimeout(() => onComplete(points), 2000)
      return
    }

    // Check if sequence is complete
    if (newUserSequence.length === sequence.length) {
      // Level complete
      setScore(prev => prev + (level * 10))
      setLevel(prev => prev + 1)
      setTimeout(() => generateNewSequence(), 1000)
    }
  }

  const getColorClass = (color: string, isActive: boolean = false) => {
    const baseClasses = 'w-16 h-16 rounded-full border-4 border-white shadow-lg transition-all duration-200'
    const activeClasses = isActive ? 'scale-110 shadow-xl' : ''
    
    switch (color) {
      case 'red':
        return `${baseClasses} bg-red-500 ${activeClasses}`
      case 'blue':
        return `${baseClasses} bg-blue-500 ${activeClasses}`
      case 'green':
        return `${baseClasses} bg-green-500 ${activeClasses}`
      case 'yellow':
        return `${baseClasses} bg-yellow-400 ${activeClasses}`
      default:
        return `${baseClasses} bg-gray-400 ${activeClasses}`
    }
  }

  return (
    <div className="w-full max-w-sm">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          <div>Level: {level}</div>
          <div>Score: {score}</div>
          <div>Sequence: {userSequence.length}/{sequence.length}</div>
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

      {/* Game Instructions */}
      <div className="text-center mb-4">
        <div className="text-sm text-gray-600">
          {isShowingSequence ? 'Watch the sequence...' : 
           isPlaying ? 'Repeat the sequence!' : 
           gameOver ? 'Game Over!' : 'Get ready...'}
        </div>
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {colors.map((color) => {
          const isActive = isShowingSequence && 
            sequence[userSequence.length] === color
          
          return (
            <button
              key={color}
              onClick={() => handleColorClick(color)}
              disabled={!isPlaying || isShowingSequence}
              className={getColorClass(color, isActive)}
            />
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(userSequence.length / sequence.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Game Status */}
      {gameOver && (
        <div className="text-center">
          <div className="text-lg font-bold text-red-600 mb-2">💥 Game Over!</div>
          <div className="text-sm text-gray-600">
            You reached level {level} | Points earned: {Math.floor(score / 2) + (level * 5)}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-gray-500 text-center mt-4">
        Watch the sequence and repeat it by tapping the colors in order!
      </div>
    </div>
  )
}

export default ColorGame 