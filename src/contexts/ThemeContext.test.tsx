import { renderHook, act, waitFor } from '@testing-library/react'
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
  const listeners: Array<(e: MediaQueryListEvent) => void> = []
  let currentMatches = matches

  const mockMediaQueryList = {
    matches: currentMatches,
    media: '(prefers-color-scheme: dark)',
    addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
      if (event === 'change') {
        listeners.push(listener)
      }
    }),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
    addListener: vi.fn(), // Deprecated but part of MediaQueryList
    removeListener: vi.fn(), // Deprecated but part of MediaQueryList
    _triggerChange: (newMatches: boolean) => {
      currentMatches = newMatches
      mockMediaQueryList.matches = newMatches
      listeners.forEach((listener) => {
        listener({
          matches: newMatches,
          media: '(prefers-color-scheme: dark)',
        } as MediaQueryListEvent)
      })
    },
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
    it('defaults to dark theme when no stored preference', () => {
      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('dark')
      expect(result.current.computedTheme).toBe('dark')
    })

    it('uses stored theme preference from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('light')

      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('light')
      expect(result.current.computedTheme).toBe('light')
    })

    it('uses system preference when mode is system', () => {
      localStorageMock.getItem.mockReturnValue('system')
      matchMediaMock = createMatchMediaMock(false) // System prefers light
      window.matchMedia = matchMediaMock as never

      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('system')
      expect(result.current.computedTheme).toBe('light')
    })

    it('detects dark system preference correctly', () => {
      localStorageMock.getItem.mockReturnValue('system')
      matchMediaMock = createMatchMediaMock(true) // System prefers dark
      window.matchMedia = matchMediaMock as never

      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('system')
      expect(result.current.computedTheme).toBe('dark')
    })
  })

  describe('Theme Switching', () => {
    it('switches to light theme and persists to localStorage', () => {
      const { result } = renderWithThemeProvider()

      act(() => {
        result.current.setThemeMode('light')
      })

      expect(result.current.themeMode).toBe('light')
      expect(result.current.computedTheme).toBe('light')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme-mode', 'light')
    })

    it('switches to dark theme and persists to localStorage', () => {
      const { result } = renderWithThemeProvider()

      act(() => {
        result.current.setThemeMode('dark')
      })

      expect(result.current.themeMode).toBe('dark')
      expect(result.current.computedTheme).toBe('dark')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme-mode', 'dark')
    })

    it('switches to system theme and persists to localStorage', () => {
      const { result } = renderWithThemeProvider()

      act(() => {
        result.current.setThemeMode('system')
      })

      expect(result.current.themeMode).toBe('system')
      expect(result.current.computedTheme).toBe('dark') // matchMedia mock returns dark
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme-mode', 'system')
    })
  })

  describe('System Preference Changes', () => {
    it('updates computed theme when system preference changes and mode is system', async () => {
      localStorageMock.getItem.mockReturnValue('system')
      const { result } = renderWithThemeProvider()

      expect(result.current.computedTheme).toBe('dark')

      // Simulate system preference change to light
      act(() => {
        const mockMediaQuery = matchMediaMock() as ReturnType<typeof matchMediaMock> & {
          _triggerChange: (matches: boolean) => void
        }
        mockMediaQuery._triggerChange(false)
      })

      await waitFor(() => {
        expect(result.current.computedTheme).toBe('light')
      })
    })

    it('does not update computed theme when system preference changes and mode is not system', async () => {
      localStorageMock.getItem.mockReturnValue('light')
      const { result } = renderWithThemeProvider()

      expect(result.current.computedTheme).toBe('light')

      // Simulate system preference change to dark
      act(() => {
        const mockMediaQuery = matchMediaMock() as ReturnType<typeof matchMediaMock> & {
          _triggerChange: (matches: boolean) => void
        }
        mockMediaQuery._triggerChange(true)
      })

      // Should remain light since mode is explicitly light, not system
      expect(result.current.computedTheme).toBe('light')
    })
  })

  describe('Edge Cases', () => {
    it('handles invalid localStorage values by defaulting to dark', () => {
      localStorageMock.getItem.mockReturnValue('invalid-theme')

      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('dark')
      expect(result.current.computedTheme).toBe('dark')
    })

    it('handles localStorage access errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage access denied')
      })

      const { result } = renderWithThemeProvider()

      expect(result.current.themeMode).toBe('dark')
      expect(result.current.computedTheme).toBe('dark')
    })

    it('handles matchMedia not being available', () => {
      window.matchMedia = undefined as never
      localStorageMock.getItem.mockReturnValue('system')

      const { result } = renderWithThemeProvider()

      // Should fallback to dark when matchMedia is not available
      expect(result.current.computedTheme).toBe('dark')
    })
  })

  describe('Cleanup', () => {
    it('removes system preference listener on unmount', () => {
      const removeEventListenerSpy = vi.fn()
      const customMock = vi.fn(() => ({
        matches: true,
        media: '(prefers-color-scheme: dark)',
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerSpy,
        dispatchEvent: vi.fn(),
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }))
      window.matchMedia = customMock as never

      const { unmount } = renderWithThemeProvider()

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalled()
    })
  })
})
