import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const NotFound: React.FC = () => {
  return (
    <Box
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
