import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import PrintStyles from './PrintStyles'

describe('PrintStyles', () => {
  afterEach(() => {
    cleanup()
    // Clean up any added style elements
    document.head.querySelectorAll('link[href="/print-styles.css"]').forEach((el) => el.remove())
  })

  it('adds print stylesheet on beforeprint event', () => {
    render(<PrintStyles />)

    // Simulate print attempt
    window.dispatchEvent(new Event('beforeprint'))

    // Check if stylesheet was added
    const styleLink = document.head.querySelector('link[href="/print-styles.css"]')
    expect(styleLink).toBeTruthy()
    expect(styleLink?.getAttribute('media')).toBe('print')
  })

  it('removes print stylesheet on unmount', () => {
    const { unmount } = render(<PrintStyles />)

    // Simulate print attempt
    window.dispatchEvent(new Event('beforeprint'))

    // Verify stylesheet was added
    expect(document.head.querySelector('link[href="/print-styles.css"]')).toBeTruthy()

    // Unmount component
    unmount()

    // Verify stylesheet was removed
    expect(document.head.querySelector('link[href="/print-styles.css"]')).toBeFalsy()
  })

  it('only adds stylesheet once for multiple print attempts', () => {
    render(<PrintStyles />)

    // Simulate multiple print attempts
    window.dispatchEvent(new Event('beforeprint'))
    window.dispatchEvent(new Event('beforeprint'))
    window.dispatchEvent(new Event('beforeprint'))

    // Check that only one stylesheet was added
    const styleLinks = document.head.querySelectorAll('link[href="/print-styles.css"]')
    expect(styleLinks.length).toBe(1)
  })
})
