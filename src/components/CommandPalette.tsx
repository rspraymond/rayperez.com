import React, { useId, useMemo, useRef, useState } from 'react'
import { Box, Dialog, InputBase, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { PALETTE_GROUPS, usePaletteCommands } from '../hooks/usePaletteCommands'
import type { PaletteCommand } from '../hooks/usePaletteCommands'
import { matchesQuery } from '../utils/matchesQuery'
import type { ArticleSection } from '../utils/articleHeadings'
import { VISUALLY_HIDDEN_SX } from '../styles/sectionStyles'

export interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  /** Sections of the article on screen, read when the palette opens. */
  sections: ArticleSection[]
}

const searchableText = ({ label, group, hint = '', keywords = '' }: PaletteCommand): string =>
  `${label} ${group} ${hint} ${keywords}`

const resultCountText = (count: number): string =>
  count === 1 ? '1 result' : `${count === 0 ? 'No' : count} results`

const KBD_SX = {
  px: 0.75,
  py: 0.125,
  border: 1,
  borderColor: 'divider',
  borderRadius: 0.5,
  fontFamily: 'inherit',
  fontSize: '0.75rem',
} as const

/**
 * Site search and quick actions in one dialog. Focus stays in the input while the arrow keys move
 * the highlighted option (aria-activedescendant), so typing and choosing never fight over focus.
 */
