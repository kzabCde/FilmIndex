import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findBySlug, techniques } from "@/lib/catalog";
import { getTechniqueGuide } from "@/data/technique-guides";
import { getToolBySlug } from "@/lib/tool-catalog";
import { difficultyLabel, messages, parseLocale, pick, techniqueCategoryLabel, withLocale } from "@/lib/i18n";

export function generateStaticParams() { return techniques.map(({ slug }) => ({ slug })); }

export default async function TechniqueDetail({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = parseLocale(query.lang);
  const isTh = locale === "th";
  const copy = messages[locale];
  const technique = findBySlug(techniques, slug);
  if (!technique) notFound();
  const sections = isTh && technique.sectionsTh?.length ? technique.sectionsTh : technique.sections;
  const guide = getTechniqueGuide(slug);
  const quickSteps = guide ? (isTh ? guide.quickStepsTh : guide.quickSteps) : [];
  const mistakes = guide ? (isTh ? guide.mistakesTh : guide.mistakes) : [];
  const checklist = guide ? (isTh ? guide.checklistTh : guide.checklist) : [];
  const relatedTools = guide?.relatedTools?.map((toolSlug) => getToolBySlug(toolSlug)).filter(Boolean) ?? [];

  return <article className="shell article-page technique-article">
    <header>
      <p className="eyebrow">{techniqueCategoryLabel(technique.category, locale)} · {difficultyLabel(technique.difficulty, locale)} · {technique.minutes} {copy.misc.minutes}</p>
      <h1>{pick(locale, technique.name, technique.nameTh)}</h1>
      <p className="lede">{pick(locale, technique.summary, technique.summaryTh)}</p>
    </header>

    {technique.image && <figure className="technique-hero-media">
      <Image src={technique.image.url} alt={technique.image.alt} width={1400} height={900} />
      <figcaption>{technique.image.creator} · {technique.image.license} · <a href={technique.image.sourceUrl} target="_blank" rel="noreferrer">{copy.detail.source}</a></figcaption>
    </figure>}

    {guide && <section className="technique-practical-grid" aria-label={isTh ? "คู่มือใช้งานจริง" : "Practical guide"}>
      <section className="technique-guide-card technique-steps">
        <p className="eyebrow">{isTh ? "ทำตามลำดับ" : "Quick steps"}</p>
        <h2>{isTh ? "วิธีใช้งานจริง" : "Practical workflow"}</h2>
        <ol>{quickSteps.map((step) => <li key={step}>{step}</li>)}</ol>
      </section>
      <section className="technique-guide-card">
        <p className="eyebrow">{isTh ? "จุดพลาด" : "Common mistakes"}</p>
        <h2>{isTh ? "สิ่งที่ควรระวัง" : "What to avoid"}</h2>
        <ul>{mistakes.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className="technique-guide-card">
        <p className="eyebrow">Checklist</p>
        <h2>{isTh ? "เช็กก่อนลงมือ" : "Before you start"}</h2>
        <ul className="technique-checklist">{checklist.map((item) => <li key={item}><span aria-hidden="true">□</span>{item}</li>)}</ul>
      </section>
    </section>}

    <div className="article-body technique-core-sections">
      {sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
    </div>

    {guide?.referenceImages?.length ? <section className="technique-reference-section">
      <header><p className="eyebrow">{isTh ? "ภาพอ้างอิง" : "Reference images"}</p><h2>{isTh ? "ดูตัวอย่างประกอบ" : "Visual references"}</h2><p>{isTh ? "ภาพด้านล่างใช้เพื่ออธิบายแนวคิดและอุปกรณ์ พร้อมระบุแหล่งที่มาและสิทธิ์ของไฟล์" : "These images illustrate the concept or equipment and keep their source and license attribution visible."}</p></header>
      <div className="technique-reference-grid">
        {guide.referenceImages.map((image) => <figure key={image.sourceUrl}>
          <Image src={image.url} alt={image.alt} width={1100} height={760} />
          <figcaption><strong>{image.alt}</strong><span>{image.creator} · {image.license}</span><a href={image.sourceUrl} target="_blank" rel="noreferrer">{isTh ? "ดูไฟล์ต้นฉบับ ↗" : "View original source ↗"}</a></figcaption>
        </figure>)}
      </div>
    </section> : null}

    {relatedTools.length ? <section className="technique-related-tools">
      <header><p className="eyebrow">{isTh ? "เครื่องมือที่เกี่ยวข้อง" : "Related tools"}</p><h2>{isTh ? "ลองคำนวณต่อ" : "Put it into practice"}</h2></header>
      <div className="technique-tool-links">{relatedTools.map((tool) => tool && <Link key={tool.slug} href={`/tools/${tool.slug}?lang=${locale}`}><span>{tool.code}</span><strong>{isTh ? tool.titleTh : tool.title}</strong><small>{isTh ? tool.descriptionTh : tool.description}</small></Link>)}</div>
    </section> : null}

    {guide?.references?.length ? <section className="technique-references">
      <p className="eyebrow">{isTh ? "อ้างอิงเพิ่มเติม" : "Further reference"}</p>
      <div>{guide.references.map((reference) => <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer">{reference.label} ↗</a>)}</div>
    </section> : null}

    <Link className="back-link" href={withLocale("/techniques", locale)}>{copy.detail.backTechniques}</Link>
  </article>;
}
