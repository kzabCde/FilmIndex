# FilmIndex

FilmIndex is a modern analog photography knowledge database and local-first shooting companion for films, cameras, lenses, techniques, discovery, comparison, field tools, and film-lab workflows.

## v0.5.0 scope — Lens & Meter Ecosystem

v0.5.0 connects the film, camera, lens, and exposure data into one practical ecosystem.

### Lens Database

- New `/lenses` database with brand, mount, focal length, maximum aperture, focus type, format coverage, minimum focus, and filter-thread data
- Initial catalog contains 46 representative analog-system lenses across Canon FD/EF, Nikon F, M42, Pentax K, Minolta SR, Olympus OM, Leica M, Contax/Yashica, Mamiya 645, Hasselblad V, and Pentax 67
- Individual `/lenses/[slug]` pages show specifications and native camera matches from the local camera catalog
- Lenses are searchable from Global Search and accessible from primary navigation
- Build-time catalog regression guard prevents the bundled lens database from dropping below 40 records

### Camera / Lens Compatibility

`/tools/camera-lens-compatibility` checks:

- native mount matches
- fixed-lens cameras
- format/image-circle compatibility
- a deliberately conservative list of explicit mechanical adapter paths

The checker does not assume that matching physical dimensions guarantee metering, aperture coupling, autofocus, or infinity focus.

### Film / Camera Recommendation

`/tools/film-camera-recommendation` ranks compatible film stocks using only bundled catalog data. Ranking considers:

- camera film format
- shooting scenario
- film type preference
- film ISO
- typical-use metadata
- exposure latitude for meterless cameras
- practical ISO range for compact cameras

The output is an explainable local heuristic rather than a claim that one film stock is universally best.

### Advanced Light Meter

`/tools/advanced-light-meter` provides three browser-side workflows:

- manual Lux → EV100 conversion
- Ambient Light Sensor readings when the browser/device exposes that API
- camera-relative luminance metering after calibration to a known EV

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

The initial catalog remains in `lib/data.ts`; expanded film/camera records live under `data/films-*` and `data/cameras-*`. Lens records live in `data/lenses.ts`. Film sample photographs and attribution metadata live in `data/film-samples.ts`. `lib/catalog.ts` combines application-facing entities. `lib/discovery.ts` contains Film Finder and Related Film scoring. `lib/photography-tools.ts` contains calculator functions, `lib/lens-ecosystem.ts` contains lens compatibility, film/camera recommendation, and light-meter math, and `lib/tool-catalog.ts` defines the Tool Hub.

Search, filters, detail pages, recommendations, compatibility checks, and calculators operate from bundled application data. `localStorage` is reserved for local preferences and user-side state such as theme, language, recent searches, My Film Shelf, and Roll Logbook entries. Negative conversion and camera-meter preview are processed locally in the browser.

## Internationalization

English is the default language. Thai can be selected from the header. Language state is represented in the URL with `?lang=en|th`, while the latest preference is remembered locally.

## Accuracy notes

FilmIndex distinguishes catalog facts from estimates and heuristics. Reciprocity presets are generic unless manufacturer-specific data is explicitly added. Development calculations begin with trusted user-supplied base data. Expired-film recommendations are adjustable heuristics. Adapter compatibility is intentionally conservative. Camera-based web metering is treated as relative unless calibrated because browser auto exposure can change the video signal.

When precision matters, use manufacturer datasheets, verified laboratory instructions, calibrated meters, and physically verified adapters.

## Local collection

My Film Shelf and Roll Logbook stay in the current browser's `localStorage`. FilmIndex does not create an account or upload either collection. Clearing site data/localStorage will remove those records.

## Film sample photographs

Every film detail page includes sourced sample photography. Sample records include source URL, creator, license information when confirmed, attribution requirement, and alt text. Development, exposure, lens choice, scanning, and post-processing can all affect final appearance.

## Image policy

Do not add external imagery with unclear provenance. Every external image record should include source page, creator, license status, attribution requirement, and alt text. Where exact license information has not been normalized locally, use `See source page` rather than inventing a license.

## Credit

FilmIndex is developed by [NowhereDev](https://nowheredev.vercel.app/). The public site footer includes a `by NowhereDev` credit.
