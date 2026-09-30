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

export const wave2FilmSamples: Record<string, ImageCredit[]> = {
  "kodak-tri-x-400": [sample(
    "Parque Ibirapuera São Paulo MINOLTA SRT-101 Kodak TRI-X 2024-000017470013.jpg",
    "Wikimedia Commons contributor (see source page)",
    "See source page",
    "Ibirapuera Park photographed on Kodak Tri-X film",
  )],
  "kodak-tmax-100": [sample(
    "Glimmer Glass Bridge in the Closed Position.jpg",
    "RollerFanatic000",
    "CC BY-SA 4.0",
    "Glimmer Glass Bridge photographed on Kodak T-Max 100",
  )],
  "kodak-tmax-400": [sample(
    "Brilliant Bend - Flickr - incidencematrix.jpg",
    "incidencematrix",
    "See source page",
    "Carnivorous plant photographed on Kodak T-Max 400 at EI 1600",
  )],
  "ilford-xp2-super": [sample(
    "Full Length shot of The Statue of Unity.jpg",
    "Veera.sj",
    "CC0 1.0",
    "Statue of Unity photographed on Ilford XP2 Super",
  )],
  "fujifilm-provia-100f": [sample(
    "JT17M.jpg",
    "Doug Dolde",
    "Public Domain",
    "Joshua Tree National Park photographed on Fujifilm Provia 100F",
  )],
  "fomapan-400-action": [sample(
    "Boulevard Leopold II.jpg",
    "kishjar?",
    "CC BY 2.0",
    "Boulevard Leopold II photographed on Fomapan 400",
  )],
  "ilford-ortho-plus-80": [sample(
    "Te Huia SRV5893, Hamilton Frankton, Ilford Ortho 80, 2023-11-23.jpg",
    "Sleeps-Darkly",
    "CC BY-SA 4.0",
    "Te Huia train photographed on Ilford Ortho Plus 80",
  )],
  "ilford-sfx-200": [sample(
    "Bozcaada Ilford sfx 200 00068.jpg",
    "Nevit Dilmen",
    "CC BY-SA 3.0",
    "Bozcaada photographed on Ilford SFX 200",
  )],
  "fomapan-200-creative": [sample(
    "5 Hamburg Hafen 190918 IIIc Summitar 5cm Fomapan200.jpg",
    "NAC",
    "CC BY-SA 4.0",
    "Hamburg harbor photographed on Fomapan 200",
  )],
  "fujifilm-c200": [sample(
    "Dhaka bus 3 october 2012.jpg",
    "Sudipta Arka Das",
    "CC BY-SA 2.0",
    "Buses in Dhaka photographed on Fujicolor C200",
  )],
};
