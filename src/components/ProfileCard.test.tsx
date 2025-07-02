import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProfileCard from './ProfileCard'

// Mock LazyImage component
vi.mock('./LazyImage', () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} data-testid='lazy-image' />,
}))

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
    const image = screen.getByTestId('lazy-image')
    const roleText = screen.getByText(testProps.role)

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', testProps.image)
    expect(image).toHaveAttribute('alt', `${testProps.name}'s profile picture`)
    expect(roleText).toBeInTheDocument()
  })
})
