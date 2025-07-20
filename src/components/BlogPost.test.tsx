import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import BlogPost from './BlogPost'

// Mock the useBookmarks hook
vi.mock('../hooks/useBookmarks', () => ({
  useBookmarks: () => ({
    bookmarks: [],
    isBookmarked: vi.fn(() => false),
    addBookmark: vi.fn(),
    removeBookmark: vi.fn(),
    toggleBookmark: vi.fn(),
  }),
}))

// Define BlogPostProps interface for the test file
interface BlogPostProps {
  title: string
  author: string
  date: string
  children: React.ReactNode
}

// Mock the dependencies
vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='helmet'>{children}</div>
  ),
}))

vi.mock('./Header', () => ({
  default: () => <div data-testid='header'>Header Component</div>,
}))

vi.mock('./ProfileCard', () => ({
  default: () => <div data-testid='profile-card'>Profile Card Component</div>,
}))

vi.mock('./RecentPosts', () => ({
  default: () => <div data-testid='recent-posts'>Recent Posts Component</div>,
}))

vi.mock('./WithCanonical', () => ({
  default: (Component: React.ComponentType<BlogPostProps>) => (props: BlogPostProps) => (
    <Component {...props} data-testid='with-canonical' />
  ),
}))

describe('BlogPost', () => {
  const defaultProps = {
    title: 'Test Blog Title',
    author: 'Test Author',
    date: '2023-01-01',
    children: <div data-testid='blog-content'>Test blog content</div>,
  }

  it('renders with all required components and skeletons', () => {
    render(
      <BrowserRouter>
        <BlogPost {...defaultProps} />
      </BrowserRouter>,
    )

    // Check for header (not lazy loaded)
    expect(screen.getByTestId('header')).toBeInTheDocument()

    // Check for skeletons of lazy-loaded components
    expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    expect(screen.getByTestId('recent-posts')).toBeInTheDocument()
    expect(screen.getByTestId('bookmarked-posts')).toBeInTheDocument()
    expect(screen.getByTestId('author-bio')).toBeInTheDocument()

    // Check for blog content
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

    // Find the paragraph inside the breadcrumbs li that contains the title
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

    // Since both BlogPost and AuthorBio have Helmet components, we should find multiple
    const helmets = screen.getAllByTestId('helmet')
    expect(helmets.length).toBeGreaterThan(0)

    // Check that the title contains the blog title
    const titleElement = screen.getByText(
      (content) => content.includes('Test Blog Title') && content.includes('-'),
      { selector: 'title' },
    )
    expect(titleElement).toBeInTheDocument()

    // Check meta tags exist using getAttribute to find property="og:image"
    const metaTag = screen.getByText('', {
      selector: 'meta[property="og:image"]',
    })
    expect(metaTag).toBeInTheDocument()
  })

  it('displays reading time for article content', () => {
    const contentWithWords = (
      <div data-testid='blog-content'>
        <p>This is a test article with some content.</p>
        <p>It has multiple paragraphs to test the reading time calculation.</p>
        <p>The reading time should be calculated based on the total word count.</p>
      </div>
    )

    render(
      <BrowserRouter>
        <BlogPost {...defaultProps} children={contentWithWords} />
      </BrowserRouter>,
    )

    // Check that reading time is displayed
    expect(screen.getByText(/min read/)).toBeInTheDocument()
  })
})
