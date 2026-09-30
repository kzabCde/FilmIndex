import { wave3Films } from "@/data/films-wave3";
import type { ImageCredit } from "@/types";

export const wave3FilmSamples = Object.fromEntries(
  wave3Films.map((film) => [film.slug, film.image ? [film.image] : []]),
) as Record<string, ImageCredit[]>;
