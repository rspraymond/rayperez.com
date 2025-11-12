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

describe('ArticleRenderer - Heading Content', () => {
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

  it('renders h1 heading variant', () => {
    const content: ArticleContent[] = [
      {
        type: 'heading',
        variant: 'h1',
        content: 'Main Title',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const heading = screen.getByText('Main Title')
    expect(heading.tagName).toBe('H1')
  })

  it('renders h2 heading variant', () => {
    const content: ArticleContent[] = [
      {
        type: 'heading',
        variant: 'h2',
        content: 'Section Title',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const heading = screen.getByText('Section Title')
    expect(heading.tagName).toBe('H2')
  })

  it('renders h4 heading variant', () => {
    const content: ArticleContent[] = [
      {
        type: 'heading',
        variant: 'h4',
        content: 'Subsection Title',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const heading = screen.getByText('Subsection Title')
    expect(heading.tagName).toBe('H4')
  })

  it('renders h5 heading variant', () => {
    const content: ArticleContent[] = [
      {
        type: 'heading',
        variant: 'h5',
        content: 'Minor Title',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const heading = screen.getByText('Minor Title')
    expect(heading.tagName).toBe('H5')
  })

  it('renders h6 heading variant', () => {
    const content: ArticleContent[] = [
      {
        type: 'heading',
        variant: 'h6',
        content: 'Smallest Title',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const heading = screen.getByText('Smallest Title')
    expect(heading.tagName).toBe('H6')
  })

  it('uses default h3 when variant does not start with h', () => {
    const content: ArticleContent[] = [
      {
        type: 'heading',
        variant: 'body1' as 'h1',
        content: 'Default Heading',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const heading = screen.getByText('Default Heading')
    expect(heading.tagName).toBe('H3')
  })

  it('handles gutterBottom false', () => {
    const content: ArticleContent[] = [
      {
        type: 'heading',
        variant: 'h3',
        content: 'No Gutter',
        gutterBottom: false,
      },
    ]

    render(<ArticleRenderer content={content} />)

    expect(screen.getByText('No Gutter')).toBeInTheDocument()
  })

  it('uses default h3 variant when variant is missing', () => {
    const content: ArticleContent[] = [
      {
        type: 'heading',
        content: 'Default Heading',
      },
    ]

    render(<ArticleRenderer content={content} />)

    const heading = screen.getByText('Default Heading')
    expect(heading.tagName).toBe('H3')
  })
})
