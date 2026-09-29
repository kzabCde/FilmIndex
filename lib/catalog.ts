import { cameras as baseCameras, films as baseFilms, techniques as baseTechniques } from "@/lib/data";
import { extraCameras } from "@/data/cameras-extra";
import { extraFilms } from "@/data/films-extra";
import { extraTechniques } from "@/data/techniques-extra";
import type { SearchEntity } from "@/types";

export const films = [...baseFilms, ...extraFilms];
export const cameras = [...baseCameras, ...extraCameras];
export const techniques = [...baseTechniques, ...extraTechniques];
export const allEntities: SearchEntity[] = [...films, ...cameras, ...techniques];

export function findBySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug);
}
