import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Education from './Education'

describe('Education', () => {
  // Test fixture factory to create consistent test data
  const createEducationProps = (overrides = {}) => ({
    degree: 'Test Degree',
    school: 'Test School',
    duration: '2020-2024',
    details: 'Test education details',
    ...overrides,
  })

  it('renders education information correctly', () => {
    // Arrange
    const props = createEducationProps()

    // Act
    render(<Education {...props} />)

    // Assert
    expect(screen.getByText(props.degree)).toBeInTheDocument()
    expect(screen.getByText(`${props.school} - ${props.duration}`)).toBeInTheDocument()
    expect(screen.getByText(props.details)).toBeInTheDocument()
  })

  it('applies correct typography variants to different parts', () => {
    // Arrange
    const props = createEducationProps()

    // Act
    render(<Education {...props} />)

    // Assert
    // Check for correct Material-UI typography classes
    const headingElement = screen.getByText(props.degree)
    expect(headingElement.classList.toString()).toContain('MuiTypography-h5')

    const subtitleElement = screen.getByText(`${props.school} - ${props.duration}`)
    expect(subtitleElement.classList.toString()).toContain('MuiTypography-subtitle1')

    const detailsElement = screen.getByText(props.details)
    expect(detailsElement.classList.toString()).toContain('MuiTypography-body1')
  })

  it('renders within a card with proper spacing', () => {
    // Arrange
    const props = createEducationProps()

    // Act
    const { container } = render(<Education {...props} />)

    // Assert
    // Check for Card component and its structure
    const card = container.querySelector('.MuiCard-root')
    expect(card).toBeInTheDocument()

    const cardContent = container.querySelector('.MuiCardContent-root')
    expect(cardContent).toBeInTheDocument()

    // Verify the card is flush with its container to let parent layout control spacing
    const computedStyles = card ? window.getComputedStyle(card) : null
    expect(computedStyles?.marginTop).toBe('0px')
  })
})
