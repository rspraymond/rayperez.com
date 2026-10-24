import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material'
import AuthorBio from './AuthorBio'
import { PROFILE } from '../constants/profile'

// Mock the Helmet component
vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='helmet'>{children}</div>
  ),
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Mock the LazyImage component
vi.mock('./LazyImage', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid='lazy-image' />
  ),
}))

// Mock the profile image import
vi.mock('../assets/raymond-perez.jpg', () => ({
  default: '/assets/raymond-perez.jpg',
}))

const renderComponent = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthorBio />
      </ThemeProvider>
    </BrowserRouter>,
  )
}

describe('AuthorBio Component', () => {
  it('renders the author bio section with correct content', () => {
    renderComponent()

    // Check for author introduction text - flexible regex that handles location variations
    const introText = screen.getByText(/Hi, I'm .+, a .+ in .+\./)
    expect(introText).toBeInTheDocument()

    // Verify it contains the profile name and role
    expect(introText.textContent).toContain(PROFILE.name)
    expect(introText.textContent).toContain(PROFILE.role)

    // Check for author description
    expect(
      screen.getByText(/I.?m the author of this blog, nice to meet you!?/i),
    ).toBeInTheDocument()
  })

  it('displays the author image with proper alt text', () => {
    renderComponent()

    const image = screen.getByTestId('lazy-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', `${PROFILE.name}, ${PROFILE.role}`)
    expect(image).toHaveAttribute('src', '/assets/raymond-perez.jpg')
  })

  it('shows technology skills as chips', () => {
    renderComponent()

    const technologies = [
      'NestJS',
      'GraphQL',
      'Node.js',
      'TypeScript',
      'React.js',
      'Laravel',
      'OOP',
      'Web Development',
    ]

    technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })
  })

  it('displays social media links with proper accessibility', () => {
    renderComponent()

    // Check for proper aria labels (social links are now icons only)
    expect(screen.getByLabelText(`Visit ${PROFILE.name}'s LinkedIn profile`)).toBeInTheDocument()
    expect(screen.getByLabelText(`Visit ${PROFILE.name}'s GitHub profile`)).toBeInTheDocument()
    expect(screen.getByLabelText(`Visit ${PROFILE.name}'s Twitter profile`)).toBeInTheDocument()
  })

  it('includes proper semantic HTML structure', () => {
    renderComponent()

    // Check for section element
    const section = screen.getByTestId('author-bio-component')
    expect(section.tagName).toBe('SECTION')

    // Check for both labeled headings (Skills and Find me online)
    const headings = screen.getAllByRole('heading', { level: 6 })
    const headingTexts = headings.map((h) => h.textContent)
    expect(headingTexts).toContain('Skills:')
    expect(headingTexts).toContain('Find me online:')
  })

  it('does not inject page-level Open Graph or Twitter meta tags', () => {
    renderComponent()

    expect(document.querySelector('meta[property="og:title"]')).toBeNull()
    expect(document.querySelector('meta[property="twitter:card"]')).toBeNull()
  })

  it('has responsive design elements', () => {
    renderComponent()

    const section = screen.getByTestId('author-bio-component')
    expect(section).toBeInTheDocument()

    // The component should have proper styling classes from Material UI
    expect(section).toHaveClass('MuiBox-root')
  })
})
