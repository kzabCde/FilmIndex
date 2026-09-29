import { Suspense } from "react";
import { CompareClient } from "@/components/compare-client";
import { messages, parseLocale } from "@/lib/i18n";

export default async function ComparePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const copy = messages[locale].compare;
  return <section className="shell listing-page"><header><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.copy}</p></header><Suspense fallback={<p>…</p>}><CompareClient /></Suspense></section>;
}
