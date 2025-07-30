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
import WebApp from '@twa-dev/sdk';

// Environment variables
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const TELEGRAM_BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function App() {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<any>(null)

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
      setUser(WebApp.initDataUnsafe.user)
      console.log('Telegram User:', WebApp.initDataUnsafe.user)
      alert('User ID Telegram Anda: ' + WebApp.initDataUnsafe.user.id)
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
              <Route path="/admin" element={<Admin />} />
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