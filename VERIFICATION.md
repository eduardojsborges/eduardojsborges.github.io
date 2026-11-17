# Release verification

Validated on 17 November 2026.

## Automated checks

- Astro checks: zero errors, warnings, or hints.
- Production build: 11 static pages.
- Internal-link checker: all generated local navigation and asset references remain under the GitHub Pages base path and exist in the build output.
- Content workflow: a temporary featured publication creates its detail page, full-list entry, and homepage highlight from one Markdown file.
- Invalid metadata: missing required fields fails the build and identifies the offending file. Temporary content is removed and the clean site rebuilt after testing.
- First GitHub Actions build and Pages deployment completed successfully.

## Browser checks on the published site

- Light and dark homepage appearance.
- Manual theme choice persists after reload and navigation.
- Desktop, 820 px tablet, and 390 px mobile layouts; no horizontal overflow in checked home and publication views.
- Mobile navigation opens and follows the Publications link.
- Publication abstract/citation disclosures expand.
- Projects listing links to the GreenAuto detail page.
- Publication detail page renders its abstract, citation, and research image reference.

## Accessibility implementation and limits

Core content, links, mobile menu, and abstract disclosures are server-rendered HTML; disclosure controls are native `details` elements. Focus states and a skip link are provided. Reduced-motion CSS removes movement, smooth scrolling, and the spotlight; the pointer handler also respects that preference.

JavaScript-disabled and reduced-motion browser emulation were not available in the preview browser. These behaviours were reviewed in the static output and source, rather than verified in an emulated browser. This is not a complete accessibility audit or a performance benchmark.

External publisher and institution websites may have their own access restrictions. Existing resource URLs were retained where supplied; the incorrect CSCS BibTeX reference was replaced with the matching local bibliography file.
