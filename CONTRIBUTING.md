# Contributing — Suvo landing

Static HTML marketing site for `getsuvo.com`. Served by **GitHub Pages** from the default branch (`main`). No framework, no build step, no JS bundler.

---

## What's here

```
index.html          ← home page
privacy.html        ← privacy policy (required for App Store + Play review)
affiliates.html     ← affiliate disclosure (required for Amazon Associates + Awin)
auth/               ← post-magic-link landing (deep-link handoff to mobile)
picks/              ← shareable product-pick pages (static per-SKU HTML)
sources/            ← scientific sources referenced in the app
img/, assets/       ← images, fonts
style.css           ← single stylesheet
CNAME               ← pins GitHub Pages to getsuvo.com
```

No Jekyll. We have the default `_config.yml` but don't use Liquid / layouts / includes. Treat it as plain HTML.

---

## Run locally

```bash
cd landing
python3 -m http.server 4000
# → http://localhost:4000
```

Or any static server (`npx serve`, `caddy file-server`, etc.).

---

## Deploy

Merge to `main`. GitHub Pages picks it up within ~60s.

```bash
git switch -c copy/<short-slug>
# … edits …
git push -u origin copy/<short-slug>
unset GITHUB_TOKEN && gh pr create --base main --fill
unset GITHUB_TOKEN && gh pr merge --squash
```

No rollback mechanism beyond reverting a commit. The entire site deploys atomically.

---

## When something breaks

| Symptom | Check |
|---|---|
| `getsuvo.com` shows 404 | `CNAME` file still says `getsuvo.com`? DNS still CNAME'd to `<gh-user>.github.io`? |
| CSS missing on deploy | Relative paths only. `/style.css` works; `./style.css` doesn't on nested pages. |
| Magic-link arrives, opens web fallback instead of mobile | Check `auth/` page — the deep-link + universal-link meta tags are load-bearing. |
| App Store reviewer flagged privacy policy | `privacy.html` is the canonical version. Don't ship a different copy in the app binary. |
| Affiliate link reviewer flagged disclosure | `affiliates.html` is linked from app + landing footer. Keep both in sync. |

---

## Rules of thumb

- **No tracking pixels.** We decided against GA / Plausible / Fathom pre-launch.
- **No JS frameworks.** If a page needs interactivity, write vanilla JS inline.
- **No CDN in front.** GitHub Pages cache is sufficient for current traffic.
- **Images compressed** — `cwebp` or `mozjpeg` before commit. We host our own; no Cloudinary.
- **Marketing copy changes** are the CFO lane's — if you're in the coding lane, redirect.
