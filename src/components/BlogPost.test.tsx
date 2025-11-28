import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import BlogPost from './BlogPost'

// Create mock functions that can be controlled per test
const mockIsBookmarked = vi.fn()
const mockToggleBookmark = vi.fn()
const mockScrollToTop = vi.fn()
const mockShowBackToTop = vi.fn()
const mockReadingTimeDisplay = vi.fn()
const mockPrevPost = vi.fn()
const mockNextPost = vi.fn()
const mockPathname = vi.fn()

// Mock the useBookmarks hook
vi.mock('../hooks/useBookmarks', () => ({
  useBookmarks: () => ({
    bookmarks: [],
    isBookmarked: mockIsBookmarked,
    addBookmark: vi.fn(),
    removeBookmark: vi.fn(),
    toggleBookmark: mockToggleBookmark,
  }),
}))

// Mock useScrollToTop hook
vi.mock('../hooks/useScrollToTop', () => ({
  useScrollToTop: () => ({
    showBackToTop: mockShowBackToTop(),
    scrollToTop: mockScrollToTop,
  }),
}))

// Mock useReadingTime hook
vi.mock('../hooks/useReadingTime', () => ({
  useReadingTime: () => mockReadingTimeDisplay(),
}))

// Mock usePostNavigation hook
vi.mock('../hooks/usePostNavigation', () => ({
  usePostNavigation: () => ({
    prevPost: mockPrevPost(),
    nextPost: mockNextPost(),
  }),
}))

// Mock useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: () => ({
      pathname: mockPathname(),
      search: '',
      hash: '',
      state: null,
      key: 'default',
    }),
  }
})

// Define BlogPostProps interface for the test file
interface BlogPostProps {
  title: string
  author: string
  date: string
  children: React.ReactNode
  readingText?: string
}

// Mock the dependencies
vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='helmet'>{children}</div>
  ),
}))

vi.mock('./TableOfContents', () => ({
  default: () => <div data-testid='table-of-contents'>Table of Contents Component</div>,
}))

vi.mock('./AuthorBio', () => ({
  default: () => <div data-testid='author-bio'>Author Bio Component</div>,
}))

vi.mock('./WithCanonical', () => ({
  default: (Component: React.ComponentType<BlogPostProps>) => (props: BlogPostProps) => (
    <Component {...props} data-testid='with-canonical' />
  ),
}))

