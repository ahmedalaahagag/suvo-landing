# Suvo Landing — Agent Instructions

Static marketing and policy site for getsuvo.com. Plain HTML/CSS, no framework, no build step, no package manager. Deployed by GitHub Pages from the default branch.

## Layout

- `index.html`, `about.html`, `privacy.html`, `impressum.html`, `affiliates.html`, `delete-account.html`, `404.html` — pages
- `de/` — German mirror of localized pages · `i18n.js` — language switcher
- `picks/` — editorial product picks · `sources/` — public source library for supplement rules
- `assets/`, `img/` — brand and screenshots · `style.css` — shared stylesheet
- `robots.txt`, `sitemap.xml`, `llms.txt`, `CNAME` — SEO / Pages config

## Commands

```bash
python3 -m http.server 4000   # any static server; no compile step
```

No lint or test suite.

## Constraints

- Keep `de/` pages in sync with English counterparts when editing shared content.
- Indexable pages need canonical URL, unique meta description, OG/Twitter cards; homepage, sources, and picks carry JSON-LD.
- Update `sitemap.xml` when adding or removing indexable pages.
- Do not touch `CNAME`.
- Deploy = merge to default branch; after SEO changes verify `robots.txt`, `sitemap.xml`, `llms.txt` on getsuvo.com.
