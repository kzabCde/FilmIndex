import { findMountByName, mountAdapters, mounts } from "@/data/mounts";
import type { Camera, Film, Lens } from "@/types";

export type CompatibilityStatus = "native" | "adapter" | "fixed-lens" | "not-compatible";

export function normalizeMount(value: string) {
  const source = value.trim();
  const lower = source.toLowerCase();
  if (!source) return "Unknown";
  if (lower.includes("fixed") || lower.includes("built-in") || lower.includes("integrated") || lower.includes("non-interchangeable")) return "Fixed lens";

  const exact = findMountByName(source);
  if (exact) return exact.name;

  if (lower.includes("canon ef")) return "Canon EF";
  if (lower.includes("canon fd") || lower === "fd") return "Canon FD";
  if (lower.includes("nikon f")) return "Nikon F";
  if (lower.includes("m42")) return "M42";
  if (lower.includes("pentax 67") || lower.includes("pentax 6x7") || lower.includes("pentax 6×7")) return "Pentax 67";
  if (lower.includes("pentax 645")) return "Pentax 645";
  if (lower.includes("pentax k") || lower.includes("kaf") || lower.includes("k-a")) return "Pentax K";
  if (lower.includes("minolta") && (lower.includes("sr") || lower.includes("md") || lower.includes("mc"))) return "Minolta SR";
  if (lower.includes("olympus om") || lower === "om") return "Olympus OM";
  if (lower.includes("leica m") || lower.includes("m-compatible")) return "Leica M";
  if (lower.includes("contax g")) return "Contax G";
  if (lower.includes("contax") || lower.includes("yashica") || lower === "c/y") return "Contax/Yashica";
  if (lower.includes("mamiya 645")) return "Mamiya 645";
  if (lower.includes("hasselblad") && lower.includes("v")) return "Hasselblad V";
  return source;
}

export function getMountRecord(value: string) {
  const normalized = normalizeMount(value);
  return mounts.find((mount) => mount.name === normalized);
}

export function getAdapterPath(lensMount: string, cameraMount: string) {
  const from = normalizeMount(lensMount);
  const to = normalizeMount(cameraMount);
  return mountAdapters.find((adapter) => adapter.fromMount === from && adapter.toMount === to);
}

function cameraFormatFamily(camera: Camera) {
  const value = camera.filmFormat.toLowerCase();
  if (value.includes("35")) return "35mm";
  if (value.includes("645") || value.includes("6x4.5") || value.includes("6×4.5")) return "645";
  if (value.includes("6x6") || value.includes("6×6")) return "6x6";
  if (value.includes("6x7") || value.includes("6×7") || value.includes("6x8") || value.includes("6×8") || value.includes("6x9") || value.includes("6×9")) return "6x7";
  if (value.includes("120")) return "120";
  return camera.filmFormat;
}

function coverageRank(value: string) {
  if (value === "35mm") return 1;
  if (value === "645") return 2;
  if (value === "6x6") return 3;
  if (value === "6x7") return 4;
  return 0;
}

function formatCanUseLens(camera: Camera, lens: Lens) {
  const cameraFormat = cameraFormatFamily(camera);
  if (cameraFormat === "120") return true;
  const cameraRank = coverageRank(cameraFormat);
  const lensRank = coverageRank(lens.coverage);
  if (!cameraRank || !lensRank) return true;
  return lensRank >= cameraRank;
}

export function checkCameraLensCompatibility(camera: Camera, lens: Lens) {
  const cameraMount = normalizeMount(camera.lensMount);
  const lensMount = normalizeMount(lens.mount);

  if (cameraMount === "Fixed lens") {
    return {
      status: "fixed-lens" as CompatibilityStatus,
      cameraMount,
      lensMount,
      note: "This camera has a built-in/fixed lens and does not accept interchangeable lenses.",
      adapter: undefined,
    };
  }

  if (cameraMount === lensMount) {
    if (!formatCanUseLens(camera, lens)) {
      return {
        status: "not-compatible" as CompatibilityStatus,
        cameraMount,
        lensMount,
        note: "The physical mount family matches, but the recorded lens image-circle coverage is too small for this camera format.",
        adapter: undefined,
      };
    }
    return {
      status: "native" as CompatibilityStatus,
      cameraMount,
      lensMount,
      note: "Native mount family match. Meter coupling, aperture automation, autofocus, mirror clearance, and feature support can still vary by body/lens generation.",
      adapter: undefined,
    };
  }

  const adapter = getAdapterPath(lensMount, cameraMount);
  if (adapter && formatCanUseLens(camera, lens)) {
    return {
      status: "adapter" as CompatibilityStatus,
      cameraMount,
      lensMount,
      note: adapter.note,
      adapter,
    };
  }

  return {
    status: "not-compatible" as CompatibilityStatus,
    cameraMount,
    lensMount,
    note: "No native or explicitly supported adapter path is recorded in FilmIndex. A flange-distance difference alone is not treated as proof of safe physical or optical compatibility.",
    adapter: undefined,
  };
}

