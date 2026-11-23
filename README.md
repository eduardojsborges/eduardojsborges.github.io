# Eduardo Borges · Research portfolio

A custom Astro website for robotics and computer vision research. Markdown content, light/dark themes, readable typography, and accessible navigation. The existing root website is not changed by this repository.

## Add content on GitHub — no local tools needed

See the [complete template and field reference](templates/README.md) for every supported option, its default, and where it appears. Use **Code** view or the pencil editor to see commented optional fields; GitHub's rendered Preview may hide them.

1. Open a matching example in `templates/` and copy its entire contents.
2. Go to `src/content/publications/`, `projects/`, `news/`, `experience/`, or `awards/`.
3. Choose **Add file → Create new file**. Give it a short, unique lowercase filename, such as `my-new-paper.md`. The filename becomes the publication/project page URL; keep it stable after publishing.
4. Paste the template and replace the example text. Keep the opening/closing `---` lines. Optional fields begin with `#`; remove that prefix only when supplying a value.
5. Choose **Commit changes**. A commit to `main` triggers validation and deployment. For review, create a branch and pull request instead.
6. Check the **Actions** tab. A green run means the new version deployed. A failed build preserves the previous live version: open the failed run, find the named file/field, correct it, and commit again.

### Publications

Required: `title`, `authors` (a list), `date` (`YYYY-MM-DD`), `venue`, and `summary`. Optional: `venueShort`, `featured`, `flagship`, `paperUrl`, `codeUrl`, `citation`, `bibtex`, `bibtexUrl` (legacy local-file import), `thumbnail`, `thumbnailAlt`, `thumbnailCaption`. Unavailable links should be omitted, not set to an empty string. Put the full abstract below the closing `---`; Markdown and bare URL links work in both the expandable list abstract and detail page.

