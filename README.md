# FilmIndex

FilmIndex is a modern analog photography knowledge database and local-first shooting companion for films, cameras, lenses, techniques, discovery, comparison, field tools, and film-lab workflows.

## v0.8.0 scope — Database Depth & Data Quality

v0.8.0 makes data provenance a first-class part of FilmIndex instead of treating every catalog field as equally certain.

### Database depth

- Lens Database expands from 46 to 100 models across the existing Canon FD/EF, Nikon F, M42, Pentax K, Minolta SR, Olympus OM, Leica M, Contax/Yashica, Mamiya 645, Hasselblad V, and Pentax 67 systems.
- New lens records deliberately stay inside already modeled mounts so compatibility logic remains conservative.
- Existing film and camera catalogs are retained and normalized through the same provenance layer rather than being silently treated as fully verified.
- Exact-model lens imagery is used where available; otherwise a sourced same-system reference image is shown and explicitly labelled representative.

### Record provenance

Film, Camera, and Lens records now expose a common provenance model:

- `sources` with publisher, URL, and source scope
- `lastVerified`
- `confidence`: `verified`, `community-reference`, or `incomplete`
- lifecycle status: `current`, `discontinued`, `historical`, or `unknown`
- optional introduced/production years
- optional country of manufacture
- optional generation / family
- optional variants and verification notes

`verified` has a strict meaning: at least one model-level or manual-level source must support the record. Brand catalogs, system references, image pages, or community databases can support a record but do not automatically promote it to Verified.

Every Film, Camera, and Lens detail page includes a Data Quality panel showing the record's current confidence, verification date, lifecycle metadata, notes, and source links. `/sources` also acts as a catalog-wide quality dashboard with confidence totals and source coverage.

### Build-time quality gates

The production build now rejects:

- duplicate Film / Camera / Lens slugs
- records with no provenance source
- malformed `lastVerified` values
- records marked `verified` without a model/manual-level source
- a lens catalog below 100 entries

Existing guards for real film samples, technique guides, compact-camera coverage, normalized camera types, and sourced lens media remain active.

## v0.6.0 scope — Technique Guides

v0.6.0 turns every Technique article into a more practical field guide instead of a short two-section note.

Every one of the 15 bundled technique pages now includes:

- step-by-step practical workflow
- common mistakes and failure modes
- a pre-shoot / pre-process checklist
- links to relevant FilmIndex tools when a calculator can help
- reference imagery on suitable topics with visible source, creator, and license attribution
- Thai and English copy
- responsive layouts for desktop and mobile

Reference imagery is currently used where it materially helps explain the technique, including Exposure Triangle, Film Metering, Double Exposure, Airport X-ray, C-41 Development, and Film Scanning. Images come from Wikimedia Commons and retain their source/license metadata.

A build-time regression guard now requires every Technique record to have a practical guide, preventing future technique entries from shipping as thin placeholder articles.

## v0.5.0 scope — Lens & Meter Ecosystem

v0.5.0 connects the film, camera, lens, and exposure data into one practical ecosystem.

### Lens Database

- New `/lenses` database with brand, mount, focal length, maximum aperture, focus type, format coverage, minimum focus, and filter-thread data
- Initial catalog contains 46 representative analog-system lenses across Canon FD/EF, Nikon F, M42, Pentax K, Minolta SR, Olympus OM, Leica M, Contax/Yashica, Mamiya 645, Hasselblad V, and Pentax 67
- Individual `/lenses/[slug]` pages show specifications and native camera matches from the local camera catalog
- Lenses are searchable from Global Search and accessible from primary navigation
- Build-time catalog regression guard prevents the bundled lens database from dropping below its versioned minimum

### Camera / Lens Compatibility

`/tools/camera-lens-compatibility` checks:

- native mount matches
- fixed-lens cameras
- format/image-circle compatibility
- a deliberately conservative list of explicit mechanical adapter paths

The checker does not assume that matching physical dimensions guarantee metering, aperture coupling, autofocus, or infinity focus.

### Film / Camera Recommendation

`/tools/film-camera-recommendation` ranks compatible film stocks using only bundled catalog data. Ranking considers camera film format, shooting scenario, film type preference, film ISO, typical-use metadata, exposure latitude for meterless cameras, and practical ISO range for compact cameras.

The output is an explainable local heuristic rather than a claim that one film stock is universally best.

### Advanced Light Meter

`/tools/advanced-light-meter` provides manual Lux → EV100 conversion, Ambient Light Sensor readings when the browser/device exposes that API, and camera-relative luminance metering after calibration to a known EV.

The tool clearly separates absolute Lux/sensor readings from camera-relative readings because browser cameras usually run auto exposure and generally do not expose reliable exposure metadata. Camera preview stays local and is not uploaded.

## v0.4.0 scope — Film Lab Tools & Individual Tool Pages

v0.4.0 turns `/tools` into a navigation hub and gives every utility a focused URL under `/tools/[tool]`.

Film Lab Tools added in this version:

