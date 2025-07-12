import React, { useState, useEffect } from 'react'
import { helmetJsonLdProp } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import {
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Fab,
  IconButton,
  Tooltip,
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header.tsx'
import ProfileCard from '../components/ProfileCard.tsx'
import RecentPosts from '../components/RecentPosts.tsx'
import BookmarkedPosts from '../components/BookmarkedPosts.tsx'
import AuthorBio from '../components/AuthorBio.tsx'
import profileImage from '../assets/raymond-perez.jpg'
import withCanonical from './WithCanonical.tsx'
import { PROFILE } from '../constants/profile'
import { useBookmarks } from '../hooks/useBookmarks'
import { calculateReadingTime, formatReadingTime } from '../utils/readingTime'

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
      <Container maxWidth={false}>
        <CssBaseline />
        <Box my={2}>
          <Grid container spacing={2} direction='row-reverse' alignItems='flex-start'>
            <Grid item xs={12} lg={4}>
              <Header />
              <ProfileCard image={profileImage} name={PROFILE.name} role={PROFILE.role} />
              <BookmarkedPosts />
              <RecentPosts />
            </Grid>
            <Grid item xs={12} lg={8}>
              <Box mb={2}>
                <Breadcrumbs aria-label='breadcrumb'>
                  <Link color='inherit' href='/'>
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
              <Box mb={2}>
                <Typography variant='body2' color='text.secondary'>
                  {readingTimeDisplay}
                </Typography>
              </Box>
              {children}
              <AuthorBio />
            </Grid>
          </Grid>
        </Box>
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
      </Container>
    </React.Fragment>
  )
}

const BlogPostWithCanonical = withCanonical(BlogPost)

export default BlogPostWithCanonical
