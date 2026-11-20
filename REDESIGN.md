# Research portfolio UX refinement

Implemented 20 November 2026 from the supplied UX redesign brief. This refines the existing Astro site; its static architecture, routes, Markdown collections, portrait, Manrope font, light/dark themes, and green accent are preserved. No dependencies were added.

## Before and after

| Area | Before | Implemented |
| --- | --- | --- |
| Navigation | Numbered About/Publications/Projects/Experience with mixed page/anchor destinations | Home/Publications/Projects with matching active states, plus a separate CV action. Experience stays on the homepage. News/404 do not falsely highlight Home. |
| Typography | Important metadata, links, and mobile labels as small as 7–12 px | 16 px body, 16–17 px summaries, 18–24 px research titles, 14–15 px navigation/resource links, and 13–14 px secondary metadata. Mobile overrides preserve these sizes. |
| Hero | General autonomy slogan and decorative labels | Specific camera/LiDAR perception description and a direct “View publications” action. Role/affiliation come from the central profile file. |
| Research | Three equally weighted text entries below research interests | First-author ICINCO work leads with the paper's actual detection-pipeline figure, descriptive alt text, source caption, and full-size link. Other selected papers form a compact supporting list. |
| Projects | Repeated project indices, arrows, and “Explore project” links | Linked project names, known roles, and concise descriptions. Heading levels adapt to homepage/listing context. Text-only layouts remain where no verified image exists. |
| Mobile | Crowded social row, “Explore” trigger, small controls | Native Menu disclosure with navigation, CV, email, social links, and theme control. Controls have 44 px minimum targets. Escape restores focus to Menu; link selection and outside click close it. |
| Short windows | Sidebar minimum height could hide essential links | Sticky sidebar fits the viewport and scrolls independently; keyboard focus scrolls offscreen links into view. |
| Decoration | Spotlight, repeated uppercase microheadings, indices, slogan, and arrows | Spotlight and pointer handler removed. Direct section names, quieter separators, native disclosures, and restrained colour/hover feedback remain. |

## Important decisions and content provenance

