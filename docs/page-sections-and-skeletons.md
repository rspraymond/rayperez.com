# Page sections and route skeletons

How content sections on Home and About are built, and how those routes stay fast and steady while their code loads.

## The pieces

| File                               | Role                                                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/styles/sectionStyles.ts`      | Single source for page spacing, the type scale, and the text link look                                            |
| `src/components/SectionCard.tsx`   | A plain `section` with a top rule and a small uppercase `h2`, named for assistive technology by `aria-labelledby` |
| `src/components/ItemHeader.tsx`    | Title, detail, and dates row shared by Experience and Education                                                   |
| `src/components/Intro.tsx`         | Home page name, photo, and introduction, rendered outside `Suspense`                                              |
| `src/components/RouteSkeleton.tsx` | Placeholders for Home and About, built from the same styles as the real sections                                  |

## Type scale

All sizes live in `sectionStyles.ts`. Change them there, never inline, so the skeletons keep matching.

| Role          | Export             | Element                                    |
| ------------- | ------------------ | ------------------------------------------ |
| Name          | `NAME_SX`          | `h1` in Intro                              |
| Introduction  | `TAGLINE_SX`       | `p` in Intro                               |
| Section label | `SECTION_LABEL_SX` | `h2` in SectionCard                        |
| Item title    | `ITEM_TITLE_SX`    | `h3` for a project, company, or school     |
| Role, degree  | `META_SX`          | text beside the item title                 |
| Dates         | `DATES_SX`         | never wraps, uses tabular numbers          |
| Body          | `BODY_SX`          | descriptions, bullets, the Skills sentence |

## Rules for a section

- Wrap it in `SectionCard`. Do not add cards, chips, shadows, or hover lifts.
- One `h1` per page. Section labels are `h2`, items are `h3`.
- Text links use `TEXT_LINK_PROPS`. It applies `primary.dark`, which passes AA contrast on the light background where `primary.main` does not, and always underlines.
- When the same link text repeats, such as "Visit site", give each link an `aria-label` that starts with the visible text and names the item.
- Use theme palette tokens only. No hardcoded colors.
- Add no transitions or animations, so the sections need no reduced motion handling.

## Loading a route

The default fallback, `LoadingFallback`, covers the page with a spinner. That hides the prerendered heading and delays the largest paint until the route chunk arrives. Home and About avoid it.

| If the route content is…                          | Do this                                                          | Example                                 |
| ------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------- |
| Known at build time and small                     | Render it outside `Suspense` so it paints with the entry chunk   | `Intro` on `/` in `AppContent.tsx`      |
| Loaded with the route chunk, with a stable layout | Use a matching skeleton from `RouteSkeleton.tsx` as the fallback | `HomeSectionsSkeleton`, `AboutSkeleton` |
| Anything else                                     | Use `LoadingFallback`                                            | articles, case studies, Not Found       |

### Building a skeleton

- Compose it from `SectionSkeleton` and the exports in `sectionStyles.ts`. A text `Skeleton` takes its height from the font size and line height it is given, so each bar fills exactly one line of the real text.
- Match line counts that change by breakpoint. For example, the About heading has three bars on phones and one from `sm` up.
- Set `minHeight: '100vh'` so the footer cannot move into view before the content arrives.
- Put `aria-busy='true'` on the wrapper, and keep `animation={false}` on the bars.
- Never put real copy in a skeleton that also lives elsewhere.

## Checking your change

| Check             | How                                                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Behavior          | `npm run test`. Query by role and accessible name, as in `AppContent.routes.test.tsx`, which proves the Home heading renders before the Home chunk loads                                     |
| Crawler HTML      | `routeDescriptions.test.ts` covers the home lead and the About outline                                                                                                                       |
| Skeleton fidelity | On `npm run preview`, block the route chunk in the browser's network tools and compare against the loaded page at 390px and 1440px. The Intro and the first section's top edge must not move |
| Speed             | Run Lighthouse on the build before and after your change. LCP and CLS must not get worse                                                                                                     |

Styling is checked in the browser, not in unit tests, because jsdom does not compute responsive MUI styles.
