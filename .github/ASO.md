# Suvo — App Store Optimization (ASO) copy sheet

Store listing copy lives in App Store Connect and Google Play Console, not in this repo.
This file is the source of truth for that copy. Character counts are verified against store limits.
Claims must stay consistent with the website (`index.html`, `de/index.html`) and `privacy.html`.

Store IDs: iOS `6764276451` · Android `com.suvo.mobile`

## Keyword strategy

| Cluster | EN head terms | DE head terms | Where it lands |
|---|---|---|---|
| Core | supplement tracker, vitamin tracker | Supplement Tracker, Vitamine | Name / Title (highest weight) |
| Differentiator | supplement interactions, vitamin timing | Wechselwirkungen, Einnahme | Subtitle / Short description |
| Utility | pill reminder, supplement schedule, stack | Erinnerung, Einnahmeplan, Tabletten | Keyword field / Description |
| Long tail | magnesium, iron, omega, creatine, multivitamin | Magnesium, Eisen, Omega, Kreatin | Keyword field / Description |

Rules: never repeat a word across Name, Subtitle and the iOS keyword field (Apple combines them). Use singular forms; Apple matches plurals. No spaces after commas. No competitor brand names.

## Apple App Store

### English (U.S.) — primary

| Field | Limit | Copy | Chars |
|---|---|---|---|
| App Name | 30 | `Suvo: Supplement Tracker` | 24 |
| Subtitle | 30 | `Vitamin Interactions & Timing` | 29 |
| Keywords | 100 | `pill,reminder,stack,checker,multivitamin,magnesium,iron,omega,creatine,dose,schedule,nutrient,scan` | 98 |
| Promotional Text | 170 | `Scan your bottles and Suvo shows what conflicts with what and when each supplement belongs. Free, no ads, no paywall.` | 117 |

### German (Germany)

| Field | Limit | Copy | Chars |
|---|---|---|---|
| App Name | 30 | `Suvo: Supplement Tracker` | 24 |
| Subtitle | 30 | `Wechselwirkungen & Einnahme` | 27 |
| Keywords | 100 | `nahrungsergänzung,vitamine,erinnerung,tabletten,einnahmeplan,magnesium,eisen,omega,kreatin,dosis` | 96 |
| Promotional Text | 170 | `Packungen scannen und sehen, was sich mit was verträgt und wann welches Supplement dran ist. Kostenlos, ohne Werbung, ohne Paywall.` | 131 |

### Extra keyword slots (cross-localization indexing)

The German storefront also indexes the **English (U.K.)** localization. Add an en-GB localization with the EN name/subtitle and this keyword field to rank for English searches from Germany:

`supplements,vitamins,pill,tracker,interaction,timing,reminder,multivitamin,magnesium,iron,omega,dose` (100)

The U.S. storefront also indexes **Spanish (Mexico)**. Use its keyword field for further English long-tail terms not already in en-US (for example `zinc,vitamin d,b12,ashwagandha,probiotic,collagen,biotin,melatonin,electrolyte`), keeping the name and subtitle identical to en-US.

### Description (EN)

The iOS description is not indexed for search; it drives conversion only. Lead with the benefit, keep the first three lines strong (visible before "more").

```
Iron with breakfast coffee. Calcium an hour after iron. A multivitamin hiding 21 compounds. Most people guess. Suvo doesn't.

Scan your supplement bottles and Suvo shows what conflicts with what, and when each one belongs.

SCAN & CATALOG
• Scan a barcode, photograph the supplement-facts label, or search by name
• Label-photo OCR reads compounds and doses for you
• Multivitamins are broken into individual compounds

INTERACTION & TIMING WARNINGS
• Flags conflicts such as iron and calcium, or coffee and iron
• Warns when stacked products push a nutrient past its upper limit
• Timing notes around meals and sleep

REMINDERS THAT FIT YOUR DAY
• Morning, evening, and meal-time slots
• Daily, every-other-day, weekly, and monthly cadences
• Optional end-of-day nudge for missed logs

MORE
• Honest streaks that respect weekly or monthly cadence
• Stack health review for redundant compounds and dose stacking
• Managed profiles for family members
• Country-aware retailer links (DE, UK, US, MEA)

RULES WITH RECEIPTS
Guidance is built on named source tiers: regulatory authorities, government institutes, systematic reviews, and curated databases. See getsuvo.com/sources.

FREE
No ads. No paywall. Suvo is funded by affiliate links when you buy a product you already picked.

Suvo is educational and not medical advice. Consult a doctor or pharmacist before changing supplements, especially with medication.
```

### Description (DE)

