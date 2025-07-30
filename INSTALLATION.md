# 🚀 Installation Guide - TON Game Mini App

## 📋 Prerequisites

Before installing the TON Game Mini App, make sure you have the following installed:

### 1. Node.js (Required)
Download and install Node.js from [nodejs.org](https://nodejs.org/)

**Recommended version**: Node.js 16.x or higher

**To verify installation:**
```bash
node --version
npm --version
```

### 2. Git (Optional but Recommended)
Download and install Git from [git-scm.com](https://git-scm.com/)

**To verify installation:**
```bash
git --version
```

## 🔧 Installation Steps

### Step 1: Clone or Download the Project

**Option A: Using Git (Recommended)**
```bash
git clone <repository-url>
cd ton-game-miniapp
```

**Option B: Download ZIP**
1. Download the project ZIP file
2. Extract to your desired location
3. Open terminal/command prompt in the project folder

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React 18
- TypeScript
- Tailwind CSS
- TON SDK
- Telegram Web App SDK
- Lucide React Icons

### Step 3: Environment Setup

Create a `.env` file in the root directory:

```env
# Telegram Bot Configuration
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here

# TON Network Configuration
VITE_TON_NETWORK=mainnet

# Game Configuration
VITE_CONVERSION_RATE=1000
VITE_MIN_CONVERSION=1000

# Optional: Analytics
VITE_ANALYTICS_ID=your_analytics_id
```

### Step 4: Start Development Server

```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

### Step 5: Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 🐛 Troubleshooting

### Common Issues

#### 1. "npm is not recognized"
**Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)

#### 2. "Cannot find module" errors
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 3. Port 3000 already in use
**Solution**: 
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- --port 3001
```

#### 4. TypeScript errors
**Solution**: 
```bash
npm install --save-dev @types/node
```

### Windows-Specific Issues

#### 1. PowerShell Execution Policy
If you get execution policy errors:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 2. Path Issues
Make sure Node.js is added to your PATH environment variable.

## 📱 Telegram Bot Setup

### 1. Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot`
3. Follow the instructions to create your bot
4. Save the bot token

### 2. Configure Bot Commands

Send this to @BotFather:
```
/setcommands
start - Start the TON Game Mini App
help - Show help and instructions
balance - Check your TON balance
games - Play mini games
tasks - View daily tasks
leaderboard - See rankings
```

### 3. Set Up Mini App

1. Send `/newapp` to @BotFather
2. Select your bot
3. Enter app title: "TON Game Mini App"
4. Enter app description: "Play games and earn TON cryptocurrency"
5. Upload app icon (optional)
6. Enter your app URL (after deployment)

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

1. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/ton-game-miniapp",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. Deploy:
```bash
npm install --save-dev gh-pages
npm run deploy
```

## 🔒 Security Checklist

- [ ] Set up environment variables
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Validate user inputs
- [ ] Secure TON wallet integration
- [ ] Set up SSL/HTTPS
- [ ] Configure proper headers

## 📊 Testing

### Run Tests
```bash
npm test
```

### Run Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs**: Look for error messages in the terminal
2. **Verify versions**: Make sure you're using compatible versions
3. **Clear cache**: Try clearing npm cache: `npm cache clean --force`
4. **Check documentation**: Refer to the main README.md
5. **Open an issue**: Create a GitHub issue with detailed information

## 📞 Support

- **Documentation**: Check the main README.md
- **Issues**: Create a GitHub issue
- **Community**: Join our Discord server
- **Email**: support@tongame.com

---

**Happy coding! 🎮✨** 