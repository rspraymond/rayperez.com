import React from 'react'
import { Link, Typography } from '@mui/material'
import RouterLinkRef from '../utils/RouterLink'
import SectionCard from './SectionCard'
import { ABOUT_PROFILE_SECTIONS } from '../constants/paths'
import { BODY_SX, TEXT_LINK_PROPS } from '../styles/sectionStyles'

type Skill = {
  label: string
  url: string
}

type SkillsProps = {
  skills: readonly Skill[]
}

// ListFormat supplies the commas and the final "and" for any count, so the sentence needs no hand written join rules.
const listFormat = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  // formatToParts returns labels, not indexes, so links are matched by label. Skill labels must stay unique.
  const urlByLabel = new Map(skills.map((skill) => [skill.label, skill.url]))
  const parts = listFormat.formatToParts(skills.map((skill) => skill.label))

  return (
    <SectionCard title={ABOUT_PROFILE_SECTIONS.skills} headingId='skills-heading'>
      {skills.length > 0 && (
        <Typography component='p' sx={BODY_SX}>
          I work most with{' '}
          {parts.map((part, index) =>
            part.type === 'element' ? (
              <Link
                key={`${part.value}-${index}`}
                component={RouterLinkRef}
                to={urlByLabel.get(part.value) ?? '/'}
                {...TEXT_LINK_PROPS}
              >
                {part.value}
              </Link>
            ) : (
              <React.Fragment key={`literal-${index}`}>{part.value}</React.Fragment>
            ),
          )}
          .
        </Typography>
      )}
    </SectionCard>
  )
}

export default Skills