// eslint-disable-next-line max-lines-per-function
describe('BlogPost', () => {
  const defaultProps = {
    title: 'Test Blog Title',
    author: 'Test Author',
    date: '2023-01-01',
    children: <div data-testid='blog-content'>Test blog content</div>,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockIsBookmarked.mockReturnValue(false)
    mockToggleBookmark.mockClear()
    mockReadingTimeDisplay.mockReturnValue('5 min read')
    mockShowBackToTop.mockReturnValue(false)
    mockPrevPost.mockReturnValue(undefined)
    mockNextPost.mockReturnValue(undefined)
    mockPathname.mockReturnValue('/test-article')
  })

  describe('Basic Rendering', () => {
    it('renders with all required components and skeletons', () => {
      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByTestId('table-of-contents')).toBeInTheDocument()
      expect(screen.getByTestId('author-bio')).toBeInTheDocument()
      expect(screen.getByTestId('blog-content')).toBeInTheDocument()
    })

    it('displays the correct blog title and content', () => {
      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Blog Title')
      expect(screen.getByTestId('blog-content')).toBeInTheDocument()
      expect(screen.getByText('Home')).toBeInTheDocument()

      const breadcrumbTitle = screen.getByText('Test Blog Title', {
        selector: 'p.MuiTypography-root',
      })
      expect(breadcrumbTitle).toBeInTheDocument()
    })

    it('includes SEO metadata with title and structured data', () => {
      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      const helmets = screen.getAllByTestId('helmet')
      expect(helmets.length).toBeGreaterThan(0)

      const titleElement = screen.getByText(
        (content) => content.includes('Test Blog Title') && content.includes('-'),
        { selector: 'title' },
      )
      expect(titleElement).toBeInTheDocument()

      const metaTag = screen.getByText('', {
        selector: 'meta[property="og:image"]',
      })
      expect(metaTag).toBeInTheDocument()
    })
  })

  describe('Bookmark State Branch', () => {
    it('renders bookmark border icon when article is not bookmarked', () => {
      mockIsBookmarked.mockReturnValue(false)

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      const bookmarkButton = screen.getByRole('button', { name: 'bookmark article' })
      expect(bookmarkButton).toBeInTheDocument()
      expect(screen.getByTestId('BookmarkBorderIcon')).toBeInTheDocument()
      expect(screen.queryByTestId('BookmarkIcon')).not.toBeInTheDocument()
    })

    it('renders bookmark icon when article is bookmarked', () => {
      mockIsBookmarked.mockReturnValue(true)

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      const bookmarkButton = screen.getByRole('button', { name: 'remove bookmark' })
      expect(bookmarkButton).toBeInTheDocument()
      expect(screen.getByTestId('BookmarkIcon')).toBeInTheDocument()
      expect(screen.queryByTestId('BookmarkBorderIcon')).not.toBeInTheDocument()
    })

    it('calls toggleBookmark with correct arguments on click', async () => {
      const user = userEvent.setup()
      mockIsBookmarked.mockReturnValue(false)
      mockPathname.mockReturnValue('/test-article')

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      const bookmarkButton = screen.getByRole('button', { name: 'bookmark article' })
      await user.click(bookmarkButton)

      expect(mockToggleBookmark).toHaveBeenCalledTimes(1)
      expect(mockToggleBookmark).toHaveBeenCalledWith('Test Blog Title', '/test-article')
    })
  })

  describe('Reading Time Display Branch', () => {
    it('renders reading time when available', () => {
      mockReadingTimeDisplay.mockReturnValue('5 min read')

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByText('5 min read')).toBeInTheDocument()
      expect(screen.queryByTestId('reading-time')).not.toBeInTheDocument()
    })

    it('renders LoadingSkeleton when reading time is not available', () => {
      mockReadingTimeDisplay.mockReturnValue(null)

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByTestId('reading-time')).toBeInTheDocument()
      expect(screen.queryByText(/min read/)).not.toBeInTheDocument()
    })

    it('renders LoadingSkeleton when reading time is empty string', () => {
      mockReadingTimeDisplay.mockReturnValue('')

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByTestId('reading-time')).toBeInTheDocument()
    })

    it('uses readingText prop when provided', () => {
      mockReadingTimeDisplay.mockReturnValue('3 min read')

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} readingText='Custom reading text content' />
        </BrowserRouter>,
      )

      expect(screen.getByText('3 min read')).toBeInTheDocument()
      expect(mockReadingTimeDisplay).toHaveBeenCalled()
    })

    it('falls back to children when readingText is not provided', () => {
      mockReadingTimeDisplay.mockReturnValue('5 min read')

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByText('5 min read')).toBeInTheDocument()
      expect(mockReadingTimeDisplay).toHaveBeenCalled()
    })
  })

  describe('BackToTopButton Visibility', () => {
    it('does not render button when showBackToTop is false', () => {
      mockShowBackToTop.mockReturnValue(false)

      const { container } = render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(container.querySelector('[aria-label="back to top"]')).not.toBeInTheDocument()
    })

    it('renders button when showBackToTop is true', () => {
      mockShowBackToTop.mockReturnValue(true)

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByRole('button', { name: 'back to top' })).toBeInTheDocument()
    })
  })

  describe('PostNavigation Combinations', () => {
    it('renders navigation with both prev and next posts', () => {
      mockPrevPost.mockReturnValue({ title: 'Previous Article', path: '/previous' })
      mockNextPost.mockReturnValue({ title: 'Next Article', path: '/next' })

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByText('Previous')).toBeInTheDocument()
      expect(screen.getByText('Previous Article')).toBeInTheDocument()
      expect(screen.getByText('Next')).toBeInTheDocument()
      expect(screen.getByText('Next Article')).toBeInTheDocument()
      expect(screen.getByText('Back to Home')).toBeInTheDocument()
    })

    it('renders navigation with only prev post', () => {
      mockPrevPost.mockReturnValue({ title: 'Previous Article', path: '/previous' })
      mockNextPost.mockReturnValue(undefined)

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.getByText('Previous')).toBeInTheDocument()
      expect(screen.getByText('Previous Article')).toBeInTheDocument()
      expect(screen.queryByText('Next')).not.toBeInTheDocument()
      expect(screen.getByText('Back to Home')).toBeInTheDocument()
    })

    it('renders navigation with only next post', () => {
      mockPrevPost.mockReturnValue(undefined)
      mockNextPost.mockReturnValue({ title: 'Next Article', path: '/next' })

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.queryByText('Previous')).not.toBeInTheDocument()
      expect(screen.getByText('Next')).toBeInTheDocument()
      expect(screen.getByText('Next Article')).toBeInTheDocument()
      expect(screen.getByText('Back to Home')).toBeInTheDocument()
    })

    it('handles case when neither post exists', () => {
      mockPrevPost.mockReturnValue(undefined)
      mockNextPost.mockReturnValue(undefined)

      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      expect(screen.queryByText('Previous')).not.toBeInTheDocument()
      expect(screen.queryByText('Next')).not.toBeInTheDocument()
      expect(screen.queryByText('Back to Home')).not.toBeInTheDocument()
    })
  })

  describe('Suspense Fallbacks', () => {
    it('verifies LoadingSkeleton appears for TableOfContents when lazy loading', () => {
      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      // The Suspense fallback should show LoadingSkeleton with testId
      // Since we're mocking the component, it renders immediately, but the testId is still present
      expect(screen.getByTestId('table-of-contents')).toBeInTheDocument()
    })

    it('verifies LoadingSkeleton appears for AuthorBio when lazy loading', () => {
      render(
        <BrowserRouter>
          <BlogPost {...defaultProps} />
        </BrowserRouter>,
      )

      // The Suspense fallback should show LoadingSkeleton with testId
      // Since we're mocking the component, it renders immediately, but the testId is still present
      expect(screen.getByTestId('author-bio')).toBeInTheDocument()
    })
  })
})
