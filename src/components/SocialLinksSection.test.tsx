import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material'
import SocialLinksSection from './SocialLinksSection'
import { PROFILE } from '../constants/profile'

const renderComponent = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return render(
    <ThemeProvider theme={theme}>
      <SocialLinksSection />
    </ThemeProvider>,
  )
}

describe('SocialLinksSection Component', () => {
  it('renders the social links heading', () => {
    renderComponent()

    expect(screen.getByText('Find me online:')).toBeInTheDocument()
  })

  it('displays all social media links', () => {
    renderComponent()

    expect(screen.getByLabelText(`Visit ${PROFILE.name}'s LinkedIn profile`)).toBeInTheDocument()
    expect(screen.getByLabelText(`Visit ${PROFILE.name}'s GitHub profile`)).toBeInTheDocument()
    expect(screen.getByLabelText(`Visit ${PROFILE.name}'s Twitter profile`)).toBeInTheDocument()
  })

  it('renders social links with correct URLs', () => {
    renderComponent()

    const linkedinLink = screen.getByLabelText(`Visit ${PROFILE.name}'s LinkedIn profile`)
    const githubLink = screen.getByLabelText(`Visit ${PROFILE.name}'s GitHub profile`)
    const twitterLink = screen.getByLabelText(`Visit ${PROFILE.name}'s Twitter profile`)

    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/raymond-perez-eng/')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/rspraymond')
    expect(twitterLink).toHaveAttribute(
      'href',
      'https://twitter.com/intent/follow?screen_name=onlyray7',
    )
  })

  it('applies proper accessibility attributes to social links', () => {
    renderComponent()

    const socialLinks = screen.getAllByRole('link')
    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link).toHaveAttribute('aria-label')
    })
  })

  it('renders social media icons', () => {
    renderComponent()

    // Check that icons are present (they should be rendered as SVG elements)
    const socialLinks = screen.getAllByRole('link')
    socialLinks.forEach((link) => {
      const icon = link.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })
  })

  it('has responsive layout structure', () => {
    renderComponent()

    const container = screen.getByText('Find me online:').closest('div')
    expect(container).toHaveClass('MuiBox-root')
  })

  it('applies proper styling classes', () => {
    renderComponent()

    const heading = screen.getByText('Find me online:')
    expect(heading).toHaveClass('MuiTypography-subtitle2')
    expect(heading).toHaveClass('MuiTypography-root')
  })
})
