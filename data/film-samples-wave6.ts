import { wave6Films } from "@/data/films-wave6";
import type { ImageCredit } from "@/types";

export const wave6FilmSamples = Object.fromEntries(
  wave6Films.map((film) => [film.slug, film.image ? [film.image] : []]),
) as Record<string, ImageCredit[]>;
