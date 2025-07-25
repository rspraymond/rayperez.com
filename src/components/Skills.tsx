import { Card, CardContent, Chip, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'

type Skills = {
  skills: {
    label: string
    url: string
  }[]
}

const Skills: React.FC<Skills> = ({ skills }) => (
  <Card style={{ marginTop: 16 }}>
    <CardContent>
      <Typography
        variant='h5'
        gutterBottom
        component='h2'
        id='skills-heading'
        sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
      >
        <BuildOutlinedIcon
          sx={{ mr: 1, color: 'text.secondary' }}
          fontSize='medium'
          aria-hidden='true'
        />
        Skills
      </Typography>
      {skills.map((skill, index) => (
        <Chip
          label={skill.label}
          style={{
            margin: 5,
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onClick={() => {}}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = ''
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = ''
          }}
          key={index}
          component={Link}
          to={skill.url}
          aria-label={`Read more about ${skill.label}`}
        />
      ))}
    </CardContent>
  </Card>
)
export default Skills
