import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ThemeProvider } from './ThemeContext'
import { useTheme } from './useTheme'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Create a proper MediaQueryList mock
const createMatchMediaMock = (matches: boolean) => {
  const mockMediaQueryList = {
    matches,
    media: '(prefers-color-scheme: dark)',
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }

  return vi.fn(() => mockMediaQueryList)
}

describe('ThemeContext', () => {
  let matchMediaMock: ReturnType<typeof createMatchMediaMock>

  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    matchMediaMock = createMatchMediaMock(true) // Default to dark system preference
    window.matchMedia = matchMediaMock as never
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderWithThemeProvider = () => {
    return renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    })
  }

  describe('Initial State', () => {
    it('defaults to dark theme based on system preference when no stored preference', () => {
      matchMediaMock = createMatchMediaMock(true) // System prefers dark
      window.matchMedia = matchMediaMock as never

      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('dark')
    })

    it('defaults to light theme based on system preference when no stored preference', () => {
      matchMediaMock = createMatchMediaMock(false) // System prefers light
      window.matchMedia = matchMediaMock as never

      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('light')
    })

    it('uses stored theme preference from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('light')

      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('light')
    })

    it('falls back to dark theme when matchMedia is not available', () => {
      window.matchMedia = undefined as never

      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('dark')
    })
  })

  describe('Theme Switching', () => {
    it('switches to light theme and persists to localStorage', () => {
      const { result } = renderWithThemeProvider()

      act(() => {
        result.current.setThemeMode('light')
      })

      expect(result.current.themeMode).toBe('light')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme-mode', 'light')
    })

    it('switches to dark theme and persists to localStorage', () => {
      const { result } = renderWithThemeProvider()

      act(() => {
        result.current.setThemeMode('dark')
      })

      expect(result.current.themeMode).toBe('dark')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme-mode', 'dark')
    })
  })

  describe('Edge Cases', () => {
    it('handles invalid localStorage values by defaulting to system preference', () => {
      localStorageMock.getItem.mockReturnValue('invalid-theme')
      matchMediaMock = createMatchMediaMock(false) // System prefers light
      window.matchMedia = matchMediaMock as never

      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('light')
    })

    it('handles localStorage access errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage access denied')
      })
      matchMediaMock = createMatchMediaMock(true) // System prefers dark
      window.matchMedia = matchMediaMock as never

      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('dark')
    })

    it('handles localStorage setItem errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage access denied')
      })

      const { result } = renderWithThemeProvider()

      act(() => {
        result.current.setThemeMode('light')
      })

      // Should still update the state even if localStorage fails
      expect(result.current.themeMode).toBe('light')
    })
  })
})
