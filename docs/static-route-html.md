# Static route HTML for crawlers

This site is a Vite SPA. Search engines and AI crawlers still need a real HTML document at each canonical URL before JavaScript runs. The build writes one extensionless HTML file per route with the title, description, canonical link, Open Graph tags, JSON-LD, and a short body in `#root`.

## What each page contains

| Piece           | Articles and case studies                                        | Home and About                         |
| --------------- | ---------------------------------------------------------------- | -------------------------------------- |
| Head tags       | Title, description, canonical, Open Graph, Twitter               | Same                                   |
| JSON-LD         | `BlogPosting` with author `@id`, `datePublished`, `dateModified` | `Person` (home), `ProfilePage` (about) |
| Body in `#root` | `h1`, byline linking to `/about`, dates, lead paragraph, outline | `h1`, lead paragraph, outline          |

The body is bounded on purpose. It carries the authorship and freshness signals, not a second copy of the article. React replaces `#root` on load, so there is no hydration mismatch.

## How the build works

```text
vite build → dist/index.html + assets
closeBundle → generate-route-html.ts → dist/why-typescript, dist/about, dist/case-studies/prejump, ...
            → rewrites dist/index.html for /
```

| Step             | File                                     | Role                                                     |
| ---------------- | ---------------------------------------- | -------------------------------------------------------- |
| Route inventory  | `src/constants/routes.ts`                | `canonicalRoutes` drives the sitemap, HTML, and S3 keys  |
| Per route inputs | `src/build/utils/routeDescriptions.ts`   | Parses each content JSON once and builds `RouteHtmlMeta` |
| Rendering        | `src/build/utils/routeHtml.ts`           | Pure functions that return the final HTML string         |
| Schema           | `src/constants/schema.ts`                | `buildBlogPostingSchema` is shared with `BlogPost.tsx`   |
| Orchestration    | `scripts/generate-route-html.ts`         | Reads `dist/index.html` once, writes one file per route  |
| Sitemap          | `src/build/utils/sitemap.ts`             | `lastmod` is `updated ?? date`                           |
| Content type     | `scripts/set-route-html-content-type.ts` | Sets `text/html` on extensionless S3 objects after sync  |

Home copy in `src/constants/seoCopy.ts` mirrors the default head in `index.html`. `scripts/meta-build-parity.test.ts` fails if they drift.

## Dates

`date` in `src/constants/posts.ts` or `src/constants/caseStudies.ts` is the publish date. Set the optional `updated` field only after a substantive content revision, not for styling or formatting commits. Article page wrappers pass the same dates to `JsonBlogPost`.

## Deploy

CI builds `dist`, syncs it to S3, then runs `scripts/set-route-html-content-type.ts` so crawlers get `text/html` for extensionless keys. Existing S3 routing rules only fire on 404 or 403, so a route that has an object returns `200` and is not redirected to a hashbang URL.

## If you are changing

| You are                  | Do                                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------- |
| Adding an article        | Add it to `posts.ts` with `contentFile`; the next build generates its HTML         |
| Adding a case study      | Add it to `caseStudies.ts` with `contentFile`                                      |
| Adding a standalone page | Add the path to `routes.ts`, a meta builder in `routeDescriptions.ts`, and a route |
| Changing the home head   | Update `index.html` and `seoCopy.ts` together                                      |
| Revising an article      | Set `updated` in `posts.ts` and in the article wrapper                             |
