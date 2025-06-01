import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('renders the header with title and navigation buttons', () => {
    render(<Header />)

    // Check for title
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

    // Check for navigation buttons (3 total)
    const navButtons = screen.getAllByRole('link')
    expect(navButtons).toHaveLength(3)
  })

  it('renders social media and resume links with correct attributes', () => {
    render(<Header />)

    // Get all links
    const links = screen.getAllByRole('link')

    // Check that all links open in new tab
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
    })

    // Check that there's a LinkedIn link
    const linkedInLink = links.find((link) => link.getAttribute('href')?.includes('linkedin.com'))
    expect(linkedInLink).toBeInTheDocument()

    // Check that there's a GitHub link
    const githubLink = links.find((link) => link.getAttribute('href')?.includes('github.com'))
    expect(githubLink).toBeInTheDocument()

    // Check that there's a resume link
    const resumeLink = links.find((link) => link.getAttribute('href')?.includes('.pdf'))
    expect(resumeLink).toBeInTheDocument()
  })

  it('provides accessible label for the resume button', () => {
    render(<Header />)

    // Check that the resume button has an accessible label
    const resumeButton = screen.getByLabelText('Resume')
    expect(resumeButton).toBeInTheDocument()
    expect(resumeButton).toHaveAccessibleName('Resume')
  })
})
