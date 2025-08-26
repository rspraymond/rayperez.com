import React from 'react'
import { Box, Chip, Link, Typography } from '@mui/material'
import { SKILLS } from '../constants/skills'

const SkillsSection: React.FC = () => (
  <Box
    display='flex'
    flexDirection={{ xs: 'column', sm: 'row' }}
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    gap={1}
    mb={1}
  >
    <Typography variant='subtitle2' color='text.secondary' sx={{ minWidth: 60 }}>
      Skills:
    </Typography>
    <Box display='flex' flexWrap='wrap' gap={1}>
      {SKILLS.map((skill) =>
        skill.url ? (
          <Chip
            key={skill.label}
            label={skill.label}
            component={Link}
            href={skill.url}
            clickable
            size='small'
            variant='outlined'
            sx={{ borderColor: 'primary.main', color: 'primary.main' }}
          />
        ) : (
          <Chip
            key={skill.label}
            label={skill.label}
            size='small'
            variant='outlined'
            sx={{ borderColor: 'primary.main', color: 'primary.main' }}
          />
        ),
      )}
    </Box>
  </Box>
)

export default SkillsSection
