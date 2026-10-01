export type ImageCredit = {
  url: string;
  sourceName: string;
  sourceUrl: string;
  creator: string;
  license: string;
  attributionRequired: boolean;
  alt: string;
};

export type RecordSourceScope = "model" | "manual" | "series" | "brand-catalog" | "community" | "image";

export type RecordSource = {
  label: string;
  publisher: string;
  url: string;
  scope: RecordSourceScope;
};

export type RecordConfidence = "verified" | "community-reference" | "incomplete";
export type ProductStatus = "current" | "discontinued" | "historical" | "unknown";

export type RecordProvenance = {
  confidence: RecordConfidence;
  lastVerified: string;
  productStatus: ProductStatus;
  sources: RecordSource[];
  introducedYear?: number;
  productionYears?: { from?: number; to?: number | null };
  countryOfManufacture?: string;
  generation?: string;
  variants?: string[];
  notes?: string[];
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
  provenance?: RecordProvenance;
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
  provenance?: RecordProvenance;
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
  provenance?: RecordProvenance;
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
