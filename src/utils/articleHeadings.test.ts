import { afterEach, describe, expect, it, vi } from 'vitest'
import { readArticleSections, scrollToHeading } from './articleHeadings'

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
  window.history.replaceState(null, '', window.location.pathname)
})

describe('readArticleSections', () => {
  it('lists the article headings that carry an id, in page order', () => {
    document.body.innerHTML = `
      <article>
        <h3 id="intro">Introduction</h3>
        <h5 id="detail">A detail</h5>
        <h3 id="end">Conclusion</h3>
      </article>
    `

    expect(readArticleSections()).toEqual([
      { id: 'intro', text: 'Introduction' },
      { id: 'detail', text: 'A detail' },
      { id: 'end', text: 'Conclusion' },
    ])
  })

  it('skips the takeaways and FAQ labels, empty headings, and headings without an id', () => {
    document.body.innerHTML = `
      <article>
        <h3 id="takeaways">Key Takeaways</h3>
        <h3 id="faq">Frequently Asked Questions</h3>
        <h3 id="blank">   </h3>
        <h3>No id yet</h3>
        <h3 id="kept">  Kept  </h3>
      </article>
    `

    expect(readArticleSections()).toEqual([{ id: 'kept', text: 'Kept' }])
  })

  it('ignores headings outside an article, such as on the home page', () => {
    document.body.innerHTML = '<section><h3 id="dhi">DHI Group</h3></section>'

    expect(readArticleSections()).toEqual([])
  })
})

describe('scrollToHeading', () => {
  const addHeading = (id: string): HTMLElement => {
    document.body.innerHTML = `<article><h3 id="${id}">Heading</h3></article>`
    const heading = document.getElementById(id) as HTMLElement
    heading.scrollIntoView = vi.fn()
    return heading
  }

  it('scrolls smoothly to the heading and records it in the URL without a jump', () => {
    const heading = addHeading('intro')
    const replaceState = vi.spyOn(window.history, 'replaceState')

    scrollToHeading('intro')

    expect(heading.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    expect(replaceState).toHaveBeenCalledWith(null, '', '#intro')
    expect(window.location.hash).toBe('#intro')
  })

  it('leaves the page and URL alone when no heading has the id', () => {
    const replaceState = vi.spyOn(window.history, 'replaceState')

    scrollToHeading('missing')

    expect(replaceState).not.toHaveBeenCalled()
    expect(window.location.hash).toBe('')
  })
})
