import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import ErrorBoundary from './ErrorBoundary'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

const ThrowError: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>Working component</div>
}

// Mock console.error to avoid noise in test output
const originalConsoleError = console.error

describe('ErrorBoundary', () => {
  beforeEach(() => {
    console.error = vi.fn()
    Object.defineProperty(window, 'location', {
      value: {
        reload: vi.fn(),
      },
      writable: true,
    })
  })

  afterEach(() => {
    console.error = originalConsoleError
    vi.clearAllMocks()
  })

  it('renders children when there is no error', () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </TestWrapper>,
    )

    expect(screen.getByText('Working component')).toBeInTheDocument()
  })

  it('renders error UI when there is an error', () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>,
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(
      screen.getByText('We apologize for the inconvenience. Please try refreshing the page.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Refresh Page' })).toBeInTheDocument()
  })

  it('calls window.location.reload when refresh button is clicked', () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>,
    )

    const refreshButton = screen.getByRole('button', { name: 'Refresh Page' })
    fireEvent.click(refreshButton)

    expect(window.location.reload).toHaveBeenCalledOnce()
  })

  it('shows error details in development mode', () => {
    // Since we're running in test mode, which is similar to dev mode,
    // we can test the current behavior
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>,
    )

    // In development/test mode, error details should be visible
    if (import.meta.env.DEV) {
      expect(screen.getByText('Error Details (Development Only):')).toBeInTheDocument()
      expect(screen.getByText(/Error: Test error/)).toBeInTheDocument()
    }
  })

  it('logs error to console in development mode', () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>,
    )

    // In development/test mode, errors should be logged
    if (import.meta.env.DEV) {
      expect(console.error).toHaveBeenCalledWith(
        'Error caught by boundary:',
        expect.any(Error),
        expect.any(Object),
      )
    }
  })
})
