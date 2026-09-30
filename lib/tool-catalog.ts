export type ToolCategory = "shooting" | "planning" | "lab" | "ecosystem";

export type ToolDefinition = {
  slug: string;
  category: ToolCategory;
  code: string;
  title: string;
  titleTh: string;
  description: string;
  descriptionTh: string;
};

export const TOOL_CATALOG: ToolDefinition[] = [
  { slug:"exposure", category:"shooting", code:"EV", title:"Exposure Calculator", titleTh:"คำนวณค่าแสง", description:"Calculate EV100 and equivalent aperture/shutter combinations.", descriptionTh:"คำนวณ EV100 และชุดรูรับแสง/ชัตเตอร์ที่ให้ค่าแสงเท่ากัน" },
  { slug:"reciprocity", category:"shooting", code:"RF", title:"Reciprocity Calculator", titleTh:"คำนวณ Reciprocity", description:"Plan long exposures with a clearly labeled generic reciprocity model.", descriptionTh:"วางแผน Long Exposure ด้วยโมเดล Reciprocity แบบทั่วไปที่ระบุข้อจำกัดชัดเจน" },
  { slug:"depth-of-field", category:"shooting", code:"DOF", title:"Depth of Field Calculator", titleTh:"คำนวณระยะชัด", description:"Estimate near/far limits, total depth of field, and hyperfocal distance.", descriptionTh:"ประมาณ Near/Far limit ช่วงระยะชัดรวม และ Hyperfocal distance" },
  { slug:"sunny-16", category:"shooting", code:"S16", title:"Sunny 16", titleTh:"Sunny 16", description:"Get a practical daylight exposure starting point without a light meter.", descriptionTh:"หาค่าแสงตั้งต้นสำหรับกลางวันโดยไม่ใช้ Light Meter" },
  { slug:"reciprocal-rule", category:"shooting", code:"1/F", title:"Reciprocal Rule", titleTh:"กฎส่วนกลับ", description:"Estimate a handheld minimum shutter speed from focal length.", descriptionTh:"ประมาณความเร็วชัตเตอร์ต่ำสุดสำหรับถือกล้องด้วยมือจากทางยาวโฟกัส" },
  { slug:"film-cost", category:"planning", code:"COST", title:"Film Cost Calculator", titleTh:"คำนวณต้นทุนฟิล์ม", description:"See total roll cost and real cost per frame.", descriptionTh:"รวมต้นทุนต่อม้วนและคำนวณค่าใช้จ่ายจริงต่อหนึ่งเฟรม" },
  { slug:"scan-resolution", category:"planning", code:"DPI", title:"Scan Resolution Calculator", titleTh:"คำนวณความละเอียดสแกน", description:"Estimate pixel dimensions, megapixels, and uncompressed RGB size.", descriptionTh:"ประมาณขนาดพิกเซล Megapixels และขนาดข้อมูล RGB จาก DPI" },
  { slug:"roll-logbook", category:"planning", code:"LOG", title:"Roll Logbook", titleTh:"สมุดบันทึกม้วนฟิล์ม", description:"Track loaded rolls and frame counts locally in this browser.", descriptionTh:"จดม้วนฟิล์มในกล้องและจำนวนเฟรมแบบ local ใน browser เครื่องนี้" },
  { slug:"development", category:"lab", code:"DEV", title:"Development Calculator", titleTh:"คำนวณการล้างฟิล์ม", description:"Adjust a trusted base development time for temperature and calculate dilution volumes.", descriptionTh:"ปรับเวลาล้างฐานที่เชื่อถือได้ตามอุณหภูมิ พร้อมคำนวณปริมาณน้ำยาและน้ำ" },
  { slug:"push-pull", category:"lab", code:"P/P", title:"Push / Pull Assistant", titleTh:"ผู้ช่วย Push / Pull", description:"Calculate shooting EI and optionally apply a lab-supplied development adjustment.", descriptionTh:"คำนวณ EI สำหรับถ่าย และปรับเวลาล้างเมื่อมีค่าชดเชยจาก datasheet หรือแล็บ" },
  { slug:"expired-film", category:"lab", code:"EXP", title:"Expired Film Calculator", titleTh:"คำนวณฟิล์มหมดอายุ", description:"Generate a conservative starting EI using an explicit, adjustable age heuristic.", descriptionTh:"หา EI ตั้งต้นแบบอนุรักษ์นิยมด้วย heuristic ตามอายุที่ผู้ใช้ปรับได้" },
  { slug:"negative-conversion", category:"lab", code:"NEG", title:"Negative Conversion", titleTh:"แปลงฟิล์มเนกาทีฟ", description:"Invert and tune a photographed or scanned negative entirely in the browser.", descriptionTh:"กลับสีและปรับภาพเนกาทีฟจากกล้องหรือสแกนเนอร์บน browser โดยไม่อัปโหลดไฟล์" },
  { slug:"camera-lens-compatibility", category:"ecosystem", code:"MOUNT", title:"Camera / Lens Compatibility", titleTh:"ตรวจสอบกล้องกับเลนส์", description:"Check native mount matches and a conservative list of explicitly supported mechanical adapter paths.", descriptionTh:"ตรวจสอบเมาท์ตรงและเส้นทางอะแดปเตอร์แบบอนุรักษ์นิยมที่บันทึกไว้อย่างชัดเจน" },
  { slug:"film-camera-recommendation", category:"ecosystem", code:"MATCH", title:"Film / Camera Recommendation", titleTh:"แนะนำฟิล์มตามกล้อง", description:"Rank compatible film stocks for a selected camera and shooting scenario using local catalog data.", descriptionTh:"จัดอันดับฟิล์มที่เข้ากับกล้องและสถานการณ์ถ่ายจากข้อมูล catalog ภายในเครื่อง" },
  { slug:"advanced-light-meter", category:"ecosystem", code:"METER", title:"Advanced Light Meter", titleTh:"Advanced Light Meter", description:"Calculate exposure from lux, use supported ambient sensors, and calibrate a local camera-relative meter.", descriptionTh:"คำนวณค่าแสงจาก Lux ใช้ Ambient Sensor เมื่อรองรับ และคาลิเบรตกล้องเป็น relative meter แบบ local" },
];

