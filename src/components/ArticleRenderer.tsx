import React from 'react'
import { Typography, List, ListItem, ListItemText, Paper, Link, Divider } from '@mui/material'
import LazySyntaxHighlighter from './LazySyntaxHighlighter'
import { ArticleContent } from '../types/articleContent'

interface ArticleRendererProps {
  content: ArticleContent[]
}

const ArticleRenderer: React.FC<ArticleRendererProps> = ({ content }) => {
  const renderHeading = (item: ArticleContent): React.ReactElement => (
    <Typography
      key={`${item.type}-${item.content}`}
      variant={item.variant || 'h3'}
      component={
        item.variant?.startsWith('h')
          ? (item.variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')
          : 'h3'
      }
      gutterBottom={item.gutterBottom}
    >
      {item.content}
    </Typography>
  )

  const renderParagraph = (item: ArticleContent): React.ReactElement => (
    <Typography
      key={`${item.type}-${item.content}`}
      variant={item.variant || 'body1'}
      paragraph={item.paragraph}
    >
      {item.content}
    </Typography>
  )

  const renderList = (item: ArticleContent): React.ReactElement => (
    <List key={`${item.type}-${item.items?.join('-')}`}>
      {item.items?.map((listItem, index) => (
        <ListItem key={index}>
          <ListItemText primary={listItem} />
        </ListItem>
      ))}
    </List>
  )

  const renderComplexList = (item: ArticleContent): React.ReactElement => (
    <List key={`${item.type}-${item.complexItems?.length}`}>
      {item.complexItems?.map((listItem, index) => (
        <ListItem key={index}>
          <ListItemText primary={listItem.primary} secondary={listItem.secondary} />
          {listItem.link && (
            <Link
              href={listItem.link.href}
              target={listItem.link.target || '_blank'}
              rel={listItem.link.target === '_blank' ? 'noopener noreferrer' : undefined}
              color='primary'
              underline='hover'
            >
              {listItem.link.title}
            </Link>
          )}
        </ListItem>
      ))}
    </List>
  )

  const renderCode = (item: ArticleContent): React.ReactElement => (
    <Paper
      key={`${item.type}-${item.language}`}
      elevation={item.elevation || 3}
      style={{ marginBottom: '16px', ...item.style }}
    >
      <LazySyntaxHighlighter language={item.language || 'text'}>
        {item.code || ''}
      </LazySyntaxHighlighter>
    </Paper>
  )

  const renderDivider = (item: ArticleContent): React.ReactElement => (
    <Divider key={`${item.type}-${Date.now()}`} sx={{ my: 2 }} />
  )

  const renderLink = (item: ArticleContent): React.ReactElement => (
    <Link
      key={`${item.type}-${item.href}`}
      href={item.href}
      target={item.target || '_blank'}
      rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
      color='primary'
      underline='hover'
    >
      {item.title || item.content}
    </Link>
  )

  const renderContent = (item: ArticleContent): React.ReactElement | null => {
    switch (item.type) {
      case 'heading':
        return renderHeading(item)
      case 'paragraph':
        return renderParagraph(item)
      case 'list':
        return renderList(item)
      case 'complexList':
        return renderComplexList(item)
      case 'code':
        return renderCode(item)
      case 'divider':
        return renderDivider(item)
      case 'link':
        return renderLink(item)
      default:
        return null
    }
  }

  return <>{content.map(renderContent)}</>
}

export default ArticleRenderer
