import React, { useState, useEffect, useCallback, ReactNode } from 'react'
import { BookmarkContext, type BookmarkContextType, type BookmarkedArticle } from './bookmarkTypes'

const BOOKMARKS_STORAGE_KEY = 'article-bookmarks'

const getStoredBookmarks = (): BookmarkedArticle[] => {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    }
  } catch {
    // localStorage access denied or invalid JSON
  }
  return []
}

const saveBookmarks = (bookmarks: BookmarkedArticle[]): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks))
  } catch {
    // localStorage access denied
  }
}

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>(getStoredBookmarks)

  const isBookmarked = useCallback(
    (path: string): boolean => {
      return bookmarks.some((bookmark) => bookmark.path === path)
    },
    [bookmarks],
  )

  const addBookmark = useCallback((title: string, path: string): void => {
    setBookmarks((prev) => {
      if (prev.some((bookmark) => bookmark.path === path)) {
        return prev // Already bookmarked
      }

      const newBookmark: BookmarkedArticle = {
        title,
        path,
        dateBookmarked: new Date().toISOString(),
      }

      const updated = [...prev, newBookmark]
      saveBookmarks(updated)
      return updated
    })
  }, [])

  const removeBookmark = useCallback((path: string): void => {
    setBookmarks((prev) => {
      const updated = prev.filter((bookmark) => bookmark.path !== path)
      saveBookmarks(updated)
      return updated
    })
  }, [])

  const toggleBookmark = useCallback(
    (title: string, path: string): void => {
      if (isBookmarked(path)) {
        removeBookmark(path)
      } else {
        addBookmark(title, path)
      }
    },
    [isBookmarked, addBookmark, removeBookmark],
  )

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === BOOKMARKS_STORAGE_KEY) {
        setBookmarks(getStoredBookmarks())
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const value: BookmarkContextType = {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
  }

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
}
