import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Coins, Users, Wallet, Shield } from 'lucide-react'

const Navigation: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/coinflip', icon: Coins, label: 'Coin Flip' },
    { path: '/referrals', icon: Users, label: 'Referrals' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
    { path: '/admin', icon: Shield, label: 'Admin' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-card/90 backdrop-blur-md border-t border-dark-border">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-coin-gold bg-coin-gold/10'
                  : 'text-white/60 hover:text-coin-gold'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigation 