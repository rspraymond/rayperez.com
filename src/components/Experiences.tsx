import React from 'react'
import { CardContent, Typography, Box } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import { helmetJsonLdProp } from 'react-schemaorg'
import { Occupation } from 'schema-dts'
import { Helmet } from 'react-helmet-async'
import SectionCard from './SectionCard'
import type { Experience as ExperienceType } from '../types/contentData'

type ExperiencesProps = {
  experiences: ExperienceType[]
}

const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  const occupationScripts = experiences.map((experience) =>
    helmetJsonLdProp<Occupation>({
      '@context': 'https://schema.org',
      '@type': 'Occupation',
      name: experience.title,
      responsibilities: experience.bullets.join(' '),
    }),
  )

  return (
    <SectionCard title='Career' icon={WorkOutlineIcon} marginTop={0} marginBottom={0}>
      <Helmet script={occupationScripts} />
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {experiences.length === 0 ? (
            <Typography variant='body2' color='text.secondary'>
              No experiences to display.
            </Typography>
          ) : (
            experiences.map((experience, index) => (
              <Box
                key={`${experience.company}-${experience.duration}-${index}`}
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
                  {experience.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mb: experience.bullets.length ? 1 : 0 }}
                >
                  {experience.company} - {experience.duration}
                </Typography>
                {experience.bullets.map((bullet, bulletIndex) => (
                  <Box marginTop={1.5} key={`${experience.company}-${bulletIndex}`}>
                    <Typography variant='body1'>{bullet}</Typography>
                  </Box>
                ))}
              </Box>
            ))
          )}
        </Box>
      </CardContent>
    </SectionCard>
  )
}

export default Experiences
