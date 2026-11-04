import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { helmetJsonLdProp } from 'react-schemaorg'
import { Occupation } from 'schema-dts'
import { Helmet } from 'react-helmet-async'
import SectionCard from './SectionCard'
import ItemHeader from './ItemHeader'
import { BODY_SX, ITEM_GAP, META_SX } from '../styles/sectionStyles'
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
    <SectionCard title='Experience' headingId='experience-heading'>
      <Helmet script={occupationScripts} />
      {experiences.length === 0 ? (
        <Typography sx={META_SX}>No experiences to display.</Typography>
      ) : (
        <Stack spacing={ITEM_GAP}>
          {experiences.map((experience, index) => (
            <Box key={`${experience.company}-${experience.duration}-${index}`}>
              <ItemHeader
                title={experience.company}
                detail={experience.title}
                dates={experience.duration}
              />
              {experience.bullets.length > 0 && (
                <Box
                  component='ul'
                  sx={{ m: 0, mt: 1, pl: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                  {experience.bullets.map((bullet) => (
                    <Typography component='li' key={bullet} sx={BODY_SX}>
                      {bullet}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      )}
    </SectionCard>
  )
}

export default Experiences
