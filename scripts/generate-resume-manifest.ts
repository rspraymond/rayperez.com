import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface ResumeManifest {
  currentHash: string
  hashedFilename: string
}

function generateResumeManifest(): void {
  const assetsDir = path.resolve(__dirname, '../dist/assets')
  const outputPath = path.resolve(__dirname, '../dist/resume-manifest.json')

  // Check if assets directory exists
  if (!fs.existsSync(assetsDir)) {
    console.error(`❌ Assets directory not found: ${assetsDir}`)
    console.error('   Make sure to run this script after building the project.')
    process.exit(1)
  }

  // Scan for PDF files matching the resume pattern
  const files = fs.readdirSync(assetsDir)
  const resumePattern = /^raymond-perez-software-engineer-resume-([A-Za-z0-9_-]+)\.pdf$/
  const resumeFile = files.find((file) => resumePattern.test(file))

  if (!resumeFile) {
    console.error(`❌ Resume PDF not found in ${assetsDir}`)
    console.error('   Expected pattern: raymond-perez-software-engineer-resume-*.pdf')
    process.exit(1)
  }

  // Extract hash from filename
  const match = resumeFile.match(resumePattern)
  if (!match || !match[1]) {
    console.error(`❌ Could not extract hash from filename: ${resumeFile}`)
    process.exit(1)
  }

  const currentHash = match[1]
  const manifest: ResumeManifest = {
    currentHash,
    hashedFilename: resumeFile,
  }

  // Write manifest file
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2), 'utf8')
  console.log(`✅ Resume manifest generated:`)
  console.log(`   Current hash: ${currentHash}`)
  console.log(`   Hashed filename: ${resumeFile}`)
  console.log(`   Manifest path: ${outputPath}`)
}

generateResumeManifest()
