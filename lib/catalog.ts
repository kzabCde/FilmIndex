import { cameras as baseCameras, films as baseFilms, techniques as baseTechniques } from "@/lib/data";
import { extraCameras } from "@/data/cameras-extra";
import { wave2Cameras } from "@/data/cameras-wave2";
import { wave2CamerasB } from "@/data/cameras-wave2b";
import { wave3Cameras } from "@/data/cameras-wave3";
import { wave4Cameras } from "@/data/cameras-wave4";
import { wave5Cameras } from "@/data/cameras-wave5";
import { wave6Cameras } from "@/data/cameras-wave6";
import { wave7Cameras } from "@/data/cameras-wave7";
import { extraFilms } from "@/data/films-extra";
import { wave2Films } from "@/data/films-wave2";
import { wave2FilmsB } from "@/data/films-wave2b";
import { wave3Films } from "@/data/films-wave3";
import { wave4Films } from "@/data/films-wave4";
import { wave5Films } from "@/data/films-wave5";
import { wave6Films } from "@/data/films-wave6";
import { wave7Films } from "@/data/films-wave7";
import { extraTechniques } from "@/data/techniques-extra";
import { filmSamples } from "@/lib/film-samples";
import type { SearchEntity } from "@/types";

export const films = [...baseFilms, ...extraFilms, ...wave2Films, ...wave2FilmsB, ...wave3Films, ...wave4Films, ...wave5Films, ...wave6Films, ...wave7Films];
export const cameras = [...baseCameras, ...extraCameras, ...wave2Cameras, ...wave2CamerasB, ...wave3Cameras, ...wave4Cameras, ...wave5Cameras, ...wave6Cameras, ...wave7Cameras];
export const techniques = [...baseTechniques, ...extraTechniques];
export const allEntities: SearchEntity[] = [...films, ...cameras, ...techniques];

export const catalogStats = {
  films: films.length,
  cameras: cameras.length,
  techniques: techniques.length,
} as const;

const minimums = { films: 80, cameras: 80, techniques: 15 } as const;
for (const key of Object.keys(minimums) as Array<keyof typeof minimums>) {
  if (catalogStats[key] < minimums[key]) {
    throw new Error(`FilmIndex catalog regression: ${key} has ${catalogStats[key]} entries; catalog expansion requires at least ${minimums[key]}.`);
  }
}

const filmsWithoutSamples = films.filter((film) => !filmSamples[film.slug]?.length);
if (filmsWithoutSamples.length) {
  throw new Error(`FilmIndex sample-image regression: missing real sample photographs for ${filmsWithoutSamples.map((film) => film.slug).join(", ")}.`);
}

export function findBySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug);
}
