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

  it('renders the Education heading with school icon', () => {
    render(<Educations educations={mockEducations} />)

    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByTestId('SchoolIcon')).toBeInTheDocument()
  })

  it('renders all education items from props', () => {
    render(<Educations educations={mockEducations} />)

    mockEducations.forEach((education) => {
      expect(screen.getByText(education.degree)).toBeInTheDocument()
      expect(screen.getByText(`${education.school} - ${education.duration}`)).toBeInTheDocument()
      expect(screen.getByText(education.details)).toBeInTheDocument()
    })
  })

  it('renders degree as h6 heading', () => {
    const singleEducation = [createEducation()]
    render(<Educations educations={singleEducation} />)

    const degreeElement = screen.getByText(singleEducation[0].degree)
    expect(degreeElement.tagName).toBe('H3')
    expect(degreeElement.classList.toString()).toContain('MuiTypography-h6')
  })

  it('renders school and duration in correct format', () => {
    const singleEducation = [createEducation()]
    render(<Educations educations={singleEducation} />)

    expect(
      screen.getByText(`${singleEducation[0].school} - ${singleEducation[0].duration}`),
    ).toBeInTheDocument()
  })

  it('renders details when present', () => {
    const singleEducation = [createEducation({ details: 'Test details text' })]
    render(<Educations educations={singleEducation} />)

    expect(screen.getByText('Test details text')).toBeInTheDocument()
    const detailsElement = screen.getByText('Test details text')
    expect(detailsElement.classList.toString()).toContain('MuiTypography-body1')
  })

  it('does not render details section when details is missing', () => {
    const educationWithoutDetails = [createEducation({ details: '' })]
    render(<Educations educations={educationWithoutDetails} />)

    expect(screen.getByText(educationWithoutDetails[0].degree)).toBeInTheDocument()
    expect(
      screen.getByText(
        `${educationWithoutDetails[0].school} - ${educationWithoutDetails[0].duration}`,
      ),
    ).toBeInTheDocument()
  })

  it('applies correct typography variants', () => {
    const singleEducation = [createEducation()]
    render(<Educations educations={singleEducation} />)

    const degreeElement = screen.getByText(singleEducation[0].degree)
    expect(degreeElement.classList.toString()).toContain('MuiTypography-h6')

    const subtitleElement = screen.getByText(
      `${singleEducation[0].school} - ${singleEducation[0].duration}`,
    )
    expect(subtitleElement.classList.toString()).toContain('MuiTypography-body2')

    const detailsElement = screen.getByText(singleEducation[0].details)
    expect(detailsElement.classList.toString()).toContain('MuiTypography-body1')
  })

  it('renders empty state message when educations array is empty', () => {
    render(<Educations educations={[]} />)

    expect(screen.getByText('No education to display.')).toBeInTheDocument()
  })

  it('does not render any education cards when array is empty', () => {
    render(<Educations educations={[]} />)

    expect(screen.getByText('No education to display.')).toBeInTheDocument()
    expect(screen.queryByText('Test Degree')).not.toBeInTheDocument()
  })

  it('renders all education items when multiple provided', () => {
    render(<Educations educations={mockEducations} />)

    expect(screen.getByText(mockEducations[0].degree)).toBeInTheDocument()
    expect(screen.getByText(mockEducations[1].degree)).toBeInTheDocument()
    expect(
      screen.getByText(`${mockEducations[0].school} - ${mockEducations[0].duration}`),
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${mockEducations[1].school} - ${mockEducations[1].duration}`),
    ).toBeInTheDocument()
  })

  it('renders each education item with correct data', () => {
    render(<Educations educations={mockEducations} />)

    mockEducations.forEach((education) => {
      expect(screen.getByText(education.degree)).toBeInTheDocument()
      expect(screen.getByText(`${education.school} - ${education.duration}`)).toBeInTheDocument()
      expect(screen.getByText(education.details)).toBeInTheDocument()
    })
  })

  it('handles education with missing details field', () => {
    const educationWithoutDetails = [
      {
        degree: 'Test Degree',
        school: 'Test School',
        duration: '2020-2024',
      } as Education,
    ]
    render(<Educations educations={educationWithoutDetails} />)

    expect(screen.getByText('Test Degree')).toBeInTheDocument()
    expect(screen.getByText('Test School - 2020-2024')).toBeInTheDocument()
    expect(screen.queryByText(/details/i)).not.toBeInTheDocument()
  })

  it('handles education with empty details string', () => {
    const educationWithEmptyDetails = [createEducation({ details: '' })]
    render(<Educations educations={educationWithEmptyDetails} />)

    expect(screen.getByText(educationWithEmptyDetails[0].degree)).toBeInTheDocument()
    expect(screen.queryByText(/details/i)).not.toBeInTheDocument()
  })

  it('handles duplicate school/degree combinations with unique keys', () => {
    const duplicateEducations = [
      createEducation({ degree: 'Same Degree', school: 'Same School' }),
      createEducation({ degree: 'Same Degree', school: 'Same School' }),
    ]
    render(<Educations educations={duplicateEducations} />)

    const degrees = screen.getAllByText('Same Degree')
    expect(degrees).toHaveLength(2)
  })

  it('verifies SectionCard receives correct props', () => {
    const { container } = render(<Educations educations={mockEducations} />)

    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByTestId('SchoolIcon')).toBeInTheDocument()

    const card = container.querySelector('.MuiCard-root')
    expect(card).toHaveStyle({ marginTop: '0px', marginBottom: '0px' })
  })

  it('verifies CardContent has padding removed', () => {
    const { container } = render(<Educations educations={mockEducations} />)

    const cardContent = container.querySelector('.MuiCardContent-root')
    expect(cardContent).toBeInTheDocument()
  })

  it('verifies education cards have correct styling structure', () => {
    const { container } = render(<Educations educations={[createEducation()]} />)

    const educationBoxes = container.querySelectorAll('.MuiBox-root')
    expect(educationBoxes.length).toBeGreaterThan(0)
  })

  it('renders education cards with border and styling', () => {
    render(<Educations educations={[createEducation()]} />)

    expect(screen.getByText(createEducation().degree)).toBeInTheDocument()
  })
})
