import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import Home from './Home'
import { BookmarkProvider } from '../contexts/BookmarkContext'
import experiencesData from '../data/content/experiences.json'
import educationData from '../data/content/education.json'

// Mock the Helmet component
vi.mock('react-helmet', () => ({
  Helmet: ({ children }) => <div data-testid='helmet-mock'>{children}</div>,
}))

vi.mock('../components/Summary.tsx', () => ({
  default: () => <div data-testid='summary-component'>Summary Mock</div>,
}))

vi.mock('../components/Projects.tsx', () => ({
  default: () => <div data-testid='projects-component'>Projects Mock</div>,
}))

vi.mock('../components/Skills.tsx', () => ({
  default: () => <div data-testid='skills-component'>Skills Mock</div>,
}))

vi.mock('../components/Achievements.tsx', () => ({
  default: () => <div data-testid='achievements-component'>Achievements Mock</div>,
}))

vi.mock('../components/Experiences.tsx', () => ({
  default: ({ experiences }) => (
    <div data-testid='experiences-component'>
      {experiences.map((exp, index) => (
        <div data-testid='experience-component' key={`${exp.company}-${index}`}>
          {exp.title} at {exp.company}
        </div>
      ))}
    </div>
  ),
}))

vi.mock('../components/Educations.tsx', () => ({
  default: ({ educations }) => (
    <div data-testid='educations-component'>
      {educations.map((edu, index) => (
        <div data-testid='education-component' key={`${edu.school}-${index}`}>
          {edu.degree} from {edu.school}
        </div>
      ))}
    </div>
  ),
}))

// BookmarkedPosts is provided by layout; Home no longer renders it directly

const renderWithProvider = (component: React.ReactElement) => {
  return render(<BookmarkProvider>{component}</BookmarkProvider>)
}

describe('Home Component', () => {
  it('renders primary content correctly', () => {
    renderWithProvider(<Home />)
    expect(screen.getByTestId('summary-component')).toBeInTheDocument()
  })

  it('renders all main content sections', () => {
    renderWithProvider(<Home />)

    // Verify main content sections are present in correct order
    expect(screen.getByTestId('summary-component')).toBeInTheDocument()
    expect(screen.getByTestId('skills-component')).toBeInTheDocument()
    expect(screen.getByTestId('projects-component')).toBeInTheDocument()
    expect(screen.getByTestId('achievements-component')).toBeInTheDocument()

    // Check that the correct number of experience and education components are rendered from data files
    const experiences = screen.getAllByTestId('experience-component')
    const educations = screen.getAllByTestId('education-component')

    expect(experiences.length).toBe(experiencesData.length)
    expect(educations.length).toBe(educationData.length)
    expect(screen.getByTestId('educations-component')).toBeInTheDocument()
  })

  it('includes structured data for SEO', () => {
    renderWithProvider(<Home />)

    // Check for Helmet components that contain schema.org data and social meta tags
    const helmets = screen.getAllByTestId('helmet-mock')
    expect(helmets.length).toBe(2) // Structured data and social meta tags

    // Check that we have the expected meta tag containers
    expect(helmets[0]).toBeInTheDocument()
    expect(helmets[1]).toBeInTheDocument()
  })
})
