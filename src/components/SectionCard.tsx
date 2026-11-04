import React, { useId } from 'react'
import { Box, Typography } from '@mui/material'
import { SECTION_LABEL_SX, SECTION_SX } from '../styles/sectionStyles'

interface SectionCardProps {
  title: string
  children: React.ReactNode
  headingId?: string
  headingComponent?: 'h2' | 'h3'
  testId?: string
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  headingId,
  headingComponent = 'h2',
  testId,
}) => {
  // aria-labelledby always needs a target, so sections without an explicit id get a generated one.
  const generatedId = useId()
  const id = headingId ?? generatedId

  return (
    <Box component='section' aria-labelledby={id} data-testid={testId} sx={SECTION_SX}>
      <Typography component={headingComponent} id={id} sx={SECTION_LABEL_SX}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

export default SectionCard
