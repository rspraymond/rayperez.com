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

  it('renders empty state correctly when no achievements are provided', () => {
    render(<Achievements achievements={[]} />)

    // Verify heading is present
    expect(screen.getByText('Achievements')).toBeInTheDocument()

    // Verify the Card component renders (by checking if it contains the heading)
    const headingElement = screen.getByText('Achievements')
    expect(headingElement).toBeInTheDocument()

    // Verify no achievement items are rendered
    // We should only have one Typography element with the heading text
    const typographyElements = screen.getAllByRole('heading')
    expect(typographyElements.length).toBe(1)
  })
})
