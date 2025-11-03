import { describe, it, expect } from 'vitest'
import { flattenArticleText } from './articleText'
import { ArticleDocument } from '../types/articleContent'

describe('articleText', () => {
  describe('flattenArticleText', () => {
    it('should flatten heading content', () => {
      const doc: ArticleDocument = [{ type: 'heading', content: 'Test Heading', variant: 'h1' }]
      const result = flattenArticleText(doc)
      expect(result).toBe('Test Heading')
    })

    it('should flatten paragraph content', () => {
      const doc: ArticleDocument = [{ type: 'paragraph', content: 'Test paragraph content.' }]
      const result = flattenArticleText(doc)
      expect(result).toBe('Test paragraph content.')
    })

    it('should flatten list items', () => {
      const doc: ArticleDocument = [
        {
          type: 'list',
          items: ['Item 1', 'Item 2', 'Item 3'],
        },
      ]
      const result = flattenArticleText(doc)
      expect(result).toBe('Item 1 Item 2 Item 3')
    })

    it('should handle empty list', () => {
      const doc: ArticleDocument = [{ type: 'list', items: [] }]
      const result = flattenArticleText(doc)
      expect(result).toBe('')
    })

    it('should handle list without items', () => {
      const doc: ArticleDocument = [{ type: 'list' }]
      const result = flattenArticleText(doc)
      expect(result).toBe('')
    })

    it('should flatten complexList items', () => {
      const doc: ArticleDocument = [
        {
          type: 'complexList',
          complexItems: [
            { primary: 'Primary 1', secondary: 'Secondary 1' },
            { primary: 'Primary 2', secondary: 'Secondary 2' },
          ],
        },
      ]
      const result = flattenArticleText(doc)
      expect(result).toBe('Primary 1 Secondary 1 Primary 2 Secondary 2')
    })

    it('should flatten complexList with links', () => {
      const doc: ArticleDocument = [
        {
          type: 'complexList',
          complexItems: [
            {
              primary: 'Primary 1',
              secondary: 'Secondary 1',
              link: { href: '/test', title: 'Link Title' },
            },
          ],
        },
      ]
      const result = flattenArticleText(doc)
      expect(result).toBe('Primary 1 Secondary 1 Link Title')
    })

    it('should handle complexList without complexItems', () => {
      const doc: ArticleDocument = [{ type: 'complexList' }]
      const result = flattenArticleText(doc)
      expect(result).toBe('')
    })

    it('should flatten code content', () => {
      const doc: ArticleDocument = [{ type: 'code', code: 'const x = 1;', language: 'javascript' }]
      const result = flattenArticleText(doc)
      expect(result).toBe('const x = 1;')
    })

    it('should flatten link with title', () => {
      const doc: ArticleDocument = [{ type: 'link', title: 'Link Title', href: '/test' }]
      const result = flattenArticleText(doc)
      expect(result).toBe('Link Title')
    })

    it('should flatten link with content when title is missing', () => {
      const doc: ArticleDocument = [{ type: 'link', content: 'Link Content', href: '/test' }]
      const result = flattenArticleText(doc)
      expect(result).toBe('Link Content')
    })

    it('should skip divider elements', () => {
      const doc: ArticleDocument = [{ type: 'divider' }]
      const result = flattenArticleText(doc)
      expect(result).toBe('')
    })

    it('should handle multiple content types', () => {
      const doc: ArticleDocument = [
        { type: 'heading', content: 'Title', variant: 'h1' },
        { type: 'paragraph', content: 'First paragraph.' },
        { type: 'list', items: ['Item 1', 'Item 2'] },
        { type: 'code', code: 'const x = 1;', language: 'javascript' },
        { type: 'divider' },
        { type: 'paragraph', content: 'Second paragraph.' },
      ]
      const result = flattenArticleText(doc)
      expect(result).toBe('Title First paragraph. Item 1 Item 2 const x = 1; Second paragraph.')
    })

    it('should trim whitespace from content', () => {
      const doc: ArticleDocument = [
        { type: 'paragraph', content: '  Text with spaces  ' },
        { type: 'heading', content: '  Another heading  ' },
      ]
      const result = flattenArticleText(doc)
      expect(result).toBe('Text with spaces Another heading')
    })

    it('should skip empty or whitespace-only content', () => {
      const doc: ArticleDocument = [
        { type: 'paragraph', content: 'Valid content' },
        { type: 'paragraph', content: '' },
        { type: 'paragraph', content: '   ' },
        { type: 'paragraph', content: 'More content' },
      ]
      const result = flattenArticleText(doc)
      expect(result).toBe('Valid content More content')
    })
  })
})
