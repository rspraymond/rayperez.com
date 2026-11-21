import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { scrollProgress } from '../utils/scrollProgress'

/**
 * A thin bar across the top of the window that fills as the reader scrolls an article.
 * It writes the width straight to the element once per frame instead of re-rendering on every scroll event.
 * Screen readers skip it because the bar only repeats what the scroll position already says.
 */
const ReadingProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null)

  // Scroll and resize are browser events, so subscribing to them is what this effect is for.
  useEffect(() => {
    let frame = 0
    const update = (): void => {
      frame = 0
      const { scrollHeight } = document.documentElement
      const progress = scrollProgress(window.scrollY, scrollHeight, window.innerHeight)
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }
    const schedule = (): void => {
      if (frame === 0) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <Box
      ref={barRef}
      aria-hidden
      data-testid='reading-progress'
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        bgcolor: 'primary.main',
        transform: 'scaleX(0)',
        transformOrigin: 'left center',
        pointerEvents: 'none',
        '@media print': { display: 'none' },
      }}
    />
  )
}

export default ReadingProgress
