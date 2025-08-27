import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import PostNavigation from './PostNavigation'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('PostNavigation', () => {
  const mockPrevPost = {
    title: 'Previous Article',
    path: '/previous-article',
    date: '2024-01-01',
  }

  const mockNextPost = {
    title: 'Next Article',
    path: '/next-article',
    date: '2024-01-03',
  }

  it('renders nothing when no posts are provided', () => {
    const { container } = renderWithRouter(
      <PostNavigation prevPost={undefined} nextPost={undefined} />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders navigation with previous post only', () => {
    renderWithRouter(<PostNavigation prevPost={mockPrevPost} nextPost={undefined} />)

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Previous Article')).toBeInTheDocument()
    expect(screen.queryByText('Next')).not.toBeInTheDocument()
    expect(screen.getByText('Back to Home')).toBeInTheDocument()
  })

  it('renders navigation with next post only', () => {
    renderWithRouter(<PostNavigation prevPost={undefined} nextPost={mockNextPost} />)

    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('Next Article')).toBeInTheDocument()
    expect(screen.queryByText('Previous')).not.toBeInTheDocument()
    expect(screen.getByText('Back to Home')).toBeInTheDocument()
  })

  it('renders navigation with both posts', () => {
    renderWithRouter(<PostNavigation prevPost={mockPrevPost} nextPost={mockNextPost} />)

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Previous Article')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('Next Article')).toBeInTheDocument()
    expect(screen.getByText('Back to Home')).toBeInTheDocument()
  })

  it('navigates to previous post when clicked', () => {
    renderWithRouter(<PostNavigation prevPost={mockPrevPost} nextPost={undefined} />)

    const prevLink = screen.getByText('Previous Article')
    expect(prevLink).toHaveAttribute('href', '/previous-article')
  })

  it('navigates to next post when clicked', () => {
    renderWithRouter(<PostNavigation prevPost={undefined} nextPost={mockNextPost} />)

    const nextLink = screen.getByText('Next Article')
    expect(nextLink).toHaveAttribute('href', '/next-article')
  })

  it('navigates to home when back to home is clicked', () => {
    const mockScrollTo = vi.fn()
    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollTo,
      writable: true,
    })

    renderWithRouter(<PostNavigation prevPost={mockPrevPost} nextPost={mockNextPost} />)

    const homeLink = screen.getByText('Back to Home')
    fireEvent.click(homeLink)

    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0 })
  })

  it('has correct accessibility attributes', () => {
    renderWithRouter(<PostNavigation prevPost={mockPrevPost} nextPost={mockNextPost} />)

    const homeLink = screen.getByText('Back to Home')
    expect(homeLink).toHaveAttribute('aria-label', 'back to home')
  })
})
