import { Link, Typography } from '@mui/material'
import React from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SectionCard from './SectionCard'
import summaryData from '../data/content/summary.json'
import profileData from '../data/content/profile.json'
import type { ProfessionalSummary, Profile } from '../types/contentData'
import { parseMarkdownLinks, type TextSegment } from '../utils/parseMarkdownLinks'

const Summary: React.FC = () => {
  const summary = summaryData as ProfessionalSummary
  const profile = profileData as Profile
  const nameText = profile.name

  const segments = parseMarkdownLinks(summary.text)

  const renderSegment = (segment: TextSegment, index: number): React.ReactNode => {
    if (segment.type === 'link') {
      return (
        <Link href={segment.href} key={`link-${index}`} color='primary' underline='hover'>
          {segment.content}
        </Link>
      )
    }

    // For text segments, check if they contain the name and wrap it for schema.org
    const text = segment.content
    if (text.includes(nameText)) {
      const nameParts = text.split(nameText)
      return (
        <React.Fragment key={`text-${index}`}>
          {nameParts[0]}
          <span itemProp='name'>{nameText}</span>
          {nameParts[1]}
        </React.Fragment>
      )
    }

    return <React.Fragment key={`text-${index}`}>{text}</React.Fragment>
  }

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
        {segments.map((segment, index) => renderSegment(segment, index))}
      </Typography>
    </SectionCard>
  )
}

export default Summary
