import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const Summary: React.FC = () => (
  <Card style={{ marginTop: 16, marginBottom: 16 }}>
    <CardContent>
      <Typography gutterBottom variant='h5' component='h2'>
        Professional Summary
      </Typography>
      <Typography variant='body2' color='textSecondary' component='p'>
        With over a decade of experience in software development, I specialize in various
        technologies like PHP, React and Node.js. My versatility extends to managing different tech
        stacks and mentoring junior developers, promoting a collaborative learning environment. I am
        currently exploring the power of AI to enhance content quality and pushing forward with
        innovative strategies in the technological scene.
      </Typography>
    </CardContent>
  </Card>
)

export default Summary
