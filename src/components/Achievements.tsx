import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

type Achievements = {
  achievements: string[]
}

const Achievements: React.FC<Achievements> = ({ achievements }) => (
  <Card style={{ marginTop: 16 }}>
    <CardContent>
      <Typography variant='h5' gutterBottom>
        Achievements
      </Typography>
      {achievements.map((achievement, key) => (
        <Box marginTop={2} key={key}>
          <Typography variant='body1'>{achievement}</Typography>
        </Box>
      ))}
    </CardContent>
  </Card>
)
export default Achievements
