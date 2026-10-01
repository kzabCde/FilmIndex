import { cameras as baseCameras, films as baseFilms, techniques as baseTechniques } from "@/lib/data";
import { extraCameras } from "@/data/cameras-extra";
import { wave2Cameras } from "@/data/cameras-wave2";
import { wave2CamerasB } from "@/data/cameras-wave2b";
import { wave3Cameras } from "@/data/cameras-wave3";
import { wave4Cameras } from "@/data/cameras-wave4";
import { wave5Cameras } from "@/data/cameras-wave5";
import { wave6Cameras } from "@/data/cameras-wave6";
import { wave7Cameras } from "@/data/cameras-wave7";
import { wave8Cameras } from "@/data/cameras-wave8";
import { wave9Cameras } from "@/data/cameras-wave9";
import { wave10Cameras } from "@/data/cameras-wave10";
import { compactWave1Cameras } from "@/data/cameras-compact-wave1";
import { compactWave2Cameras } from "@/data/cameras-compact-wave2";
import { compactWave3Cameras } from "@/data/cameras-compact-wave3";
import { compactWave4Cameras } from "@/data/cameras-compact-wave4";
import { extraFilms } from "@/data/films-extra";
import { wave2Films } from "@/data/films-wave2";
import { wave2FilmsB } from "@/data/films-wave2b";
import { wave3Films } from "@/data/films-wave3";
import { wave4Films } from "@/data/films-wave4";
import { wave5Films } from "@/data/films-wave5";
import { wave6Films } from "@/data/films-wave6";
import { wave7Films } from "@/data/films-wave7";
import { wave8Films } from "@/data/films-wave8";
import { wave9Films } from "@/data/films-wave9";
import { wave10Films } from "@/data/films-wave10";
import { wave11Films } from "@/data/films-wave11";
import { extraTechniques } from "@/data/techniques-extra";
import { techniqueGuides } from "@/data/technique-guides";
import { lenses as baseLenses } from "@/data/lenses";
import { wave8Lenses } from "@/data/lenses-wave8";
import { lensImages } from "@/data/lens-images";
import { withProvenance } from "@/data/catalog-provenance";
import { normalizeCameraType, COMPACT_CAMERA_TYPE } from "@/lib/camera-types";
import { filmSamples } from "@/lib/film-samples";
import type { SearchEntity } from "@/types";

const rawFilms = [...baseFilms, ...extraFilms, ...wave2Films, ...wave2FilmsB, ...wave3Films, ...wave4Films, ...wave5Films, ...wave6Films, ...wave7Films, ...wave8Films, ...wave9Films, ...wave10Films, ...wave11Films];
export const films = rawFilms.map((film) => withProvenance(film));

const cameraSourceGroups = [
  ["lib/data", baseCameras],
  ["cameras-extra", extraCameras],
  ["cameras-wave2", wave2Cameras],
  ["cameras-wave2b", wave2CamerasB],
  ["cameras-wave3", wave3Cameras],
  ["cameras-wave4", wave4Cameras],
  ["cameras-wave5", wave5Cameras],
  ["cameras-wave6", wave6Cameras],
  ["cameras-wave7", wave7Cameras],
  ["cameras-wave8", wave8Cameras],
  ["cameras-wave9", wave9Cameras],
  ["cameras-compact-wave1", compactWave1Cameras],
  ["cameras-compact-wave2", compactWave2Cameras],
  ["cameras-compact-wave3", compactWave3Cameras],
  ["cameras-compact-wave4", compactWave4Cameras],
  ["cameras-wave10", wave10Cameras],
] as const;

const cameraSlugSources = new Map<string, string[]>();
for (const [sourceName, records] of cameraSourceGroups) {
  for (const record of records) {
    const locations = cameraSlugSources.get(record.slug) ?? [];
    locations.push(sourceName);
    cameraSlugSources.set(record.slug, locations);
  }
}
const duplicateCameraSources = [...cameraSlugSources.entries()].filter(([, locations]) => locations.length > 1);
if (duplicateCameraSources.length) {
  throw new Error(`FilmIndex camera source regression: ${duplicateCameraSources.map(([slug, locations]) => `${slug} [${locations.join(" + ")}]`).join(", ")}.`);
}

const rawCameras = cameraSourceGroups.flatMap(([, records]) => records);
export const cameras = rawCameras.map((camera) => withProvenance({
  ...camera,
  cameraType: normalizeCameraType(camera.cameraType),
}));

export const techniques = [...baseTechniques, ...extraTechniques];

const rawLenses = [...baseLenses, ...wave8Lenses];
const lensFallbackSlugByMount = new Map<string, string>();
for (const lens of baseLenses) {
  if (lensImages[lens.slug] && !lensFallbackSlugByMount.has(lens.mount)) {
    lensFallbackSlugByMount.set(lens.mount, lens.slug);
  }
}

