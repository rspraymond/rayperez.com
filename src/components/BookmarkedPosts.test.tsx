import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import BookmarkedPosts from './BookmarkedPosts'
import { useBookmarks } from '../hooks/useBookmarks'

// Mock the useBookmarks hook
vi.mock('../hooks/useBookmarks')

const mockUseBookmarks = vi.mocked(useBookmarks)

const theme = createTheme()

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('BookmarkedPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders nothing when there are no bookmarks', () => {
    mockUseBookmarks.mockReturnValue({
      bookmarks: [],
      isBookmarked: vi.fn(),
      addBookmark: vi.fn(),
      removeBookmark: vi.fn(),
      toggleBookmark: vi.fn(),
    })

    const { container } = renderWithTheme(<BookmarkedPosts />)

    expect(container.firstChild).toBeNull()
  })

  it('renders bookmarked articles when bookmarks exist', () => {
    const mockBookmarks = [
      {
        title: 'First Article',
        path: '/first-article',
        dateBookmarked: '2024-01-02T00:00:00.000Z',
      },
      {
        title: 'Second Article',
        path: '/second-article',
        dateBookmarked: '2024-01-01T00:00:00.000Z',
      },
    ]

    mockUseBookmarks.mockReturnValue({
      bookmarks: mockBookmarks,
      isBookmarked: vi.fn(),
      addBookmark: vi.fn(),
      removeBookmark: vi.fn(),
      toggleBookmark: vi.fn(),
    })

    renderWithTheme(<BookmarkedPosts />)

    expect(screen.getByText('Bookmarked Articles (2)')).toBeInTheDocument()
    expect(screen.getByText('First Article')).toBeInTheDocument()
    expect(screen.getByText('Second Article')).toBeInTheDocument()
  })

  it('shows bookmarks in chronological order (most recent first)', () => {
    const mockBookmarks = [
      {
        title: 'Older Article',
        path: '/older-article',
        dateBookmarked: '2024-01-01T00:00:00.000Z',
      },
      {
        title: 'Newer Article',
        path: '/newer-article',
        dateBookmarked: '2024-01-02T00:00:00.000Z',
      },
    ]

    mockUseBookmarks.mockReturnValue({
      bookmarks: mockBookmarks,
      isBookmarked: vi.fn(),
      addBookmark: vi.fn(),
      removeBookmark: vi.fn(),
      toggleBookmark: vi.fn(),
    })

    renderWithTheme(<BookmarkedPosts />)

    const articles = screen.getAllByRole('link')
    expect(articles[0]).toHaveTextContent('Newer Article')
    expect(articles[1]).toHaveTextContent('Older Article')
  })

  it('starts expanded by default', () => {
    const mockBookmarks = [
      {
        title: 'Test Article',
        path: '/test-article',
        dateBookmarked: '2024-01-01T00:00:00.000Z',
      },
    ]

    mockUseBookmarks.mockReturnValue({
      bookmarks: mockBookmarks,
      isBookmarked: vi.fn(),
      addBookmark: vi.fn(),
      removeBookmark: vi.fn(),
      toggleBookmark: vi.fn(),
    })

    renderWithTheme(<BookmarkedPosts />)

    const collapseButton = screen.getByLabelText('collapse bookmarks')
    expect(collapseButton).toBeInTheDocument()

    // The article should be visible initially
    expect(screen.getByText('Test Article')).toBeInTheDocument()
  })

  it('expands and collapses when toggle button is clicked', () => {
    const mockBookmarks = [
      {
        title: 'Test Article',
        path: '/test-article',
        dateBookmarked: '2024-01-01T00:00:00.000Z',
      },
    ]

    mockUseBookmarks.mockReturnValue({
      bookmarks: mockBookmarks,
      isBookmarked: vi.fn(),
      addBookmark: vi.fn(),
      removeBookmark: vi.fn(),
      toggleBookmark: vi.fn(),
    })

    renderWithTheme(<BookmarkedPosts />)

    // Initially expanded, should show collapse button
    const collapseButton = screen.getByLabelText('collapse bookmarks')
    expect(screen.getByText('Test Article')).toBeInTheDocument()

    // Click to collapse
    fireEvent.click(collapseButton)
    expect(screen.getByLabelText('expand bookmarks')).toBeInTheDocument()

    // Click to expand again
    const expandButton = screen.getByLabelText('expand bookmarks')
    fireEvent.click(expandButton)
    expect(screen.getByText('Test Article')).toBeInTheDocument()
    expect(screen.getByLabelText('collapse bookmarks')).toBeInTheDocument()
  })

  it('creates proper links for each bookmarked article', () => {
    const mockBookmarks = [
      {
        title: 'Test Article',
        path: '/test-article',
        dateBookmarked: '2024-01-01T00:00:00.000Z',
      },
    ]

    mockUseBookmarks.mockReturnValue({
      bookmarks: mockBookmarks,
      isBookmarked: vi.fn(),
      addBookmark: vi.fn(),
      removeBookmark: vi.fn(),
      toggleBookmark: vi.fn(),
    })

    renderWithTheme(<BookmarkedPosts />)

    // Links should be visible by default since component starts expanded
    const articleLink = screen.getByRole('link', { name: /test article/i })
    expect(articleLink).toHaveAttribute('href', '/test-article')
  })

  it('updates bookmark count in header', () => {
    const mockBookmarks = [
      {
        title: 'Article 1',
        path: '/article-1',
        dateBookmarked: '2024-01-01T00:00:00.000Z',
      },
      {
        title: 'Article 2',
        path: '/article-2',
        dateBookmarked: '2024-01-02T00:00:00.000Z',
      },
      {
        title: 'Article 3',
        path: '/article-3',
        dateBookmarked: '2024-01-03T00:00:00.000Z',
      },
    ]

    mockUseBookmarks.mockReturnValue({
      bookmarks: mockBookmarks,
      isBookmarked: vi.fn(),
      addBookmark: vi.fn(),
      removeBookmark: vi.fn(),
      toggleBookmark: vi.fn(),
    })

    renderWithTheme(<BookmarkedPosts />)

    expect(screen.getByText('Bookmarked Articles (3)')).toBeInTheDocument()
  })
})
