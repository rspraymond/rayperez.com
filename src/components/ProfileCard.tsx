import { Avatar, Box } from '@mui/material'
import React from 'react'

type ProfileProps = {
  image: string
}

const ProfileCard: React.FC<ProfileProps> = ({ image }) => (
  <Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    style={{ margin: '1rem', padding: '1rem' }}
  >
    <Avatar alt='Remy Sharp' src={image} style={{ width: '200px', height: '200px' }} />
  </Box>
)

export default ProfileCard
