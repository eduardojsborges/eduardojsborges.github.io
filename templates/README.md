# Complete template and field reference

These templates cover **every field currently supported** by the content schema,
plus a separate example for homepage/profile settings. They do not introduce new
features: adding an arbitrary field to Markdown will not make the site display it.

**Use GitHub's Code view or pencil editor to copy a template.** In the rendered
Preview, YAML comments beginning with `#` may be hidden. Optional fields are
commented out to avoid publishing placeholder links or broken images. Remove
the leading `#` and supply your value to enable one. Leave unavailable fields
omitted rather than writing empty links.

| Template | Live destination |
| --- | --- |
| [publication.md](publication.md) | `src/content/publications/your-paper.md` |
| [project.md](project.md) | `src/content/projects/your-project.md` |
| [news.md](news.md) | `src/content/news/your-update.md` |
| [experience.md](experience.md) | `src/content/experience/your-position.md` |
| [award.md](award.md) | `src/content/awards/your-award.md` |
| [profile.ts](profile.ts) | Edit existing `src/data/profile.ts`; this is TypeScript, not Markdown |

## Publications — all 16 fields

| Field | Required / default | Effect |
| --- | --- | --- |
| `title` | Required text | Paper title and detail-page title. |
| `authors` | Required non-empty list of names | Authors in supplied order. Names containing Borges are emphasised in lists. |
| `date` | Required `YYYY-MM-DD` | Chronological order and publication year. |
| `venue` | Required text | Full venue on the detail page; fallback venue in lists. |
| `summary` | Required text | Short contribution in the full list and flagship. Hidden in compact homepage entries. |
| `venueShort` | Optional text | Short venue label in lists and detail-page metadata. |
| `featured` | Optional boolean; `false` | Eligible for the supporting homepage list, newest first. |
| `flagship` | Optional boolean; `false` | Prominent homepage entry. At most one; shown even if `featured` is false. |
| `paperUrl` | Optional URL | Read paper link. |
| `codeUrl` | Optional URL | Code link. |
| `citation` | Optional text | Plain-text citation in the citation viewer. Older BibTeX pasted into this field is detected automatically. |
| `bibtex` | Optional multiline text | BibTeX entry in the citation viewer; write it as a YAML literal block with `bibtex: |`. |
| `bibtexUrl` | Optional legacy field | A local `/files/paper.bib` is read at build time into the viewer. No download link is displayed; remote files are not fetched. Prefer `bibtex`. |
| `thumbnail` | Optional local image path | Image on the homepage **flagship only**. Not automatically shown in the full list or detail page. |
| `thumbnailAlt` | Optional text; supply with an informative thumbnail | Description for visitors who cannot see the figure. |
| `thumbnailCaption` | Optional text | Caption below the flagship image, including its source when appropriate. |

**Below the closing `---`:** write the full abstract. It appears in the detail
page and expandable full-list abstract. Use Markdown images for figures inside
the detail page. Both locations render Markdown formatting, images, explicit
links, and automatic clickable links for bare URLs.

### Plain-text and BibTeX citations

Every publication has a **Cite this paper** viewer on Home/Publications and on
its detail page. With JavaScript, choose **Plain text** or **BibTeX** and copy the
selected format. Without JavaScript, both formats remain visible and selectable.
BibTeX is shown as indented, monospaced text with a line per field; commas inside
nested braces or quoted values do not create spurious line breaks.

Supply either format or both:

```yaml
citation: >-
  E. Borges and A. Researcher, "Paper title," in Conference Name, 2026.
bibtex: |
  @inproceedings{borges2026paper,
    author = {Borges, Eduardo and Researcher, A.},
    title = {Paper title},
    booktitle = {Conference Name},
    year = {2026},
  }
```

`>-` joins wrapped prose lines into a paragraph; `|` preserves literal BibTeX
line breaks. Keep all entry lines indented under `bibtex: |`.

Existing BibTeX in `citation` continues working, including older quoted YAML
that folded its line breaks. For BibTeX, explicit `bibtex` takes precedence,
then BibTeX found in `citation`, then a legacy local `.bib` file. Otherwise a
minimal entry is generated from title, authors, venue, year, and the paper URL/DOI
when available; a note identifies this fallback. No unknown pages, publishers,
or other publication metadata are invented. Supplied plain text is preserved;
otherwise the viewer generates readable prose from the known metadata.

The old `.bib` files can remain for compatibility. They are no longer linked as
downloads. Adding a new citation does not require uploading a separate file.

With a flagship, two other featured papers appear below it; without one, three
featured papers appear. A flagship without a thumbnail still has a text presentation.

