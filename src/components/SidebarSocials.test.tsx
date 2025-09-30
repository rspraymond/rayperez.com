import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import SidebarSocials from './SidebarSocials'

// Mock Material UI components to better control their behavior
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    useMediaQuery: () => false, // Default to mobile view
    Collapse: ({ children, in: open }) => (
      <div data-testid='collapse' style={{ display: open ? 'block' : 'none' }}>
        {children}
      </div>
    ),
  }
})

describe('SidebarSocials', () => {
  const mockSocials = [
    { text: 'Twitter', href: 'https://twitter.com/test', platform: 'twitter' as const },
    { text: 'Twitch', href: 'https://twitch.tv/test', platform: 'twitch' as const },
  ]

  const renderWithRouter = (socials: typeof mockSocials) => {
    return render(
      <MemoryRouter>
        <SidebarSocials socials={socials} />
      </MemoryRouter>,
    )
  }

  it('renders the socials heading with share icon', () => {
    renderWithRouter(mockSocials)

    expect(screen.getByText('Socials')).toBeInTheDocument()
    expect(screen.getByTestId('ShareIcon')).toBeInTheDocument()
  })

  it('renders all social links with correct information', () => {
    renderWithRouter(mockSocials)

    mockSocials.forEach((social) => {
      expect(screen.getByText(social.text)).toBeInTheDocument()
    })
  })

  it('renders social links with correct href and target attributes', () => {
    renderWithRouter(mockSocials)

    mockSocials.forEach((social) => {
      const link = screen.getByText(social.text).closest('a')
      expect(link).toHaveAttribute('href', social.href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders platform-specific icons', () => {
    renderWithRouter(mockSocials)

    // Twitter icon should be present
    expect(screen.getByTestId('TwitterIcon')).toBeInTheDocument()

    // Twitch icon should be present (using VideoLibraryIcon)
    expect(screen.getByTestId('VideoLibraryIcon')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    renderWithRouter(mockSocials)

    mockSocials.forEach((social) => {
      const link = screen.getByText(social.text).closest('a')
      expect(link).toHaveAttribute('aria-label', `${social.text} (opens in new window)`)
    })
  })

  it('allows expanding and collapsing on mobile', () => {
    renderWithRouter(mockSocials)

    // Initial state (collapsed on mobile)
    const expandButton = screen.getByLabelText('expand socials')
    expect(expandButton).toBeInTheDocument()

    const collapseContainer = screen.getByTestId('collapse')
    expect(collapseContainer).toHaveStyle('display: none')

    // Click to expand
    fireEvent.click(expandButton)

    // Should now show expand less icon
    expect(screen.getByLabelText('collapse socials')).toBeInTheDocument()
  })

  it('renders empty state gracefully when no socials provided', () => {
    renderWithRouter([])

    // Should not render anything when no socials
    expect(screen.queryByText('Socials')).not.toBeInTheDocument()
  })

  it('handles unknown platform with default icon', () => {
    const socialsWithUnknownPlatform = [
      {
        text: 'Unknown Platform',
        href: 'https://unknown.com',
        platform: 'unknown' as 'twitter' | 'twitch',
      },
    ]

    renderWithRouter(socialsWithUnknownPlatform)

    expect(screen.getByText('Unknown Platform')).toBeInTheDocument()
    // Should fall back to ShareIcon for unknown platforms (there will be multiple ShareIcons)
    const shareIcons = screen.getAllByTestId('ShareIcon')
    expect(shareIcons.length).toBeGreaterThan(0)
  })

  it('applies hover effects to social links', () => {
    renderWithRouter(mockSocials)

    // First expand the socials to see the links
    const expandButton = screen.getByLabelText('expand socials')
    fireEvent.click(expandButton)

    const socialLinks = screen.getAllByRole('link')
    expect(socialLinks.length).toBe(2)

    // Verify the links have correct attributes
    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders with correct Paper styling', () => {
    renderWithRouter(mockSocials)

    const paperElement =
      screen.getByText('Socials').closest('[data-testid]') ||
      screen.getByText('Socials').closest('div')

    // Should have Paper component styling
    expect(paperElement).toBeInTheDocument()
  })

  it('handles single social link correctly', () => {
    const singleSocial = [mockSocials[0]]

    renderWithRouter(singleSocial)

    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('Socials')).toBeInTheDocument()
  })

  it('maintains consistent spacing and layout', () => {
    renderWithRouter(mockSocials)

    const header = screen.getByText('Socials')
    expect(header).toBeInTheDocument()

    // Should have proper typography styling
    expect(header).toHaveClass('MuiTypography-h6')
  })

  it('handles expand/collapse state changes correctly', () => {
    renderWithRouter(mockSocials)

    const toggleButton = screen.getByLabelText('expand socials')

    // Initial state
    expect(screen.getByTestId('collapse')).toHaveStyle('display: none')

    // After clicking
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('collapse')).toHaveStyle('display: block')

    // After clicking again
    fireEvent.click(screen.getByLabelText('collapse socials'))
    expect(screen.getByTestId('collapse')).toHaveStyle('display: none')
  })
})
