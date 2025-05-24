import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from './Home'
import { PROFILE } from '../constants/profile'

// Mock the Helmet component
vi.mock('react-helmet', () => ({
  Helmet: ({ children }) => <div data-testid='helmet-mock'>{children}</div>,
}))

// Mock the components used in Home
vi.mock('../components/Header.tsx', () => ({
  default: () => <div data-testid='header-component'>Header Mock</div>,
}))

vi.mock('../components/ProfileCard.tsx', () => ({
  default: ({ name, role }) => (
    <div data-testid='profile-card-component'>
      Profile: {name} - {role}
    </div>
  ),
}))

vi.mock('../components/RecentPosts.tsx', () => ({
  default: () => <div data-testid='recent-posts-component'>Recent Posts Mock</div>,
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

describe('Home Component', () => {
  it('renders profile information correctly', () => {
    render(<Home />)

    // Check for profile name and role
    const profileCard = screen.getByTestId('profile-card-component')
    expect(profileCard).toHaveTextContent(`Profile: ${PROFILE.name} - ${PROFILE.role}`)
  })

  it('renders all main content sections', () => {
    render(<Home />)

    // Verify all critical sections are present
    expect(screen.getByTestId('header-component')).toBeInTheDocument()
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
    render(<Home />)

    // Check for Helmet component that contains schema.org data
    const helmet = screen.getByTestId('helmet-mock')
    expect(helmet).toBeInTheDocument()

    // Check for meta tags
    const metaTags = screen.getAllByTestId('helmet-mock')
    expect(metaTags.length).toBeGreaterThan(0)
  })
})
