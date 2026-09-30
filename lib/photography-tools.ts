export const APERTURE_STOPS = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22] as const;

export const SHUTTER_OPTIONS = [
  { label: "1/8000s", seconds: 1 / 8000 },
  { label: "1/4000s", seconds: 1 / 4000 },
  { label: "1/2000s", seconds: 1 / 2000 },
  { label: "1/1000s", seconds: 1 / 1000 },
  { label: "1/500s", seconds: 1 / 500 },
  { label: "1/250s", seconds: 1 / 250 },
  { label: "1/125s", seconds: 1 / 125 },
  { label: "1/60s", seconds: 1 / 60 },
  { label: "1/30s", seconds: 1 / 30 },
  { label: "1/15s", seconds: 1 / 15 },
  { label: "1/8s", seconds: 1 / 8 },
  { label: "1/4s", seconds: 1 / 4 },
  { label: "1/2s", seconds: 1 / 2 },
  { label: "1s", seconds: 1 },
  { label: "2s", seconds: 2 },
  { label: "4s", seconds: 4 },
  { label: "8s", seconds: 8 },
  { label: "15s", seconds: 15 },
  { label: "30s", seconds: 30 },
] as const;

export type ExposureInput = {
  iso: number;
  aperture: number;
  shutterSeconds: number;
};

export function calculateEv100({ iso, aperture, shutterSeconds }: ExposureInput) {
  const safeIso = Math.max(1, iso);
  const safeAperture = Math.max(0.1, aperture);
  const safeShutter = Math.max(1 / 100000, shutterSeconds);
  const evAtIso = Math.log2((safeAperture * safeAperture) / safeShutter);
  return evAtIso - Math.log2(safeIso / 100);
}

export function calculateEquivalentExposures(input: ExposureInput) {
  const ev100 = calculateEv100(input);
  const evAtIso = ev100 + Math.log2(Math.max(1, input.iso) / 100);

  return APERTURE_STOPS.map((aperture) => {
    const shutterSeconds = (aperture * aperture) / Math.pow(2, evAtIso);
    return { aperture, shutterSeconds };
  });
}

export function formatShutter(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "—";
  if (seconds >= 1) {
    if (seconds >= 10) return `${Math.round(seconds)}s`;
    return `${Math.round(seconds * 10) / 10}s`;
  }
  return `1/${Math.max(1, Math.round(1 / seconds))}s`;
}

export function calculateReciprocityCorrection(meteredSeconds: number, exponent: number) {
  const safeTime = Math.max(0.001, meteredSeconds);
  const safeExponent = Math.min(2, Math.max(1, exponent));
  const correctedSeconds = safeTime <= 1 ? safeTime : Math.pow(safeTime, safeExponent);
  const compensationStops = Math.log2(correctedSeconds / safeTime);
  return { correctedSeconds, compensationStops };
}

export const FILM_FORMATS = {
  "35mm": { label: "35mm", cocMm: 0.03 },
  "645": { label: "645", cocMm: 0.045 },
  "6x6": { label: "6×6", cocMm: 0.045 },
  "6x7": { label: "6×7", cocMm: 0.05 },
  "4x5": { label: "4×5", cocMm: 0.1 },
} as const;

export type FilmFormatKey = keyof typeof FILM_FORMATS;

export function calculateDepthOfField({
  focalLengthMm,
  aperture,
  subjectDistanceM,
  format,
}: {
  focalLengthMm: number;
  aperture: number;
  subjectDistanceM: number;
  format: FilmFormatKey;
}) {
  const f = Math.max(1, focalLengthMm);
  const n = Math.max(0.7, aperture);
  const s = Math.max(f + 1, subjectDistanceM * 1000);
  const c = FILM_FORMATS[format].cocMm;
  const hyperfocalMm = (f * f) / (n * c) + f;
  const nearMm = (hyperfocalMm * s) / (hyperfocalMm + (s - f));
  const farDenominator = hyperfocalMm - (s - f);
  const farMm = farDenominator <= 0 ? Number.POSITIVE_INFINITY : (hyperfocalMm * s) / farDenominator;

  return {
    hyperfocalM: hyperfocalMm / 1000,
    nearM: nearMm / 1000,
    farM: Number.isFinite(farMm) ? farMm / 1000 : Number.POSITIVE_INFINITY,
    totalM: Number.isFinite(farMm) ? Math.max(0, (farMm - nearMm) / 1000) : Number.POSITIVE_INFINITY,
  };
}

export function calculateFilmCost({
  filmPrice,
  developCost,
  scanCost,
  otherCost,
  frames,
}: {
  filmPrice: number;
  developCost: number;
  scanCost: number;
  otherCost: number;
  frames: number;
}) {
  const total = Math.max(0, filmPrice) + Math.max(0, developCost) + Math.max(0, scanCost) + Math.max(0, otherCost);
  const safeFrames = Math.max(1, Math.round(frames));
  return { total, costPerFrame: total / safeFrames };
}

export const SCAN_FORMATS = {
  "35mm": { label: "35mm", widthMm: 36, heightMm: 24 },
  "half-frame": { label: "Half-frame", widthMm: 24, heightMm: 18 },
  "645": { label: "645", widthMm: 56, heightMm: 41.5 },
  "6x6": { label: "6×6", widthMm: 56, heightMm: 56 },
  "6x7": { label: "6×7", widthMm: 70, heightMm: 56 },
  "6x9": { label: "6×9", widthMm: 84, heightMm: 56 },
  "4x5": { label: "4×5", widthMm: 127, heightMm: 101.6 },
} as const;

export type ScanFormatKey = keyof typeof SCAN_FORMATS;

export function calculateScanResolution(format: ScanFormatKey, dpi: number) {
  const target = SCAN_FORMATS[format];
  const safeDpi = Math.max(72, dpi);
  const widthPx = Math.round((target.widthMm / 25.4) * safeDpi);
  const heightPx = Math.round((target.heightMm / 25.4) * safeDpi);
  const pixels = widthPx * heightPx;
  return {
    widthPx,
    heightPx,
    megapixels: pixels / 1_000_000,
    rgb8Mb: (pixels * 3) / (1024 * 1024),
    rgb16Mb: (pixels * 6) / (1024 * 1024),
  };
}
