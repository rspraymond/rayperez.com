import { Box } from '@mui/material'
import React from 'react'
import LazyImage from './LazyImage'

type ProfileProps = {
  image: string
  name: string
  role: string
  resumeUrl?: string
}

const ProfileCard: React.FC<ProfileProps> = ({ image, name, role }) => (
  <Box
    component='article'
    display='flex'
    flexDirection='column'
    alignItems='center'
    style={{ margin: '1rem', padding: '1rem' }}
    data-testid='profile-card-component'
  >
    <Box
      sx={{
        borderRadius: '50%',
        overflow: 'hidden',
        width: 200,
        height: 200,
      }}
    >
      <LazyImage src={image} alt={`${name}'s profile picture`} width={200} height={200} priority />
    </Box>
    <Box component='header' style={{ textAlign: 'center', marginTop: '1rem' }}>
      <p>{role}</p>
    </Box>
  </Box>
)

export default ProfileCard
