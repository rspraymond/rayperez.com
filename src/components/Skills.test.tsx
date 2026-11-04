import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Skills from './Skills'

const skill = (label: string) => ({ label, url: `/why-${label.toLowerCase()}` })

const renderSkills = (labels: string[]) =>
  render(
    <MemoryRouter>
      <Skills skills={labels.map(skill)} />
    </MemoryRouter>,
  )

describe('Skills', () => {
  it.each([
    [['A'], 'I work most with A.'],
    [['A', 'B'], 'I work most with A and B.'],
    [['A', 'B', 'C'], 'I work most with A, B, and C.'],
  ])('reads %j as one sentence', (labels, sentence) => {
    renderSkills(labels)

    expect(
      screen.getByText(
        (_, element) => element?.tagName === 'P' && element.textContent === sentence,
      ),
    ).toBeInTheDocument()
  })

  it('links each skill to the article about it', () => {
    renderSkills(['React', 'Laravel'])

    expect(screen.getByRole('link', { name: 'React' })).toHaveAttribute('href', '/why-react')
    expect(screen.getByRole('link', { name: 'Laravel' })).toHaveAttribute('href', '/why-laravel')
  })

  it('shows only the heading when there are no skills', () => {
    renderSkills([])

    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
