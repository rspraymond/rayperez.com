import { Card, CardContent, Chip, Typography } from '@mui/material'
import React from 'react'

type Skills = {
  skills: {
    label: string
    url: string
  }[]
}

const Skills: React.FC<Skills> = ({ skills }) => (
  <Card style={{ marginTop: 16 }}>
    <CardContent>
      <Typography variant='h5' gutterBottom>
        Skills
      </Typography>
      {skills.map((skill, key) => (
        <Chip
          label={skill.label}
          style={{ margin: 5, cursor: 'pointer' }}
          key={key}
          component='a'
          href={skill.url}
        />
      ))}
    </CardContent>
  </Card>
)
export default Skills
