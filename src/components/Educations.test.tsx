import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Educations from './Educations'
import type { Education } from '../types/contentData'

describe('Educations', () => {
  const createEducation = (overrides = {}): Education => ({
    degree: 'Test Degree',
    school: 'Test School',
    duration: '2020-2024',
    details: 'Test education details',
    ...overrides,
  })

  const mockEducations: Education[] = [
    createEducation({
      degree: 'Web Development Certificate',
      school: 'Red Rocks Community College',
      duration: '2010-2012',
      details: 'Completed rigorous coursework related to web development.',
    }),
    createEducation({
      degree: 'Bachelor of Science',
      school: 'University of Colorado',
      duration: '2008-2012',
      details: 'Major in Computer Science.',
    }),
  ]

  it('is a section named Education', () => {
    render(<Educations educations={mockEducations} />)

    expect(screen.getByRole('region', { name: 'Education' })).toBeInTheDocument()
  })

  it('titles each entry by school, with the degree, dates, and details', () => {
    render(<Educations educations={mockEducations} />)

    const schools = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(schools).toEqual(['Red Rocks Community College', 'University of Colorado'])
    expect(screen.getByText('Web Development Certificate')).toBeInTheDocument()
    expect(screen.getByText('2008-2012')).toBeInTheDocument()
    expect(screen.getByText('Major in Computer Science.')).toBeInTheDocument()
  })

  it('omits details when an entry has none', () => {
    render(<Educations educations={[createEducation({ details: undefined })]} />)

    expect(screen.queryByText('Test education details')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Test School' })).toBeInTheDocument()
  })

  it('says so when there is no education to show', () => {
    render(<Educations educations={[]} />)

    expect(screen.getByText('No education to display.')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()
  })
})
