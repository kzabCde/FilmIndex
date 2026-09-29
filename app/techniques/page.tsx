import type { Metadata } from "next";
import Link from "next/link";
import { techniques } from "@/lib/catalog";
import { difficultyLabel, messages, parseLocale, pick, techniqueCategoryLabel, withLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Techniques", description: "Learn analog photography techniques, exposure, processing, and film handling." };

export default async function TechniquesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const copy = messages[locale];
  return <section className="shell listing-page"><header><p className="eyebrow">{copy.techniques.eyebrow}</p><h1>{copy.techniques.title}</h1><p>{copy.techniques.copy}</p></header><div className="article-grid large">{techniques.map((item) => <Link key={item.slug} href={withLocale(`/techniques/${item.slug}`, locale)}><span>{techniqueCategoryLabel(item.category, locale)}</span><h2>{pick(locale, item.name, item.nameTh)}</h2><p>{pick(locale, item.summary, item.summaryTh)}</p><small>{item.minutes} {copy.misc.minutes} · {difficultyLabel(item.difficulty, locale)}</small></Link>)}</div></section>;
}
