import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import GitHubStats from './GitHubStats'

// Mock Material UI components to better control their behavior
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    useMediaQuery: vi.fn(() => false), // Default to mobile view
    Collapse: ({ children, in: open }: { children: React.ReactNode; in: boolean }) => (
      <div data-testid='collapse' style={{ display: open ? 'block' : 'none' }}>
        {children}
      </div>
    ),
  }
})

const { useMediaQuery } = await import('@mui/material')
const mockUseMediaQuery = vi.mocked(useMediaQuery)

const renderWithTheme = (theme: ReturnType<typeof createTheme>) => {
  return render(
    <ThemeProvider theme={theme}>
      <GitHubStats />
    </ThemeProvider>,
  )
}

describe('GitHubStats - Basic Rendering', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseMediaQuery.mockReturnValue(false) // Default to mobile
  })

  it('renders the component with correct title', () => {
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    expect(screen.getByText('GitHub Activity')).toBeInTheDocument()
  })

  it('renders with correct structure', () => {
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    // Component should render with title
    expect(screen.getByText('GitHub Activity')).toBeInTheDocument()
    // Toggle button should be present
    expect(screen.getByLabelText('expand GitHub activity')).toBeInTheDocument()
  })

  it('renders GitHub contribution graph image', () => {
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    // Expand first to see the image
    const expandButton = screen.getByLabelText('expand GitHub activity')
    fireEvent.click(expandButton)

    const image = screen.getByAltText('GitHub contribution graph showing coding activity')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('github-readme-activity-graph.vercel.app'),
    )
    expect(image).toHaveAttribute('src', expect.stringContaining('username=rspraymond'))
  })
})

describe('GitHubStats - Theme Behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseMediaQuery.mockReturnValue(false) // Default to mobile
  })
  it('uses dark theme parameter when theme is dark', () => {
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    // Expand to see the image
    const expandButton = screen.getByLabelText('expand GitHub activity')
    fireEvent.click(expandButton)

    const image = screen.getByAltText('GitHub contribution graph showing coding activity')
    expect(image).toHaveAttribute('src', expect.stringContaining('theme=react-dark'))
  })

  it('uses light theme parameter when theme is light', () => {
    const theme = createTheme({ palette: { mode: 'light' } })
    renderWithTheme(theme)

    // Expand to see the image
    const expandButton = screen.getByLabelText('expand GitHub activity')
    fireEvent.click(expandButton)

    const image = screen.getByAltText('GitHub contribution graph showing coding activity')
    expect(image).toHaveAttribute('src', expect.stringContaining('theme=github'))
    expect(image).not.toHaveAttribute('src', expect.stringContaining('theme=react-dark'))
  })

  it('updates theme parameter when theme changes', () => {
    const darkTheme = createTheme({ palette: { mode: 'dark' } })
    const { rerender } = renderWithTheme(darkTheme)

    // Expand to see the image
    const expandButton = screen.getByLabelText('expand GitHub activity')
    fireEvent.click(expandButton)

    let image = screen.getByAltText('GitHub contribution graph showing coding activity')
    expect(image).toHaveAttribute('src', expect.stringContaining('theme=react-dark'))

    // Switch to light theme
    const lightTheme = createTheme({ palette: { mode: 'light' } })
    rerender(
      <ThemeProvider theme={lightTheme}>
        <GitHubStats />
      </ThemeProvider>,
    )

    // After rerender, component may be expanded or collapsed depending on useMediaQuery
    // Check if we need to expand or if it's already expanded
    const newExpandButton = screen.queryByLabelText('expand GitHub activity')

    if (newExpandButton) {
      // Component is collapsed, expand it
      fireEvent.click(newExpandButton)
    }
    // If no expand button, component is already expanded

    image = screen.getByAltText('GitHub contribution graph showing coding activity')
    expect(image).toHaveAttribute('src', expect.stringContaining('theme=github'))
    expect(image).not.toHaveAttribute('src', expect.stringContaining('theme=react-dark'))
  })
})

