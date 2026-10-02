import type { Lens } from "@/types";

type LensSeed = Omit<Lens, "kind" | "description" | "descriptionTh" | "image" | "imageMatch" | "provenance"> & { family: string };

const seeds: LensSeed[] = [
  { slug: "mamiya-sekor-c-150mm-f2-8-a-645", name: "Mamiya-Sekor C 150mm f/2.8 A", brand: "Mamiya", mount: "Mamiya 645", focalLength: "150mm", maxAperture: "f/2.8", focusType: "Manual", coverage: "645", family: "fast 645 portrait telephoto" },
  { slug: "mamiya-sekor-c-300mm-f5-6-645", name: "Mamiya-Sekor C 300mm f/5.6", brand: "Mamiya", mount: "Mamiya 645", focalLength: "300mm", maxAperture: "f/5.6", focusType: "Manual", coverage: "645", family: "645 telephoto prime" },
  { slug: "hasselblad-f-distagon-30mm-f3-5", name: "Carl Zeiss F-Distagon 30mm f/3.5", brand: "Carl Zeiss", mount: "Hasselblad V", focalLength: "30mm", maxAperture: "f/3.5", focusType: "Manual", coverage: "6x6", family: "6x6 fisheye prime" },
  { slug: "hasselblad-planar-100mm-f3-5", name: "Carl Zeiss Planar 100mm f/3.5", brand: "Carl Zeiss", mount: "Hasselblad V", focalLength: "100mm", maxAperture: "f/3.5", focusType: "Manual", coverage: "6x6", family: "6x6 standard-to-short-telephoto prime" },
  { slug: "hasselblad-sonnar-250mm-f5-6", name: "Carl Zeiss Sonnar 250mm f/5.6", brand: "Carl Zeiss", mount: "Hasselblad V", focalLength: "250mm", maxAperture: "f/5.6", focusType: "Manual", coverage: "6x6", family: "6x6 telephoto prime" },
  { slug: "pentax-67-35mm-f4-5-fisheye", name: "SMC Pentax 67 35mm f/4.5 Fisheye", brand: "Pentax", mount: "Pentax 67", focalLength: "35mm", maxAperture: "f/4.5", focusType: "Manual", coverage: "6x7", family: "6x7 fisheye prime" },
  { slug: "pentax-67-75mm-f2-8-al", name: "SMC Pentax 67 75mm f/2.8 AL", brand: "Pentax", mount: "Pentax 67", focalLength: "75mm", maxAperture: "f/2.8", focusType: "Manual", coverage: "6x7", family: "fast 6x7 wide-angle prime" },
  { slug: "pentax-67-135mm-f4-macro", name: "SMC Pentax 67 135mm f/4 Macro", brand: "Pentax", mount: "Pentax 67", focalLength: "135mm", maxAperture: "f/4", focusType: "Manual", coverage: "6x7", family: "6x7 close-focus macro prime" },
  { slug: "pentax-67-300mm-f4", name: "SMC Pentax 67 300mm f/4", brand: "Pentax", mount: "Pentax 67", focalLength: "300mm", maxAperture: "f/4", focusType: "Manual", coverage: "6x7", family: "6x7 telephoto prime" },
  { slug: "takumar-300mm-f4", name: "Super-Takumar 300mm f/4", brand: "Asahi Pentax", mount: "M42", focalLength: "300mm", maxAperture: "f/4", focusType: "Manual", coverage: "35mm", family: "M42 telephoto prime" },
];

export const wave13Lenses: Lens[] = seeds.map(({ family, ...lens }) => ({
  ...lens,
  kind: "lens",
  description: `${lens.name} is a ${family} for the ${lens.mount} system, covering ${lens.coverage} film with a maximum aperture of ${lens.maxAperture}. The record is limited to specifications supported by the referenced system catalog; representative mount imagery is labeled separately when an exact-model image is unavailable.`,
  descriptionTh: `${lens.name} เป็นเลนส์ประเภท ${family} สำหรับระบบ ${lens.mount} ครอบคลุมฟิล์ม ${lens.coverage} และมีรูรับแสงกว้างสุด ${lens.maxAperture} โดยบันทึกเฉพาะสเปกที่มีแหล่งอ้างอิงรองรับ และหากยังไม่มีภาพตรงรุ่น ระบบจะแสดงภาพตัวแทนของเมาท์พร้อมระบุอย่างชัดเจน`,
}));
