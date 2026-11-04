import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import SectionCard from './SectionCard'
import RouterLinkRef from '../utils/RouterLink'
import { HOME_SECTIONS } from '../constants/paths'
import { formatIsoDate } from '../utils/formatIsoDate'
import { BODY_SX, DATES_SX, PANEL_ROW_SX, PANEL_SX } from '../styles/sectionStyles'
import type { PostMeta } from '../constants/posts'

type WritingPost = Pick<PostMeta, 'title' | 'date' | 'path'>

interface WritingProps {
  posts: WritingPost[]
}

// Several posts share a date, so the path breaks ties and keeps the order stable between builds.
const newestFirst = (a: WritingPost, b: WritingPost): number =>
  b.date.localeCompare(a.date) || a.path.localeCompare(b.path)

/**
 * Every article, newest first, so each one is a single link from the home page.
 * Add an archive link here once the list grows past about fifteen articles.
 */
const Writing: React.FC<WritingProps> = ({ posts }) => (
  <SectionCard
    title={HOME_SECTIONS.writing.title}
    id={HOME_SECTIONS.writing.id}
    headingId='writing-heading'
  >
    <Box component='ul' sx={PANEL_SX}>
      {[...posts].sort(newestFirst).map((post) => (
        <Box
          component='li'
          key={post.path}
          sx={{
            ...PANEL_ROW_SX,
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            columnGap: 2,
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <Link
            component={RouterLinkRef}
            to={post.path}
            color='text.primary'
            underline='hover'
            sx={{
              ...BODY_SX,
              fontWeight: 500,
              textUnderlineOffset: '0.2em',
              // Stretches the click target over the whole row, date included, while the link's name stays the title.
              '&::after': { content: '""', position: 'absolute', inset: 0 },
            }}
          >
            {post.title}
          </Link>
          <Typography component='time' dateTime={post.date} sx={DATES_SX}>
            {formatIsoDate(post.date)}
          </Typography>
        </Box>
      ))}
    </Box>
  </SectionCard>
)

export default Writing
