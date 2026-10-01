import type { ImageCredit } from "@/types";

export type LensImageRecord = {
  image: ImageCredit;
  match: "exact" | "representative";
};

const commonsFile = (name: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=1400`;

function commons(name: string, alt: string, match: LensImageRecord["match"] = "exact"): LensImageRecord {
  return {
    match,
    image: {
      url: commonsFile(name),
      sourceName: "Wikimedia Commons",
      sourceUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name).replace(/%20/g, "_")}`,
      creator: "Wikimedia Commons contributor (see source page)",
      license: "See source page",
      attributionRequired: true,
      alt,
    },
  };
}

const canonFd28 = commons("Canon 28mm f2.8 lens.jpeg", "Canon FDn 28mm f/2.8 lens");
const canonFd35 = commons("Canon lens FD 35mm f2 09137.jpg", "Canon FD 35mm f/2 lens");
const canonFd50 = commons("Canon FD 50mm f-1.4 S.S.C. Lens (5778074077).jpg", "Canon FD 50mm f/1.4 S.S.C. lens");
const canonFd85 = commons("Canon FD 85mm f-1.8 S.S.C. Lens (5770176081).jpg", "Canon FD 85mm f/1.8 S.S.C. lens");
const canonFdFamily = commons("Canon FD lens DenisBarthel 2015 08.JPG", "Representative Canon FD system lens", "representative");
const canonEf50 = commons("Canon EF 50 mm f 1.8 II.jpg", "Canon EF 50mm f/1.8 II lens");
const canonEf85 = commons("Canon EF85mm 1 8.jpg", "Canon EF 85mm f/1.8 lens");
const canonEfFamily = commons("Canon EF 50 mm f 1.8 II.jpg", "Representative Canon EF autofocus lens", "representative");

const nikon24 = commons("Nikon N2020 (8296011626).jpg", "Nikon camera with Nikkor 24mm f/2.8 AI lens");
const nikon28 = commons("Nikon 28mm f2.8 MF.jpg", "Nikkor 28mm f/2.8 manual-focus lens");
const nikon50 = commons("Nikkor 50mm 1.4 AI-S on GF3.jpg", "Nikkor 50mm f/1.4 AI-S lens");
const nikon85 = commons("Nikkor 85mm f2.jpg", "Nikkor 85mm f/2 lens");
const nikonFamily = commons("Nikkor 85mm f2.jpg", "Representative Nikon AI-S manual-focus lens", "representative");

const takumar28 = commons("Super tak 28 35 ft.jpg", "Super-Takumar 28mm f/3.5 lens");
const takumar50 = commons("Super-Takumar 50mm f 1.4 (50944783051).jpg", "Super-Takumar 50mm f/1.4 lens");
const takumar55 = commons("Nikon Zf & Super-Takumar 55mm f-1.8.jpg", "Super-Takumar 55mm f/1.8 lens mounted on a camera");
const takumarFamily = commons("Super-Takumar 50mm f 1.4 (50944783051).jpg", "Representative Super-Takumar M42 lens", "representative");

const pentax28 = commons("MacroPlusRetrolens.jpg", "SMC Pentax-M 28mm f/2.8 shown in a macro setup");
const pentax50 = commons("Prime lenses lineup.jpg", "Pentax prime lens lineup including SMC Pentax-M 50mm f/1.7");
const pentax85 = commons("Prime lenses lineup.jpg", "Representative Pentax K-mount prime lens lineup", "representative");
const pentax135 = commons("Pentax MV.jpg", "Pentax camera fitted with SMC Pentax-M 135mm f/3.5 lens");

const minoltaFamily = commons("Minolta XE-5 XE-1 MC ROKKOR.jpg", "Minolta cameras with multiple MC Rokkor lenses", "representative");
const minolta45 = commons("Minolta al rokkor pf f2 45mm.jpg", "Minolta Rokkor 45mm f/2 lens");
const minolta50 = commons("Minolta MD Rokkor 50mm f1.4 -3 (3725888275).jpg", "Minolta MD Rokkor 50mm f/1.4 lens");
const minolta135 = commons("Vintage Minolta MC Tele Rokkor-PF 1 2.8 135mm Camera Lens, Made In Japan (36527342576).jpg", "Minolta Tele Rokkor 135mm f/2.8 lens");

const olympusFamily = commons("OYMPUS ZUIKO Lenses (4421419756).jpg", "Olympus Zuiko OM lens lineup including 28mm, 85mm and 135mm lenses", "representative");
const olympus50 = commons("Olympus Zuiko OM 50 mm lens.jpg", "Olympus Zuiko OM 50mm f/1.8 lens");

