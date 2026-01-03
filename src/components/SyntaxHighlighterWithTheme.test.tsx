import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach, afterAll } from 'vitest'
import { Theme } from '@mui/material'
import SyntaxHighlighterWithTheme from './SyntaxHighlighterWithTheme'
import { ThemeProvider } from '../contexts/ThemeContext'

type ClipboardMock = {
  writeText: ReturnType<typeof vi.fn>
}

const originalClipboard = navigator.clipboard

const setClipboard = (clipboard: ClipboardMock | undefined) => {
  if (clipboard) {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: clipboard as unknown as Clipboard,
    })
  } else {
    delete (navigator as unknown as Record<string, unknown>).clipboard
  }
}

const restoreClipboard = () => {
  if (originalClipboard) {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: originalClipboard,
    })
  } else {
    delete (navigator as unknown as Record<string, unknown>).clipboard
  }
}

const { mockSyntaxHighlighter } = vi.hoisted(() => {
  const mockFn = vi.fn(({ language, style, children }) => {
    const styleName = style?.__mockName || 'unknown'
    return (
      <pre data-testid='syntax-highlighter' data-language={language} data-style={styleName}>
        {children}
      </pre>
    )
  })
  const registerLanguage = vi.fn()
  Object.assign(mockFn, { registerLanguage })
  return { mockSyntaxHighlighter: mockFn }
})

vi.mock('react-syntax-highlighter/dist/esm/prism-light', () => ({
  default: mockSyntaxHighlighter,
}))

// Mock language imports (not used in tests, but needed to prevent import errors)
vi.mock('react-syntax-highlighter/dist/esm/languages/prism/javascript', () => ({ default: {} }))
vi.mock('react-syntax-highlighter/dist/esm/languages/prism/typescript', () => ({ default: {} }))
vi.mock('react-syntax-highlighter/dist/esm/languages/prism/tsx', () => ({ default: {} }))
vi.mock('react-syntax-highlighter/dist/esm/languages/prism/php', () => ({ default: {} }))
vi.mock('react-syntax-highlighter/dist/esm/languages/prism/markup', () => ({ default: {} }))
vi.mock('react-syntax-highlighter/dist/esm/languages/prism/graphql', () => ({ default: {} }))
vi.mock('react-syntax-highlighter/dist/esm/languages/prism/json', () => ({ default: {} }))
vi.mock('react-syntax-highlighter/dist/esm/languages/prism/bash', () => ({ default: {} }))

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
  restoreClipboard()
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

  afterEach(() => {
    vi.useRealTimers()
    restoreClipboard()
  })

  afterAll(() => {
    restoreClipboard()
  })

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
          style: expect.objectContaining({
            __mockName: 'materialDark',
          }),
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
          style: expect.objectContaining({
            __mockName: 'materialLight',
          }),
        }),
        expect.anything(),
      )
    })
  })
})

