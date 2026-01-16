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

    // Material UI Divider renders as an hr element
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

describe('ArticleRenderer - Integration', () => {
  it('renders all content types in the provided order', () => {
    const content: ArticleContent[] = [
      { type: 'heading', variant: 'h2', content: 'Integration Heading' },
      { type: 'paragraph', content: 'Integration paragraph content', paragraph: true },
      { type: 'list', items: ['List Item One', 'List Item Two'] },
      {
        type: 'complexList',
        complexItems: [
          {
            primary: 'Complex Primary',
            secondary: 'Complex Secondary',
            link: { href: 'https://example.com/complex', title: 'Complex Link', target: '_blank' },
          },
        ],
      },
      { type: 'code', language: 'javascript', code: 'console.info("integration")' },
      { type: 'divider' },
      { type: 'link', title: 'Integration Link', href: 'https://example.com/integration' },
      {
        type: 'table',
        table: {
          headers: ['Col 1', 'Col 2'],
          rows: [
            ['Row 1 Col 1', 'Row 1 Col 2'],
            ['Row 2 Col 1', 'Row 2 Col 2'],
          ],
        },
      },
    ]

    const { container } = render(<ArticleRenderer content={content} />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Integration Heading' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Integration paragraph content')).toBeInTheDocument()
    expect(screen.getByText('List Item One')).toBeInTheDocument()
    expect(screen.getByText('Complex Primary')).toBeInTheDocument()
    expect(screen.getByText('console.info("integration")')).toBeInTheDocument()
    expect(screen.getByText('Integration Link')).toBeInTheDocument()
    expect(screen.getByText('Col 1')).toBeInTheDocument()
    expect(screen.getByText('Row 2 Col 2')).toBeInTheDocument()

    const textContent = container.textContent || ''
    const order = [
      textContent.indexOf('Integration Heading'),
      textContent.indexOf('Integration paragraph content'),
      textContent.indexOf('List Item One'),
      textContent.indexOf('Complex Primary'),
      textContent.indexOf('console.info("integration")'),
      textContent.indexOf('Integration Link'),
      textContent.indexOf('Col 1'),
    ]

    expect(order.every((value, index, arr) => index === 0 || value > arr[index - 1])).toBe(true)
  })
})
