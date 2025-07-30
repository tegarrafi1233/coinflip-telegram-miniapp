import React, { useState } from 'react'
import { useGame } from '../context/GameContext'
import { Users, Copy, Share2, Gift, TrendingUp, DollarSign } from 'lucide-react'

const Referrals: React.FC = () => {
  const { state, completeTask } = useGame()
  const { user, tasks } = state
  const [copied, setCopied] = useState(false)

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const referralLink = `https://t.me/your_bot?start=${user.id}`
  const referralTasks = tasks.filter(task => task.type === 'referral')

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Coin Flip Jackpot!',
        text: 'Flip coins and win TON! Use my referral link to get started.',
        url: referralLink
      })
    } else {
      copyReferralLink()
    }
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">👥 Referrals</h1>
        <p className="text-white/80">Invite friends and earn TON together!</p>
      </div>

      {/* Referral Stats */}
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-jackpot-purple">{user.referrals}</div>
            <div className="text-sm text-white/70">Total Referrals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-coin-gold">{(user.referrals * 0.1).toFixed(1)}</div>
            <div className="text-sm text-white/70">TON Earned</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-jackpot-purple/20 to-jackpot-blue/20 rounded-xl p-4">
          <div className="text-center">
            <div className="text-sm text-white/80 mb-1">Earn 0.1 TON per referral</div>
            <div className="text-lg font-bold text-coin-gold">Instant Rewards!</div>
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
        <h2 className="text-xl font-semibold text-white mb-4">Your Referral Link</h2>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-sm text-white/70 mb-2">Share this link with friends:</div>
            <div className="flex items-center space-x-2">
              <code className="flex-1 text-sm font-mono text-white/90 break-all">
                {referralLink}
              </code>
              <button
                onClick={copyReferralLink}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Copy size={16} className="text-white" />
              </button>
            </div>
            {copied && (
              <div className="text-xs text-jackpot-green mt-2">✓ Copied to clipboard!</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={shareReferralLink}
              className="py-3 px-4 bg-gradient-to-r from-jackpot-purple to-jackpot-blue text-white rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
            
            <button
              onClick={copyReferralLink}
              className="py-3 px-4 bg-gradient-to-r from-coin-gold to-coin-bronze text-black rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <Copy size={16} />
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Referral Tasks */}
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
        <h3 className="text-lg font-semibold text-white mb-4">Referral Rewards</h3>
        
        <div className="space-y-4">
          {referralTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border ${
                task.completed 
                  ? 'bg-jackpot-green/10 border-jackpot-green/30' 
                  : 'bg-white/5 border-dark-border'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    task.completed ? 'bg-jackpot-green/20' : 'bg-jackpot-purple/20'
                  }`}>
                    <Gift size={16} className={task.completed ? 'text-jackpot-green' : 'text-jackpot-purple'} />
                  </div>
                  <div>
                    <div className={`font-semibold ${
                      task.completed ? 'text-jackpot-green' : 'text-white'
                    }`}>
                      {task.title}
                    </div>
                    <div className="text-sm text-white/70">{task.description}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-coin-gold">+{task.reward} TON</div>
                  <div className="text-sm text-white/70">
                    {task.progress}/{task.maxProgress}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    task.completed ? 'bg-jackpot-green' : 'bg-jackpot-purple'
                  }`}
                  style={{ width: `${(task.progress / task.maxProgress) * 100}%` }}
                />
              </div>

              {/* Action Button */}
              <button
                onClick={() => completeTask(task.id)}
                disabled={task.completed || task.progress < task.maxProgress}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                  task.completed
                    ? 'bg-jackpot-green/20 text-jackpot-green cursor-not-allowed'
                    : task.progress < task.maxProgress
                    ? 'bg-white/10 text-white/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-jackpot-purple to-jackpot-blue text-white hover:scale-105 active:scale-95'
                }`}
              >
                {task.completed ? 'Completed' : task.progress < task.maxProgress ? 'In Progress' : 'Claim Reward'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-jackpot-purple/20 to-jackpot-blue/20 rounded-2xl p-6 border border-jackpot-purple/30">
        <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-jackpot-purple rounded-full flex items-center justify-center text-xs font-bold text-white">
              1
            </div>
            <div>
              <div className="text-white font-medium">Share your referral link</div>
              <div className="text-sm text-white/70">Send it to friends via Telegram, social media, or any platform</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-jackpot-purple rounded-full flex items-center justify-center text-xs font-bold text-white">
              2
            </div>
            <div>
              <div className="text-white font-medium">Friends join using your link</div>
              <div className="text-sm text-white/70">They get their welcome bonus and start playing</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-jackpot-purple rounded-full flex items-center justify-center text-xs font-bold text-white">
              3
            </div>
            <div>
              <div className="text-white font-medium">Earn instant rewards</div>
              <div className="text-sm text-white/70">Get 0.1 TON for each successful referral</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
        <h3 className="text-lg font-semibold text-white mb-4">💡 Pro Tips</h3>
        
        <div className="space-y-2 text-sm text-white/80">
          <div>• Share on Telegram groups and channels</div>
          <div>• Post on social media with your wins</div>
          <div>• Create a personal referral campaign</div>
          <div>• Offer to help new users get started</div>
          <div>• The more friends you invite, the more you earn!</div>
        </div>
      </div>
    </div>
  )
}

export default Referrals 