export type ThemeMode = 'light' | 'dark' | 'system'
export type ComputedTheme = 'light' | 'dark'

export interface ThemeContextType {
  themeMode: ThemeMode
  computedTheme: ComputedTheme
  theme: import('@mui/material').Theme
  setThemeMode: (mode: ThemeMode) => void
}
