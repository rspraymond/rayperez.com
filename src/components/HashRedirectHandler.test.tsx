import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import HashRedirectHandler from './HashRedirectHandler'

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('HashRedirectHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset window.location.hash
    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
      },
      writable: true,
    })
  })

  it('renders nothing (returns null)', () => {
    const { container } = renderWithRouter(<HashRedirectHandler />)
    expect(container.firstChild).toBeNull()
  })

  it('does not navigate when no hash is present', () => {
    renderWithRouter(<HashRedirectHandler />)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('navigates when hash matches the expected pattern', () => {
    // Set up a hash that matches the pattern #!/path
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#!/test-path',
      },
      writable: true,
    })

    renderWithRouter(<HashRedirectHandler />)
    expect(mockNavigate).toHaveBeenCalledWith('/test-path', { replace: true })
  })

  it('does not navigate when hash does not match the pattern', () => {
    // Set up a hash that doesn't match the pattern
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#invalid-hash',
      },
      writable: true,
    })

    renderWithRouter(<HashRedirectHandler />)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('handles hash with multiple slashes', () => {
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#!/deep/nested/path',
      },
      writable: true,
    })

    renderWithRouter(<HashRedirectHandler />)
    expect(mockNavigate).toHaveBeenCalledWith('/deep/nested/path', { replace: true })
  })
})
