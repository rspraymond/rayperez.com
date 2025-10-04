import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'
import { PROFILE } from '../constants/profile'

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/raymond-perez-eng/',
    icon: LinkedInIcon,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/rspraymond',
    icon: GitHubIcon,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/onlyray7',
    icon: TwitterIcon,
  },
]

const SocialLinksSection: React.FC = () => (
  <Box
    display='flex'
    flexDirection={{ xs: 'column', sm: 'row' }}
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    gap={1}
    mt={1}
  >
    <Typography variant='subtitle2' color='text.secondary' sx={{ minWidth: 120 }}>
      Find me online:
    </Typography>
    <Box display='flex' gap={2}>
      {SOCIAL_LINKS.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Visit ${PROFILE.name}'s ${social.name} profile`}
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
          <social.icon fontSize='small' />
        </Link>
      ))}
    </Box>
  </Box>
)

export default SocialLinksSection
