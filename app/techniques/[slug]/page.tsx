import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findBySlug, techniques } from "@/lib/data";
import { difficultyLabel, messages, parseLocale, pick, techniqueCategoryLabel, withLocale } from "@/lib/i18n";

export function generateStaticParams() { return techniques.map(({ slug }) => ({ slug })); }

export default async function TechniqueDetail({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = parseLocale(query.lang);
  const copy = messages[locale];
  const technique = findBySlug(techniques, slug);
  if (!technique) notFound();
  const sections = locale === "th" && technique.sectionsTh?.length ? technique.sectionsTh : technique.sections;
  return <article className="shell article-page"><header><p className="eyebrow">{techniqueCategoryLabel(technique.category, locale)} · {difficultyLabel(technique.difficulty, locale)} · {technique.minutes} {copy.misc.minutes}</p><h1>{pick(locale, technique.name, technique.nameTh)}</h1><p className="lede">{pick(locale, technique.summary, technique.summaryTh)}</p></header>{technique.image && <figure><Image src={technique.image.url} alt={technique.image.alt} width={1400} height={900} /><figcaption>{technique.image.creator} · {technique.image.license} · <a href={technique.image.sourceUrl} target="_blank" rel="noreferrer">{copy.detail.source}</a></figcaption></figure>}<div className="article-body">{sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</div><Link className="back-link" href={withLocale("/techniques", locale)}>{copy.detail.backTechniques}</Link></article>;
}
