import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import JsonBlogPost from './JsonBlogPost'
import { ArticleDocument } from '../types/articleContent'

const mockFlattenArticleText = vi.fn()
vi.mock('../utils/articleText', () => ({
  flattenArticleText: (doc: ArticleDocument) => mockFlattenArticleText(doc),
}))

vi.mock('./BlogPost', () => ({
  default: (props: {
    title: string
    author: string
    date: string
    readingText?: string
    children: React.ReactNode
  }) => (
    <div data-testid='blog-post'>
      <div data-testid='blog-post-title'>{props.title}</div>
      <div data-testid='blog-post-author'>{props.author}</div>
      <div data-testid='blog-post-date'>{props.date}</div>
      <div data-testid='blog-post-reading-text'>{props.readingText || 'undefined'}</div>
      {props.children}
    </div>
  ),
}))

const mockArticleRenderer = vi.fn()
vi.mock('./ArticleRenderer', () => ({
  default: (props: { content: ArticleDocument }) => {
    mockArticleRenderer(props)
    return <div data-testid='article-renderer'>Article Renderer</div>
  },
}))

const mockContent: ArticleDocument = [
  {
    type: 'paragraph',
    content: 'Test paragraph content',
  },
  {
    type: 'heading',
    variant: 'h2',
    content: 'Test Heading',
  },
]

const defaultProps = {
  title: 'Test Blog Title',
  author: 'Test Author',
  date: '2023-01-01',
  content: mockContent,
}

const complexContent: ArticleDocument = [
  {
    type: 'heading',
    variant: 'h1',
    content: 'Main Title',
  },
  {
    type: 'paragraph',
    content: 'Paragraph text',
  },
  {
    type: 'list',
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
  {
    type: 'code',
    language: 'typescript',
    code: 'const x = 1;',
  },
]

describe('JsonBlogPost', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFlattenArticleText.mockReturnValue('Flattened article text for reading time')
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  describe('rendering', () => {
    it('renders without errors with valid props', async () => {
      render(
        <BrowserRouter>
          <JsonBlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByTestId('blog-post')).toBeInTheDocument()
      expect(screen.getByTestId('article-renderer')).toBeInTheDocument()

      await act(async () => {
        vi.runAllTimers()
      })
    })

    it('passes correct props to BlogPost component', async () => {
      render(
        <BrowserRouter>
          <JsonBlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByTestId('blog-post-title')).toHaveTextContent('Test Blog Title')
      expect(screen.getByTestId('blog-post-author')).toHaveTextContent('Test Author')
      expect(screen.getByTestId('blog-post-date')).toHaveTextContent('2023-01-01')

      await act(async () => {
        vi.runAllTimers()
      })
    })

    it('renders ArticleRenderer with correct content prop', async () => {
      render(
        <BrowserRouter>
          <JsonBlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(mockArticleRenderer).toHaveBeenCalledWith({ content: mockContent })
      expect(screen.getByTestId('article-renderer')).toBeInTheDocument()

      await act(async () => {
        vi.runAllTimers()
      })
    })
  })

  describe('async text flattening', () => {
    it('initially renders with readingText as undefined', async () => {
      render(
        <BrowserRouter>
          <JsonBlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByTestId('blog-post-reading-text')).toHaveTextContent('undefined')

      await act(async () => {
        vi.runAllTimers()
      })
    })

    it('sets readingText after timeout using flattened text', async () => {
      render(
        <BrowserRouter>
          <JsonBlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByTestId('blog-post-reading-text')).toHaveTextContent('undefined')

      await act(async () => {
        vi.runAllTimers()
      })

      expect(screen.getByTestId('blog-post-reading-text')).toHaveTextContent(
        'Flattened article text for reading time',
      )
      expect(mockFlattenArticleText).toHaveBeenCalledWith(mockContent)
    })

    it('calls flattenArticleText with the content prop', async () => {
      render(
        <BrowserRouter>
          <JsonBlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      await act(async () => {
        vi.runAllTimers()
      })

      expect(mockFlattenArticleText).toHaveBeenCalledWith(mockContent)
    })
  })

  describe('effect lifecycle', () => {
    it('clears timeout on component unmount', async () => {
      const setTimeoutSpy = vi.spyOn(global, 'setTimeout')
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
      const { unmount } = render(
        <BrowserRouter>
          <JsonBlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(setTimeoutSpy).toHaveBeenCalled()

      await act(async () => {
        vi.runAllTimers()
      })

      unmount()
      expect(clearTimeoutSpy).toHaveBeenCalled()

      setTimeoutSpy.mockRestore()
      clearTimeoutSpy.mockRestore()
    })

    it('re-runs effect when content prop changes', async () => {
      const { rerender } = render(
        <BrowserRouter>
          <JsonBlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      await act(async () => {
        vi.runAllTimers()
      })

      expect(mockFlattenArticleText).toHaveBeenCalledTimes(1)

      const newContent: ArticleDocument = [
        {
          type: 'paragraph',
          content: 'New paragraph content',
        },
      ]

      mockFlattenArticleText.mockClear()

      rerender(
        <BrowserRouter>
          <JsonBlogPost {...defaultProps} content={newContent} />
        </BrowserRouter>,
      )

      await act(async () => {
        vi.runAllTimers()
      })

      expect(mockFlattenArticleText).toHaveBeenCalledWith(newContent)
    })
  })
})

describe('JsonBlogPost - edge cases', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFlattenArticleText.mockReturnValue('Flattened article text for reading time')
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('handles empty content array', async () => {
    const emptyContent: ArticleDocument = []

    mockFlattenArticleText.mockReturnValue('')

    render(
      <BrowserRouter>
        <JsonBlogPost {...defaultProps} content={emptyContent} />
      </BrowserRouter>,
    )

    await act(async () => {
      vi.runAllTimers()
    })

    expect(mockFlattenArticleText).toHaveBeenCalledWith(emptyContent)
    expect(screen.getByTestId('article-renderer')).toBeInTheDocument()
    expect(mockArticleRenderer).toHaveBeenCalledWith({ content: emptyContent })
  })

  it('handles complex content with multiple types', async () => {
    mockFlattenArticleText.mockReturnValue('Complex flattened content')

    render(
      <BrowserRouter>
        <JsonBlogPost {...defaultProps} content={complexContent} />
      </BrowserRouter>,
    )

    await act(async () => {
      vi.runAllTimers()
    })

    expect(mockFlattenArticleText).toHaveBeenCalledWith(complexContent)
    expect(screen.getByTestId('blog-post-reading-text')).toHaveTextContent(
      'Complex flattened content',
    )
    expect(mockArticleRenderer).toHaveBeenCalledWith({ content: complexContent })
  })
})
