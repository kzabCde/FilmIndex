# FilmIndex

FilmIndex is a modern analog photography knowledge database for films, cameras, techniques, search, and comparison.

## v0.1.0 scope

- Films
- Cameras
- Techniques
- Global Search
- Compare
- English / Thai i18n

The app uses authentic external photography with explicit provenance and attribution metadata. Subjective film characteristics are labeled as editorial guidance and kept separate from factual specifications.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Data architecture

FilmIndex is intentionally local-first and does not use a hosted database, CMS, authentication service, or runtime catalog API. Films, cameras, techniques, source metadata, and translations are version-controlled with the application and bundled into the build.

`lib/data.ts` and the TypeScript contracts in `types/` are the current source of truth. As the catalog grows, data can be split into `data/films.ts`, `data/cameras.ts`, `data/techniques.ts`, and `data/sources.ts` or generated static JSON without changing the local-first model.

Search, filters, detail pages, related content, and compare read from the bundled catalog. `localStorage` is reserved for local preferences such as theme, language, recent searches, recently viewed entries, and compare state.

## Internationalization

English is the default language. Thai can be selected from the header. Language state is represented in the URL with `?lang=en|th` so links remain shareable, while the most recent preference is also remembered locally in the browser.

Translations are bundled with the site. Film and camera model names remain in their original names, while navigation, descriptions, techniques, labels, comparison fields, and editorial terminology can be localized.

## Image policy

Every external image record stores its source page, creator, license, attribution requirement, and alt text. Do not add images with unclear provenance. Images may remain externally referenced when their source permits display; self-host images only when redistribution rights allow it.
