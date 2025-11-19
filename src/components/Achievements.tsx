import { Box, Typography } from '@mui/material'
import React from 'react'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import SectionCard from './SectionCard'

type Achievements = {
  achievements: string[]
}

const Achievements: React.FC<Achievements> = ({ achievements }) => (
  <SectionCard title='Achievements' icon={EmojiEventsOutlinedIcon} marginTop={0} marginBottom={0}>
    {achievements.map((achievement, key) => (
      <Box marginTop={2} key={key}>
        <Typography variant='body1'>{achievement}</Typography>
      </Box>
    ))}
  </SectionCard>
)
export default Achievements
