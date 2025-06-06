import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import withCanonical from './WithCanonical'

// Mock Helmet to be able to inspect its props
vi.mock('react-helmet', () => {
  return {
    Helmet: ({ children }: { children: React.ReactNode }) => (
      <div data-testid='helmet'>{children}</div>
    ),
  }
})

describe('withCanonical', () => {
  // Create a simple test component
  const TestComponent = ({ testProp }: { testProp?: string }) => (
    <div data-testid='test-component'>{testProp}</div>
  )
  const WrappedComponent = withCanonical(TestComponent)

  // Reset window.location before each test
  const originalLocation = window.location

  beforeEach(() => {
    // Define a mockable location object
    const mockLocation = {
      ...originalLocation,
      href: 'https://example.com/test-page',
    }

    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    })
  })

  it('renders the wrapped component with passed props', () => {
    // Arrange & Act
    render(<WrappedComponent testProp='test value' />)

    // Assert
    expect(screen.getByTestId('test-component')).toHaveTextContent('test value')
  })

  it('adds canonical link with correct URL', () => {
    // Arrange & Act
    const { container } = render(<WrappedComponent />)

    // Assert
    const linkElement = container.querySelector('link[rel="canonical"]')
    expect(linkElement).toHaveAttribute('href', 'https://example.com/test-page')
  })

  it('removes hashbang from canonical URL', () => {
    // Arrange
    window.location.href = 'https://example.com/#!/test-page'

    // Act
    const { container } = render(<WrappedComponent />)

    // Assert
    const linkElement = container.querySelector('link[rel="canonical"]')
    expect(linkElement).toHaveAttribute('href', 'https://example.com/test-page')
  })
})
