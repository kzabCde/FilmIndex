import { wave9Films } from "@/data/films-wave9";
import type { ImageCredit } from "@/types";

export const wave9FilmSamples = Object.fromEntries(
  wave9Films.map((film) => [film.slug, film.image ? [film.image] : []]),
) as Record<string, ImageCredit[]>;
