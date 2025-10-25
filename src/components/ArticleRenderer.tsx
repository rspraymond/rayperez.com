import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Link,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material'
import LazySyntaxHighlighter from './LazySyntaxHighlighter'
import { ArticleContent } from '../types/articleContent'

interface ArticleRendererProps {
  content: ArticleContent[]
}

const ArticleRenderer: React.FC<ArticleRendererProps> = ({ content }) => {
  const renderHeading = (item: ArticleContent, index: number): React.ReactElement => (
    <Typography
      key={`heading-${index}`}
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

  const renderParagraph = (item: ArticleContent, index: number): React.ReactElement => (
    <Typography
      key={`paragraph-${index}`}
      variant={item.variant || 'body1'}
      paragraph={item.paragraph}
    >
      {item.content}
    </Typography>
  )

  const renderList = (item: ArticleContent, index: number): React.ReactElement => (
    <List key={`list-${index}`}>
      {item.items?.map((listItem, idx) => (
        <ListItem key={`list-item-${index}-${idx}`}>
          <ListItemText primary={listItem} />
        </ListItem>
      ))}
    </List>
  )

  const renderComplexList = (item: ArticleContent, index: number): React.ReactElement => (
    <List key={`complexList-${index}`}>
      {item.complexItems?.map((listItem, idx) => (
        <ListItem key={`complex-item-${index}-${idx}`}>
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

  const renderCode = (item: ArticleContent, index: number): React.ReactElement => (
    <Paper
      key={`code-${index}`}
      elevation={item.elevation || 3}
      style={{ marginBottom: '16px', ...item.style }}
      sx={{ borderRadius: 3, overflow: 'hidden' }}
    >
      <LazySyntaxHighlighter language={item.language || 'text'}>
        {item.code || ''}
      </LazySyntaxHighlighter>
    </Paper>
  )

  const renderDivider = (_item: ArticleContent, index: number): React.ReactElement => (
    <Divider key={`divider-${index}`} sx={{ my: 2 }} />
  )

  const renderLink = (item: ArticleContent, index: number): React.ReactElement => (
    <Link
      key={`link-${index}`}
      href={item.href}
      target={item.target || '_blank'}
      rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
      color='primary'
      underline='hover'
    >
      {item.title || item.content}
    </Link>
  )

  const renderTable = (item: ArticleContent, index: number): React.ReactElement => (
    <Box key={`table-${index}`} sx={{ marginBottom: '16px', ...item.style }}>
      {item.table?.caption && (
        <Typography variant='caption' component='div' sx={{ mb: 1, fontStyle: 'italic' }}>
          {item.table.caption}
        </Typography>
      )}
      <TableContainer component={Paper} elevation={item.elevation || 1}>
        <Table>
          <TableHead>
            <TableRow>
              {item.table?.headers.map((header, headerIndex) => (
                <TableCell
                  key={`header-${index}-${headerIndex}`}
                  variant='head'
                  sx={{
                    backgroundColor: 'action.hover',
                    fontWeight: 'bold',
                    py: 2,
                  }}
                >
                  <Typography variant='subtitle2' fontWeight='bold'>
                    {header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {item.table?.rows.map((row, rowIndex) => (
              <TableRow
                key={`row-${index}-${rowIndex}`}
                sx={{
                  backgroundColor: rowIndex % 2 === 0 ? 'background.paper' : 'action.hover',
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                  transition: 'background-color 0.2s ease-in-out',
                }}
              >
                {row.map((cell, cellIndex) => (
                  <TableCell key={`cell-${index}-${rowIndex}-${cellIndex}`} sx={{ py: 2 }}>
                    <Typography variant='body2'>{cell}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )

  const renderContent = (item: ArticleContent, index: number): React.ReactElement | null => {
    switch (item.type) {
      case 'heading':
        return renderHeading(item, index)
      case 'paragraph':
        return renderParagraph(item, index)
      case 'list':
        return renderList(item, index)
      case 'complexList':
        return renderComplexList(item, index)
      case 'code':
        return renderCode(item, index)
      case 'divider':
        return renderDivider(item, index)
      case 'link':
        return renderLink(item, index)
      case 'table':
        return renderTable(item, index)
      default:
        return null
    }
  }

  return <>{content.map((item, index) => renderContent(item, index))}</>
}

export default ArticleRenderer
