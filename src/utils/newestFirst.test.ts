import { describe, expect, it } from 'vitest'
import { newestFirst } from './newestFirst'

describe('newestFirst', () => {
  it('puts later dates first and breaks ties by path so the order never shifts', () => {
    const items = [
      { date: '2024-07-04', path: '/why-react' },
      { date: '2026-03-25', path: '/why-cursor' },
      { date: '2024-07-04', path: '/why-graphql' },
    ]

    expect([...items].sort(newestFirst).map(({ path }) => path)).toEqual([
      '/why-cursor',
      '/why-graphql',
      '/why-react',
    ])
  })
})
