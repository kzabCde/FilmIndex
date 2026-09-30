import type { Film } from "@/types";

const commonsFile = (name: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=1400`;
const commonsSource = (name: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name).replaceAll("%20", "_")}`;
const image = (name: string, creator: string, license: string, alt: string) => ({
  url: commonsFile(name), sourceName: "Wikimedia Commons", sourceUrl: commonsSource(name), creator, license,
  attributionRequired: !["Public Domain", "CC0 1.0"].includes(license), alt,
});

export const wave4Films: Film[] = [
  {
    kind: "film", slug: "kodak-plus-x-pan", name: "Kodak Plus-X Pan", brand: "Kodak", iso: 125,
    filmType: "Black & White", process: "B&W", formats: ["35mm", "120", "Sheet Film"],
    description: "A discontinued medium-speed panchromatic black-and-white film remembered for fine grain, moderate contrast, and classic documentary and general-purpose rendering.",
    descriptionTh: "ฟิล์มขาวดำแพนโครมาติกความไวปานกลางที่ยุติการผลิตแล้ว เป็นที่จดจำจากเกรนละเอียด คอนทราสต์ปานกลาง และบุคลิกคลาสสิกสำหรับงานสารคดีและงานทั่วไป",
    characteristics: { Grain: "Fine", Contrast: "Medium", Saturation: "N/A", Sharpness: "High", "Exposure latitude": "Medium" },
    uses: ["Documentary", "Portrait", "Landscape", "Everyday"],
    image: image("Class 56 56077 at Rainhill.jpg", "Barry Lewis", "See source page", "Railway scene photographed on Kodak Plus-X film"),
  },
  {
    kind: "film", slug: "kodak-technical-pan", name: "Kodak Technical Pan", brand: "Kodak", iso: 25,
    filmType: "Black & White", process: "B&W", formats: ["35mm", "120", "Sheet Film"],
    description: "A discontinued ultra-fine-grain high-resolution film whose effective pictorial speed depended strongly on developer and application; EI 25 is a common pictorial reference rather than a universal rating.",
    descriptionTh: "ฟิล์มขาวดำความละเอียดสูงและเกรนละเอียดมากที่ยุติการผลิตแล้ว ความไวใช้งานจริงขึ้นกับน้ำยาและลักษณะงานอย่างมาก โดย EI 25 เป็นค่าที่นิยมอ้างอิงสำหรับงานภาพทั่วไป ไม่ใช่ค่าตายตัวทุกกรณี",
    characteristics: { Grain: "Very Fine", Contrast: "High", Saturation: "N/A", Sharpness: "Very High", "Exposure latitude": "Low" },
    uses: ["Fine Art", "Architecture", "Landscape", "Technical"],
    image: image("2012 Stockholm Citybanan construction at Riddarfjärden.jpg", "Wikimedia Commons contributor (see source page)", "See source page", "Stockholm construction scene photographed on Kodak Technical Pan"),
  },
  {
    kind: "film", slug: "kodak-vision3-50d", name: "Kodak VISION3 50D 5203/7203", brand: "Kodak", iso: 50,
    filmType: "Color Negative", process: "ECN-2", formats: ["35mm Motion Picture", "16mm Motion Picture"],
    description: "A daylight-balanced EI 50 motion-picture color negative stock with very fine grain, broad highlight latitude, and ECN-2 processing rather than standard C-41.",
    descriptionTh: "ฟิล์มเนกาทีฟสีภาพยนตร์ EI 50 สมดุลแสงกลางวัน ให้เกรนละเอียดมากและเก็บรายละเอียดไฮไลต์ได้กว้าง ใช้กระบวนการ ECN-2 ไม่ใช่ C-41 มาตรฐาน",
    characteristics: { Grain: "Very Fine", Contrast: "Low", Saturation: "Medium", Sharpness: "High", "Exposure latitude": "Very High" },
    uses: ["Cinema", "Daylight", "Landscape", "Portrait"],
    image: image("20260906 Whitonia.jpg", "Wikimedia Commons contributor (see source page)", "See source page", "Photograph made on Kodak VISION3 50D film"),
  },
  {
    kind: "film", slug: "kodak-vision3-250d", name: "Kodak VISION3 250D 5207/7207", brand: "Kodak", iso: 250,
    filmType: "Color Negative", process: "ECN-2", formats: ["35mm Motion Picture", "16mm Motion Picture"],
    description: "A daylight-balanced EI 250 motion-picture negative designed for location work where more speed is needed than 50D while retaining broad dynamic range and ECN-2 workflow.",
    descriptionTh: "ฟิล์มเนกาทีฟสีภาพยนตร์ EI 250 สมดุลแสงกลางวัน เหมาะกับงานโลเคชันที่ต้องการความไวมากกว่า 50D พร้อมช่วงไดนามิกกว้างและการล้างแบบ ECN-2",
    characteristics: { Grain: "Fine", Contrast: "Low", Saturation: "Medium", Sharpness: "High", "Exposure latitude": "Very High" },
    uses: ["Cinema", "Daylight", "Travel", "Portrait"],
    image: image("Nissan Atlas 150 truck 2021-08 Stupino.jpg", "Artem Svetlov", "See source page", "Truck photographed on Kodak VISION3 250D film"),
  },
  {
    kind: "film", slug: "kodak-vision3-500t", name: "Kodak VISION3 500T 5219/7219", brand: "Kodak", iso: 500,
    filmType: "Color Negative", process: "ECN-2", formats: ["35mm Motion Picture", "16mm Motion Picture"],
    description: "A tungsten-balanced EI 500 motion-picture negative intended for low-light and artificial-light cinematography, with broad latitude and ECN-2 processing.",
    descriptionTh: "ฟิล์มเนกาทีฟสีภาพยนตร์ EI 500 สมดุลแสงทังสเตน เหมาะกับแสงน้อยและแสงประดิษฐ์ ให้ช่วงเผื่อการรับแสงกว้างและใช้การล้าง ECN-2",
    characteristics: { Grain: "Medium", Contrast: "Low", Saturation: "Medium", Sharpness: "High", "Exposure latitude": "Very High" },
    uses: ["Cinema", "Low Light", "Night", "Portrait"],
    image: image("Caña Cocktails - Flickr - incidencematrix.jpg", "incidencematrix", "See source page", "Low-light scene photographed on Kodak VISION3 500T film"),
  },
  {
    kind: "film", slug: "kodachrome-64", name: "Kodak Kodachrome 64", brand: "Kodak", iso: 64,
    filmType: "Slide / Reversal", process: "K-14 (discontinued)", formats: ["35mm", "120 (historical availability)"],
    description: "A discontinued color reversal film famous for archival stability, fine grain, and distinctive color. Its specialized K-14 process is no longer commercially available.",
    descriptionTh: "ฟิล์มสไลด์สีในตำนานที่ยุติการผลิตแล้ว มีชื่อเสียงด้านความคงทนของภาพ เกรนละเอียด และสีที่เป็นเอกลักษณ์ โดยกระบวนการ K-14 เฉพาะทางไม่มีบริการเชิงพาณิชย์แล้ว",
    characteristics: { Grain: "Very Fine", Contrast: "High", Saturation: "High", Sharpness: "Very High", "Exposure latitude": "Low" },
    uses: ["Travel", "Documentary", "Landscape", "Archive"],
    image: image("New York Marriott Marquis Under construction-June 1984.jpg", "TedQuackenbush", "CC BY-SA 3.0", "New York photographed on Kodachrome 64 slide film"),
  },
  {
    kind: "film", slug: "fujifilm-superia-reala-100", name: "Fujifilm Superia Reala 100", brand: "Fujifilm", iso: 100,
    filmType: "Color Negative", process: "C-41", formats: ["35mm", "120 (historical availability)"],
    description: "A discontinued ISO 100 color negative film remembered for natural color, fine grain, and restrained contrast in daylight, portrait, and travel photography.",
    descriptionTh: "ฟิล์มเนกาทีฟสี ISO 100 ที่ยุติการผลิตแล้ว เป็นที่จดจำจากสีเป็นธรรมชาติ เกรนละเอียด และคอนทราสต์ไม่จัด เหมาะกับกลางวัน พอร์ตเทรต และการเดินทาง",
    characteristics: { Grain: "Fine", Contrast: "Low", Saturation: "Medium", Sharpness: "High", "Exposure latitude": "High" },
    uses: ["Portrait", "Travel", "Everyday", "Landscape"],
    image: image("Cimiez monastery in Nice.jpg", "Ericd", "See source page", "Cimiez Monastery photographed on Fujifilm Superia Reala 100"),
  },
  {
    kind: "film", slug: "agfaphoto-apx-400", name: "AgfaPhoto APX 400", brand: "AgfaPhoto", iso: 400,
    filmType: "Black & White", process: "B&W", formats: ["35mm"],
    description: "A general-purpose ISO 400 panchromatic black-and-white film with useful handheld speed and a traditional tonal character for street, travel, and available-light work.",
    descriptionTh: "ฟิล์มขาวดำแพนโครมาติก ISO 400 สำหรับใช้งานทั่วไป มีความไวเหมาะกับการถือถ่าย ให้บุคลิกโทนแบบดั้งเดิมสำหรับสตรีท การเดินทาง และแสงธรรมชาติ",
    characteristics: { Grain: "Medium", Contrast: "Medium", Saturation: "N/A", Sharpness: "Medium", "Exposure latitude": "High" },
    uses: ["Street", "Travel", "Documentary", "Low Light"],
    image: image("Moenckebergstrasse 280817 APX400.jpg", "NAC", "CC BY-SA 4.0", "Mönckebergstraße photographed on AgfaPhoto APX 400"),
  },
  {
    kind: "film", slug: "rollei-infrared-400", name: "Rollei Infrared 400", brand: "Rollei", iso: 400,
    filmType: "Black & White", process: "B&W", formats: ["35mm", "120"],
    description: "A superpanchromatic black-and-white film with extended red and near-infrared sensitivity, usable normally or with strong red/IR filters for pronounced infrared effects.",
    descriptionTh: "ฟิล์มขาวดำ superpanchromatic ISO 400 ที่ไวต่อแสงแดงและใกล้อินฟราเรดมากขึ้น ใช้ถ่ายทั่วไปได้หรือใช้ฟิลเตอร์แดง/IR เพื่อสร้างเอฟเฟกต์อินฟราเรดเด่นชัด",
    characteristics: { Grain: "Medium", Contrast: "High", Saturation: "N/A", Sharpness: "High", "Exposure latitude": "Medium" },
    uses: ["Infrared", "Landscape", "Fine Art", "Architecture"],
    image: image("St. Nicholas Roman Catholic Church, Kyiv 01.jpg", "Грибюк Руслан Володимирович", "CC BY-SA 4.0", "St. Nicholas Church in Kyiv photographed on Rollei Infrared 400"),
  },
  {
    kind: "film", slug: "fujifilm-superia-xtra-800", name: "Fujifilm Superia X-TRA 800", brand: "Fujifilm", iso: 800,
    filmType: "Color Negative", process: "C-41", formats: ["35mm"],
    description: "A discontinued high-speed consumer color negative film designed for handheld low-light, indoor, and action photography with the Superia family's vivid color response.",
    descriptionTh: "ฟิล์มเนกาทีฟสีความไวสูง ISO 800 ที่ยุติการผลิตแล้ว ออกแบบสำหรับถือถ่ายในแสงน้อย ภายในอาคาร และภาพเคลื่อนไหว พร้อมสีสดในแบบตระกูล Superia",
    characteristics: { Grain: "High", Contrast: "Medium", Saturation: "High", Sharpness: "Medium", "Exposure latitude": "High" },
    uses: ["Low Light", "Night", "Street", "Everyday"],
    image: image("Singapore skyline - Flickr - Nicolas Lannuzel.jpg", "Nicolas Lannuzel", "CC BY-SA 2.0", "Singapore skyline photographed on Fujifilm Superia X-TRA 800"),
  },
];
