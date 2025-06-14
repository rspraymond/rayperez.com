import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '../test-utils'
import SyntaxHighlighterWithTheme from './SyntaxHighlighterWithTheme'

vi.mock('react-syntax-highlighter', () => ({
  Prism: ({
    language,
    style,
    children,
  }: {
    language: string
    style: Record<string, unknown>
    children: string
  }) => (
    <div data-testid='syntax-highlighter' data-language={language} data-has-style={!!style}>
      {children}
    </div>
  ),
}))

describe('SyntaxHighlighterWithTheme', () => {
  it('renders without errors', () => {
    render(
      <SyntaxHighlighterWithTheme language='javascript'>
        const test = 'example';
      </SyntaxHighlighterWithTheme>,
    )
    expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument()
  })

  it('passes the correct language prop to SyntaxHighlighter', () => {
    const testLanguage = 'typescript'
    render(
      <SyntaxHighlighterWithTheme language={testLanguage}>
        const test: string = 'example';
      </SyntaxHighlighterWithTheme>,
    )
    expect(screen.getByTestId('syntax-highlighter')).toHaveAttribute('data-language', testLanguage)
  })

  it('renders the code content correctly', () => {
    const testCode = 'const meaningOfLife = 42;'
    render(
      <SyntaxHighlighterWithTheme language='javascript'>{testCode}</SyntaxHighlighterWithTheme>,
    )
    const highlighterElement = screen.getByTestId('syntax-highlighter')
    expect(highlighterElement).toHaveTextContent(testCode)
  })
})
