import { wave4Films } from "@/data/films-wave4";
import type { ImageCredit } from "@/types";

export const wave4FilmSamples = Object.fromEntries(
  wave4Films.map((film) => [film.slug, film.image ? [film.image] : []]),
) as Record<string, ImageCredit[]>;
