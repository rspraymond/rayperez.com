import { ArticleDocument } from '../types/articleContent'

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
