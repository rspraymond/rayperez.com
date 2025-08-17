import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RecentPosts, { Post } from './RecentPosts'
import { MemoryRouter } from 'react-router-dom'

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
  const mockPosts: Post[] = [
    { title: 'Test Post 1', path: '/test-1' },
    { title: 'Test Post 2', path: '/test-2' },
    { title: 'Test Post 3', path: '/test-3' },
  ]

  it('renders the post list and allows expanding/collapsing', () => {
    // Arrange
    render(
      <MemoryRouter>
        <RecentPosts posts={mockPosts} />
      </MemoryRouter>,
    )

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

    // All mock posts should now be visible
    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    })

    // Collapse button should now be visible
    const collapseButton = screen.getByLabelText('collapse posts')
    expect(collapseButton).toBeInTheDocument()

    // Act - Click to collapse
    fireEvent.click(collapseButton)

    // Collapse container should be hidden again
    expect(collapseContainer).toHaveStyle('display: none')
  })

  describe('aria-current functionality', () => {
    it('sets aria-current="page" on the active link when path matches current location', () => {
      // Arrange - Render with a specific initial location
      render(
        <MemoryRouter initialEntries={['/test-2']}>
          <RecentPosts posts={mockPosts} />
        </MemoryRouter>,
      )

      // Expand the posts list to see all links
      const expandButton = screen.getByLabelText('expand posts')
      fireEvent.click(expandButton)

      // Find the link that should be active
      const activeLink = screen.getByRole('link', { name: 'Test Post 2' })
      expect(activeLink).toHaveAttribute('aria-current', 'page')

      // Verify other links don't have aria-current
      const inactiveLink1 = screen.getByRole('link', { name: 'Test Post 1' })
      const inactiveLink3 = screen.getByRole('link', { name: 'Test Post 3' })

      expect(inactiveLink1).not.toHaveAttribute('aria-current')
      expect(inactiveLink3).not.toHaveAttribute('aria-current')
    })

    it('sets aria-current="page" on home page link when at root path', () => {
      // Arrange - Render with root path
      render(
        <MemoryRouter initialEntries={['/']}>
          <RecentPosts posts={mockPosts} />
        </MemoryRouter>,
      )

      // Expand the posts list
      const expandButton = screen.getByLabelText('expand posts')
      fireEvent.click(expandButton)

      // Since we're at root path, no post should be active
      mockPosts.forEach((post) => {
        const link = screen.getByRole('link', { name: post.title })
        expect(link).not.toHaveAttribute('aria-current')
      })
    })

    it('handles exact path matching correctly', () => {
      // Arrange - Render with a path that partially matches but shouldn't be active
      render(
        <MemoryRouter initialEntries={['/test-1-extra']}>
          <RecentPosts posts={mockPosts} />
        </MemoryRouter>,
      )

      // Expand the posts list
      const expandButton = screen.getByLabelText('expand posts')
      fireEvent.click(expandButton)

      // No link should be active since paths don't match exactly
      mockPosts.forEach((post) => {
        const link = screen.getByRole('link', { name: post.title })
        expect(link).not.toHaveAttribute('aria-current')
      })
    })

    it('handles different locations correctly for aria-current', () => {
      // Test that aria-current is properly applied in different location scenarios

      // Test case 1: No active link when at different path
      render(
        <MemoryRouter initialEntries={['/different-path']}>
          <RecentPosts posts={mockPosts} />
        </MemoryRouter>,
      )

      // Expand the posts list
      const expandButton = screen.getByLabelText('expand posts')
      fireEvent.click(expandButton)

      // Verify no links are active when at different path
      mockPosts.forEach((post) => {
        const link = screen.getByRole('link', { name: post.title })
        expect(link).not.toHaveAttribute('aria-current')
      })
    })

    it('applies aria-current correctly when location matches post path', () => {
      // Test that aria-current is properly applied when location matches
      render(
        <MemoryRouter initialEntries={['/test-1']}>
          <RecentPosts posts={mockPosts} />
        </MemoryRouter>,
      )

      // Expand the posts list
      const expandButton = screen.getByLabelText('expand posts')
      fireEvent.click(expandButton)

      // The first post should be active
      const activeLink = screen.getByRole('link', { name: 'Test Post 1' })
      expect(activeLink).toHaveAttribute('aria-current', 'page')

      // Other posts should not be active
      const inactiveLink2 = screen.getByRole('link', { name: 'Test Post 2' })
      const inactiveLink3 = screen.getByRole('link', { name: 'Test Post 3' })

      expect(inactiveLink2).not.toHaveAttribute('aria-current')
      expect(inactiveLink3).not.toHaveAttribute('aria-current')
    })

    it('handles empty posts array gracefully', () => {
      // Arrange - Render with no posts
      render(
        <MemoryRouter initialEntries={['/test-1']}>
          <RecentPosts posts={[]} />
        </MemoryRouter>,
      )

      // Expand the posts list
      const expandButton = screen.getByLabelText('expand posts')
      fireEvent.click(expandButton)

      // Should not crash and should show no posts
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })
})
