import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Experiences from './Experiences'

const mockExperiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Pronomix',
    duration: 'Oct 2025 - Present',
    bullets: ['Contributing to AI-driven programmatic advertising solutions.'],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Red Ventures',
    duration: 'Sep 2021 - Sep 2025',
    bullets: ['Built AI video streaming service and editorial platform.'],
  },
]

describe('Experiences', () => {
  afterEach(() => {
    document.head.innerHTML = ''
  })

  it('renders the Career heading with work icon', () => {
    render(<Experiences experiences={mockExperiences} />)

    expect(screen.getByText('Career')).toBeInTheDocument()
    expect(screen.getByTestId('WorkOutlineIcon')).toBeInTheDocument()
  })

  it('renders all experience cards with company and duration', () => {
    render(<Experiences experiences={mockExperiences} />)

    const titles = screen.getAllByText(mockExperiences[0].title)
    expect(titles).toHaveLength(mockExperiences.length)

    mockExperiences.forEach((experience) => {
      expect(screen.getByText(`${experience.company} - ${experience.duration}`)).toBeInTheDocument()
    })
  })

  it('renders all bullet points', () => {
    render(<Experiences experiences={mockExperiences} />)

    mockExperiences.forEach((experience) => {
      experience.bullets.forEach((bullet) => {
        expect(screen.getByText(bullet)).toBeInTheDocument()
      })
    })
  })

  it('handles empty experiences gracefully', () => {
    render(<Experiences experiences={[]} />)

    expect(screen.getByText('No experiences to display.')).toBeInTheDocument()
  })

  it('renders structured data for each experience', async () => {
    render(<Experiences experiences={mockExperiences} />)

    await waitFor(() => {
      const ldJsonScripts = document.querySelectorAll('script[type="application/ld+json"]')
      expect(ldJsonScripts.length).toBe(mockExperiences.length)
      expect(ldJsonScripts[0].textContent).toContain(mockExperiences[0].title)
      expect(ldJsonScripts[1].textContent).toContain(mockExperiences[1].title)
    })
  })
})
