import { describe, expect, test } from 'vitest'
import { parseMarkdownLinks } from './parseMarkdownLinks'

describe('parseMarkdownLinks', () => {
  test('parses single link', () => {
    const result = parseMarkdownLinks('Hello [world](/path)')
    expect(result).toEqual([
      { type: 'text', content: 'Hello ' },
      { type: 'link', content: 'world', href: '/path' },
    ])
  })

  test('parses multiple links', () => {
    const result = parseMarkdownLinks('Check [first](/one) and [second](/two) links')
    expect(result).toEqual([
      { type: 'text', content: 'Check ' },
      { type: 'link', content: 'first', href: '/one' },
      { type: 'text', content: ' and ' },
      { type: 'link', content: 'second', href: '/two' },
      { type: 'text', content: ' links' },
    ])
  })

  test('handles text without links', () => {
    const result = parseMarkdownLinks('Just plain text')
    expect(result).toEqual([{ type: 'text', content: 'Just plain text' }])
  })

  test('handles empty string', () => {
    const result = parseMarkdownLinks('')
    expect(result).toEqual([{ type: 'text', content: '' }])
  })

  test('handles link at start of text', () => {
    const result = parseMarkdownLinks('[start](/begin) with link')
    expect(result).toEqual([
      { type: 'link', content: 'start', href: '/begin' },
      { type: 'text', content: ' with link' },
    ])
  })

  test('handles link at end of text', () => {
    const result = parseMarkdownLinks('Text ends with [link](/end)')
    expect(result).toEqual([
      { type: 'text', content: 'Text ends with ' },
      { type: 'link', content: 'link', href: '/end' },
    ])
  })

  test('handles consecutive links', () => {
    const result = parseMarkdownLinks('[one](/1)[two](/2)')
    expect(result).toEqual([
      { type: 'link', content: 'one', href: '/1' },
      { type: 'link', content: 'two', href: '/2' },
    ])
  })

  test('handles external links', () => {
    const result = parseMarkdownLinks('Visit [Google](https://google.com)')
    expect(result).toEqual([
      { type: 'text', content: 'Visit ' },
      { type: 'link', content: 'Google', href: 'https://google.com' },
    ])
  })

  test('handles links with special characters in text', () => {
    const result = parseMarkdownLinks('Check [C++ & more](/cpp)')
    expect(result).toEqual([
      { type: 'text', content: 'Check ' },
      { type: 'link', content: 'C++ & more', href: '/cpp' },
    ])
  })

  test('handles malformed link (missing closing bracket)', () => {
    const result = parseMarkdownLinks('Text [incomplete(/link)')
    expect(result).toEqual([{ type: 'text', content: 'Text [incomplete(/link)' }])
  })

  test('handles malformed link (missing closing paren)', () => {
    const result = parseMarkdownLinks('Text [link](/incomplete')
    expect(result).toEqual([{ type: 'text', content: 'Text [link](/incomplete' }])
  })

  test('handles nested brackets in link text (treated as plain text due to regex limitation)', () => {
    // Standard markdown doesn't support unescaped nested brackets in link text
    // Our simple parser treats this as plain text, which is acceptable for our use case
    const result = parseMarkdownLinks('See [text [with] brackets](/path)')
    expect(result).toEqual([{ type: 'text', content: 'See [text [with] brackets](/path)' }])
  })

  test('handles parentheses in href (treated as link end due to regex limitation)', () => {
    // Standard markdown doesn't support unencoded parentheses in URLs
    // Our simple parser stops at the first closing paren, which matches standard markdown behavior
    const result = parseMarkdownLinks('Link [here](/path(with)params)')
    expect(result).toEqual([
      { type: 'text', content: 'Link ' },
      { type: 'link', content: 'here', href: '/path(with' },
      { type: 'text', content: 'params)' },
    ])
  })
})
