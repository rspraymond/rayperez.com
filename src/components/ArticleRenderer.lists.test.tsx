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

describe('ArticleRenderer - List Content', () => {
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

  it('handles empty items array', () => {
    const content: ArticleContent[] = [
      {
        type: 'list',
        items: [],
      },
    ]

    render(<ArticleRenderer content={content} />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })
})

describe('ArticleRenderer - ComplexList Basic', () => {
  it('renders complexList with primary text only', () => {
    const content: ArticleContent[] = [
      {
        type: 'complexList',
        complexItems: [
          {
            primary: 'Primary Item 1',
          },
          {
            primary: 'Primary Item 2',
          },
        ],
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Primary Item 1')).toBeInTheDocument()
    expect(screen.getByText('Primary Item 2')).toBeInTheDocument()
  })

  it('renders complexList with primary and secondary text', () => {
    const content: ArticleContent[] = [
      {
        type: 'complexList',
        complexItems: [
          {
            primary: 'Main Text',
            secondary: 'Secondary description',
          },
        ],
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Main Text')).toBeInTheDocument()
    expect(screen.getByText('Secondary description')).toBeInTheDocument()
  })
})

describe('ArticleRenderer - ComplexList Links', () => {
  it('renders complexList with items containing links', () => {
    const content: ArticleContent[] = [
      {
        type: 'complexList',
        complexItems: [
          {
            primary: 'Item with Link',
            secondary: 'Description',
            link: {
              href: 'https://example.com',
              title: 'Visit Example',
              target: '_blank',
            },
          },
        ],
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Item with Link')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    const link = screen.getByText('Visit Example')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders complexList with link target _self (no rel attribute)', () => {
    const content: ArticleContent[] = [
      {
        type: 'complexList',
        complexItems: [
          {
            primary: 'Self Link Item',
            link: {
              href: 'https://example.com',
              title: 'Self Link',
              target: '_self',
            },
          },
        ],
      },
    ]

    render(<ArticleRenderer content={content} />)

    const link = screen.getByText('Self Link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_self')
    expect(link).not.toHaveAttribute('rel')
  })

  it('renders complexList with link target _parent (no rel attribute)', () => {
    const content: ArticleContent[] = [
      {
        type: 'complexList',
        complexItems: [
          {
            primary: 'Parent Link Item',
            link: {
              href: 'https://example.com',
              title: 'Parent Link',
              target: '_parent',
            },
          },
        ],
      },
    ]

    render(<ArticleRenderer content={content} />)

    const link = screen.getByText('Parent Link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('target', '_parent')
    expect(link).not.toHaveAttribute('rel')
  })

  it('renders complexList with link target _top (no rel attribute)', () => {
    const content: ArticleContent[] = [
      {
        type: 'complexList',
        complexItems: [
          {
            primary: 'Top Link Item',
            link: {
              href: 'https://example.com',
              title: 'Top Link',
              target: '_top',
            },
          },
        ],
      },
    ]

    render(<ArticleRenderer content={content} />)

    const link = screen.getByText('Top Link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('target', '_top')
    expect(link).not.toHaveAttribute('rel')
  })

  it('renders complexList with items without links', () => {
    const content: ArticleContent[] = [
      {
        type: 'complexList',
        complexItems: [
          {
            primary: 'No Link Item',
            secondary: 'No link description',
          },
          {
            primary: 'Another No Link Item',
          },
        ],
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('No Link Item')).toBeInTheDocument()
    expect(screen.getByText('No link description')).toBeInTheDocument()
    expect(screen.getByText('Another No Link Item')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders complexList with multiple items', () => {
    const content: ArticleContent[] = [
      {
        type: 'complexList',
        complexItems: [
          {
            primary: 'Item 1',
            secondary: 'Description 1',
            link: {
              href: 'https://example.com/1',
              title: 'Link 1',
            },
          },
          {
            primary: 'Item 2',
            secondary: 'Description 2',
          },
          {
            primary: 'Item 3',
            link: {
              href: 'https://example.com/3',
              title: 'Link 3',
              target: '_self',
            },
          },
        ],
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Link 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
    expect(screen.getByText('Link 3')).toBeInTheDocument()
  })

  it('renders complexList with default _blank target when target is missing', () => {
    const content: ArticleContent[] = [
      {
        type: 'complexList',
        complexItems: [
          {
            primary: 'Default Target Item',
            link: {
              href: 'https://example.com',
              title: 'Default Link',
            },
          },
        ],
      },
    ]

    render(<ArticleRenderer content={content} />)

    const link = screen.getByText('Default Link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).not.toHaveAttribute('rel')
  })
})
