import { execFileSync } from 'child_process'
import { canonicalRoutes } from '../src/constants/routes.js'
import { extensionlessRouteKeys } from '../src/build/utils/extensionlessRouteKeys.js'

const bucket = process.env.AWS_S3_BUCKET
if (!bucket) {
  throw new Error('AWS_S3_BUCKET is required')
}

// Extensionless objects are uploaded with a guessed type, so crawlers would not get text/html.
for (const key of extensionlessRouteKeys(canonicalRoutes)) {
  // Copying an object onto itself is the only way to change its type, and S3 requires REPLACE for that.
  const object = `s3://${bucket}/${key}`
  console.log(`Setting text/html on ${object}`)
  execFileSync(
    'aws',
    [
      's3',
      'cp',
      object,
      object,
      '--content-type',
      'text/html; charset=utf-8',
      '--metadata-directive',
      'REPLACE',
    ],
    { stdio: 'inherit' },
  )
}
