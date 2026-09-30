import type { Locale } from "@/lib/i18n";

export const COMPACT_CAMERA_TYPE = "Compact";

export function normalizeCameraType(value: string) {
  return value === "Point & Shoot" ? COMPACT_CAMERA_TYPE : value;
}

const cameraTypesTh: Record<string, string> = {
  SLR: "SLR",
  Rangefinder: "เรนจ์ไฟน์เดอร์",
  Compact: "คอมแพค",
  "Medium Format": "มีเดียมฟอร์แมต",
  TLR: "TLR",
  Instant: "อินสแตนต์",
};

export function cameraTypeLabel(value: string, locale: Locale) {
  const normalized = normalizeCameraType(value);
  return locale === "th" ? cameraTypesTh[normalized] ?? normalized : normalized;
}
