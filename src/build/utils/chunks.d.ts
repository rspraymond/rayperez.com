export interface ChunkMatcher {
  matcher: (id: string) => boolean
  name: string
}
export declare const isReactCoreVendor: (id: string) => boolean
export declare const chunkMatchers: ChunkMatcher[]
export declare const manualChunkForId: (id: string) => string | undefined
