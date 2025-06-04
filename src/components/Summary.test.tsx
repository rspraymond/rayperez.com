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

    const cardContent = screen.getByText(/^Hi my name is Raymond/i)
    expect(cardContent).toBeInTheDocument()
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

    // Check that content exists (rather than checking for specific MUI props)
    const textContent = screen.getByText(/^Hi my name is Raymond/i)
    expect(textContent).toBeInTheDocument()
    expect(textContent.tagName.toLowerCase()).toBe('p')
  })
})
