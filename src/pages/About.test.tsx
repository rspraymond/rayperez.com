import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import About from './About'
import { PROFILE } from '../constants/profile'
import { ABOUT_PROFILE_SECTIONS } from '../constants/paths'
import { SKILLS } from '../constants/skills'

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='helmet'>{children}</div>
  ),
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('../components/SocialMeta', () => ({
  default: ({ type, url }: { type: string; url: string }) => (
    <div data-testid='social-meta' data-type={type} data-url={url} />
  ),
}))

const renderAbout = () =>
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  )

describe('About', () => {
  it('has a single page heading naming the author', () => {
    renderAbout()

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Raymond Perez')
  })

  it('shows the current employer and career sections', () => {
    renderAbout()

    expect(screen.getByText('My Career')).toBeInTheDocument()
    expect(screen.getByText(/DHI Group, the company behind Dice\.com/)).toBeInTheDocument()
  })

  it('links to the author on social profiles without exposing an email address', () => {
    renderAbout()

    expect(
      screen.getByRole('link', { name: `Visit ${PROFILE.name}'s LinkedIn profile` }),
    ).toBeInTheDocument()
    expect(screen.queryByText(PROFILE.email)).not.toBeInTheDocument()
  })

  it('declares itself a profile page at the canonical about URL', () => {
    renderAbout()

    const meta = screen.getByTestId('social-meta')
    expect(meta).toHaveAttribute('data-type', 'profile')
    expect(meta).toHaveAttribute('data-url', 'https://www.rayperez.com/about')
  })

  it('shows skills, achievements, and education after the story', () => {
    renderAbout()

    const sectionNames = Object.values(ABOUT_PROFILE_SECTIONS)
    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent)
      .filter((text) => sectionNames.some((name) => name === text))
    expect(headings).toEqual(sectionNames)
  })

  it('links every skill to the article explaining it', () => {
    renderAbout()

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'))
    for (const skill of SKILLS) {
      expect(hrefs).toContain(skill.url)
    }
  })
})
