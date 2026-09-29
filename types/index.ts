export type ImageCredit = {
  url: string;
  sourceName: string;
  sourceUrl: string;
  creator: string;
  license: string;
  attributionRequired: boolean;
  alt: string;
};

export type Film = {
  kind: "film";
  slug: string;
  name: string;
  brand: string;
  iso: number;
  filmType: string;
  process: string;
  formats: string[];
  description: string;
  characteristics: Record<string, string>;
  uses: string[];
  image?: ImageCredit;
};

export type Camera = {
  kind: "camera";
  slug: string;
  name: string;
  brand: string;
  releaseYear: number;
  cameraType: string;
  filmFormat: string;
  lensMount: string;
  shutter: string;
  shutterSpeed: string;
  metering: string;
  exposureModes: string[];
  battery: string;
  weight: string;
  flashSync: string;
  description: string;
  image: ImageCredit;
};

export type Technique = {
  kind: "technique";
  slug: string;
  name: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  summary: string;
  sections: { heading: string; body: string }[];
  image?: ImageCredit;
};

export type SearchEntity = Film | Camera | Technique;