const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose, sections }) => {
  const commands = usePaletteCommands(sections)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const idPrefix = useId()
  const listboxId = `${idPrefix}listbox`
  const optionId = (index: number): string => `${idPrefix}option-${index}`

  const groups = useMemo(() => {
    const matches = commands.filter((command) => matchesQuery(searchableText(command), query))
    return PALETTE_GROUPS.map((group) => ({
      group,
      items: matches.filter((command) => command.group === group),
    })).filter(({ items }) => items.length > 0)
  }, [commands, query])
  const results = useMemo(() => groups.flatMap(({ items }) => items), [groups])
  const activeCommand: PaletteCommand | undefined = results[activeIndex]

  const commandAfterCloseRef = useRef<PaletteCommand | null>(null)

  // Navigation and new windows run at once, inside the click, so browsers never treat a new window as a popup.
  const runCommand = (command: PaletteCommand): void => {
    onClose()
    if (command.waitForClose) commandAfterCloseRef.current = command
    else command.run()
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value)
    setActiveIndex(0)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // Enter while an input method is composing confirms the characters, not a result.
    if (results.length === 0 || event.nativeEvent.isComposing) return
    const moveBy = (step: number): void => {
      event.preventDefault()
      setActiveIndex((index) => (index + step + results.length) % results.length)
    }
    if (event.key === 'ArrowDown') moveBy(1)
    else if (event.key === 'ArrowUp') moveBy(-1)
    else if (event.key === 'Enter' && activeCommand) {
      event.preventDefault()
      runCommand(activeCommand)
    }
  }

  // Each open starts fresh; clearing on exit keeps the old query from flashing while the dialog fades out.
  const handleExited = (): void => {
    setQuery('')
    setActiveIndex(0)
    commandAfterCloseRef.current?.run()
    commandAfterCloseRef.current = null
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      TransitionProps={{ onExited: handleExited }}
      PaperProps={{ 'aria-label': 'Search the site' }}
      sx={{
        '& .MuiDialog-container': { alignItems: 'flex-start' },
        '& .MuiDialog-paper': {
          m: { xs: 2, sm: 4 },
          mt: { xs: 2, sm: '12vh' },
          width: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 64px)' },
          maxHeight: { xs: 'calc(100% - 32px)', sm: '76vh' },
          borderRadius: '1rem',
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <SearchIcon sx={{ color: 'text.secondary' }} />
        <InputBase
          autoFocus
          fullWidth
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          placeholder='Search or jump to…'
          inputProps={{
            role: 'combobox',
            'aria-label': 'Search pages, articles, and actions',
            'aria-autocomplete': 'list',
            'aria-expanded': results.length > 0,
            'aria-controls': listboxId,
            'aria-activedescendant': activeCommand ? optionId(activeIndex) : undefined,
            autoComplete: 'off',
            autoCapitalize: 'off',
            spellCheck: false,
          }}
          sx={{ minHeight: 56, fontSize: '1.0625rem' }}
        />
      </Box>
      <Box
        id={listboxId}
        role='listbox'
        aria-label='Results'
        sx={{ overflowY: 'auto', overscrollBehavior: 'contain', p: 1 }}
      >
        {groups.map(({ group, items }) => {
          const headingId = `${idPrefix}group-${group.replace(/\s+/g, '-')}`
          return (
            <Box key={group} role='group' aria-labelledby={headingId} sx={{ '& + &': { mt: 1 } }}>
              <Typography
                id={headingId}
                component='div'
                sx={{
                  px: 1.5,
                  py: 0.75,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                }}
              >
                {group}
              </Typography>
              {items.map((command) => {
                const index = results.indexOf(command)
                const isActive = index === activeIndex
                const { Icon } = command
                return (
                  <Box
                    key={command.id}
                    id={optionId(index)}
                    role='option'
                    aria-selected={isActive}
                    // Keeps the highlighted option visible as the arrow keys move past the scroll edge.
                    ref={
                      isActive
                        ? (node: HTMLElement | null) => node?.scrollIntoView?.({ block: 'nearest' })
                        : undefined
                    }
                    onMouseMove={() => {
                      if (!isActive) setActiveIndex(index)
                    }}
                    onClick={() => runCommand(command)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      minHeight: 44,
                      px: 1.5,
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      color: 'text.primary',
                      '& > svg': { color: 'text.secondary', flexShrink: 0 },
                      '&[aria-selected="true"]': {
                        bgcolor: 'action.selected',
                        '& > svg': { color: 'primary.main' },
                      },
                    }}
                  >
                    <Icon fontSize='small' />
                    <Box
                      component='span'
                      sx={{
                        flexGrow: 1,
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {command.label}
                    </Box>
                    {/* The space keeps the label and hint apart in the accessible name; flex layout ignores it. */}
                    {command.hint && ' '}
                    {command.hint && (
                      <Box
                        component='span'
                        sx={{
                          flexShrink: 0,
                          fontSize: '0.8125rem',
                          color: 'text.secondary',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {command.hint}
                      </Box>
                    )}
                  </Box>
                )
              })}
            </Box>
          )
        })}
        {results.length === 0 && (
          <Typography sx={{ px: 1.5, py: 4, textAlign: 'center', color: 'text.secondary' }}>
            No results for “{query.trim()}”
          </Typography>
        )}
      </Box>
      <Box role='status' sx={VISUALLY_HIDDEN_SX}>
        {resultCountText(results.length)}
      </Box>
      {/* Phones have no arrow keys or Escape, so the hints only show where a keyboard is likely. */}
      <Box
        aria-hidden
        sx={{
          display: { xs: 'none', sm: 'flex' },
          gap: 2,
          px: 2,
          py: 1,
          borderTop: 1,
          borderColor: 'divider',
          fontSize: '0.75rem',
          color: 'text.secondary',
        }}
      >
        <span>
          <Box component='kbd' sx={KBD_SX}>
            ↑
          </Box>{' '}
          <Box component='kbd' sx={KBD_SX}>
            ↓
          </Box>{' '}
          to move
        </span>
        <span>
          <Box component='kbd' sx={KBD_SX}>
            Enter
          </Box>{' '}
          to open
        </span>
        <span>
          <Box component='kbd' sx={KBD_SX}>
            Esc
          </Box>{' '}
          to close
        </span>
      </Box>
    </Dialog>
  )
}

export default CommandPalette
