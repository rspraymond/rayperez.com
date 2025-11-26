import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProfileCard from './ProfileCard'

// Mock LazyImage component
vi.mock('./LazyImage', () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} data-testid='lazy-image' />,
}))

// Mock profile data
vi.mock('../data/content/profile.json', () => ({
  default: {
    name: 'Test User',
    role: 'Software Engineer',
    image: '/assets/test-image.jpg',
    email: 'test@example.com',
    location: {
      city: 'Test City',
      state: 'TS',
      country: 'US',
    },
    description: 'Test description',
    twitterCreator: '@testuser',
  },
}))

// Mock profile image import
vi.mock('../assets/raymond-perez.jpg', () => ({
  default: '/assets/raymond-perez.jpg',
}))

describe('ProfileCard', () => {
  it('renders profile information correctly', () => {
    // Arrange & Act
    render(<ProfileCard />)

    // Assert
    const image = screen.getByTestId('lazy-image')
    const roleText = screen.getByText('Software Engineer')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/assets/raymond-perez.jpg')
    expect(image).toHaveAttribute('alt', "Test User's profile picture")
    expect(roleText).toBeInTheDocument()
  })

  it('renders a LinkedIn connect CTA with correct attributes', () => {
    render(<ProfileCard />)

    const cta = screen.getByRole('link', { name: /connect.*linkedin/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', 'https://www.linkedin.com/in/raymond-perez-eng/')
    expect(cta).toHaveAttribute('target', '_blank')
  })
})
