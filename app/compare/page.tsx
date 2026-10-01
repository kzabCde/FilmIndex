import { Suspense } from "react";
import { CompareClient } from "@/components/compare-client";
import { messages, parseLocale } from "@/lib/i18n";

export default async function ComparePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const copy = messages[locale].compare;
  const isTh = locale === "th";
  return <section className="shell listing-page advanced-compare-page"><header><p className="eyebrow">{isTh ? "Advanced Compare" : "Advanced Compare"}</p><h1>{copy.title}</h1><p>{isTh ? "เปรียบเทียบ Film, Camera หรือ Lens แบบ 2–4 รายการ พร้อมเน้นค่าที่แตกต่างและ URL ที่แชร์ผลการเปรียบเทียบได้โดยตรง" : "Compare 2–4 films, cameras, or lenses with highlighted differences and a shareable URL that preserves the exact selection."}</p></header><Suspense fallback={<p>…</p>}><CompareClient /></Suspense></section>;
}
