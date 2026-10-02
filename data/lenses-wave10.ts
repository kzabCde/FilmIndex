import type { Lens } from "@/types";

type LensSeed = Omit<Lens, "kind" | "description" | "descriptionTh" | "image" | "imageMatch" | "provenance"> & { family: string };

const seeds: LensSeed[] = [
  { slug: "nikon-ai-s-15mm-f3-5", name: "Nikkor 15mm f/3.5 AI-S", brand: "Nikon", mount: "Nikon F", focalLength: "15mm", maxAperture: "f/3.5", focusType: "Manual", coverage: "35mm", family: "rectilinear ultra-wide prime" },
  { slug: "nikon-ai-s-18mm-f3-5", name: "Nikkor 18mm f/3.5 AI-S", brand: "Nikon", mount: "Nikon F", focalLength: "18mm", maxAperture: "f/3.5", focusType: "Manual", coverage: "35mm", family: "ultra-wide prime" },
  { slug: "nikon-ai-s-28mm-f2", name: "Nikkor 28mm f/2 AI-S", brand: "Nikon", mount: "Nikon F", focalLength: "28mm", maxAperture: "f/2", focusType: "Manual", coverage: "35mm", family: "fast wide-angle prime" },
  { slug: "nikon-ai-s-35mm-f1-4", name: "Nikkor 35mm f/1.4 AI-S", brand: "Nikon", mount: "Nikon F", focalLength: "35mm", maxAperture: "f/1.4", focusType: "Manual", coverage: "35mm", family: "fast reportage prime" },
  { slug: "nikon-ai-s-50mm-f1-2", name: "Nikkor 50mm f/1.2 AI-S", brand: "Nikon", mount: "Nikon F", focalLength: "50mm", maxAperture: "f/1.2", focusType: "Manual", coverage: "35mm", family: "ultra-fast standard prime" },
  { slug: "nikon-ai-s-85mm-f1-4", name: "Nikkor 85mm f/1.4 AI-S", brand: "Nikon", mount: "Nikon F", focalLength: "85mm", maxAperture: "f/1.4", focusType: "Manual", coverage: "35mm", family: "fast portrait prime" },
  { slug: "nikon-ai-s-135mm-f2", name: "Nikkor 135mm f/2 AI-S", brand: "Nikon", mount: "Nikon F", focalLength: "135mm", maxAperture: "f/2", focusType: "Manual", coverage: "35mm", family: "fast telephoto prime" },
  { slug: "nikon-ai-s-200mm-f4", name: "Nikkor 200mm f/4 AI-S", brand: "Nikon", mount: "Nikon F", focalLength: "200mm", maxAperture: "f/4", focusType: "Manual", coverage: "35mm", family: "compact telephoto prime" },
  { slug: "takumar-24mm-f3-5", name: "Super-Takumar 24mm f/3.5", brand: "Asahi Pentax", mount: "M42", focalLength: "24mm", maxAperture: "f/3.5", focusType: "Manual", coverage: "35mm", family: "M42 ultra-wide prime" },
  { slug: "takumar-85mm-f1-9", name: "Super-Takumar 85mm f/1.9", brand: "Asahi Pentax", mount: "M42", focalLength: "85mm", maxAperture: "f/1.9", focusType: "Manual", coverage: "35mm", family: "M42 portrait prime" },
];

export const wave10Lenses: Lens[] = seeds.map(({ family, ...lens }) => ({
  ...lens,
  kind: "lens",
  description: `${lens.name} is a ${family} for the ${lens.mount} system, covering ${lens.coverage} film with a maximum aperture of ${lens.maxAperture}. The record is limited to specifications supported by the referenced system catalog; representative mount imagery is labeled separately when an exact-model image is unavailable.`,
  descriptionTh: `${lens.name} เป็นเลนส์ประเภท ${family} สำหรับระบบ ${lens.mount} ครอบคลุมฟิล์ม ${lens.coverage} และมีรูรับแสงกว้างสุด ${lens.maxAperture} โดยบันทึกเฉพาะสเปกที่มีแหล่งอ้างอิงรองรับ และหากยังไม่มีภาพตรงรุ่น ระบบจะแสดงภาพตัวแทนของเมาท์พร้อมระบุอย่างชัดเจน`,
}));
