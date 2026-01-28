import React, { Suspense, lazy } from 'react'
import { Container, CssBaseline, Box, Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import LoadingSkeleton from './LoadingSkeleton'
import Footer from './Footer'

const ProfileCard = lazy(() => import('./ProfileCard'))
const GitHubStats = lazy(() => import('./GitHubStats'))
const BookmarkedPosts = lazy(() => import('./BookmarkedPosts'))
const RecentPosts = lazy(() => import('./RecentPosts'))

const SiteLayout: React.FC = () => {
  return (
    <Container
      maxWidth='xl'
      sx={{
        py: { xs: 3, sm: 4, md: 4, lg: 5 },
        px: { xs: 2, sm: 3, md: 3, lg: 4 },
      }}
    >
      <CssBaseline />
      <Grid
        container
        spacing={{ xs: 3, sm: 3.5, md: 3.5, lg: 4 }}
        direction='row-reverse'
        alignItems='flex-start'
      >
        <Grid item xs={12} md={4} component='aside'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2.5, sm: 3, md: 3, lg: 3 },
              width: '100%',
            }}
          >
            <Header />
            <Suspense fallback={<LoadingSkeleton testId='profile-card' />}>
              <ProfileCard />
            </Suspense>
            <Suspense fallback={<LoadingSkeleton testId='bookmarked-posts' />}>
              <BookmarkedPosts />
            </Suspense>
            <Suspense fallback={<LoadingSkeleton testId='recent-posts' />}>
              <RecentPosts />
            </Suspense>
            <Suspense fallback={<LoadingSkeleton testId='github-stats' />}>
              <GitHubStats />
            </Suspense>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          component='main'
          id='main-content'
          tabIndex={-1}
          sx={{
            width: '100%',
            // Hide focus outline for programmatic focus, show only for keyboard navigation
            '&:focus': {
              outline: 'none',
            },
            '&:focus-visible': {
              outline: `2px solid ${(theme) => theme.palette.primary.main}`,
              outlineOffset: 2,
            },
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
      <Footer />
    </Container>
  )
}

export default SiteLayout
