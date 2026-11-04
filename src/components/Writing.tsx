import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import SectionCard from './SectionCard'
import RouterLinkRef from '../utils/RouterLink'
import { HOME_SECTIONS } from '../constants/paths'
import { formatIsoDate } from '../utils/formatIsoDate'
import { BODY_SX, DATES_SX, TEXT_LINK_PROPS } from '../styles/sectionStyles'
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
    <Box
      component='ul'
      sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1.5 }}
    >
      {[...posts].sort(newestFirst).map((post) => (
        <Box
          component='li'
          key={post.path}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            columnGap: 2,
          }}
        >
          <Link
            component={RouterLinkRef}
            to={post.path}
            {...TEXT_LINK_PROPS}
            sx={{ ...TEXT_LINK_PROPS.sx, ...BODY_SX }}
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
