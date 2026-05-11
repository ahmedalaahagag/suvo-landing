# Suvo Landing

Static marketing and policy site for [getsuvo.com](https://getsuvo.com/).

Suvo is a supplement tracking app for cataloging a user's stack, reviewing supplement interaction and timing conflicts, and building a clearer supplement schedule.

## Overview

This repository is intentionally simple:

- Plain HTML, CSS, and static assets.
- No framework.
- No build step.
- No package manager required.
- Deployed by GitHub Pages from the default branch.

## Project Structure

```text
index.html                    Home page
privacy.html                  Privacy policy
about.html                    About, contact, and source-review policy
delete-account.html           Account deletion instructions
affiliates.html               Affiliate disclosure
404.html                      Custom not-found page
picks/                        Editorial product-pick pages
sources/                      Public source library for supplement rules
assets/                       Favicons, brand mark, social image
img/                          Product/app screenshots
style.css                     Shared stylesheet
robots.txt                    Search crawler rules
sitemap.xml                   XML sitemap
llms.txt                      AI/search-agent site summary
CNAME                         GitHub Pages custom domain
```

## Run Locally

From the repository root:

```bash
python3 -m http.server 4000
```

Then open:

```text
http://localhost:4000
```

Any static file server works. There is no compile step.

## Deployment

The site is served by GitHub Pages for `getsuvo.com`.

To deploy, merge changes into the default branch. GitHub Pages should publish the updated static files shortly after the merge.

After SEO-related changes, check:

- `https://getsuvo.com/robots.txt`
- `https://getsuvo.com/sitemap.xml`
- `https://getsuvo.com/llms.txt`
- `https://getsuvo.com/about.html`
- `https://getsuvo.com/sources/`
- `https://getsuvo.com/picks/`

## SEO Notes

The site includes:

- Canonical URLs for indexable pages.
- Unique meta descriptions for indexable pages.
- Open Graph and Twitter Card metadata.
- JSON-LD structured data for the homepage, source library, source pages, and editorial pick pages.
- `robots.txt` with sitemap discovery.
- `sitemap.xml` for crawlers.
- `llms.txt` for AI/search-agent context.
- About/contact page for support and trust signals.
