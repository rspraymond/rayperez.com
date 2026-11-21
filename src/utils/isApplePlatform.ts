/** The parts of navigator this reads. userAgentData is missing from the DOM types because only Chromium has it. */
export interface PlatformSource {
  platform?: string
  userAgentData?: { platform?: string }
}

const APPLE_PLATFORM = /mac|iphone|ipad|ipod|^ios$/i

const currentNavigator = (): PlatformSource | undefined =>
  typeof navigator === 'undefined' ? undefined : navigator

/**
 * True on Macs, iPhones, and iPads, where the shortcut modifier is Command.
 * Prefers userAgentData because navigator.platform is deprecated; Safari and Firefox only offer platform.
 * iPadOS reports "MacIntel", which still counts as Apple.
 */
export const isApplePlatform = (source: PlatformSource | undefined = currentNavigator()): boolean =>
  APPLE_PLATFORM.test(source?.userAgentData?.platform || source?.platform || '')
