import React, { Suspense, lazy } from 'react'
import { Container, CssBaseline, Box, Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import LoadingSkeleton from './LoadingSkeleton'

const ProfileCard = lazy(() => import('./ProfileCard'))
const BookmarkedPosts = lazy(() => import('./BookmarkedPosts'))
const RecentPosts = lazy(() => import('./RecentPosts'))
const SidebarSocials = lazy(() => import('./SidebarSocials'))

const SiteLayout: React.FC = () => {
  return (
    <Container
      maxWidth='xl'
      sx={{
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 4 },
      }}
    >
      <CssBaseline />
      <Grid container spacing={{ xs: 3, md: 4 }} direction='row-reverse' alignItems='flex-start'>
        <Grid item xs={12} lg={4} component='aside'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2.5, md: 3 },
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
            <Suspense fallback={<LoadingSkeleton testId='sidebar-socials' />}>
              <SidebarSocials
                socials={[
                  { text: 'Twitter', href: 'https://twitter.com/onlyray7', platform: 'twitter' },
                  { text: 'Twitch', href: 'https://twitch.tv/onlyray', platform: 'twitch' },
                ]}
              />
            </Suspense>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8} component='section' sx={{ width: '100%' }}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SiteLayout
