import type { Lens } from "@/types";

type LensSeed = Omit<Lens, "kind" | "description" | "descriptionTh" | "image" | "imageMatch" | "provenance"> & { family: string };

const seeds: LensSeed[] = [
  { slug:"canon-fd-20mm-f2-8", name:"Canon FD 20mm f/2.8", brand:"Canon", mount:"Canon FD", focalLength:"20mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"ultra-wide prime" },
  { slug:"canon-fd-24mm-f2-8", name:"Canon FD 24mm f/2.8", brand:"Canon", mount:"Canon FD", focalLength:"24mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"wide-angle prime" },
  { slug:"canon-fd-50mm-f1-2-l", name:"Canon FD 50mm f/1.2L", brand:"Canon", mount:"Canon FD", focalLength:"50mm", maxAperture:"f/1.2", focusType:"Manual", coverage:"35mm", family:"ultra-fast standard prime" },
  { slug:"canon-fd-100mm-f2-8", name:"Canon FD 100mm f/2.8", brand:"Canon", mount:"Canon FD", focalLength:"100mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"short telephoto prime" },
  { slug:"canon-fd-200mm-f2-8", name:"Canon FD 200mm f/2.8", brand:"Canon", mount:"Canon FD", focalLength:"200mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"fast telephoto prime" },

  { slug:"canon-ef-20mm-f2-8-usm", name:"Canon EF 20mm f/2.8 USM", brand:"Canon", mount:"Canon EF", focalLength:"20mm", maxAperture:"f/2.8", focusType:"Autofocus", coverage:"35mm", family:"autofocus ultra-wide prime" },
  { slug:"canon-ef-24mm-f2-8", name:"Canon EF 24mm f/2.8", brand:"Canon", mount:"Canon EF", focalLength:"24mm", maxAperture:"f/2.8", focusType:"Autofocus", coverage:"35mm", family:"autofocus wide-angle prime" },
  { slug:"canon-ef-35mm-f2", name:"Canon EF 35mm f/2", brand:"Canon", mount:"Canon EF", focalLength:"35mm", maxAperture:"f/2", focusType:"Autofocus", coverage:"35mm", family:"compact autofocus wide-angle prime" },
  { slug:"canon-ef-50mm-f1-4-usm", name:"Canon EF 50mm f/1.4 USM", brand:"Canon", mount:"Canon EF", focalLength:"50mm", maxAperture:"f/1.4", focusType:"Autofocus", coverage:"35mm", family:"fast autofocus standard prime" },
  { slug:"canon-ef-100mm-f2-usm", name:"Canon EF 100mm f/2 USM", brand:"Canon", mount:"Canon EF", focalLength:"100mm", maxAperture:"f/2", focusType:"Autofocus", coverage:"35mm", family:"fast autofocus short telephoto" },
  { slug:"canon-ef-135mm-f2-l-usm", name:"Canon EF 135mm f/2L USM", brand:"Canon", mount:"Canon EF", focalLength:"135mm", maxAperture:"f/2", focusType:"Autofocus", coverage:"35mm", family:"professional fast telephoto prime" },
  { slug:"canon-ef-200mm-f2-8-l-ii-usm", name:"Canon EF 200mm f/2.8L II USM", brand:"Canon", mount:"Canon EF", focalLength:"200mm", maxAperture:"f/2.8", focusType:"Autofocus", coverage:"35mm", family:"professional telephoto prime" },

  { slug:"nikon-ai-s-20mm-f2-8", name:"Nikkor 20mm f/2.8 AI-S", brand:"Nikon", mount:"Nikon F", focalLength:"20mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"compact ultra-wide prime" },
  { slug:"nikon-ai-s-35mm-f2", name:"Nikkor 35mm f/2 AI-S", brand:"Nikon", mount:"Nikon F", focalLength:"35mm", maxAperture:"f/2", focusType:"Manual", coverage:"35mm", family:"fast wide-angle prime" },
  { slug:"nikon-ai-s-50mm-f1-8", name:"Nikkor 50mm f/1.8 AI-S", brand:"Nikon", mount:"Nikon F", focalLength:"50mm", maxAperture:"f/1.8", focusType:"Manual", coverage:"35mm", family:"compact standard prime" },
  { slug:"nikon-ai-s-105mm-f1-8", name:"Nikkor 105mm f/1.8 AI-S", brand:"Nikon", mount:"Nikon F", focalLength:"105mm", maxAperture:"f/1.8", focusType:"Manual", coverage:"35mm", family:"fast portrait telephoto" },
  { slug:"nikon-ai-s-135mm-f2-8", name:"Nikkor 135mm f/2.8 AI-S", brand:"Nikon", mount:"Nikon F", focalLength:"135mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"telephoto prime" },
  { slug:"nikon-ai-s-180mm-f2-8-ed", name:"Nikkor 180mm f/2.8 ED AI-S", brand:"Nikon", mount:"Nikon F", focalLength:"180mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"ED telephoto prime" },

  { slug:"takumar-35mm-f3-5", name:"Super-Takumar 35mm f/3.5", brand:"Asahi Pentax", mount:"M42", focalLength:"35mm", maxAperture:"f/3.5", focusType:"Manual", coverage:"35mm", family:"M42 wide-angle prime" },
  { slug:"takumar-105mm-f2-8", name:"Super-Takumar 105mm f/2.8", brand:"Asahi Pentax", mount:"M42", focalLength:"105mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"M42 short telephoto prime" },
  { slug:"takumar-200mm-f4", name:"Super-Takumar 200mm f/4", brand:"Asahi Pentax", mount:"M42", focalLength:"200mm", maxAperture:"f/4", focusType:"Manual", coverage:"35mm", family:"M42 telephoto prime" },

  { slug:"pentax-m-20mm-f4", name:"SMC Pentax-M 20mm f/4", brand:"Pentax", mount:"Pentax K", focalLength:"20mm", maxAperture:"f/4", focusType:"Manual", coverage:"35mm", family:"compact K-mount ultra-wide prime" },
  { slug:"pentax-m-24mm-f2-8", name:"SMC Pentax-M 24mm f/2.8", brand:"Pentax", mount:"Pentax K", focalLength:"24mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"compact K-mount wide-angle prime" },
  { slug:"pentax-m-35mm-f2-8", name:"SMC Pentax-M 35mm f/2.8", brand:"Pentax", mount:"Pentax K", focalLength:"35mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"compact K-mount wide-angle prime" },
  { slug:"pentax-m-100mm-f2-8", name:"SMC Pentax-M 100mm f/2.8", brand:"Pentax", mount:"Pentax K", focalLength:"100mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"compact K-mount short telephoto" },
  { slug:"pentax-m-200mm-f4", name:"SMC Pentax-M 200mm f/4", brand:"Pentax", mount:"Pentax K", focalLength:"200mm", maxAperture:"f/4", focusType:"Manual", coverage:"35mm", family:"compact K-mount telephoto" },

  { slug:"minolta-rokkor-24mm-f2-8", name:"Minolta MC W.Rokkor 24mm f/2.8", brand:"Minolta", mount:"Minolta SR", focalLength:"24mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"SR-mount wide-angle prime" },
  { slug:"minolta-md-35mm-f2-8", name:"Minolta MD 35mm f/2.8", brand:"Minolta", mount:"Minolta SR", focalLength:"35mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"SR-mount wide-angle prime" },
  { slug:"minolta-md-50mm-f1-7", name:"Minolta MD 50mm f/1.7", brand:"Minolta", mount:"Minolta SR", focalLength:"50mm", maxAperture:"f/1.7", focusType:"Manual", coverage:"35mm", family:"compact standard prime" },
  { slug:"minolta-md-100mm-f2-5", name:"Minolta MD 100mm f/2.5", brand:"Minolta", mount:"Minolta SR", focalLength:"100mm", maxAperture:"f/2.5", focusType:"Manual", coverage:"35mm", family:"portrait short telephoto" },
  { slug:"minolta-md-200mm-f4", name:"Minolta MD 200mm f/4", brand:"Minolta", mount:"Minolta SR", focalLength:"200mm", maxAperture:"f/4", focusType:"Manual", coverage:"35mm", family:"SR-mount telephoto prime" },

  { slug:"olympus-zuiko-21mm-f3-5", name:"Olympus Zuiko 21mm f/3.5", brand:"Olympus", mount:"Olympus OM", focalLength:"21mm", maxAperture:"f/3.5", focusType:"Manual", coverage:"35mm", family:"compact OM ultra-wide prime" },
  { slug:"olympus-zuiko-24mm-f2-8", name:"Olympus Zuiko 24mm f/2.8", brand:"Olympus", mount:"Olympus OM", focalLength:"24mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"compact OM wide-angle prime" },
  { slug:"olympus-zuiko-35mm-f2-8", name:"Olympus Zuiko 35mm f/2.8", brand:"Olympus", mount:"Olympus OM", focalLength:"35mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"compact OM wide-angle prime" },
  { slug:"olympus-zuiko-100mm-f2-8", name:"Olympus Zuiko 100mm f/2.8", brand:"Olympus", mount:"Olympus OM", focalLength:"100mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"compact OM short telephoto" },
  { slug:"olympus-zuiko-200mm-f4", name:"Olympus Zuiko 200mm f/4", brand:"Olympus", mount:"Olympus OM", focalLength:"200mm", maxAperture:"f/4", focusType:"Manual", coverage:"35mm", family:"compact OM telephoto prime" },

  { slug:"leica-summilux-m-35mm-f1-4", name:"Leica Summilux-M 35mm f/1.4", brand:"Leica", mount:"Leica M", focalLength:"35mm", maxAperture:"f/1.4", focusType:"Manual", coverage:"35mm", family:"fast M-mount reportage prime" },
  { slug:"leica-summilux-m-50mm-f1-4", name:"Leica Summilux-M 50mm f/1.4", brand:"Leica", mount:"Leica M", focalLength:"50mm", maxAperture:"f/1.4", focusType:"Manual", coverage:"35mm", family:"fast M-mount standard prime" },
  { slug:"leica-elmar-m-50mm-f2-8", name:"Leica Elmar-M 50mm f/2.8", brand:"Leica", mount:"Leica M", focalLength:"50mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"collapsible M-mount standard prime" },
  { slug:"leica-elmarit-m-90mm-f2-8", name:"Leica Elmarit-M 90mm f/2.8", brand:"Leica", mount:"Leica M", focalLength:"90mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"M-mount portrait telephoto" },
  { slug:"leica-tele-elmar-m-135mm-f4", name:"Leica Tele-Elmar-M 135mm f/4", brand:"Leica", mount:"Leica M", focalLength:"135mm", maxAperture:"f/4", focusType:"Manual", coverage:"35mm", family:"compact M-mount telephoto" },

  { slug:"zeiss-distagon-25mm-f2-8-cy", name:"Carl Zeiss Distagon T* 25mm f/2.8", brand:"Carl Zeiss", mount:"Contax/Yashica", focalLength:"25mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"C/Y wide-angle prime" },
  { slug:"zeiss-planar-50mm-f1-4-cy", name:"Carl Zeiss Planar T* 50mm f/1.4", brand:"Carl Zeiss", mount:"Contax/Yashica", focalLength:"50mm", maxAperture:"f/1.4", focusType:"Manual", coverage:"35mm", family:"fast C/Y standard prime" },
  { slug:"zeiss-planar-85mm-f1-4-cy", name:"Carl Zeiss Planar T* 85mm f/1.4", brand:"Carl Zeiss", mount:"Contax/Yashica", focalLength:"85mm", maxAperture:"f/1.4", focusType:"Manual", coverage:"35mm", family:"fast C/Y portrait prime" },
  { slug:"zeiss-sonnar-135mm-f2-8-cy", name:"Carl Zeiss Sonnar T* 135mm f/2.8", brand:"Carl Zeiss", mount:"Contax/Yashica", focalLength:"135mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", family:"C/Y telephoto prime" },

  { slug:"mamiya-sekor-c-55mm-f2-8-645", name:"Mamiya-Sekor C 55mm f/2.8", brand:"Mamiya", mount:"Mamiya 645", focalLength:"55mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"645", family:"645 wide-angle prime" },
  { slug:"mamiya-sekor-c-110mm-f2-8-645", name:"Mamiya-Sekor C 110mm f/2.8", brand:"Mamiya", mount:"Mamiya 645", focalLength:"110mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"645", family:"645 portrait prime" },
  { slug:"mamiya-sekor-c-210mm-f4-645", name:"Mamiya-Sekor C 210mm f/4", brand:"Mamiya", mount:"Mamiya 645", focalLength:"210mm", maxAperture:"f/4", focusType:"Manual", coverage:"645", family:"645 telephoto prime" },

  { slug:"hasselblad-distagon-40mm-f4", name:"Carl Zeiss Distagon 40mm f/4", brand:"Carl Zeiss", mount:"Hasselblad V", focalLength:"40mm", maxAperture:"f/4", focusType:"Manual", coverage:"6x6", family:"6x6 ultra-wide prime" },
  { slug:"hasselblad-sonnar-180mm-f4", name:"Carl Zeiss Sonnar 180mm f/4", brand:"Carl Zeiss", mount:"Hasselblad V", focalLength:"180mm", maxAperture:"f/4", focusType:"Manual", coverage:"6x6", family:"6x6 telephoto prime" },

  { slug:"pentax-67-45mm-f4", name:"SMC Pentax 67 45mm f/4", brand:"Pentax", mount:"Pentax 67", focalLength:"45mm", maxAperture:"f/4", focusType:"Manual", coverage:"6x7", family:"6x7 ultra-wide prime" },
  { slug:"pentax-67-75mm-f4-5", name:"SMC Pentax 67 75mm f/4.5", brand:"Pentax", mount:"Pentax 67", focalLength:"75mm", maxAperture:"f/4.5", focusType:"Manual", coverage:"6x7", family:"6x7 wide-angle prime" },
  { slug:"pentax-67-90mm-f2-8", name:"SMC Pentax 67 90mm f/2.8", brand:"Pentax", mount:"Pentax 67", focalLength:"90mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"6x7", family:"6x7 standard prime" },
  { slug:"pentax-67-200mm-f4", name:"SMC Pentax 67 200mm f/4", brand:"Pentax", mount:"Pentax 67", focalLength:"200mm", maxAperture:"f/4", focusType:"Manual", coverage:"6x7", family:"6x7 telephoto prime" },
];

export const wave8Lenses: Lens[] = seeds.map(({ family, ...lens }) => ({
  ...lens,
  kind: "lens",
  description: `${lens.name} is a ${family} for the ${lens.mount} system, covering ${lens.coverage} film with a maximum aperture of ${lens.maxAperture}.`,
  descriptionTh: `${lens.name} เป็นเลนส์ประเภท ${family} สำหรับระบบ ${lens.mount} ครอบคลุมฟิล์ม ${lens.coverage} และมีรูรับแสงกว้างสุด ${lens.maxAperture}`,
}));