Each paper offers **Plain text** and **BibTeX** citation formats with copy buttons. Use `citation: >-` for prose and `bibtex: |` for a multiline BibTeX entry; see the [citation example](templates/README.md#plain-text-and-bibtex-citations). Existing BibTeX in `citation` and local `.bib` files still work. Missing formats are generated from known metadata, and generated BibTeX is identified. There are no BibTeX download links in the interface.

Set `featured: true` to include a paper on the homepage. Set `flagship: true` on at most one paper to give it the prominent research-figure presentation; the build rejects multiple flagships. With a flagship, the two newest other featured papers appear below it in a compact list; without one, the three newest featured papers are listed. Every paper appears in the year-grouped full listing and gets a detail page automatically. Entries are ordered by date, not filename. Do not add a second copy for the homepage. Optional `thumbnailCaption` records the figure's description and source. Use descriptive `thumbnailAlt` text.

### Projects, news, experience, and awards

Projects use `order` (lower first) and `featured` (up to three on the homepage). Dates are optional so undated existing collaborations need no invented dates. News uses a full date, with the five newest entries on the homepage and all entries in the archive. Experience uses `order`; awards are sorted newest year first.

### Upload images, PDFs, or BibTeX

Use **Add file → Upload files** in `public/images/` or `public/files/`. Prefer lowercase filenames without spaces and optimised WebP/JPEG images, ideally below 300 KB for thumbnails.

- Frontmatter image path: `thumbnail: "/images/my-figure.webp"`. File links inside Markdown bodies are also automatically prefixed for GitHub Pages. For citations, use inline `bibtex: |` rather than uploading a new `.bib` file.
- In any Markdown body: `![Description](/images/my-figure.webp)` and `[Download](/files/my-file.pdf)`. The build prefixes local paths automatically.
- External links use their complete `https://` address. Do not hardcode `/research-portfolio/` in content.

### Edit the profile or CV

Edit `src/data/profile.ts` to change your biography, role, affiliations, research interests, tools, email, or social links. This is the single central profile file. Keep the surrounding quotes and commas intact. To update the CV without changing links, replace `public/files/Eduardo_Borges_CV.pdf` with a file of the same name.

### Change colours

Edit **[src/styles/theme.css](src/styles/theme.css)**. All interface colour hex codes are together at the top, with separate Light mode and Dark mode palettes. Change a value, commit, and the site rebuilds automatically. No layout-code changes are needed.

For example, `--dark-background` changes the main dark page surface, `--dark-sidebar` the sidebar, `--dark-panel` citation panels, and `--dark-accent` links/focus/active navigation. `--dark-accent-soft` is the matching selected/hover background. The `--light-*` settings control light mode independently. Comments explain the text, borders, controls, figure backing, and shadow settings. Keep accent/text colours readable against their backgrounds.

Each new tab session starts in dark mode, independently of the operating system and any old saved preference. The theme toggle remembers your choice through navigation and refreshes within that tab using `sessionStorage`. If browser storage is unavailable, each page starts dark. Original images and the favicon remain their own assets. Desktop portrait width is 75% of the sidebar width; mobile uses the compact header portrait. Sizing rules remain in `src/styles/global.css`.

The soft cursor spotlight automatically matches the highlight colour (`--dark-accent` / `--light-accent`), so changing that hex code updates the glow too. Adjust `--dark-glow-opacity` / `--light-glow-opacity` (0–1, initially `.18` / `.10`) for visibility, and `--glow-size` for diameter (initially `220px`, giving a `110px` radius). Set both opacity values to `0` to hide it. It follows mouse movement behind content with gentle inertia (55ms time constant), spans the full viewport including wide-screen margins, stops animating once settled, and fades away on pointer exit or window blur. Touch input, reduced-motion preferences, and printing disable the effect automatically.

Content entries (publications, projects, research interests, news, experience, and awards) receive a subtle accent-coloured background and border on mouse hover or when a link/control inside has keyboard focus. Adjust `--panel-highlight-strength` and `--panel-highlight-border-strength` in `src/styles/theme.css` to change the intensity. The effect does not move content, add click targets, or change the cursor; touch devices have no hover effect, reduced motion removes transitions, and printing omits the highlight.

### Restore an earlier version

For a published mistake, revert the content commit through GitHub (or `git revert <commit>` locally). The resulting commit rebuilds and republishes the previous content. Do not delete the repository or rewrite history.

## Local development

Install Node.js 22.12+ and pnpm 10.23.0, then:

```sh
pnpm install
pnpm dev
```

Open the printed URL, including `/research-portfolio/`. For production checks:

```sh
pnpm check
pnpm build
pnpm test
pnpm preview
```

`pnpm build` verifies every built internal link and asset. `pnpm test` temporarily adds a sample paper, checks automatic list/detail/featured placement, verifies invalid metadata fails, removes the sample, and rebuilds cleanly. It must run with an otherwise stable content folder.

## Deployment

The intended public repository is `eduardojsborges/research-portfolio`. In **Settings → Pages**, choose **GitHub Actions** as the source. The included workflow checks pull requests and deploys successful `main` builds to `https://eduardojsborges.github.io/research-portfolio/`.

The Astro `site` and `base` settings are in `astro.config.mjs`; the internal-link checker uses the same repository prefix. Change both if renaming the repository. Moving to the main root address is a separate migration.

## Provenance and maintenance

Original layout and interaction code; no third-party portfolio template. Existing personal content, portrait, presentation figures, CV, and bibliography are migrated from `eduardojsborges/eduardojsborges.github.io` at commit `8473dcbe980595e5f0377e06de9d853c607847e9`. The original template's placeholder CV, sample publications, and stock assets are excluded. The CSCS citation now uses `paper_cscs_2025.bib`.

See `ATTRIBUTION.md` for dependencies and asset licences. No analytics, tracking, remote fonts, CMS, or form backend is included. Review dependency updates through pull requests and run the checks before merging.
