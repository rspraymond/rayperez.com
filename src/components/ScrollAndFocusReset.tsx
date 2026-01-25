import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollAndFocusReset: React.FC = () => {
  const location = useLocation()
  const prevPathnameRef = useRef<string | null>(null)
  const isInitialMountRef = useRef<boolean>(true)

  useEffect(() => {
    const pathname = location.pathname

    // On initial mount, just record the pathname and skip all actions
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false
      prevPathnameRef.current = pathname
      return
    }

    // Only perform scroll and focus on actual navigation (pathname change)
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname
      window.scrollTo(0, 0)
      // Use requestAnimationFrame to ensure DOM is ready before focusing
      requestAnimationFrame(() => {
        document.getElementById('main-content')?.focus()
      })
    }
  }, [location.pathname])

  return null
}

export default ScrollAndFocusReset
