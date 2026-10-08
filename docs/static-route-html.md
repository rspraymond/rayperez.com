# Static route HTML for crawlers

This site is a Vite SPA. Search engines still need a real HTML document at each canonical URL before JavaScript runs. The build emits one extensionless HTML file per route with title, description, canonical, Open Graph tags, and a short lead paragraph in `#root`.

## How the build works

```text
Vite build → dist/index.html + assets
closeBundle → generate-route-html.ts → dist/why-nestjs, dist/case-studies/prejump, …
            → updates dist/index.html meta for /
```

| Step              | Script or file                                 | Role                                                      |
| ----------------- | ---------------------------------------------- | --------------------------------------------------------- |
| Meta HTML         | `src/build/utils/meta.ts`                      | `buildMetaTags` for the static shell (includes canonical) |
| Copy and titles   | `src/build/utils/routeDescriptions.ts`         | Same descriptions as RSS and article pages                |
| Lead text         | `src/utils/articleText.ts` → `leadArticleText` | First prose paragraph only (skips takeaways and headings) |
| Locked query copy | `src/constants/seoCopy.ts`                     | NestJS and opinionated meta descriptions                  |
| Orchestration     | `scripts/generate-route-html.ts`               | Reads `dist/index.html`, writes route keys                |
| Hook              | `vite.config.ts` `closeBundle`                 | Runs after RSS, sitemap, resume manifest                  |
| S3 keys           | `src/build/utils/extensionlessRouteKeys.ts`    | Same paths as `canonicalRoutes` for deploy content-type   |

Article JSON paths live on `contentFile` in `src/constants/posts.ts` and `src/constants/caseStudies.ts`.

## Client head tags after load

| Concern                | Where                                                                      |
| ---------------------- | -------------------------------------------------------------------------- |
| Open Graph and Twitter | `src/components/SocialMeta.tsx` only (see CONTRIBUTING SEO)                |
| Article title pattern  | `src/components/BlogPost.tsx` → heading, name, role                        |
| Stable description     | `JsonBlogPost` passes `metaDescription`; reading time does not update meta |
| Canonical URL          | `src/components/WithCanonical.tsx` → `SITE_URL` + pathname                 |
| Share image            | `src/constants/shareImage.ts` (hashed JPEG from Vite import)               |

Do not add a second meta pipeline or hand written tags in page components.

## Deploy and infrastructure

Deploy order matters: route objects must exist and return `200` before S3 stops rewriting 404s to hashbang URLs.

| Order | Action                                                                                                                  |
| ----- | ----------------------------------------------------------------------------------------------------------------------- |
| 1     | Tag release → CI builds `dist` and syncs to S3                                                                          |
| 2     | CI runs `scripts/set-route-html-content-type.ts` (keys from `canonicalRoutes`) so extensionless objects are `text/html` |
| 3     | `terraform apply` in `infrastructure/` (error document `404.html`, hashbang rules removed)                              |
| 4     | Cloudflare: exact trailing slash `301` to slash free paths (not in Terraform; see comment in `main.tf`)                 |
| 5     | `curl` checks per release notes; then sitemap resubmit and URL inspection in Search Console                             |

Static missing URL page: `public/404.html` (no app bundle, `noindex`). In app 404 remains `src/pages/NotFound.tsx`.

S3 cannot rewrite extensionless URLs without a redirect. See [docs/s3-extensionless-url-rewrite-impossible.md](s3-extensionless-url-rewrite-impossible.md).

Full release steps: [docs/RELEASE_PROCESS.md](RELEASE_PROCESS.md).

## If you are changing…

| You are…                                | Do…                                                                                                                           |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Adding an article                       | Add the post to `posts.ts` with `contentFile` and path; `canonicalRoutes` drives S3 content-type and route HTML automatically |
| Changing NestJS or opinionated snippets | Edit `src/constants/seoCopy.ts` and the opinionated JSON opening if the visible lead must match                               |
| Changing homepage title or description  | Align `index.html`, `src/constants/seoCopy.ts`, and `src/pages/Home.tsx`                                                      |
| Verifying output                        | `npm run build`, inspect `dist/why-nestjs` and `dist/feed.xml`                                                                |
| Testing behavior                        | `scripts/build-route-html-shell.test.ts`, `scripts/generate-route-html.test.ts`, `src/utils/articleText.test.ts`              |

## Commands

```bash
npm run build    # produces dist route HTML and feed/sitemap
npm run test     # includes route HTML and article meta tests
```
