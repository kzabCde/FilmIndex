import Link from "next/link";
import { parseLocale } from "@/lib/i18n";
import { TOOL_CATALOG, TOOL_CATEGORY_LABELS, type ToolCategory } from "@/lib/tool-catalog";

const categories: ToolCategory[] = ["shooting", "planning", "lab"];

export default async function ToolsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const isTh = locale === "th";

  return (
    <section className="shell listing-page tools-page">
      <header className="tool-hub-header">
        <p className="eyebrow">Analog photography toolkit</p>
        <h1>Tools</h1>
        <p>{isTh ? "เครื่องมือทั้งหมดถูกแยกเป็นหน้าเฉพาะแล้ว เพื่อใช้งานบนมือถือได้ง่ายขึ้น ตั้งแต่การตั้งค่าแสง วางแผนม้วนฟิล์ม ไปจนถึงงานห้องล้างและการแปลงเนกาทีฟแบบ local" : "Every utility now has its own focused page, from exposure and roll planning to film-lab workflows and local negative conversion."}</p>
      </header>

      <div className="tool-hub-sections">
        {categories.map((category) => {
          const label = TOOL_CATEGORY_LABELS[category];
          const tools = TOOL_CATALOG.filter((tool) => tool.category === category);
          return (
            <section className="tool-hub-section" key={category}>
              <header>
                <p className="eyebrow">{category === "lab" ? "Film Lab Tools" : category === "planning" ? "Planning" : "Shooting"}</p>
                <h2>{isTh ? label.th : label.en}</h2>
                <p>{isTh ? label.descriptionTh : label.descriptionEn}</p>
              </header>
              <div className="tool-hub-grid">
                {tools.map((tool) => (
                  <Link className="tool-hub-card" href={`/tools/${tool.slug}?lang=${locale}`} key={tool.slug}>
                    <span className="tool-hub-code">{tool.code}</span>
                    <div>
                      <h3>{isTh ? tool.titleTh : tool.title}</h3>
                      <p>{isTh ? tool.descriptionTh : tool.description}</p>
                    </div>
                    <span className="tool-hub-arrow" aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