```
Eisen zum Frühstückskaffee. Calcium eine Stunde nach Eisen. Ein Multivitamin mit 21 versteckten Wirkstoffen. Die meisten raten. Suvo nicht.

Scanne deine Supplement-Packungen und Suvo zeigt, was sich mit was verträgt und wann welches Supplement dran ist.

SCANNEN & ERFASSEN
• Barcode scannen, Nährwert-Etikett fotografieren oder nach Namen suchen
• Die Etiketten-Erkennung liest Wirkstoffe und Dosierungen
• Multivitamine werden in einzelne Wirkstoffe zerlegt

WECHSELWIRKUNGEN & TIMING
• Markiert Konflikte wie Eisen und Calcium oder Kaffee und Eisen
• Warnt, wenn mehrere Produkte einen Nährstoff über die Höchstmenge bringen
• Timing-Hinweise rund um Mahlzeiten und Schlaf

ERINNERUNGEN, DIE ZU DEINEM TAG PASSEN
• Slots für Morgen, Abend und Mahlzeiten
• Täglich, jeden zweiten Tag, wöchentlich oder monatlich
• Optionale Erinnerung am Abend für vergessene Einträge

AUSSERDEM
• Ehrliche Streaks, die wöchentlichen oder monatlichen Rhythmus respektieren
• Stack-Check für doppelte Wirkstoffe und Dosis-Häufung
• Verwaltete Profile für Familienmitglieder
• Länderspezifische Händler-Links (DE, UK, US, MEA)

REGELN MIT QUELLEN
Die Hinweise basieren auf benannten Quellenstufen: Behörden, staatliche Institute, systematische Reviews und kuratierte Datenbanken. Siehe getsuvo.com/de/sources.

KOSTENLOS
Keine Werbung. Keine Paywall. Suvo finanziert sich über Affiliate-Links, wenn du ein Produkt kaufst, das du selbst ausgewählt hast.

Suvo dient der Information und ersetzt keine medizinische Beratung. Vor Änderungen, besonders bei Medikamenteneinnahme, ärztlichen oder pharmazeutischen Rat einholen.
```

## Google Play

Play indexes the title, short description, and full description. Repeat core terms naturally 3–5 times in the full description; do not keyword-stuff (policy violation).

| Field | Limit | EN | DE |
|---|---|---|---|
| App name | 30 | `Suvo: Supplement Tracker` (24) | `Suvo: Supplement Tracker` (24) |
| Short description | 80 | `Supplement tracker: catch vitamin interactions and time every dose right.` (73) | `Supplement-Tracker: Wechselwirkungen erkennen, Vitamine richtig timen.` (70) |
| Full description | 4000 | iOS EN description above, plus the Play-only paragraph below | iOS DE description above, plus the Play-only paragraph below |

Play-only opening paragraph (EN), placed first:

```
Suvo is a free supplement tracker and vitamin reminder that checks your stack for supplement interactions, timing conflicts, and upper limits.
```

Play-only opening paragraph (DE), placed first:

```
Suvo ist ein kostenloser Supplement-Tracker mit Vitamin-Erinnerung, der deinen Stack auf Wechselwirkungen, Timing-Konflikte und Höchstmengen prüft.
```

Category: Health & Fitness (both stores). Content rating and Data safety answers must match `privacy.html` (email for account, PostHog product analytics, no sale of data, health-related data not used for ads).

## Screenshots (both stores)

First three screenshots decide most conversions and are the only ones visible in search results. One message per frame, large caption, real UI.

| # | Caption (EN) | Caption (DE) | Screen |
|---|---|---|---|
| 1 | Know what conflicts with what | Sieh, was sich nicht verträgt | Interaction warning (iron vs. calcium) |
| 2 | Scan a bottle. Get every compound. | Packung scannen. Alle Wirkstoffe sehen. | Label scan / OCR result |
| 3 | Take each one at the right time | Alles zur richtigen Zeit | My Stack with slots and progress |
| 4 | Multivitamins, broken down | Multivitamine, aufgeschlüsselt | 21-compound breakdown |
| 5 | Stay under safe upper limits | Unter der Höchstmenge bleiben | Upper-limit warning |
| 6 | Reminders on your schedule | Erinnerungen nach deinem Plan | Reminder slot settings |
| 7 | Track for your family too | Auch für die Familie | Managed profiles |
| 8 | Free. No ads. No paywall. | Kostenlos. Keine Werbung. | Stack review / streaks |

## Conversion and ranking levers (outside listing copy)

1. **Ratings volume and recency** — biggest ranking factor after metadata. Trigger `SKStoreReviewController` (iOS) and the Play In-App Review API after a positive moment (for example a 7-day streak or first clean stack review), never after a warning.
2. **Reply to reviews** in both consoles; replies are indexed on Play.
3. **Custom Product Pages (iOS) / Custom store listings (Play)** — one per keyword cluster (interactions, reminders, family) and link them from matching ads or site pages.
4. **Play Store listing experiments** — A/B the icon, first screenshot, and short description; run one variable at a time for at least 7 days.
5. **In-App Events (iOS) / Promotional content (Play)** — events are indexed in App Store search and get their own cards.
6. **Web → store attribution** — the website's Play links carry a `referrer` with `utm_source=getsuvo.com`; installs show under Play Console → Acquisition. For App Store Connect campaign links, append `?pt=<provider token>&ct=<campaign>` once the provider token is available (App Store Connect → Analytics → Sources).
7. **Universal Links / App Links** — publish `/.well-known/apple-app-site-association` (needs Apple Team ID + bundle ID) and `/.well-known/assetlinks.json` (needs the release signing SHA-256 fingerprint). GitHub Pages serves `.well-known` only with a `.nojekyll` file or a `_config.yml` `include: [".well-known"]`. Not added yet: values required.
8. **Localize beyond EN/DE** once traction is known: en-GB, en-AU, en-CA (free extra keyword fields), then fr-FR, es-ES, nl-NL.
