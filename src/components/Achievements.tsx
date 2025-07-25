import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'

type Achievements = {
  achievements: string[]
}

const Achievements: React.FC<Achievements> = ({ achievements }) => (
  <Card style={{ marginTop: 16 }}>
    <CardContent>
      <Typography
        variant='h5'
        gutterBottom
        component='h2'
        sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
      >
        <EmojiEventsOutlinedIcon
          sx={{ mr: 1, color: 'text.secondary' }}
          fontSize='medium'
          aria-hidden='true'
        />
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
