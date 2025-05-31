import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Experience from './Experience'

describe('Experience', () => {
  it('renders title, company, and duration correctly', () => {
    // Arrange
    const testProps = {
      title: 'Software Engineer',
      company: 'Test Company',
      duration: '2020 - Present',
      bullets: ['Test bullet'],
    }

    // Act
    render(<Experience {...testProps} />)

    // Assert
    expect(screen.getByText(testProps.title)).toBeInTheDocument()
    expect(screen.getByText(`${testProps.company} - ${testProps.duration}`)).toBeInTheDocument()
  })

  it('renders all bullet points', () => {
    // Arrange
    const testProps = {
      title: 'Developer',
      company: 'Company',
      duration: '2019 - 2020',
      bullets: ['First achievement', 'Second achievement', 'Third achievement'],
    }

    // Act
    render(<Experience {...testProps} />)

    // Assert
    testProps.bullets.forEach((bullet) => {
      expect(screen.getByText(bullet)).toBeInTheDocument()
    })
  })

  it('renders correctly with no bullet points', () => {
    // Arrange
    const testProps = {
      title: 'Manager',
      company: 'Enterprise',
      duration: '2018 - 2019',
      bullets: [],
    }

    // Act
    render(<Experience {...testProps} />)

    // Assert
    expect(screen.getByText(testProps.title)).toBeInTheDocument()
    expect(screen.getByText(`${testProps.company} - ${testProps.duration}`)).toBeInTheDocument()
    // Verify the component doesn't break with empty bullets
    const cardContent = screen.getByText(testProps.title).closest('div')
    expect(cardContent).toBeInTheDocument()
  })
})
