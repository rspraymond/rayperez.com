import React from 'react'
import { Link } from '@mui/material'
import { MAIN_CONTENT_ID } from '../constants/paths'

/**
 * The first stop for keyboard users, shown only while focused, so they can pass the menu in one step.
 * It moves focus itself instead of following the #main-content fragment, so the URL never gains a hash
 * that Home or an article would then try to scroll to.
 */
const SkipLink: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    // Focusing main would scroll its top edge under the sticky menu; the next Tab scrolls to whatever it reaches.
    document.getElementById(MAIN_CONTENT_ID)?.focus({ preventScroll: true })
  }

  return (
    <Link
      href={`#${MAIN_CONTENT_ID}`}
      onClick={handleClick}
      sx={{
        position: 'fixed',
        top: 8,
        left: 8,
        zIndex: (theme) => theme.zIndex.tooltip + 1,
        px: 2,
        py: 1.25,
        borderRadius: '0.5rem',
        bgcolor: 'background.paper',
        color: 'text.primary',
        fontWeight: 600,
        boxShadow: 3,
        textDecoration: 'none',
        transform: 'translateY(-200%)',
        '&:focus': {
          transform: 'none',
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2,
        },
      }}
    >
      Skip to content
    </Link>
  )
}

export default SkipLink
