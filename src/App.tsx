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

  if (!isReady) {
    return <LoadingScreen />
  }

  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-dark-bg to-dark-card">
          <div className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coinflip" element={<CoinFlip />} />
              <Route path="/referrals" element={<Referrals />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/admin" element={<Admin isAdmin={isAdmin} user={user} />} />
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