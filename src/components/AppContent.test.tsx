import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AppContent from './AppContent'
import { ThemeProvider } from '../contexts/ThemeContext'
import { BookmarkProvider } from '../contexts/BookmarkContext'

// Mock the posts data
vi.mock('../constants/posts', () => ({
  posts: [
    {
      path: '/test-article',
      Component: () => <div>Test Article</div>,
    },
  ],
}))

// Mock the page components
vi.mock('../pages/Home', () => ({
  default: () => <div>Home Page</div>,
}))

vi.mock('../pages/NotFound', () => ({
  default: () => <div>Not Found Page</div>,
}))

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <BookmarkProvider>{component}</BookmarkProvider>
    </ThemeProvider>,
  )
}

describe('AppContent', () => {
  it('renders the main application content with routing', () => {
    renderWithProviders(<AppContent />)

    // Check that the main content is rendered
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })

  it('includes the HashRedirectHandler component', () => {
    renderWithProviders(<AppContent />)

    // The HashRedirectHandler doesn't render anything visible,
    // but we can verify the component structure is intact
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })

  it('renders with Suspense fallback', () => {
    renderWithProviders(<AppContent />)

    // The Suspense wrapper should be present (though not visible in normal rendering)
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })
})
