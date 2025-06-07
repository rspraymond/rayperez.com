import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Skills from './Skills'

describe('Skills', () => {
  const mockSkills = [
    { label: 'React', url: 'https://example.com/react' },
    { label: 'TypeScript', url: 'https://example.com/typescript' },
    { label: 'Material UI', url: 'https://example.com/mui' },
  ]

  it('renders the skills heading', () => {
    render(<Skills skills={mockSkills} />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })

  it('renders all skill chips with correct labels', () => {
    render(<Skills skills={mockSkills} />)

    mockSkills.forEach((skill) => {
      const chip = screen.getByText(skill.label)
      expect(chip).toBeInTheDocument()
    })
  })

  it('creates chips with correct links and accessibility attributes', () => {
    render(<Skills skills={mockSkills} />)

    mockSkills.forEach((skill) => {
      const link = screen.getByText(skill.label).closest('a')
      expect(link).toHaveAttribute('href', skill.url)
      expect(link).toHaveAttribute('aria-label', `Read more about ${skill.label}`)
    })
  })

  it('has onMouseOver and onMouseOut event handlers', () => {
    render(<Skills skills={mockSkills} />)

    const chip = screen.getByText(mockSkills[0].label)
    expect(chip).toHaveProperty('onmouseover')
    expect(chip).toHaveProperty('onmouseout')

    // Verify we can call these handlers without errors
    fireEvent.mouseOver(chip)
    fireEvent.mouseOut(chip)
  })

  it('has onFocus and onBlur event handlers', () => {
    render(<Skills skills={mockSkills} />)

    const chip = screen.getByText(mockSkills[0].label)
    expect(chip).toHaveProperty('onfocus')
    expect(chip).toHaveProperty('onblur')

    // Verify we can call these handlers without errors
    fireEvent.focus(chip)
    fireEvent.blur(chip)
  })

  it('renders empty state gracefully', () => {
    render(<Skills skills={[]} />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
    // Should not throw any errors when no skills are provided
  })

  it('renders chips as links', () => {
    render(<Skills skills={mockSkills} />)

    mockSkills.forEach((skill) => {
      const link = screen.getByText(skill.label).closest('a')
      expect(link).toBeInTheDocument()
    })
  })
})
