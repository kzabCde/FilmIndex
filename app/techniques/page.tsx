import type { Metadata } from "next";
import Link from "next/link";
import { CatalogFilters } from "@/components/catalog-filters";
import { techniques } from "@/lib/catalog";
import { getTechniqueGuide } from "@/data/technique-guides";
import { difficultyLabel, messages, parseLocale, pick, techniqueCategoryLabel, withLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Techniques", description: "Learn analog photography techniques through practical workflows, checklists, common mistakes, and sourced visual references." };

const stringParam = (value: string | string[] | undefined) => typeof value === "string" ? value : "";

export default async function TechniquesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const copy = messages[locale];
  const category = stringParam(params.category);
  const difficulty = stringParam(params.difficulty);
  const visible = techniques.filter((item) => (!category || item.category === category) && (!difficulty || item.difficulty === difficulty));
  const categories = [...new Set(techniques.map((item) => item.category))].sort();
  const difficulties = ["Beginner", "Intermediate", "Advanced"].filter((value) => techniques.some((item) => item.difficulty === value));
  const filterCopy = locale === "th"
    ? { category: "หมวดหมู่", difficulty: "ระดับ", apply: "ใช้ตัวกรอง", clear: "ล้างตัวกรอง", results: "บทความ" }
    : { category: "Category", difficulty: "Difficulty", apply: "Apply filters", clear: "Clear filters", results: "articles" };

  return <section className="shell listing-page"><header><p className="eyebrow">{copy.techniques.eyebrow}</p><h1>{copy.techniques.title}</h1><p>{locale === "th" ? "คู่มือเทคนิคฟิล์มแบบลงมือทำจริง พร้อมขั้นตอน จุดพลาด Checklist เครื่องมือที่เกี่ยวข้อง และภาพอ้างอิงในหัวข้อที่เหมาะสม" : "Practical analog photography guides with workflows, common mistakes, checklists, related tools, and sourced visual references where useful."}</p></header><CatalogFilters action="/techniques" locale={locale} values={{ category, difficulty }} applyLabel={filterCopy.apply} clearLabel={filterCopy.clear} resultLabel={filterCopy.results} resultCount={visible.length} filters={[
    { name: "category", label: filterCopy.category, options: categories.map((value) => ({ value, label: techniqueCategoryLabel(value, locale) })) },
    { name: "difficulty", label: filterCopy.difficulty, options: difficulties.map((value) => ({ value, label: difficultyLabel(value, locale) })) },
  ]} /><div className="article-grid large">{visible.map((item) => {
    const guide = getTechniqueGuide(item.slug);
    const stepCount = guide?.quickSteps.length ?? 0;
    return <Link key={item.slug} href={withLocale(`/techniques/${item.slug}`, locale)}><span>{techniqueCategoryLabel(item.category, locale)}</span><h2>{pick(locale, item.name, item.nameTh)}</h2><p>{pick(locale, item.summary, item.summaryTh)}</p><small>{item.minutes} {copy.misc.minutes} · {difficultyLabel(item.difficulty, locale)} · {stepCount} {locale === "th" ? "ขั้นตอน" : "steps"}</small></Link>;
  })}</div>{!visible.length && <p className="empty-state">{locale === "th" ? "ไม่พบบทความที่ตรงกับตัวกรอง" : "No techniques match these filters."}</p>}</section>;
}
