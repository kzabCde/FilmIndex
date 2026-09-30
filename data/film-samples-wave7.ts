import { wave7Films } from "@/data/films-wave7";
import type { ImageCredit } from "@/types";

export const wave7FilmSamples = Object.fromEntries(
  wave7Films.map((film) => [film.slug, film.image ? [film.image] : []]),
) as Record<string, ImageCredit[]>;
