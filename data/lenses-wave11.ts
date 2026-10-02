import type { Lens } from "@/types";

type LensSeed = Omit<Lens, "kind" | "description" | "descriptionTh" | "image" | "imageMatch" | "provenance"> & { family: string };

const seeds: LensSeed[] = [
  { slug: "pentax-m-28mm-f2", name: "SMC Pentax-M 28mm f/2", brand: "Pentax", mount: "Pentax K", focalLength: "28mm", maxAperture: "f/2", focusType: "Manual", coverage: "35mm", family: "fast K-mount wide-angle prime" },
  { slug: "pentax-m-40mm-f2-8", name: "SMC Pentax-M 40mm f/2.8", brand: "Pentax", mount: "Pentax K", focalLength: "40mm", maxAperture: "f/2.8", focusType: "Manual", coverage: "35mm", family: "pancake standard prime" },
  { slug: "pentax-m-50mm-f1-4", name: "SMC Pentax-M 50mm f/1.4", brand: "Pentax", mount: "Pentax K", focalLength: "50mm", maxAperture: "f/1.4", focusType: "Manual", coverage: "35mm", family: "fast standard prime" },
  { slug: "pentax-m-120mm-f2-8", name: "SMC Pentax-M 120mm f/2.8", brand: "Pentax", mount: "Pentax K", focalLength: "120mm", maxAperture: "f/2.8", focusType: "Manual", coverage: "35mm", family: "compact telephoto prime" },
  { slug: "minolta-md-24mm-f2-8", name: "Minolta MD 24mm f/2.8", brand: "Minolta", mount: "Minolta SR", focalLength: "24mm", maxAperture: "f/2.8", focusType: "Manual", coverage: "35mm", family: "wide-angle prime" },
  { slug: "minolta-md-28mm-f2", name: "Minolta MD 28mm f/2", brand: "Minolta", mount: "Minolta SR", focalLength: "28mm", maxAperture: "f/2", focusType: "Manual", coverage: "35mm", family: "fast wide-angle prime" },
  { slug: "minolta-md-50mm-f1-4", name: "Minolta MD 50mm f/1.4", brand: "Minolta", mount: "Minolta SR", focalLength: "50mm", maxAperture: "f/1.4", focusType: "Manual", coverage: "35mm", family: "fast standard prime" },
  { slug: "minolta-md-85mm-f2", name: "Minolta MD 85mm f/2", brand: "Minolta", mount: "Minolta SR", focalLength: "85mm", maxAperture: "f/2", focusType: "Manual", coverage: "35mm", family: "compact portrait prime" },
  { slug: "olympus-zuiko-18mm-f3-5", name: "Olympus Zuiko 18mm f/3.5", brand: "Olympus", mount: "Olympus OM", focalLength: "18mm", maxAperture: "f/3.5", focusType: "Manual", coverage: "35mm", family: "compact ultra-wide prime" },
  { slug: "olympus-zuiko-50mm-f1-4", name: "Olympus Zuiko 50mm f/1.4", brand: "Olympus", mount: "Olympus OM", focalLength: "50mm", maxAperture: "f/1.4", focusType: "Manual", coverage: "35mm", family: "fast standard prime" },
];

export const wave11Lenses: Lens[] = seeds.map(({ family, ...lens }) => ({
  ...lens,
  kind: "lens",
  description: `${lens.name} is a ${family} for the ${lens.mount} system, covering ${lens.coverage} film with a maximum aperture of ${lens.maxAperture}. The record is limited to specifications supported by the referenced system catalog; representative mount imagery is labeled separately when an exact-model image is unavailable.`,
  descriptionTh: `${lens.name} เป็นเลนส์ประเภท ${family} สำหรับระบบ ${lens.mount} ครอบคลุมฟิล์ม ${lens.coverage} และมีรูรับแสงกว้างสุด ${lens.maxAperture} โดยบันทึกเฉพาะสเปกที่มีแหล่งอ้างอิงรองรับ และหากยังไม่มีภาพตรงรุ่น ระบบจะแสดงภาพตัวแทนของเมาท์พร้อมระบุอย่างชัดเจน`,
}));
