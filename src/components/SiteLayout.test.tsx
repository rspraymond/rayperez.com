import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import SiteLayout from './SiteLayout'
import { render as renderWithProviders } from '../test-utils'

// Mock all lazy-loaded components BEFORE importing SiteLayout
vi.mock('./ProfileCard', () => ({
  default: () => <div data-testid='mock-profile-card'>ProfileCard</div>,
}))

vi.mock('./GitHubStats', () => ({
  default: () => <div data-testid='mock-github-stats'>GitHubStats</div>,
}))

vi.mock('./BookmarkedPosts', () => ({
  default: () => <div data-testid='mock-bookmarked-posts'>BookmarkedPosts</div>,
}))

vi.mock('./RecentPosts', () => ({
  default: () => <div data-testid='mock-recent-posts'>RecentPosts</div>,
}))

describe('SiteLayout', () => {
  it('renders Header and outlet content', () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<SiteLayout />}>
            <Route index element={<div data-testid='child'>child</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    // Assert Header is present (check for profile name which is always in Header)
    expect(screen.getByText('Raymond Perez')).toBeInTheDocument()

    // Assert outlet content is rendered
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('renders all sidebar lazy components', () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<SiteLayout />}>
            <Route index element={<div>outlet content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    // Assert all mocked sidebar components are present
    expect(screen.getByTestId('mock-profile-card')).toBeInTheDocument()
    expect(screen.getByTestId('mock-bookmarked-posts')).toBeInTheDocument()
    expect(screen.getByTestId('mock-recent-posts')).toBeInTheDocument()
    expect(screen.getByTestId('mock-github-stats')).toBeInTheDocument()
  })

  it('renders main content with id main-content and tabIndex -1 for focus target', () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<SiteLayout />}>
            <Route index element={<div>outlet content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    const main = screen.getByRole('main')
    expect(main).toHaveAttribute('id', 'main-content')
    expect(main).toHaveAttribute('tabIndex', '-1')
  })
})
