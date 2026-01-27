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

  test('contains a link to opinionated frameworks page from markdown', () => {
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

  test('renders content from data file', () => {
    renderComponent()

    // Verify that the summary text from the JSON file is rendered
    // Check for unique phrases from the summary data (text is split across elements)
    expect(screen.getByText(/I am/i)).toBeInTheDocument()
    expect(screen.getByText('Raymond Perez')).toBeInTheDocument()
    expect(screen.getByText(/full stack development/i)).toBeInTheDocument()
    expect(screen.getByText(/opinionated frameworks/i)).toBeInTheDocument()
  })

  test('maintains schema.org markup with name', () => {
    renderComponent()

    // Verify the name span has the correct itemProp attribute
    const nameSpan = screen.getByText('Raymond Perez')
    expect(nameSpan).toHaveAttribute('itemProp', 'name')
    expect(nameSpan.closest('p')).toHaveAttribute('itemScope')
    expect(nameSpan.closest('p')).toHaveAttribute('itemType', 'https://schema.org/Person')
  })

  test('parses and renders markdown links correctly', () => {
    renderComponent()

    // Verify markdown link syntax is parsed
    const link = screen.getByText('opinionated frameworks')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/why-opinionated')
    expect(link.closest('a')).toHaveClass('MuiLink-root')
  })
})
