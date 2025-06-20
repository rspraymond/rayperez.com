import { createContext } from 'react'

export interface BookmarkedArticle {
  title: string
  path: string
  dateBookmarked: string
}

export interface BookmarkContextType {
  bookmarks: BookmarkedArticle[]
  isBookmarked: (path: string) => boolean
  addBookmark: (title: string, path: string) => void
  removeBookmark: (path: string) => void
  toggleBookmark: (title: string, path: string) => void
}

export const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)
