import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

interface CommitInfo {
  hash: string
  type: string
  scope: string | null
  subject: string
  body: string | null
  breaking: boolean
}

export function parseCommit(commitStr: string): CommitInfo | null {
  // Match conventional commit format (synced with .commitlintrc.cjs)
  const regex =
    /^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(?:\((.*?)\))?: (.*)$/
  const firstLine = commitStr.split('\n')[0]
  const match = firstLine.match(regex)

  if (!match) return null

  const [, type, scope, subject] = match

  // Split message into header and body, handling multiline properly
  const parts = commitStr.split(/\n+/)
  const body = parts.slice(1).join('\n').trim() || null

  // Check for breaking changes in header and body
  const isBreaking =
    firstLine.includes('!') || // Breaking change marker in header
    Boolean(body?.includes('BREAKING CHANGE:') || body?.includes('BREAKING-CHANGE:'))

  return {
    hash: '', // Will be set later
    type,
    scope: scope || null,
    subject,
    body,
    breaking: isBreaking,
  }
}

export function getLatestTag(): string {
  try {
    return execSync('git describe --tags --abbrev=0').toString().trim()
  } catch {
    return '' // Return empty string if no tags exist
  }
}

export function getCommitsSinceTag(tag: string): CommitInfo[] {
  const format = '%H%n%B%n------------------------ COMMIT ------------------------'
  const command = tag
    ? `git log ${tag}..HEAD --pretty=format:"${format}"`
    : `git log --pretty=format:"${format}"`

  const output = execSync(command).toString().trim()
  if (!output) return []

  const commits = output
    .split('------------------------ COMMIT ------------------------')
    .map((commit) => commit.trim())
    .filter(Boolean)

  return commits
    .map((commit) => {
      const [hash, ...messageLines] = commit.split('\n')
      const message = messageLines.join('\n').trim()
      const parsed = parseCommit(message)
      if (parsed) {
        parsed.hash = hash
        return parsed
      }
      return null
    })
    .filter((commit): commit is CommitInfo => commit !== null)
}

export function formatChangelogEntry(commits: CommitInfo[]): string {
  const today = new Date().toISOString().split('T')[0]
  const version = process.env.VERSION || 'Unreleased'

  let changelog = `\n## [${version}] - ${today}\n`

  // Group commits by type
  const breaking = commits.filter((c) => c.breaking)
  const features = commits.filter((c) => c.type === 'feat' && !c.breaking)
  const fixes = commits.filter((c) => c.type === 'fix' && !c.breaking)
  const other = commits.filter((c) => !['feat', 'fix'].includes(c.type) && !c.breaking)

  // Add breaking changes first
  if (breaking.length > 0) {
    changelog += '### ⚠ BREAKING CHANGES\n\n'
    breaking.forEach((commit) => {
      const scope = commit.scope ? `**${commit.scope}:** ` : ''
      changelog += `- ${scope}${commit.subject}\n`
    })
    changelog += '\n'
  }

  // Add features
  if (features.length > 0) {
    changelog += '### Features\n\n'
    features.forEach((commit) => {
      const scope = commit.scope ? `**${commit.scope}:** ` : ''
      changelog += `- ${scope}${commit.subject}\n`
    })
    changelog += '\n'
  }

  // Add fixes
  if (fixes.length > 0) {
    changelog += '### Bug Fixes\n\n'
    fixes.forEach((commit) => {
      const scope = commit.scope ? `**${commit.scope}:** ` : ''
      changelog += `- ${scope}${commit.subject}\n`
    })
    changelog += '\n'
  }

  // Add other changes
  if (other.length > 0) {
    changelog += '### Other Changes\n\n'
    other.forEach((commit) => {
      const scope = commit.scope ? `**${commit.scope}:** ` : ''
      changelog += `- ${commit.type}: ${scope}${commit.subject}\n`
    })
    changelog += '\n'
  }

  return changelog
}

export function updateChangelog(newEntry: string) {
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md')
  let content = ''

  try {
    content = fs.readFileSync(changelogPath, 'utf8')
  } catch {
    content =
      '# Changelog\n\nAll notable changes to this project will be documented in this file.\n'
  }

  // Insert new entry after the header
  const lines = content.split('\n')
  const headerEnd =
    lines.findIndex((line, index) => index > 0 && line.startsWith('#') && !line.startsWith('##')) +
      1 || 2

  lines.splice(headerEnd, 0, newEntry)

  fs.writeFileSync(changelogPath, lines.join('\n'))
}

// Main execution
const latestTag = getLatestTag()
const commits = getCommitsSinceTag(latestTag)
const newEntry = formatChangelogEntry(commits)
updateChangelog(newEntry)