const STATUS_ORDER: Record<CompatibilityStatus, number> = {
  native: 0,
  adapter: 1,
  "not-compatible": 2,
  "fixed-lens": 3,
};

export function getCameraLensMatches(camera: Camera, lensRecords: Lens[]) {
  return lensRecords
    .map((lens) => ({ lens, compatibility: checkCameraLensCompatibility(camera, lens) }))
    .sort((a, b) => STATUS_ORDER[a.compatibility.status] - STATUS_ORDER[b.compatibility.status] || a.lens.name.localeCompare(b.lens.name));
}

export function getLensCameraMatches(lens: Lens, cameraRecords: Camera[]) {
  return cameraRecords
    .map((camera) => ({ camera, compatibility: checkCameraLensCompatibility(camera, lens) }))
    .sort((a, b) => STATUS_ORDER[a.compatibility.status] - STATUS_ORDER[b.compatibility.status] || a.camera.name.localeCompare(b.camera.name));
}

export type FilmScenario = "daylight" | "everyday" | "portrait" | "night" | "street" | "landscape";

const SCENARIOS: Record<FilmScenario, { targetIso: number; uses: string[] }> = {
  daylight: { targetIso: 100, uses: ["Landscape", "Travel", "Everyday", "Product"] },
  everyday: { targetIso: 400, uses: ["Everyday", "Travel", "Street"] },
  portrait: { targetIso: 200, uses: ["Portrait"] },
  night: { targetIso: 1600, uses: ["Night", "Low Light", "Documentary"] },
  street: { targetIso: 400, uses: ["Street", "Documentary", "Everyday"] },
  landscape: { targetIso: 100, uses: ["Landscape", "Travel", "Product"] },
};

export function cameraRequiredFilmFormat(camera: Camera) {
  const format = cameraFormatFamily(camera);
  if (format === "35mm") return "35mm";
  if (["645", "6x6", "6x7", "120"].includes(format)) return "120";
  return format;
}

export function recommendFilmsForCamera(
  camera: Camera,
  films: Film[],
  scenario: FilmScenario,
  preferredType = "Any",
) {
  const rule = SCENARIOS[scenario];
  const requiredFormat = cameraRequiredFilmFormat(camera);
  const meterless = /none|external|uncoupled/i.test(camera.metering);
  const isCompact = camera.cameraType.toLowerCase().includes("compact");

  return films
    .filter((film) => film.formats.some((format) => format.toLowerCase() === requiredFormat.toLowerCase()))
    .filter((film) => preferredType === "Any" || film.filmType === preferredType)
    .map((film) => {
      let score = 20;
      const reasons = [`${requiredFormat} format match`];
      const matchedUses = film.uses.filter((use) => rule.uses.includes(use));
      if (matchedUses.length) {
        score += Math.min(12, matchedUses.length * 6);
        reasons.push(`${matchedUses.slice(0, 2).join(" / ")} use match`);
      }
      const isoStops = Math.abs(Math.log2(Math.max(1, film.iso) / rule.targetIso));
      const isoScore = Math.max(0, 10 - isoStops * 2.5);
      score += isoScore;
      if (isoStops <= 1) reasons.push(`ISO ${film.iso} suits this light profile`);

      const latitude = film.characteristics["Exposure latitude"]?.toLowerCase();
      if (meterless && latitude === "high") {
        score += 3;
        reasons.push("wide latitude helps with meterless shooting");
      }
      if (isCompact && film.iso >= 200 && film.iso <= 800) {
        score += 2;
        reasons.push("practical speed for compact-camera use");
      }
      return { film, score, reasons };
    })
    .sort((a, b) => b.score - a.score || a.film.iso - b.film.iso)
    .slice(0, 8);
}

export function calculateEv100FromLux(lux: number, calibrationConstant = 250) {
  const safeLux = Math.max(0.01, lux);
  const safeConstant = Math.max(1, calibrationConstant);
  return Math.log2((safeLux * 100) / safeConstant);
}

export function calculateExposureFromEv(ev100: number, iso: number, aperture: number) {
  const safeIso = Math.max(1, iso);
  const safeAperture = Math.max(0.1, aperture);
  const evAtIso = ev100 + Math.log2(safeIso / 100);
  const shutterSeconds = (safeAperture * safeAperture) / Math.pow(2, evAtIso);
  return { evAtIso, shutterSeconds };
}

export function calculateRelativeEv(referenceEv: number, referenceLuma: number, currentLuma: number) {
  const ref = Math.max(0.001, referenceLuma);
  const current = Math.max(0.001, currentLuma);
  return referenceEv + Math.log2(current / ref);
}
