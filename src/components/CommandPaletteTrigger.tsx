import React, { useCallback, useEffect, useState } from 'react'
import { IconButton, Snackbar, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import type { CommandPaletteProps } from './CommandPalette'
import { readArticleSections } from '../utils/articleHeadings'
import type { ArticleSection } from '../utils/articleHeadings'

// The dialog and its command list load on first use, so every page's entry chunk stays small.
const loadPalette = () => import('./CommandPalette')

const prefetchPalette = (): void => {
  loadPalette().catch(() => undefined)
}

const IS_APPLE_PLATFORM =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform)

const SEARCH_SHORTCUT_LABEL = IS_APPLE_PLATFORM ? '⌘K' : 'Ctrl+K'

/** The narrowest window, in px, whose menu row fits the search button beside the four links and the theme switch. */
const NARROWEST_MENU_WIDTH = 360

const isTypingTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

/**
 * The menu's search button. Cmd+K or Ctrl+K toggles the palette from anywhere, and "/" opens it
 * unless the reader is typing in a field.
 */
function CommandPaletteTrigger() {
  const [open, setOpen] = useState(false)
  const [Palette, setPalette] = useState<React.ComponentType<CommandPaletteProps> | null>(null)
  const [loadFailed, setLoadFailed] = useState(false)
  const [sections, setSections] = useState<ArticleSection[]>([])

  const ensureLoaded = useCallback(() => {
    loadPalette()
      .then((module) => setPalette(() => module.default))
      .catch(() => {
        setOpen(false)
        setLoadFailed(true)
      })
  }, [])

  // Sections are read as the palette opens, so they always match the page underneath.
  const openPalette = useCallback(() => {
    setSections(readArticleSections())
    setOpen(true)
    ensureLoaded()
  }, [ensureLoaded])

  // A window listener is the only way to hear a shortcut pressed while focus is anywhere on the page.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      // Browser autofill can fire keydown without a key.
      const key = event.key ?? ''
      if (event.defaultPrevented || event.isComposing) return
      const isToggle =
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey &&
        key.toLowerCase() === 'k'
      const isSlash =
        key === '/' &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isTypingTarget(event.target)
      if (!isToggle && !isSlash) return
      event.preventDefault()
      if (isToggle) {
        setSections(readArticleSections())
        setOpen((current) => !current)
        ensureLoaded()
      } else {
        openPalette()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [ensureLoaded, openPalette])

  return (
    <React.Fragment>
      <Tooltip title={`Search (${SEARCH_SHORTCUT_LABEL})`}>
        <IconButton
          color='inherit'
          aria-label='Search the site'
          aria-haspopup='dialog'
          aria-keyshortcuts={IS_APPLE_PLATFORM ? 'Meta+K' : 'Control+K'}
          onClick={openPalette}
          onMouseEnter={prefetchPalette}
          onFocus={prefetchPalette}
          // Four menu links and two icons overflow the narrowest phones, so search steps aside there first.
          sx={{ [`@media (max-width: ${NARROWEST_MENU_WIDTH - 0.05}px)`]: { display: 'none' } }}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
      {Palette && <Palette open={open} onClose={() => setOpen(false)} sections={sections} />}
      <Snackbar
        open={loadFailed}
        onClose={() => setLoadFailed(false)}
        autoHideDuration={6000}
        message='Search could not load. Check your connection and try again.'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </React.Fragment>
  )
}

export default CommandPaletteTrigger
