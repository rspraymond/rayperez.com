import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollAndFocusReset: React.FC = () => {
  const location = useLocation()
  const prevPathnameRef = useRef<string | null>(null)

  useEffect(() => {
    const pathname = location.pathname
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname
      return
    }
    if (prevPathnameRef.current === pathname) {
      return
    }
    prevPathnameRef.current = pathname
    window.scrollTo(0, 0)
    document.getElementById('main-content')?.focus()
  }, [location.pathname])

  return null
}

export default ScrollAndFocusReset
