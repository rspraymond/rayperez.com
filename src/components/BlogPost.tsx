import React, { useState, useEffect, Suspense, lazy } from 'react'
import { helmetJsonLdProp } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Box, Typography, Link, Breadcrumbs, Fab, IconButton, Tooltip } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Helmet } from 'react-helmet'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import LoadingSkeleton from './LoadingSkeleton'
import withCanonical from './WithCanonical'
import { PROFILE } from '../constants/profile'
import { useBookmarks } from '../hooks/useBookmarks'
import { calculateReadingTime, formatReadingTime } from '../utils/readingTime'
import profileImage from '../assets/raymond-perez.jpg'
import SocialShareButtons from './SocialShareButtons'
import { posts } from '../constants/posts'

const AuthorBio = lazy(() => import('./AuthorBio'))
const TableOfContents = lazy(() => import('./TableOfContents'))

interface BlogPostProps {
  title: string
  author: string
  date: string
  children: React.ReactNode
}

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const BlogPost: React.FC<BlogPostProps> = ({ title, author, date, children }) => {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const location = useLocation()
  const { isBookmarked, toggleBookmark } = useBookmarks()

  const currentPath = location.pathname
  const isCurrentlyBookmarked = isBookmarked(currentPath)

  // Calculate reading time from children content
  const extractTextFromChildren = (children: React.ReactNode): string => {
    let text = ''
    React.Children.forEach(children, (child) => {
      if (typeof child === 'string') {
        text += child
      } else if (React.isValidElement(child)) {
        text += extractTextFromChildren(child.props.children)
      }
    })
    return text
  }

  const textContent = extractTextFromChildren(children)
  const readingTime = calculateReadingTime(textContent)
  const readingTimeDisplay = formatReadingTime(readingTime)

  // Previous/Next navigation logic
  const sortedPosts = [...posts].sort((a, b) => {
    if (a.date === b.date) return a.path.localeCompare(b.path)
    return a.date < b.date ? 1 : -1 // Descending (newest first)
  })
  const currentIdx = sortedPosts.findIndex((p) => p.path === location.pathname)
  const prevPost = currentIdx > 0 ? sortedPosts[currentIdx - 1] : undefined
  const nextPost =
    currentIdx >= 0 && currentIdx < sortedPosts.length - 1 ? sortedPosts[currentIdx + 1] : undefined

  useEffect(() => {
    const handleScroll = (): void => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
            image: profileImage,
          }),
        ]}
      >
        <meta property='og:image' content={profileImage} />
        <title>
          {title} - {PROFILE.name} - {PROFILE.role}
        </title>
      </Helmet>
      <Box mb={2}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link component={RouterLink} color='inherit' to='/'>
            Home
          </Link>
          <Typography color='textPrimary'>{title}</Typography>
        </Breadcrumbs>
      </Box>
      <Box display='flex' alignItems='center' justifyContent='space-between' mb={2}>
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
      <Box mb={2}>
        <Typography variant='body2' color='text.secondary'>
          {readingTimeDisplay}
        </Typography>
      </Box>
      <Suspense fallback={<LoadingSkeleton testId='table-of-contents' />}>
        <TableOfContents />
      </Suspense>
      {children}
      <Suspense fallback={<LoadingSkeleton testId='author-bio' />}>
        <AuthorBio />
      </Suspense>
      {(prevPost || nextPost) && (
        <Box mt={6} mb={2} display='flex' justifyContent='space-between' alignItems='center'>
          {prevPost ? (
            <Box>
              <Typography variant='caption' color='text.secondary'>
                Previous
              </Typography>
              <Link
                component={RouterLink}
                to={prevPost.path}
                underline='hover'
                color='primary'
                sx={{ display: 'block', fontWeight: 500 }}
              >
                {prevPost.title}
              </Link>
            </Box>
          ) : (
            <span />
          )}
          <Box>
            <Link
              component={RouterLink}
              to='/'
              underline='hover'
              color='primary'
              aria-label='back to home'
              onClick={() => window.scrollTo({ top: 0 })}
              sx={{ fontWeight: 500 }}
            >
              Back to Home
            </Link>
          </Box>
          {nextPost ? (
            <Box textAlign='right'>
              <Typography variant='caption' color='text.secondary'>
                Next
              </Typography>
              <Link
                component={RouterLink}
                to={nextPost.path}
                underline='hover'
                color='primary'
                sx={{ display: 'block', fontWeight: 500 }}
              >
                {nextPost.title}
              </Link>
            </Box>
          ) : (
            <span />
          )}
        </Box>
      )}
      {showBackToTop && (
        <Fab
          size='small'
          onClick={scrollToTop}
          aria-label='back to top'
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            bgcolor: 'background.paper',
            color: 'text.secondary',
            border: '1px solid',
            borderColor: 'divider',
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
              bgcolor: 'action.hover',
              borderColor: 'primary.main',
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </React.Fragment>
  )
}

const BlogPostWithCanonical = withCanonical(BlogPost)

export default BlogPostWithCanonical
