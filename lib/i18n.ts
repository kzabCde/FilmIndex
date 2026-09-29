export type Locale = "en" | "th";

export function parseLocale(value: unknown): Locale {
  return value === "th" ? "th" : "en";
}

export function pick(locale: Locale, english: string, thai?: string) {
  return locale === "th" && thai ? thai : english;
}

export function withLocale(href: string, locale: Locale) {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const [beforeHash, hash = ""] = href.split("#", 2);
  const [pathname, query = ""] = beforeHash.split("?", 2);
  const params = new URLSearchParams(query);
  params.set("lang", locale);
  const suffix = hash ? `#${hash}` : "";
  return `${pathname}?${params.toString()}${suffix}`;
}

const filmTypes: Record<string, string> = {
  "Color Negative": "ฟิล์มเนกาทีฟสี",
  "Black & White": "ฟิล์มขาวดำ",
  "Slide / Reversal": "ฟิล์มสไลด์ / รีเวอร์ซัล",
  "Motion Picture": "ฟิล์มภาพยนตร์",
  Specialty: "ฟิล์มพิเศษ",
};

const cameraTypes: Record<string, string> = {
  SLR: "SLR",
  Rangefinder: "เรนจ์ไฟน์เดอร์",
  "Point & Shoot": "คอมแพค",
  "Medium Format": "มีเดียมฟอร์แมต",
  TLR: "TLR",
  Instant: "อินสแตนต์",
};

const categories: Record<string, string> = {
  Exposure: "การรับแสง",
  "Film Processing": "การล้างฟิล์ม",
  "Getting Started": "เริ่มต้นใช้งาน",
  "Creative Techniques": "เทคนิคสร้างสรรค์",
  "Film Care": "การดูแลฟิล์ม",
  Scanning: "การสแกน",
};

const difficulties: Record<string, string> = {
  Beginner: "เริ่มต้น",
  Intermediate: "ระดับกลาง",
  Advanced: "ขั้นสูง",
};

const characteristicKeys: Record<string, string> = {
  Grain: "เกรน",
  Contrast: "คอนทราสต์",
  Saturation: "ความอิ่มสี",
  Sharpness: "ความคมชัด",
  "Exposure latitude": "ช่วงเผื่อการรับแสง",
};

const characteristicValues: Record<string, string> = {
  "Very Low": "ต่ำมาก",
  Low: "ต่ำ",
  Fine: "ละเอียด",
  Medium: "ปานกลาง",
  High: "สูง",
  "Very High": "สูงมาก",
  "N/A": "ไม่เกี่ยวข้อง",
};

const useLabels: Record<string, string> = {
  Portrait: "พอร์ตเทรต",
  Travel: "ท่องเที่ยว",
  Street: "สตรีท",
  Everyday: "ชีวิตประจำวัน",
  Landscape: "ภูมิทัศน์",
  Documentary: "สารคดี",
  "Low Light": "แสงน้อย",
  Night: "กลางคืน",
  Urban: "เมือง",
  "Artificial Light": "แสงประดิษฐ์",
  Nature: "ธรรมชาติ",
  Product: "สินค้า",
  Fashion: "แฟชั่น",
};

export const filmTypeLabel = (value: string, locale: Locale) => locale === "th" ? filmTypes[value] ?? value : value;
export const cameraTypeLabel = (value: string, locale: Locale) => locale === "th" ? cameraTypes[value] ?? value : value;
export const techniqueCategoryLabel = (value: string, locale: Locale) => locale === "th" ? categories[value] ?? value : value;
export const difficultyLabel = (value: string, locale: Locale) => locale === "th" ? difficulties[value] ?? value : value;
export const characteristicKeyLabel = (value: string, locale: Locale) => locale === "th" ? characteristicKeys[value] ?? value : value;
export const characteristicValueLabel = (value: string, locale: Locale) => locale === "th" ? characteristicValues[value] ?? value : value;
export const useLabel = (value: string, locale: Locale) => locale === "th" ? useLabels[value] ?? value : value;

