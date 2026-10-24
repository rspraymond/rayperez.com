import React, { Suspense, lazy, useState } from 'react'
import { helmetJsonLdProp } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Box, Container, Link, Stack, Typography, IconButton, Tooltip } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import LoadingSkeleton from './LoadingSkeleton'
import withCanonical from './WithCanonical'
import { PROFILE } from '../constants/profile'
import { ABOUT_PATH } from '../constants/paths'
import RouterLinkRef from '../utils/RouterLink'
import { buildBlogPostingSchema } from '../constants/schema'
import { SITE_URL } from '../constants/siteUrl'
import { formatIsoDate } from '../utils/formatIsoDate'
import { useBookmarks } from '../hooks/useBookmarks'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { usePostNavigation } from '../hooks/usePostNavigation'
import { useReadingTime } from '../hooks/useReadingTime'
import SocialShareButtons from './SocialShareButtons'
import SocialMeta from './SocialMeta'
import PostNavigation from './PostNavigation'
import BackToTopButton from './BackToTopButton'
import BlogBreadcrumbs from './BlogBreadcrumbs'

const AuthorBio = lazy(() => import('./AuthorBio'))
const TableOfContents = lazy(() => import('./TableOfContents'))

interface BlogPostProps {
  title: string
  author: string
  date: string
  updated?: string
  children: React.ReactNode
  readingText?: string
  metadata?: React.ReactNode
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  author,
  date,
  updated,
  children,
  readingText,
  metadata,
}) => {
  const { showBackToTop, scrollToTop } = useScrollToTop()
  const location = useLocation()
  const { isBookmarked, toggleBookmark } = useBookmarks()

  const currentPath = location.pathname
  // Equal dates mean the article was never revised, so showing an update would be misleading.
  const hasUpdate = updated !== undefined && updated !== date
  const isCurrentlyBookmarked = isBookmarked(currentPath)
  const [announcement, setAnnouncement] = useState<string>('')

  const readingTimeDisplay = useReadingTime(readingText ?? children)
  const { prevPost, nextPost } = usePostNavigation()

  const handleBookmarkClick = () => {
    const wasBookmarked = isCurrentlyBookmarked
    toggleBookmark(title, currentPath)
    setAnnouncement(wasBookmarked ? 'Bookmark removed' : 'Article bookmarked')
    setTimeout(() => setAnnouncement(''), 1000)
  }

  return (
    <React.Fragment>
      <Box
        component='div'
        aria-live='polite'
        role='status'
        sx={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
      >
        {announcement}
      </Box>
      <Helmet
        script={[
          helmetJsonLdProp<BlogPosting>(
            buildBlogPostingSchema({
              title,
              url: `${SITE_URL}${currentPath}`,
              datePublished: date,
              dateModified: updated,
            }),
          ),
        ]}
      >
        <title>
          {title} - {PROFILE.name} - {PROFILE.role}
        </title>
      </Helmet>
      <SocialMeta
        title={title}
        description={`${title} by ${author} - ${readingTimeDisplay} read`}
        type='article'
        url={typeof window !== 'undefined' ? window.location.href : ''}
      />
      <Container
        component='article'
        maxWidth='md'
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Stack spacing={{ xs: 3, md: 4 }}>
          <BlogBreadcrumbs title={title} />
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Typography variant='h2' component='h1' sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Tooltip title={isCurrentlyBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}>
              <IconButton
                onClick={handleBookmarkClick}
                aria-label={isCurrentlyBookmarked ? 'remove bookmark' : 'bookmark article'}
                sx={{
                  color: isCurrentlyBookmarked ? 'primary.main' : 'text.secondary',
                  ml: 2,
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'action.hover',
                  },
                }}
              >
                {isCurrentlyBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          <SocialShareButtons title={title} />
          <Stack spacing={0.5}>
            <Typography variant='body2' color='text.secondary'>
              By{' '}
              <Link component={RouterLinkRef} to={ABOUT_PATH} rel='author'>
                {author}
              </Link>
              {' · '}
              <time data-testid='published-date' dateTime={date}>
                {formatIsoDate(date)}
              </time>
              {hasUpdate && (
                <React.Fragment>
                  {' · Updated '}
                  <time data-testid='updated-date' dateTime={updated}>
                    {formatIsoDate(updated)}
                  </time>
                </React.Fragment>
              )}
            </Typography>
            {readingTimeDisplay ? (
              <Typography variant='body2' color='text.secondary'>
                {readingTimeDisplay}
              </Typography>
            ) : (
              <LoadingSkeleton testId='reading-time' />
            )}
          </Stack>
          {metadata && <Box sx={{ mb: 2 }}>{metadata}</Box>}
          <Suspense fallback={<LoadingSkeleton testId='table-of-contents' />}>
            <TableOfContents />
          </Suspense>
          <Box component='section'>{children}</Box>
          <Suspense fallback={<LoadingSkeleton testId='author-bio' />}>
            <AuthorBio />
          </Suspense>
          <PostNavigation prevPost={prevPost} nextPost={nextPost} />
        </Stack>
      </Container>
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </React.Fragment>
  )
}

const BlogPostWithCanonical = withCanonical(BlogPost)

export default BlogPostWithCanonical
