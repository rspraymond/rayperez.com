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

describe('ArticleRenderer - Divider Content', () => {
  it('renders divider content correctly', () => {
    const content: ArticleContent[] = [
      {
        type: 'divider',
      },
    ]

    render(<ArticleRenderer content={content} />)

    // Material-UI Divider renders as an hr element
    expect(document.querySelector('hr')).toBeInTheDocument()
  })
})

describe('ArticleRenderer - Multiple Content Items', () => {
  it('renders multiple content items in sequence', () => {
    const content: ArticleContent[] = [
      {
        type: 'heading',
        variant: 'h3',
        content: 'Section Title',
      },
      {
        type: 'paragraph',
        content: 'Section description',
      },
      {
        type: 'list',
        items: ['Point 1', 'Point 2'],
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Section Title')).toBeInTheDocument()
    expect(screen.getByText('Section description')).toBeInTheDocument()
    expect(screen.getByText('Point 1')).toBeInTheDocument()
    expect(screen.getByText('Point 2')).toBeInTheDocument()
  })
})

describe('ArticleRenderer - Edge Cases', () => {
  it('handles empty content array', () => {
    const content: ArticleContent[] = []

    render(<ArticleRenderer content={content} />)

    // Should render without errors
    expect(document.body).toBeInTheDocument()
  })

  it('handles unknown content type gracefully', () => {
    const content: ArticleContent[] = [
      {
        type: 'unknown' as never,
        content: 'This should not render',
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.queryByText('This should not render')).not.toBeInTheDocument()
  })

  it('handles empty complexItems array', () => {
    const content: ArticleContent[] = [
      {
        type: 'complexList',
        complexItems: [],
      },
    ]

    render(<ArticleRenderer content={content} />)

    // Should render list container without errors
    expect(document.querySelector('ul')).toBeInTheDocument()
  })

  it('handles code with undefined code value', () => {
    const content: ArticleContent[] = [
      {
        type: 'code',
        language: 'javascript',
        code: undefined as never,
      },
    ]

    render(<ArticleRenderer content={content} />)

    const syntaxHighlighter = screen.getByTestId('syntax-highlighter')
    expect(syntaxHighlighter).toBeInTheDocument()
    expect(syntaxHighlighter).toHaveTextContent('')
  })
})
