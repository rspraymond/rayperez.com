import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import Home from './Home'
import { BookmarkProvider } from '../contexts/BookmarkContext'

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

vi.mock('../components/Experience.tsx', () => ({
  default: ({ title, company }) => (
    <div data-testid='experience-component'>
      {title} at {company}
    </div>
  ),
}))

vi.mock('../components/Education.tsx', () => ({
  default: ({ degree, school }) => (
    <div data-testid='education-component'>
      {degree} from {school}
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

    // Check that at least one experience and education component is rendered
    const experiences = screen.getAllByTestId('experience-component')
    const educations = screen.getAllByTestId('education-component')

    expect(experiences.length).toBeGreaterThan(0)
    expect(educations.length).toBeGreaterThan(0)
  })

  it('includes structured data for SEO', () => {
    renderWithProvider(<Home />)

    // Check for Helmet components that contain schema.org data and social meta tags
    const helmets = screen.getAllByTestId('helmet-mock')
    expect(helmets.length).toBe(2) // One for structured data, one for social meta tags

    // Check that we have the expected meta tag containers
    expect(helmets[0]).toBeInTheDocument()
    expect(helmets[1]).toBeInTheDocument()
  })
})
