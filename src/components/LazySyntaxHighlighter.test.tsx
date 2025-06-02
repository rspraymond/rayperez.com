import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'
import LazySyntaxHighlighter from './LazySyntaxHighlighter'

// Mock the SyntaxHighlighterWithTheme component
vi.mock('./SyntaxHighlighterWithTheme', () => ({
  default: ({ language, children }: { language: string; children: string }) => (
    <div data-testid='syntax-highlighter' data-language={language}>
      {children}
    </div>
  ),
}))

describe('LazySyntaxHighlighter', () => {
  // Sample test data
  const testProps = {
    language: 'javascript',
    children: 'const example = "code";',
  }

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clean up after each test
    vi.restoreAllMocks()
  })

  it('should show loading indicator initially', () => {
    // Arrange & Act
    render(<LazySyntaxHighlighter {...testProps} />)

    // Assert
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should render the syntax highlighter with correct props after loading', async () => {
    // Arrange & Act
    render(<LazySyntaxHighlighter {...testProps} />)

    // Assert - wait for the lazy component to load
    await waitFor(() => {
      const highlighter = screen.getByTestId('syntax-highlighter')
      expect(highlighter).toBeInTheDocument()
      expect(highlighter).toHaveAttribute('data-language', testProps.language)
      expect(highlighter.textContent).toBe(testProps.children)
    })
  })

  it('should handle different languages correctly', async () => {
    // Arrange - test with different language
    const pythonProps = {
      language: 'python',
      children: 'def example(): pass',
    }

    // Act
    render(<LazySyntaxHighlighter {...pythonProps} />)

    // Assert
    await waitFor(() => {
      const highlighter = screen.getByTestId('syntax-highlighter')
      expect(highlighter).toBeInTheDocument()
      expect(highlighter).toHaveAttribute('data-language', pythonProps.language)
      expect(highlighter.textContent).toBe(pythonProps.children)
    })
  })
})
