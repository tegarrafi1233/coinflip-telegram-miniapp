import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Types
export interface User {
  id: string
  username: string
  points: number
  level: number
  experience: number
  tonBalance: number
  referrals: number
  totalEarned: number
  isNewUser: boolean
  hasWelcomeBonus: boolean
  freeFlips: number
}

export interface Task {
  id: string
  title: string
  description: string
  points: number
  type: 'referral' | 'daily' | 'achievement'
  completed: boolean
  progress: number
  maxProgress: number
  reward: number // TON reward
}

export interface CoinFlip {
  id: string
  betAmount: number
  choice: 'heads' | 'tails'
  result: 'heads' | 'tails' | null
  won: boolean | null
  timestamp: Date
}

interface GameState {
  user: User | null
  tasks: Task[]
  coinFlips: CoinFlip[]
  isLoading: boolean
  showWelcomeBonus: boolean
}

type GameAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_POINTS'; payload: number }
  | { type: 'UPDATE_TON_BALANCE'; payload: number }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'ADD_REFERRAL'; payload: number }
  | { type: 'ADD_COIN_FLIP'; payload: CoinFlip }
  | { type: 'USE_FREE_FLIP'; payload: void }
  | { type: 'CLAIM_WELCOME_BONUS'; payload: void }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'SHOW_WELCOME_BONUS'; payload: boolean }

const initialState: GameState = {
  user: null,
  tasks: [],
  coinFlips: [],
  isLoading: true,
  showWelcomeBonus: false
}

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    
    case 'UPDATE_POINTS':
      if (!state.user) return state
      const newPoints = state.user.points + action.payload
      const newLevel = Math.floor(newPoints / 100) + 1
      const newExperience = newPoints % 100
      
      return {
        ...state,
        user: {
          ...state.user,
          points: newPoints,
          level: newLevel,
          experience: newExperience
        }
      }
    
    case 'UPDATE_TON_BALANCE':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          tonBalance: action.payload
        } : null
      }
    
    case 'COMPLETE_TASK':
      const task = state.tasks.find(t => t.id === action.payload)
      if (!task || task.completed) return state
      
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload
            ? { ...t, completed: true, progress: t.maxProgress }
            : t
        ),
        user: state.user ? {
          ...state.user,
          tonBalance: state.user.tonBalance + task.reward
        } : null
      }
    
    case 'ADD_REFERRAL':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          referrals: state.user.referrals + 1,
          tonBalance: state.user.tonBalance + 0.1 // 0.1 TON per referral
        } : null
      }
    
    case 'ADD_COIN_FLIP':
      return {
        ...state,
        coinFlips: [action.payload, ...state.coinFlips]
      }
    
    case 'USE_FREE_FLIP':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          freeFlips: Math.max(0, state.user.freeFlips - 1)
        } : null
      }
    
    case 'CLAIM_WELCOME_BONUS':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          hasWelcomeBonus: true,
          freeFlips: state.user.freeFlips + 3,
          tonBalance: state.user.tonBalance + 0.1
        } : null,
        showWelcomeBonus: false
      }
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_TASKS':
      return { ...state, tasks: action.payload }
    
    case 'SHOW_WELCOME_BONUS':
      return { ...state, showWelcomeBonus: action.payload }
    
    default:
      return state
  }
}

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  addPoints: (points: number) => void
  completeTask: (taskId: string) => void
  addReferral: () => void
  addCoinFlip: (betAmount: number, choice: 'heads' | 'tails', result: 'heads' | 'tails') => void
  useFreeFlip: () => void
  claimWelcomeBonus: () => void
  canWithdraw: () => boolean
  canDeposit: (amount: number) => boolean
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // Initialize user data
  useEffect(() => {
    const initializeUser = () => {
      // Simulate user data from Telegram
      const mockUser: User = {
        id: '123456789',
        username: 'Player',
        points: 0,
        level: 1,
        experience: 0,
        tonBalance: 0,
        referrals: 0,
        totalEarned: 0,
        isNewUser: true,
        hasWelcomeBonus: false,
        freeFlips: 0
      }
      
      dispatch({ type: 'SET_USER', payload: mockUser })
      
      // Initialize tasks - only referral tasks
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Invite 1 Friend',
          description: 'Invite a friend to earn 0.1 TON',
          points: 100,
          type: 'referral',
          completed: false,
          progress: 0,
          maxProgress: 1,
          reward: 0.1
        },
        {
          id: '2',
          title: 'Invite 5 Friends',
          description: 'Invite 5 friends to earn 0.5 TON',
          points: 500,
          type: 'referral',
          completed: false,
          progress: 0,
          maxProgress: 5,
          reward: 0.5
        },
        {
          id: '3',
          title: 'Invite 10 Friends',
          description: 'Invite 10 friends to earn 1 TON',
          points: 1000,
          type: 'referral',
          completed: false,
          progress: 0,
          maxProgress: 10,
          reward: 1.0
        }
      ]
      
      dispatch({ type: 'SET_TASKS', payload: mockTasks })
      dispatch({ type: 'SET_LOADING', payload: false })
      
      // Show welcome bonus for new users
      if (mockUser.isNewUser && !mockUser.hasWelcomeBonus) {
        dispatch({ type: 'SHOW_WELCOME_BONUS', payload: true })
      }
    }
    
    initializeUser()
  }, [])

  const addPoints = (points: number) => {
    dispatch({ type: 'UPDATE_POINTS', payload: points })
  }

  const completeTask = (taskId: string) => {
    dispatch({ type: 'COMPLETE_TASK', payload: taskId })
  }

  const addReferral = () => {
    dispatch({ type: 'ADD_REFERRAL', payload: 1 })
  }

  const addCoinFlip = (betAmount: number, choice: 'heads' | 'tails', result: 'heads' | 'tails') => {
    const won = choice === result
    const coinFlip: CoinFlip = {
      id: Date.now().toString(),
      betAmount,
      choice,
      result,
      won,
      timestamp: new Date()
    }
    
    dispatch({ type: 'ADD_COIN_FLIP', payload: coinFlip })
    
    if (won) {
      dispatch({ type: 'UPDATE_TON_BALANCE', payload: state.user!.tonBalance + betAmount * 2 })
    }
  }

  const useFreeFlip = () => {
    dispatch({ type: 'USE_FREE_FLIP', payload: undefined })
  }

  const claimWelcomeBonus = () => {
    dispatch({ type: 'CLAIM_WELCOME_BONUS', payload: undefined })
  }

  const canWithdraw = () => {
    return state.user ? state.user.tonBalance >= 1.5 : false
  }

  const canDeposit = (amount: number) => {
    return amount >= 1.0
  }

  const value: GameContextType = {
    state,
    dispatch,
    addPoints,
    completeTask,
    addReferral,
    addCoinFlip,
    useFreeFlip,
    claimWelcomeBonus,
    canWithdraw,
    canDeposit
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
} 