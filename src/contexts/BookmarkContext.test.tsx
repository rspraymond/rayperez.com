import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { BookmarkProvider } from './BookmarkContext'
import { useBookmarks } from '../hooks/useBookmarks'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('BookmarkContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderWithBookmarkProvider = () => {
    return renderHook(() => useBookmarks(), {
      wrapper: ({ children }) => <BookmarkProvider>{children}</BookmarkProvider>,
    })
  }

  describe('Bookmark Lifecycle', () => {
    it('adds, checks, and removes bookmarks correctly', () => {
      const { result } = renderWithBookmarkProvider()

      // Initially no bookmarks
      expect(result.current.bookmarks).toHaveLength(0)
      expect(result.current.isBookmarked('/test-article')).toBe(false)

      // Add a bookmark
      act(() => {
        result.current.addBookmark('Test Article', '/test-article')
      })

      // Check bookmark was added
      expect(result.current.bookmarks).toHaveLength(1)
      expect(result.current.isBookmarked('/test-article')).toBe(true)
      expect(result.current.bookmarks[0]).toMatchObject({
        title: 'Test Article',
        path: '/test-article',
      })
      expect(result.current.bookmarks[0].dateBookmarked).toBeDefined()

      // Verify localStorage was called
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'article-bookmarks',
        expect.stringContaining('Test Article'),
      )

      // Remove the bookmark
      act(() => {
        result.current.removeBookmark('/test-article')
      })

      // Check bookmark was removed
      expect(result.current.bookmarks).toHaveLength(0)
      expect(result.current.isBookmarked('/test-article')).toBe(false)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('article-bookmarks', '[]')
    })
  })

  describe('Toggle Functionality', () => {
    it('toggles bookmarks correctly - adds when not bookmarked, removes when bookmarked', () => {
      const { result } = renderWithBookmarkProvider()

      // Initially not bookmarked
      expect(result.current.isBookmarked('/test-article')).toBe(false)

      // Toggle to add bookmark
      act(() => {
        result.current.toggleBookmark('Test Article', '/test-article')
      })

      expect(result.current.isBookmarked('/test-article')).toBe(true)
      expect(result.current.bookmarks).toHaveLength(1)

      // Toggle to remove bookmark
      act(() => {
        result.current.toggleBookmark('Test Article', '/test-article')
      })

      expect(result.current.isBookmarked('/test-article')).toBe(false)
      expect(result.current.bookmarks).toHaveLength(0)
    })
  })

  describe('Persistence & Error Handling', () => {
    it('loads existing bookmarks from localStorage and handles errors gracefully', () => {
      // Mock existing bookmarks in localStorage
      const existingBookmarks = [
        {
          title: 'Existing Article',
          path: '/existing-article',
          dateBookmarked: '2024-01-01T00:00:00.000Z',
        },
      ]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingBookmarks))

      const { result } = renderWithBookmarkProvider()

      // Should load existing bookmarks
      expect(result.current.bookmarks).toHaveLength(1)
      expect(result.current.isBookmarked('/existing-article')).toBe(true)

      // Test localStorage error handling
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage access denied')
      })

      // Should still work even if localStorage fails
      act(() => {
        result.current.addBookmark('New Article', '/new-article')
      })

      expect(result.current.bookmarks).toHaveLength(2)
      expect(result.current.isBookmarked('/new-article')).toBe(true)

      // Test invalid JSON handling
      localStorageMock.getItem.mockReturnValue('invalid-json')
      const { result: result2 } = renderWithBookmarkProvider()

      expect(result2.current.bookmarks).toHaveLength(0)
    })
  })
})
