import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EntityCard } from "@/components/entity-card";
import { FavoriteButton } from "@/components/favorite-button";
import { filmSamples } from "@/data/film-samples";
import { films, findBySlug } from "@/lib/catalog";
import { relatedFilms } from "@/lib/discovery";
import { characteristicKeyLabel, characteristicValueLabel, filmTypeLabel, messages, parseLocale, pick, useLabel, withLocale } from "@/lib/i18n";
import styles from "./film-samples.module.css";

export function generateStaticParams() { return films.map(({ slug }) => ({ slug })); }

export default async function FilmDetail({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = parseLocale(query.lang);
  const copy = messages[locale].detail;
  const film = findBySlug(films, slug);
  if (!film) notFound();

  const samples = filmSamples[film.slug] ?? [];
  const related = relatedFilms(film, films, 4);
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
          <FavoriteButton slug={film.slug} locale={locale} />
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

      <section className={styles.section}>
        <p className="eyebrow">{sampleCopy.eyebrow}</p>
        <h2>{sampleCopy.title}</h2>
        <p className="notice">{sampleCopy.note}</p>
        <div className={styles.grid}>
          {samples.map((image) => (
            <figure className={styles.card} key={image.sourceUrl}>
              <a href={image.sourceUrl} target="_blank" rel="noreferrer">
                <div className={styles.image}><Image src={image.url} alt={image.alt} fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
              </a>
              <figcaption className={styles.caption}>
                <strong>{image.alt}</strong>
                <span>{image.creator} · {image.license}</span>
                <a href={image.sourceUrl} target="_blank" rel="noreferrer">{sampleCopy.source}</a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading"><div><p className="eyebrow">{locale === "th" ? "ตัวเลือกใกล้เคียง" : "Discovery"}</p><h2>{locale === "th" ? "ฟิล์มที่คล้ายกัน" : "Related films"}</h2></div><Link href={withLocale("/finder", locale)}>{locale === "th" ? "เปิด Film Finder →" : "Open Film Finder →"}</Link></div>
        <div className="card-grid">{related.map((match, index) => <EntityCard key={match.film.slug} item={match.film} index={index} locale={locale} />)}</div>
        <p className="notice">{locale === "th" ? "รายการใกล้เคียงคำนวณจากประเภทฟิล์ม ISO กระบวนการล้าง งานที่เหมาะ และลักษณะเกรนใน catalog" : "Related items are calculated locally from film family, ISO, process, typical uses, and grain characteristics in the catalog."}</p>
      </section>

      {film.image && <section className="source-card"><h2>{copy.imageSource}</h2><p>{film.image.creator} · {film.image.license}</p><a href={film.image.sourceUrl} target="_blank" rel="noreferrer">{copy.openSource}</a></section>}
      <Link className="back-link" href={withLocale("/films", locale)}>{copy.backFilms}</Link>
    </article>
  );
}
