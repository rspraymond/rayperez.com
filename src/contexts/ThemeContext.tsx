import React, { useEffect, useState } from 'react'
import { createTheme } from '@mui/material'
import { ThemeContextType, ThemeMode, ComputedTheme } from './ThemeTypes'
import { ThemeContext } from './createThemeContext'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const useSystemTheme = (): ComputedTheme => {
  const [systemTheme, setSystemTheme] = useState<ComputedTheme>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (event: MediaQueryListEvent) => {
        setSystemTheme(event.matches ? 'dark' : 'light')
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return systemTheme
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme-mode')
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored as ThemeMode
      }
    }
    return 'dark'
  })

  const systemTheme = useSystemTheme()

  const computedTheme: ComputedTheme = themeMode === 'system' ? systemTheme : themeMode

  const theme = computedTheme === 'light' ? lightTheme : darkTheme

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-mode', mode)
    }
  }

  const contextValue: ThemeContextType = {
    themeMode,
    computedTheme,
    theme,
    setThemeMode,
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
