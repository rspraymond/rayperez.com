import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Achievements from './Achievements'

describe('Achievements', () => {
  // Test fixture that won't change between test runs
  const mockAchievements = ['Achievement 1', 'Achievement 2', 'Achievement 3']

  it('renders the Achievements heading', () => {
    render(<Achievements achievements={mockAchievements} />)

    expect(screen.getByText('Achievements')).toBeInTheDocument()
  })

  it('renders all provided achievements', () => {
    render(<Achievements achievements={mockAchievements} />)

    mockAchievements.forEach((achievement) => {
      expect(screen.getByText(achievement)).toBeInTheDocument()
    })
  })

  it('renders an empty section when there are no achievements', () => {
    render(<Achievements achievements={[]} />)

    expect(screen.getByRole('region', { name: 'Achievements' })).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})