describe('GitHubStats - Modal Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseMediaQuery.mockReturnValue(false) // Default to mobile
  })
  it('opens modal when image is clicked', () => {
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    // Expand to see the image
    const expandButton = screen.getByLabelText('expand GitHub activity')
    fireEvent.click(expandButton)

    // Click the image to open modal
    const imageContainer = screen.getByLabelText('Open GitHub activity graph in modal')
    fireEvent.click(imageContainer)

    // Modal should be open
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
    expect(screen.getByLabelText('View GitHub profile (opens in new window)')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', async () => {
    const { waitFor } = await import('@testing-library/react')
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    // Expand and open modal
    const expandButton = screen.getByLabelText('expand GitHub activity')
    fireEvent.click(expandButton)
    const imageContainer = screen.getByLabelText('Open GitHub activity graph in modal')
    fireEvent.click(imageContainer)

    // Verify modal is open
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
    expect(screen.getByLabelText('View GitHub profile (opens in new window)')).toBeInTheDocument()

    // Close modal
    const closeButton = screen.getByLabelText('Close modal')
    fireEvent.click(closeButton)

    // Modal should be closed - Material UI Dialog keeps elements in DOM but hides them
    // Check that the dialog is hidden (aria-hidden or not visible)
    await waitFor(() => {
      const dialog = screen.queryByRole('dialog')
      // When closed, Dialog should be hidden (aria-hidden="true" or not visible)
      if (dialog) {
        expect(dialog).toHaveAttribute('aria-hidden', 'true')
      } else {
        // Or it might be removed from DOM
        expect(dialog).not.toBeInTheDocument()
      }
    })
  })

  it('opens GitHub profile when GitHub button is clicked in modal', () => {
    const theme = createTheme({ palette: { mode: 'dark' } })
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    renderWithTheme(theme)

    // Expand and open modal
    const expandButton = screen.getByLabelText('expand GitHub activity')
    fireEvent.click(expandButton)
    const imageContainer = screen.getByLabelText('Open GitHub activity graph in modal')
    fireEvent.click(imageContainer)

    // Click GitHub button
    const githubButton = screen.getByLabelText('View GitHub profile (opens in new window)')
    fireEvent.click(githubButton)

    // Should open GitHub profile
    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://github.com/rspraymond',
      '_blank',
      'noopener,noreferrer',
    )

    windowOpenSpy.mockRestore()
  })

  it('opens modal when image is activated with keyboard', () => {
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    // Expand to see the image
    const expandButton = screen.getByLabelText('expand GitHub activity')
    fireEvent.click(expandButton)

    // Activate with Enter key
    const imageContainer = screen.getByLabelText('Open GitHub activity graph in modal')
    fireEvent.keyDown(imageContainer, { key: 'Enter' })

    // Modal should be open
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
  })
})

describe('GitHubStats - Responsive Behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseMediaQuery.mockReturnValue(false) // Default to mobile
  })
  it('starts collapsed on mobile view', () => {
    mockUseMediaQuery.mockReturnValue(false) // Mobile
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    const expandButton = screen.getByLabelText('expand GitHub activity')
    expect(expandButton).toBeInTheDocument()

    const collapseContainer = screen.getByTestId('collapse')
    expect(collapseContainer).toHaveStyle('display: none')
  })

  it('starts expanded on desktop view', () => {
    mockUseMediaQuery.mockReturnValue(true) // Desktop
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    const collapseButton = screen.getByLabelText('collapse GitHub activity')
    expect(collapseButton).toBeInTheDocument()

    const collapseContainer = screen.getByTestId('collapse')
    expect(collapseContainer).toHaveStyle('display: block')
  })

  it('expands and collapses when toggle button is clicked', () => {
    mockUseMediaQuery.mockReturnValue(false) // Mobile - starts collapsed
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    // Initially collapsed
    const expandButton = screen.getByLabelText('expand GitHub activity')
    const collapseContainer = screen.getByTestId('collapse')
    expect(collapseContainer).toHaveStyle('display: none')

    // Click to expand
    fireEvent.click(expandButton)
    expect(collapseContainer).toHaveStyle('display: block')
    expect(screen.getByLabelText('collapse GitHub activity')).toBeInTheDocument()

    // Click to collapse
    const collapseButton = screen.getByLabelText('collapse GitHub activity')
    fireEvent.click(collapseButton)
    expect(collapseContainer).toHaveStyle('display: none')
    expect(screen.getByLabelText('expand GitHub activity')).toBeInTheDocument()
  })
})

describe('GitHubStats - Accessibility and Styling', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseMediaQuery.mockReturnValue(false) // Default to mobile
  })
  it('has proper accessibility attributes', () => {
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    // Expand to see content
    const expandButton = screen.getByLabelText('expand GitHub activity')
    fireEvent.click(expandButton)

    // Image should have descriptive alt text
    const image = screen.getByAltText('GitHub contribution graph showing coding activity')
    expect(image).toBeInTheDocument()

    // Image container should have proper role and aria-label
    const imageContainer = screen.getByLabelText('Open GitHub activity graph in modal')
    expect(imageContainer).toHaveAttribute('role', 'button')
    expect(imageContainer).toHaveAttribute('tabIndex', '0')

    // Open modal to check modal accessibility
    fireEvent.click(imageContainer)
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
    expect(screen.getByLabelText('View GitHub profile (opens in new window)')).toBeInTheDocument()
  })

  it('image has responsive styling', () => {
    const theme = createTheme({ palette: { mode: 'dark' } })
    renderWithTheme(theme)

    // Expand to see the image
    const expandButton = screen.getByLabelText('expand GitHub activity')
    fireEvent.click(expandButton)

    const image = screen.getByAltText('GitHub contribution graph showing coding activity')
    expect(image).toHaveStyle({ maxWidth: '100%', height: 'auto', display: 'block' })
  })
})
