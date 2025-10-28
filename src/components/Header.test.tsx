import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'
import { ThemeProvider } from '../contexts/ThemeContext'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Header', () => {
  it('renders the header with title, theme toggle, and navigation buttons', () => {
    renderWithTheme(<Header />)

    // Check for title
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

    // Check for theme toggle button (1 button)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(1)

    // Check for navigation links (3 total)
    const navButtons = screen.getAllByRole('link')
    expect(navButtons).toHaveLength(3)
  })

  it('renders social media and resume links with correct attributes', () => {
    renderWithTheme(<Header />)

    // Get all links
    const links = screen.getAllByRole('link')

    // Check that all links open in new tab and have rel attribute
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
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

  it('provides accessible labels for all social media buttons', () => {
    renderWithTheme(<Header />)

    // Check that the LinkedIn button has an accessible label
    const linkedInButton = screen.getByLabelText('LinkedIn Profile')
    expect(linkedInButton).toBeInTheDocument()

    // Check that the GitHub button has an accessible label
    const githubButton = screen.getByLabelText('GitHub Profile')
    expect(githubButton).toBeInTheDocument()

    // Check that the resume button has an accessible label
    const resumeButton = screen.getByLabelText('Resume')
    expect(resumeButton).toBeInTheDocument()
  })

  it('renders theme toggle with proper accessibility', () => {
    renderWithTheme(<Header />)

    // Check that theme toggle button exists
    const themeToggle = screen.getByRole('button')
    expect(themeToggle).toBeInTheDocument()

    // Check that it has proper aria-label
    expect(themeToggle).toHaveAttribute('aria-label')
    expect(themeToggle.getAttribute('aria-label')).toContain('Current theme:')
  })
})
