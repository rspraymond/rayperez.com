import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import withCanonical from './WithCanonical'

vi.mock('react-helmet-async', () => {
  return {
    Helmet: ({ children }: { children: React.ReactNode }) => (
      <div data-testid='helmet'>{children}</div>
    ),
    HelmetProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

describe('withCanonical', () => {
  const TestComponent = ({ testProp }: { testProp?: string }) => (
    <div data-testid='test-component'>{testProp}</div>
  )
  const WrappedComponent = withCanonical(TestComponent)

  it('renders the wrapped component with passed props', () => {
    render(
      <MemoryRouter initialEntries={['/why-nestjs']}>
        <WrappedComponent testProp='test value' />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('test-component')).toHaveTextContent('test value')
  })

  it('adds canonical link with clean www URL', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/why-nestjs']}>
        <WrappedComponent />
      </MemoryRouter>,
    )

    const linkElement = container.querySelector('link[rel="canonical"]')
    expect(linkElement).toHaveAttribute('href', 'https://www.rayperez.com/why-nestjs')
  })
})
