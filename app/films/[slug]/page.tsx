import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { filmSamples } from "@/data/film-samples";
import { films, findBySlug } from "@/lib/catalog";
import { characteristicKeyLabel, characteristicValueLabel, filmTypeLabel, messages, parseLocale, pick, useLabel, withLocale } from "@/lib/i18n";

export function generateStaticParams() { return films.map(({ slug }) => ({ slug })); }

export default async function FilmDetail({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = parseLocale(query.lang);
  const copy = messages[locale].detail;
  const film = findBySlug(films, slug);
  if (!film) notFound();

  const samples = filmSamples[film.slug] ?? [];
  const sampleCopy = locale === "th"
    ? {
      eyebrow: "ภาพจากฟิล์มจริง",
      title: "ภาพตัวอย่างจากฟิล์มนี้",
      note: "ภาพตัวอย่างช่วยให้เห็นแนวทางของฟิล์ม แต่ผลลัพธ์จริงยังขึ้นอยู่กับกล้อง เลนส์ การวัดแสง การล้าง และการสแกน",
      source: "เปิดแหล่งที่มาของภาพ ↗",
    }
    : {
      eyebrow: "Real film examples",
      title: "Sample photographs",
      note: "Samples illustrate the film in real use. Camera, lens, exposure, development, and scanning can all change the final rendering.",
      source: "Open photograph source ↗",
    };

  return (
    <article className="shell detail-page">
      <div className="detail-hero">
        <div>{film.image && <Image src={film.image.url} alt={film.image.alt} width={1200} height={900} priority />}</div>
        <div>
          <p className="eyebrow">{film.brand} · {messages[locale].nav.films}</p>
          <h1>{film.name}</h1>
          <p className="lede">{pick(locale, film.description, film.descriptionTh)}</p>
          <div className="facts"><span>ISO <strong>{film.iso}</strong></span><span>{filmTypeLabel(film.filmType, locale)}</span><span>{film.process}</span><span>{film.formats.join(" / ")}</span></div>
        </div>
      </div>

      <section>
        <p className="eyebrow">{copy.editorial}</p>
        <h2>{copy.filmCharacter}</h2>
        <p className="notice">{copy.editorialNotice}</p>
        <dl className="spec-grid">{Object.entries(film.characteristics).map(([key, value]) => <div key={key}><dt>{characteristicKeyLabel(key, locale)}</dt><dd>{characteristicValueLabel(value, locale)}</dd></div>)}</dl>
      </section>

      <section>
        <h2>{copy.typicalUses}</h2>
        <div className="tag-row">{film.uses.map((use) => <span key={use}>{useLabel(use, locale)}</span>)}</div>
      </section>

      <section className="film-samples-section">
        <p className="eyebrow">{sampleCopy.eyebrow}</p>
        <h2>{sampleCopy.title}</h2>
        <p className="notice">{sampleCopy.note}</p>
        <div className="film-sample-grid">
          {samples.map((image) => (
            <figure className="film-sample-card" key={image.sourceUrl}>
              <a href={image.sourceUrl} target="_blank" rel="noreferrer">
                <div className="film-sample-image"><Image src={image.url} alt={image.alt} fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
              </a>
              <figcaption>
                <strong>{image.alt}</strong>
                <span>{image.creator} · {image.license}</span>
                <a href={image.sourceUrl} target="_blank" rel="noreferrer">{sampleCopy.source}</a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {film.image && <section className="source-card"><h2>{copy.imageSource}</h2><p>{film.image.creator} · {film.image.license}</p><a href={film.image.sourceUrl} target="_blank" rel="noreferrer">{copy.openSource}</a></section>}
      <Link className="back-link" href={withLocale("/films", locale)}>{copy.backFilms}</Link>
    </article>
  );
}
