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

vi.mock('../components/Links.tsx', () => ({
  default: () => <div data-testid='links-component'>Links Mock</div>,
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

    // Verify main content sections are present
    expect(screen.getByTestId('summary-component')).toBeInTheDocument()
    expect(screen.getByTestId('skills-component')).toBeInTheDocument()
    expect(screen.getByTestId('achievements-component')).toBeInTheDocument()

    // Check that at least one experience and education component is rendered
    const experiences = screen.getAllByTestId('experience-component')
    const educations = screen.getAllByTestId('education-component')

    expect(experiences.length).toBeGreaterThan(0)
    expect(educations.length).toBeGreaterThan(0)
  })

  it('includes structured data for SEO', () => {
    renderWithProvider(<Home />)

    // Check for Helmet component that contains schema.org data
    const helmet = screen.getByTestId('helmet-mock')
    expect(helmet).toBeInTheDocument()

    // Check for meta tags
    const metaTags = screen.getAllByTestId('helmet-mock')
    expect(metaTags.length).toBeGreaterThan(0)
  })
})
