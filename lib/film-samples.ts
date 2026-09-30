import { filmSamples as baseFilmSamples } from "@/data/film-samples";
import { wave2FilmSamples } from "@/data/film-samples-wave2";
import { wave3FilmSamples } from "@/data/film-samples-wave3";

export const filmSamples = {
  ...baseFilmSamples,
  ...wave2FilmSamples,
  ...wave3FilmSamples,
};
