import { describe, it, expect, vi } from 'vitest'
import { parseCommit, formatChangelogEntry } from './generate-changelog'
import type { CommitInfo } from './generate-changelog'

describe('generate-changelog', () => {
  describe('parseCommit', () => {
    it('should parse a valid conventional commit message', () => {
      const commitMessage =
        'feat(ui): add dark mode toggle\n\nThis adds a new dark mode toggle component.\nBREAKING CHANGE: Theme context API has changed'

      const result = parseCommit(commitMessage)

      expect(result).toEqual({
        hash: '',
        type: 'feat',
        scope: 'ui',
        subject: 'add dark mode toggle',
        body: 'This adds a new dark mode toggle component.\nBREAKING CHANGE: Theme context API has changed',
        breaking: true,
      })
    })
  })

  describe('formatChangelogEntry', () => {
    it('should format commits into changelog sections', () => {
      // Mock date to ensure consistent test results
      const mockDate = new Date('2024-01-01')
      vi.setSystemTime(mockDate)

      const commits: CommitInfo[] = [
        {
          hash: 'abc123',
          type: 'feat',
          scope: 'ui',
          subject: 'add dark mode toggle',
          body: 'BREAKING CHANGE: Theme context API has changed',
          breaking: true,
        },
        {
          hash: 'def456',
          type: 'fix',
          scope: 'api',
          subject: 'handle network errors',
          body: null,
          breaking: false,
        },
        {
          hash: 'ghi789',
          type: 'docs',
          scope: null,
          subject: 'update README',
          body: null,
          breaking: false,
        },
      ]

      const result = formatChangelogEntry(commits)

      const expected = `
## [Unreleased] - 2024-01-01
### ⚠ BREAKING CHANGES

- **ui:** add dark mode toggle

### Bug Fixes

- **api:** handle network errors

### Other Changes

- docs: update README

`

      expect(result).toBe(expected)

      // Cleanup
      vi.useRealTimers()
    })
  })

  describe('error handling', () => {
    it('should handle invalid commit message format', () => {
      const invalidMessage = 'this is not a conventional commit message'

      const result = parseCommit(invalidMessage)

      expect(result).toBeNull()
    })
  })
})
