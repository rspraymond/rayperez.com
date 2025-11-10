import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Theme } from '@mui/material'
import SyntaxHighlighterWithTheme from './SyntaxHighlighterWithTheme'
import { ThemeProvider } from '../contexts/ThemeContext'

const { mockSyntaxHighlighter } = vi.hoisted(() => {
  const mockFn = vi.fn(({ language, style, children }) => {
    const styleName = style?.__mockName || 'unknown'
    return (
      <pre data-testid='syntax-highlighter' data-language={language} data-style={styleName}>
        {children}
      </pre>
    )
  })
  return { mockSyntaxHighlighter: mockFn }
})

vi.mock('react-syntax-highlighter', () => ({
  Prism: mockSyntaxHighlighter,
}))

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  materialLight: { __mockName: 'materialLight' },
  materialDark: { __mockName: 'materialDark' },
}))

const { mockThemeModeRef, mockSetThemeMode } = vi.hoisted(() => {
  const themeModeRef = { current: 'dark' as 'light' | 'dark' }
  return {
    mockThemeModeRef: themeModeRef,
    mockSetThemeMode: vi.fn(),
  }
})

vi.mock('../contexts/useTheme', () => ({
  useTheme: () => {
    // Read current value each time useTheme is called
    return {
      themeMode: mockThemeModeRef.current,
      theme: {} as Theme,
      setThemeMode: mockSetThemeMode,
    }
  },
}))

const setupTest = () => {
  vi.clearAllMocks()
  mockThemeModeRef.current = 'dark'
  mockSyntaxHighlighter.mockClear()
}

const renderComponent = (language = 'typescript', code = 'const x = 1') => {
  return render(
    <ThemeProvider>
      <SyntaxHighlighterWithTheme language={language}>{code}</SyntaxHighlighterWithTheme>
    </ThemeProvider>,
  )
}

describe('SyntaxHighlighterWithTheme', () => {
  beforeEach(setupTest)

  describe('Rendering and Props', () => {
    it('renders code content', () => {
      const code = 'const test = "hello"'
      renderComponent('javascript', code)

      const highlighter = screen.getByTestId('syntax-highlighter')
      expect(highlighter).toHaveTextContent(code)
    })

    it('passes language prop to SyntaxHighlighter', () => {
      renderComponent('python', 'print("hello")')

      const highlighter = screen.getByTestId('syntax-highlighter')
      expect(highlighter).toHaveAttribute('data-language', 'python')
    })

    it('renders with different languages', () => {
      const { rerender } = renderComponent('typescript', 'const x = 1')

      let highlighter = screen.getByTestId('syntax-highlighter')
      expect(highlighter).toHaveAttribute('data-language', 'typescript')

      rerender(
        <ThemeProvider>
          <SyntaxHighlighterWithTheme language='javascript'>
            console.log()
          </SyntaxHighlighterWithTheme>
        </ThemeProvider>,
      )

      highlighter = screen.getByTestId('syntax-highlighter')
      expect(highlighter).toHaveAttribute('data-language', 'javascript')
    })
  })

  describe('Theme Selection', () => {
    it('uses dark theme when themeMode is dark', () => {
      mockThemeModeRef.current = 'dark'
      renderComponent()

      const highlighter = screen.getByTestId('syntax-highlighter')
      expect(highlighter).toHaveAttribute('data-style', 'materialDark')
      expect(mockSyntaxHighlighter).toHaveBeenCalledWith(
        expect.objectContaining({
          style: { __mockName: 'materialDark' },
        }),
        expect.anything(),
      )
    })

    it('uses light theme when themeMode is light', () => {
      mockThemeModeRef.current = 'light'
      renderComponent()

      const highlighter = screen.getByTestId('syntax-highlighter')
      expect(highlighter).toHaveAttribute('data-style', 'materialLight')
      expect(mockSyntaxHighlighter).toHaveBeenCalledWith(
        expect.objectContaining({
          style: { __mockName: 'materialLight' },
        }),
        expect.anything(),
      )
    })
  })

  describe('Fullscreen Toggle', () => {
    it('shows fullscreen button when not in fullscreen mode', () => {
      renderComponent()

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      expect(fullscreenButton).toBeInTheDocument()
    })

    it('opens fullscreen dialog when fullscreen button is clicked', () => {
      renderComponent()

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('hides fullscreen button when dialog is open', () => {
      renderComponent()

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      expect(screen.queryByLabelText('Enter fullscreen')).not.toBeInTheDocument()
    })

    it('shows exit fullscreen button when dialog is open', () => {
      renderComponent()

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      const exitButton = screen.getByLabelText('Exit fullscreen')
      expect(exitButton).toBeInTheDocument()
    })

    it('closes fullscreen dialog when exit button is clicked', async () => {
      renderComponent()

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      const exitButton = screen.getByLabelText('Exit fullscreen')
      fireEvent.click(exitButton)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('shows fullscreen button again after closing dialog', async () => {
      renderComponent()

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      const exitButton = screen.getByLabelText('Exit fullscreen')
      fireEvent.click(exitButton)

      await waitFor(() => {
        expect(screen.getByLabelText('Enter fullscreen')).toBeInTheDocument()
      })
    })

    it('renders code in fullscreen dialog', () => {
      const code = 'const fullscreen = true'
      renderComponent('typescript', code)

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      const dialogHighlighters = screen.getAllByTestId('syntax-highlighter')
      expect(dialogHighlighters.length).toBeGreaterThan(0)
      expect(dialogHighlighters.some((el) => el.textContent === code)).toBe(true)
    })

    it('closes dialog when onClose is triggered', async () => {
      renderComponent()

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      const dialog = screen.getByRole('dialog')
      fireEvent.keyDown(dialog, { key: 'Escape' })

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper aria-label for fullscreen button', () => {
      renderComponent()

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      expect(fullscreenButton).toBeInTheDocument()
    })

    it('has proper aria-label for exit fullscreen button', () => {
      renderComponent()

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      const exitButton = screen.getByLabelText('Exit fullscreen')
      expect(exitButton).toBeInTheDocument()
    })

    it('has proper aria-label for dialog', () => {
      renderComponent()

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
      // The dialog container has the aria-label
      const dialogContainer = screen.getByLabelText('Code block fullscreen dialog')
      expect(dialogContainer).toBeInTheDocument()
    })
  })
})
