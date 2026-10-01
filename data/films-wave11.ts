import type { Film } from "@/types";

export const wave11Films: Film[] = [
  {
    kind: "film",
    slug: "kodak-ektapan-100",
    name: "Kodak EKTAPAN 100",
    brand: "Kodak",
    iso: 100,
    filmType: "Black & White",
    process: "B&W",
    formats: ["35mm", "120", "35mm bulk", "4x5"],
    description: "A current ISO 100 continuous-tone panchromatic black-and-white negative film in Eastman Kodak's EKTAPAN family. Kodak describes its T-Grain emulsion as extremely fine grained, highly resolving, and suited to detailed general, architectural, portrait, landscape, and commercial work.",
    descriptionTh: "ฟิล์มเนกาทีฟขาวดำแพนโครมาติก ISO 100 ในตระกูล EKTAPAN ปัจจุบันของ Eastman Kodak ใช้โครงสร้าง T-Grain ที่ Kodak ระบุว่าให้เกรนละเอียดมาก ความคมและกำลังแยกรายละเอียดสูง เหมาะกับงานทั่วไป สถาปัตยกรรม พอร์ตเทรต ภูมิทัศน์ และงานเชิงพาณิชย์ที่ต้องการรายละเอียดสูง",
    characteristics: { Grain: "Very Low", Contrast: "Medium High", Saturation: "N/A", Sharpness: "Very High", "Exposure latitude": "High" },
    uses: ["Architecture", "Landscape", "Portrait", "Fine Art", "Commercial"],
  },
];
