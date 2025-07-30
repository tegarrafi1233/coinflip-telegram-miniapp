import React from 'react'
import { useGame } from '../context/GameContext'
import { Star, TrendingUp, Gift, Zap, Coins, Users, Trophy } from 'lucide-react'

const Home: React.FC = () => {
  const { state } = useGame()
  const { user } = state

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          🪙 Coin Flip Jackpot
        </h1>
        <p className="text-white/80">Flip coins, win TON, invite friends!</p>
      </div>

      {/* User Profile Card */}
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-coin-gold to-coin-bronze rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">T</span>
            </div>
            <div>
              <div className="text-white font-semibold">{user.username}</div>
              <div className="text-white/60 text-sm">#{user.id}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-coin-gold">{user.tonBalance.toFixed(3)}</div>
            <div className="text-sm text-white/70">TON Balance</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-white">{user.level}</div>
            <div className="text-xs text-white/70">Level</div>
          </div>
          <div>
            <div className="text-lg font-bold text-jackpot-purple">{user.referrals}</div>
            <div className="text-xs text-white/70">Referrals</div>
          </div>
          <div>
            <div className="text-lg font-bold text-coin-gold">{user.freeFlips}</div>
            <div className="text-xs text-white/70">Free Flips</div>
          </div>
        </div>
      </div>

      {/* Share Your Wins Banner */}
      <div className="bg-gradient-to-r from-jackpot-purple to-jackpot-blue rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy size={20} className="text-jackpot-red" />
            <span className="font-semibold">Share Your Wins</span>
          </div>
          <p className="text-white/90 text-sm mb-3">
            Celebrate your jackpot victories! Share your biggest coin flip wins with the community.
          </p>
          <button className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
            Share Now
          </button>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20">
          <Trophy size={80} className="text-white" />
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-card rounded-xl p-4 border border-dark-border hover:border-coin-gold/50 transition-colors">
          <div className="flex items-center space-x-2 mb-2">
            <Users size={20} className="text-jackpot-purple" />
            <span className="font-semibold text-white">Referrals</span>
          </div>
          <p className="text-white/70 text-sm">Invite friends & earn 0.1 TON each</p>
        </div>
        
        <div className="bg-dark-card rounded-xl p-4 border border-dark-border hover:border-coin-gold/50 transition-colors">
          <div className="flex items-center space-x-2 mb-2">
            <Coins size={20} className="text-coin-gold" />
            <span className="font-semibold text-white">Wallet</span>
          </div>
          <p className="text-white/70 text-sm">Manage your TON balance</p>
        </div>
        
        <div className="bg-gradient-to-r from-coin-gold to-coin-bronze rounded-xl p-4 text-black">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">🎰</span>
            <span className="font-semibold">Coin Flip</span>
          </div>
          <p className="text-black/80 text-sm">Flip & win TON instantly</p>
        </div>
        
        <div className="bg-dark-card rounded-xl p-4 border border-dark-border hover:border-coin-gold/50 transition-colors">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">♠️</span>
            <span className="font-semibold text-white">$JAQ NFT</span>
          </div>
          <p className="text-white/70 text-sm">Free mint available</p>
        </div>
      </div>

      {/* Live Payments Banner */}
      <div className="bg-gradient-to-r from-jackpot-red to-jackpot-purple rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap size={20} className="text-coin-gold" />
            <span className="font-semibold">Live Payments</span>
          </div>
          <span className="text-sm">→</span>
        </div>
        <p className="text-white/80 text-sm mt-1">Play coin flip and boost your rewards</p>
      </div>

      {/* Quick Stats */}
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
        <h3 className="text-lg font-semibold text-white mb-4">Your Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-coin-gold">{user.totalEarned.toFixed(3)}</div>
            <div className="text-sm text-white/70">Total Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-jackpot-purple">{user.referrals}</div>
            <div className="text-sm text-white/70">Referrals</div>
          </div>
        </div>
      </div>

      {/* Withdrawal Info */}
      <div className="bg-gradient-to-r from-coin-gold/20 to-coin-bronze/20 rounded-xl p-4 border border-coin-gold/30">
        <div className="text-center">
          <div className="text-sm text-white/80 mb-1">Minimum Withdrawal</div>
          <div className="text-lg font-bold text-coin-gold">1.5 TON</div>
          <div className="text-xs text-white/60 mt-1">
            {user.tonBalance >= 1.5 ? '✅ Ready to withdraw' : `Need ${(1.5 - user.tonBalance).toFixed(3)} more TON`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 