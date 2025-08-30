import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ArticleRenderer from './ArticleRenderer'
import { ArticleContent } from '../types/articleContent'

// Mock LazySyntaxHighlighter to avoid complex dependencies
vi.mock('./LazySyntaxHighlighter', () => ({
  default: ({ children, language }: { children: string; language: string }) => (
    <div data-testid='syntax-highlighter' data-language={language}>
      {children}
    </div>
  ),
}))

describe('ArticleRenderer', () => {
  it('renders heading content correctly', () => {
    const content: ArticleContent[] = [
      {
        type: 'heading',
        variant: 'h3',
        content: 'Test Heading',
        gutterBottom: true,
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Test Heading')).toBeInTheDocument()
    expect(screen.getByText('Test Heading').tagName).toBe('H3')
  })

  it('renders paragraph content correctly', () => {
    const content: ArticleContent[] = [
      {
        type: 'paragraph',
        variant: 'body1',
        content: 'Test paragraph content',
        paragraph: true,
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Test paragraph content')).toBeInTheDocument()
  })

  it('renders list content correctly', () => {
    const content: ArticleContent[] = [
      {
        type: 'list',
        items: ['Item 1', 'Item 2', 'Item 3'],
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

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

  it('renders link content correctly', () => {
    const content: ArticleContent[] = [
      {
        type: 'link',
        title: 'Test Link',
        href: 'https://example.com',
        target: '_blank',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const link = screen.getByText('Test Link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

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

  it('uses default values when optional properties are missing', () => {
    const content: ArticleContent[] = [
      {
        type: 'heading',
        content: 'Default Heading',
      },
      {
        type: 'paragraph',
        content: 'Default paragraph',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const heading = screen.getByText('Default Heading')
    const paragraph = screen.getByText('Default paragraph')

    expect(heading.tagName).toBe('H3') // Default variant
    expect(paragraph).toBeInTheDocument()
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
