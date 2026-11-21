import React, { useState } from 'react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CommandPalette from './CommandPalette'
import { ThemeProvider } from '../contexts/ThemeContext'
import { useTheme } from '../contexts/useTheme'
import { posts } from '../constants/posts'
import { caseStudies } from '../constants/caseStudies'
import { PROFILE } from '../constants/profile'
import type { ArticleSection } from '../utils/articleHeadings'

const LocationProbe: React.FC = () => {
  const { pathname, hash } = useLocation()
  return <output data-testid='location'>{pathname + hash}</output>
}

const ThemeProbe: React.FC = () => <output data-testid='theme'>{useTheme().themeMode}</output>

interface HarnessProps {
  sections: ArticleSection[]
  onClose: () => void
}

/** Owns the open state like the menu trigger does, so closing really closes the dialog. */
const Harness: React.FC<HarnessProps> = ({ sections, onClose }) => {
  const [open, setOpen] = useState(true)
  return (
    <React.Fragment>
      <button type='button' onClick={() => setOpen(true)}>
        Reopen
      </button>
      <CommandPalette
        open={open}
        onClose={() => {
          onClose()
          setOpen(false)
        }}
        sections={sections}
      />
    </React.Fragment>
  )
}

const renderPalette = ({
  sections = [] as ArticleSection[],
  path = '/',
}: { sections?: ArticleSection[]; path?: string } = {}) => {
  const onClose = vi.fn()
  render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider>
        <Harness sections={sections} onClose={onClose} />
        <LocationProbe />
        <ThemeProbe />
      </ThemeProvider>
    </MemoryRouter>,
  )
  return { onClose, user: userEvent.setup() }
}

const searchBox = () =>
  screen.getByRole('combobox', { name: 'Search pages, articles, and actions' })
const optionLabels = () =>
  screen.getAllByRole('option').map((option) => option.querySelector('span')?.textContent)
const selectedOption = () =>
  screen.getAllByRole('option').find((option) => option.getAttribute('aria-selected') === 'true')

afterEach(() => {
  vi.restoreAllMocks()
})

describe('CommandPalette results', () => {
  it('lists pages, every article, every case study, and actions in that order', () => {
    renderPalette()

    const groups = screen
      .getAllByRole('group')
      .map((group) => group.getAttribute('aria-labelledby'))
    const groupNames = groups.map((id) => document.getElementById(id ?? '')?.textContent)
    expect(groupNames).toEqual(['Pages', 'Articles', 'Case studies', 'Actions'])
    expect(
      within(screen.getByRole('group', { name: 'Articles' })).getAllByRole('option'),
    ).toHaveLength(posts.length)
    expect(
      within(screen.getByRole('group', { name: 'Case studies' })).getAllByRole('option'),
    ).toHaveLength(caseStudies.length)
  })

  it('lists the newest article first with its date', () => {
    renderPalette()

    const [first] = within(screen.getByRole('group', { name: 'Articles' })).getAllByRole('option')
    expect(first).toHaveAccessibleName('Why I Choose Cursor Mar 25, 2026')
  })

  it('leads with the sections of the article on screen', () => {
    renderPalette({ sections: [{ id: 'intro', text: 'Introduction' }] })

    const sectionGroup = screen.getByRole('group', { name: 'On this page' })
    expect(within(sectionGroup).getByRole('option')).toHaveTextContent('Introduction')
    expect(optionLabels()[0]).toBe('Introduction')
  })

  it('leaves out the section group when the page has no sections', () => {
    renderPalette()

    expect(screen.queryByRole('group', { name: 'On this page' })).not.toBeInTheDocument()
  })
})

