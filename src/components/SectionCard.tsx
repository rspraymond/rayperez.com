import React from 'react'
import { Card, CardContent, Typography, SvgIconProps } from '@mui/material'

interface SectionCardProps {
  title: string
  icon: React.ElementType<SvgIconProps>
  children: React.ReactNode
  headingId?: string
  marginTop?: number
  marginBottom?: number
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon: Icon,
  children,
  headingId,
  marginTop = 16,
  marginBottom = 0,
}) => {
  return (
    <Card style={{ marginTop, marginBottom }}>
      <CardContent>
        <Typography
          variant='h5'
          gutterBottom
          component='h2'
          id={headingId}
          sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
        >
          <Icon sx={{ mr: 1, color: 'text.secondary' }} fontSize='medium' aria-hidden='true' />
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  )
}

export default SectionCard
