import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material'
import AuthorBio from './AuthorBio'
import { PROFILE } from '../constants/profile'
import profileImage from '../assets/raymond-perez.jpg'

// Mock the Helmet component
vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='helmet'>{children}</div>
  ),
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

    // Check for author introduction (allow split text)
    expect(
      screen.getByText((_content, node) => {
        const hasText = (node: Element | null) =>
          node?.textContent
            ?.replace(/\s+/g, ' ')
            .includes(`Hi, I’m ${PROFILE.name}, a ${PROFILE.role} in Denver.`)
        const nodeHasText = hasText(node as Element)
        const childrenDontHaveText = Array.from(node?.children || []).every(
          (child) => !hasText(child as Element),
        )
        return nodeHasText && childrenDontHaveText
      }),
    ).toBeInTheDocument()

    // Check for author description
    // Use a regex matcher to allow for apostrophe/whitespace variations
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

  it('renders social meta tags for SEO', () => {
    renderComponent()

    // Check for Open Graph meta tags
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      `${PROFILE.name} - ${PROFILE.role}`,
    )
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute('content', 'profile')
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      profileImage,
    )

    // Check for Twitter Card meta tags
    expect(document.querySelector('meta[property="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    )
    expect(document.querySelector('meta[property="twitter:creator"]')).toHaveAttribute(
      'content',
      PROFILE.twitterCreator,
    )
  })

  it('has responsive design elements', () => {
    renderComponent()

    const section = screen.getByTestId('author-bio-component')
    expect(section).toBeInTheDocument()

    // The component should have proper styling classes from Material UI
    expect(section).toHaveClass('MuiBox-root')
  })
})
