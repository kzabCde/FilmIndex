# FilmIndex

FilmIndex is a modern analog photography knowledge database for films, cameras, techniques, search, and comparison.

## v0.1.0 scope

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

FilmIndex is intentionally local-first and does not use a hosted database, CMS, authentication service, or runtime catalog API. Films, cameras, techniques, source metadata, translations, and sample-photo records are version-controlled with the application and bundled into the build.

The initial catalog remains in `lib/data.ts`; expanded v0.1.0 records live in `data/films-extra.ts`, `data/cameras-extra.ts`, and `data/techniques-extra.ts`. Film sample photographs and their attribution metadata live in `data/film-samples.ts`. `lib/catalog.ts` combines these modules into the application-facing catalog.

Search, filters, detail pages, related content, and compare read from the bundled catalog. `localStorage` is reserved for local preferences such as theme, language, recent searches, recently viewed entries, and compare state.

## Internationalization

English is the default language. Thai can be selected from the header. Language state is represented in the URL with `?lang=en|th` so links remain shareable, while the most recent preference is also remembered locally in the browser.

Translations are bundled with the site. Film and camera model names remain in their original names, while navigation, descriptions, techniques, labels, filters, comparison fields, and editorial terminology can be localized.

## Filters

Film catalog filters can be combined by brand, film type, ISO range, format, and development process. Camera filters can be combined by brand, camera type, film format, exposure mode, and lens type. Technique filters support category and difficulty. Filter state remains in the URL.

## Film sample photographs

Every film detail page includes at least one sourced sample photograph associated with that film stock. These images are displayed separately from packaging/product imagery because development, exposure, lens choice, scanning, and post-processing can affect the final look.

Sample records include source URL, creator, license information when confirmed, attribution requirement, and alt text. `/sources` includes both catalog imagery and film sample photography.

## Image policy

Every external image record stores its source page, creator, license, attribution requirement, and alt text. Do not add images with unclear provenance. Where the exact license string has not been normalized locally, use `See source page` rather than inventing one. Images may remain externally referenced when their source permits display; self-host images only when redistribution rights allow it.

## Credit

FilmIndex is developed by [NowhereDev](https://nowheredev.vercel.app/). The public site footer includes a `by NowhereDev` credit.
