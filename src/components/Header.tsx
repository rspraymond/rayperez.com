import { Box, Container, Link, alpha } from '@mui/material'
import { useLocation } from 'react-router-dom'
import RouterLinkRef from '../utils/RouterLink'
import ThemeToggle from './ThemeToggle'
import resumePdf from '../assets/raymond-perez-software-engineer-resume.pdf'
import { PROFILE } from '../constants/profile'
import { ABOUT_PATH, HOME_SECTIONS } from '../constants/paths'
import { SITE_COLUMN_MAX_WIDTH } from '../styles/sectionStyles'

// 44px rows keep each menu link an easy touch target on phones.
const NAV_LINK_SX = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  fontSize: '0.9375rem',
  color: 'text.secondary',
  textDecoration: 'none',
  textUnderlineOffset: '0.35em',
  '&:hover': { color: 'text.primary', textDecoration: 'underline' },
  '&[aria-current="page"]': {
    color: 'text.primary',
    textDecoration: 'underline',
    textDecorationThickness: '2px',
  },
} as const

const homeSection = (id: string) => ({ pathname: '/', hash: id })

/**
 * Site header and menu. The name is a plain link because each page owns its single h1, and phones hide it so the
 * menu and the intro fit the first screen. Writing and Projects jump to home sections from any page; Home scrolls to them once loaded.
 * From sm up the bar sticks and blurs what scrolls beneath it; on phones it stays in flow so it never covers the short screen.
 */
function Header() {
  const { pathname } = useLocation()

  return (
    <Box
      component='header'
      sx={{
        position: { xs: 'static', sm: 'sticky' },
        top: 0,
        zIndex: 'appBar',
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: (theme) => alpha(theme.palette.background.default, 0.78),
        backdropFilter: 'saturate(180%) blur(12px)',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: SITE_COLUMN_MAX_WIDTH,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          columnGap: 3,
          py: { xs: 0.5, sm: 1.5 },
        }}
      >
        <Link
          component={RouterLinkRef}
          to='/'
          underline='hover'
          color='text.primary'
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            alignItems: 'center',
            minHeight: 44,
            fontWeight: 600,
          }}
        >
          {PROFILE.name}
        </Link>
        <Box
          component='nav'
          aria-label='Main'
          sx={{
            display: 'flex',
            alignItems: 'center',
            // On phones the menu takes its own full width row so all four links and the switch fit down to 320px.
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'space-between', sm: 'flex-end' },
            columnGap: { xs: 1, sm: 3 },
          }}
        >
          <Link
            component={RouterLinkRef}
            to={homeSection(HOME_SECTIONS.writing.id)}
            sx={NAV_LINK_SX}
          >
            {HOME_SECTIONS.writing.title}
          </Link>
          <Link
            component={RouterLinkRef}
            to={homeSection(HOME_SECTIONS.projects.id)}
            sx={NAV_LINK_SX}
          >
            {HOME_SECTIONS.projects.title}
          </Link>
          <Link
            component={RouterLinkRef}
            to={ABOUT_PATH}
            aria-current={pathname === ABOUT_PATH ? 'page' : undefined}
            sx={NAV_LINK_SX}
          >
            About
          </Link>
          <Link
            href={resumePdf}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Resume (opens in new window)'
            sx={NAV_LINK_SX}
          >
            Resume
          </Link>
          <ThemeToggle />
        </Box>
      </Container>
    </Box>
  )
}

export default Header