## Projects — all 10 fields

| Field | Required / default | Effect |
| --- | --- | --- |
| `title` | Required text | Linked project name and detail-page title. |
| `summary` | Required text | Description in homepage/listing previews and detail-page introduction. |
| `role` | Required text | Your role in previews and detail metadata. |
| `order` | Optional number; `0` | Lower numbers appear first. Use distinct numbers for an explicit order. |
| `featured` | Optional boolean; `false` | Up to three projects on the homepage, ordered by `order`. |
| `dates` | Optional text | Displayed as written, e.g. `2024 — 2026`; not a parsed date. |
| `projectUrl` | Optional URL | Project website link on the detail page. |
| `codeUrl` | Optional URL | Code link on the detail page. |
| `thumbnail` | Optional local image path | Preview image on Home and Projects; not automatically repeated in the detail page. |
| `thumbnailAlt` | Optional text; supply with an informative thumbnail | Description of the image. |

**Below `---`:** project description, contributions, links, figures, and results.
This body is rendered on the project detail page only. Projects do not currently
support a `thumbnailCaption` field; put captions in the Markdown body if needed.

## News — all 3 fields

| Field | Required / default | Effect |
| --- | --- | --- |
| `title` | Required text | Announcement on Home and in the news archive. |
| `date` | Required `YYYY-MM-DD` | Newest first; month/year displayed. |
| `link` | Optional URL or local page path | Makes the announcement title a link. |

**Below `---`:** extra detail in the news archive only. The five newest titles
appear on Home; all entries appear in the archive. There are no individual news pages.

## Experience — all 4 fields

| Field | Required / default | Effect |
| --- | --- | --- |
| `title` | Required text | Position or degree. |
| `institution` | Required text | Organisation or institution. |
| `period` | Required text | Displayed as written, e.g. `2026 — present`. |
| `order` | Required number | Lower numbers appear first. |

**Below `---`:** description displayed on the homepage timeline. There is no
separate experience detail page or automatically generated CV.

## Awards — all 3 fields

| Field | Required / default | Effect |
| --- | --- | --- |
| `title` | Required text | Award or funding name. |
| `year` | Required number | Display year; newest first. |
| `description` | Required text | Short explanation. |

Awards appear on the homepage. Markdown body text is currently **not displayed**.

## Homepage and profile — all settings

Edit the existing [profile configuration](../src/data/profile.ts), using
[profile.ts](profile.ts) as a complete annotated example.

| Setting | Effect |
| --- | --- |
| `name` | Identity, document title suffix, and copyright. |
| `role` | Sidebar position and homepage affiliation line. |
| `field` | Short research-field line below the name. |
| `institution` | Sidebar institute name. |
| `university` | Sidebar and homepage affiliation line. |
| `institutionUrl` | Institute hyperlink. |
| `location` | Sidebar location. |
| `email` | Contact/email links throughout the site. |
| `portrait` | Local portrait path. |
| `cv` | Local CV PDF path. Updating content does not regenerate the PDF. |
| `headline` | Homepage main heading. |
| `intro` | Homepage introduction and default page description. |
| `interests` | Array of `{ title, description }` objects for Research interests. |
| `skills` | Array of tool/method names. |
| `socials` | Array of `{ label, short, url }` objects. `label` is the full/accessible name; `short` is the desktop sidebar text. Keep Scholar first because the Publications page currently reads `socials[0].url`. |

Section order, section titles, button labels, and the contact sentence are in
[the homepage layout](../src/pages/index.astro). Colours, spacing, and typography
are in [the stylesheet](../src/styles/global.css). Those are layout/code edits,
not Markdown options. Navigation is in [the shared layout](../src/layouts/Layout.astro).

## Markdown, files, and paths

- Upload images to `public/images/` and PDFs/BibTeX to `public/files/`.
- Use local metadata paths such as `/images/figure.webp` or `/files/paper.bib`.
- Link fields accept full `http://`/`https://` URLs or site-local paths beginning
  with `/`. Image/profile asset fields should use local paths. Never include the
  `/research-portfolio/` prefix yourself.
- In Markdown bodies: `![Description](/images/figure.webp)` and
  `[Download slides](/files/slides.pdf)`. Headings, lists, emphasis, and links can
  be used where a body is rendered. There is no dedicated `slidesUrl`, `videoUrl`,
  `doi`, `tags`, `draft`, or language field; use body links/text where appropriate.
- Publication/project filenames become their detail-page addresses. Keep names
  stable after publishing. Templates outside `src/content/` are never published as entries.
