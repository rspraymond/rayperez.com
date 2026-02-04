import 'vite'

declare module 'vite' {
  interface UserConfig {
    ssgOptions?: {
      script?: string
      formatting?: string
      onPageRendered?: (path: string, html: string) => string | void
      onFinished?: () => void
    }
  }
}
