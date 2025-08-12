import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Summary from './Summary'

describe('Summary', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Summary />
      </MemoryRouter>,
    )

  test('renders with correct structure', () => {
    renderComponent()

    // Check for card structure
    const headingElement = screen.getByRole('heading', { level: 2 })
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('Professional Summary')

    // Check that content exists without being tied to specific text
    const contentElement = screen.getByText(/Raymond Perez/i)
    expect(contentElement).toBeInTheDocument()
  })

  test('contains a link to opinionated frameworks page', () => {
    renderComponent()

    const link = screen.getByText(/opinionated frameworks/i)
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/why-opinionated')
  })

  test('maintains accessibility structure', () => {
    renderComponent()

    // Card should have proper semantic structure
    const card = screen.getByRole('heading', { level: 2 }).closest('div')
    expect(card).toBeInTheDocument()

    // Check that content exists and has proper paragraph structure
    const textContent = screen.getByText(/software engineer/i)
    expect(textContent).toBeInTheDocument()
    expect(textContent.tagName.toLowerCase()).toBe('p')
  })

  test('keeps summary content accessible', () => {
    renderComponent()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByText(/Raymond Perez/i)).toBeInTheDocument()
  })
})
