import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import SocialMeta from './SocialMeta'
import { SOCIAL_CONFIG } from '../constants/social'

// Mock react-helmet
vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='helmet'>{children}</div>
  ),
}))

// Mock window.location.href
const mockLocation = 'https://example.com/test-page'
Object.defineProperty(window, 'location', {
  value: { href: mockLocation },
  writable: true,
})

beforeEach(() => {
  // Reset window.location.href before each test
  Object.defineProperty(window, 'location', {
    value: { href: mockLocation },
    writable: true,
  })
})

describe('SocialMeta - defaults and fallbacks', () => {
  it('renders with default values when no props are provided', () => {
    render(<SocialMeta />)

    // Check that all default meta tags are present
    const metaTags = document.querySelectorAll('meta[property]')
    expect(metaTags).toHaveLength(11) // 6 Open Graph + 5 Twitter Card tags

    // Verify Open Graph tags
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.siteName,
    )
    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.defaultDescription,
    )
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.defaultImage,
    )
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      mockLocation,
    )
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute('content', 'website')
    expect(document.querySelector('meta[property="og:site_name"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.siteName,
    )

    // Verify Twitter Card tags
    expect(document.querySelector('meta[property="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    )
    expect(document.querySelector('meta[property="twitter:title"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.siteName,
    )
    expect(document.querySelector('meta[property="twitter:description"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.defaultDescription,
    )
    expect(document.querySelector('meta[property="twitter:image"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.defaultImage,
    )
    expect(document.querySelector('meta[property="twitter:creator"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.twitterCreator,
    )
  })

  it('uses fallback values for missing props', () => {
    const partialProps = {
      title: 'Partial Title',
      type: 'profile' as const,
    }

    render(<SocialMeta {...partialProps} />)

    // Verify provided values are used
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      partialProps.title,
    )
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute(
      'content',
      partialProps.type,
    )

    // Verify fallback values are used for missing props
    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.defaultDescription,
    )
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.defaultImage,
    )
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      mockLocation,
    )
    expect(document.querySelector('meta[property="og:site_name"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.siteName,
    )
  })

  it('handles empty string props gracefully', () => {
    const emptyProps = {
      title: '',
      description: '',
      image: '',
      url: '',
    }

    render(<SocialMeta {...emptyProps} />)

    // Should fall back to default values
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.siteName,
    )
    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.defaultDescription,
    )
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      SOCIAL_CONFIG.defaultImage,
    )
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      mockLocation,
    )
  })
})

describe('SocialMeta - custom and types', () => {
  it('renders with custom props when provided', () => {
    const customProps = {
      title: 'Custom Title',
      description: 'Custom Description',
      image: '/custom-image.jpg',
      url: 'https://custom-url.com',
      type: 'article' as const,
      twitterCreator: '@customuser',
      siteName: 'Custom Site Name',
    }

    render(<SocialMeta {...customProps} />)

    // Verify custom values are used
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      customProps.title,
    )
    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute(
      'content',
      customProps.description,
    )
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      customProps.image,
    )
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      customProps.url,
    )
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute(
      'content',
      customProps.type,
    )
    expect(document.querySelector('meta[property="og:site_name"]')).toHaveAttribute(
      'content',
      customProps.siteName,
    )

    expect(document.querySelector('meta[property="twitter:title"]')).toHaveAttribute(
      'content',
      customProps.title,
    )
    expect(document.querySelector('meta[property="twitter:description"]')).toHaveAttribute(
      'content',
      customProps.description,
    )
    expect(document.querySelector('meta[property="twitter:image"]')).toHaveAttribute(
      'content',
      customProps.image,
    )
    expect(document.querySelector('meta[property="twitter:creator"]')).toHaveAttribute(
      'content',
      customProps.twitterCreator,
    )
  })

  it('supports different content types', () => {
    const types: Array<'website' | 'article' | 'profile'> = ['website', 'article', 'profile']

    types.forEach((type) => {
      // Clean up previous renders
      document.body.innerHTML = ''

      render(<SocialMeta type={type} />)

      expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute('content', type)
    })
  })

  it('generates correct number of meta tags', () => {
    render(<SocialMeta />)

    const metaTags = document.querySelectorAll('meta[property]')
    expect(metaTags).toHaveLength(11)

    // Verify all expected properties are present
    const properties = Array.from(metaTags).map((tag) => tag.getAttribute('property'))
    const expectedProperties = [
      'og:title',
      'og:description',
      'og:image',
      'og:url',
      'og:type',
      'og:site_name',
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image',
      'twitter:creator',
    ]

    expectedProperties.forEach((property) => {
      expect(properties).toContain(property)
    })
  })
})
