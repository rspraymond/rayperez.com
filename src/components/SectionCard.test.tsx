import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SectionCard from './SectionCard'

describe('SectionCard', () => {
  it('is a section named by its heading', () => {
    render(
      <SectionCard title='Projects'>
        <p>Content</p>
      </SectionCard>,
    )

    const section = screen.getByRole('region', { name: 'Projects' })
    expect(section).toHaveTextContent('Content')
  })

  it('uses a level 2 heading by default and level 3 when asked', () => {
    const { rerender } = render(<SectionCard title='Projects'>x</SectionCard>)
    expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument()

    rerender(
      <SectionCard title='Projects' headingComponent='h3'>
        x
      </SectionCard>,
    )
    expect(screen.getByRole('heading', { level: 3, name: 'Projects' })).toBeInTheDocument()
  })

  it('keeps a given heading id so other pages can link to it', () => {
    render(
      <SectionCard title='Projects' headingId='projects-heading'>
        x
      </SectionCard>,
    )

    expect(screen.getByRole('heading', { name: 'Projects' })).toHaveAttribute(
      'id',
      'projects-heading',
    )
  })
})
