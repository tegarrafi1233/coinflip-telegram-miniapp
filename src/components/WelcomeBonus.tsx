import React from 'react'
import { useGame } from '../context/GameContext'
import { Gift, X, Coins, Zap } from 'lucide-react'

const WelcomeBonus: React.FC = () => {
  const { state, claimWelcomeBonus } = useGame()
  const { showWelcomeBonus } = state

  if (!showWelcomeBonus) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-card rounded-2xl p-6 max-w-sm w-full mx-4 border border-coin-gold/20">
        <div className="text-center">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Gift size={24} className="text-coin-gold" />
              <span className="text-xl font-bold text-white">Welcome Bonus!</span>
            </div>
            <button
              onClick={() => claimWelcomeBonus()}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} className="text-white/60" />
            </button>
          </div>

          {/* Bonus Content */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-coin-gold/20 to-coin-bronze/20 rounded-xl p-4">
              <div className="text-2xl font-bold gradient-text mb-2">🎉 Congratulations!</div>
              <p className="text-white/80 text-sm">
                Welcome to Coin Flip! Claim your exclusive welcome bonus to get started.
              </p>
            </div>

            {/* Bonus Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-coin-gold/20 rounded-full flex items-center justify-center">
                    <Coins size={20} className="text-coin-gold" />
                  </div>
                  <div>
                    <div className="text-white font-medium">0.1 TON</div>
                    <div className="text-sm text-white/60">Starting Balance</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-jackpot-purple/20 rounded-full flex items-center justify-center">
                    <Zap size={20} className="text-jackpot-purple" />
                  </div>
                  <div>
                    <div className="text-white font-medium">3 Free Flips</div>
                    <div className="text-sm text-white/60">Risk-free coin flips</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Claim Button */}
            <button
              onClick={() => claimWelcomeBonus()}
              className="w-full py-4 px-6 bg-gradient-to-r from-coin-gold to-coin-bronze text-black font-bold rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Gift size={20} />
              <span>Claim Welcome Bonus</span>
            </button>

            {/* Terms */}
            <p className="text-xs text-white/50">
              * Welcome bonus can only be claimed once per account
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBonus 