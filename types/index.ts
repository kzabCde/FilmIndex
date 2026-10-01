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
  descriptionTh?: string;
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
  descriptionTh?: string;
  image: ImageCredit;
};

export type Lens = {
  kind: "lens";
  slug: string;
  name: string;
  brand: string;
  mount: string;
  focalLength: string;
  maxAperture: string;
  focusType: "Manual" | "Autofocus";
  coverage: "35mm" | "645" | "6x6" | "6x7";
  minFocusM?: number;
  filterThread?: string;
  weight?: string;
  description: string;
  descriptionTh?: string;
  image?: ImageCredit;
  imageMatch?: "exact" | "representative";
};

export type Technique = {
  kind: "technique";
  slug: string;
  name: string;
  nameTh?: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  summary: string;
  summaryTh?: string;
  sections: { heading: string; body: string }[];
  sectionsTh?: { heading: string; body: string }[];
  image?: ImageCredit;
};

export type SearchEntity = Film | Camera | Lens | Technique;