import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { films, findBySlug } from "@/lib/data";
import { characteristicKeyLabel, characteristicValueLabel, filmTypeLabel, messages, parseLocale, pick, useLabel, withLocale } from "@/lib/i18n";

export function generateStaticParams() { return films.map(({ slug }) => ({ slug })); }

export default async function FilmDetail({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = parseLocale(query.lang);
  const copy = messages[locale].detail;
  const film = findBySlug(films, slug);
  if (!film) notFound();
  return <article className="shell detail-page"><div className="detail-hero"><div>{film.image && <Image src={film.image.url} alt={film.image.alt} width={1200} height={900} priority />}</div><div><p className="eyebrow">{film.brand} · {messages[locale].nav.films}</p><h1>{film.name}</h1><p className="lede">{pick(locale, film.description, film.descriptionTh)}</p><div className="facts"><span>ISO <strong>{film.iso}</strong></span><span>{filmTypeLabel(film.filmType, locale)}</span><span>{film.process}</span><span>{film.formats.join(" / ")}</span></div></div></div><section><p className="eyebrow">{copy.editorial}</p><h2>{copy.filmCharacter}</h2><p className="notice">{copy.editorialNotice}</p><dl className="spec-grid">{Object.entries(film.characteristics).map(([key, value]) => <div key={key}><dt>{characteristicKeyLabel(key, locale)}</dt><dd>{characteristicValueLabel(value, locale)}</dd></div>)}</dl></section><section><h2>{copy.typicalUses}</h2><div className="tag-row">{film.uses.map((use) => <span key={use}>{useLabel(use, locale)}</span>)}</div></section>{film.image && <section className="source-card"><h2>{copy.imageSource}</h2><p>{film.image.creator} · {film.image.license}</p><a href={film.image.sourceUrl} target="_blank" rel="noreferrer">{copy.openSource}</a></section>}<Link className="back-link" href={withLocale("/films", locale)}>{copy.backFilms}</Link></article>;
}
