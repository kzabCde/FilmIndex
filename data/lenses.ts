import type { Lens } from "@/types";

type LensSeed = Omit<Lens, "kind" | "description" | "descriptionTh"> & { family: string };

const seeds: LensSeed[] = [
  { slug:"canon-fd-28mm-f2-8", name:"Canon FD 28mm f/2.8", brand:"Canon", mount:"Canon FD", focalLength:"28mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", minFocusM:0.3, filterThread:"52mm", family:"wide-angle prime" },
  { slug:"canon-fd-35mm-f2", name:"Canon FD 35mm f/2", brand:"Canon", mount:"Canon FD", focalLength:"35mm", maxAperture:"f/2", focusType:"Manual", coverage:"35mm", minFocusM:0.3, filterThread:"55mm", family:"fast wide-angle prime" },
  { slug:"canon-fd-50mm-f1-4", name:"Canon FD 50mm f/1.4", brand:"Canon", mount:"Canon FD", focalLength:"50mm", maxAperture:"f/1.4", focusType:"Manual", coverage:"35mm", minFocusM:0.45, filterThread:"52mm", family:"standard prime" },
  { slug:"canon-fd-85mm-f1-8", name:"Canon FD 85mm f/1.8", brand:"Canon", mount:"Canon FD", focalLength:"85mm", maxAperture:"f/1.8", focusType:"Manual", coverage:"35mm", minFocusM:0.85, filterThread:"52mm", family:"portrait prime" },
  { slug:"canon-fd-135mm-f2-5", name:"Canon FD 135mm f/2.5", brand:"Canon", mount:"Canon FD", focalLength:"135mm", maxAperture:"f/2.5", focusType:"Manual", coverage:"35mm", minFocusM:1.5, filterThread:"58mm", family:"short telephoto prime" },
  { slug:"canon-ef-28mm-f2-8", name:"Canon EF 28mm f/2.8", brand:"Canon", mount:"Canon EF", focalLength:"28mm", maxAperture:"f/2.8", focusType:"Autofocus", coverage:"35mm", minFocusM:0.3, filterThread:"52mm", family:"autofocus wide-angle prime" },
  { slug:"canon-ef-50mm-f1-8-ii", name:"Canon EF 50mm f/1.8 II", brand:"Canon", mount:"Canon EF", focalLength:"50mm", maxAperture:"f/1.8", focusType:"Autofocus", coverage:"35mm", minFocusM:0.45, filterThread:"52mm", family:"compact autofocus standard prime" },
  { slug:"canon-ef-85mm-f1-8-usm", name:"Canon EF 85mm f/1.8 USM", brand:"Canon", mount:"Canon EF", focalLength:"85mm", maxAperture:"f/1.8", focusType:"Autofocus", coverage:"35mm", minFocusM:0.85, filterThread:"58mm", family:"autofocus portrait prime" },

  { slug:"nikon-ai-s-24mm-f2-8", name:"Nikkor 24mm f/2.8 AI-S", brand:"Nikon", mount:"Nikon F", focalLength:"24mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", minFocusM:0.3, filterThread:"52mm", family:"wide-angle prime" },
  { slug:"nikon-ai-s-28mm-f2-8", name:"Nikkor 28mm f/2.8 AI-S", brand:"Nikon", mount:"Nikon F", focalLength:"28mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", minFocusM:0.2, filterThread:"52mm", family:"close-focusing wide-angle prime" },
  { slug:"nikon-ai-s-50mm-f1-4", name:"Nikkor 50mm f/1.4 AI-S", brand:"Nikon", mount:"Nikon F", focalLength:"50mm", maxAperture:"f/1.4", focusType:"Manual", coverage:"35mm", minFocusM:0.45, filterThread:"52mm", family:"fast standard prime" },
  { slug:"nikon-ai-s-85mm-f2", name:"Nikkor 85mm f/2 AI-S", brand:"Nikon", mount:"Nikon F", focalLength:"85mm", maxAperture:"f/2", focusType:"Manual", coverage:"35mm", minFocusM:0.85, filterThread:"52mm", family:"portrait prime" },
  { slug:"nikon-ai-s-105mm-f2-5", name:"Nikkor 105mm f/2.5 AI-S", brand:"Nikon", mount:"Nikon F", focalLength:"105mm", maxAperture:"f/2.5", focusType:"Manual", coverage:"35mm", minFocusM:1, filterThread:"52mm", family:"portrait telephoto prime" },

  { slug:"takumar-28mm-f3-5", name:"Super-Takumar 28mm f/3.5", brand:"Asahi Pentax", mount:"M42", focalLength:"28mm", maxAperture:"f/3.5", focusType:"Manual", coverage:"35mm", minFocusM:0.4, filterThread:"49mm", family:"M42 wide-angle prime" },
  { slug:"takumar-50mm-f1-4", name:"Super-Takumar 50mm f/1.4", brand:"Asahi Pentax", mount:"M42", focalLength:"50mm", maxAperture:"f/1.4", focusType:"Manual", coverage:"35mm", minFocusM:0.45, filterThread:"49mm", family:"fast M42 standard prime" },
  { slug:"takumar-55mm-f1-8", name:"Super-Takumar 55mm f/1.8", brand:"Asahi Pentax", mount:"M42", focalLength:"55mm", maxAperture:"f/1.8", focusType:"Manual", coverage:"35mm", minFocusM:0.45, filterThread:"49mm", family:"M42 standard prime" },
  { slug:"takumar-135mm-f3-5", name:"Super-Takumar 135mm f/3.5", brand:"Asahi Pentax", mount:"M42", focalLength:"135mm", maxAperture:"f/3.5", focusType:"Manual", coverage:"35mm", minFocusM:1.5, filterThread:"49mm", family:"M42 telephoto prime" },

  { slug:"pentax-m-28mm-f2-8", name:"SMC Pentax-M 28mm f/2.8", brand:"Pentax", mount:"Pentax K", focalLength:"28mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", minFocusM:0.3, filterThread:"49mm", family:"compact K-mount wide-angle prime" },
  { slug:"pentax-m-50mm-f1-7", name:"SMC Pentax-M 50mm f/1.7", brand:"Pentax", mount:"Pentax K", focalLength:"50mm", maxAperture:"f/1.7", focusType:"Manual", coverage:"35mm", minFocusM:0.45, filterThread:"49mm", family:"compact K-mount standard prime" },
  { slug:"pentax-m-85mm-f2", name:"SMC Pentax-M 85mm f/2", brand:"Pentax", mount:"Pentax K", focalLength:"85mm", maxAperture:"f/2", focusType:"Manual", coverage:"35mm", minFocusM:0.85, filterThread:"49mm", family:"K-mount portrait prime" },
  { slug:"pentax-m-135mm-f3-5", name:"SMC Pentax-M 135mm f/3.5", brand:"Pentax", mount:"Pentax K", focalLength:"135mm", maxAperture:"f/3.5", focusType:"Manual", coverage:"35mm", minFocusM:1.5, filterThread:"49mm", family:"compact K-mount telephoto" },

  { slug:"minolta-rokkor-28mm-f2-8", name:"Minolta MC W.Rokkor 28mm f/2.8", brand:"Minolta", mount:"Minolta SR", focalLength:"28mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", minFocusM:0.3, filterThread:"55mm", family:"SR-mount wide-angle prime" },
  { slug:"minolta-rokkor-45mm-f2", name:"Minolta MD Rokkor 45mm f/2", brand:"Minolta", mount:"Minolta SR", focalLength:"45mm", maxAperture:"f/2", focusType:"Manual", coverage:"35mm", minFocusM:0.6, filterThread:"49mm", family:"compact near-standard prime" },
  { slug:"minolta-rokkor-50mm-f1-4", name:"Minolta MD Rokkor 50mm f/1.4", brand:"Minolta", mount:"Minolta SR", focalLength:"50mm", maxAperture:"f/1.4", focusType:"Manual", coverage:"35mm", minFocusM:0.45, filterThread:"49mm", family:"fast SR-mount standard prime" },
  { slug:"minolta-rokkor-85mm-f1-7", name:"Minolta MC Rokkor-PF 85mm f/1.7", brand:"Minolta", mount:"Minolta SR", focalLength:"85mm", maxAperture:"f/1.7", focusType:"Manual", coverage:"35mm", minFocusM:1, filterThread:"55mm", family:"fast portrait prime" },
  { slug:"minolta-rokkor-135mm-f2-8", name:"Minolta MD Tele Rokkor 135mm f/2.8", brand:"Minolta", mount:"Minolta SR", focalLength:"135mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", minFocusM:1.5, filterThread:"55mm", family:"SR-mount telephoto prime" },

  { slug:"olympus-zuiko-28mm-f2-8", name:"Olympus Zuiko 28mm f/2.8", brand:"Olympus", mount:"Olympus OM", focalLength:"28mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", minFocusM:0.3, filterThread:"49mm", family:"compact OM wide-angle prime" },
  { slug:"olympus-zuiko-50mm-f1-8", name:"Olympus Zuiko 50mm f/1.8", brand:"Olympus", mount:"Olympus OM", focalLength:"50mm", maxAperture:"f/1.8", focusType:"Manual", coverage:"35mm", minFocusM:0.45, filterThread:"49mm", family:"compact OM standard prime" },
  { slug:"olympus-zuiko-85mm-f2", name:"Olympus Zuiko 85mm f/2", brand:"Olympus", mount:"Olympus OM", focalLength:"85mm", maxAperture:"f/2", focusType:"Manual", coverage:"35mm", minFocusM:0.85, filterThread:"49mm", family:"compact OM portrait prime" },
  { slug:"olympus-zuiko-135mm-f3-5", name:"Olympus Zuiko 135mm f/3.5", brand:"Olympus", mount:"Olympus OM", focalLength:"135mm", maxAperture:"f/3.5", focusType:"Manual", coverage:"35mm", minFocusM:1.5, filterThread:"49mm", family:"compact OM telephoto prime" },

  { slug:"leica-elmarit-m-28mm-f2-8", name:"Leica Elmarit-M 28mm f/2.8", brand:"Leica", mount:"Leica M", focalLength:"28mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", minFocusM:0.7, filterThread:"46mm", family:"M-mount wide-angle rangefinder lens" },
  { slug:"leica-summicron-m-35mm-f2", name:"Leica Summicron-M 35mm f/2", brand:"Leica", mount:"Leica M", focalLength:"35mm", maxAperture:"f/2", focusType:"Manual", coverage:"35mm", minFocusM:0.7, filterThread:"39mm", family:"M-mount reportage prime" },
  { slug:"leica-summicron-m-50mm-f2", name:"Leica Summicron-M 50mm f/2", brand:"Leica", mount:"Leica M", focalLength:"50mm", maxAperture:"f/2", focusType:"Manual", coverage:"35mm", minFocusM:0.7, filterThread:"39mm", family:"M-mount standard prime" },
  { slug:"leica-tele-elmarit-m-90mm-f2-8", name:"Leica Tele-Elmarit-M 90mm f/2.8", brand:"Leica", mount:"Leica M", focalLength:"90mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", minFocusM:1, filterThread:"39mm", family:"compact M-mount telephoto" },

  { slug:"zeiss-distagon-28mm-f2-8-cy", name:"Carl Zeiss Distagon T* 28mm f/2.8", brand:"Carl Zeiss", mount:"Contax/Yashica", focalLength:"28mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", minFocusM:0.25, filterThread:"55mm", family:"C/Y wide-angle prime" },
  { slug:"zeiss-planar-50mm-f1-7-cy", name:"Carl Zeiss Planar T* 50mm f/1.7", brand:"Carl Zeiss", mount:"Contax/Yashica", focalLength:"50mm", maxAperture:"f/1.7", focusType:"Manual", coverage:"35mm", minFocusM:0.6, filterThread:"55mm", family:"C/Y standard prime" },
  { slug:"zeiss-sonnar-85mm-f2-8-cy", name:"Carl Zeiss Sonnar T* 85mm f/2.8", brand:"Carl Zeiss", mount:"Contax/Yashica", focalLength:"85mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"35mm", minFocusM:1, filterThread:"55mm", family:"compact C/Y portrait prime" },

  { slug:"mamiya-sekor-c-45mm-f2-8-645", name:"Mamiya-Sekor C 45mm f/2.8", brand:"Mamiya", mount:"Mamiya 645", focalLength:"45mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"645", minFocusM:0.45, filterThread:"77mm", family:"645 wide-angle prime" },
  { slug:"mamiya-sekor-c-80mm-f2-8-645", name:"Mamiya-Sekor C 80mm f/2.8", brand:"Mamiya", mount:"Mamiya 645", focalLength:"80mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"645", minFocusM:0.7, filterThread:"58mm", family:"645 standard prime" },
  { slug:"mamiya-sekor-c-150mm-f3-5-645", name:"Mamiya-Sekor C 150mm f/3.5", brand:"Mamiya", mount:"Mamiya 645", focalLength:"150mm", maxAperture:"f/3.5", focusType:"Manual", coverage:"645", minFocusM:1.5, filterThread:"58mm", family:"645 portrait telephoto" },

  { slug:"hasselblad-distagon-50mm-f4", name:"Carl Zeiss Distagon 50mm f/4", brand:"Carl Zeiss", mount:"Hasselblad V", focalLength:"50mm", maxAperture:"f/4", focusType:"Manual", coverage:"6x6", minFocusM:0.5, family:"6x6 wide-angle prime" },
  { slug:"hasselblad-planar-80mm-f2-8", name:"Carl Zeiss Planar 80mm f/2.8", brand:"Carl Zeiss", mount:"Hasselblad V", focalLength:"80mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"6x6", minFocusM:0.9, family:"6x6 standard prime" },
  { slug:"hasselblad-sonnar-150mm-f4", name:"Carl Zeiss Sonnar 150mm f/4", brand:"Carl Zeiss", mount:"Hasselblad V", focalLength:"150mm", maxAperture:"f/4", focusType:"Manual", coverage:"6x6", minFocusM:1.4, family:"6x6 portrait telephoto" },

  { slug:"pentax-67-55mm-f4", name:"SMC Pentax 67 55mm f/4", brand:"Pentax", mount:"Pentax 67", focalLength:"55mm", maxAperture:"f/4", focusType:"Manual", coverage:"6x7", minFocusM:0.35, filterThread:"77mm", family:"6x7 wide-angle prime" },
  { slug:"pentax-67-105mm-f2-4", name:"SMC Pentax 67 105mm f/2.4", brand:"Pentax", mount:"Pentax 67", focalLength:"105mm", maxAperture:"f/2.4", focusType:"Manual", coverage:"6x7", minFocusM:1, filterThread:"67mm", family:"fast 6x7 standard/portrait prime" },
  { slug:"pentax-67-165mm-f2-8", name:"SMC Pentax 67 165mm f/2.8", brand:"Pentax", mount:"Pentax 67", focalLength:"165mm", maxAperture:"f/2.8", focusType:"Manual", coverage:"6x7", minFocusM:1.6, filterThread:"67mm", family:"fast 6x7 portrait telephoto" },
];

export const lenses: Lens[] = seeds.map(({ family, ...lens }) => ({
  ...lens,
  kind: "lens",
  description: `${lens.name} is a ${family} for the ${lens.mount} system, covering ${lens.coverage} film with a maximum aperture of ${lens.maxAperture}.`,
  descriptionTh: `${lens.name} เป็นเลนส์ประเภท ${family} สำหรับระบบ ${lens.mount} ครอบคลุมฟิล์ม ${lens.coverage} และมีรูรับแสงกว้างสุด ${lens.maxAperture}`,
}));
