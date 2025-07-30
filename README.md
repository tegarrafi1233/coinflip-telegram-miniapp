# 🎮 TON Game Mini App

A Telegram Mini App that combines gaming with TON blockchain rewards. Players can earn points through various mini-games and tasks, then convert them to TON cryptocurrency.

## ✨ Features

### 🎯 Core Gameplay
- **Mini Games**: Three engaging games to earn points
  - Memory Match: Match cards to test memory
  - Quick Math: Solve math problems under time pressure
  - Color Rush: Remember and repeat color sequences
- **Daily Tasks**: Complete tasks for bonus rewards
- **Point System**: Earn points through games and tasks
- **Level Progression**: Level up as you earn more points

### 💎 TON Integration
- **Point to TON Conversion**: Convert 1000 points to 1 TON
- **Wallet Management**: View TON balance and transaction history
- **Real-time Balance**: Track your TON earnings

### 🏆 Social Features
- **Leaderboard**: Compete with players worldwide
- **Ranking System**: See your position among all players
- **Achievement Tracking**: Monitor your progress and stats

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Telegram Bot Token (for production)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ton-game-miniapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 🎮 Games Overview

### Memory Match
- **Objective**: Match pairs of cards
- **Points**: 20 base + time/move bonuses
- **Daily Limit**: 5 plays
- **Strategy**: Remember card positions and minimize moves

### Quick Math
- **Objective**: Solve math problems quickly
- **Points**: 15 base + accuracy/time bonuses
- **Daily Limit**: 10 plays
- **Strategy**: Focus on speed and accuracy

### Color Rush
- **Objective**: Repeat color sequences
- **Points**: 25 base + level bonuses
- **Daily Limit**: 3 plays
- **Strategy**: Pay attention to sequence order

## 📋 Task System

### Daily Tasks
- **Daily Login**: 10 points
- **Play 3 Games**: 50 points
- **Complete 5 Tasks**: 100 points (weekly)

### Task Types
- **Daily**: Reset every 24 hours
- **Weekly**: Reset every 7 days
- **Achievement**: Permanent tasks

## 💰 TON Conversion

### Conversion Rate
- **1000 Points = 1 TON**
- Minimum conversion: 1000 points
- No maximum limit

### Wallet Features
- View TON balance
- Convert points to TON
- Transaction history
- Wallet address management

## 🏗️ Project Structure

```
src/
├── components/
│   ├── games/
│   │   ├── MemoryGame.tsx
│   │   ├── MathGame.tsx
│   │   └── ColorGame.tsx
│   └── Navigation.tsx
├── context/
│   └── GameContext.tsx
├── pages/
│   ├── Home.tsx
│   ├── Games.tsx
│   ├── Tasks.tsx
│   ├── Wallet.tsx
│   └── Leaderboard.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Telegram Integration**: @twa-dev/sdk
- **TON Integration**: ton, ton-core, ton-crypto
- **Build Tool**: Vite
- **State Management**: React Context + useReducer

## 🔧 Configuration

### Environment Variables
Create a `.env` file:
```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_TON_NETWORK=mainnet
VITE_CONVERSION_RATE=1000
```

### Telegram Bot Setup
1. Create a bot with @BotFather
2. Get your bot token
3. Set up webhook for mini app
4. Configure bot commands

## 🎨 Customization

### Colors
Modify `tailwind.config.js` to customize colors:
```javascript
colors: {
  'ton-blue': '#0088CC',
  'ton-green': '#00D4AA',
  'game-purple': '#6366F1',
  'game-pink': '#EC4899',
  'game-yellow': '#F59E0B',
}
```

### Game Settings
Adjust game parameters in `GameContext.tsx`:
- Point rewards
- Daily limits
- Difficulty levels
- Conversion rates

## 📱 Telegram Mini App Setup

### Bot Configuration
1. Set bot commands:
```
start - Start the game
help - Show help
balance - Check TON balance
```

2. Configure Mini App:
```javascript
WebApp.ready();
WebApp.expand();
WebApp.setHeaderColor('#0088CC');
```

### Web App Manifest
```json
{
  "name": "TON Game Mini App",
  "description": "Play games and earn TON",
  "version": "1.0.0",
  "platform": "telegram"
}
```

## 🔒 Security Considerations

- Validate all user inputs
- Implement rate limiting for games
- Secure TON wallet integration
- Protect against point farming
- Implement anti-cheat measures

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Custom Server
```bash
npm run build
# Serve dist/ folder with your preferred server
```

## 📊 Analytics & Monitoring

### Key Metrics
- Daily active users
- Games played per day
- Points earned per user
- TON conversion rate
- User retention

### Monitoring
- Error tracking
- Performance monitoring
- User behavior analytics
- TON transaction monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Discord**: [Community Server](link-to-discord)
- **Email**: support@tongame.com

## 🙏 Acknowledgments

- Telegram for the Mini App platform
- TON Foundation for blockchain infrastructure
- React and Vite communities
- All contributors and testers

---

**Made with ❤️ for the TON community** 