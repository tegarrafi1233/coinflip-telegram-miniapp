/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0F0F23',
        'dark-card': '#1A1A2E',
        'dark-border': '#2A2A3E',
        'coin-gold': '#FFD700',
        'coin-silver': '#C0C0C0',
        'coin-bronze': '#CD7F32',
        'jackpot-red': '#FF4444',
        'jackpot-purple': '#8B5CF6',
        'jackpot-blue': '#3B82F6',
        'jackpot-green': '#10B981',
        'ton-blue': '#0088CC',
        'ton-green': '#00D4AA',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'coin-flip': 'coinFlip 0.6s ease-in-out',
        'jackpot-glow': 'jackpotGlow 2s ease-in-out infinite',
      },
      keyframes: {
        coinFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(360deg)' }
        },
        jackpotGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 68, 68, 0.5)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 68, 68, 0.8)',
            transform: 'scale(1.05)'
          }
        }
      }
    },
  },
  plugins: [],
} 