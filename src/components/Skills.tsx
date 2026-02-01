import { Chip, Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import SectionCard from './SectionCard'

type Skills = {
  skills: {
    label: string
    url: string
  }[]
}

const Skills: React.FC<Skills> = ({ skills }) => (
  <SectionCard
    title='Skills'
    icon={BuildOutlinedIcon}
    headingId='skills-heading'
    marginTop={0}
    marginBottom={0}
  >
    <Box
      component='ul'
      sx={{
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {skills.map((skill, index) => (
        <Box component='li' key={index}>
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
            component={Link}
            to={skill.url}
            aria-label={`Read more about ${skill.label}`}
          />
        </Box>
      ))}
    </Box>
  </SectionCard>
)
export default Skills
