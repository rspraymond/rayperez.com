import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import CommandPaletteTrigger from './CommandPaletteTrigger'
import { ThemeProvider } from '../contexts/ThemeContext'

// Stands in for a lost connection: the palette's chunk fails to download.
vi.mock('./CommandPalette', () => {
  throw new Error('Failed to fetch dynamically imported module')
})

describe('CommandPaletteTrigger when search cannot load', () => {
  it('tells the reader instead of failing silently or taking the page down', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <CommandPaletteTrigger />
        </ThemeProvider>
      </MemoryRouter>,
    )

    // A plain click skips the hover prefetch. After one import of a throwing mock fails, Vitest serves the real module
    // to the next import, so a prefetch would use up the simulated failure before the click.
    fireEvent.click(screen.getByRole('button', { name: 'Search the site' }))

    expect(
      await screen.findByText('Search could not load. Check your connection and try again.'),
    ).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search the site' })).toBeInTheDocument()
  })
})
