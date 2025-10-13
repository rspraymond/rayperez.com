import { Chip } from '@mui/material'
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
  <SectionCard title='Skills' icon={BuildOutlinedIcon} headingId='skills-heading'>
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
  </SectionCard>
)
export default Skills
