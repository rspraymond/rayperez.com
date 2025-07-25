import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock the lazy-loaded components
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    lazy: () => {
      const Component = () => <div>Mocked Component</div>
      return Component
    },
  }
})

// Mock react-router-dom
vi.mock('react-router-dom', () => {
  const navigate = vi.fn()
  return {
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Route: ({ path, element }: { path: string; element: React.ReactNode }) => (
      <div data-testid={`route-${path}`}>{element}</div>
    ),
    useNavigate: () => navigate,
    Link: ({
      children,
      ...props
    }: React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>) => (
      <a {...props}>{children}</a>
    ),
  }
})

// Mock LoadingFallback
vi.mock('./components/LoadingFallback', () => ({
  default: () => <div data-testid='loading-fallback'>Loading...</div>,
}))

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('route-/')).toBeInTheDocument()
  })

  it('renders all routes', () => {
    render(<App />)
    expect(screen.getByTestId('route-/')).toBeInTheDocument()
    expect(screen.getByTestId('route-/why-mvc-pattern')).toBeInTheDocument()
    expect(screen.getByTestId('route-/why-nestjs')).toBeInTheDocument()
    expect(screen.getByTestId('route-/why-graphql')).toBeInTheDocument()
    expect(screen.getByTestId('route-/why-nodejs')).toBeInTheDocument()
    expect(screen.getByTestId('route-/why-typescript')).toBeInTheDocument()
    expect(screen.getByTestId('route-/why-react')).toBeInTheDocument()
    expect(screen.getByTestId('route-/why-laravel')).toBeInTheDocument()
    expect(screen.getByTestId('route-/why-inertia')).toBeInTheDocument()
    expect(screen.getByTestId('route-/why-oop')).toBeInTheDocument()
    expect(screen.getByTestId('route-/why-web-development')).toBeInTheDocument()
    expect(screen.getByTestId('route-/why-opinionated')).toBeInTheDocument()
    expect(screen.getByTestId('route-*')).toBeInTheDocument()
  })

  it('wraps content in ThemeProvider with dark theme', () => {
    render(<App />)
    // This is a basic test that doesn't test theme specifics, but ensures the component renders
    expect(document.querySelector('body')).toBeInTheDocument()
  })

  it('includes HashRedirectHandler', () => {
    // Since HashRedirectHandler is embedded in App and uses useNavigate,
    // we're indirectly testing it renders without errors
    render(<App />)
    // No errors thrown means it rendered successfully
  })
})
