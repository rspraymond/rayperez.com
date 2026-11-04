import type { SxProps, Theme } from '@mui/material'

/**
 * Shared by the real sections and their route skeletons, so a placeholder line
 * occupies exactly the space of the text that replaces it.
 */
/** Page column shared by Home, About, and their skeletons. */
export const PAGE_CONTAINER_SX = {
  py: { xs: 4, md: 6 },
  px: { xs: 2, sm: 3 },
} satisfies SxProps<Theme>

export const PAGE_STACK_SPACING = { xs: 3, md: 4 } as const

export const SECTION_SX = {
  borderTop: 1,
  borderColor: 'divider',
  py: { xs: 4, md: 5 },
} satisfies SxProps<Theme>

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
} satisfies SxProps<Theme>

export const ITEM_GAP = 3
export const PROJECT_GAP = 3.5

/** primary.dark keeps AA contrast on the light background, where primary.main does not. */
export const TEXT_LINK_PROPS = {
  color: 'primary.dark',
  underline: 'always',
  sx: { textUnderlineOffset: '0.2em', '&:hover': { textDecorationThickness: '2px' } },
} as const
