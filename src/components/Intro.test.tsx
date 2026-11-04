import { render, screen } from '@testing-library/react'
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
})
