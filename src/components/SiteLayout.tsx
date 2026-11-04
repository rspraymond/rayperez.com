import React from 'react'
import { Box, Container, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { SITE_COLUMN_MAX_WIDTH } from '../styles/sectionStyles'

/** One reading column on every screen size: header and menu, the page, then the footer. */
const SiteLayout: React.FC = () => (
  <Container maxWidth={false} sx={{ maxWidth: SITE_COLUMN_MAX_WIDTH }}>
    <CssBaseline />
    <Header />
    <Box
      component='main'
      id='main-content'
      tabIndex={-1}
      sx={{
        // Navigation focuses main from script; show the ring only when a keyboard user lands here.
        '&:focus': { outline: 'none' },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
      }}
    >
      <Outlet />
    </Box>
    <Footer />
  </Container>
)

export default SiteLayout
