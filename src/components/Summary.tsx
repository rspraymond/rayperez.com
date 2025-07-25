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
        Hi my name is Raymond. Feel free to call me Ray or Raymond, I don't mind either (my gamer
        tag is Reymundo). I am an aspiring entrepreneur focused on creating impactful business
        ventures that solve real-world problems. With expertise in PHP (Laravel), React, Node.js,
        and cloud computing (AWS, Datadog, New Relic), I leverage technology to develop innovative
        solutions. I prefer{' '}
        <Link href='/why-opinionated' key='/why-opinionated' color='primary' underline='hover'>
          opinionated frameworks
        </Link>
        . I actively engage in workshops and entrepreneurial communities. I invite collaboration
        with like-minded individuals for partnerships, mentorship, and sharing insights to drive
        meaningful change.
      </Typography>
    </CardContent>
  </Card>
)

export default Summary
