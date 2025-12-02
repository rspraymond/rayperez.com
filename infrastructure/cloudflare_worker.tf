resource "cloudflare_workers_script" "spa_rewrite" {
  account_id = var.cloudflare_account_id
  script_name = "spa-rewrite"
  content = <<JS
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname
    const isGet = request.method === "GET"
    
    // Handle PDF resume redirects
    const resumePattern = /^\/raymond-perez-software-engineer-resume(-.*)?\.pdf$/
    if (isGet && resumePattern.test(path)) {
      try {
        // Fetch manifest to get current hashed filename
        const manifestUrl = new URL('/resume-manifest.json', url.origin)
        const manifestResponse = await fetch(manifestUrl.toString())
        
        if (manifestResponse.ok) {
          const manifest = await manifestResponse.json()
          if (manifest.hashedFilename) {
            const redirectUrl = new URL(`/assets/${manifest.hashedFilename}`, url.origin)
            // Preserve query parameters
            if (url.search) {
              redirectUrl.search = url.search
            }
            return Response.redirect(redirectUrl.toString(), 301)
          }
        }
      } catch (error) {
        // If manifest fetch fails, log error but let request pass through
        // This allows S3 to handle the request (which may have its own redirect rules)
        console.error('Failed to fetch resume manifest:', error)
      }
      
      // If we reach here, manifest fetch failed or was invalid
      // Let the request pass through to origin (S3) to handle
      // S3 routing rules may handle old hashes, or it will return 404
    }
    
    // SPA rewrite logic for HTML requests
    const accept = (request.headers.get("accept") || "").toLowerCase()
    const isHtml = accept.includes("text/html")
    const looksLikeAsset = /\.[^/]+$/.test(path)

    if (isGet && isHtml && !looksLikeAsset) {
      const idx = new URL('/index.html', url.origin)
      return fetch(new Request(idx.toString(), request))
    }
    return fetch(request)
  },
}
JS
}

resource "cloudflare_workers_route" "spa_route" {
  zone_id     = var.cloudflare_zone_id
  pattern     = "www.rayperez.com/*"
  script      = cloudflare_workers_script.spa_rewrite.script_name
}


