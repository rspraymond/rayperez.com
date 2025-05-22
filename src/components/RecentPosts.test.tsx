import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RecentPosts from './RecentPosts'

// Mock Material UI components to better control their behavior
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    useMediaQuery: () => false, // Default to mobile view
    Collapse: ({ children, in: open }) => (
      <div data-testid='collapse' style={{ display: open ? 'block' : 'none' }}>
        {children}
      </div>
    ),
  }
})

describe('RecentPosts', () => {
  it('renders the post list and allows expanding/collapsing', () => {
    // Arrange
    render(<RecentPosts />)

    // Assert initial state (collapsed on mobile)
    const headerText = screen.getByText('Recent Posts')
    expect(headerText).toBeInTheDocument()

    // Expand button should be visible
    const expandButton = screen.getByLabelText('expand posts')
    expect(expandButton).toBeInTheDocument()

    // Collapse container should be hidden initially
    const collapseContainer = screen.getByTestId('collapse')
    expect(collapseContainer).toHaveStyle('display: none')

    // Act - Click to expand
    fireEvent.click(expandButton)

    // Assert expanded state
    // Collapse container should be visible
    expect(collapseContainer).toHaveStyle('display: block')

    // All posts should now be visible
    const posts = [
      'Why I Choose Inertia.js',
      'Why I Prefer Opinionated Frameworks',
      'Why I Chose NestJS',
      'Why I Love Laravel',
      'Why OOP Is Important',
    ]

    posts.forEach((postTitle) => {
      expect(screen.getByText(postTitle)).toBeInTheDocument()
    })

    // Collapse button should now be visible
    const collapseButton = screen.getByLabelText('collapse posts')
    expect(collapseButton).toBeInTheDocument()

    // Act - Click to collapse
    fireEvent.click(collapseButton)

    // Collapse container should be hidden again
    expect(collapseContainer).toHaveStyle('display: none')
  })
})
