import { Box, Skeleton } from '@mui/material'
import React from 'react'
import LazyImage from './LazyImage'

type ProfileProps = {
  image: string
  name: string
  role: string
  resumeUrl?: string
}

const ProfileCard: React.FC<ProfileProps> = ({ image, name, role }) => {
  const [isImageLoading, setIsImageLoading] = React.useState(true)

  return (
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
        {isImageLoading && (
          <Skeleton
            variant='circular'
            width={200}
            height={200}
            sx={{ position: 'absolute' }}
            data-testid='profile-image-skeleton'
          />
        )}
        <LazyImage
          src={image}
          alt={`${name}'s profile picture`}
          title={`${name}'s profile picture`}
          width={200}
          height={200}
          priority
          onLoadStateChange={setIsImageLoading}
        />
      </Box>
      <Box component='header' style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p>{role}</p>
      </Box>
    </Box>
  )
}

export default ProfileCard
