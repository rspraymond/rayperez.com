import React from 'react'
import { Box, Container, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SkipLink from './SkipLink'
import { MAIN_CONTENT_ID } from '../constants/paths'
import { SITE_COLUMN_MAX_WIDTH } from '../styles/sectionStyles'

/** One column on every screen size: the skip link, the full width header and menu, then the page and the footer. */
const SiteLayout: React.FC = () => (
  <React.Fragment>
    <CssBaseline />
    <SkipLink />
    {/* The header spans the full window so its sticky bar reads as one layer above the page. */}
    <Header />
    <Container maxWidth={false} sx={{ maxWidth: SITE_COLUMN_MAX_WIDTH }}>
      <Box
        component='main'
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        sx={{
          // Navigation focuses main from script; show the ring only when a keyboard user lands here.
          '&:focus': { outline: 'none' },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Container>
  </React.Fragment>
)

export default SiteLayout
