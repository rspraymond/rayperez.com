import { ArticleDocument } from '../types/articleContent'

/** First prose block only; key takeaways and headings are not used as the static lead or default description. */
export const leadArticleText = (doc: ArticleDocument): string => {
  for (const item of doc) {
    if (item.type === 'paragraph') {
      const text = item.content?.trim()
      if (text) {
        return text
      }
    }
  }
  return ''
}

export const flattenArticleText = (doc: ArticleDocument): string => {
  const parts: string[] = []
  const append = (s?: string) => {
    if (s && s.trim()) parts.push(s.trim())
  }
  for (const item of doc) {
    switch (item.type) {
      case 'heading':
      case 'paragraph':
        append(item.content)
        break
      case 'list':
        if (item.items) for (const li of item.items) append(li)
        break
      case 'complexList':
        if (item.complexItems) {
          for (const li of item.complexItems) {
            append(li.primary)
            append(li.secondary)
            append(li.link?.title)
          }
        }
        break
      case 'code':
        append(item.code)
        break
      case 'link':
        append(item.title || item.content)
        break
      case 'divider':
        break
      default:
        break
    }
  }
  return parts.join(' ')
}
