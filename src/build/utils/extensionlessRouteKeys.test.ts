import { describe, expect, it } from 'vitest'
import { extensionlessRouteKeys } from './extensionlessRouteKeys'

describe('extensionlessRouteKeys', () => {
  it('drops the root and strips the leading slash from every other route', () => {
    expect(extensionlessRouteKeys(['/', '/about', '/case-studies/prejump'])).toEqual([
      'about',
      'case-studies/prejump',
    ])
  })

  it('removes duplicate routes', () => {
    expect(extensionlessRouteKeys(['/about', '/about'])).toEqual(['about'])
  })
})
