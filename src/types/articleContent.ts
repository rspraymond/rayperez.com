export interface ArticleContent {
  type: 'heading' | 'paragraph' | 'list' | 'code' | 'divider' | 'link' | 'complexList'
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption'
  content?: string
  items?: string[]
  complexItems?: Array<{
    primary: string
    secondary?: string
    link?: {
      href: string
      title: string
      target?: '_blank' | '_self' | '_parent' | '_top'
    }
  }>
  language?: string
  code?: string
  title?: string
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  gutterBottom?: boolean
  paragraph?: boolean
  elevation?: number
  style?: Record<string, string>
}

export type ArticleDocument = ArticleContent[]
