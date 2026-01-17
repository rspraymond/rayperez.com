import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import { PROFILE } from '../constants/profile'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component='footer'
      sx={{
        mt: 4,
        pt: 3,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: 1, sm: 2 },
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Typography variant='body2' color='text.secondary'>
        © {currentYear} {PROFILE.name}
      </Typography>
      <Link
        href='/feed.xml'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='RSS Feed'
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          color: 'text.secondary',
          textDecoration: 'none',
          '&:hover': {
            color: 'primary.main',
            textDecoration: 'underline',
          },
        }}
      >
        <RssFeedIcon fontSize='small' />
        <Typography variant='body2' component='span'>
          RSS Feed
        </Typography>
      </Link>
    </Box>
  )
}

export default Footer
