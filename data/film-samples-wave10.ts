import { wave10Films } from "@/data/films-wave10";
import type { ImageCredit } from "@/types";

export const wave10FilmSamples = Object.fromEntries(
  wave10Films.map((film) => [film.slug, film.image ? [film.image] : []]),
) as Record<string, ImageCredit[]>;
