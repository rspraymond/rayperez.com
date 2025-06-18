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
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Helmet } from 'react-helmet'
import Header from '../components/Header.tsx'
import ProfileCard from '../components/ProfileCard.tsx'
import RecentPosts from '../components/RecentPosts.tsx'
import profileImage from '../assets/raymond-perez.jpg'
import withCanonical from './WithCanonical.tsx'
import { PROFILE } from '../constants/profile'

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

  useEffect(() => {
    const handleScroll = (): void => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
              <Typography variant='h2' component='h1' gutterBottom>
                {title}
              </Typography>
              {children}
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
