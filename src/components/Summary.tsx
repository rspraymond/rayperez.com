import { Link, Typography } from '@mui/material'
import React from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SectionCard from './SectionCard'

const Summary: React.FC = () => (
  <SectionCard title='Professional Summary' icon={PersonOutlineIcon} marginTop={0} marginBottom={0}>
    <Typography variant='body2' color='textSecondary' component='p'>
      I am Raymond Perez, a software engineer and entrepreneur focused on building impactful
      technology solutions. I specialize in full-stack development with expertise in PHP (Laravel),
      React, Node.js, and cloud infrastructure (AWS, Datadog, New Relic). I build scalable
      applications using{' '}
      <Link href='/why-opinionated' key='/why-opinionated' color='primary' underline='hover'>
        opinionated frameworks
      </Link>{' '}
      and modern development practices. I actively contribute to entrepreneurial communities and
      seek partnerships with innovators who share my vision for technology-driven solutions that
      address real-world challenges. Let's connect to explore collaboration opportunities or discuss
      how we can build something meaningful together.
    </Typography>
  </SectionCard>
)

export default Summary
