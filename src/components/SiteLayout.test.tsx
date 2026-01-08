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

vi.mock('./SidebarSocials', () => ({
  default: ({ socials }: { socials: Array<{ text: string; href: string; platform: string }> }) => (
    <div data-testid='mock-sidebar-socials'>{JSON.stringify(socials)}</div>
  ),
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
    expect(screen.getByTestId('mock-sidebar-socials')).toBeInTheDocument()
  })

  it('passes expected socials props to SidebarSocials', () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<SiteLayout />}>
            <Route index element={<div>outlet content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    const sidebarSocials = screen.getByTestId('mock-sidebar-socials')
    const socialsJson = sidebarSocials.textContent

    // Parse the JSON to verify the structure
    const socials = JSON.parse(socialsJson || '[]')

    // Assert the expected socials array structure
    expect(socials).toHaveLength(2)
    expect(socials[0]).toEqual({
      text: 'Twitter',
      href: 'https://twitter.com/intent/follow?screen_name=onlyray7',
      platform: 'twitter',
    })
    expect(socials[1]).toEqual({
      text: 'Twitch',
      href: 'https://twitch.tv/onlyray',
      platform: 'twitch',
    })
  })
})
