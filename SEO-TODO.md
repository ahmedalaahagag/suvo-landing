# Suvo SEO Checklist

Last updated: 2026-05-11

## Completed

- [x] Added `robots.txt` with sitemap discovery and `/auth/` disallow.
- [x] Added `sitemap.xml` covering homepage, legal pages, source pages, and editorial pick pages.
- [x] Added `llms.txt` with site summary, key URLs, and source policy.
- [x] Added canonical URLs to indexable HTML pages.
- [x] Added unique meta descriptions to indexable pages.
- [x] Added Open Graph and Twitter Card metadata to key pages.
- [x] Added homepage `Organization`, `WebSite`, and `SoftwareApplication` JSON-LD.
- [x] Added `WebPage`, `CollectionPage`, `ItemList`, `BreadcrumbList`, and `Article` JSON-LD where relevant.
- [x] Added a homepage evidence section linking to the source library.
- [x] Added footer links to Sources, Editorial picks, Delete account, Privacy, and Affiliate disclosure.
- [x] Expanded `/sources/` pages with how Suvo applies each source and source limitations.
- [x] Added `/picks/` index page so editorial picks are no longer orphaned.
- [x] Expanded the omega-3 pick page with criteria, caution language, article schema, and clearer affiliate disclosure.
- [x] Added `noindex,follow` to the 404 page.
- [x] Verified local links have no missing internal targets.
- [x] Verified JSON-LD parses as valid JSON.
- [x] Verified `sitemap.xml` is valid XML.
- [x] Verified local HTTP `200` responses for `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/sources/`, `/picks/`, and `/picks/omega-3-epa-dha.html`.
- [x] Browser-smoke-tested home, sources, picks, and omega pages with no console errors.

## Missing Data

- [ ] Google Search Console property access and sitemap submission status.
- [ ] PageSpeed Insights/Core Web Vitals results after deployment. The API returned quota `429` during local audit.
- [ ] Real App Store and Google Play URLs. Current calls to action still use email links.
- [ ] Official social/profile URLs for `sameAs` schema, if Suvo has public profiles.
- [ ] Final app pricing model for `SoftwareApplication` offers, if not free.
- [ ] Organization legal name and address, if the site should expose more formal business identity.
- [ ] Exact review cadence for source pages, beyond the current "Last updated/reviewed" page copy.
- [ ] Per-source citation URLs for specific rules once the app exposes public rule examples.
- [ ] Product testing certificates or official label proof for editorial picks where available.
- [ ] Real product images for editorial pick pages if those pages become an SEO acquisition surface.

## Remaining To Do

- [ ] Deploy the static site.
- [ ] Confirm live `https://getsuvo.com/robots.txt`, `sitemap.xml`, and `llms.txt` return `200`.
- [ ] Submit `https://getsuvo.com/sitemap.xml` in Google Search Console.
- [ ] Run PageSpeed Insights after deployment and record mobile/desktop results.
- [ ] Validate homepage and article schema in Google's Rich Results Test.
- [ ] Add App Store / Google Play links when public, then update CTAs and schema.
- [ ] Add official `sameAs` profile links to organization schema when available.
- [ ] Add a real contact/about section if Suvo needs stronger E-E-A-T signals for health-adjacent queries.
- [ ] Expand editorial pick pages only if they are intended to rank; otherwise consider `noindex,follow` for thin or affiliate-only pick pages.
- [ ] Keep `sitemap.xml` updated whenever new source or pick pages are added.
