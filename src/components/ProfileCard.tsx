import { Box, Skeleton, Button, Typography } from '@mui/material'
import React from 'react'
import LazyImage from './LazyImage'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

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
      data-testid='profile-card-component'
      itemScope
      itemType='https://schema.org/Person'
      sx={{
        width: '100%',
        p: 3,
        borderRadius: 3,
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          borderRadius: '50%',
          overflow: 'hidden',
          width: 200,
          height: 200,
          position: 'relative',
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
      <Typography variant='body1' color='text.secondary' sx={{ mt: 2 }} itemProp='jobTitle'>
        {role}
      </Typography>
      <Button
        variant='outlined'
        color='primary'
        component='a'
        href='https://www.linkedin.com/in/raymond-perez-eng/'
        target='_blank'
        rel='noopener noreferrer'
        startIcon={<LinkedInIcon />}
        aria-label='Connect with Raymond on LinkedIn'
        sx={{ mt: 1 }}
      >
        Connect on LinkedIn
      </Button>
    </Box>
  )
}

export default ProfileCard
