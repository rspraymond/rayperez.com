import React from 'react'
import { Box, Typography, Link, Stack } from '@mui/material'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import { PROFILE } from '../constants/profile'
import { FOOTER_SOCIAL_LINKS } from '../constants/social'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component='footer'
      sx={{
        mt: 4,
        pt: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 3 }}
        alignItems='center'
        justifyContent='center'
      >
        {FOOTER_SOCIAL_LINKS.map((social) => (
          <Link
            key={social.platform}
            href={social.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`${social.text} (opens in new window)`}
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
            {social.icon}
            <Typography variant='body2' component='span'>
              {social.text}
            </Typography>
          </Link>
        ))}
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
      </Stack>
      <Typography variant='body2' color='text.secondary'>
        © {currentYear} {PROFILE.name}
      </Typography>
    </Box>
  )
}

export default Footer
