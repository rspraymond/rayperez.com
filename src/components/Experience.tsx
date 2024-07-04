import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

type Experience = {
  title: string
  company: string
  duration: string
  bullets: string[]
}

const Experience: React.FC<Experience> = ({ title, company, duration, bullets }) => (
  <Card style={{ marginTop: 16 }}>
    <CardContent>
      <Typography variant='h5' gutterBottom>
        {title}
      </Typography>
      <Typography variant='subtitle1' color='textSecondary'>
        {company} - {duration}
      </Typography>
      {bullets.map((bullet, key) => (
        <Box marginTop={2} key={key}>
          <Typography variant='body1'>{bullet}</Typography>
        </Box>
      ))}
    </CardContent>
  </Card>
)
export default Experience