export const messages = {
  en: {
    nav: { films: "Films", cameras: "Cameras", techniques: "Techniques", compare: "Compare", sources: "Sources" },
    search: { trigger: "Search FilmIndex", placeholder: "Search films, cameras or techniques…", empty: "No matching entries.", aria: "Search FilmIndex" },
    home: {
      eyebrow: "Analog Photography Knowledge Database",
      titleTop: "Everything Analog.",
      titleBottom: "One Index.",
      copy: "Explore photographic films, classic cameras, shooting techniques, and technical specifications in one searchable archive.",
      materials: "01 / Materials", popularFilms: "Popular films", hardware: "02 / Hardware", exploreCameras: "Explore cameras", knowledge: "03 / Knowledge", learn: "Learn film photography", viewAll: "View all →",
    },
    films: { eyebrow: "Film Database", title: "Films", copy: "Factual specifications and clearly labeled editorial characteristics, with source-aware imagery.", all: "All", empty: "No films match these filters." },
    cameras: { eyebrow: "Camera Database", title: "Cameras", copy: "Technical references for classic analog cameras with authentic, attributed photography.", all: "All" },
    techniques: { eyebrow: "Knowledge Base", title: "Techniques", copy: "Clear explanations for exposure, film handling, processing, and creative analog workflows." },
    compare: { eyebrow: "Side by side", title: "Compare", copy: "Compare 2–4 films or cameras. Factual data and editorial film characteristics remain visibly distinct.", select: "Select 2–4 items. The URL updates automatically and can be shared.", choose: "Choose at least two items to compare.", attribute: "Attribute" },
    detail: { editorial: "Editorial characteristics", filmCharacter: "Film character", editorialNotice: "These descriptions are editorial guidance, not manufacturer specifications.", typicalUses: "Typical uses", imageSource: "Image source", openSource: "Open source record ↗", backFilms: "← Back to films", factual: "Factual data", specifications: "Specifications", backCameras: "← Back to cameras", backTechniques: "← Back to techniques", source: "source" },
    sources: { eyebrow: "Transparency", title: "Sources & attribution", copy: "FilmIndex separates factual specifications from editorial descriptions and records provenance for external imagery.", dataPolicy: "Data policy", dataCopy: "Manufacturer documentation, manuals, and datasheets should be preferred for technical facts. Editorial characteristics such as perceived grain, color rendering, or typical use are not manufacturer specifications and are labeled accordingly.", imageRecords: "Image records" },
    footer: { tagline: "Explore analog photography.", note: "FilmIndex is an independent analog photography reference project. Manufacturer names and trademarks belong to their respective owners." },
    misc: { minutes: "min", imagePending: "Image pending source verification", open: "Open" },
  },
  th: {
    nav: { films: "ฟิล์ม", cameras: "กล้อง", techniques: "เทคนิค", compare: "เปรียบเทียบ", sources: "แหล่งข้อมูล" },
    search: { trigger: "ค้นหาใน FilmIndex", placeholder: "ค้นหาฟิล์ม กล้อง หรือเทคนิค…", empty: "ไม่พบรายการที่ตรงกับคำค้น", aria: "ค้นหาใน FilmIndex" },
    home: {
      eyebrow: "ฐานความรู้การถ่ายภาพฟิล์ม",
      titleTop: "ทุกเรื่องของฟิล์ม",
      titleBottom: "รวมไว้ในดัชนีเดียว",
      copy: "สำรวจฟิล์มถ่ายภาพ กล้องฟิล์มคลาสสิก เทคนิคการถ่าย และข้อมูลทางเทคนิคจากคลังข้อมูลที่ค้นหาได้ง่าย",
      materials: "01 / ฟิล์ม", popularFilms: "ฟิล์มยอดนิยม", hardware: "02 / กล้อง", exploreCameras: "สำรวจกล้อง", knowledge: "03 / ความรู้", learn: "เรียนรู้การถ่ายภาพฟิล์ม", viewAll: "ดูทั้งหมด →",
    },
    films: { eyebrow: "ฐานข้อมูลฟิล์ม", title: "ฟิล์ม", copy: "ข้อมูลสเปกเชิงข้อเท็จจริง แยกจากลักษณะเชิงบรรณาธิการอย่างชัดเจน พร้อมรูปภาพที่ระบุแหล่งที่มา", all: "ทั้งหมด", empty: "ไม่พบฟิล์มที่ตรงกับตัวกรอง" },
    cameras: { eyebrow: "ฐานข้อมูลกล้อง", title: "กล้องฟิล์ม", copy: "ข้อมูลอ้างอิงทางเทคนิคของกล้องฟิล์มคลาสสิก พร้อมภาพจริงและการระบุแหล่งที่มา", all: "ทั้งหมด" },
    techniques: { eyebrow: "คลังความรู้", title: "เทคนิค", copy: "คำอธิบายที่อ่านง่ายเกี่ยวกับการรับแสง การใช้งานฟิล์ม การล้าง และเทคนิคสร้างสรรค์แบบอนาล็อก" },
    compare: { eyebrow: "เทียบแบบตัวต่อตัว", title: "เปรียบเทียบ", copy: "เปรียบเทียบฟิล์มหรือกล้อง 2–4 รายการ โดยแยกข้อมูลข้อเท็จจริงออกจากลักษณะฟิล์มเชิงบรรณาธิการ", select: "เลือก 2–4 รายการ ระบบจะอัปเดต URL อัตโนมัติและสามารถแชร์ได้", choose: "เลือกอย่างน้อยสองรายการเพื่อเปรียบเทียบ", attribute: "คุณสมบัติ" },
    detail: { editorial: "ลักษณะเชิงบรรณาธิการ", filmCharacter: "คาแรกเตอร์ของฟิล์ม", editorialNotice: "คำอธิบายส่วนนี้เป็นแนวทางเชิงบรรณาธิการ ไม่ใช่สเปกจากผู้ผลิต", typicalUses: "งานที่เหมาะ", imageSource: "แหล่งที่มาของภาพ", openSource: "เปิดหน้าต้นฉบับ ↗", backFilms: "← กลับไปหน้าฟิล์ม", factual: "ข้อมูลข้อเท็จจริง", specifications: "ข้อมูลจำเพาะ", backCameras: "← กลับไปหน้ากล้อง", backTechniques: "← กลับไปหน้าเทคนิค", source: "แหล่งที่มา" },
    sources: { eyebrow: "ความโปร่งใส", title: "แหล่งข้อมูลและเครดิต", copy: "FilmIndex แยกข้อมูลสเปกเชิงข้อเท็จจริงออกจากคำอธิบายเชิงบรรณาธิการ และบันทึกที่มาของภาพภายนอก", dataPolicy: "นโยบายข้อมูล", dataCopy: "ข้อมูลทางเทคนิคควรอ้างอิงเอกสารผู้ผลิต คู่มือ และ datasheet เป็นหลัก ส่วนลักษณะอย่างเกรน โทนสี หรือการใช้งานที่เหมาะเป็นคำอธิบายเชิงบรรณาธิการและจะระบุให้ชัดเจน", imageRecords: "รายการเครดิตภาพ" },
    footer: { tagline: "สำรวจโลกของการถ่ายภาพฟิล์ม", note: "FilmIndex เป็นโครงการอ้างอิงการถ่ายภาพฟิล์มอิสระ ชื่อผู้ผลิตและเครื่องหมายการค้าเป็นทรัพย์สินของเจ้าของแต่ละราย" },
    misc: { minutes: "นาที", imagePending: "กำลังตรวจสอบแหล่งที่มาของภาพ", open: "เปิด" },
  },
} as const;
