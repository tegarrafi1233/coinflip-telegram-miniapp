/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_BOT_TOKEN: string
  readonly VITE_TELEGRAM_BOT_USERNAME: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_TON_NETWORK: string
  readonly VITE_MIN_DEPOSIT: string
  readonly VITE_MIN_WITHDRAW: string
  readonly VITE_REFERRAL_REWARD: string
  readonly VITE_WELCOME_BONUS: string
  readonly VITE_FREE_FLIPS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Telegram Web App types
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready(): void
        expand(): void
        close(): void
        initDataUnsafe: {
          user?: {
            id: number
            is_bot: boolean
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
          }
        }
        themeParams: {
          bg_color?: string
          text_color?: string
          button_color?: string
          button_text_color?: string
        }
      }
    }
  }
} 