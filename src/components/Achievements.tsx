import React from 'react'
import { Box, Typography } from '@mui/material'
import SectionCard from './SectionCard'
import { ABOUT_PROFILE_SECTIONS } from '../constants/paths'
import { BODY_SX } from '../styles/sectionStyles'

type AchievementsProps = {
  achievements: string[]
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => (
  <SectionCard title={ABOUT_PROFILE_SECTIONS.achievements}>
    <Box component='ul' sx={{ m: 0, pl: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
      {achievements.map((achievement) => (
        <Typography component='li' key={achievement} sx={BODY_SX}>
          {achievement}
        </Typography>
      ))}
    </Box>
  </SectionCard>
)

export default Achievements