const leica28 = commons("Leica M (Typ 262) front with a Leitz 28mm Elmarit lens.jpg", "Leica M camera with 28mm Elmarit lens");
const leicaFamily = commons("Camera, rangefinder(and accessories) (AM 2014.57-2).jpg", "Leica M camera kit with 35mm, 50mm and 90mm M-mount lenses", "representative");
const leica50 = commons("Leica APO Summciron-M 50mm f2.jpg", "Leica 50mm f/2 Summicron-family M lens", "representative");

const cy28 = commons("Carl Zeiss 28 Contax.jpg", "Carl Zeiss 28mm Contax/Yashica mount lens");
const cy50 = commons("CARL ZEISS PLANAR.jpg", "Carl Zeiss Planar C/Y-mount lens");
const cy85 = commons("Contax-Yashica mount, lens.jpg", "Representative Contax/Yashica mount lens", "representative");

const mamiya45 = commons("Mamiya Sekor C 45mm.jpg", "Mamiya-Sekor C 45mm lens");
const mamiya80 = commons("Mamiya M645 1000S with Sekor C 80mm F1.9 lens mounted, and Sekor C 45mm F2.8 lens.jpg", "Mamiya 645 system with 80mm and 45mm Sekor C lenses", "representative");
const mamiya150 = commons("Mamiya Sekor C 150mm side.jpg", "Mamiya-Sekor C 150mm lens");

const hasselbladFamily = commons("Hasselblad 500 CM by Christopher Crouzet.jpg", "Hasselblad V-system camera with Carl Zeiss Planar 80mm f/2.8 lens", "representative");
const hasselblad80 = commons("Hasselblad 500 CM by Christopher Crouzet.jpg", "Hasselblad 500 C/M with Carl Zeiss Planar 80mm f/2.8 lens");
const pentax67Family = commons("Pentax 67 medium format SLR camera.jpg", "Pentax 67 medium-format camera and system lens", "representative");

export const lensImages: Record<string, LensImageRecord> = {
  "canon-fd-28mm-f2-8": canonFd28,
  "canon-fd-35mm-f2": canonFd35,
  "canon-fd-50mm-f1-4": canonFd50,
  "canon-fd-85mm-f1-8": canonFd85,
  "canon-fd-135mm-f2-5": canonFdFamily,
  "canon-ef-28mm-f2-8": canonEfFamily,
  "canon-ef-50mm-f1-8-ii": canonEf50,
  "canon-ef-85mm-f1-8-usm": canonEf85,
  "nikon-ai-s-24mm-f2-8": nikon24,
  "nikon-ai-s-28mm-f2-8": nikon28,
  "nikon-ai-s-50mm-f1-4": nikon50,
  "nikon-ai-s-85mm-f2": nikon85,
  "nikon-ai-s-105mm-f2-5": nikonFamily,
  "takumar-28mm-f3-5": takumar28,
  "takumar-50mm-f1-4": takumar50,
  "takumar-55mm-f1-8": takumar55,
  "takumar-135mm-f3-5": takumarFamily,
  "pentax-m-28mm-f2-8": pentax28,
  "pentax-m-50mm-f1-7": pentax50,
  "pentax-m-85mm-f2": pentax85,
  "pentax-m-135mm-f3-5": pentax135,
  "minolta-rokkor-28mm-f2-8": minoltaFamily,
  "minolta-rokkor-45mm-f2": minolta45,
  "minolta-rokkor-50mm-f1-4": minolta50,
  "minolta-rokkor-85mm-f1-7": minoltaFamily,
  "minolta-rokkor-135mm-f2-8": minolta135,
  "olympus-zuiko-28mm-f2-8": olympusFamily,
  "olympus-zuiko-50mm-f1-8": olympus50,
  "olympus-zuiko-85mm-f2": olympusFamily,
  "olympus-zuiko-135mm-f3-5": olympusFamily,
  "leica-elmarit-m-28mm-f2-8": leica28,
  "leica-summicron-m-35mm-f2": leicaFamily,
  "leica-summicron-m-50mm-f2": leica50,
  "leica-tele-elmarit-m-90mm-f2-8": leicaFamily,
  "zeiss-distagon-28mm-f2-8-cy": cy28,
  "zeiss-planar-50mm-f1-7-cy": cy50,
  "zeiss-sonnar-85mm-f2-8-cy": cy85,
  "mamiya-sekor-c-45mm-f2-8-645": mamiya45,
  "mamiya-sekor-c-80mm-f2-8-645": mamiya80,
  "mamiya-sekor-c-150mm-f3-5-645": mamiya150,
  "hasselblad-distagon-50mm-f4": hasselbladFamily,
  "hasselblad-planar-80mm-f2-8": hasselblad80,
  "hasselblad-sonnar-150mm-f4": hasselbladFamily,
  "pentax-67-55mm-f4": pentax67Family,
  "pentax-67-105mm-f2-4": pentax67Family,
  "pentax-67-165mm-f2-8": pentax67Family,
};
