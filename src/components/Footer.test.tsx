import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'
import { render as renderWithProviders } from '../test-utils'
import { FOOTER_SOCIAL_LINKS } from '../constants/social'

describe('Footer', () => {
  it('renders the copyright notice with current year', () => {
    renderWithProviders(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear} Raymond Perez`))).toBeInTheDocument()
  })

  it('renders all social links from FOOTER_SOCIAL_LINKS', () => {
    renderWithProviders(<Footer />)

    FOOTER_SOCIAL_LINKS.forEach((social) => {
      const link = screen.getByLabelText(`${social.text} (opens in new window)`)
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', social.href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(screen.getByText(social.text)).toBeInTheDocument()
    })
  })

  it('renders the RSS feed link', () => {
    renderWithProviders(<Footer />)

    const rssLink = screen.getByLabelText('RSS Feed')
    expect(rssLink).toBeInTheDocument()
    expect(rssLink).toHaveAttribute('href', '/feed.xml')
    expect(rssLink).toHaveAttribute('target', '_blank')
    expect(rssLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText('RSS Feed')).toBeInTheDocument()
  })
})