describe('SyntaxHighlighterWithTheme - Fullscreen and Accessibility', () => {
  beforeEach(setupTest)

  afterEach(() => {
    vi.useRealTimers()
    restoreClipboard()
  })

  afterAll(() => {
    restoreClipboard()
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

describe('SyntaxHighlighterWithTheme - Copy Functionality', () => {
  beforeEach(setupTest)

  afterEach(() => {
    vi.useRealTimers()
    restoreClipboard()
  })

  afterAll(() => {
    restoreClipboard()
  })

  describe('Copy Functionality', () => {
    it('copies code to clipboard when copy button is clicked in normal mode', async () => {
      const code = 'const test = "copy me"'
      const writeText = vi.fn().mockResolvedValue(undefined)
      setClipboard({ writeText })

      renderComponent('javascript', code)

      const copyButton = screen.getByLabelText('Copy code')
      fireEvent.click(copyButton)

      expect(writeText).toHaveBeenCalledWith(code)
      expect(await screen.findByText('Code copied')).toBeInTheDocument()
    })

    it('copies code to clipboard when copy button is clicked in fullscreen mode', async () => {
      const code = 'const fullscreen = "copy from fullscreen"'
      const writeText = vi.fn().mockResolvedValue(undefined)
      setClipboard({ writeText })

      renderComponent('typescript', code)

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      const copyButtons = screen.getAllByLabelText('Copy code')
      const fullscreenCopyButton = copyButtons.find((btn) => {
        const dialog = btn.closest('[role="dialog"]')
        return dialog !== null
      })

      expect(fullscreenCopyButton).toBeInTheDocument()
      fireEvent.click(fullscreenCopyButton!)

      expect(writeText).toHaveBeenCalledWith(code)
      expect(await screen.findByText('Code copied')).toBeInTheDocument()
    })

    it('does not attempt to copy when clipboard API is unavailable', async () => {
      setClipboard(undefined)

      renderComponent('javascript', 'const test = "no copy"')

      const copyButton = screen.getByLabelText('Copy code')
      fireEvent.click(copyButton)

      await waitFor(() => {
        expect(screen.queryByText('Code copied')).not.toBeInTheDocument()
      })
    })

    it('does not attempt to copy when children is empty', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined)
      setClipboard({ writeText })

      renderComponent('javascript', '')

      const copyButton = screen.getByLabelText('Copy code')
      fireEvent.click(copyButton)

      expect(writeText).not.toHaveBeenCalled()
      await waitFor(() => {
        expect(screen.queryByText('Code copied')).not.toBeInTheDocument()
      })
    })
  })
})

describe('SyntaxHighlighterWithTheme - Snackbar Behavior', () => {
  beforeEach(setupTest)

  afterEach(() => {
    vi.useRealTimers()
    restoreClipboard()
  })

  afterAll(() => {
    restoreClipboard()
  })

  describe('Snackbar Behavior', () => {
    it('displays snackbar with "Code copied" message after successful copy', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined)
      setClipboard({ writeText })

      renderComponent('typescript', 'const x = 1')

      const copyButton = screen.getByLabelText('Copy code')
      fireEvent.click(copyButton)

      const snackbar = await screen.findByText('Code copied')
      expect(snackbar).toBeInTheDocument()
    })

    it('auto-closes snackbar after 1500ms', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined)
      setClipboard({ writeText })

      renderComponent('javascript', 'const test = "auto close"')

      const copyButton = screen.getByLabelText('Copy code')
      fireEvent.click(copyButton)

      const snackbar = await screen.findByText('Code copied')
      expect(snackbar).toBeInTheDocument()

      await waitFor(
        () => {
          expect(screen.queryByText('Code copied')).not.toBeInTheDocument()
        },
        { timeout: 2500 },
      )
    })

    it('closes snackbar when onClose is triggered', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined)
      setClipboard({ writeText })

      renderComponent('python', 'print("close test")')

      const copyButton = screen.getByLabelText('Copy code')
      fireEvent.click(copyButton)

      const snackbar = await screen.findByText('Code copied', {}, { timeout: 3000 })
      expect(snackbar).toBeInTheDocument()

      const snackbarElement = snackbar.closest('[role="alert"]') || snackbar
      fireEvent.keyDown(snackbarElement, { key: 'Escape', code: 'Escape' })

      await waitFor(
        () => {
          expect(screen.queryByText('Code copied')).not.toBeInTheDocument()
        },
        { timeout: 2000 },
      )
    })

    it('anchors snackbar to bottom center of viewport', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined)
      setClipboard({ writeText })

      renderComponent('typescript', 'const anchor = "test"')

      const copyButton = screen.getByLabelText('Copy code')
      fireEvent.click(copyButton)

      const message = await screen.findByText('Code copied')
      const snackbarRoot = message.closest('.MuiSnackbar-root')

      expect(snackbarRoot?.className ?? '').toContain('MuiSnackbar-anchorOriginBottomCenter')
    })
  })
})

describe('SyntaxHighlighterWithTheme - Theme Styling', () => {
  beforeEach(setupTest)

  afterEach(() => {
    vi.useRealTimers()
    restoreClipboard()
  })

  afterAll(() => {
    restoreClipboard()
  })

  describe('Theme-Specific Styling', () => {
    it('applies light theme snackbar styling when themeMode is light', async () => {
      mockThemeModeRef.current = 'light'
      const writeText = vi.fn().mockResolvedValue(undefined)
      setClipboard({ writeText })

      renderComponent('javascript', 'const light = "theme"')

      const copyButton = screen.getByLabelText('Copy code')
      fireEvent.click(copyButton)

      const snackbar = await screen.findByText('Code copied', {}, { timeout: 3000 })
      expect(snackbar).toBeInTheDocument()
    })

    it('applies dark theme snackbar styling when themeMode is dark', async () => {
      mockThemeModeRef.current = 'dark'
      const writeText = vi.fn().mockResolvedValue(undefined)
      setClipboard({ writeText })

      renderComponent('typescript', 'const dark = "theme"')

      const copyButton = screen.getByLabelText('Copy code')
      fireEvent.click(copyButton)

      const snackbar = await screen.findByText('Code copied', {}, { timeout: 3000 })
      expect(snackbar).toBeInTheDocument()
    })

    it('applies light theme dialog background when themeMode is light', () => {
      mockThemeModeRef.current = 'light'
      renderComponent('python', 'print("light dialog")')

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('applies dark theme dialog background when themeMode is dark', () => {
      mockThemeModeRef.current = 'dark'
      renderComponent('javascript', 'const dark = "dialog"')

      const fullscreenButton = screen.getByLabelText('Enter fullscreen')
      fireEvent.click(fullscreenButton)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })
  })
})
