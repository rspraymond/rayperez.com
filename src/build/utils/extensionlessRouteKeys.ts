import { canonicalRoutes } from '../../constants/routes.js'

/** S3 object keys for extensionless HTML shells (every canonical route except `/`). */
export const extensionlessHtmlObjectKeys = (): string[] =>
  canonicalRoutes
    .filter((path) => path !== '/')
    .map((path) => path.replace(/^\//, ''))

export const assertExtensionlessRoutesMatchMetaPaths = (metaPaths: string[]): void => {
  const fromRoutes = canonicalRoutes.filter((path) => path !== '/').sort()
  const fromMeta = metaPaths.filter((path) => path !== '/').sort()

  if (fromRoutes.length !== fromMeta.length || fromRoutes.some((path, i) => path !== fromMeta[i])) {
    throw new Error(
      `Route HTML meta paths must match canonicalRoutes. Expected ${fromRoutes.join(', ')}; got ${fromMeta.join(', ')}.`,
    )
  }
}
