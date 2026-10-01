import type { Camera, Film, Lens } from "@/types";

export type CompatibilityStatus = "native" | "adapter" | "fixed-lens" | "not-compatible";

const ADAPTER_RULES: Record<string, string> = {
  "M42->Pentax K": "M42-to-Pentax K mechanical adapter; stop-down metering may be required.",
  "M42->Canon FD": "M42-to-Canon FD adapter; normally manual focus and stop-down operation.",
  "M42->Canon EF": "M42-to-Canon EF adapter; manual focus and manual aperture operation.",
  "Nikon F->Canon EF": "Nikon F-to-Canon EF mechanical adapter; aperture automation is normally unavailable.",
  "Olympus OM->Canon EF": "Olympus OM-to-Canon EF adapter; manual focus and manual aperture operation.",
  "Contax/Yashica->Canon EF": "C/Y-to-Canon EF adapter; manual focus and manual aperture operation.",
};

export function normalizeMount(value: string) {
  const source = value.trim().toLowerCase();
  if (!source) return "Unknown";
  if (source.includes("fixed") || source.includes("built-in") || source.includes("integrated") || source.includes("non-interchangeable")) return "Fixed lens";
  if (source.includes("canon ef")) return "Canon EF";
  if (source.includes("canon fd")) return "Canon FD";
  if (source.includes("nikon f")) return "Nikon F";
  if (source.includes("m42")) return "M42";
  if (source.includes("pentax k")) return "Pentax K";
  if (source.includes("minolta") && (source.includes("sr") || source.includes("md") || source.includes("mc"))) return "Minolta SR";
  if (source.includes("olympus om") || source === "om") return "Olympus OM";
  if (source.includes("leica m")) return "Leica M";
  if (source.includes("contax g")) return "Contax G";
  if (source.includes("contax") || source.includes("yashica")) return "Contax/Yashica";
  if (source.includes("mamiya 645")) return "Mamiya 645";
  if (source.includes("hasselblad") && source.includes("v")) return "Hasselblad V";
  if (source.includes("pentax 67") || source.includes("pentax 6x7") || source.includes("pentax 6×7")) return "Pentax 67";
  return value.trim();
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

function formatCanUseLens(camera: Camera, lens: Lens) {
  const cameraFormat = cameraFormatFamily(camera);
  if (cameraFormat === "35mm") return lens.coverage === "35mm";
  if (cameraFormat === "645") return lens.coverage === "645" || lens.coverage === "6x6" || lens.coverage === "6x7";
  if (cameraFormat === "6x6") return lens.coverage === "6x6" || lens.coverage === "6x7";
  if (cameraFormat === "6x7") return lens.coverage === "6x7";
  return true;
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
    };
  }

  if (cameraMount === lensMount) {
    if (!formatCanUseLens(camera, lens)) {
      return {
        status: "not-compatible" as CompatibilityStatus,
        cameraMount,
        lensMount,
        note: "The mount name matches, but the recorded image-circle coverage does not match this camera format.",
      };
    }
    return {
      status: "native" as CompatibilityStatus,
      cameraMount,
      lensMount,
      note: "Native mount match. Body-specific metering, aperture coupling, and autofocus support can still vary by generation.",
    };
  }

  const adapterKey = `${lensMount}->${cameraMount}`;
  const adapterNote = ADAPTER_RULES[adapterKey];
  if (adapterNote && formatCanUseLens(camera, lens)) {
    return {
      status: "adapter" as CompatibilityStatus,
      cameraMount,
      lensMount,
      note: adapterNote,
    };
  }

  return {
    status: "not-compatible" as CompatibilityStatus,
    cameraMount,
    lensMount,
    note: "No native or explicitly supported adapter path is recorded in FilmIndex. Do not assume physical or optical compatibility from mount diameter alone.",
  };
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
