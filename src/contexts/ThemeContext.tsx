import React, { useState, useMemo } from 'react'
import { createTheme } from '@mui/material'
import { ThemeContextType, ThemeMode } from './ThemeTypes'
import { ThemeContext } from './createThemeContext'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f7fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#334155',
    },
    divider: '#e2e8f0',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
        }),
      },
    },
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
