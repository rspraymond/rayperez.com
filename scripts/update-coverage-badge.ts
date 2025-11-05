import fs from 'fs'
import path from 'path'

interface CoverageTotals {
  total: {
    lines: { pct: number }
    statements: { pct: number }
    functions: { pct: number }
    branches: { pct: number }
  }
}

function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath)
  } catch {
    return false
  }
}

function readJson<T>(filePath: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T
  } catch {
    return null
  }
}

function isCoverageTotals(data: unknown): data is CoverageTotals {
  if (!data || typeof data !== 'object') return false
  const maybeTotals = (data as { total?: unknown }).total
  if (!maybeTotals || typeof maybeTotals !== 'object') return false
  const t = maybeTotals as {
    lines?: { pct?: unknown }
    statements?: { pct?: unknown }
    functions?: { pct?: unknown }
    branches?: { pct?: unknown }
  }
  return (
    typeof t.lines?.pct === 'number' &&
    typeof t.statements?.pct === 'number' &&
    typeof t.functions?.pct === 'number' &&
    typeof t.branches?.pct === 'number'
  )
}

function getCoveragePercentage(): number {
  const summaryPath = path.join(process.cwd(), 'coverage', 'coverage-summary.json')
  const finalPath = path.join(process.cwd(), 'coverage', 'coverage-final.json')

  let totals: CoverageTotals['total'] | null = null

  if (fileExists(summaryPath)) {
    const summaryData = readJson<unknown>(summaryPath)
    if (isCoverageTotals(summaryData)) totals = summaryData.total
    else {
      console.error('coverage-summary.json missing required totals structure')
      process.exit(1)
    }
  } else if (fileExists(finalPath)) {
    const finalData = readJson<unknown>(finalPath)
    if (isCoverageTotals(finalData)) totals = finalData.total
    else {
      console.error(
        'coverage-final.json is present but missing totals. Add "json-summary" reporter to vitest',
      )
      process.exit(1)
    }
  } else {
    console.error(
      'Coverage files not found. Ensure vitest reporter includes "json-summary" and rerun: npm run test:coverage',
    )
    process.exit(1)
  }

  const { lines, statements, functions, branches } = totals

  if (!lines?.pct || !statements?.pct || !functions?.pct || !branches?.pct) {
    console.error('Coverage file missing required percentage fields')
    process.exit(1)
  }

  // Calculate average of all coverage metrics
  const average = (lines.pct + statements.pct + functions.pct + branches.pct) / 4

  return Math.round(average * 10) / 10 // Round to 1 decimal place
}

function getBadgeColor(percentage: number): string {
  if (percentage >= 70) return 'green'
  if (percentage >= 50) return 'yellow'
  return 'red'
}

function updateReadmeBadge(percentage: number, color: string): void {
  const readmePath = path.join(process.cwd(), 'README.md')
  const readmeContent = fs.readFileSync(readmePath, 'utf8')

  // Badge pattern: [![Test Coverage](https://img.shields.io/badge/coverage-{percentage}%25-{color})](coverage)
  const badgePattern =
    /\[!\[Test Coverage\]\(https:\/\/img\.shields\.io\/badge\/coverage-[\d.]+%25-\w+\)\]\(coverage\)/

  const newBadge = `[![Test Coverage](https://img.shields.io/badge/coverage-${percentage}%25-${color})](coverage)`

  if (!badgePattern.test(readmeContent)) {
    console.error('Could not find coverage badge in README.md')
    process.exit(1)
  }

  const updatedContent = readmeContent.replace(badgePattern, newBadge)
  fs.writeFileSync(readmePath, updatedContent)

  console.log(`Updated coverage badge to ${percentage}% (${color})`)
}

const coveragePercentage = getCoveragePercentage()
const badgeColor = getBadgeColor(coveragePercentage)
updateReadmeBadge(coveragePercentage, badgeColor)
