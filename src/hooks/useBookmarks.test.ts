import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useBookmarks } from './useBookmarks'
import { BookmarkProvider } from '../contexts/BookmarkContext'
import React from 'react'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(BookmarkProvider, null, children)
}

describe('useBookmarks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Initial State', () => {
    it('starts with empty bookmarks when no stored data', () => {
      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      expect(result.current.bookmarks).toEqual([])
    })

    it('loads bookmarks from localStorage on initialization', () => {
      const mockBookmarks = [
        {
          title: 'Test Article',
          path: '/test-article',
          dateBookmarked: '2024-01-01T00:00:00.000Z',
        },
      ]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockBookmarks))

      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      expect(result.current.bookmarks).toEqual(mockBookmarks)
    })

    it('handles invalid JSON in localStorage gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json')

      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      expect(result.current.bookmarks).toEqual([])
    })

    it('handles non-array data in localStorage gracefully', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify('not-an-array'))

      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      expect(result.current.bookmarks).toEqual([])
    })

    it('handles localStorage access errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage access denied')
      })

      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      expect(result.current.bookmarks).toEqual([])
    })
  })

  describe('isBookmarked', () => {
    it('returns false for non-bookmarked articles', () => {
      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      expect(result.current.isBookmarked('/test-article')).toBe(false)
    })

    it('returns true for bookmarked articles', () => {
      const mockBookmarks = [
        {
          title: 'Test Article',
          path: '/test-article',
          dateBookmarked: '2024-01-01T00:00:00.000Z',
        },
      ]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockBookmarks))

      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      expect(result.current.isBookmarked('/test-article')).toBe(true)
    })
  })

  describe('addBookmark', () => {
    it('adds a new bookmark', () => {
      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      act(() => {
        result.current.addBookmark('Test Article', '/test-article')
      })

      expect(result.current.bookmarks).toHaveLength(1)
      expect(result.current.bookmarks[0]).toEqual({
        title: 'Test Article',
        path: '/test-article',
        dateBookmarked: expect.any(String),
      })
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'article-bookmarks',
        expect.stringContaining('Test Article'),
      )
    })

    it('does not add duplicate bookmarks', () => {
      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      act(() => {
        result.current.addBookmark('Test Article', '/test-article')
      })

      act(() => {
        result.current.addBookmark('Test Article', '/test-article')
      })

      expect(result.current.bookmarks).toHaveLength(1)
    })

    it('handles localStorage setItem errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage access denied')
      })

      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      act(() => {
        result.current.addBookmark('Test Article', '/test-article')
      })

      // Should still update state even if localStorage fails
      expect(result.current.bookmarks).toHaveLength(1)
    })
  })

  describe('removeBookmark', () => {
    it('removes an existing bookmark', () => {
      const mockBookmarks = [
        {
          title: 'Test Article',
          path: '/test-article',
          dateBookmarked: '2024-01-01T00:00:00.000Z',
        },
      ]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockBookmarks))

      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      act(() => {
        result.current.removeBookmark('/test-article')
      })

      expect(result.current.bookmarks).toHaveLength(0)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('article-bookmarks', '[]')
    })

    it('does nothing when removing non-existent bookmark', () => {
      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      act(() => {
        result.current.removeBookmark('/non-existent')
      })

      expect(result.current.bookmarks).toHaveLength(0)
    })
  })

  describe('toggleBookmark', () => {
    it('adds bookmark when not already bookmarked', () => {
      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      act(() => {
        result.current.toggleBookmark('Test Article', '/test-article')
      })

      expect(result.current.bookmarks).toHaveLength(1)
      expect(result.current.isBookmarked('/test-article')).toBe(true)
    })

    it('removes bookmark when already bookmarked', () => {
      const mockBookmarks = [
        {
          title: 'Test Article',
          path: '/test-article',
          dateBookmarked: '2024-01-01T00:00:00.000Z',
        },
      ]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockBookmarks))

      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      act(() => {
        result.current.toggleBookmark('Test Article', '/test-article')
      })

      expect(result.current.bookmarks).toHaveLength(0)
      expect(result.current.isBookmarked('/test-article')).toBe(false)
    })
  })

  describe('Storage synchronization', () => {
    it('updates bookmarks when localStorage changes from other tabs', () => {
      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })

      const newBookmarks = [
        {
          title: 'New Article',
          path: '/new-article',
          dateBookmarked: '2024-01-01T00:00:00.000Z',
        },
      ]

      // Mock the storage event
      localStorageMock.getItem.mockReturnValue(JSON.stringify(newBookmarks))

      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'article-bookmarks',
          newValue: JSON.stringify(newBookmarks),
        })
        window.dispatchEvent(storageEvent)
      })

      expect(result.current.bookmarks).toEqual(newBookmarks)
    })

    it('ignores storage events for other keys', () => {
      const { result } = renderHook(() => useBookmarks(), { wrapper: createWrapper() })
      const initialBookmarks = result.current.bookmarks

      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'other-key',
          newValue: 'some-value',
        })
        window.dispatchEvent(storageEvent)
      })

      expect(result.current.bookmarks).toEqual(initialBookmarks)
    })
  })
})
