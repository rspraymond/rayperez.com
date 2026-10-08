import { describe, it, expect } from 'vitest'
import { canonicalRoutes } from '../../constants/routes.js'
import {
  assertExtensionlessRoutesMatchMetaPaths,
  extensionlessHtmlObjectKeys,
} from './extensionlessRouteKeys.js'
import { buildRouteHtmlMetaList } from './routeDescriptions.js'

describe('extensionlessRouteKeys', () => {
  it('lists one S3 key per non-home canonical route', () => {
    const keys = extensionlessHtmlObjectKeys()
    const expectedCount = canonicalRoutes.filter((path) => path !== '/').length

    expect(keys).toHaveLength(expectedCount)
    expect(keys).toContain('why-nestjs')
    expect(keys).toContain('case-studies/prejump')
    expect(keys.every((key) => !key.startsWith('/'))).toBe(true)
  })

  it('stays aligned with route HTML meta paths', () => {
    const metaPaths = buildRouteHtmlMetaList().map((route) => route.path)
    expect(() => assertExtensionlessRoutesMatchMetaPaths(metaPaths)).not.toThrow()
  })
})
