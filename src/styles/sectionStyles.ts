import { alpha } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

/**
 * Shared by the real sections and their route skeletons, so a placeholder line
 * occupies exactly the space of the text that replaces it.
 */
/** Wide enough to fill a desktop screen; BODY_SX caps paragraphs so reading lines stay short. */
export const SITE_COLUMN_MAX_WIDTH = '60rem'

/** Vertical rhythm for each page inside the site column, which already owns the side gutters. */
export const PAGE_SX = {
  py: { xs: 4, md: 6 },
} satisfies SxProps<Theme>

export const PAGE_STACK_SPACING = { xs: 3, md: 4 } as const

export const SECTION_SX = {
  borderTop: 1,
  borderColor: 'divider',
  py: { xs: 4, md: 5 },
  // Keeps a menu jump target clear of the sticky header from sm up.
  scrollMarginTop: { sm: '5rem' },
} satisfies SxProps<Theme>

/**
 * A raised surface: paper on the page background, a hairline border, and a soft shadow.
 * Dark mode leans on the lighter paper and an inner top highlight, because shadows barely read on a dark page.
 */
export const SURFACE_SX = {
  bgcolor: 'background.paper',
  border: 1,
  borderColor: 'divider',
  borderRadius: '1rem',
  boxShadow: (theme: Theme) =>
    theme.palette.mode === 'dark'
      ? `inset 0 1px 0 ${alpha('#ffffff', 0.04)}, 0 12px 32px ${alpha('#000000', 0.35)}`
      : `0 1px 2px ${alpha('#0f172a', 0.05)}, 0 12px 32px ${alpha('#0f172a', 0.07)}`,
} satisfies SxProps<Theme>

/** One surface holding a list of rows split by hairlines, for Experience and Writing. */
export const PANEL_SX = {
  ...SURFACE_SX,
  m: 0,
  p: 0,
  listStyle: 'none',
  overflow: 'hidden',
} satisfies SxProps<Theme>

export const PANEL_ROW_SX = {
  px: { xs: 2, md: 3 },
  py: { xs: 1.5, md: 1.75 },
  '& + &': { borderTop: 1, borderColor: 'divider' },
} satisfies SxProps<Theme>

export const CARD_PADDING = { xs: 2.5, md: 3 } as const

export const NAME_SX = {
  m: 0,
  fontSize: { xs: '2.25rem', md: '3.5rem' },
  lineHeight: 1.05,
  fontWeight: 700,
  letterSpacing: '-0.02em',
} satisfies SxProps<Theme>

export const TAGLINE_SX = {
  m: 0,
  mt: { xs: 2, md: 3 },
  maxWidth: '36rem',
  fontSize: { xs: '1.1875rem', md: '1.375rem' },
  lineHeight: 1.5,
  color: 'text.secondary',
} satisfies SxProps<Theme>

export const SECTION_LABEL_SX = {
  m: 0,
  mb: 2.5,
  fontSize: { xs: '0.875rem', md: '0.9375rem' },
  lineHeight: 1.6,
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'text.secondary',
} satisfies SxProps<Theme>

export const ITEM_TITLE_SX = {
  m: 0,
  fontSize: { xs: '1.0625rem', md: '1.1875rem' },
  lineHeight: 1.4,
  fontWeight: 600,
  color: 'text.primary',
} satisfies SxProps<Theme>

export const META_SX = {
  fontSize: '0.9375rem',
  lineHeight: 1.6,
  color: 'text.secondary',
} satisfies SxProps<Theme>

export const DATES_SX = {
  ...META_SX,
  whiteSpace: 'nowrap',
  fontVariantNumeric: 'tabular-nums',
} satisfies SxProps<Theme>

export const BODY_SX = {
  fontSize: '1rem',
  lineHeight: 1.6,
  // About 70 characters per line, the comfortable reading range, however wide the column gets.
  maxWidth: '70ch',
} satisfies SxProps<Theme>

export const ITEM_GAP = 3
export const PROJECT_GAP = 2

/** primary.dark keeps AA contrast on the light background, where primary.main does not. */
export const TEXT_LINK_PROPS = {
  color: 'primary.dark',
  underline: 'always',
  sx: { textUnderlineOffset: '0.2em', '&:hover': { textDecorationThickness: '2px' } },
} as const
