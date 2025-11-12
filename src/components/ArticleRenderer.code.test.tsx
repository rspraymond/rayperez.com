import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ArticleRenderer from './ArticleRenderer'
import { ArticleContent } from '../types/articleContent'

vi.mock('./LazySyntaxHighlighter', () => ({
  default: ({ children, language }: { children: string; language: string }) => (
    <div data-testid='syntax-highlighter' data-language={language}>
      {children}
    </div>
  ),
}))

describe('ArticleRenderer - Code Content', () => {
  it('renders code content correctly', () => {
    const content: ArticleContent[] = [
      {
        type: 'code',
        language: 'javascript',
        code: 'console.log("Hello World")',
        elevation: 3,
      },
    ]

    render(<ArticleRenderer content={content} />)

    const syntaxHighlighter = screen.getByTestId('syntax-highlighter')
    expect(syntaxHighlighter).toBeInTheDocument()
    expect(syntaxHighlighter).toHaveAttribute('data-language', 'javascript')
    expect(syntaxHighlighter).toHaveTextContent('console.log("Hello World")')
  })

  it('uses default text language when language is missing', () => {
    const content: ArticleContent[] = [
      {
        type: 'code',
        code: 'some code',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const syntaxHighlighter = screen.getByTestId('syntax-highlighter')
    expect(syntaxHighlighter).toHaveAttribute('data-language', 'text')
  })

  it('handles empty code string', () => {
    const content: ArticleContent[] = [
      {
        type: 'code',
        language: 'javascript',
        code: '',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const syntaxHighlighter = screen.getByTestId('syntax-highlighter')
    expect(syntaxHighlighter).toBeInTheDocument()
    expect(syntaxHighlighter).toHaveTextContent('')
  })

  it('uses default elevation 3 when elevation is missing', () => {
    const content: ArticleContent[] = [
      {
        type: 'code',
        language: 'typescript',
        code: 'const x = 1',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const syntaxHighlighter = screen.getByTestId('syntax-highlighter')
    expect(syntaxHighlighter).toBeInTheDocument()
  })

  it('renders code block with custom styling', () => {
    const content: ArticleContent[] = [
      {
        type: 'code',
        language: 'typescript',
        code: 'const test = "value"',
        elevation: 5,
        style: { marginTop: '20px' },
      },
    ]

    render(<ArticleRenderer content={content} />)

    const syntaxHighlighter = screen.getByTestId('syntax-highlighter')
    expect(syntaxHighlighter).toBeInTheDocument()
    expect(syntaxHighlighter).toHaveAttribute('data-language', 'typescript')
  })
})
