# FilmIndex

FilmIndex is a modern analog photography knowledge database for films, cameras, techniques, search, and comparison.

## v0.1.0 scope

- Films
- Cameras
- Techniques
- Global Search
- Compare

The app uses authentic photography with explicit provenance and attribution metadata. Subjective film characteristics are labeled as editorial guidance and kept separate from factual specifications.

## Local-first data architecture

FilmIndex does **not** use an online database, CMS, authentication service, or runtime content API for its catalog.

All FilmIndex knowledge data is version-controlled with the application and shipped as part of the website build. The current source of truth is the typed dataset in `lib/data.ts` together with the TypeScript contracts in `types/index.ts`.

This includes:

- film specifications and editorial characteristics
- camera specifications
- technique articles
- source/provenance metadata
- image attribution metadata
- search and compare records

Pages, filters, search, related-content lookup, and comparison operate directly on this bundled dataset. Updates are made through normal Git commits and reviewed through pull requests, so every content change has version history.

Future dataset growth should remain file-based. If the catalog becomes large, split it into domain modules such as `data/films.ts`, `data/cameras.ts`, `data/techniques.ts`, and `data/sources.ts` or generated static JSON. Do not introduce Supabase or another hosted database unless the product direction is explicitly changed later.

## Images

Real photographs may be referenced from external archival/manufacturer sources when their usage terms allow it. Every image record must store its source page, creator when known, license/status, attribution requirement, and alt text.

Where redistribution is permitted and repository size remains reasonable, images may instead be stored under `public/` so they ship with the site. Do not copy or self-host an image unless its license allows redistribution.

## Local user state

Browser storage may be used only for user-side preferences such as:

- theme
- recent searches
- recently viewed entries
- compare selections

No account or server-side persistence is required.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Image policy

Every external image record stores its source page, creator, license/status, attribution requirement, and alt text. Never fabricate attribution and do not add imagery with unclear provenance as if it were freely licensed.
