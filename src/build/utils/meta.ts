export interface MetaTagValues {
  title: string
  description: string
  keywords: string
  image: string
  url: string
  type: string
  siteName: string
  twitterCreator?: string
}

export const escapeHtml = (value?: string) =>
  (value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const buildMetaTags = (values: MetaTagValues) => {
  const { title, description, keywords, image, url, type, siteName, twitterCreator } = values

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:type" content="${escapeHtml(type)}" />
    <meta property="og:site_name" content="${escapeHtml(siteName)}" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="${escapeHtml(title)}" />
    <meta property="twitter:description" content="${escapeHtml(description)}" />
    <meta property="twitter:image" content="${escapeHtml(image)}" />
    ${twitterCreator ? `<meta property="twitter:creator" content="${escapeHtml(twitterCreator)}" />` : ''}
  `
}
