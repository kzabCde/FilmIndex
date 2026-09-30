import { wave5Films } from "@/data/films-wave5";
import type { ImageCredit } from "@/types";

export const wave5FilmSamples = Object.fromEntries(
  wave5Films.map((film) => [film.slug, film.image ? [film.image] : []]),
) as Record<string, ImageCredit[]>;
