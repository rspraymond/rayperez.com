import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import profileImage from '../assets/raymond-perez.jpg'
import { PROFILE } from '../constants/profile'
import { NAME_SX, TAGLINE_SX, TEXT_LINK_PROPS } from '../styles/sectionStyles'

const PHOTO_SIZE = 88

const CONTACT_LINKS = [
  { label: 'LinkedIn', href: PROFILE.linkedinUrl, external: true },
  { label: 'GitHub', href: PROFILE.githubUrl, external: true },
  { label: 'Email', href: `mailto:${PROFILE.email}`, external: false },
] as const

/**
 * The page heading and introduction for the home route. It renders outside the route's Suspense, so it must stay light.
 * The photo is a plain img rather than LazyImage, which would flash a spinner inside the small circle.
 */
const Intro: React.FC = () => (
  <Box sx={{ pb: { xs: 5, md: 8 } }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
      <Box
        component='img'
        src={profileImage}
        alt={`${PROFILE.name}'s profile picture`}
        width={PHOTO_SIZE}
        height={PHOTO_SIZE}
        loading='eager'
        decoding='async'
        sx={{
          width: { xs: 64, sm: PHOTO_SIZE },
          height: { xs: 64, sm: PHOTO_SIZE },
          flexShrink: 0,
          borderRadius: '50%',
          objectFit: 'cover',
          bgcolor: 'action.hover',
          // Hides the broken image glyph and alt text if the photo fails; the name beside it still identifies the person.
          color: 'transparent',
        }}
      />
      <Typography component='h1' sx={NAME_SX}>
        {PROFILE.name}
      </Typography>
    </Box>
    <Typography component='p' sx={TAGLINE_SX}>
      {PROFILE.tagline}
    </Typography>
    <Box
      component='p'
      sx={{ m: 0, mt: { xs: 2, md: 3 }, display: 'flex', flexWrap: 'wrap', columnGap: 1.25 }}
    >
      {CONTACT_LINKS.map(({ label, href, external }, index) => (
        <React.Fragment key={label}>
          {index > 0 && (
            <Box component='span' aria-hidden='true' sx={{ color: 'text.secondary' }}>
              ·
            </Box>
          )}
          <Link
            href={href}
            {...TEXT_LINK_PROPS}
            {...(external && {
              target: '_blank',
              rel: 'noopener noreferrer',
              'aria-label': `${label} (opens in new window)`,
            })}
          >
            {label}
          </Link>
        </React.Fragment>
      ))}
    </Box>
  </Box>
)

export default Intro
