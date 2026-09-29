import type { Film } from "@/types";

export type LightPreference = "any" | "bright" | "mixed" | "low";
export type FilmFamilyPreference = "any" | "color" | "bw" | "slide";
export type GrainPreference = "any" | "fine" | "balanced" | "visible";

export type FilmFinderPreferences = {
  use: string;
  light: LightPreference;
  family: FilmFamilyPreference;
  grain: GrainPreference;
};

export type FilmMatch = {
  film: Film;
  score: number;
  reasons: string[];
};

const normalizedGrain = (film: Film) => (film.characteristics.Grain ?? "").toLowerCase();

function familyMatches(film: Film, family: FilmFamilyPreference) {
  if (family === "any") return true;
  if (family === "color") return film.filmType === "Color Negative";
  if (family === "bw") return film.filmType === "Black & White";
  return film.filmType === "Slide / Reversal";
}

function lightScore(film: Film, light: LightPreference) {
  if (light === "any") return 0;
  if (light === "bright") return film.iso <= 200 ? 4 : film.iso <= 400 ? 2 : 0;
  if (light === "mixed") return film.iso >= 200 && film.iso <= 800 ? 4 : 1;
  return film.iso >= 800 ? 5 : film.iso >= 400 ? 4 : film.iso >= 200 ? 1 : 0;
}

function grainScore(film: Film, grain: GrainPreference) {
  if (grain === "any") return 0;
  const value = normalizedGrain(film);
  if (grain === "fine") return value.includes("fine") ? 4 : 0;
  if (grain === "balanced") return value.includes("medium") ? 4 : value.includes("fine") ? 2 : 1;
  return value.includes("high") || value.includes("coarse") ? 4 : value.includes("medium") ? 2 : 0;
}

export function scoreFilms(films: Film[], preferences: FilmFinderPreferences): FilmMatch[] {
  return films
    .filter((film) => familyMatches(film, preferences.family))
    .map((film) => {
      let score = 0;
      const reasons: string[] = [];

      if (preferences.use && film.uses.some((use) => use.toLowerCase() === preferences.use.toLowerCase())) {
        score += 6;
        reasons.push("use");
      }

      const light = lightScore(film, preferences.light);
      if (light > 0) {
        score += light;
        reasons.push("light");
      }

      const grain = grainScore(film, preferences.grain);
      if (grain > 0) {
        score += grain;
        reasons.push("grain");
      }

      if (preferences.family !== "any") {
        score += 3;
        reasons.push("family");
      }

      return { film, score, reasons };
    })
    .sort((a, b) => b.score - a.score || a.film.iso - b.film.iso || a.film.name.localeCompare(b.film.name));
}

export function relatedFilms(target: Film, films: Film[], limit = 4): FilmMatch[] {
  return films
    .filter((film) => film.slug !== target.slug)
    .map((film) => {
      let score = 0;
      const reasons: string[] = [];

      if (film.filmType === target.filmType) {
        score += 5;
        reasons.push("family");
      }
      if (film.process === target.process) {
        score += 2;
        reasons.push("process");
      }

      const sharedUses = film.uses.filter((use) => target.uses.includes(use)).length;
      if (sharedUses) {
        score += Math.min(sharedUses * 2, 6);
        reasons.push("use");
      }

      const isoRatio = Math.max(film.iso, target.iso) / Math.max(1, Math.min(film.iso, target.iso));
      if (isoRatio <= 2) {
        score += 4;
        reasons.push("speed");
      } else if (isoRatio <= 4) {
        score += 2;
      }

      if (normalizedGrain(film) === normalizedGrain(target)) {
        score += 2;
        reasons.push("grain");
      }

      return { film, score, reasons };
    })
    .sort((a, b) => b.score - a.score || Math.abs(a.film.iso - target.iso) - Math.abs(b.film.iso - target.iso))
    .slice(0, limit);
}