- Development Calculator — starts from a trusted film/developer base time, applies an explicit Q10 temperature model, and calculates concentrate/water dilution volumes
- Push / Pull Assistant — calculates shooting EI immediately and only calculates an adjusted development time when the user supplies a percentage from a datasheet or lab
- Expired Film Calculator — offers a visible and adjustable age/storage heuristic rather than presenting the one-stop-per-decade idea as a universal rule
- Negative Conversion — local browser Canvas workflow for inversion, optional orange-mask neutralization, exposure, contrast, RGB tuning, and PNG export; the image is not uploaded

Individual tools include:

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
- `/tools/camera-lens-compatibility`
- `/tools/film-camera-recommendation`
- `/tools/advanced-light-meter`

## v0.3.0 scope — Tools Expansion

- Exposure Calculator with EV100 and equivalent aperture/shutter combinations
- Reciprocity Calculator with explicitly generic correction models
- Depth of Field Calculator with near/far limits, total DOF, and hyperfocal distance
- Film Cost Calculator with per-roll and per-frame costs
- Scan Resolution Calculator with pixel dimensions, megapixels, and RGB size estimates
- Roll Logbook stored only in browser `localStorage`
- Sunny 16, Push/Pull Effective ISO, and Reciprocal Rule preserved
- English / Thai UI and responsive mobile layout

## v0.2.0 scope

- Film Finder with explainable local ranking
- Related Films on film detail pages
- Advanced Global Search with multi-token matching, light typo tolerance, keyboard navigation, Thai/English aliases, and recent searches
- My Film Shelf using browser `localStorage`
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

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Data architecture

FilmIndex is intentionally local-first and does not use a hosted database, CMS, authentication service, or runtime catalog API. Films, cameras, lenses, techniques, source metadata, translations, sample-photo records, discovery scoring, recommendations, compatibility rules, and calculator logic are version-controlled with the application and bundled into the build.

The initial catalog remains in `lib/data.ts`; expanded film/camera records live under `data/films-*` and `data/cameras-*`. Lens records live in `data/lenses.ts` and versioned expansion waves such as `data/lenses-wave8.ts`. `data/catalog-provenance.ts` normalizes source confidence, lifecycle metadata, record families, and verification dates across Film, Camera, and Lens records. Film sample photographs and attribution metadata live under `data/film-samples*`. Practical technique-guide data lives in `data/technique-guides.ts`. `lib/catalog.ts` combines application-facing entities and enforces catalog and data-quality guards. `lib/discovery.ts` contains Film Finder and Related Film scoring. `lib/photography-tools.ts` contains calculator functions, `lib/lens-ecosystem.ts` contains lens compatibility, film/camera recommendation, and light-meter math, and `lib/tool-catalog.ts` defines the Tool Hub.

Search, filters, detail pages, recommendations, compatibility checks, and calculators operate from bundled application data. `localStorage` is reserved for local preferences and user-side state such as theme, language, recent searches, My Film Shelf, and Roll Logbook entries. Negative conversion and camera-meter preview are processed locally in the browser.

## Internationalization

English is the default language. Thai can be selected from the header. Language state is represented in the URL with `?lang=en|th`, while the latest preference is remembered locally.

## Accuracy notes

FilmIndex distinguishes catalog facts from estimates and heuristics. A `verified` record requires a model-specific or manual-level source; catalog, series, image, and community references remain explicitly lower-confidence until their core fields are checked against direct documentation. `lastVerified` records when the local provenance assessment was last updated, not when a manufacturer last changed a product.

FilmIndex also avoids inferring a current/discontinued state when current manufacturer evidence is ambiguous. Historical camera and lens entries describe their place in the catalog without implying that every production run, country, or variant is identical.

Reciprocity presets are generic unless manufacturer-specific data is explicitly added. Development calculations begin with trusted user-supplied base data. Expired-film recommendations are adjustable heuristics. Adapter compatibility is intentionally conservative. Camera-based web metering is treated as relative unless calibrated because browser auto exposure can change the video signal.

Technique guides also distinguish practical rules of thumb from manufacturer-specific procedures. Film/developer times, airport security procedures, reciprocity data, and chemistry instructions should be checked against the relevant current source when precision or safety matters.

## Local collection

My Film Shelf and Roll Logbook stay in the current browser's `localStorage`. FilmIndex does not create an account or upload either collection. Clearing site data/localStorage will remove those records.

## Film sample photographs

Every film detail page includes sourced sample photography. Sample records include source URL, creator, license information when confirmed, attribution requirement, and alt text. Development, exposure, lens choice, scanning, and post-processing can all affect final appearance.

## Image policy

Do not add external imagery with unclear provenance. Every external image record should include source page, creator, license status, attribution requirement, and alt text. Where exact license information has not been normalized locally, use `See source page` rather than inventing a license.

## Credit

FilmIndex is developed by [NowhereDev](https://nowheredev.vercel.app/). The public site footer includes a `by NowhereDev` credit.
