import { describe, it, expect, beforeEach } from 'vitest'
import { applySocialMetaToDocumentHead, resolveSocialMetaValues } from './socialMetaDocumentHead'
import { SOCIAL_CONFIG } from '../constants/social'

describe('socialMetaDocumentHead', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
    document.title = ''
  })

  it('updates the first description meta and removes duplicates', () => {
    const stale = document.createElement('meta')
    stale.setAttribute('name', 'description')
    stale.setAttribute('content', 'Stale')
    document.head.appendChild(stale)

    const duplicate = document.createElement('meta')
    duplicate.setAttribute('name', 'description')
    duplicate.setAttribute('content', 'Duplicate')
    document.head.appendChild(duplicate)

    applySocialMetaToDocumentHead(
      resolveSocialMetaValues({ description: 'Current', title: 'T', url: 'https://example.com' }),
    )

    const tags = document.querySelectorAll('meta[name="description"]')
    expect(tags).toHaveLength(1)
    expect(tags[0]).toHaveAttribute('content', 'Current')
  })

  it('sets document.title and keeps a single title element', () => {
    applySocialMetaToDocumentHead(
      resolveSocialMetaValues({ title: 'Page title', url: 'https://example.com' }),
    )

    expect(document.title).toBe('Page title')
    expect(document.head.querySelectorAll('title')).toHaveLength(1)
  })

  it('fills defaults when props are omitted', () => {
    const values = resolveSocialMetaValues({})
    expect(values.title).toBe(SOCIAL_CONFIG.siteName)
    expect(values.description).toBe(SOCIAL_CONFIG.defaultDescription)
  })
})
