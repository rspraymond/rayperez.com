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

describe('ArticleRenderer - Paragraph Content', () => {
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

  it('renders paragraph with body2 variant', () => {
    const content: ArticleContent[] = [
      {
        type: 'paragraph',
        variant: 'body2',
        content: 'Body2 paragraph',
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Body2 paragraph')).toBeInTheDocument()
  })

  it('renders paragraph with caption variant', () => {
    const content: ArticleContent[] = [
      {
        type: 'paragraph',
        variant: 'caption',
        content: 'Caption text',
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Caption text')).toBeInTheDocument()
  })

  it('handles paragraph prop false', () => {
    const content: ArticleContent[] = [
      {
        type: 'paragraph',
        variant: 'body1',
        content: 'No paragraph spacing',
        paragraph: false,
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('No paragraph spacing')).toBeInTheDocument()
  })

  it('uses default body1 variant when variant is missing', () => {
    const content: ArticleContent[] = [
      {
        type: 'paragraph',
        content: 'Default paragraph',
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Default paragraph')).toBeInTheDocument()
  })
})