export const lenses = rawLenses.map((lens) => {
  const exactMedia = lensImages[lens.slug];
  const fallbackSlug = lensFallbackSlugByMount.get(lens.mount);
  const media = exactMedia ?? (fallbackSlug ? lensImages[fallbackSlug] : undefined);
  return withProvenance({
    ...lens,
    image: media?.image,
    imageMatch: exactMedia?.match ?? (media ? "representative" : undefined),
  });
});

export const allEntities: SearchEntity[] = [...films, ...cameras, ...lenses, ...techniques];

export const catalogStats = {
  films: films.length,
  cameras: cameras.length,
  lenses: lenses.length,
  techniques: techniques.length,
} as const;

const qualityRecords = [...films, ...cameras, ...lenses];
export const catalogQualityStats = {
  verified: qualityRecords.filter((record) => record.provenance.confidence === "verified").length,
  communityReference: qualityRecords.filter((record) => record.provenance.confidence === "community-reference").length,
  incomplete: qualityRecords.filter((record) => record.provenance.confidence === "incomplete").length,
  sourceCoverage: qualityRecords.filter((record) => record.provenance.sources.length > 0).length,
  total: qualityRecords.length,
} as const;

const minimums = { films: 105, cameras: 130, lenses: 100, techniques: 15 } as const;
for (const key of Object.keys(minimums) as Array<keyof typeof minimums>) {
  if (catalogStats[key] < minimums[key]) {
    throw new Error(`FilmIndex catalog regression: ${key} has ${catalogStats[key]} entries; catalog expansion requires at least ${minimums[key]}.`);
  }
}

for (const [kind, records] of [["film", films], ["camera", cameras], ["lens", lenses]] as const) {
  const seen = new Set<string>();
  const duplicates = records.filter((record) => seen.has(record.slug) || !seen.add(record.slug));
  if (duplicates.length) {
    throw new Error(`FilmIndex ${kind} slug regression: duplicate slugs ${duplicates.map((record) => record.slug).join(", ")}.`);
  }

  const missingSources = records.filter((record) => !record.provenance.sources.length);
  if (missingSources.length) {
    throw new Error(`FilmIndex ${kind} provenance regression: missing sources for ${missingSources.map((record) => record.slug).join(", ")}.`);
  }

  const missingVerificationDate = records.filter((record) => !/^\d{4}-\d{2}-\d{2}$/.test(record.provenance.lastVerified));
  if (missingVerificationDate.length) {
    throw new Error(`FilmIndex ${kind} provenance regression: invalid lastVerified date for ${missingVerificationDate.map((record) => record.slug).join(", ")}.`);
  }

  const falselyVerified = records.filter((record) => record.provenance.confidence === "verified" && !record.provenance.sources.some((item) => item.scope === "model" || item.scope === "manual"));
  if (falselyVerified.length) {
    throw new Error(`FilmIndex ${kind} verification regression: verified records require a model/manual source (${falselyVerified.map((record) => record.slug).join(", ")}).`);
  }
}

const compactCameraCount = cameras.filter((camera) => camera.cameraType === COMPACT_CAMERA_TYPE).length;
const minimumCompactCameras = 28;
if (compactCameraCount < minimumCompactCameras) {
  throw new Error(`FilmIndex compact-camera regression: expected at least ${minimumCompactCameras} Compact cameras, found ${compactCameraCount}.`);
}

const legacyPointAndShootCount = cameras.filter((camera) => camera.cameraType === "Point & Shoot").length;
if (legacyPointAndShootCount > 0) {
  throw new Error(`FilmIndex camera-type migration regression: ${legacyPointAndShootCount} Point & Shoot records remain after Compact normalization.`);
}

const filmsWithoutSamples = films.filter((film) => !filmSamples[film.slug]?.length);
if (filmsWithoutSamples.length) {
  throw new Error(`FilmIndex sample-image regression: missing real sample photographs for ${filmsWithoutSamples.map((film) => film.slug).join(", ")}.`);
}

const techniquesWithoutGuides = techniques.filter((technique) => !techniqueGuides[technique.slug]);
if (techniquesWithoutGuides.length) {
  throw new Error(`FilmIndex technique-guide regression: missing practical guides for ${techniquesWithoutGuides.map((technique) => technique.slug).join(", ")}.`);
}

const lensesWithoutImages = lenses.filter((lens) => !lens.image);
if (lensesWithoutImages.length) {
  throw new Error(`FilmIndex lens-image regression: missing sourced lens media for ${lensesWithoutImages.map((lens) => lens.slug).join(", ")}.`);
}

export function findBySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug);
}
