import React, { useState, useMemo } from 'react'
import { createTheme } from '@mui/material'
import { ThemeContextType, ThemeMode } from './ThemeTypes'
import { ThemeContext } from './createThemeContext'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  shape: {
    borderRadius: 12,
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  shape: {
    borderRadius: 12,
  },
})

const getSystemTheme = (): ThemeMode => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'dark'
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('theme-mode')
        if (stored && ['light', 'dark'].includes(stored)) {
          return stored as ThemeMode
        }
      } catch {
        // localStorage access denied or not available
      }
    }
    // Default to system preference if no stored preference
    return getSystemTheme()
  })

  const theme = themeMode === 'light' ? lightTheme : darkTheme

  const setThemeMode = React.useCallback((mode: ThemeMode) => {
    setThemeModeState(mode)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme-mode', mode)
      } catch {
        // localStorage access denied or not available
      }
    }
  }, [])

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      themeMode,
      theme,
      setThemeMode,
    }),
    [themeMode, theme, setThemeMode],
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
