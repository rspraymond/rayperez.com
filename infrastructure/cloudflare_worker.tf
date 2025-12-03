resource "cloudflare_workers_script" "spa_rewrite" {
  account_id = var.cloudflare_account_id
  script_name = "spa-rewrite"
  content = <<JS
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname
    const isGet = request.method === "GET"
    
    // Intercept ALL PDF requests before they reach S3
    // This prevents S3 routing rules from redirecting PDF 404s to SPA routing
    if (isGet && path.endsWith('.pdf')) {
      // Handle resume PDF redirects
      const resumePattern = /^\/raymond-perez-software-engineer-resume(-.*)?\.pdf$/
      if (resumePattern.test(path)) {
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
          // If manifest fetch fails, log error and return 404
          // Don't let PDF requests pass through to S3
          console.error('Failed to fetch resume manifest:', error)
        }
      }
      
      // For all PDFs (resume or other), if we reach here, return 404
      // This ensures PDF 404s are handled by the Worker, not S3 routing rules
      return new Response('Not Found', { status: 404 })
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


