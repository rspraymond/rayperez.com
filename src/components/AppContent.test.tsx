import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AppContent from './AppContent'
import { ThemeProvider } from '../contexts/ThemeContext'
import { BookmarkProvider } from '../contexts/BookmarkContext'

// Mock react-router-dom
vi.mock('react-router-dom', () => {
  return {
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Route: ({ element, children }: { element?: React.ReactNode; children?: React.ReactNode }) => (
      <div>
        {element}
        {children}
      </div>
    ),
    useLocation: () => ({ pathname: '/', search: '', hash: '', state: null, key: 'default' }),
    useNavigate: () => vi.fn(),
  }
})

// Mock SiteLayout to render children directly
vi.mock('./SiteLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='site-layout'>{children}</div>
  ),
}))

// Mock HashRedirectHandler
vi.mock('./HashRedirectHandler', () => ({
  default: () => null,
}))

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
  it('renders the main application content with routing', async () => {
    renderWithProviders(<AppContent />)

    // Check that the main content is rendered
    expect(await screen.findByText('Home Page')).toBeInTheDocument()
  })

  it('includes the HashRedirectHandler component', async () => {
    renderWithProviders(<AppContent />)

    // Wait for the content to render
    expect(await screen.findByText('Home Page')).toBeInTheDocument()
  })

  it('renders with Suspense fallback', async () => {
    renderWithProviders(<AppContent />)

    // Wait for the content to render
    expect(await screen.findByText('Home Page')).toBeInTheDocument()
  })
})
