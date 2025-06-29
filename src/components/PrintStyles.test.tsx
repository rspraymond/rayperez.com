import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PrintStyles from './PrintStyles'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const mockTheme = createTheme()

const PrintStylesWithTheme = () => (
  <ThemeProvider theme={mockTheme}>
    <PrintStyles />
  </ThemeProvider>
)

describe('PrintStyles', () => {
  it('renders without errors', () => {
    expect(() => render(<PrintStylesWithTheme />)).not.toThrow()
  })

  it('applies GlobalStyles component', () => {
    render(<PrintStylesWithTheme />)
    // GlobalStyles renders as a style element in the head
    const styleElements = document.head.querySelectorAll('style')
    expect(styleElements.length).toBeGreaterThan(0)
  })
})
