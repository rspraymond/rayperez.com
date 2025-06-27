import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Links from './Links'

// Mock Material-UI's useMediaQuery and useTheme hooks
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    useMediaQuery: vi.fn(),
    useTheme: vi.fn(() => ({
      breakpoints: {
        down: () => 'sm',
      },
    })),
  }
})

// Import the mocked hooks
const { useMediaQuery } = await import('@mui/material')

describe('Links Component', () => {
  const mockLinks = [
    { text: 'GitHub', href: 'https://github.com/example' },
    { text: 'Twitter', href: 'https://twitter.com/example' },
  ]

  it('renders links with correct text and href attributes', () => {
    // Arrange: Mock desktop view
    vi.mocked(useMediaQuery).mockReturnValue(false)

    // Act: Render component with test data
    render(<Links links={mockLinks} />)

    // Assert: Verify links are rendered with correct attributes
    mockLinks.forEach((link) => {
      const linkElement = screen.getByText(link.text)
      expect(linkElement).toBeInTheDocument()
      expect(linkElement.closest('a')).toHaveAttribute('href', link.href)
      expect(linkElement.closest('a')).toHaveAttribute('target', '_blank')
    })

    // Verify heading is rendered
    expect(screen.getByText('Links')).toBeInTheDocument()
  })

  it('adapts layout for mobile devices', () => {
    // Arrange: Mock mobile view
    vi.mocked(useMediaQuery).mockReturnValue(true)

    // Act: Render component with test data
    render(<Links links={mockLinks} />)

    // Assert: Verify mobile-specific styles are applied
    // We test the presence of components rather than specific styles
    const buttons = screen.getAllByRole('link')
    expect(buttons.length).toBe(mockLinks.length)

    // In mobile view, we should still have all our links
    mockLinks.forEach((link) => {
      expect(screen.getByText(link.text)).toBeInTheDocument()
    })
  })

  it('handles empty links array gracefully', () => {
    // Arrange: Mock any view mode
    vi.mocked(useMediaQuery).mockReturnValue(false)

    // Act: Render component with empty links array
    render(<Links links={[]} />)

    // Assert: Verify component renders without links
    expect(screen.getByText('Links')).toBeInTheDocument()
    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })
})
