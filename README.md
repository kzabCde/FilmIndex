# FilmIndex

FilmIndex is a modern analog photography knowledge database for films, cameras, techniques, search, and comparison.

## v0.1.0 scope

- Films
- Cameras
- Techniques
- Global Search
- Compare

The app uses authentic external photography with explicit provenance and attribution metadata. Subjective film characteristics are labeled as editorial guidance and kept separate from factual specifications.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Data architecture

The current branch ships with typed seed data so the UI is immediately usable. `supabase/migrations/0001_initial.sql` defines the production-ready relational schema for moving seed content into Supabase without changing the page contracts.

## Image policy

Every external image record stores its source page, creator, license, attribution requirement, and alt text. Do not add images with unclear provenance.
