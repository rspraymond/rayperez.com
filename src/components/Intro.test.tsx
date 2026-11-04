import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Intro from './Intro'
import { PROFILE } from '../constants/profile'

describe('Intro', () => {
  it('introduces the person by name, photo, and one sentence', () => {
    render(<Intro />)

    expect(screen.getByRole('heading', { level: 1, name: PROFILE.name })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: new RegExp(PROFILE.name) })).toBeInTheDocument()
    expect(screen.getByText(PROFILE.tagline)).toBeInTheDocument()
  })

  it('offers LinkedIn, GitHub, and Email on one line under the introduction', () => {
    render(<Intro />)

    const line = screen.getByRole('link', { name: 'Email' }).closest('p') as HTMLElement
    const links = within(line).getAllByRole('link')
    expect(links.map((link) => link.textContent)).toEqual(['LinkedIn', 'GitHub', 'Email'])
    expect(links[0]).toHaveAttribute('href', PROFILE.linkedinUrl)
    expect(links[0]).toHaveAccessibleName('LinkedIn (opens in new window)')
    expect(links[1]).toHaveAttribute('href', PROFILE.githubUrl)
    expect(links[2]).toHaveAttribute('href', `mailto:${PROFILE.email}`)
    expect(links[2]).not.toHaveAttribute('target')
  })
})
