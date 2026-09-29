import { ShootingTools } from "@/components/shooting-tools";
import { parseLocale } from "@/lib/i18n";

export default async function ToolsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const isTh = locale === "th";

  return (
    <section className="shell listing-page tools-page">
      <header>
        <p className="eyebrow">{isTh ? "เครื่องมือช่วยถ่าย" : "Shooting utilities"}</p>
        <h1>{isTh ? "Tools" : "Tools"}</h1>
        <p>{isTh ? "เครื่องมือคำนวณแบบ local สำหรับช่วยตั้งค่าแสง วางแผน Push/Pull และทบทวนหลักพื้นฐานโดยไม่ส่งข้อมูลออกจาก browser" : "Local calculators for exposure starting points, push/pull planning, and practical shooting references without sending data anywhere."}</p>
      </header>
      <ShootingTools locale={locale} />
    </section>
  );
}
