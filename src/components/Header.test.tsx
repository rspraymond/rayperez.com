import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'
import { ThemeProvider } from '../contexts/ThemeContext'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{component}</ThemeProvider>
    </BrowserRouter>,
  )
}

describe('Header', () => {
  it('renders the header with title, theme toggle, and navigation buttons', () => {
    renderWithTheme(<Header />)

    // Check for title link
    const titleLink = screen.getByText('Raymond Perez')
    expect(titleLink).toBeInTheDocument()
    expect(titleLink).toHaveAttribute('href', '/')

    // Check for theme toggle button
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(1)

    // Check for expected navigation links by their accessible labels
    expect(screen.getByLabelText('LinkedIn Profile')).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub Profile')).toBeInTheDocument()
    expect(screen.getByLabelText('Resume')).toBeInTheDocument()
    expect(screen.getByLabelText('RSS Feed')).toBeInTheDocument()
  })

  it('renders social media and resume links with correct attributes', () => {
    renderWithTheme(<Header />)

    // Check LinkedIn link
    const linkedInLink = screen.getByLabelText('LinkedIn Profile')
    expect(linkedInLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'))
    expect(linkedInLink).toHaveAttribute('target', '_blank')
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')

    // Check GitHub link
    const githubLink = screen.getByLabelText('GitHub Profile')
    expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com'))
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    // Check resume link
    const resumeLink = screen.getByLabelText('Resume')
    expect(resumeLink).toHaveAttribute('href', expect.stringContaining('.pdf'))
    expect(resumeLink).toHaveAttribute('target', '_blank')
    expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer')

    // Check RSS feed link
    const rssLink = screen.getByLabelText('RSS Feed')
    expect(rssLink).toHaveAttribute('href', '/feed.xml')
    expect(rssLink).toHaveAttribute('target', '_blank')
    expect(rssLink).toHaveAttribute('rel', 'noopener noreferrer')
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

    // Check that the RSS feed button has an accessible label
    const rssButton = screen.getByLabelText('RSS Feed')
    expect(rssButton).toBeInTheDocument()
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
