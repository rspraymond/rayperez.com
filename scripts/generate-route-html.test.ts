import fs from 'fs'
import os from 'os'
import path from 'path'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execSync } from 'child_process'
import { NESTJS_META_DESCRIPTION } from '../src/constants/seoCopy.js'

const projectRoot = path.resolve(import.meta.dirname, '..')

describe('generate-route-html', () => {
  let tempDist: string

  beforeAll(() => {
    const nestArtifact = path.join(projectRoot, 'dist', 'why-nestjs')
    if (!fs.existsSync(nestArtifact)) {
      execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' })
    }
    tempDist = fs.mkdtempSync(path.join(os.tmpdir(), 'route-html-'))
    fs.cpSync(path.join(projectRoot, 'dist'), tempDist, { recursive: true })
  }, 120_000)

  afterAll(() => {
    if (tempDist && fs.existsSync(tempDist)) {
      fs.rmSync(tempDist, { recursive: true, force: true })
    }
  })

  it('writes why-nestjs with article title, description, and introduction paragraph', () => {
    const nestPath = path.join(projectRoot, 'dist', 'why-nestjs')
    const html = fs.readFileSync(nestPath, 'utf8')

    expect(html).toContain('Why I Choose NestJS - Raymond Perez - Software Engineer')
    expect(html).not.toContain('Senior Software Engineer in Denver, Colorado')
    expect(html).toContain(NESTJS_META_DESCRIPTION)
    expect(html).toContain(
      'NestJS is a Node.js framework built with TypeScript for server side applications.',
    )
    expect(html.match(/property="og:title"/g)?.length).toBe(1)
    expect(html).toContain('rel="canonical" href="https://www.rayperez.com/why-nestjs"')
    expect(html).toContain('property="og:url" content="https://www.rayperez.com/why-nestjs"')
    expect(html).toMatch(/https:\/\/www\.rayperez\.com\/assets\/raymond-perez-[^"]+\.jpg/)
  })

  it('writes RSS Nest item with approved description', () => {
    const feed = fs.readFileSync(path.join(projectRoot, 'dist', 'feed.xml'), 'utf8')
    expect(feed).toContain(`<description>${NESTJS_META_DESCRIPTION}</description>`)
    expect(feed).not.toContain('Why I Choose NestJS by Raymond Perez')
  })
})
