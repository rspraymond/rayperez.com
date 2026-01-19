import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import SocialMeta from '../components/SocialMeta'

const NotFound: React.FC = () => {
  return (
    <Box
      component='main'
      id='main-content'
      tabIndex={-1}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      textAlign='center'
    >
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <SocialMeta
        title='404 - Page Not Found'
        description="The page you're looking for doesn't exist. Please check the URL or return to the home page."
        type='website'
      />
      <Typography variant='h1' component='h2' gutterBottom>
        404
      </Typography>
      <Typography variant='h6' component='p' gutterBottom>
        Page Not Found
      </Typography>
      <Button variant='contained' color='primary' component={Link} to='/'>
        Go to Home Page
      </Button>
    </Box>
  )
}

export default NotFound
