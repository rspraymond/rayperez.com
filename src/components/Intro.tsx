import React from 'react'
import { Box, Typography } from '@mui/material'
import profileImage from '../assets/raymond-perez.jpg'
import { PROFILE } from '../constants/profile'
import { NAME_SX, TAGLINE_SX } from '../styles/sectionStyles'

const PHOTO_SIZE = 88

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
  </Box>
)

export default Intro
