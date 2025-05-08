import { Avatar, Box } from '@mui/material'
import React from 'react'

type ProfileProps = {
  image: string
  name: string
  role: string
}

const ProfileCard: React.FC<ProfileProps> = ({ image, name, role }) => (
  <Box
    component='article'
    display='flex'
    flexDirection='column'
    alignItems='center'
    style={{ margin: '1rem', padding: '1rem' }}
  >
    <Avatar
      alt={`${name}'s profile picture`}
      src={image}
      style={{ width: '200px', height: '200px' }}
      imgProps={{
        loading: 'eager',
        decoding: 'async',
      }}
    />
    <Box component='header' style={{ textAlign: 'center', marginTop: '1rem' }}>
      <p>{role}</p>
    </Box>
  </Box>
)

export default ProfileCard
