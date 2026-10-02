import type { Lens } from "@/types";

type LensSeed = Omit<Lens, "kind" | "description" | "descriptionTh" | "image" | "imageMatch" | "provenance"> & { family: string };

const seeds: LensSeed[] = [
  { slug: "leica-elmarit-m-21mm-f2-8", name: "Leica Elmarit-M 21mm f/2.8", brand: "Leica", mount: "Leica M", focalLength: "21mm", maxAperture: "f/2.8", focusType: "Manual", coverage: "35mm", family: "M-mount ultra-wide prime" },
  { slug: "leica-summicron-m-28mm-f2", name: "Leica Summicron-M 28mm f/2", brand: "Leica", mount: "Leica M", focalLength: "28mm", maxAperture: "f/2", focusType: "Manual", coverage: "35mm", family: "fast M-mount wide-angle prime" },
  { slug: "leica-summilux-m-75mm-f1-4", name: "Leica Summilux-M 75mm f/1.4", brand: "Leica", mount: "Leica M", focalLength: "75mm", maxAperture: "f/1.4", focusType: "Manual", coverage: "35mm", family: "fast M-mount portrait prime" },
  { slug: "leica-summicron-m-90mm-f2", name: "Leica Summicron-M 90mm f/2", brand: "Leica", mount: "Leica M", focalLength: "90mm", maxAperture: "f/2", focusType: "Manual", coverage: "35mm", family: "fast M-mount telephoto prime" },
  { slug: "zeiss-distagon-21mm-f2-8-cy", name: "Carl Zeiss Distagon T* 21mm f/2.8", brand: "Carl Zeiss", mount: "Contax/Yashica", focalLength: "21mm", maxAperture: "f/2.8", focusType: "Manual", coverage: "35mm", family: "C/Y ultra-wide prime" },
  { slug: "zeiss-distagon-35mm-f1-4-cy", name: "Carl Zeiss Distagon T* 35mm f/1.4", brand: "Carl Zeiss", mount: "Contax/Yashica", focalLength: "35mm", maxAperture: "f/1.4", focusType: "Manual", coverage: "35mm", family: "fast C/Y wide-angle prime" },
  { slug: "zeiss-planar-100mm-f2-cy", name: "Carl Zeiss Planar T* 100mm f/2", brand: "Carl Zeiss", mount: "Contax/Yashica", focalLength: "100mm", maxAperture: "f/2", focusType: "Manual", coverage: "35mm", family: "fast C/Y short telephoto prime" },
  { slug: "zeiss-sonnar-180mm-f2-8-cy", name: "Carl Zeiss Sonnar T* 180mm f/2.8", brand: "Carl Zeiss", mount: "Contax/Yashica", focalLength: "180mm", maxAperture: "f/2.8", focusType: "Manual", coverage: "35mm", family: "C/Y telephoto prime" },
  { slug: "mamiya-sekor-c-35mm-f3-5-645", name: "Mamiya-Sekor C 35mm f/3.5", brand: "Mamiya", mount: "Mamiya 645", focalLength: "35mm", maxAperture: "f/3.5", focusType: "Manual", coverage: "645", family: "645 ultra-wide prime" },
  { slug: "mamiya-sekor-c-80mm-f1-9-645", name: "Mamiya-Sekor C 80mm f/1.9", brand: "Mamiya", mount: "Mamiya 645", focalLength: "80mm", maxAperture: "f/1.9", focusType: "Manual", coverage: "645", family: "fast 645 standard prime" },
];

export const wave12Lenses: Lens[] = seeds.map(({ family, ...lens }) => ({
  ...lens,
  kind: "lens",
  description: `${lens.name} is a ${family} for the ${lens.mount} system, covering ${lens.coverage} film with a maximum aperture of ${lens.maxAperture}. The record is limited to specifications supported by the referenced system catalog; representative mount imagery is labeled separately when an exact-model image is unavailable.`,
  descriptionTh: `${lens.name} เป็นเลนส์ประเภท ${family} สำหรับระบบ ${lens.mount} ครอบคลุมฟิล์ม ${lens.coverage} และมีรูรับแสงกว้างสุด ${lens.maxAperture} โดยบันทึกเฉพาะสเปกที่มีแหล่งอ้างอิงรองรับ และหากยังไม่มีภาพตรงรุ่น ระบบจะแสดงภาพตัวแทนของเมาท์พร้อมระบุอย่างชัดเจน`,
}));
