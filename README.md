# FilmIndex

FilmIndex is a modern analog photography knowledge database and local-first shooting companion for films, cameras, techniques, discovery, comparison, and field/lab tools.

## v0.4.0 scope — Film Lab Tools & Individual Tool Pages

v0.4.0 turns `/tools` into a navigation hub and gives every utility a focused URL under `/tools/[tool]`.

Film Lab Tools added in this version:

- Development Calculator — starts from a trusted film/developer base time, applies an explicit Q10 temperature model, and calculates concentrate/water dilution volumes
- Push / Pull Assistant — calculates shooting EI immediately and only calculates an adjusted development time when the user supplies a percentage from a datasheet or lab
- Expired Film Calculator — offers a visible and adjustable age/storage heuristic rather than presenting the one-stop-per-decade idea as a universal rule
- Negative Conversion — local browser Canvas workflow for inversion, optional orange-mask neutralization, exposure, contrast, RGB tuning, and PNG export; the image is not uploaded

All distinct tools now have their own pages:

- `/tools/exposure`
- `/tools/reciprocity`
- `/tools/depth-of-field`
- `/tools/sunny-16`
- `/tools/reciprocal-rule`
- `/tools/film-cost`
- `/tools/scan-resolution`
- `/tools/roll-logbook`
- `/tools/development`
- `/tools/push-pull`
- `/tools/expired-film`
- `/tools/negative-conversion`

The Push/Pull planner from earlier releases is upgraded into the Film Lab Push/Pull Assistant rather than duplicated as a second tool.

## v0.3.0 scope — Tools Expansion

v0.3.0 expands `/tools` into a practical analog photography toolkit while preserving every v0.2.0 shooting helper:

- Exposure Calculator with EV100 and equivalent aperture/shutter combinations
- Reciprocity Calculator using clearly labeled generic correction models when film-specific manufacturer data is unavailable
- Depth of Field Calculator with near/far limits, total DOF, and hyperfocal distance across common film formats
- Film Cost Calculator with total roll cost and cost per frame
- Scan Resolution Calculator with pixel dimensions, megapixels, and uncompressed RGB size estimates
- Roll Logbook stored only in browser `localStorage`, including camera, film, EI, frame count, loaded date, and notes
- Existing Sunny 16, Push/Pull Effective ISO, and Reciprocal Rule helpers remain available
- English / Thai UI and responsive mobile layout
- No account, hosted database, runtime calculator API, or roll-log upload

## v0.2.0 scope

v0.2.0 builds on the v0.1.0 reference catalog with discovery and shooting workflows:

- Film Finder with explainable local ranking
- Shooting Tools with Sunny 16 and Push/Pull effective ISO planning
- Related Films on film detail pages
- Advanced Global Search with multi-token matching, light typo tolerance, keyboard navigation, Thai/English aliases, and recent searches
- My Film Shelf using browser `localStorage`
- English / Thai UI preserved across the new tools
- No hosted database, accounts, or runtime recommendation API

## v0.1.0 foundation

- Films
- Cameras
- Techniques
- Global Search
- Compare
- English / Thai i18n
- Multi-dimensional catalog filters
- Real sample photographs for every film stock

The v0.1.0 catalog ships with at least 20 films, 20 cameras, and 15 techniques. A build-time guard prevents the catalog from dropping below these minimums and also requires every film stock to have at least one sample photograph record.

The app uses authentic external photography with explicit provenance and attribution metadata. Subjective film characteristics are labeled as editorial guidance and kept separate from factual specifications.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Data architecture

FilmIndex is intentionally local-first and does not use a hosted database, CMS, authentication service, or runtime catalog API. Films, cameras, techniques, source metadata, translations, sample-photo records, discovery scoring, and shooting/lab calculators are version-controlled with the application and bundled into the build.

The initial catalog remains in `lib/data.ts`; expanded records live in `data/films-extra.ts`, `data/cameras-extra.ts`, and `data/techniques-extra.ts`. Film sample photographs and their attribution metadata live in `data/film-samples.ts`. `lib/catalog.ts` combines these modules into the application-facing catalog. `lib/discovery.ts` contains deterministic Film Finder and Related Film scoring. `lib/photography-tools.ts` contains pure calculation helpers for the expanded toolkit, and `lib/tool-catalog.ts` defines the tool hub and individual routes.

Search, filters, detail pages, Film Finder, related-film recommendations, compare, and calculators read from bundled application code. `localStorage` is reserved for local preferences and user-side state such as theme, language, recent searches, My Film Shelf, and Roll Logbook entries. Negative conversion is performed in the browser and does not require an upload endpoint.

## Internationalization

English is the default language. Thai can be selected from the header. Language state is represented in the URL with `?lang=en|th` so links remain shareable, while the most recent preference is also remembered locally in the browser.

Translations are bundled with the site. Film and camera model names remain in their original names, while navigation, descriptions, techniques, labels, filters, comparison fields, discovery tools, and editorial terminology can be localized.

## Discovery and tools

`/finder` ranks the local film catalog using the user's selected subject/use, available light, film family, and grain preference. The UI displays the reasons behind each match instead of presenting recommendations as an opaque score.

`/tools` is the toolkit hub. Each utility opens on its own route so mobile layouts stay focused and tools can be bookmarked directly. Exposure, reciprocity, DOF, Sunny 16, reciprocal-rule, cost, scan, roll logging, development, push/pull, expired film, and negative conversion remain browser-side.

The Reciprocity Calculator intentionally labels its exponent presets as generic planning estimates instead of pretending to provide film-specific manufacturer data. Development calculations begin with user-supplied trusted base data. FilmIndex does not invent film/developer times or stock-specific reciprocity tables; use the relevant manufacturer datasheet or laboratory guidance when precision matters.

Each film detail page also shows locally calculated related films based on film family, ISO proximity, process, typical uses, and grain characteristics.

## Local collection

My Film Shelf stores selected film slugs only in the current browser's `localStorage`. Roll Logbook entries are also stored only in the current browser. FilmIndex does not create an account or upload either collection anywhere. Clearing site data/localStorage will remove these records.

## Filters

Film catalog filters can be combined by brand, film type, ISO range, format, and development process. Camera filters can be combined by brand, camera type, film format, exposure mode, and lens type. Technique filters support category and difficulty. Filter state remains in the URL.

## Film sample photographs

Every film detail page includes at least one sourced sample photograph associated with that film stock. These images are displayed separately from packaging/product imagery because development, exposure, lens choice, scanning, and post-processing can affect the final look.

Sample records include source URL, creator, license information when confirmed, attribution requirement, and alt text. `/sources` includes both catalog imagery and film sample photography.

## Image policy

Every external image record stores its source page, creator, license, attribution requirement, and alt text. Do not add images with unclear provenance. Where the exact license string has not been normalized locally, use `See source page` rather than inventing one. Images may remain externally referenced when their source permits display; self-host images only when redistribution rights allow it.

## Credit

FilmIndex is developed by [NowhereDev](https://nowheredev.vercel.app/). The public site footer includes a `by NowhereDev` credit.