describe('CommandPalette searching', () => {
  it('focuses the search box and highlights the first result', async () => {
    renderPalette()

    await waitFor(() => expect(searchBox()).toHaveFocus())
    const first = screen.getAllByRole('option')[0]
    expect(first).toHaveAttribute('aria-selected', 'true')
    expect(searchBox()).toHaveAttribute('aria-activedescendant', first.id)
  })

  it('narrows results to those matching every word in any order', async () => {
    const { user } = renderPalette()

    await user.type(searchBox(), 'react choose')

    expect(optionLabels()).toEqual(['Why I Choose React'])
    expect(screen.getByRole('status')).toHaveTextContent('1 result')
  })

  it('finds actions by words that are not in their label', async () => {
    const { user } = renderPalette()

    await user.type(searchBox(), 'dark mode')

    expect(optionLabels()).toEqual([expect.stringMatching(/^Switch to (light|dark) theme$/)])
  })

  it('says plainly when nothing matches', async () => {
    const { user } = renderPalette()

    await user.type(searchBox(), 'zzzq')

    expect(screen.queryAllByRole('option')).toHaveLength(0)
    expect(screen.getByText('No results for “zzzq”')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('No results')
    expect(searchBox()).toHaveAttribute('aria-expanded', 'false')
    expect(searchBox()).not.toHaveAttribute('aria-activedescendant')
  })

  it('moves the highlight back to the first result after the query changes', async () => {
    const { user } = renderPalette()

    await user.keyboard('{ArrowDown}{ArrowDown}')
    await user.type(searchBox(), 'why')

    expect(selectedOption()).toBe(screen.getAllByRole('option')[0])
  })
})

describe('CommandPalette keyboard', () => {
  it('moves the highlight with the arrow keys and wraps at both ends', async () => {
    const { user } = renderPalette()
    const options = screen.getAllByRole('option')

    await user.click(searchBox())
    await user.keyboard('{ArrowUp}')
    expect(selectedOption()).toBe(options[options.length - 1])

    await user.keyboard('{ArrowDown}')
    expect(selectedOption()).toBe(options[0])

    await user.keyboard('{ArrowDown}')
    expect(selectedOption()).toBe(options[1])
  })

  it('opens the highlighted result with Enter and closes', async () => {
    const { user, onClose } = renderPalette()

    await user.type(searchBox(), 'about{Enter}')

    expect(screen.getByTestId('location')).toHaveTextContent('/about')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('leaves Enter to the input method while it is composing', () => {
    renderPalette()

    fireEvent.keyDown(searchBox(), { key: 'Enter', isComposing: true })

    expect(screen.getByTestId('location')).toHaveTextContent(/^\/$/)
  })

  it('closes with Escape', async () => {
    const { user, onClose } = renderPalette()

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('starts with an empty search each time it opens', async () => {
    const { user } = renderPalette()

    await user.type(searchBox(), 'react')
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: 'Reopen' }))

    expect(searchBox()).toHaveValue('')
  })
})

describe('CommandPalette commands', () => {
  it('opens an article when clicked', async () => {
    const { user } = renderPalette()

    await user.click(screen.getByRole('option', { name: /Why I Choose Cursor/ }))

    expect(screen.getByTestId('location')).toHaveTextContent('/why-cursor')
  })

  it('jumps to a home section from another page', async () => {
    const { user } = renderPalette({ path: '/why-react' })

    await user.click(screen.getByRole('option', { name: 'Projects' }))

    expect(screen.getByTestId('location')).toHaveTextContent('/#projects')
  })

  it('switches the theme', async () => {
    const { user } = renderPalette()
    const next = screen.getByTestId('theme').textContent === 'dark' ? 'light' : 'dark'

    await user.click(screen.getByRole('option', { name: `Switch to ${next} theme` }))

    expect(screen.getByTestId('theme')).toHaveTextContent(next)
  })

  it.each([
    ['GitHub profile', PROFILE.githubUrl],
    ['LinkedIn profile', PROFILE.linkedinUrl],
    ['RSS feed', '/feed.xml'],
  ])('opens %s in a new window without giving it access to this page', async (name, url) => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    const { user } = renderPalette()

    await user.click(screen.getByRole('option', { name }))

    expect(open).toHaveBeenCalledWith(url, '_blank', 'noopener,noreferrer')
  })

  it('opens the resume PDF in a new window', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    const { user } = renderPalette()

    await user.click(screen.getByRole('option', { name: /Open resume/ }))

    expect(open).toHaveBeenCalledWith(
      expect.stringContaining('.pdf'),
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('starts an email to Raymond', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    const { user } = renderPalette()

    await user.click(screen.getByRole('option', { name: 'Email Raymond' }))

    expect(open).toHaveBeenCalledWith(`mailto:${PROFILE.email}`, '_self')
  })

  it('scrolls to a section only after the dialog has closed', async () => {
    const heading = document.createElement('h3')
    heading.id = 'intro'
    heading.scrollIntoView = vi.fn()
    document.body.appendChild(heading)
    const { user } = renderPalette({ sections: [{ id: 'intro', text: 'Introduction' }] })

    await user.click(screen.getByRole('option', { name: 'Introduction' }))

    expect(heading.scrollIntoView).not.toHaveBeenCalled()
    await waitFor(() => expect(heading.scrollIntoView).toHaveBeenCalledTimes(1))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    heading.remove()
  })
})