export function getToolBySlug(slug: string) {
  return TOOL_CATALOG.find((tool) => tool.slug === slug);
}

export const TOOL_CATEGORY_LABELS: Record<ToolCategory, { en: string; th: string; descriptionEn: string; descriptionTh: string }> = {
  shooting: { en:"Exposure & Shooting", th:"ค่าแสงและการถ่าย", descriptionEn:"Field calculators for exposure, focus, and handheld shooting decisions.", descriptionTh:"เครื่องมือภาคสนามสำหรับค่าแสง ระยะชัด และการตั้งค่าขณะถือกล้องถ่าย" },
  planning: { en:"Planning & Workflow", th:"วางแผนและ Workflow", descriptionEn:"Plan film costs, scanning, and rolls currently loaded in your cameras.", descriptionTh:"วางแผนต้นทุน การสแกน และม้วนฟิล์มที่กำลังอยู่ในกล้อง" },
  lab: { en:"Film Lab Tools", th:"เครื่องมือห้องล้างฟิล์ม", descriptionEn:"Development planning, push/pull guidance, expired film estimates, and local negative conversion.", descriptionTh:"วางแผนการล้าง Push/Pull ฟิล์มหมดอายุ และแปลงเนกาทีฟแบบ local" },
  ecosystem: { en:"Camera, Lens & Meter", th:"กล้อง เลนส์ และการวัดแสง", descriptionEn:"Connect the camera, lens, film, and exposure databases into practical compatibility and metering workflows.", descriptionTh:"เชื่อมฐานข้อมูลกล้อง เลนส์ ฟิล์ม และค่าแสงเข้าด้วยกันสำหรับตรวจ compatibility และช่วยวัดแสง" },
};
