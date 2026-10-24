import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import { extensionlessHtmlObjectKeys } from '../src/build/utils/extensionlessRouteKeys.js'

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')

const bucket = process.env.AWS_S3_BUCKET
if (!bucket) {
  console.error('AWS_S3_BUCKET is required')
  process.exit(1)
}

const keys = extensionlessHtmlObjectKeys()

for (const key of keys) {
  const localPath = path.join(distDir, key)
  execSync(
    `aws s3 cp "${localPath}" "s3://${bucket}/${key}" --content-type "text/html" --metadata-directive REPLACE`,
    { stdio: 'inherit' },
  )
}

console.log(`Set text/html on ${keys.length} extensionless route objects`)