- `flagship: true` is an optional publication field. One flagship is shown prominently, followed by the two newest other `featured` entries. The build rejects multiple flagships. Without a flagship, up to three featured entries remain. The README and publication template explain this workflow.
- The authentic illustration is the embedded Figure 2(a) from the [published ICINCO paper](https://www.scitepress.org/Papers/2024/130732/130732.pdf), PDF page 7. It was extracted, resized proportionally, and encoded as a 240 KB WebP. No scientific labels or results were changed. See `ATTRIBUTION.md`.
- The original XPro project URL returned 404. It now links to the verified [official ISR project page](https://www.isr.uc.pt/projects/xpro), which supports the updated project-level description. No new personal contribution or outcome is claimed.
- Manrope, existing palette character, CV, and bibliography remain. Project lists intentionally have no replacement stock imagery, invented metrics, badges, or animations.

## Files changed

- `src/layouts/Layout.astro`, `src/styles/global.css`: navigation, sidebar/mobile behaviour, shared typography, focus/contrast tokens, and removal of pointer effects.
- `src/pages/index.astro`, listing/detail pages under `src/pages/publications/` and `src/pages/projects/`, `src/pages/news/index.astro`, `src/pages/404.astro`: research-first hierarchy, precise copy, consistent links, heading order, and active-state correctness.
- `src/components/Publication.astro`, `src/components/Project.astro`: prominent/supporting research presentations, meaningful metadata, and simpler project links.
- `src/data/profile.ts`, `src/content.config.ts`, the ICINCO publication and XPro project Markdown: canonical hero copy, optional flagship/caption fields, sourced figure metadata, and corrected project link.
- `public/images/multimodal-detection.webp`, `ATTRIBUTION.md`: original scientific figure and provenance.
- `templates/publication.md`, `README.md`: content-editing instructions.
- `scripts/test-content.mjs`, `scripts/audit-dom.js`, `VERIFICATION.md`, this report: regression checks and validation evidence.

## Validation performed

Commands were run using the bundled pnpm executable, with `ASTRO_TELEMETRY_DISABLED=1`:

```sh
pnpm check
pnpm build
pnpm test
pnpm preview
git diff --check
```

- Astro check: zero errors, warnings, or hints.
- Production build: 11 pages; 175 local link/asset references validated under `/research-portfolio/`.
- Content tests: Markdown creates list/detail/homepage entries; the real figure uses the correct base path; duplicate flagships and missing required metadata fail builds. Test entries are removed and the clean site rebuilt.
- Preview: HTTP 200 for homepage, publications/projects, nested pages, CV PDF, and scientific image.
- Browser: ChatGPT's Chromium-based in-app browser, with 1440×1000, 1366×600, 820×1000, 390×844, and 320×900 viewport checks. A 720×500 viewport additionally checked reflow equivalent to a 1440×1000 window at 200% zoom. No horizontal overflow was found in the checked views.
- Read-only automated DOM audit (`scripts/audit-dom.js`): sampled visible leaf text contrast, 13 px minimum secondary text, heading progression, single h1, accessible control names, 44 px control targets, active navigation, canonical URLs, image loading/alt text, and horizontal overflow. No failures remained in the checked views. Lowest sampled text contrast: 5.35:1 light, 6.44:1 dark; control borders against page backgrounds: 3.47:1 light, 4.96:1 dark. This is a targeted audit, not a complete WCAG assessment or an axe/Lighthouse result.
- Keyboard: Tab focuses the visible skip link; Enter moves focus to main. Menu opens with Enter/Space, Escape closes it and restores trigger focus; navigation works after reopening. Abstract disclosures open with Enter. At 1366×600, keyboard focus brought a sidebar social link into view by scrolling the sidebar.
- Content flows: the first-author paper detail page is one click from the homepage; the paper and CV destinations are direct links. Publications, Projects, and nested XPro/ICINCO pages retain correct routes/canonical URLs. Theme choice persists after reload/navigation.
- External HTTP checks: ISR, Scholar, ORCID, GitHub, SciTePress, GreenAuto, and corrected XPro returned 200. LinkedIn rejects automated requests (405 HEAD / 999 GET); IEEE returned 418. Their existing valid-looking destinations are retained, and normal interactive access remains unverified.
- Quick metadata audit: page titles, descriptions, canonical URLs, and Open Graph metadata remain; `og:url` was added. No sitemap was introduced in this scoped UI change.

Browser screenshots and detailed JSON audit evidence are stored locally in `C:/Users/pc_la/Documents/Codex/portfolio-redesign-qa/` rather than shipped as website assets.

## Remaining owner inputs and verification limits

- Original figures or result illustrations for DepthTriFusion, GreenAuto, and XPro would strengthen those entries. None were fabricated or replaced with generic imagery.
- GreenAuto and XPro would benefit from owner-supplied personal contribution details and concrete artifacts/results. Existing roles are preserved without guessing responsibilities, dates, or outcomes.
- No unfamiliar-person five-second or phone usability study was conducted. The agent verified the navigation flows; an independent participant should still perform the brief's usability tasks.
- The browser did not apply native zoom shortcuts. Equivalent narrow-viewport reflow was tested; actual 200% browser zoom remains a manual follow-up.
- JavaScript-disabled and reduced-motion browser emulation were unavailable. Server-rendered content/native disclosures and the reduced-motion CSS were reviewed in source. No full screen-reader audit or Lighthouse/axe run is claimed.

## Deviations

The existing conference photograph was not used as a scientific figure: a genuine diagram was recovered from the paper instead. A targeted read-only DOM audit was used in place of injecting axe into the restricted preview browser. The only factual copy expansion is the supported XPro project-level description; missing personal outcomes remain owner inputs. The GitHub Pages base path and existing content-editing workflow are unchanged.
