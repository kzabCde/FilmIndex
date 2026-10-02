import type { Lens } from "@/types";

type LensSeed = Omit<Lens, "kind" | "description" | "descriptionTh" | "image" | "imageMatch" | "provenance"> & { family: string };

const seeds: LensSeed[] = [
  { slug: "canon-fd-17mm-f4", name: "Canon FD 17mm f/4", brand: "Canon", mount: "Canon FD", focalLength: "17mm", maxAperture: "f/4", focusType: "Manual", coverage: "35mm", family: "ultra-wide prime" },
  { slug: "canon-fd-28mm-f2", name: "Canon FD 28mm f/2", brand: "Canon", mount: "Canon FD", focalLength: "28mm", maxAperture: "f/2", focusType: "Manual", coverage: "35mm", family: "fast wide-angle prime" },
  { slug: "canon-fd-35mm-f2-8", name: "Canon FD 35mm f/2.8", brand: "Canon", mount: "Canon FD", focalLength: "35mm", maxAperture: "f/2.8", focusType: "Manual", coverage: "35mm", family: "wide-angle prime" },
  { slug: "canon-fd-50mm-f1-8", name: "Canon FD 50mm f/1.8", brand: "Canon", mount: "Canon FD", focalLength: "50mm", maxAperture: "f/1.8", focusType: "Manual", coverage: "35mm", family: "standard prime" },
  { slug: "canon-fd-85mm-f1-2-l", name: "Canon FD 85mm f/1.2L", brand: "Canon", mount: "Canon FD", focalLength: "85mm", maxAperture: "f/1.2", focusType: "Manual", coverage: "35mm", family: "ultra-fast portrait prime" },
  { slug: "canon-ef-14mm-f2-8-l-usm", name: "Canon EF 14mm f/2.8L USM", brand: "Canon", mount: "Canon EF", focalLength: "14mm", maxAperture: "f/2.8", focusType: "Autofocus", coverage: "35mm", family: "professional ultra-wide prime" },
  { slug: "canon-ef-28mm-f1-8-usm", name: "Canon EF 28mm f/1.8 USM", brand: "Canon", mount: "Canon EF", focalLength: "28mm", maxAperture: "f/1.8", focusType: "Autofocus", coverage: "35mm", family: "fast autofocus wide-angle prime" },
  { slug: "canon-ef-50mm-f1-0-l-usm", name: "Canon EF 50mm f/1.0L USM", brand: "Canon", mount: "Canon EF", focalLength: "50mm", maxAperture: "f/1.0", focusType: "Autofocus", coverage: "35mm", family: "ultra-fast professional standard prime" },
  { slug: "canon-ef-85mm-f1-2-l-usm", name: "Canon EF 85mm f/1.2L USM", brand: "Canon", mount: "Canon EF", focalLength: "85mm", maxAperture: "f/1.2", focusType: "Autofocus", coverage: "35mm", family: "ultra-fast professional portrait prime" },
  { slug: "canon-ef-300mm-f4-l-usm", name: "Canon EF 300mm f/4L USM", brand: "Canon", mount: "Canon EF", focalLength: "300mm", maxAperture: "f/4", focusType: "Autofocus", coverage: "35mm", family: "professional telephoto prime" },
];

export const wave9Lenses: Lens[] = seeds.map(({ family, ...lens }) => ({
  ...lens,
  kind: "lens",
  description: `${lens.name} is a ${family} for the ${lens.mount} system, covering ${lens.coverage} film with a maximum aperture of ${lens.maxAperture}. The record is limited to specifications supported by the referenced system catalog; representative mount imagery is labeled separately when an exact-model image is unavailable.`,
  descriptionTh: `${lens.name} เป็นเลนส์ประเภท ${family} สำหรับระบบ ${lens.mount} ครอบคลุมฟิล์ม ${lens.coverage} และมีรูรับแสงกว้างสุด ${lens.maxAperture} โดยบันทึกเฉพาะสเปกที่มีแหล่งอ้างอิงรองรับ และหากยังไม่มีภาพตรงรุ่น ระบบจะแสดงภาพตัวแทนของเมาท์พร้อมระบุอย่างชัดเจน`,
}));
