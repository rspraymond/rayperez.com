import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

type Education = {
  degree: string
  school: string
  duration: string
  details: string
}

const Education: React.FC<Education> = ({ degree, school, duration, details }) => (
  <Card style={{ marginTop: 16 }}>
    <CardContent>
      <Typography variant='h5' gutterBottom component='h2'>
        {degree}
      </Typography>
      <Typography variant='subtitle1' color='textSecondary' component='p'>
        {school} - {duration}
      </Typography>
      <Box marginTop={2}>
        <Typography variant='body1'>{details}</Typography>
      </Box>
    </CardContent>
  </Card>
)
export default Education
