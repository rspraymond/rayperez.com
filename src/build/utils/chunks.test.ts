import { describe, it, expect } from 'vitest'
import { isReactCoreVendor, manualChunkForId } from './chunks'

describe('chunks', () => {
  describe('isReactCoreVendor', () => {
    it('matches react and react-dom under node_modules', () => {
      expect(isReactCoreVendor('/app/node_modules/react/cjs/react.production.min.js')).toBe(true)
      expect(isReactCoreVendor('/app/node_modules/react-dom/client.js')).toBe(true)
      expect(isReactCoreVendor('C:\\app\\node_modules\\react\\index.js')).toBe(true)
    })

    it('does not match other react-prefixed packages', () => {
      expect(isReactCoreVendor('/app/node_modules/react-router-dom/dist/index.js')).toBe(false)
      expect(isReactCoreVendor('/app/node_modules/@emotion/react/dist/emotion-react.esm.js')).toBe(
        false,
      )
      expect(isReactCoreVendor('/app/node_modules/react-query/es/index.js')).toBe(false)
    })
  })

  describe('manualChunkForId', () => {
    it('routes MUI and Emotion to mui-core before react-vendor', () => {
      expect(
        manualChunkForId(
          '/p/node_modules/.pnpm/@emotion+react@11/node_modules/@emotion/react/dist/foo.js',
        ),
      ).toBe('mui-core')
      expect(
        manualChunkForId('/p/node_modules/@mui/material/Button/Button.js'),
      ).toBe('mui-core')
    })

    it('routes react-router packages to react-router', () => {
      expect(manualChunkForId('/p/node_modules/react-router-dom/dist/index.js')).toBe('react-router')
      expect(manualChunkForId('/p/node_modules/history/index.js')).toBe('react-router')
    })

    it('routes react-query to data', () => {
      expect(manualChunkForId('/p/node_modules/react-query/es/index.js')).toBe('data')
    })

    it('routes react and react-dom to react-vendor', () => {
      expect(manualChunkForId('/p/node_modules/react/cjs/react.production.min.js')).toBe(
        'react-vendor',
      )
      expect(manualChunkForId('/p/node_modules/react-dom/index.js')).toBe('react-vendor')
    })

    it('routes react-helmet-async to ui-utils', () => {
      expect(
        manualChunkForId('/p/node_modules/react-helmet-async/lib/index.esm.js'),
      ).toBe('ui-utils')
    })

    it('returns undefined for unmatched node_modules', () => {
      expect(manualChunkForId('/p/node_modules/some-other-pkg/index.js')).toBeUndefined()
    })
  })
})
