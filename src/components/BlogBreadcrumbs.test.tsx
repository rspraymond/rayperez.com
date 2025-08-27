import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import BlogBreadcrumbs from './BlogBreadcrumbs'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('BlogBreadcrumbs', () => {
  it('renders breadcrumbs with correct structure', () => {
    renderWithRouter(<BlogBreadcrumbs title='Test Article' />)

    expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Test Article')).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    renderWithRouter(<BlogBreadcrumbs title='Test Article' />)

    const homeLink = screen.getByText('Home')
    expect(homeLink).toHaveAttribute('href', '/')

    const titleElement = screen.getByText('Test Article')
    expect(titleElement).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    renderWithRouter(<BlogBreadcrumbs title='Test Article' />)

    const breadcrumbsContainer = screen.getByLabelText('breadcrumb')
    expect(breadcrumbsContainer).toHaveClass('MuiBreadcrumbs-root')
  })

  it('renders with different titles', () => {
    renderWithRouter(<BlogBreadcrumbs title='Another Article Title' />)

    expect(screen.getByText('Another Article Title')).toBeInTheDocument()
  })
})
