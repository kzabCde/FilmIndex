import { cameras as baseCameras, films as baseFilms, techniques as baseTechniques } from "@/lib/data";
import { extraCameras } from "@/data/cameras-extra";
import { extraFilms } from "@/data/films-extra";
import { filmSamples } from "@/data/film-samples";
import { extraTechniques } from "@/data/techniques-extra";
import type { SearchEntity } from "@/types";

export const films = [...baseFilms, ...extraFilms];
export const cameras = [...baseCameras, ...extraCameras];
export const techniques = [...baseTechniques, ...extraTechniques];
export const allEntities: SearchEntity[] = [...films, ...cameras, ...techniques];

export const catalogStats = {
  films: films.length,
  cameras: cameras.length,
  techniques: techniques.length,
} as const;

const minimums = { films: 20, cameras: 20, techniques: 15 } as const;
for (const key of Object.keys(minimums) as Array<keyof typeof minimums>) {
  if (catalogStats[key] < minimums[key]) {
    throw new Error(`FilmIndex catalog regression: ${key} has ${catalogStats[key]} entries; v0.1.0 requires at least ${minimums[key]}.`);
  }
}

const filmsWithoutSamples = films.filter((film) => !filmSamples[film.slug]?.length);
if (filmsWithoutSamples.length) {
  throw new Error(`FilmIndex sample-image regression: missing real sample photographs for ${filmsWithoutSamples.map((film) => film.slug).join(", ")}.`);
}

export function findBySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug);
}
