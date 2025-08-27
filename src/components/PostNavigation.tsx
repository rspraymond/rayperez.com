import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
interface PostNavigationProps {
  prevPost?: {
    title: string
    path: string
  }
  nextPost?: {
    title: string
    path: string
  }
}

const PostNavigation: React.FC<PostNavigationProps> = ({ prevPost, nextPost }) => {
  if (!prevPost && !nextPost) return null

  return (
    <Box mt={6} mb={2} display='flex' justifyContent='space-between' alignItems='center'>
      {prevPost ? (
        <Box>
          <Typography variant='caption' color='text.secondary'>
            Previous
          </Typography>
          <Link
            component={RouterLink}
            to={prevPost.path}
            underline='hover'
            color='primary'
            sx={{ display: 'block', fontWeight: 500 }}
          >
            {prevPost.title}
          </Link>
        </Box>
      ) : (
        <span />
      )}
      <Box>
        <Link
          component={RouterLink}
          to='/'
          underline='hover'
          color='primary'
          aria-label='back to home'
          onClick={() => window.scrollTo({ top: 0 })}
          sx={{ fontWeight: 500 }}
        >
          Back to Home
        </Link>
      </Box>
      {nextPost ? (
        <Box textAlign='right'>
          <Typography variant='caption' color='text.secondary'>
            Next
          </Typography>
          <Link
            component={RouterLink}
            to={nextPost.path}
            underline='hover'
            color='primary'
            sx={{ display: 'block', fontWeight: 500 }}
          >
            {nextPost.title}
          </Link>
        </Box>
      ) : (
        <span />
      )}
    </Box>
  )
}

export default PostNavigation
