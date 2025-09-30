import React, { Suspense, lazy } from 'react'
import { Container, CssBaseline, Box, Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import LoadingSkeleton from './LoadingSkeleton'
import profileImage from '../assets/raymond-perez.jpg'
import { PROFILE } from '../constants/profile'

const ProfileCard = lazy(() => import('./ProfileCard'))
const BookmarkedPosts = lazy(() => import('./BookmarkedPosts'))
const RecentPosts = lazy(() => import('./RecentPosts'))
const SidebarSocials = lazy(() => import('./SidebarSocials'))

const SiteLayout: React.FC = () => {
  return (
    <Container maxWidth={false}>
      <CssBaseline />
      <Box my={2}>
        <Grid container spacing={2} direction='row-reverse' alignItems='flex-start'>
          <Grid item xs={12} lg={4}>
            <Header />
            <Suspense fallback={<LoadingSkeleton testId='profile-card' />}>
              <ProfileCard image={profileImage} name={PROFILE.name} role={PROFILE.role} />
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
          </Grid>
          <Grid item xs={12} lg={8}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default SiteLayout
