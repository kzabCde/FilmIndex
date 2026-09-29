import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findBySlug, techniques } from "@/lib/data";

export function generateStaticParams() { return techniques.map(({ slug }) => ({ slug })); }

export default async function TechniqueDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const technique = findBySlug(techniques, slug);
  if (!technique) notFound();
  return <article className="shell article-page"><header><p className="eyebrow">{technique.category} · {technique.difficulty} · {technique.minutes} min</p><h1>{technique.name}</h1><p className="lede">{technique.summary}</p></header>{technique.image && <figure><Image src={technique.image.url} alt={technique.image.alt} width={1400} height={900} /><figcaption>{technique.image.creator} · {technique.image.license} · <a href={technique.image.sourceUrl} target="_blank" rel="noreferrer">source</a></figcaption></figure>}<div className="article-body">{technique.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</div><Link className="back-link" href="/techniques">← Back to techniques</Link></article>;
}
