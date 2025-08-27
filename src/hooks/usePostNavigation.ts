import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { posts } from '../constants/posts'

export const usePostNavigation = () => {
  const location = useLocation()

  const { prevPost, nextPost } = useMemo(() => {
    const sortedPosts = [...posts].sort((a, b) => {
      if (a.date === b.date) return a.path.localeCompare(b.path)
      return a.date < b.date ? 1 : -1 // Descending (newest first)
    })

    const currentIdx = sortedPosts.findIndex((p) => p.path === location.pathname)
    const prevPost =
      currentIdx > 0
        ? { title: sortedPosts[currentIdx - 1].title, path: sortedPosts[currentIdx - 1].path }
        : undefined
    const nextPost =
      currentIdx >= 0 && currentIdx < sortedPosts.length - 1
        ? { title: sortedPosts[currentIdx + 1].title, path: sortedPosts[currentIdx + 1].path }
        : undefined

    return { prevPost, nextPost }
  }, [location.pathname])

  return { prevPost, nextPost }
}
