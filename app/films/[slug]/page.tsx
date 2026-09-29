import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { films, findBySlug } from "@/lib/data";

export function generateStaticParams() { return films.map(({ slug }) => ({ slug })); }

export default async function FilmDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const film = findBySlug(films, slug);
  if (!film) notFound();
  return <article className="shell detail-page"><div className="detail-hero"><div>{film.image && <Image src={film.image.url} alt={film.image.alt} width={1200} height={900} priority />}</div><div><p className="eyebrow">{film.brand} · Film</p><h1>{film.name}</h1><p className="lede">{film.description}</p><div className="facts"><span>ISO <strong>{film.iso}</strong></span><span>{film.filmType}</span><span>{film.process}</span><span>{film.formats.join(" / ")}</span></div></div></div><section><p className="eyebrow">Editorial characteristics</p><h2>Film character</h2><p className="notice">These descriptions are editorial guidance, not manufacturer specifications.</p><dl className="spec-grid">{Object.entries(film.characteristics).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></section><section><h2>Typical uses</h2><div className="tag-row">{film.uses.map((use) => <span key={use}>{use}</span>)}</div></section>{film.image && <section className="source-card"><h2>Image source</h2><p>{film.image.creator} · {film.image.license}</p><a href={film.image.sourceUrl} target="_blank" rel="noreferrer">Open source record ↗</a></section>}<Link className="back-link" href="/films">← Back to films</Link></article>;
}
