import { Card, CardContent, Chip, Typography } from '@mui/material'
import React from 'react'

type Skills = {
  skills: string[]
}

const Skills: React.FC<Skills> = ({ skills }) => (
  <Card style={{ marginTop: 16 }}>
    <CardContent>
      <Typography variant='h5' gutterBottom>
        Skills
      </Typography>
      {skills.map((skill) => (
        <Chip label={skill} style={{ margin: 5 }} />
      ))}
    </CardContent>
  </Card>
)
export default Skills
