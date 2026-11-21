import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import CommandPaletteTrigger from './CommandPaletteTrigger'
import { ThemeProvider } from '../contexts/ThemeContext'

const renderTrigger = (page: React.ReactNode = null) =>
  render(
    <MemoryRouter>
      <ThemeProvider>
        <CommandPaletteTrigger />
        {page}
      </ThemeProvider>
    </MemoryRouter>,
  )

const findPalette = () => screen.findByRole('dialog', { name: 'Search the site' })

describe('CommandPaletteTrigger', () => {
  it('names the button and says it opens a dialog', () => {
    renderTrigger()

    const button = screen.getByRole('button', { name: 'Search the site' })
    expect(button).toHaveAttribute('aria-haspopup', 'dialog')
    expect(button).toHaveAttribute('aria-keyshortcuts')
  })

  it('opens the palette from the button', async () => {
    renderTrigger()

    await userEvent.setup().click(screen.getByRole('button', { name: 'Search the site' }))

    expect(await findPalette()).toBeInTheDocument()
  })

  it.each([
    ['Ctrl+K', { key: 'k', ctrlKey: true }],
    ['Cmd+K', { key: 'k', metaKey: true }],
    ['Cmd+K with caps lock on', { key: 'K', metaKey: true }],
  ])('opens with %s and closes with it again', async (_name, shortcut) => {
    renderTrigger()

    expect(fireEvent.keyDown(document.body, shortcut)).toBe(false)
    expect(await findPalette()).toBeInTheDocument()

    fireEvent.keyDown(screen.getByRole('combobox'), shortcut)
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('opens with slash when the reader is not typing', async () => {
    renderTrigger()

    expect(fireEvent.keyDown(document.body, { key: '/' })).toBe(false)
    expect(await findPalette()).toBeInTheDocument()
  })

  it.each([
    ['a text field', <input key='field' aria-label='Field' />],
    ['a text area', <textarea key='field' aria-label='Field' />],
  ])('leaves slash alone while the reader types in %s', (_name, field) => {
    renderTrigger(field)

    // An unprevented event means the character reaches the field.
    expect(fireEvent.keyDown(screen.getByLabelText('Field'), { key: '/' })).toBe(true)
  })

  it.each([
    ['Ctrl+Shift+K', { key: 'K', ctrlKey: true, shiftKey: true }],
    ['Ctrl+Alt+K', { key: 'k', ctrlKey: true, altKey: true }],
    ['Ctrl+/', { key: '/', ctrlKey: true }],
    ['a plain k', { key: 'k' }],
    ['a key event without a key, as autofill sends', {}],
  ])('ignores %s', (_name, keys) => {
    renderTrigger()

    expect(fireEvent.keyDown(document.body, keys)).toBe(true)
  })

  it('lists the sections of the article on screen', async () => {
    renderTrigger(
      <article>
        <h3 id='intro'>Introduction</h3>
      </article>,
    )

    fireEvent.keyDown(document.body, { key: '/' })

    expect(await screen.findByRole('group', { name: 'On this page' })).toHaveTextContent(
      'Introduction',
    )
  })
})
