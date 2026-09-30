import { wave8Films } from "@/data/films-wave8";
import type { ImageCredit } from "@/types";

export const wave8FilmSamples = Object.fromEntries(
  wave8Films.map((film) => [film.slug, film.image ? [film.image] : []]),
) as Record<string, ImageCredit[]>;
