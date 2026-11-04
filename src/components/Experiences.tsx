import React from 'react'
import { Link, Stack, Typography } from '@mui/material'
import { helmetJsonLdProp } from 'react-schemaorg'
import { Occupation } from 'schema-dts'
import { Helmet } from 'react-helmet-async'
import SectionCard from './SectionCard'
import ItemHeader from './ItemHeader'
import resumePdf from '../assets/raymond-perez-software-engineer-resume.pdf'
import { HOME_SECTIONS } from '../constants/paths'
import { toYearRange } from '../utils/toYearRange'
import { ITEM_GAP, META_SX, TEXT_LINK_PROPS } from '../styles/sectionStyles'
import type { Experience as ExperienceType } from '../types/contentData'

type ExperiencesProps = {
  experiences: ExperienceType[]
}

const SENIOR_TITLE = /\bsenior\b/i

/** Home shows only the senior roles, one line each; the resume carries the full history. */
const Experiences: React.FC<ExperiencesProps> = ({ experiences }) => {
  const seniorRoles = experiences.filter((experience) => SENIOR_TITLE.test(experience.title))
  const occupationScripts = seniorRoles.map((experience) =>
    helmetJsonLdProp<Occupation>({
      '@context': 'https://schema.org',
      '@type': 'Occupation',
      name: experience.title,
      responsibilities: experience.bullets.join(' '),
    }),
  )

  return (
    <SectionCard
      title={HOME_SECTIONS.experience.title}
      id={HOME_SECTIONS.experience.id}
      headingId='experience-heading'
    >
      <Helmet script={occupationScripts} />
      {seniorRoles.length === 0 ? (
        <Typography sx={META_SX}>No experiences to display.</Typography>
      ) : (
        <Stack spacing={ITEM_GAP / 2}>
          {seniorRoles.map((experience) => (
            <ItemHeader
              key={`${experience.company}-${experience.duration}`}
              title={experience.company}
              detail={experience.title}
              dates={toYearRange(experience.duration)}
            />
          ))}
        </Stack>
      )}
      <Typography component='p' sx={{ ...META_SX, mt: ITEM_GAP }}>
        <Link
          href={resumePdf}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Full history in my resume (opens in new window)'
          {...TEXT_LINK_PROPS}
        >
          Full history in my resume
        </Link>
      </Typography>
    </SectionCard>
  )
}

export default Experiences
