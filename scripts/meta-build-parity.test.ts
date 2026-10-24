import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { buildRouteHtmlMetaList } from '../src/build/utils/routeDescriptions'
import { canonicalRoutes } from '../src/constants/routes'
import { HOME_DOCUMENT_TITLE, HOME_META_DESCRIPTION } from '../src/constants/seoCopy'

const indexHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')

describe('route HTML parity', () => {
  it('generates static HTML for exactly the canonical routes', () => {
    const generated = buildRouteHtmlMetaList('https://www.rayperez.com/assets/x.jpg').map(
      (route) => route.path,
    )

    expect([...generated].sort()).toEqual([...canonicalRoutes].sort())
  })

  it('keeps the home copy in step with the default head in index.html', () => {
    expect(indexHtml).toContain(HOME_DOCUMENT_TITLE)
    expect(indexHtml).toContain(HOME_META_DESCRIPTION)
  })
})
