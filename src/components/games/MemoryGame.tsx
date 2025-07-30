import React, { useState, useEffect } from 'react'
import { X, RotateCcw } from 'lucide-react'

interface MemoryGameProps {
  onComplete: (points: number) => void
  onClose: () => void
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete, onClose }) => {
  const [cards, setCards] = useState<Array<{ id: number; value: string; isFlipped: boolean; isMatched: boolean }>>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const emojis = ['🎮', '🎲', '🎯', '🏆', '⭐', '💎', '🎪', '🎨']

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const initializeGame = () => {
    const gameCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }))
    
    setCards(gameCards)
    setFlippedCards([])
    setMoves(0)
    setTime(0)
    setIsPlaying(true)
  }

  const handleCardClick = (cardId: number) => {
    if (!isPlaying) return
    
    const card = cards.find(c => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return

    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    )
    setCards(newCards)

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      
      const [firstId, secondId] = newFlippedCards
      const firstCard = newCards.find(c => c.id === firstId)
      const secondCard = newCards.find(c => c.id === secondId)

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true }
              : c
          ))
          setFlippedCards([])
          
          // Check if game is complete
          const matchedCards = newCards.filter(c => c.isMatched).length + 2
          if (matchedCards === cards.length) {
            setIsPlaying(false)
            const points = calculatePoints()
            setTimeout(() => onComplete(points), 1000)
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false }
              : c
          ))
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const calculatePoints = () => {
    const basePoints = 20
    const timeBonus = Math.max(0, 60 - time) * 2
    const movesBonus = Math.max(0, 20 - moves) * 3
    return basePoints + timeBonus + movesBonus
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full max-w-sm">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          <div>Time: {formatTime(time)}</div>
          <div>Moves: {moves}</div>
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

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={!isPlaying || card.isMatched}
            className={`w-16 h-16 rounded-lg border-2 transition-all duration-300 flex items-center justify-center text-2xl ${
              card.isMatched
                ? 'bg-green-100 border-green-300'
                : card.isFlipped
                ? 'bg-white border-blue-300'
                : 'bg-blue-100 border-blue-200 hover:bg-blue-200'
            }`}
          >
            {(card.isFlipped || card.isMatched) ? card.value : '❓'}
          </button>
        ))}
      </div>

      {/* Game Status */}
      {!isPlaying && cards.some(c => c.isMatched) && (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600 mb-2">🎉 Game Complete!</div>
          <div className="text-sm text-gray-600">
            Points earned: {calculatePoints()}
          </div>
        </div>
      )}
    </div>
  )
}

export default MemoryGame 