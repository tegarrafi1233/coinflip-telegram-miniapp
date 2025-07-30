import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'
import Home from './pages/Home'
import CoinFlip from './pages/CoinFlip'
import Referrals from './pages/Referrals'
import Wallet from './pages/Wallet'
import Navigation from './components/Navigation'
import { GameProvider } from './context/GameContext'
import WelcomeBonus from './components/WelcomeBonus'
import LoadingScreen from './components/LoadingScreen'
import Admin from './pages/Admin'

// Environment variables
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const TELEGRAM_BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// Admin whitelist - tambahkan ID Telegram admin di sini
const ADMIN_WHITELIST = [
  7609121993, // ID Telegram Anda
  // Tambahkan ID admin lain di sini jika diperlukan
]

function App() {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminTapCount, setAdminTapCount] = useState(0)
  const [showAdminAccess, setShowAdminAccess] = useState(false)

  useEffect(() => {
    // Initialize Telegram Web App
    WebApp.ready()
    WebApp.expand()
    
    // Set theme colors
    document.documentElement.style.setProperty('--tg-theme-bg-color', WebApp.themeParams.bg_color || '#0F0F23')
    document.documentElement.style.setProperty('--tg-theme-text-color', WebApp.themeParams.text_color || '#ffffff')
    document.documentElement.style.setProperty('--tg-theme-button-color', WebApp.themeParams.button_color || '#FFD700')
    document.documentElement.style.setProperty('--tg-theme-button-text-color', WebApp.themeParams.button_text_color || '#000000')
    
    // Get user data from Telegram
    if (WebApp.initDataUnsafe?.user) {
      const telegramUser = WebApp.initDataUnsafe.user
      setUser(telegramUser)
      console.log('Telegram User:', telegramUser)
      
      // Check if user is admin
      const isUserAdmin = ADMIN_WHITELIST.includes(telegramUser.id)
      setIsAdmin(isUserAdmin)
      
      if (isUserAdmin) {
        console.log('✅ User is admin!')
      } else {
        console.log('❌ User is not admin')
      }
      
      // Show alert only for non-admin users to get their ID
      if (!isUserAdmin) {
        alert('User ID Telegram Anda: ' + telegramUser.id)
      }
    }
    
    // Show loading for 3 seconds
    setTimeout(() => {
      setIsReady(true)
    }, 3000)
  }, [])

  // Secret admin access handler
  const handleAdminTap = () => {
    const newCount = adminTapCount + 1
    setAdminTapCount(newCount)
    
    // Reset count after 3 seconds
    setTimeout(() => {
      setAdminTapCount(0)
    }, 3000)
    
    // Show admin access after 5 taps
    if (newCount >= 5) {
      setShowAdminAccess(true)
      setAdminTapCount(0)
    }
  }

  if (!isReady) {
    return <LoadingScreen />
  }

  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-card">
          {/* Secret Admin Access Button */}
          <div 
            className="fixed top-4 left-4 z-50 cursor-pointer"
            onClick={handleAdminTap}
            title="Tap 5 times for admin access"
          >
            <div className="text-xs text-white/30 font-mono">
              {adminTapCount > 0 ? `${adminTapCount}/5` : '•••'}
            </div>
          </div>

          {/* Admin Access Modal */}
          {showAdminAccess && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-dark-card p-6 rounded-xl border border-dark-border max-w-sm mx-4">
                <h3 className="text-lg font-bold text-white mb-4">🔐 Admin Access</h3>
                <p className="text-white/70 mb-4">
                  {isAdmin 
                    ? "You have admin privileges. Access admin panel?"
                    : "You don't have admin privileges."
                  }
                </p>
                <div className="flex space-x-2">
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setShowAdminAccess(false)
                        window.location.href = '/admin'
                      }}
                      className="px-4 py-2 bg-coin-gold text-black rounded-lg font-medium"
                    >
                      Access Admin
                    </button>
                  )}
                  <button
                    onClick={() => setShowAdminAccess(false)}
                    className="px-4 py-2 bg-dark-border text-white rounded-lg font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coinflip" element={<CoinFlip />} />
              <Route path="/referrals" element={<Referrals />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/admin" element={<Admin isAdmin={isAdmin} user={user} />} />
              <Route path="/admin-panel" element={<Admin isAdmin={isAdmin} user={user} />} />
              <Route path="/a" element={<Admin isAdmin={isAdmin} user={user} />} />
            </Routes>
            <Navigation />
          </div>
          <WelcomeBonus />
        </div>
      </Router>
    </GameProvider>
  )
}

export default App 