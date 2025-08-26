import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material'
import SkillsSection from './SkillsSection'
import { SKILLS } from '../constants/skills'

const renderComponent = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return render(
    <ThemeProvider theme={theme}>
      <SkillsSection />
    </ThemeProvider>,
  )
}

describe('SkillsSection Component', () => {
  it('renders the skills heading', () => {
    renderComponent()

    expect(screen.getByText('Skills:')).toBeInTheDocument()
  })

  it('displays all skills from the SKILLS constant', () => {
    renderComponent()

    SKILLS.forEach((skill) => {
      expect(screen.getByText(skill.label)).toBeInTheDocument()
    })
  })

  it('renders skills with clickable chips when they have URLs', () => {
    renderComponent()

    const clickableSkills = SKILLS.filter((skill) => skill.url)
    clickableSkills.forEach((skill) => {
      const skillChip = screen.getByText(skill.label)
      expect(skillChip.closest('a')).toHaveAttribute('href', skill.url)
    })
  })

  it('renders skills with non-clickable chips when they do not have URLs', () => {
    renderComponent()

    const nonClickableSkills = SKILLS.filter((skill) => !skill.url)
    nonClickableSkills.forEach((skill) => {
      const skillChip = screen.getByText(skill.label)
      expect(skillChip.closest('a')).toBeNull()
    })
  })

  it('applies proper styling to skill chips', () => {
    renderComponent()

    // Get the chip elements by finding their containers
    const skillChips = SKILLS.map((skill) => screen.getByText(skill.label).closest('.MuiChip-root'))

    skillChips.forEach((chip) => {
      expect(chip).toHaveClass('MuiChip-outlined')
      expect(chip).toHaveClass('MuiChip-sizeSmall')
    })
  })

  it('has responsive layout structure', () => {
    renderComponent()

    const container = screen.getByText('Skills:').closest('div')
    expect(container).toHaveClass('MuiBox-root')
  })
})
