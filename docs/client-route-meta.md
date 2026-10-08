# Client route meta (SPA navigation)

The first HTML response for each URL is correct (see [static-route-html.md](static-route-html.md)). After that, React Router changes the page without a full reload. Head tags must update in place or the tab title and the first `description` / Open Graph nodes can stay on the previous route.

## How it fits together

```text
First visit     → prerendered HTML in dist/ (build pipeline)
Client navigate → SocialMeta mutates document.head (no second Helmet meta set)
```

| Layer              | Responsibility                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| Build              | `scripts/generate-route-html.ts`, `src/build/utils/meta.ts`                                         |
| Runtime writer     | `SocialMeta.tsx` → `socialMetaDocumentHead.ts` (props in `src/types/socialMeta.ts`)                 |
| Callers            | `Home.tsx`, `BlogPost.tsx` / `JsonBlogPost`, `NotFound.tsx`                                         |
| JSON-LD only       | `AuthorBio`, page-level `Helmet` script blocks (no share tags in bio)                               |
| Canonical pathname | `WithCanonical.tsx` (Helmet link); `SocialMeta` also sets `link[rel=canonical]` from the `url` prop |

`SocialMeta` updates the first matching `title`, `meta[name=description]`, `og:*`, `twitter:*`, and canonical link, then removes duplicate siblings left from prerender or older Helmet usage.

## If you are changing…

| You are…                      | Do…                                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| Adding a new page route       | Pass `title`, `description`, `url` (clean canonical), and `type` to `<SocialMeta />` on that page   |
| Adding article meta copy      | Use `leadArticleText` / `seoCopy.ts`; pass `metaDescription` into `BlogPost`, not reading time      |
| Adding author or sidebar UI   | Do not mount `SocialMeta` in lazy children; article pages already set share tags in `BlogPost`      |
| Changing defaults             | `src/constants/social.ts`, `src/constants/shareImage.ts`                                            |
| Changing build-time HTML only | Follow [static-route-html.md](static-route-html.md); do not duplicate meta logic in page components |

## Contracts (do not break)

- One client pipeline for Open Graph and Twitter tags: `SocialMeta` only.
- Callers pass strings; `SocialMeta` does not load article JSON on navigation.
- `url` must be the canonical URL (`SITE_URL` + pathname), not `window.location` with query or hash.
- Keep `data-ssg-meta` on `SocialMeta` so the route HTML generator can read the same payload at build time.

## Tests and manual check

| Check                               | Where                                                         |
| ----------------------------------- | ------------------------------------------------------------- |
| In-place updates, no duplicate meta | `src/components/SocialMeta.test.tsx`                          |
| Author bio does not write og tags   | `src/components/AuthorBio.test.tsx`                           |
| Page integration                    | `src/pages/Home.test.tsx`, `src/components/BlogPost.test.tsx` |

```bash
npm test -- src/components/SocialMeta.test.tsx src/components/AuthorBio.test.tsx
npm run dev
```

In the browser: home → article → another article → home. After each navigation, `document.title` and `meta[name=description]` should match the visible page; `og:url` should stay on the article path after the author bio loads.
