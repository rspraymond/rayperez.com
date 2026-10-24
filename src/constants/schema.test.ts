import { describe, it, expect } from 'vitest'
import { PERSON_ID, PERSON_SCHEMA, buildBlogPostingSchema, buildProfilePageSchema } from './schema'
import { SITE_URL } from './siteUrl'

describe('buildBlogPostingSchema', () => {
  const input = {
    title: 'Why I Choose TypeScript',
    url: `${SITE_URL}/why-typescript`,
    datePublished: '2024-07-04',
  }

  it('references the shared person as the author', () => {
    const schema = buildBlogPostingSchema(input)

    expect(schema.author['@id']).toBe(PERSON_ID)
    expect(schema.author.name).toBe('Raymond Perez')
  })

  it('uses the published date as the modified date when no update exists', () => {
    const schema = buildBlogPostingSchema(input)

    expect(schema.datePublished).toBe('2024-07-04')
    expect(schema.dateModified).toBe('2024-07-04')
  })

  it('reports the update date as the modified date when one exists', () => {
    const schema = buildBlogPostingSchema({ ...input, dateModified: '2026-01-10' })

    expect(schema.datePublished).toBe('2024-07-04')
    expect(schema.dateModified).toBe('2026-01-10')
  })

  it('uses a caller supplied image URL when one is given', () => {
    const schema = buildBlogPostingSchema({ ...input, image: 'https://example.com/a.jpg' })

    expect(schema.image).toBe('https://example.com/a.jpg')
  })

  it('points the main entity at the canonical page', () => {
    const schema = buildBlogPostingSchema(input)

    expect(schema.mainEntityOfPage).toBe(input.url)
    expect(schema.headline).toBe(input.title)
  })
})

describe('PERSON_SCHEMA', () => {
  it('exposes a stable id and the current employer', () => {
    expect(PERSON_SCHEMA['@id']).toBe(PERSON_ID)
    expect(PERSON_SCHEMA.worksFor.name).toBe('DHI Group, Inc.')
    expect(PERSON_SCHEMA.worksFor.alternateName).toBe('Dice.com')
  })
})

describe('buildProfilePageSchema', () => {
  it('describes the about page with the person as its main entity', () => {
    const schema = buildProfilePageSchema()

    expect(schema['@type']).toBe('ProfilePage')
    expect(schema.url).toBe(`${SITE_URL}/about`)
    expect(schema.mainEntity['@id']).toBe(PERSON_ID)
  })

  it('uses a caller supplied image URL for the person', () => {
    const schema = buildProfilePageSchema('https://example.com/a.jpg')

    expect(schema.mainEntity.image).toBe('https://example.com/a.jpg')
  })
})
