import { Box, Typography } from '@mui/material'
import React from 'react'

type Education = {
  degree: string
  school: string
  duration: string
  details: string
}

const Education: React.FC<Education> = ({ degree, school, duration, details }) => (
  <>
    <Typography variant='h6' component='h3' sx={{ fontWeight: 600, mb: 0.5 }}>
      {degree}
    </Typography>
    <Typography variant='body2' color='text.secondary' sx={{ mb: details ? 1 : 0 }}>
      {school} - {duration}
    </Typography>
    {details && (
      <Box marginTop={1.5}>
        <Typography variant='body1'>{details}</Typography>
      </Box>
    )}
  </>
)
export default Education
