import { Card, CardContent, Link, Typography } from '@mui/material'
import React from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

const Summary: React.FC = () => (
  <Card style={{ marginTop: 16, marginBottom: 16 }}>
    <CardContent>
      <Typography
        gutterBottom
        variant='h5'
        component='h2'
        sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
      >
        <PersonOutlineIcon
          sx={{ mr: 1, color: 'text.secondary' }}
          fontSize='medium'
          aria-hidden='true'
        />
        Professional Summary
      </Typography>
      <Typography variant='body2' color='textSecondary' component='p'>
        I am Raymond Perez, a software engineer and entrepreneur focused on building impactful
        technology solutions. I specialize in full-stack development with expertise in PHP
        (Laravel), React, Node.js, and cloud infrastructure (AWS, Datadog, New Relic). I build
        scalable applications using{' '}
        <Link href='/why-opinionated' key='/why-opinionated' color='primary' underline='hover'>
          opinionated frameworks
        </Link>{' '}
        and modern development practices. I actively contribute to entrepreneurial communities and
        seek partnerships with innovators who share my vision for technology-driven solutions that
        address real-world challenges. Let's connect to explore collaboration opportunities or
        discuss how we can build something meaningful together.
      </Typography>
    </CardContent>
  </Card>
)

export default Summary
