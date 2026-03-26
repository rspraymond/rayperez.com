import { describe, it, expect } from 'vitest'
import { isReactCoreVendor, isReactMuiVendorChunk, manualChunkForId } from './chunks'

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

  describe('isReactMuiVendorChunk', () => {
    it('includes react core and MUI stack paths', () => {
      expect(isReactMuiVendorChunk('/p/node_modules/react/cjs/react.production.min.js')).toBe(true)
      expect(isReactMuiVendorChunk('/p/node_modules/@mui/material/Button/Button.js')).toBe(true)
      expect(isReactMuiVendorChunk('/p/node_modules/@mui/system/esm/index.js')).toBe(true)
      expect(
        isReactMuiVendorChunk('/p/node_modules/.pnpm/@emotion+react@11/node_modules/@emotion/react/x.js'),
      ).toBe(true)
    })

    it('includes icons but not router', () => {
      expect(isReactMuiVendorChunk('/p/node_modules/@mui/icons-material/Home.js')).toBe(true)
      expect(isReactMuiVendorChunk('/p/node_modules/react-router-dom/dist/index.js')).toBe(false)
    })
  })

  describe('manualChunkForId', () => {
    it('routes React, MUI, and Emotion to a single react-mui-vendor chunk', () => {
      expect(
        manualChunkForId(
          '/p/node_modules/.pnpm/@emotion+react@11/node_modules/@emotion/react/dist/foo.js',
        ),
      ).toBe('react-mui-vendor')
      expect(
        manualChunkForId('/p/node_modules/@mui/material/Button/Button.js'),
      ).toBe('react-mui-vendor')
      expect(manualChunkForId('/p/node_modules/react/cjs/react.production.min.js')).toBe(
        'react-mui-vendor',
      )
      expect(manualChunkForId('/p/node_modules/react-dom/index.js')).toBe('react-mui-vendor')
    })

    it('routes react-router packages to react-router', () => {
      expect(manualChunkForId('/p/node_modules/react-router-dom/dist/index.js')).toBe('react-router')
      expect(manualChunkForId('/p/node_modules/history/index.js')).toBe('react-router')
    })

    it('does not assign a manual chunk for react-query, react-schemaorg, or schema-dts (avoids vendor cycles)', () => {
      expect(manualChunkForId('/p/node_modules/react-query/es/index.js')).toBeUndefined()
      expect(
        manualChunkForId('/p/node_modules/react-schemaorg/dist/index.js'),
      ).toBeUndefined()
      expect(manualChunkForId('/p/node_modules/schema-dts/types/index.d.ts')).toBeUndefined()
    })

    it('routes react-helmet-async to ui-utils', () => {
      expect(
        manualChunkForId('/p/node_modules/react-helmet-async/lib/index.esm.js'),
      ).toBe('ui-utils')
    })

    it('routes MUI icons into react-mui-vendor to avoid chunk cycles with material', () => {
      expect(manualChunkForId('/p/node_modules/@mui/icons-material/Home.js')).toBe(
        'react-mui-vendor',
      )
    })

    it('returns undefined for unmatched node_modules', () => {
      expect(manualChunkForId('/p/node_modules/some-other-pkg/index.js')).toBeUndefined()
    })
  })
})
