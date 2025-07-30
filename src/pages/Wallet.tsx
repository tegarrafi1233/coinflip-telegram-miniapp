import React, { useState } from 'react'
import { useGame } from '../context/GameContext'
import { Wallet as WalletIcon, Coins, ArrowRight, Copy, ExternalLink, Zap, Plus, Minus } from 'lucide-react'

const Wallet: React.FC = () => {
  const { state, canWithdraw, canDeposit } = useGame()
  const { user } = state
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount)
    if (amount && canDeposit(amount)) {
      // In a real app, this would trigger TON wallet payment
      console.log(`Depositing ${amount} TON`)
      setDepositAmount('')
      setShowDeposit(false)
    }
  }

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount)
    if (amount && canWithdraw() && amount <= user.tonBalance) {
      // In a real app, this would trigger TON withdrawal
      console.log(`Withdrawing ${amount} TON`)
      setWithdrawAmount('')
      setShowWithdraw(false)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText('EQD...example...address')
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">💎 TON Wallet</h1>
        <p className="text-white/80">Manage your TON balance and transactions</p>
      </div>

      {/* TON Balance Card */}
      <div className="bg-gradient-to-br from-coin-gold to-coin-bronze rounded-2xl p-6 text-black">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <WalletIcon size={24} />
            <span className="text-xl font-semibold">TON Balance</span>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{user.tonBalance.toFixed(3)}</div>
            <div className="text-sm text-black/70">TON</div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-xl p-4 mb-4">
          <div className="text-sm text-black/70 mb-2">Wallet Address</div>
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-black/90">EQD...example...address</code>
            <button
              onClick={copyAddress}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={() => setShowDeposit(true)}
            className="flex-1 py-2 px-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
          >
            <Plus size={16} />
            <span>Deposit</span>
          </button>
          <button 
            onClick={() => setShowWithdraw(true)}
            disabled={!canWithdraw()}
            className="flex-1 py-2 px-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium flex items-center justify-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus size={16} />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-card rounded-2xl p-6 max-w-sm w-full mx-4 border border-dark-border">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Deposit TON</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/70 mb-2">
                    Amount (TON)
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Enter amount (min 1.0)"
                    min="1.0"
                    step="0.1"
                    className="w-full px-4 py-3 bg-white/10 border border-dark-border rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-coin-gold"
                  />
                </div>

                {depositAmount && parseFloat(depositAmount) < 1.0 && (
                  <div className="text-sm text-jackpot-red">
                    Minimum deposit is 1.0 TON
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowDeposit(false)}
                    className="flex-1 py-3 px-4 bg-gray-500/50 text-white rounded-xl hover:bg-gray-500/70 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeposit}
                    disabled={!depositAmount || parseFloat(depositAmount) < 1.0}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-coin-gold to-coin-bronze text-black rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-card rounded-2xl p-6 max-w-sm w-full mx-4 border border-dark-border">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Withdraw TON</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/70 mb-2">
                    Amount (TON)
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount (min 1.5)"
                    min="1.5"
                    max={user.tonBalance}
                    step="0.1"
                    className="w-full px-4 py-3 bg-white/10 border border-dark-border rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-coin-gold"
                  />
                </div>

                {withdrawAmount && parseFloat(withdrawAmount) < 1.5 && (
                  <div className="text-sm text-jackpot-red">
                    Minimum withdrawal is 1.5 TON
                  </div>
                )}

                {withdrawAmount && parseFloat(withdrawAmount) > user.tonBalance && (
                  <div className="text-sm text-jackpot-red">
                    Insufficient balance
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowWithdraw(false)}
                    className="flex-1 py-3 px-4 bg-gray-500/50 text-white rounded-xl hover:bg-gray-500/70 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount || parseFloat(withdrawAmount) < 1.5 || parseFloat(withdrawAmount) > user.tonBalance}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-jackpot-purple to-jackpot-blue text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-jackpot-green/20 rounded-full flex items-center justify-center">
                <ArrowRight size={16} className="text-jackpot-green" />
              </div>
              <div>
                <div className="text-white font-medium">Coin Flip Win</div>
                <div className="text-sm text-white/70">2 minutes ago</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-medium">+0.2 TON</div>
              <div className="text-sm text-white/70">Heads - Won</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-jackpot-purple/20 rounded-full flex items-center justify-center">
                <Coins size={16} className="text-jackpot-purple" />
              </div>
              <div>
                <div className="text-white font-medium">Referral Bonus</div>
                <div className="text-sm text-white/70">1 hour ago</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-medium">+0.1 TON</div>
              <div className="text-sm text-white/70">New referral</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-coin-gold/20 rounded-full flex items-center justify-center">
                <Zap size={16} className="text-coin-gold" />
              </div>
              <div>
                <div className="text-white font-medium">Welcome Bonus</div>
                <div className="text-sm text-white/70">2 hours ago</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-medium">+0.1 TON</div>
              <div className="text-sm text-white/70">New user bonus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-dark-card rounded-xl p-4 border border-dark-border hover:border-coin-gold/50 transition-colors">
          <div className="flex items-center space-x-2 mb-2">
            <ExternalLink size={20} className="text-coin-gold" />
            <span className="font-semibold text-white">View on Explorer</span>
          </div>
          <p className="text-sm text-white/70">Check your wallet on TON Explorer</p>
        </button>
        
        <button className="bg-dark-card rounded-xl p-4 border border-dark-border hover:border-coin-gold/50 transition-colors">
          <div className="flex items-center space-x-2 mb-2">
            <Coins size={20} className="text-coin-gold" />
            <span className="font-semibold text-white">Buy TON</span>
          </div>
          <p className="text-sm text-white/70">Purchase TON from exchanges</p>
        </button>
      </div>

      {/* Limits Info */}
      <div className="bg-gradient-to-r from-jackpot-purple/20 to-jackpot-blue/20 rounded-xl p-4 border border-jackpot-purple/30">
        <div className="text-center">
          <div className="text-sm text-white/80 mb-2">Transaction Limits</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-bold text-coin-gold">Min Deposit: 1.0 TON</div>
            </div>
            <div>
              <div className="font-bold text-jackpot-purple">Min Withdraw: 1.5 TON</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet 