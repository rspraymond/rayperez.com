import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from '../App'
import { PROFILE } from '../constants/profile'
import { ABOUT_PATH } from '../constants/paths'

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

const mainContent = (): HTMLElement => document.getElementById('main-content') as HTMLElement

describe('first render of each route', () => {
  it('shows the name and introduction on the home page before its sections load', () => {
    renderAt('/')

    const main = within(mainContent())
    expect(main.getByRole('heading', { level: 1, name: PROFILE.name })).toBeInTheDocument()
    expect(main.getByText(PROFILE.tagline)).toBeInTheDocument()
    expect(main.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('keeps a single page heading once the home sections arrive', async () => {
    renderAt('/')

    expect(await screen.findByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('shows an in place placeholder instead of a full screen spinner while About loads', () => {
    renderAt(ABOUT_PATH)

    expect(within(mainContent()).queryByRole('progressbar')).not.toBeInTheDocument()
    expect(mainContent().querySelector('[aria-busy="true"]')).toBeInTheDocument()
  })
})
