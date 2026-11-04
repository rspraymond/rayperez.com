import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import SectionCard from './SectionCard'
import ItemHeader from './ItemHeader'
import { ABOUT_PROFILE_SECTIONS } from '../constants/paths'
import { BODY_SX, ITEM_GAP, META_SX } from '../styles/sectionStyles'
import type { Education as EducationType } from '../types/contentData'

type EducationsProps = {
  educations: EducationType[]
}

const Educations: React.FC<EducationsProps> = ({ educations }) => (
  <SectionCard title={ABOUT_PROFILE_SECTIONS.education}>
    {educations.length === 0 ? (
      <Typography sx={META_SX}>No education to display.</Typography>
    ) : (
      <Stack spacing={ITEM_GAP}>
        {educations.map((education, index) => (
          <Box key={`${education.school}-${education.degree}-${index}`}>
            <ItemHeader
              title={education.school}
              detail={education.degree}
              dates={education.duration}
            />
            {education.details && (
              <Typography sx={{ ...BODY_SX, mt: 1 }}>{education.details}</Typography>
            )}
          </Box>
        ))}
      </Stack>
    )}
  </SectionCard>
)

export default Educations
