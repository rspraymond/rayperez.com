import { describe, it, expect } from 'vitest'
import { matchesQuery } from './matchesQuery'

describe('matchesQuery', () => {
  it('matches everything when the query is empty or only spaces', () => {
    expect(matchesQuery('Why I Choose Cursor', '')).toBe(true)
    expect(matchesQuery('Why I Choose Cursor', '   ')).toBe(true)
  })

  it('ignores case', () => {
    expect(matchesQuery('Why I Choose Cursor', 'CURSOR')).toBe(true)
  })

  it('needs every word but not their order', () => {
    expect(matchesQuery('Why I Choose Cursor', 'cursor why')).toBe(true)
    expect(matchesQuery('Why I Choose Cursor', 'cursor laravel')).toBe(false)
  })

  it('matches partial words so results narrow while typing', () => {
    expect(matchesQuery('Why I Choose TypeScript', 'typesc')).toBe(true)
  })

  it('ignores accents on either side', () => {
    expect(matchesQuery('Open my résumé', 'resume')).toBe(true)
    expect(matchesQuery('Open my resume', 'résumé')).toBe(true)
  })
})
