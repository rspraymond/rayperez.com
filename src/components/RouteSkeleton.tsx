import React from 'react'
import { Box, Container, Skeleton, Stack, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import {
  BODY_SX,
  ITEM_GAP,
  ITEM_TITLE_SX,
  META_SX,
  PAGE_CONTAINER_SX,
  PAGE_STACK_SPACING,
  PROJECT_GAP,
  SECTION_LABEL_SX,
  SECTION_SX,
} from '../styles/sectionStyles'

interface BarProps {
  sx: SxProps<Theme>
  width: string
}

/**
 * A text skeleton takes its height from the font size and line height of the text it stands in for.
 * Animation is off because the chunk usually arrives within a second, so motion would only add flicker.
 */
const Bar: React.FC<BarProps> = ({ sx, width }) => (
  <Skeleton variant='text' animation={false} width={width} sx={sx} />
)

interface SectionSkeletonProps {
  items: number
  bodyLines: number
  gap: number
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ items, bodyLines, gap }) => (
  <Box sx={SECTION_SX}>
    <Bar sx={SECTION_LABEL_SX} width='7ch' />
    <Stack spacing={gap}>
      {Array.from({ length: items }, (_, item) => (
        <Box key={item}>
          <Bar sx={ITEM_TITLE_SX} width='45%' />
          <Bar sx={META_SX} width='30%' />
          {Array.from({ length: bodyLines }, (_, line) => (
            <Bar key={line} sx={BODY_SX} width={line === bodyLines - 1 ? '70%' : '95%'} />
          ))}
        </Box>
      ))}
    </Stack>
  </Box>
)

/**
 * Stands in for Home's sections while the Home chunk loads; the route already shows Intro above it.
 * The full viewport height keeps the footer out of view so it cannot jump when the real sections arrive.
 */
export const HomeSectionsSkeleton: React.FC = () => (
  <Box aria-busy='true' sx={{ minHeight: '100vh' }}>
    <SectionSkeleton items={2} bodyLines={3} gap={ITEM_GAP} />
    <SectionSkeleton items={3} bodyLines={2} gap={PROJECT_GAP} />
  </Box>
)

export const AboutSkeleton: React.FC = () => (
  <Container maxWidth='md' aria-busy='true' sx={{ ...PAGE_CONTAINER_SX, minHeight: '100vh' }}>
    <Stack spacing={PAGE_STACK_SPACING}>
      {/* The About heading wraps to three lines on phones and fits on one line from sm up. */}
      <Typography variant='h2' component='div'>
        <Skeleton variant='text' animation={false} width='80%' />
        <Skeleton
          variant='text'
          animation={false}
          width='65%'
          sx={{ display: { xs: 'block', sm: 'none' } }}
        />
        <Skeleton
          variant='text'
          animation={false}
          width='50%'
          sx={{ display: { xs: 'block', sm: 'none' } }}
        />
      </Typography>
      <Box>
        {Array.from({ length: 5 }, (_, line) => (
          <Bar key={line} sx={BODY_SX} width={line === 4 ? '60%' : '100%'} />
        ))}
      </Box>
      <SectionSkeleton items={1} bodyLines={2} gap={ITEM_GAP} />
    </Stack>
  </Container>
)
