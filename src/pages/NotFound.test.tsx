import { render, screen, RenderResult } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import NotFound from './NotFound'

/**
 * Mock React Helmet to avoid warnings and test metadata
 * This simple mock allows us to test that Helmet is used without testing the library itself
 */
vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='helmet'>{children}</div>
  ),
}))

describe('NotFound', () => {
  /**
   * Helper function to render the NotFound component in a test environment
   * Following the Dependency Inversion principle by providing the necessary context
   * @returns RenderResult from testing-library
   */
  const renderComponent = (): RenderResult => {
    return render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
  }

  /**
   * Test that the component renders with the expected content
   * This test focuses on the core functionality of displaying error information
   */
  it('renders the 404 error page with correct text content', () => {
    renderComponent()

    // Verify primary content elements are present
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
    expect(screen.getByText('Go to Home Page')).toBeInTheDocument()
  })

  /**
   * Test that the component sets appropriate metadata
   * This test verifies that SEO elements are properly configured
   */
  it('sets the correct page metadata', () => {
    renderComponent()

    // With our simple mock, we're just testing that the Helmet component is rendered
    // with the appropriate children, not the actual Helmet functionality
    const helmet = screen.getByTestId('helmet')

    // Verify the title is set
    const title = Array.from(helmet.children).find(
      (child) => (child as HTMLElement).tagName.toLowerCase() === 'title',
    )
    expect(title).toHaveTextContent('404 - Page Not Found')

    // Verify the meta tag for robots is present
    const metaTags = Array.from(helmet.children).filter(
      (child) => (child as HTMLElement).tagName.toLowerCase() === 'meta',
    )
    expect(metaTags.length).toBeGreaterThan(0)
  })

  /**
   * Test that the navigation link to home works
   * This test focuses on the user action of returning to the home page
   */
  it('provides a navigation link to the home page', () => {
    renderComponent()

    // Verify the home button has the correct link
    const homeButton = screen.getByText('Go to Home Page')
    expect(homeButton.closest('a')).toHaveAttribute('href', '/')
  })
})
