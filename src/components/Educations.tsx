import React from 'react'
import { CardContent, Typography, Box } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import SectionCard from './SectionCard'
import type { Education as EducationType } from '../types/contentData'

type EducationsProps = {
  educations: EducationType[]
}

const Educations: React.FC<EducationsProps> = ({ educations }) => {
  return (
    <SectionCard title='Education' icon={SchoolIcon} marginTop={0} marginBottom={0}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {educations.length === 0 ? (
            <Typography variant='body2' color='text.secondary'>
              No education to display.
            </Typography>
          ) : (
            educations.map((education, index) => (
              <Box
                key={`${education.school}-${education.degree}-${index}`}
                sx={{
                  p: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 1,
                  },
                }}
              >
                <Typography variant='h6' component='h3' sx={{ fontWeight: 600, mb: 0.5 }}>
                  {education.degree}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mb: education.details ? 1 : 0 }}
                >
                  {education.school} - {education.duration}
                </Typography>
                {education.details && (
                  <Box marginTop={1.5}>
                    <Typography variant='body1'>{education.details}</Typography>
                  </Box>
                )}
              </Box>
            ))
          )}
        </Box>
      </CardContent>
    </SectionCard>
  )
}

export default Educations
