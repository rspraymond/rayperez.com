import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const Summary: React.FC = () => (
  <Card style={{ marginTop: 16, marginBottom: 16 }}>
    <CardContent>
      <Typography gutterBottom variant='h5' component='h2'>
        Professional Summary
      </Typography>
      <Typography variant='body2' color='textSecondary' component='p'>
        Hi my name is Raymond. Feel free to call me Ray or Raymond, I don't mind either (my gamer
        tag is Reymundo). I am an ambitious entrepreneur focused on creating impactful business
        ventures that solve real-world problems. With expertise in PHP (Laravel), React, Node.js,
        and cloud computing (AWS, Datadog, New Relic), I leverage technology to develop innovative
        solutions. Committed to continuous learning and growth, I actively engage in workshops and
        entrepreneurial communities. I invite collaboration with like-minded individuals for
        partnerships, mentorship, and sharing insights to drive meaningful change.
      </Typography>
    </CardContent>
  </Card>
)

export default Summary
