import { describe, expect, it, vi } from 'vitest'
import { isApplePlatform } from './isApplePlatform'

describe('isApplePlatform', () => {
  it('reads userAgentData first where the browser has it', () => {
    expect(isApplePlatform({ userAgentData: { platform: 'macOS' }, platform: 'Win32' })).toBe(true)
    expect(isApplePlatform({ userAgentData: { platform: 'Windows' }, platform: 'MacIntel' })).toBe(
      false,
    )
  })

  it('falls back to the platform string in Safari and Firefox', () => {
    expect(isApplePlatform({ platform: 'MacIntel' })).toBe(true)
    expect(isApplePlatform({ platform: 'iPhone' })).toBe(true)
    expect(isApplePlatform({ userAgentData: { platform: '' }, platform: 'iPad' })).toBe(true)
    expect(isApplePlatform({ platform: 'Win32' })).toBe(false)
    expect(isApplePlatform({ platform: 'Linux x86_64' })).toBe(false)
  })

  it('is false when nothing names a platform', () => {
    expect(isApplePlatform({})).toBe(false)
  })

  it('reads the browser navigator by default', () => {
    const platform = vi.spyOn(navigator, 'platform', 'get').mockReturnValue('MacIntel')
    expect(isApplePlatform()).toBe(true)
    platform.mockReturnValue('Win32')
    expect(isApplePlatform()).toBe(false)
    platform.mockRestore()
  })
})
