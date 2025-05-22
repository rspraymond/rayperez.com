import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProfileCard from './ProfileCard'

describe('ProfileCard', () => {
  it('renders profile information correctly', () => {
    // Arrange
    const testProps = {
      image: '/test-image.jpg',
      name: 'Test User',
      role: 'Software Engineer',
    }

    // Act
    render(<ProfileCard {...testProps} />)

    // Assert
    const avatar = screen.getByAltText(`${testProps.name}'s profile picture`)
    const roleText = screen.getByText(testProps.role)

    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', testProps.image)
    expect(roleText).toBeInTheDocument()
  })
})
