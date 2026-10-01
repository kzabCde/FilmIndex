import type { ImageCredit } from "@/types";

const commonsFile = (name: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=1800`;
const commonsSource = (name: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name).replaceAll("%20", "_")}`;

const sample = (name: string, creator: string, license: string, alt: string): ImageCredit => ({
  url: commonsFile(name),
  sourceName: "Wikimedia Commons",
  sourceUrl: commonsSource(name),
  creator,
  license,
  attributionRequired: license !== "Public Domain" && license !== "CC0 1.0",
  alt,
});

export const wave11FilmSamples: Record<string, ImageCredit[]> = {
  "kodak-ektapan-100": [sample(
    "Lauritsalan kirkko.jpg",
    "Tommi Nummelin",
    "CC BY-SA 3.0",
    "EKTAPAN 100 emulsion-family reference: photograph made on Kodak T-MAX 100, the film also distributed by Eastman Kodak under the EKTAPAN 100 name in 2026",
  )],
};
