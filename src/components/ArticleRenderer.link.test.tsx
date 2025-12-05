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

describe('ArticleRenderer - Link Content', () => {
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

  it('renders link without title using content', () => {
    const content: ArticleContent[] = [
      {
        type: 'link',
        content: 'Link Content',
        href: 'https://example.com',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const link = screen.getByText('Link Content')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('renders link with _self target (no rel attribute)', () => {
    const content: ArticleContent[] = [
      {
        type: 'link',
        title: 'Self Link',
        href: 'https://example.com',
        target: '_self',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const link = screen.getByText('Self Link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('target', '_self')
    expect(link).not.toHaveAttribute('rel')
  })

  it('renders link with _parent target (no rel attribute)', () => {
    const content: ArticleContent[] = [
      {
        type: 'link',
        title: 'Parent Link',
        href: 'https://example.com',
        target: '_parent',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const link = screen.getByText('Parent Link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('target', '_parent')
    expect(link).not.toHaveAttribute('rel')
  })

  it('renders link with _top target (no rel attribute)', () => {
    const content: ArticleContent[] = [
      {
        type: 'link',
        title: 'Top Link',
        href: 'https://example.com',
        target: '_top',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const link = screen.getByText('Top Link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('target', '_top')
    expect(link).not.toHaveAttribute('rel')
  })

  it('uses default _blank target when target is missing', () => {
    const content: ArticleContent[] = [
      {
        type: 'link',
        title: 'Default Target Link',
        href: 'https://example.com',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const link = screen.getByText('Default Target Link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).not.toHaveAttribute('rel')
  })

  it('prefers title over content when both are provided', () => {
    const content: ArticleContent[] = [
      {
        type: 'link',
        title: 'Preferred Title',
        content: 'Fallback Content',
        href: 'https://example.com/prefer-title',
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Preferred Title')).toBeInTheDocument()
    expect(screen.queryByText('Fallback Content')).not.toBeInTheDocument()
  })

  it('omits rel attribute when target is undefined but defaults to _blank', () => {
    const content: ArticleContent[] = [
      {
        type: 'link',
        title: 'Implicit Blank Target',
        href: 'https://example.com/implicit-blank',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const link = screen.getByText('Implicit Blank Target')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).not.toHaveAttribute('rel')
  })
})
