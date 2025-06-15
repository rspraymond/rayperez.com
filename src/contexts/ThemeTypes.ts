export type ThemeMode = 'light' | 'dark'

export interface ThemeContextType {
  themeMode: ThemeMode
  theme: import('@mui/material').Theme
  setThemeMode: (mode: ThemeMode) => void
}
