/** S3 object keys for route HTML; the root is index.html, which S3 already serves as HTML. */
export const extensionlessRouteKeys = (routes: readonly string[]): string[] =>
  Array.from(new Set(routes.filter((route) => route !== '/').map((route) => route.slice(1))))
