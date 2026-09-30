import { filmSamples as baseFilmSamples } from "@/data/film-samples";
import { wave2FilmSamples } from "@/data/film-samples-wave2";
import { wave3FilmSamples } from "@/data/film-samples-wave3";
import { wave4FilmSamples } from "@/data/film-samples-wave4";
import { wave5FilmSamples } from "@/data/film-samples-wave5";

export const filmSamples = {
  ...baseFilmSamples,
  ...wave2FilmSamples,
  ...wave3FilmSamples,
  ...wave4FilmSamples,
  ...wave5FilmSamples,
};
