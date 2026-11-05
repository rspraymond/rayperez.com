import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'
import { ThemeProvider } from '../contexts/ThemeContext'

const renderHeader = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </MemoryRouter>,
  )

const menu = () => within(screen.getByRole('navigation', { name: 'Main' }))

describe('Header', () => {
  it('links the name home without claiming the page heading', () => {
    renderHeader()

    expect(screen.getByRole('link', { name: 'Raymond Perez' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('offers Writing, Projects, About, Resume, and the theme switch in that order', () => {
    renderHeader()

    const names = menu()
      .getAllByRole('link')
      .map((link) => link.textContent)
    expect(names).toEqual(['Writing', 'Projects', 'About', 'Resume'])
    expect(menu().getByRole('button', { name: /Current theme:/ })).toBeInTheDocument()
  })

  it('jumps to the home sections from any page', () => {
    renderHeader('/about')

    expect(menu().getByRole('link', { name: 'Writing' })).toHaveAttribute('href', '/#writing')
    expect(menu().getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects')
  })

  it('opens the resume in a new window and says so', () => {
    renderHeader()

    const resume = menu().getByRole('link', { name: 'Resume (opens in new window)' })
    expect(resume).toHaveAttribute('href', expect.stringContaining('.pdf'))
    expect(resume).toHaveAttribute('target', '_blank')
    expect(resume).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('marks About as the current page only on About', () => {
    renderHeader('/about')
    expect(menu().getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
  })

  it('marks no menu link as current on the home page', () => {
    renderHeader('/')
    expect(menu().getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current')
  })
})
