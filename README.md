# FilmIndex

FilmIndex is a modern analog photography knowledge database and local-first shooting companion for films, cameras, techniques, discovery, and comparison.

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

FilmIndex is intentionally local-first and does not use a hosted database, CMS, authentication service, or runtime catalog API. Films, cameras, techniques, source metadata, translations, sample-photo records, discovery scoring, and shooting calculators are version-controlled with the application and bundled into the build.

The initial catalog remains in `lib/data.ts`; expanded records live in `data/films-extra.ts`, `data/cameras-extra.ts`, and `data/techniques-extra.ts`. Film sample photographs and their attribution metadata live in `data/film-samples.ts`. `lib/catalog.ts` combines these modules into the application-facing catalog. `lib/discovery.ts` contains deterministic Film Finder and Related Film scoring.

Search, filters, detail pages, Film Finder, related-film recommendations, and compare read from the bundled catalog. `localStorage` is reserved for local preferences and user-side state such as theme, language, recent searches, and My Film Shelf.

## Internationalization

English is the default language. Thai can be selected from the header. Language state is represented in the URL with `?lang=en|th` so links remain shareable, while the most recent preference is also remembered locally in the browser.

Translations are bundled with the site. Film and camera model names remain in their original names, while navigation, descriptions, techniques, labels, filters, comparison fields, discovery tools, and editorial terminology can be localized.

## Discovery and shooting tools

`/finder` ranks the local film catalog using the user's selected subject/use, available light, film family, and grain preference. The UI displays the reasons behind each match instead of presenting recommendations as an opaque score.

`/tools` contains browser-side shooting helpers. Sunny 16 provides an approximate daylight exposure starting point and the Push/Pull planner calculates the effective ISO to meter for. FilmIndex does not invent development times; users should follow the relevant film/developer datasheet or laboratory guidance.

Each film detail page also shows locally calculated related films based on film family, ISO proximity, process, typical uses, and grain characteristics.

## Local collection

My Film Shelf stores selected film slugs only in the current browser's `localStorage`. It does not create an account or upload the collection anywhere.

## Filters

Film catalog filters can be combined by brand, film type, ISO range, format, and development process. Camera filters can be combined by brand, camera type, film format, exposure mode, and lens type. Technique filters support category and difficulty. Filter state remains in the URL.

## Film sample photographs

Every film detail page includes at least one sourced sample photograph associated with that film stock. These images are displayed separately from packaging/product imagery because development, exposure, lens choice, scanning, and post-processing can affect the final look.

Sample records include source URL, creator, license information when confirmed, attribution requirement, and alt text. `/sources` includes both catalog imagery and film sample photography.

## Image policy

Every external image record stores its source page, creator, license, attribution requirement, and alt text. Do not add images with unclear provenance. Where the exact license string has not been normalized locally, use `See source page` rather than inventing one. Images may remain externally referenced when their source permits display; self-host images only when redistribution rights allow it.

## Credit

FilmIndex is developed by [NowhereDev](https://nowheredev.vercel.app/). The public site footer includes a `by NowhereDev` credit.
