import { Link, Typography } from '@mui/material'
import React from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SectionCard from './SectionCard'
import summaryData from '../data/content/summary.json'
import type { ProfessionalSummary } from '../types/contentData'

const Summary: React.FC = () => {
  const summary = summaryData as ProfessionalSummary
  const nameText = 'Raymond Perez'
  const linkText = 'opinionated frameworks'
  const linkHref = '/why-opinionated'

  const nameParts = summary.text.split(nameText)
  const linkParts = nameParts[1].split(linkText)

  return (
    <SectionCard
      title='Professional Summary'
      icon={PersonOutlineIcon}
      marginTop={0}
      marginBottom={0}
    >
      <Typography
        variant='body2'
        color='textSecondary'
        component='p'
        itemScope
        itemType='https://schema.org/Person'
      >
        {nameParts[0]}
        <span itemProp='name'>{nameText}</span>
        {linkParts[0]}
        <Link href={linkHref} key={linkHref} color='primary' underline='hover'>
          {linkText}
        </Link>
        {linkParts[1]}
      </Typography>
    </SectionCard>
  )
}

export default Summary
