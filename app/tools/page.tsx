import { ShootingTools } from "@/components/shooting-tools";
import { parseLocale } from "@/lib/i18n";

export default async function ToolsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const isTh = locale === "th";

  return (
    <section className="shell listing-page tools-page">
      <header>
        <p className="eyebrow">{isTh ? "Analog photography toolkit" : "Analog photography toolkit"}</p>
        <h1>{isTh ? "Tools" : "Tools"}</h1>
        <p>{isTh ? "ชุดเครื่องมือ local-first สำหรับคำนวณค่าแสง Reciprocity ระยะชัด ต้นทุน ความละเอียดสแกน บันทึกม้วนฟิล์ม และเครื่องมือถ่ายภาพเดิม โดยข้อมูลส่วนตัวไม่ถูกส่งออกจาก browser" : "A local-first toolkit for exposure, reciprocity, depth of field, film costs, scan resolution, roll logging, and classic shooting helpers without sending personal data out of the browser."}</p>
      </header>
      <ShootingTools locale={locale} />
    </section>
  );
}
