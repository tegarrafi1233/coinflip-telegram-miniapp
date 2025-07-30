import React, { useState } from 'react'
import { useGame } from '../context/GameContext'
import { Coins, Zap, TrendingUp, DollarSign } from 'lucide-react'
import AdvancedCoinFlip from '../components/AdvancedCoinFlip'

const CoinFlip: React.FC = () => {
  const { state, addCoinFlip, useFreeFlip } = useGame()
  const { user, coinFlips } = state
  const [betAmount, setBetAmount] = useState('')
  const [choice, setChoice] = useState<'heads' | 'tails' | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [lastResult, setLastResult] = useState<{ won: boolean; result: 'heads' | 'tails' } | null>(null)
  const [pendingResult, setPendingResult] = useState<'heads' | 'tails' | null>(null)

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const handleFlip = () => {
    if (!choice || !betAmount || parseFloat(betAmount) <= 0) return
    const amount = parseFloat(betAmount)
    if (amount > user.tonBalance) return
    setIsFlipping(true)
    setShowResult(false)
    // Simulate coin flip
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'heads' : 'tails'
      setPendingResult(result)
      setTimeout(() => {
        const won = choice === result
        setLastResult({ won, result })
        addCoinFlip(amount, choice, result)
        setIsFlipping(false)
        setShowResult(true)
        setBetAmount('')
        setChoice(null)
        setTimeout(() => setShowResult(false), 3000)
        setPendingResult(null)
      }, 1200)
    }, 200)
  }

  const handleFreeFlip = () => {
    if (user.freeFlips <= 0) return
    setChoice('heads')
    setIsFlipping(true)
    setShowResult(false)
    useFreeFlip()
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'heads' : 'tails'
      setPendingResult(result)
      setTimeout(() => {
        const won = 'heads' === result
        setLastResult({ won, result })
        addCoinFlip(0, 'heads', result)
        setIsFlipping(false)
        setShowResult(true)
        setChoice(null)
        setTimeout(() => setShowResult(false), 3000)
        setPendingResult(null)
      }, 1200)
    }, 200)
  }

  const recentFlips = coinFlips.slice(0, 5)

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">🪙 Coin Flip</h1>
        <p className="text-white/80">Choose heads or tails and win TON!</p>
      </div>

      {/* Coin 3D Animation */}
      <div className="flex justify-center my-8">
        <AdvancedCoinFlip
          isFlipping={isFlipping}
          result={pendingResult || (showResult && lastResult ? lastResult.result : null)}
        />
      </div>

      {/* Balance & Free Flips */}
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-coin-gold">{user.tonBalance.toFixed(3)}</div>
            <div className="text-sm text-white/70">TON Balance</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-jackpot-purple">{user.freeFlips}</div>
            <div className="text-sm text-white/70">Free Flips</div>
          </div>
        </div>
        {user.freeFlips > 0 && (
          <button
            onClick={handleFreeFlip}
            disabled={isFlipping}
            className="w-full py-3 px-4 bg-gradient-to-r from-jackpot-purple to-jackpot-blue text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            <Zap size={20} />
            <span>Use Free Flip</span>
          </button>
        )}
      </div>

      {/* Coin Flip Game */}
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
        <h2 className="text-xl font-semibold text-white mb-4">Place Your Bet</h2>
        {/* Bet Amount */}
        <div className="mb-4">
          <label className="block text-sm text-white/70 mb-2">Bet Amount (TON)</label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="Enter amount"
            min="0.1"
            max={user.tonBalance}
            step="0.1"
            className="w-full px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-coin-gold"
          />
        </div>
        {/* Choice Selection */}
        <div className="mb-6">
          <label className="block text-sm text-white/70 mb-3">Choose:</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setChoice('heads')}
              className={`py-4 px-6 rounded-xl border-2 transition-all ${
                choice === 'heads'
                  ? 'border-coin-gold bg-coin-gold/20 text-coin-gold'
                  : 'border-dark-border bg-white/5 text-white hover:border-coin-gold/50'
              }`}
            >
              <div className="text-2xl mb-1">H</div>
              <div className="font-semibold">Heads</div>
            </button>
            <button
              onClick={() => setChoice('tails')}
              className={`py-4 px-6 rounded-xl border-2 transition-all ${
                choice === 'tails'
                  ? 'border-coin-gold bg-coin-gold/20 text-coin-gold'
                  : 'border-dark-border bg-white/5 text-white hover:border-coin-gold/50'
              }`}
            >
              <div className="text-2xl mb-1">T</div>
              <div className="font-semibold">Tails</div>
            </button>
          </div>
        </div>
        {/* Flip Button */}
        <button
          onClick={handleFlip}
          disabled={!choice || !betAmount || parseFloat(betAmount) <= 0 || parseFloat(betAmount) > user.tonBalance || isFlipping}
          className="w-full py-4 px-6 bg-gradient-to-r from-coin-gold to-coin-bronze text-black font-bold rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          <Coins size={20} />
          <span>{isFlipping ? 'Flipping...' : 'Flip Coin'}</span>
        </button>
      </div>
      {/* Result Display */}
      {showResult && lastResult && (
        <div className={`bg-dark-card rounded-2xl p-6 border border-dark-border text-center ${
          lastResult.won ? 'border-jackpot-green' : 'border-jackpot-red'
        }`}>
          <div className="text-4xl mb-2">
            {lastResult.won ? '🎉' : '😔'}
          </div>
          <div className={`text-2xl font-bold mb-2 ${
            lastResult.won ? 'text-jackpot-green' : 'text-jackpot-red'
          }`}>
            {lastResult.won ? 'YOU WON!' : 'YOU LOST!'}
          </div>
          <div className="text-white/80">
            Result: {lastResult.result.toUpperCase()}
          </div>
        </div>
      )}
      {/* Recent Flips */}
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Flips</h3>
        {recentFlips.length === 0 ? (
          <div className="text-center text-white/60 py-4">
            No flips yet. Start playing!
          </div>
        ) : (
          <div className="space-y-3">
            {recentFlips.map((flip) => (
              <div key={flip.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    flip.won ? 'bg-jackpot-green/20' : 'bg-jackpot-red/20'
                  }`}>
                    <span className="text-sm">{flip.won ? '🎉' : '😔'}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {flip.choice.toUpperCase()} - {flip.result.toUpperCase()}
                    </div>
                    <div className="text-sm text-white/70">
                      {flip.betAmount > 0 ? `${flip.betAmount} TON` : 'Free Flip'}
                    </div>
                  </div>
                </div>
                <div className={`text-right font-bold ${
                  flip.won ? 'text-jackpot-green' : 'text-jackpot-red'
                }`}>
                  {flip.won ? '+' : '-'}{flip.betAmount > 0 ? flip.betAmount : 0.1} TON
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-card rounded-xl p-4 border border-dark-border">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp size={20} className="text-jackpot-green" />
            <span className="font-semibold text-white">Win Rate</span>
          </div>
          <div className="text-2xl font-bold text-jackpot-green">
            {recentFlips.length > 0 
              ? Math.round((recentFlips.filter(f => f.won).length / recentFlips.length) * 100)
              : 0}%
          </div>
        </div>
        <div className="bg-dark-card rounded-xl p-4 border border-dark-border">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign size={20} className="text-coin-gold" />
            <span className="font-semibold text-white">Total Flips</span>
          </div>
          <div className="text-2xl font-bold text-coin-gold">{coinFlips.length}</div>
        </div>
      </div>
    </div>
  )
}

export default CoinFlip 