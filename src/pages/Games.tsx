import React, { useState } from 'react'
import { useGame } from '../context/GameContext'
import { Play, Clock, Star, Trophy } from 'lucide-react'
import MemoryGame from '../components/games/MemoryGame'
import MathGame from '../components/games/MathGame'
import ColorGame from '../components/games/ColorGame'

const Games: React.FC = () => {
  const { state, playGame } = useGame()
  const { games } = state
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const handlePlayGame = (gameId: string) => {
    const game = games.find(g => g.id === gameId)
    if (game && game.playsToday < game.maxPlaysPerDay) {
      setSelectedGame(gameId)
    }
  }

  const handleGameComplete = (gameId: string, points: number) => {
    playGame(gameId, points)
    setSelectedGame(null)
  }

  const handleGameClose = () => {
    setSelectedGame(null)
  }

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame)
    if (!game) return null

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{game.name}</h2>
            
            {selectedGame === '1' && (
              <MemoryGame onComplete={(points) => handleGameComplete(game.id, points)} onClose={handleGameClose} />
            )}
            {selectedGame === '2' && (
              <MathGame onComplete={(points) => handleGameComplete(game.id, points)} onClose={handleGameClose} />
            )}
            {selectedGame === '3' && (
              <ColorGame onComplete={(points) => handleGameComplete(game.id, points)} onClose={handleGameClose} />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">🎮 Mini Games</h1>
        <p className="text-white/80">Play games to earn points and level up!</p>
      </div>

      {/* Games Grid */}
      <div className="space-y-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{game.name}</h3>
                <p className="text-white/70 text-sm">{game.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-ton-green">+{game.pointsPerPlay}</div>
                <div className="text-xs text-white/60">points</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-white/70">
                <Clock size={16} />
                <span className="text-sm">
                  {game.playsToday}/{game.maxPlaysPerDay} plays today
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Star size={16} className="text-yellow-400" />
                <span className="text-sm text-white/70">{game.pointsPerPlay} pts</span>
              </div>
            </div>

            <button
              onClick={() => handlePlayGame(game.id)}
              disabled={game.playsToday >= game.maxPlaysPerDay}
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                game.playsToday >= game.maxPlaysPerDay
                  ? 'bg-gray-500/50 text-white/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-ton-blue to-ton-green text-white hover:scale-105 active:scale-95'
              }`}
            >
              <Play size={20} />
              <span>
                {game.playsToday >= game.maxPlaysPerDay ? 'Daily Limit Reached' : 'Play Now'}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-game-purple to-game-pink rounded-xl p-4 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Trophy size={20} />
          <span className="font-semibold">Pro Tips</span>
        </div>
        <ul className="text-sm space-y-1 text-white/90">
          <li>• Play all games daily to maximize points</li>
          <li>• Focus on games with higher point rewards</li>
          <li>• Complete tasks to unlock bonus rewards</li>
          <li>• Convert points to TON when you reach 1000</li>
        </ul>
      </div>
    </div>
  )
}

export default Games 