# FilmIndex

FilmIndex is a modern analog photography knowledge database for films, cameras, techniques, search, and comparison.

## v0.1.0 scope

- 20+ Films
- 20+ Cameras
- 15+ Techniques
- Global Search
- Film / Camera Compare
- Multi-dimensional catalog filters
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

The initial seed catalog remains in `lib/data.ts`. Additional v0.1.0 catalog modules live under `data/` and are combined by `lib/catalog.ts`, which is the application-facing catalog entry point. A build-time catalog guard enforces the v0.1.0 minimums of 20 films, 20 cameras, and 15 techniques.

Search, filters, detail pages, sources, and compare read from the bundled catalog. `localStorage` is reserved for local preferences such as theme and language.

## Filters

Films support combined filtering by:

- Brand
- Film type
- ISO range
- Format
- Development process

Cameras support combined filtering by:

- Brand
- Camera type
- Film format
- Exposure mode
- Fixed vs interchangeable lens

Techniques support filtering by category and difficulty. Filter state uses URL query parameters so filtered views remain shareable.

## Internationalization

English is the default language. Thai can be selected from the header. Language state is represented in the URL with `?lang=en|th` so links remain shareable, while the most recent preference is also remembered locally in the browser.

Translations are bundled with the site. Film and camera model names remain in their original names, while navigation, descriptions, techniques, labels, comparison fields, filters, and editorial terminology can be localized.

## Image policy

Every external image record stores its source page, creator, license, attribution requirement, and alt text. Never fabricate attribution. When the exact license is not confidently recorded in the catalog, use `See source page` and retain the original source link for verification.

Images may remain externally referenced when their source permits display; self-host images only when redistribution rights allow it.
