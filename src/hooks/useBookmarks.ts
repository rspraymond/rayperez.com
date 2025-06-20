import { useContext } from 'react'
import {
  BookmarkContext,
  type BookmarkContextType,
  type BookmarkedArticle,
} from '../contexts/bookmarkTypes'

export const useBookmarks = (): BookmarkContextType => {
  const context = useContext(BookmarkContext)
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }
  return context
}

export type { BookmarkedArticle }
