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

  it('renders with all required components', () => {
    render(
      <BrowserRouter>
        <BlogPost {...defaultProps} />
      </BrowserRouter>,
    )

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    expect(screen.getByTestId('recent-posts')).toBeInTheDocument()
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

    const helmet = screen.getByTestId('helmet')
    expect(helmet).toBeInTheDocument()

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
})
