import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Writing from './Writing'

const posts = [
  { title: 'Older', date: '2024-07-04', path: '/why-b' },
  { title: 'Newest', date: '2026-03-25', path: '/why-c' },
  { title: 'Same day', date: '2024-07-04', path: '/why-a' },
]

const renderWriting = () =>
  render(
    <MemoryRouter>
      <Writing posts={posts} />
    </MemoryRouter>,
  )

describe('Writing', () => {
  it('is a section named Writing that the menu can jump to', () => {
    renderWriting()

    expect(screen.getByRole('region', { name: 'Writing' })).toHaveAttribute('id', 'writing')
  })

  it('lists every article newest first, breaking same day ties by path', () => {
    renderWriting()

    const titles = screen.getAllByRole('link').map((link) => link.textContent)
    expect(titles).toEqual(['Newest', 'Same day', 'Older'])
  })

  it('links each article and shows its date', () => {
    renderWriting()

    const item = screen.getByRole('link', { name: 'Newest' }).closest('li') as HTMLElement
    expect(within(item).getByRole('link')).toHaveAttribute('href', '/why-c')
    expect(within(item).getByText('Mar 25, 2026')).toHaveAttribute('datetime', '2026-03-25')
  })
})
