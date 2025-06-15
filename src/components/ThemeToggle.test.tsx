import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Theme } from '@mui/material'
import ThemeToggle from './ThemeToggle'
import { ThemeProvider } from '../contexts/ThemeContext'
import { useTheme } from '../contexts/useTheme'

// Mock the useTheme hook
vi.mock('../contexts/useTheme')

const mockUseTheme = vi.mocked(useTheme)

describe('ThemeToggle', () => {
  const mockSetThemeMode = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockSetThemeMode.mockClear()
  })

  const renderWithTheme = (themeMode: 'light' | 'dark' = 'dark') => {
    mockUseTheme.mockReturnValue({
      themeMode,
      theme: {} as Theme,
      setThemeMode: mockSetThemeMode,
    })

    return render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    )
  }

  describe('Icon Display', () => {
    it('displays dark mode icon when theme is dark', () => {
      renderWithTheme('dark')

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Current theme: dark. Switch to light theme')

      const icon = screen.getByTestId('DarkModeIcon')
      expect(icon).toBeInTheDocument()
    })

    it('displays light mode icon when theme is light', () => {
      renderWithTheme('light')

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Current theme: light. Switch to dark theme')

      const icon = screen.getByTestId('LightModeIcon')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Theme Switching', () => {
    it('switches from light to dark when clicked', () => {
      renderWithTheme('light')

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockSetThemeMode).toHaveBeenCalledWith('dark')
    })

    it('switches from dark to light when clicked', () => {
      renderWithTheme('dark')

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(mockSetThemeMode).toHaveBeenCalledWith('light')
    })
  })

  describe('Tooltips', () => {
    it('shows correct tooltip for dark theme', () => {
      renderWithTheme('dark')

      const button = screen.getByRole('button')
      expect(button).toHaveAccessibleName('Current theme: dark. Switch to light theme')
    })

    it('shows correct tooltip for light theme', () => {
      renderWithTheme('light')

      const button = screen.getByRole('button')
      expect(button).toHaveAccessibleName('Current theme: light. Switch to dark theme')
    })
  })

  describe('Accessibility', () => {
    it('has proper button role', () => {
      renderWithTheme('dark')

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('has descriptive aria-label', () => {
      renderWithTheme('dark')

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label')
      expect(button.getAttribute('aria-label')).toContain('Current theme:')
    })
  })
})
