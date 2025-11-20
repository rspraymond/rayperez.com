import React, { Suspense, lazy } from 'react'
import { helmetJsonLdProp } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Box, Container, Stack, Typography, IconButton, Tooltip } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import LoadingSkeleton from './LoadingSkeleton'
import withCanonical from './WithCanonical'
import { PROFILE } from '../constants/profile'
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
  children: React.ReactNode
  readingText?: string
}

const BlogPost: React.FC<BlogPostProps> = ({ title, author, date, children, readingText }) => {
  const { showBackToTop, scrollToTop } = useScrollToTop()
  const location = useLocation()
  const { isBookmarked, toggleBookmark } = useBookmarks()

  const currentPath = location.pathname
  const isCurrentlyBookmarked = isBookmarked(currentPath)

  const readingTimeDisplay = useReadingTime(readingText ?? children)
  const { prevPost, nextPost } = usePostNavigation()

  const handleBookmarkClick = () => {
    toggleBookmark(title, currentPath)
  }

  return (
    <React.Fragment>
      <Helmet
        script={[
          helmetJsonLdProp<BlogPosting>({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            author: {
              '@type': 'Person',
              name: author,
            },
            datePublished: date,
            image: PROFILE.image,
          }),
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
        url={window.location.href}
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
          <Box>
            {readingTimeDisplay ? (
              <Typography variant='body2' color='text.secondary'>
                {readingTimeDisplay}
              </Typography>
            ) : (
              <LoadingSkeleton testId='reading-time' />
            )}
          </Box>
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
