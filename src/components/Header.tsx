import { Box, IconButton, useTheme, Link } from '@mui/material'
import RouterLinkRef from '../utils/RouterLink'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import DescriptionIcon from '@mui/icons-material/Description'
import ThemeToggle from './ThemeToggle'
import resumePdf from '../assets/raymond-perez-software-engineer-resume.pdf'
import { PROFILE } from '../constants/profile'

/**
 * Sidebar header. The name is a plain link on every route because each page owns its single h1.
 */
function Header() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Link
          component={RouterLinkRef}
          to='/'
          underline='hover'
          color='inherit'
          itemScope
          itemType='https://schema.org/Person'
          sx={{
            flexGrow: 1,
            fontWeight: 400,
            fontSize: theme.typography.h6.fontSize,
            lineHeight: theme.typography.h6.lineHeight,
            fontFamily: theme.typography.h6.fontFamily,
            textDecoration: 'none',
          }}
        >
          <span itemProp='name'>{PROFILE.name}</span>
        </Link>
        <ThemeToggle />
        <IconButton
          href='https://www.linkedin.com/in/raymond-perez-eng/'
          color='inherit'
          component='a'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='LinkedIn Profile'
          size='small'
        >
          <LinkedInIcon fontSize='small' />
        </IconButton>
        <IconButton
          href='https://github.com/rspraymond'
          color='inherit'
          component='a'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub Profile'
          size='small'
        >
          <GitHubIcon fontSize='small' />
        </IconButton>
        <IconButton
          href={resumePdf}
          color='inherit'
          component='a'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Resume'
          size='small'
        >
          <DescriptionIcon fontSize='small' />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Header
